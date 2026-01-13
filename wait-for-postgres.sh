#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

echo "Waiting for Postgres at $host..."

# Keep trying until Postgres is ready
until PGPASSWORD=$DATABASE_PASSWORD psql -h "$host" -U "$DATABASE_USER" -d "$DATABASE_NAME" -c '\q' 2>/dev/null; do
  >&2 echo "Postgres is unavailable - sleeping 5s"
  sleep 5
done

>&2 echo "Postgres is up - executing command"
exec $cmd
