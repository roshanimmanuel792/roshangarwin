# 🎯 Quick Reference Card

## Essential Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## File Locations for Quick Edits

| What to Change | File | Lines |
|---|---|---|
| Email address | `src/components/ScrollSections.tsx` | 243-244, 249, 334 |
| GitHub/LinkedIn links | `src/components/ScrollSections.tsx` | 268-272 |
| Projects | `src/components/Projects.tsx` | 11-46 |
| Skills & proficiency | `src/components/Skills.tsx` | 8-41 |
| Work experience | `src/components/Experience.tsx` | 11-33 |
| Navigation menu | `src/components/Navbar.tsx` | 7-12 |
| Colors | `src/app/globals.css` | 3-8 |
| Page metadata | `src/app/layout.tsx` | 15-18 |

---

## File Structure Tree

```
harishcosta-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          (Root layout)
│   │   ├── page.tsx            (Main page - START HERE)
│   │   └── globals.css         (Global styles)
│   ├── components/
│   │   ├── Navbar.tsx          (Header nav)
│   │   ├── Scene.tsx           (3D background)
│   │   ├── ScrollSections.tsx  (Hero → Contact)
│   │   ├── Projects.tsx        (4 projects)
│   │   ├── Skills.tsx          (Tech skills)
│   │   ├── Experience.tsx      (Work history)
│   │   ├── CustomCursor.tsx    (Cursor effect)
│   │   └── SoundToggle.tsx     (Mute button)
│   └── hooks/
│       └── useMagnetic.ts      (Button hover effect)
├── public/                     (Images/videos)
├── package.json               (Dependencies)
├── tsconfig.json              (TypeScript config)
├── postcss.config.mjs         (PostCSS config)
├── next.config.ts             (Next.js config)
├── eslint.config.mjs          (Linting)
├── .gitignore                 (Git config)
├── README.md                  (Project doc)
└── SETUP_GUIDE.md             (This doc)
```

---

## Colors Used

```css
Primary Blue:   #3B82F6
Accent Cyan:    #06B6D4
Background:     #050505 (near black)
Foreground:     #ededed (near white)
```

---

## Sections & IDs

```html
<!-- Navigation links to these sections -->
#about       - About You section
#projects    - Projects showcase
#skills      - Technical skills
#experience  - Work experience
#contact     - Contact form
```

---

## Data Objects to Edit

### Projects (4 items)
```typescript
{
  id: 1,
  period: "2024",
  title: "Project Name",
  subtitle: "Tech Stack",
  description: "...",
  tags: ["Tag1", "Tag2"],
}
```

### Skills (3 categories × 4 skills)
```typescript
{
  label: "Category",
  skills: [
    { name: "Skill", level: 75 },  // 0-100
  ]
}
```

### Experience (2 roles)
```typescript
{
  id: 1,
  period: "2024",
  role: "Position",
  company: "Company",
  description: "...",
  highlights: ["tag1", "tag2"],
}
```

---

## Component Dependencies

```
page.tsx
├── Navbar.tsx
│   └── useMagnetic hook
├── Scene.tsx (3D)
├── CustomCursor.tsx
└── ScrollSections.tsx
    ├── Projects.tsx
    ├── Skills.tsx
    ├── Experience.tsx
    ├── SoundToggle.tsx
    └── useMagnetic hook
```

---

## Key Packages

| Package | Purpose | Version |
|---------|---------|---------|
| next | Framework | 16.1.6 |
| react | UI Library | 19.2.3 |
| @react-three/fiber | 3D Rendering | 9.5.0 |
| three | 3D Graphics | 0.183.2 |
| gsap | Animations | 3.14.2 |
| framer-motion | React Animations | 12.35.0 |
| tailwindcss | Styling | 4 |
| lenis | Smooth Scroll | 1.3.18 |

---

## Deployment Quick Links

- **Vercel**: `vercel` (auto from git)
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Push to `gh-pages` branch
- **Custom Server**: `npm run build && npm start`

---

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile Safari: ✅ Full support (no custom cursor)
- IE11: ❌ Not supported

---

## Performance Tips

✅ DO:
- Use next/image for images
- Lazy load components
- Keep video files < 5MB
- Minimize custom fonts

❌ DON'T:
- Add 3D models (too heavy)
- Increase particle count > 5000
- Use unoptimized images
- Add tracking scripts

---

## Git Workflow

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit: Portfolio setup"
git branch -M main
git remote add origin [your-repo-url]
git push -u origin main

# Regular updates
git add .
git commit -m "Update: [description]"
git push
```

---

## Contact Info Summary

```
Name:     Harish Costa
Email:    harish.costa@email.com
Location: Mangalore, India
GitHub:   [Add your URL]
LinkedIn: [Add your URL]
```

---

**Last Updated**: March 28, 2026  
**Version**: 1.0.0  
**Status**: Ready for Development ✅
