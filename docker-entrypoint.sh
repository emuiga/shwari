#!/bin/sh
set -e

# Runtime env (BACKEND_URL, AUTH_*, etc.) is injected by Docker/compose
# into the process environment — Next standalone reads process.env on start.
exec node server.js
