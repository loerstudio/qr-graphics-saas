# QRGraphics - AI-Powered QR Code Generator

🚀 **Live Demo**: [https://qr-graphics-saas.vercel.app](https://qr-graphics-saas.vercel.app)

Transform your boring QR codes into stunning visual masterpieces with AI-generated graphics!

## ✨ Features

- **Simple QR Generator** - Create basic QR codes instantly
- **AI-Powered QR Art** - Generate stunning QR codes with AI backgrounds
- **Multiple Art Styles** - Fire, neon, cyberpunk, minimal, grunge, gradient
- **Reference Image Upload** - Use your own images for AI generation
- **High-Resolution Output** - Download in 4K quality
- **Fully Scannable** - QR codes maintain perfect functionality
- **Commercial Use** - All generated codes are free for commercial use

## 🎨 Art Styles

1. **Realistic Fire** 🔥 - Photorealistic flames and dramatic effects
2. **Neon Cyber** 🌃 - Cyberpunk style with electric neon glow
3. **Artistic** 🎨 - Creative digital art interpretation
4. **Minimal Tech** ⚡ - Clean, modern geometric design
5. **Grunge Metal** 🎸 - Dark, gritty industrial aesthetic
6. **Gradient Flow** 🌊 - Smooth color transitions

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **AI Generation**: FAL AI (Flux Schnell model)
- **Image Processing**: Sharp, QRCode.js
- **Deployment**: Vercel
- **Database**: Neon PostgreSQL (optional)
- **Auth**: Clerk (optional)

## 🚀 Quick Start

### Option 1: Simple Mode
1. Go to [/simple](https://qr-graphics-saas.vercel.app/simple)
2. Enter your URL
3. Generate and download instantly

### Option 2: Pro AI Mode
1. Go to [/create](https://qr-graphics-saas.vercel.app/create)
2. Enter your destination URL
3. Write a detailed prompt (e.g., "Muscular warrior in flames")
4. Upload reference image (optional)
5. Select art style
6. Generate stunning QR art!

## 📱 Example Use Cases

- **Marketing Campaigns** - Eye-catching QR codes for ads
- **Business Cards** - Professional branded QR codes
- **Event Promotion** - Artistic QR codes for invitations
- **Product Packaging** - Beautiful QR codes for product info
- **Social Media** - Shareable QR art for profiles

## ⚙️ Environment Setup

```bash
# Clone the repository
git clone https://github.com/loerstudio/qr-graphics-saas.git
cd qr-graphics-saas

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Add your API keys
FAL_KEY=your-fal-key-here
DATABASE_URL=your-neon-db-url
CLERK_SECRET_KEY=your-clerk-key

# Run development server
npm run dev
```

## 🔧 API Configuration

### FAL AI Setup
1. Sign up at [fal.ai](https://fal.ai)
2. Get your API key
3. Add `FAL_KEY=your-key` to environment variables

### Optional: Database Setup
1. Create database at [Neon](https://neon.tech)
2. Add `DATABASE_URL` to environment
3. Run `npm run db:generate && npm run db:migrate`

## 📂 Project Structure

```
├── app/
│   ├── page.tsx              # Homepage
│   ├── simple/page.tsx       # Simple QR generator
│   ├── create/page.tsx       # AI QR art generator
│   └── api/
│       ├── generate-ai-qr/   # AI generation endpoint
│       └── generate-pro/     # Gradient fallback
├── lib/
│   ├── qr-generator.ts       # QR code utilities
│   └── db/                   # Database schema
└── README.md
```

## 🎯 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/loerstudio/qr-graphics-saas)

Or manually:
```bash
npm run build
vercel --prod
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Demo**: [qr-graphics-saas.vercel.app](https://qr-graphics-saas.vercel.app)
- **GitHub**: [github.com/loerstudio/qr-graphics-saas](https://github.com/loerstudio/qr-graphics-saas)
- **Creator**: [@loerstudio](https://github.com/loerstudio)

---

Made with ❤️ using Next.js and AI
