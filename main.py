# Import dependencies
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from spotipy.exceptions import SpotifyException
from datetime import datetime, timezone
import time

# Import utils
from utils import Logger

# Load environment variables
load_dotenv()

# Constants
MAX_RETRIES = 5
HOUR_MS = 60 * 60 * 1000

# Set up the logger
logger = Logger()

# Spotify API client
scope = "playlist-read-private playlist-modify-private playlist-modify-public user-read-recently-played"
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))


def get_playlist_songs(playlist_id):
    songs = set()
    offset = 0
    limit = 100
    empty = False
    while True:
        retries = 0
        backoff = 1
        while retries <= MAX_RETRIES:
            try:
                playlist = sp.playlist_tracks(playlist_id=playlist_id, fields="items.track.name, items.track.id", limit=limit, offset=offset)
                if len(playlist['items']) == 0:
                    empty = True
                    break
                for item in playlist['items']:
                    songs.add(item['track']['id'])
                break
            except SpotifyException as e:
                logger.log("error", f"Error getting playlist songs: {e}")
                logger.log("error", f"Retrying in {backoff} seconds: retry {retries + 1} of {MAX_RETRIES}")
                time.sleep(backoff)
                backoff *= 2
                retries += 1

        if empty:
            break

        offset += limit

    return songs


def get_playlist_id(playlist_name, size=50, max_playlists=1000):
    playlist_name = playlist_name.lower().strip()
    for i in range(0, max_playlists, size):
        retries = 0
        backoff = 1
        while retries <= MAX_RETRIES:
            try:
                playlists = sp.user_playlists(user=sp.me()['id'], limit=size, offset=i)
                for p in playlists['items']:
                    if p['name'].lower().strip() == playlist_name:
                        return p['id']
                break
            except SpotifyException as e:
                logger.log("error", f"Error getting playlists: {e}")
                logger.log("error", f"Retrying in {backoff} seconds: retry {retries + 1} of {MAX_RETRIES}")
                time.sleep(backoff)
                backoff *= 2
                retries += 1

    logger.log("info", f"Playlist {playlist_name} not found.")
    logger.log("info", f"Check your playlists and try again, or update the max_playlists variable.")
    exit(1)


def get_listens(before_unix_ms):
    """
    TODO: Documenation
    """
    retries = 0
    backoff = 1
    while retries <= MAX_RETRIES:
        try:
            logger.log("info", f"Getting listens before {before_unix_ms:.0f}")
            listens = sp.current_user_recently_played(limit=50, before=before_unix_ms)
            print(listens)
            input()
            return set([listen['track']['id'] for listen in listens['items']])
        except SpotifyException as e:
            logger.log("error", f"Error getting listens: {e}")
            logger.log("error", f"Retrying in {backoff} seconds: retry {retries + 1} of {MAX_RETRIES}")
            retries += 1
            time.sleep(backoff)
            backoff *= 2
    return set()


def get_playlist_stats(playlist_id):
    logger.log("info", f"Playlist ID: {playlist_id}")
    logger.log("info", f"Number of songs: {len(get_playlist_songs(playlist_id))}")


# If not imported, run main
if __name__ == "__main__":
    # Get the playlist information
    input_playlist = input("Enter the playlist name: ").strip()
    playlist_id = get_playlist_id(input_playlist)
    playlist_songs = set(get_playlist_songs(playlist_id))
    if len(playlist_songs) == 0:
        logger.log("info", f"No songs found in playlist {input_playlist}")
        exit()
    get_playlist_stats(playlist_id)

    # Filter the playlist
    today_date = datetime.now()
    end_year = today_date.year
    # Get the month 6 months ago
    end_month = today_date.month
    end_month -= 1
    if end_month <= 0:
        end_month += 12
        end_year -= 1

    # Get 6 month ago ms
    end_date = datetime(end_year, end_month, 1, 0, 0, 0, tzinfo=timezone.utc)
    end_date_ms = int(end_date.timestamp() * 1000)

    # Get today ms
    today_date = datetime(today_date.year, today_date.month, today_date.day, 23, 59, 59, tzinfo=timezone.utc)
    today_ms = int(today_date.timestamp() * 1000)

    logger.log("info", f"End date: {end_date_ms}")
    logger.log("info", f"Today date: {today_ms}")

    listened_songs = set()
    while end_date_ms <= today_ms:        
        # Get 50 songs listened to in 60 minute range
        listens = get_listens(before_unix_ms=today_ms)
        print(f"listens: {len(listened_songs)}")
        listened_songs.update(listens)
        print(f"listened_songs: {len(listened_songs)}")
        today_ms -= HOUR_MS

    logger.log("info", f"Listened songs: {len(listened_songs)}")

    removed_songs = playlist_songs - listened_songs
    logger.log("info", f"Songs to be removed: {len(removed_songs)}")

    # Remove the songs from the playlist
    if len(removed_songs) == 0:
        logger.log("info", f"No songs to remove")
        exit()
    sp.playlist_remove_all_occurrences_of_items(playlist_id, list(removed_songs))
    logger.log("info", f"Removed {len(removed_songs)} songs from the playlist")

    # Get new playlist stats
    get_playlist_stats(playlist_id)
