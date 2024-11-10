#!/bin/sh

docker build --build-arg VITE_WS_URL=wss://api.words.paul-hoger.de -t ghcr.io/paul2708/approaching-words/frontend:latest .
