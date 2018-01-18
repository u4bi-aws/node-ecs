#!/bin/bash

docker build . -t node-ecs

docker run -p 80:80 node-ecs