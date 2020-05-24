#!/bin/bash

SERVER_PATH=$(dirname $0)

echo "[deploy] Fetch and restart..."
cd $SERVER_PATH
cd ..
echo "[deploy] path:" $(pwd)
echo "[deploy] pulling source code..."
git fetch --all && git reset --hard origin/master && git pull
git checkout master
echo "[deploy] install..."
npm ci
pm2 restart blog-service
echo "[deploy] Restart done."
