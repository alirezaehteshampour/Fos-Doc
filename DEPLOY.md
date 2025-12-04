# FOS Documentation - Server Deployment Guide

## 📋 Prerequisites

Before deploying, ensure your server has:

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Node.js | 18.x+ | `node --version` |
| npm | 9.x+ | `npm --version` |
| Git | Any | `git --version` |
| PM2 (optional) | Latest | `pm2 --version` |
| Docker (optional) | 20.x+ | `docker --version` |

---

## 🚀 Deployment Options

Choose the method that fits your infrastructure:

1. [**Standard Node.js**](#option-1-standard-nodejs) - Direct npm deployment
2. [**PM2 Process Manager**](#option-2-pm2-recommended) - Production-grade with auto-restart
3. [**Docker**](#option-3-docker) - Containerized deployment

---

## Option 1: Standard Node.js

### Step 1: Clone Repository

```bash
git clone https://github.com/YOUR_ORG/fos-docs.git
cd fos-docs
```

### Step 2: Install Dependencies

```bash
npm ci --production=false
```

### Step 3: Configure Environment

```bash
cp .env.example .env.local
nano .env.local  # or vim, or any editor
```

Add your Gemini API key:
```env
GEMINI_API_KEY=AIzaSy...your_key_here
```

### Step 4: Build for Production

```bash
npm run build
```

### Step 5: Start Server

```bash
npm start
```

Server runs on `http://localhost:3000`

---

## Option 2: PM2 (Recommended)

PM2 provides automatic restarts, load balancing, and monitoring.

### Step 1: Install PM2 Globally

```bash
npm install -g pm2
```

### Step 2: Clone & Setup (same as Option 1, Steps 1-4)

```bash
git clone https://github.com/YOUR_ORG/fos-docs.git
cd fos-docs
npm ci --production=false
cp .env.example .env.local
# Edit .env.local with your GEMINI_API_KEY
npm run build
```

### Step 3: Start with PM2

```bash
pm2 start npm --name "fos-docs" -- start
```

### Step 4: Configure Auto-Restart on Boot

```bash
pm2 startup
pm2 save
```

### Useful PM2 Commands

| Command | Description |
|---------|-------------|
| `pm2 status` | View running processes |
| `pm2 logs fos-docs` | View logs |
| `pm2 restart fos-docs` | Restart application |
| `pm2 stop fos-docs` | Stop application |
| `pm2 monit` | Real-time monitoring |

---

## Option 3: Docker

### Step 1: Clone Repository

```bash
git clone https://github.com/YOUR_ORG/fos-docs.git
cd fos-docs
```

### Step 2: Create Environment File

```bash
cp .env.example .env
# Edit .env with your GEMINI_API_KEY
```

### Step 3: Deploy with Docker Compose

```bash
docker-compose up -d --build
```

### Step 4: Verify Deployment

```bash
docker-compose ps
docker-compose logs -f
```

### Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start containers |
| `docker-compose down` | Stop containers |
| `docker-compose logs` | View logs |
| `docker-compose restart` | Restart containers |

---

## 🔧 Reverse Proxy Setup (Nginx)

For production, use Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name docs.fos.ooo;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable SSL with Certbot

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d docs.fos.ooo
```

---

## 🔄 Updating the Application

### Standard/PM2 Update

```bash
cd fos-docs
git pull origin main
npm ci
npm run build
pm2 restart fos-docs  # if using PM2
# or: npm start        # if using standard Node.js
```

### Docker Update

```bash
cd fos-docs
git pull origin main
docker-compose down
docker-compose up -d --build
```

---

## 🩺 Health Checks

### Check if Server is Running

```bash
curl http://localhost:3000
```

### Check Process Status (PM2)

```bash
pm2 status
```

### Check Container Status (Docker)

```bash
docker-compose ps
```

---

## 🔥 Troubleshooting

### Port 3000 Already in Use

```bash
# Find process using port 3000
lsof -i :3000
# or on Windows
netstat -ano | findstr :3000

# Kill the process
kill -9 <PID>
```

### Build Failing

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm ci
npm run build
```

### Docker Build Issues

```bash
# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

---

## 📊 Monitoring (Optional)

### PM2 with Keymetrics

```bash
pm2 link <your_key> <your_secret>
```

### Docker with Portainer

```bash
docker volume create portainer_data
docker run -d -p 9000:9000 --name portainer \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce
```

---

## 📞 Support

For deployment issues, contact the FOS development team.
