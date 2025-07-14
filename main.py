# Import dependencies
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth

# Load environment variables
load_dotenv()

# Spotify API client
scope = "playlist-read-private playlist-modify-private playlist-modify-public user-read-recently-played"
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))


def playlist_songs(playlist_id):
    songs = []
    offset = 0
    limit = 100
    while True:
        playlist = sp.playlist_tracks(playlist_id=playlist_id, fields="items.track.name, items.track.id", limit=limit, offset=offset)
        print(playlist)
        if len(playlist['items']) == 0:
            break
        for item in playlist['items']:
            songs.append(item['track']['name'])
            print(item['track']['name'])

        offset += limit
    return songs


def playlist_id(playlist_name, size=50, max_playlists=1000):
    playlist_name = playlist_name.lower().strip()
    for i in range(0, max_playlists, size):
        playlists = sp.user_playlists(user=sp.me()['id'], limit=size, offset=i)
        for p in playlists['items']:
            if p['name'].lower().strip() == playlist_name:
                return p['id']
    print(f"Playlist {playlist_name} not found.")
    print(f"Check your playlists and try again, or update the max_playlists variable.")
    exit(1)


def remaining_songs(playlist_songs):
    pass


def monthly_listens(month_number):
    pass


def playlist_stats(playlist_id):
    print(f"Playlist ID: {playlist_id}")
    print(f"Number of songs: {len(playlist_songs(playlist_id))}")


# If not imported, run main
if __name__ == "__main__":
    # Get the playlist to update
    input_playlist = input("Enter the playlist name: ")
    playlist_id = playlist_id(input_playlist)
    playlist_stats(playlist_id)
