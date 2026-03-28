# Harish Costa - Portfolio Website

A modern, interactive portfolio website showcasing projects, skills, and experience. Built with Next.js, React Three Fiber, and GSAP animations.

## Features

- **3D Interactive Background**: Particle system that reacts to cursor movement
- **Smooth Scroll Animations**: GSAP ScrollTrigger with Lenis for butter-smooth scrolling
- **Custom Cursor**: Interactive cursor with magnetic effect on buttons
- **Responsive Design**: Fully mobile-optimized with Tailwind CSS
- **Dark Theme**: Sleek dark mode with blue/cyan accent colors
- **Section Animations**: Framer Motion animations for all sections
- **Project Timeline**: Vertical scroll showcase of projects

## Tech Stack

- **Frontend**: Next.js 16.1.6, React 19.2.3, TypeScript
- **Styling**: Tailwind CSS v4, PostCSS
- **Animations**: GSAP, Framer Motion, Lenis
- **3D Graphics**: React Three Fiber, Three.js
- **Development**: ESLint, Geist fonts

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd harishcosta-portfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in your browser.

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Deployment

Deploy easily on [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

Or push to GitHub and connect to Vercel for automatic deployments.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── Navbar.tsx       # Navigation header
│   ├── Scene.tsx        # 3D Canvas with particles
│   ├── ScrollSections.tsx # Main scroll container
│   ├── Projects.tsx     # Project showcase
│   ├── Skills.tsx       # Skills section
│   ├── Experience.tsx   # Work experience
│   ├── CustomCursor.tsx # Custom cursor
│   └── SoundToggle.tsx  # Sound control
└── hooks/
    └── useMagnetic.ts   # Magnetic cursor effect
```

## Customization

### Update Contact Information
Edit `src/components/ScrollSections.tsx` and update:
- Email address
- Location
- Social links

### Change Colors
Edit `src/app/globals.css` to modify:
- `--color-primary`: #3B82F6 (blue)
- `--color-accent`: #06B6D4 (cyan)

### Add/Edit Projects
Update project data in `src/components/Projects.tsx`

### Modify Skills
Update skill categories and proficiency levels in `src/components/Skills.tsx`

## Performance

- Optimized particle system (only 22% reactive)
- Dynamic SSR disabling for Three.js components
- Responsive image/video handling
- Smooth 60fps animations

## License

This project is personal portfolio software. All rights reserved.

## Support

For questions or customizations, contact: harish.costa@email.com

---

Made with ❤️ in Mangalore
