# 📋 Setup & Deployment Guide for Harish Costa Portfolio

## ✅ Project Structure Created

Your complete portfolio has been scaffolded with the following structure:

```
harishcosta-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ✅ Root layout with metadata
│   │   ├── page.tsx            ✅ Main page with 3D scene
│   │   └── globals.css         ✅ Global styles + Tailwind
│   ├── components/
│   │   ├── Navbar.tsx          ✅ Navigation header
│   │   ├── Scene.tsx           ✅ 3D particle background
│   │   ├── ScrollSections.tsx  ✅ Main content container
│   │   ├── Projects.tsx        ✅ Project showcase (vertical scroll)
│   │   ├── Skills.tsx          ✅ Skills with animated bars
│   │   ├── Experience.tsx      ✅ Work experience grid
│   │   ├── CustomCursor.tsx    ✅ Custom cursor effect
│   │   └── SoundToggle.tsx     ✅ Sound control button
│   └── hooks/
│       └── useMagnetic.ts      ✅ Magnetic cursor pull effect
├── public/                     ⚠️  Empty (add video/images here)
├── package.json               ✅ All dependencies included
├── tsconfig.json              ✅ TypeScript configuration
├── postcss.config.mjs         ✅ PostCSS configuration
├── next.config.ts             ✅ Next.js configuration
├── eslint.config.mjs          ✅ ESLint configuration
├── .gitignore                 ✅ Git ignore file
└── README.md                  ✅ Project documentation
```

---

## 🚀 Quick Start

### Step 1: Navigate to Project
```bash
cd C:\Users\DAVIS BROOKS\harishcosta-portfolio
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
# or
bun install
```

### Step 3: Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Content Customization

All content is ready to use with Harish's information. However, update these areas:

### 1. **Contact Information** (ScrollSections.tsx)
```javascript
// Lines 243-244
href="mailto:harish.costa@example.com"  // ← Update email
// Line 249
"harish.costa@email.com"                // ← Same here

// Line 334
window.location.href = `mailto:harish.costa@email.com...`  // ← And here
```

### 2. **Social Links** (ScrollSections.tsx)
```javascript
// Lines 268-272
<a href="https://github.com">                    // ← Your GitHub
<a href="https://linkedin.com">                  // ← Your LinkedIn
```

### 3. **Projects Data** (Projects.tsx)
Edit the `PROJECTS` array (lines 11-46) to add/remove/modify projects.

### 4. **Skills Data** (Skills.tsx)
Edit `SKILL_CATEGORIES` (lines 8-36) and `TECH_BADGES` (lines 38-41).

### 5. **Experience Data** (Experience.tsx)
Edit `EXPERIENCES` array (lines 11-33).

### 6. **Color Scheme** (Optional - globals.css)
```css
/* Currently using: Blue (#3B82F6) + Cyan (#06B6D4) */
--color-primary: #3B82F6;   /* Change to your preferred color */
--color-accent: #06B6D4;    /* Change accent color */
```

---

## 📦 Optional: Add Video/Images

### Public Assets
Place any media files in the `public/` directory:
```
public/
├── your-video.mp4
├── your-image.jpg
├── your-logo.svg
└── ...
```

To use in components:
```jsx
<img src="/your-image.jpg" alt="..." />
<video src="/your-video.mp4" />
```

---

## 🏗️ Build & Optimize

### Create Production Build
```bash
npm run build
```

### Test Production Build Locally
```bash
npm start
```

### Check Build Size
The build is optimized for:
- SSR disabled for Three.js (no 3D on server)
- Dynamic imports for better code splitting
- Responsive images
- Minified CSS/JS

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Zero Config)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**Automatic Benefits on Vercel:**
- Auto SSL/HTTPS
- CDN edge caching
- Automatic deployments on git push
- Analytics included

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

### Option 3: GitHub Pages + GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

Update `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};
```

---

## ✨ Features Overview

| Section | Component | Features |
|---------|-----------|----------|
| **Hero** | ScrollSections | Large title, location, scroll cue |
| **About** | ScrollSections | Bio, personal stats (4 cards) |
| **Projects** | Projects.tsx | Vertical scroll timeline (4 projects) |
| **Skills** | Skills.tsx | 3 categories, animated bars, 12 tech badges |
| **Experience** | Experience.tsx | 2 work experience cards with highlights |
| **Contact** | ScrollSections | Contact form, email/location cards, social links |
| **Background** | Scene.tsx | 4000 particles reacting to cursor |
| **Header** | Navbar.tsx | Fixed nav with section tracking + mobile menu |
| **Cursor** | CustomCursor.tsx | Blue/cyan custom cursor with hover effects |

---

## 🔧 Common Customizations

### Change Navigation Links
Edit `src/components/Navbar.tsx` lines 7-12:
```typescript
const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Projects",   href: "#projects"   },
  // Add/remove as needed
];
```

### Modify Animation Speed
Edit `src/components/ScrollSections.tsx`:
```typescript
// Smooth scroll speed (lower = faster)
lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1.3 });

// GSAP animation speed (scrub value)
scrollTrigger: {
  scrub: 1.5,  // ← Adjust this (higher = slower)
}
```

### Disable 3D Scene
Edit `src/app/page.tsx`:
```typescript
// Comment out or remove:
// <div className="fixed inset-0 z-0 pointer-events-none">
//   <Scene />
// </div>
```

---

## 🐛 Troubleshooting

### Issue: "3D scene not loading"
**Solution**: The scene dynamically imports only on client. Check browser console for errors.

### Issue: "Animations feel laggy"
**Solution**: Reduce particle count in `src/components/Scene.tsx`:
```typescript
const PARTICLE_COUNT = 2000;  // Reduce from 4000
```

### Issue: "Build fails"
**Solution**: Clear Next.js cache:
```bash
rm -rf .next
npm install
npm run build
```

### Issue: "Mobile menu not closing"
**Solution**: Already handled. Check browser's viewport width.

---

## 📊 Performance Metrics

- **Lighthouse Score**: Aim for 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

To check:
```bash
npm run build
npm start
# Open Chrome DevTools → Lighthouse
```

---

## 📝 Environment Variables (Optional)

Create `.env.local` for sensitive data:
```env
NEXT_PUBLIC_GITHUB_URL=https://github.com/harish
NEXT_PUBLIC_EMAIL=harish.costa@email.com
```

Access in components:
```typescript
const email = process.env.NEXT_PUBLIC_EMAIL;
```

---

## 🎯 Final Checklist Before Deployment

- [ ] Update email address in all locations
- [ ] Update GitHub/LinkedIn links
- [ ] Update projects with real examples
- [ ] Review all skill levels (0-100)
- [ ] Update experience dates
- [ ] Add a profile photo (optional)
- [ ] Test on mobile devices
- [ ] Run build without errors: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Deploy to your hosting platform
- [ ] Test deployed site on multiple browsers

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [GSAP Docs](https://gsap.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🤝 Support

For questions about the portfolio:
- Email: harish.costa@email.com
- GitHub: [Your GitHub URL]
- LinkedIn: [Your LinkedIn URL]

---

**Created**: March 2026  
**Framework**: Next.js 16.1.6  
**Status**: ✅ Ready for Development

Enjoy your new portfolio! 🚀
