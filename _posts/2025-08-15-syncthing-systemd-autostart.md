---
layout: post
title: "Auto-Start Syncthing on Linux Boot with systemd"
date: 2025-08-14 10:00:00
categories: [linux, automation, file-sync, systemd]
tags: [syncthing, systemd, linux, automation, boot, service]
author: Chinmay Singh
description: "How to configure Syncthing to automatically start on boot using systemd service units"
published: true
---

## Quick Tip: Auto-Start Syncthing on Boot

If you've installed Syncthing natively on Linux, you can make it start automatically on boot using its built-in `systemd` unit. This is much cleaner than adding it to your startup applications or creating custom scripts.

---

## The Commands

```bash
# Enable and start Syncthing for your user
sudo systemctl enable syncthing@<username>.service
sudo systemctl start syncthing@<username>.service

# Example for user 'chinmay'
sudo systemctl enable syncthing@chinmay.service
sudo systemctl start syncthing@chinmay.service

# Check status
systemctl status syncthing@<username>.service
```

---

## What This Does

- **`enable`**: Creates the necessary symlinks to start the service on boot
- **`start`**: Starts the service immediately (without waiting for reboot)
- **`status`**: Shows if the service is running and any recent logs

---

## Why Use systemd?

Instead of manually adding Syncthing to your startup applications or creating custom init scripts, using systemd provides:

- **Automatic dependency management**
- **Proper logging integration**
- **Easy service management** (`start`, `stop`, `restart`, `status`)
- **Boot-time optimization**

---

## Verification

After running the commands, you can verify it's working:

```bash
# Check if service is enabled (will start on boot)
systemctl is-enabled syncthing@chinmay.service

# Check if service is currently running
systemctl is-active syncthing@chinmay.service

# View recent logs
journalctl -u syncthing@chinmay.service -f
```

---

*That's it! Syncthing will now start automatically every time you boot your system, and you can manage it like any other systemd service.* 