# PlumbaFix - Smart Plumbing Assistant

A comprehensive web application that helps users identify plumbing issues, connect with certified plumbers, and track job progress in real-time.

## Features

### User Features
- 🔍 **AI Diagnostic Tool** - Upload photos and get instant plumbing issue analysis
- 🛠️ **DIY Guides** - Step-by-step instructions for common plumbing fixes
- 💰 **Credit System** - Earn credits by choosing DIY repairs
- 📍 **Plumber Matching** - Connect with certified local plumbers
- 💳 **Quote Comparison** - Compare quotes from multiple plumbers
- 📊 **Job Tracking** - Real-time progress tracking with live updates
- ⭐ **Reviews & Ratings** - Rate plumbers after job completion
- 🎮 **Gamification** - Badges, levels, and achievements

### Plumber Features
- 📋 **Job Requests** - View and accept nearby plumbing jobs
- 💵 **Quote Submission** - Submit competitive quotes to customers
- 🚗 **Navigation** - Get directions to job locations
- 📈 **Earnings Dashboard** - Track income and job statistics
- ⭐ **Profile Management** - Showcase skills and certifications

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Motion (Framer Motion)
- **Forms**: React Hook Form

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn

### Installation

1. Clone the repository or download the code
2. Install dependencies:

\`\`\`bash
npm install
# or
pnpm install
# or
yarn install
\`\`\`

3. Start the development server:

\`\`\`bash
npm run dev
# or
pnpm dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
# or
pnpm build
# or
yarn build
\`\`\`

The production-ready files will be in the `dist` directory.

### Preview Production Build

\`\`\`bash
npm run preview
# or
pnpm preview
# or
yarn preview
\`\`\`

## Project Structure

\`\`\`
plumbafix/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── figma/          # Figma-specific components
│   ├── Home.tsx        # User home screen
│   ├── Diagnostic.tsx  # AI diagnostic flow
│   ├── Jobs.tsx        # Jobs listing
│   ├── JobDetails.tsx  # Job detail view
│   └── ...             # Other feature components
├── styles/
│   └── globals.css     # Global styles and Tailwind config
├── guidelines/         # Development guidelines
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.html          # HTML template
\`\`\`

## Deployment

### Deploy to Vercel

1. Install Vercel CLI: \`npm i -g vercel\`
2. Run: \`vercel\`
3. Follow the prompts

Or use the [Vercel Dashboard](https://vercel.com/new):
- Import your Git repository
- Vercel will auto-detect Vite
- Click "Deploy"

### Deploy to Netlify

1. Build the project: \`npm run build\`
2. Upload the \`dist\` folder to [Netlify](https://app.netlify.com/drop)

Or use Netlify CLI:
\`\`\`bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
\`\`\`

### Deploy to GitHub Pages

1. Update \`vite.config.ts\` to set the base path:
\`\`\`ts
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
\`\`\`

2. Build and deploy:
\`\`\`bash
npm run build
npx gh-pages -d dist
\`\`\`

## Color Scheme

- Primary Blue: `#007AFF`
- Background: `#F4F8FB`
- Success Green: `#00C853`
- Error Red: `#FF3B30`
- Warning Orange: `#FF9500`

## Documentation

- [Quick Start Guide](./QUICK_START.md)
- [Web App Guide](./WEB_APP_GUIDE.md)
- [Booking Flow Guide](./BOOKING_FLOW_GUIDE.md)
- [Payment Flow Guide](./PAYMENT_FLOW_GUIDE.md)
- [Quote Comparison Guide](./QUOTE_COMPARISON_GUIDE.md)
- [Gamification Guide](./GAMIFICATION_GUIDE.md)
- [Profile Screen Guide](./PROFILE_SCREEN_GUIDE.md)
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)

## License

Copyright © 2024 PlumbaFix. All rights reserved.

## Support

For issues or questions, please contact support@plumbafix.com
