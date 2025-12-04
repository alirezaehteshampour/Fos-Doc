# FOS Documentation

Professional documentation site for the FOS blockchain platform, built with [Fumadocs](https://fumadocs.vercel.app/) and Next.js 16.

![FOS Docs](public/logo.png)

## ✨ Features

- 📚 **15+ Documentation Pages** - Whitepaper, Smart Contracts, API, Platform guides
- 🤖 **AI Assistant** - Powered by Google Gemini 2.5 Flash
- 🔍 **Full-text Search** - Built-in Orama search
- 🎨 **Custom Branding** - Gradient theme matching FOS logo
- 📱 **Fully Responsive** - Mobile-optimized with full-screen chat
- 🌙 **Dark Mode** - Beautiful dark theme by default

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (comes with Node.js)
- **Git** (for cloning)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/fos-docs.git
cd fos-docs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> 💡 Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🏭 Production Deployment

### Option A: Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variable: `GEMINI_API_KEY`
4. Deploy!

### Option B: Self-Hosted Server

#### Build for Production

```bash
npm run build
```

#### Start Production Server

```bash
npm start
```

The app runs on port **3000** by default.

#### Using PM2 (Recommended for Production)

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start npm --name "fos-docs" -- start

# Auto-restart on server reboot
pm2 startup
pm2 save
```

#### Using Docker

```dockerfile
# Dockerfile included in repo
docker build -t fos-docs .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key fos-docs
```

---

## 📁 Project Structure

```
fos-docs/
├── content/docs/           # MDX documentation files
│   ├── whitepaper/         # Whitepaper docs
│   ├── smart-contracts/    # Smart contract docs
│   ├── platform/           # Platform docs
│   ├── api/                # API reference
│   └── infrastructure/     # Infrastructure docs
├── public/                 # Static assets
│   └── logo.png           # FOS logo
├── src/
│   ├── app/               # Next.js app router
│   │   ├── api/           # API routes (chat, search)
│   │   ├── docs/          # Documentation pages
│   │   └── page.tsx       # Landing page
│   ├── components/        # React components
│   │   └── ai-chat.tsx    # AI chat widget
│   └── lib/               # Utilities
└── .env.local             # Environment variables (create this)
```

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI chat |

---

## 🔧 Customization

### Changing the Logo

Replace `public/logo.png` with your logo file.

### Updating Theme Colors

Edit the gradient colors in:
- `src/app/page.tsx` (landing page)
- `src/components/ai-chat.tsx` (chat widget)
- `src/lib/layout.shared.tsx` (navigation)

### Adding Documentation

1. Create `.mdx` file in `content/docs/`
2. Add frontmatter:
   ```mdx
   ---
   title: Page Title
   description: Page description
   ---
   
   Your content here...
   ```
3. Update `meta.json` in the parent folder

---

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Documentation**: Fumadocs
- **Styling**: Tailwind CSS 4
- **AI**: Google Gemini 2.5 Flash
- **Search**: Orama
- **Language**: TypeScript

---

## 📄 License

Private - All rights reserved.

---

## 🆘 Support

For issues or questions, contact the FOS development team.
