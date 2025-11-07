# PlumbaFix Deployment Guide

This guide will help you download, set up, and deploy your PlumbaFix application.

## 📦 Downloading Your Code

Your PlumbaFix app code is ready to download. Here's what you need to do:

### Option 1: Download from Figma Make (Recommended)
1. Look for the download/export button in your Figma Make interface
2. This will download all your files as a ZIP archive
3. Extract the ZIP to your desired location

### Option 2: Copy Files Manually
If direct download isn't available:
1. Copy each file from the editor to your local machine
2. Maintain the same folder structure shown in the file tree
3. Ensure all dependencies are listed in `package.json`

## 🚀 Local Setup

Once you have the files on your computer:

### 1. Install Node.js
- Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)
- Verify installation: `node --version`

### 2. Install Dependencies
Open your terminal in the project directory and run:

\`\`\`bash
npm install
\`\`\`

This will install all required packages listed in `package.json`.

### 3. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Your app will open at `http://localhost:3000`

### 4. Build for Production
\`\`\`bash
npm run build
\`\`\`

This creates optimized production files in the `dist` folder.

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**
- Zero configuration needed
- Free tier available
- Automatic HTTPS
- Global CDN
- Perfect for React apps

**Steps:**

1. **Via Vercel Dashboard (No CLI needed)**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - If your code is on GitHub/GitLab/Bitbucket, connect your repository
   - If not, use the "Deploy from folder" option
   - Vercel auto-detects Vite configuration
   - Click "Deploy"
   - Done! Your app is live

2. **Via Vercel CLI**
   \`\`\`bash
   npm i -g vercel
   vercel login
   vercel
   \`\`\`
   - Follow the prompts
   - Answer questions about project setup
   - Your app will be deployed and given a URL

**Custom Domain:**
- Go to your Vercel project settings
- Navigate to "Domains"
- Add your custom domain (e.g., plumbafix.com)

---

### Option 2: Netlify

**Why Netlify?**
- Drag-and-drop deployment
- Free tier with generous limits
- Easy form handling
- Built-in CI/CD

**Steps:**

1. **Drag & Drop (Simplest)**
   - Build your app: `npm run build`
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag your `dist` folder to the page
   - Your site is live instantly!

2. **Via Netlify Dashboard with Git**
   - Push your code to GitHub/GitLab/Bitbucket
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy"

3. **Via Netlify CLI**
   \`\`\`bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   \`\`\`

---

### Option 3: GitHub Pages (Free)

**Why GitHub Pages?**
- Completely free
- Good for portfolios and demos
- Simple setup

**Steps:**

1. **Update Configuration**
   
   Edit `vite.config.ts`:
   \`\`\`typescript
   export default defineConfig({
     base: '/plumbafix/', // Replace with your repository name
     // ... rest of config
   })
   \`\`\`

2. **Deploy**
   \`\`\`bash
   npm run build
   npx gh-pages -d dist
   \`\`\`

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages"
   - Set source to `gh-pages` branch
   - Your site will be at: `https://yourusername.github.io/plumbafix/`

---

### Option 4: AWS Amplify

**Why AWS Amplify?**
- AWS infrastructure
- Good for scaling
- Backend integration ready

**Steps:**

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
3. Click "New app" → "Host web app"
4. Connect your repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Output directory: `dist`
6. Click "Save and deploy"

---

### Option 5: Firebase Hosting

**Why Firebase?**
- Google infrastructure
- Easy backend integration
- Free SSL

**Steps:**

1. **Install Firebase CLI**
   \`\`\`bash
   npm install -g firebase-tools
   firebase login
   \`\`\`

2. **Initialize Firebase**
   \`\`\`bash
   firebase init hosting
   \`\`\`
   - Select "Use an existing project" or create new
   - Set public directory to: `dist`
   - Configure as single-page app: `Yes`
   - Don't overwrite `index.html`: `No`

3. **Deploy**
   \`\`\`bash
   npm run build
   firebase deploy
   \`\`\`

---

### Option 6: Railway

**Why Railway?**
- Simple deployment
- Great developer experience
- Easy environment variables

**Steps:**

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your repository
4. Railway auto-detects settings
5. Click "Deploy"

---

### Option 7: Render

**Why Render?**
- Free tier for static sites
- Easy setup
- Good performance

**Steps:**

1. Go to [render.com](https://render.com)
2. Click "New Static Site"
3. Connect your repository
4. Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Create Static Site"

---

## 🔧 Environment Variables

If you add API keys or secrets later:

1. Create a `.env` file in your project root
2. Add variables: `VITE_API_KEY=your_key_here`
3. Access in code: `import.meta.env.VITE_API_KEY`
4. Add `.env` to `.gitignore` (already done)
5. Set environment variables in your hosting platform's dashboard

---

## 📱 Custom Domain Setup

### For Any Platform:

1. **Buy a domain** from Namecheap, GoDaddy, Google Domains, etc.

2. **Get deployment URL** from your hosting platform

3. **Update DNS records:**
   - Add a CNAME record pointing to your deployment URL
   - Or use A records for apex domain

4. **Configure in hosting dashboard:**
   - Add your custom domain
   - Wait for SSL certificate (automatic)
   - DNS propagation can take 24-48 hours

---

## 🧪 Testing Before Deployment

\`\`\`bash
# Build production version
npm run build

# Preview production build locally
npm run preview
\`\`\`

Visit `http://localhost:4173` to test the production build.

---

## 📊 Recommended Deployment Flow

**For Portfolio/Demo:**
→ Use **Netlify Drag & Drop** or **Vercel**

**For Production App:**
→ Use **Vercel** or **Netlify** with Git integration

**For Enterprise:**
→ Use **AWS Amplify** or **Firebase**

**For GitHub Project:**
→ Use **GitHub Pages**

---

## 🐛 Troubleshooting

### Build Errors
- Clear `node_modules`: `rm -rf node_modules && npm install`
- Clear cache: `rm -rf dist .vite`
- Check Node.js version: `node --version` (should be 18+)

### 404 on Routes
- Most platforms need SPA configuration
- Ensure rewrites are set to redirect to `index.html`
- Vercel/Netlify handle this automatically

### Environment Variables Not Working
- Variables must start with `VITE_`
- Rebuild after changing variables
- Set them in your hosting platform's dashboard

---

## 📞 Need Help?

- Check deployment platform documentation
- Review build logs for specific errors
- Ensure all dependencies are in `package.json`
- Test locally with `npm run build && npm run preview`

---

## ✅ Deployment Checklist

- [ ] Code downloaded/cloned locally
- [ ] Dependencies installed (`npm install`)
- [ ] App runs locally (`npm run dev`)
- [ ] Production build works (`npm run build`)
- [ ] Preview build tested (`npm run preview`)
- [ ] Hosting platform chosen
- [ ] Repository connected (if using Git)
- [ ] Build settings configured
- [ ] Deployment successful
- [ ] Live URL works
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active

---

Your PlumbaFix app is now ready to share with the world! 🎉
