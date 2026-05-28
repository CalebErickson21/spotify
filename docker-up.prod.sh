# Reminder to check cron config
echo "Check cron config on host to make sure cron update container is triggered every hour"

# Start core containers
echo "Starting core docker containers..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
echo "Core containers started successfully."
