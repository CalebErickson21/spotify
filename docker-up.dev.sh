# Start core containers
echo "Starting core docker containers..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
echo "Core containers started successfully."

# Run one off cron-update container to mirror a cron job
echo "Running one-off container to mirror cron job update..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml run --rm cron-worker
echo "One-off cron mirror container ran successfully."

# Attack to stack to get live logs
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f
