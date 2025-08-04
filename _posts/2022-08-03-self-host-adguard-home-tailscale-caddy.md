---
layout: post
title: "How to Self-Host AdGuard Home on a Tailscale Network using Caddy"
date: 2025-08-03 10:00:00
categories: [self-hosting, networking, privacy, home-lab]
tags: [adguard-home, tailscale, caddy, dns, ad-blocking, reverse-proxy, privacy, self-hosting, docker, vpn, infrastructure, home-lab, networking, security, automation]
author: Chinmay Singh
description: "Learn how to build a privacy-first DNS infrastructure by self-hosting AdGuard Home with Tailscale VPN and Caddy reverse proxy. This comprehensive guide covers everything from Docker deployment to global DNS configuration for enterprise-grade ad-blocking and privacy protection."
published: true
---

## Why Self-Host AdGuard Home?

I've been exploring home labbing and privacy-focused tools lately, and AdGuard Home caught my attention. It's an open-source DNS filtering solution that blocks ads, trackers, and malicious domains at the network level. The best part? You can self-host it and have complete control over your DNS.

But here's the challenge: How do you access it securely from anywhere? That's where **Tailscale** and **Caddy** come in. Tailscale creates a secure mesh VPN network, while Caddy handles the reverse proxy with automatic HTTPS.

---

## What We'll Build

- **AdGuard Home**: DNS filtering and ad-blocking
- **Tailscale**: Secure VPN mesh network
- **Caddy**: Reverse proxy with automatic HTTPS
- **Docker**: Containerized deployment

The setup will give you:
- Ad-blocking across your entire network
- Secure remote access via Tailscale
- Automatic HTTPS certificates
- Easy management interface

---

## Prerequisites

Before we start, make sure you have:

- A Linux server (I'm using Ubuntu 22.04)
- Docker and Docker Compose installed
- A Tailscale account and the client installed
- Basic knowledge of networking concepts

---

## Step 1: Setting Up Tailscale

First, you'll need to install Tailscale on your server.  
Head over to the [official Tailscale installation page](https://tailscale.com/download) and follow the instructions for your operating system.

Once installed, authenticate and bring up Tailscale with the following commands (using sudo):

```bash
# Login to Tailscale
sudo tailscale login

# Start Tailscale
sudo tailscale up
```


---

## Step 2: Creating the Docker Compose Setup

Create a new directory for your AdGuard Home setup:

```bash
mkdir ~/adguard-home
cd ~/adguard-home
```

Now create the `docker-compose.yml` file:

```yaml
services:
  adguardhome:
    image: adguard/adguardhome
    container_name: adguardhome
    restart: unless-stopped
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "67:67/udp"
      - "68:68/udp"
      - "3000:3000/tcp"
      - "853:853/tcp"
      - "784:784/udp"
      - "853:853/udp"
      - "8853:8853/udp"
      - "5443:5443/tcp"
      - "5443:5443/udp"
    volumes:
      - /path/to/adguard/work:/opt/adguardhome/work
      - /path/to/adguard/conf:/opt/adguardhome/conf
    networks:
      - default
    deploy:
      resources:
        limits:
          memory: 512M

networks:
  default:
    driver: bridge
```
> **Note:**  
> Make sure to replace `/path/to/adguard/work` and `/path/to/adguard/conf` in the `volumes` section with the actual paths on your system where you want AdGuard Home to store its data and configuration.  
> 

---
## Step 3.1: Installing Caddy (Native Linux Install)

Before configuring Caddy as a reverse proxy, you'll need to install it on your Linux system.  
Follow the official instructions for your distribution here:  
[Official Caddy Install Guide](https://caddyserver.com/docs/install)

For most Debian/Ubuntu systems, you can use:

```bash
# Add Caddy repository
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list

# Install Caddy
sudo apt update
sudo apt install caddy

# Start and enable Caddy service
sudo systemctl enable caddy
sudo systemctl start caddy
```


## Step 3.2: Configuring Caddy as a Reverse Proxy

To set up Caddy as a reverse proxy for AdGuard Home:

1. Change directory to where the Caddyfile is located:
   ```bash
   cd /etc/caddy/
   ```

2. Open the Caddyfile for editing:
   ```bash
   sudo vim Caddyfile
   ```
   > (If you don't know vim, now's the perfect time to learn! You'll thank yourself later. 😄)

3. Add the following entry to your Caddyfile (replace `your-magicdns-domain.ts.net` with your actual Tailscale MagicDNS domain):

   ```caddy
   your-magicdns-domain.ts.net {
       reverse_proxy 127.0.0.1:3000
   }
   ```

   - This will proxy HTTPS traffic from your MagicDNS domain to the AdGuard Home web interface running on port 3000.
   - Make sure to use your correct Tailscale MagicDNS domain.

4. Save and exit the file.

5. Reload Caddy to apply the new configuration:
   ```bash
   sudo systemctl reload caddy
   ```

6. Check if Caddy is running properly:
   ```bash
   sudo systemctl status caddy
   ```

---

## Step 4: Starting AdGuard Home

Now it's time to start AdGuard Home using Docker Compose. Navigate to the directory where you created your `docker-compose.yml` file and run the following commands:

```bash
# Navigate to your AdGuard Home directory
cd /path/to/adguard

# Start AdGuard Home in detached mode
docker-compose up -d

# Check if the container is running properly
docker-compose ps

# View real-time logs (optional - press Ctrl+C to exit)
docker-compose logs -f
```

---

## Step 5: Initial AdGuard Home Setup

1. Open your browser and go to `http://YOUR_TAILSCALE_IP:3000`
2. Follow the initial setup wizard:
   - Create admin username and password
   - **Important:** When configuring the web interface port, make sure to set it to **3000**. By default, AdGuard Home uses port 80 for the admin panel, but this can cause conflicts or make the dashboard inaccessible if another service is using port 80 or if your reverse proxy is not set up for it. Setting the port to 3000 ensures you can access the admin panel through Caddy and Tailscale without issues.

### Required Configuration

After completing the web setup wizard, you'll need to verify and potentially adjust the configuration file. The configuration file is located at `/path/to/adguard/conf/AdGuardHome.yaml`. Here are the key sections that must be properly configured:

#### DNS Configuration
```yaml
dns:
  bind_hosts:
    - 0.0.0.0
    - '::'
  port: 53
```

#### HTTP Configuration
```yaml
http:
  pprof:
    port: 6060
    enabled: false
  address: 0.0.0.0:3000
  session_ttl: 720h
```

These configurations ensure that:
- DNS service binds to all interfaces (0.0.0.0 and IPv6 ::)
- DNS runs on the standard port 53
- Web interface runs on port 3000 (as required for our Caddy setup)
- Session timeout is set to 30 days (720 hours)
- Profiling is disabled for security

---

## Step 6: Configuring Tailscale DNS

Now you need to configure Tailscale to use your AdGuard Home server as the DNS server for your entire network. This is the key step that makes AdGuard Home accessible from anywhere through Tailscale.

### Step 6.1: Find Your Server's Tailscale IP

First, find your server's Tailscale IP address. You can do this in two ways:

1. **From the Tailscale Admin Console:**
   - Go to the [Tailscale Admin Console](https://login.tailscale.com/admin/machines)
   - Look for your server in the **Machines** page
   - Note the Tailscale IP address (it will be in the 100.x.x.x range)

2. **From your server directly:**
   ```bash
   tailscale ip
   ```

### Step 6.2: Configure Global DNS in Tailscale

1. Go to the [Tailscale Admin Console](https://login.tailscale.com/admin/dns)
2. Navigate to the **DNS** page
3. Add your server's Tailscale IP address as a global nameserver
4. **Important:** Enable the **Override DNS servers** toggle
   - This ensures that all devices in your Tailscale network use AdGuard Home for DNS
   - It overrides any local DNS settings that devices might have

### Step 6.3: Disable Key Expiry (Recommended)

To prevent DNS interruptions, disable key expiry for your AdGuard Home server:

1. Go to the [Tailscale Admin Console](https://login.tailscale.com/admin/machines)
2. Find your AdGuard Home server
3. Click on it to view details
4. Disable key expiry to prevent authentication interruptions

### Alternative: Router-Level Configuration

If you want to protect your entire local network (not just Tailscale devices), you can also configure your router to use AdGuard Home as its DNS server:

- Set your router's DNS server to point to your server's local IP address
- This will protect all devices on your local network, even those not connected to Tailscale

---

## Step 7: Testing the Setup

Let's verify everything is working:

```bash
# Test DNS resolution
nslookup google.com YOUR_TAILSCALE_IP

# Test ad-blocking (this should be blocked)
nslookup doubleclick.net YOUR_TAILSCALE_IP

# Check if HTTPS is working (replace with your MagicDNS domain)
curl -I https://your-magicdns-domain.ts.net
```

---

## Step 8: Accessing the Web Interface

You can now access AdGuard Home's web interface through Caddy at:
`https://your-magicdns-domain.ts.net:3000`

This gives you:
- Automatic HTTPS certificates
- Secure access via Tailscale
- Full AdGuard Home dashboard

---

## Configuration Tips

### Adding Custom Block Lists

In the AdGuard Home dashboard:
1. Go to **Filters** → **DNS blocklists**
2. Add popular lists like:
   - `https://adguardteam.github.io/AdGuardSDNSFilter/Filters/filter.txt`
   - `https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts`

### Setting Up Upstream DNS

I recommend using DNS-over-HTTPS for better privacy:
- Cloudflare: `https://cloudflare-dns.com/dns-query`
- Google: `https://dns.google/dns-query`

### Monitoring and Logs

Check the logs regularly:
```bash
# View AdGuard Home logs
docker-compose logs adguardhome

# View Caddy logs
sudo journalctl -u caddy -f
```



---

## Troubleshooting Common Issues

### Port Conflicts
If you get port conflicts, check what's using the ports:
```bash
sudo netstat -tulpn | grep :53
sudo netstat -tulpn | grep :3000
```

### DNS Not Working
Make sure your firewall allows DNS traffic:
```bash
sudo ufw allow 53/tcp
sudo ufw allow 53/udp
```


---

## Security Considerations

1. **Keep AdGuard Home Updated**: Regularly update the Docker image
2. **Use Strong Passwords**: Create a strong admin password
3. **Monitor Access**: Check the logs for unusual activity
4. **Backup Configuration**: Regularly backup your AdGuard Home configuration

---

## Performance Optimization

For better performance:
- Use DNS-over-HTTPS upstream servers
- Enable DNS caching
- Consider using faster upstream DNS providers
- Monitor query response times in the dashboard

---

## Final Thoughts

This setup gives you a powerful, privacy-focused DNS solution that you control completely. The combination of AdGuard Home, Tailscale, and Caddy provides:

- **Privacy**: DNS queries are filtered and encrypted
- **Security**: Access is restricted to your Tailscale network
- **Convenience**: Automatic HTTPS and easy remote access
- **Control**: Complete ownership of your DNS infrastructure

The best part? Once it's set up, it just works. You'll notice fewer ads across your network, and you'll have better privacy protection.

---

## Useful Commands

```bash
# Update AdGuard Home
docker-compose pull
docker-compose up -d

# View real-time logs
docker-compose logs -f adguardhome

# Backup configuration
cp -r ./work ./backup-$(date +%Y%m%d)

# Restart services
docker-compose restart

# Check container status
docker-compose ps
```

---

*This setup has been running smoothly on my home lab for several months now. The combination of self-hosted DNS filtering with secure remote access has been a game-changer for my network privacy and ad-blocking needs.*

*Let me know if you run into any issues or have questions about the setup!*

---

## Credits & Resources

- **[AdGuard Home](https://github.com/AdguardTeam/AdGuardHome)** - Open-source DNS filtering solution
- **[Tailscale](https://tailscale.com/)** - Secure mesh VPN network
- **[Caddy](https://caddyserver.com/)** - Modern web server with automatic HTTPS
- **[Tailscale Pi-hole Guide](https://tailscale.com/kb/1114/pi-hole)** - Official documentation for DNS server setup with Tailscale
- **[Docker](https://www.docker.com/)** - Containerization platform

*Special thanks to the open-source community for making these tools available and the Tailscale team for their excellent documentation.* 