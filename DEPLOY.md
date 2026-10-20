# FOS Documentation - Server Deployment Guide

## 📋 Prerequisites

Before deploying, ensure your server has:

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Node.js | 20.9+ | `node --version` |
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
git clone https://github.com/alirezaehteshampour/Fos-Doc.git
cd Fos-Doc
```

### Step 2: Install Dependencies

```bash
npm ci --include=dev
```

### Step 3: Configure Environment

```bash
cp .env.example .env.local
nano .env.local  # or vim, or any editor
```

Docs and search do not require a key. Enable AI chat by configuring `GEMINI_API_KEY` securely in your hosting provider or ignored cloud-local environment file. Never commit real credentials. Example placeholder:
```env
GEMINI_API_KEY=your_key_here
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
git clone https://github.com/alirezaehteshampour/Fos-Doc.git
cd Fos-Doc
npm ci --include=dev
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
git clone https://github.com/alirezaehteshampour/Fos-Doc.git
cd Fos-Doc
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

For the existing `fos.ooo/document` mount, use only the documentation-specific locations in **Hosting only the documentation under /document** below. Keep the main website, its TLS configuration, and its other upstreams unchanged.

---

## 🔄 Updating the Application

### Standard/PM2 Update

```bash
cd Fos-Doc
git pull origin main
npm ci
npm run build
pm2 restart fos-docs  # if using PM2
# or: npm start        # if using standard Node.js
```

### Docker Update

```bash
cd Fos-Doc
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

## Current documentation artifacts

The committed `public/whitepaper.pdf` and `public/whitepaper.tex` are the Robinhood/three-plan edition. Deploy both with the other public assets. Prior editions remain in Git history and are not published. Regenerate artifacts before deployment with `npm run whitepaper:build` in the prepared cloud environment, then run `npm run docs:check`, `npm run lint`, and `npm run build`. A production Node/Docker host needs only the committed artifacts, not a LaTeX installation.

Inter is vendored with its license; Google Fonts egress is not required. Gemini chat requires HTTPS access to `generativelanguage.googleapis.com`. A Git push updates repository content; the hosted site changes only when its configured deployment pipeline completes. Verify `/docs/referral`, `/docs/whitepaper`, `/whitepaper.pdf`, and `/whitepaper.tex` on the actual deployment.

## Hosting only the documentation under /document

The app now builds for `/document` by default. Keep the prefix when forwarding requests to the documentation server. Build-time `NEXT_PUBLIC_BASE_PATH` controls the prefix; use an empty value only for a root deployment and rebuild afterward.

Only these documentation locations are relevant to an existing Nginx server block. Preserve all other site locations, TLS settings, and upstreams:

```nginx
location = /document {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
location ^~ /document/ {
    # No trailing slash after the upstream: preserve /document in the request.
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Use the actual documentation upstream port. Do not route missing documentation assets to the main website's HTML fallback. `/document/whitepaper.pdf` must return `application/pdf` and begin with `%PDF-`; `/document/logo.png` and the generated image URLs must return images. Search and chat use `/document/api/...`. Confirm navigation stays under `/document`.

Proxy the exact `/document` URL too. Do not force it to `/document/`: Next.js canonicalizes the trailing slash back to `/document`, so forcing a slash in Nginx would create a redirect loop.

After deployment, check the whitepaper iframe and both PDF links, logo images on homepage/docs/research, mobile navigation, and an actual search. Historical `/document/archive/whitepaper-2025.pdf` and `/document/docs/archive_legacy/...` must return 404. Old research bookmarks redirect to the current report; old article content is not published.
