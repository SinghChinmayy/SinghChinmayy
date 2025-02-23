---
layout: post
title: Docker Introduction Guide
date: 2025-02-23 00:00:00-0000
description: This blog covers essential Docker concepts, including networks, volumes, and Docker Compose. Learn how to manage containers efficiently using practical examples and commands.
tags: docker
categories: docker
giscus_comments: true
related_posts: true
---

# DevOps with Docker

## TL;DR
This blog covers essential Docker concepts, including networks, volumes, and Docker Compose. Learn how to manage containers efficiently using practical examples and commands.

---

## Docker Networks
Docker networks allow containers to communicate with each other. The main types include:

1. **Bridge (Default)**: Provides internal networking for containers.
2. **Host**: Removes network isolation and uses the host's network directly.
3. **Macvlan**: Assigns a MAC address to each container, making them appear as physical devices on the network.

## Docker Compose File
Docker Compose allows you to define and run multi-container Docker applications with a simple YAML configuration file. It helps in managing multiple services, setting up networks, mounting volumes, and defining restart policies.

### Structure of a Docker Compose File
A typical Docker Compose file consists of:

- **Version**: Specifies the Compose file format version.
- **Services**: Defines the containers that will be created.
- **Volumes**: Manages persistent storage.
- **Networks**: Configures container communication.
- **Environment Variables**: Passes configuration settings.
- **Restart Policy**: Defines how containers restart on failure.

### Example Docker Compose File
```yaml
version: '3.9'
services:
  kavita:
    image: jvmilazz0/kavita:latest
    volumes:
      - ./manga:/manga
      - ./data:/kavita/config
    ports:
      - "5000:5000"
    restart: unless-stopped
```

### Mount Storage in Docker Compose
To persist data across container restarts, mount directories as volumes:
```yaml
volumes:
  - ./from/where:/to/where
```

## Docker Cheatsheet
| Command                  | Description                              |
|--------------------------|------------------------------------------|
| `sudo docker ps -a`      | List all containers                     |
| `sudo docker start`      | Start a stopped container               |
| `docker images`          | List all images                         |
| `docker system prune -a --volumes` | Remove all unused containers, networks, images, and volumes |
| `sudo systemctl restart docker` | Restart Docker service           |

## Docker Volume Management
### Creating a Docker Volume
```sh
docker volume create \  
  --driver local \  
  --opt type=none \  
  --opt device=/path/to/sdc \  
  --opt o=bind \  
  myvolume
```

### Listing and Inspecting Volumes
```sh
docker volume ls
docker volume inspect myvolume
```

### Using a Volume in a Container
```sh
docker run -it --rm -v myvolume:/data alpine sh
```

## Using Docker Volumes in Docker Compose
```yaml
version: '3'
services:
  app:
    image: myapp
    volumes:
      - myvolume:/data
volumes:
  myvolume:
    driver: local
    driver_opts:
      type: none
      device: /path/to/sdc
      o: bind
```

## Exposing a Port in Docker
Example configuration:
```yaml
services:
  kavita:
    image: jvmilazz0/kavita:latest
    volumes:
      - ./manga:/manga
      - ./data:/kavita/config
    ports:
      - "5000:5000"
```

## Conclusion
This blog provides a comprehensive guide to using Docker for DevOps. You’ve learned about networking, volume management, and Compose files to efficiently manage your containers. Master these concepts, and you'll be on your way to becoming a Docker pro!

