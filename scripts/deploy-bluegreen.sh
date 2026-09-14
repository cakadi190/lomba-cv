#!/usr/bin/env bash
# Blue/Green deployment for lomba-cv (Cakadi CV, Nuxt).
#
# Runs on the deploy host, inside DEPLOY_PATH (where compose.yaml and .env
# live). Deploys the newly loaded image to the currently INACTIVE color,
# health-checks it, rewrites the port in-place in the existing Nginx site
# file, reloads Nginx, then stops the old color.
#
# NOTE: NGINX_SITE_FILE below is a placeholder — set it to the real
# sites-available file for this app's domain on the deploy host before
# running this for the first time.
set -euo pipefail

DEPLOY_PATH="${1:?usage: deploy-bluegreen.sh <deploy_path>}"
STATE_FILE="$DEPLOY_PATH/.active_color"
NGINX_SITE_FILE="${NGINX_SITE_FILE:-/etc/nginx/sites-available/cakadi.web.id}"
HEALTH_RETRIES=30
HEALTH_INTERVAL=2

cd "$DEPLOY_PATH"

current_color="blue"
if [ -f "$STATE_FILE" ]; then
  current_color="$(cat "$STATE_FILE")"
fi

if [ "$current_color" = "blue" ]; then
  new_color="green"
else
  new_color="blue"
fi

case "$new_color" in
  blue)  app_port=5010 ;;
  green) app_port=5011 ;;
esac

echo "==> Current active color: $current_color"
echo "==> Deploying new color:  $new_color (app=$app_port)"

# compose.yaml declares this network external (fixed IPs require a
# user-defined network, unlike the default "bridge") — create it here so a
# fresh host doesn't need a manual one-time step remembered before the first
# deploy.
docker network inspect lombacv-net >/dev/null 2>&1 || \
  docker network create lombacv-net --subnet 172.21.0.0/16
# mongo-net is shared with vettrak so both apps can reach the single
# replica set member at one gateway (see docs/mongodb-native-setup.md).
# It's the host's "docker-bridge" network (172.20.0.0/16, gateway
# 172.20.0.1) reused as-is — a separate mongo-net with an overlapping
# subnet is rejected by Docker's pool overlap check.
docker network inspect docker-bridge >/dev/null 2>&1 || \
  docker network create docker-bridge --subnet 172.20.0.0/16

docker compose --profile "$new_color" up -d --force-recreate

echo "==> Waiting for $new_color to become healthy..."
healthy=0
for _ in $(seq 1 "$HEALTH_RETRIES"); do
  if curl -fsS "http://127.0.0.1:${app_port}/api/health" >/dev/null 2>&1; then
    healthy=1
    break
  fi
  sleep "$HEALTH_INTERVAL"
done

if [ "$healthy" -ne 1 ]; then
  echo "!! Health check failed for $new_color, rolling back deploy." >&2
  docker compose --profile "$new_color" logs --tail=100 || true
  docker compose stop "lombacv-$new_color"
  docker compose rm -f "lombacv-$new_color"
  exit 1
fi

echo "==> $new_color is healthy, updating Nginx port."

if [ -f "$NGINX_SITE_FILE" ]; then
  sed -i -E "s#(proxy_pass http://127\.0\.0\.1:)[0-9]+;#\1${app_port};#" "$NGINX_SITE_FILE"
  nginx -t
  systemctl reload nginx
else
  echo "!! NGINX_SITE_FILE ($NGINX_SITE_FILE) not found — skipping Nginx flip." >&2
  echo "!! Set NGINX_SITE_FILE to the real sites-available path and re-run, or flip it manually." >&2
fi

echo "$new_color" > "$STATE_FILE"

echo "==> Force-stopping old color: $current_color"
old_container="lombacv-$current_color"
if [ -n "$(docker compose ps -q "$old_container")" ]; then
  # Traffic is already on $new_color (Nginx was reloaded above), so the old
  # container has nothing left to serve.
  docker compose stop -t 0 "$old_container"
  docker compose rm -f "$old_container"
fi

echo "==> Deployment complete. Active color is now: $new_color"
