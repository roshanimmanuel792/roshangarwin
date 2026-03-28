# 🚀 DEPLOYMENT CHECKLIST FOR HARISH COSTA PORTFOLIO

## Pre-Deployment Verification

### ✅ Code Quality
- [ ] Run linter without errors: `npm run lint`
- [ ] Build successfully: `npm run build`
- [ ] No console errors in development: `npm run dev`
- [ ] No TypeScript errors
- [ ] All components render correctly

### ✅ Content Verification

#### Contact Information
- [ ] Email address updated (3 locations in ScrollSections.tsx)
- [ ] GitHub URL added (line 268)
- [ ] LinkedIn URL added (line 271)
- [ ] Phone number optional but updated if needed
- [ ] Contact form email address matches

#### Projects Section
- [ ] 4 projects reviewed and accurate
- [ ] Project descriptions updated if needed
- [ ] Technologies/tags correct
- [ ] Dates accurate

#### Skills Section
- [ ] 3 categories verified
- [ ] Proficiency levels (0-100) realistic
- [ ] 12 tech badges appropriate
- [ ] No misspellings

#### Experience Section
- [ ] 2 work experience roles verified
- [ ] Dates correct
- [ ] Descriptions match resume
- [ ] Highlights tags appropriate

#### About Section
- [ ] Bio updated and accurate
- [ ] 4 stats cards correct (Projects, Languages, Experience, Location)
- [ ] Location shows "Mangalore, India"
- [ ] Professional quote appropriate

#### Hero Section
- [ ] Name: "HARISH COSTA"
- [ ] Subtitle: "Full Stack Developer • Problem Solver • System Architect"
- [ ] Location badge present

### ✅ Design & UX
- [ ] Responsive on mobile (test on iPhone/Android)
- [ ] Desktop layout looks good (test on 1920x1080, 2560x1440)
- [ ] Tablet layout works (iPad size)
- [ ] All animations play smoothly
- [ ] Custom cursor works on desktop
- [ ] Mobile menu hamburger works
- [ ] Scroll animations trigger correctly

### ✅ Performance
- [ ] Build size is reasonable (~150-200KB gzipped)
- [ ] 3D particles render smoothly (60fps)
- [ ] No lag on scroll
- [ ] Page loads in < 3 seconds
- [ ] Lighthouse score > 85

### ✅ Browser Testing
- [ ] Chrome (latest version)
- [ ] Firefox (latest version)
- [ ] Safari (latest version)
- [ ] Edge (latest version)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### ✅ Security
- [ ] No sensitive data in code
- [ ] No API keys exposed
- [ ] Email properly encoded in form
- [ ] Contact form doesn't expose backend endpoints
- [ ] Environment variables configured (if needed)

### ✅ SEO
- [ ] Page title: "Harish Costa | Full Stack Developer"
- [ ] Meta description updated
- [ ] Open Graph tags present (optional)
- [ ] Favicon added (optional)
- [ ] robots.txt configured (if needed)

---

## Deployment Steps

### Option 1: Vercel Deployment (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Follow prompts:
#    - Select "." as root directory
#    - Choose "Next.js" as preset
#    - Say "N" to overwrite
```

**After Deployment:**
- [ ] Visit deployed URL
- [ ] Verify all links work
- [ ] Test contact form
- [ ] Check 3D scene loads
- [ ] Test mobile responsiveness

---

### Option 2: Netlify Deployment

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build first
npm run build

# 3. Deploy
netlify deploy --prod

# 4. Select folder: "out" or ".next"
```

---

### Option 3: GitHub Pages

```bash
# 1. Initialize git (if not done)
git init
git add .
git commit -m "Initial commit: Portfolio"

# 2. Create GitHub repo at github.com
# 3. Connect local repo
git remote add origin https://github.com/[username]/[repo].git
git branch -M main
git push -u origin main

# 4. Enable GitHub Pages in repo settings
# 5. Set source to "gh-pages" branch
```

---

### Option 4: Custom VPS/Server

```bash
# 1. SSH into server
ssh user@your-server.com

# 2. Clone repo
git clone https://github.com/[username]/[repo].git
cd harish-portfolio

# 3. Install & build
npm install
npm run build

# 4. Use PM2 for process management
npm install -g pm2
pm2 start "npm start" --name "harish-portfolio"

# 5. Setup Nginx reverse proxy (optional)
# Point domain to localhost:3000
```

---

## Post-Deployment Verification

### ✅ Live Site Testing
- [ ] Website loads without errors
- [ ] All sections visible and accessible
- [ ] Navigation links scroll correctly
- [ ] 3D background animates smoothly
- [ ] Custom cursor visible (if desktop)
- [ ] Mobile menu works
- [ ] Contact form submits successfully
- [ ] External links (GitHub, LinkedIn) work

### ✅ Analytics & Monitoring
- [ ] Set up Google Analytics (optional)
- [ ] Monitor error logs
- [ ] Check Lighthouse score
- [ ] Verify page speed metrics
- [ ] Test from different locations

### ✅ Domain Configuration
- [ ] Purchase domain (if not using Vercel domain)
- [ ] Update DNS records
- [ ] SSL certificate auto-installed
- [ ] www redirect configured
- [ ] Custom domain verified

### ✅ Final Launch Tasks
- [ ] Share portfolio link on LinkedIn
- [ ] Add URL to GitHub profile
- [ ] Update LinkedIn profile
- [ ] Share on social media
- [ ] Email contacts about new portfolio

---

## Common Issues & Solutions

### Issue: Build fails with TypeScript errors
**Solution:**
```bash
npm install
npm run build
# Check error messages and fix type issues
```

### Issue: 3D scene not rendering
**Solution:**
- Check browser console for WebGL errors
- Update graphics drivers
- Try different browser
- Reduce particle count if GPU is old

### Issue: Contact form not sending emails
**Solution:**
- Verify email address is correct
- Check browser console for errors
- Verify email provider allows form submissions
- Consider adding backend email service

### Issue: Slow performance on mobile
**Solution:**
- Reduce particle count in Scene.tsx
- Disable some animations on mobile
- Optimize images
- Use CDN for assets

### Issue: Custom cursor not visible
**Solution:**
- Only works on desktop (not touch devices)
- Ensure browser supports pointer events
- Check if browser is blocking cursor CSS

---

## Monitoring After Launch

### Weekly Checks
- [ ] Website still loading correctly
- [ ] No broken links
- [ ] Analytics showing visitors
- [ ] Error logs empty

### Monthly Checks
- [ ] Update dependencies: `npm update`
- [ ] Check for security vulnerabilities: `npm audit`
- [ ] Review analytics for traffic patterns
- [ ] Update content if needed

### Quarterly Checks
- [ ] Major dependency updates
- [ ] Performance optimization review
- [ ] SEO audit
- [ ] User feedback implementation

---

## Performance Benchmarks

### Target Metrics
```
First Contentful Paint:    < 1.5s ✓
Largest Contentful Paint:  < 2.5s ✓
Cumulative Layout Shift:   < 0.1  ✓
Time to Interactive:       < 3.0s ✓
Total Page Size:           < 2MB  ✓
Lighthouse Score:          > 85   ✓
```

### Check Performance
```bash
# Build and analyze
npm run build

# Visit PageSpeed Insights
# https://pagespeed.web.dev

# Or use Lighthouse in Chrome DevTools
```

---

## Security Checklist

- [ ] No credentials in code
- [ ] No API keys exposed
- [ ] HTTPS enabled (auto on Vercel/Netlify)
- [ ] Security headers configured
- [ ] Contact form has rate limiting (consider adding)
- [ ] Environment variables for sensitive data
- [ ] Regular security audits: `npm audit`

---

## Backup & Recovery

### Git Backup
```bash
# Commit everything
git add .
git commit -m "Pre-launch: Final version"
git push

# Tag release
git tag -a v1.0 -m "Launch version"
git push origin v1.0
```

### Database Backup (if applicable)
- Backup any database used
- Store in secure location
- Test restore procedure

---

## Rollback Procedure

If something goes wrong after deployment:

**Vercel Rollback:**
- Go to Vercel dashboard
- Select deployment
- Click "Rollback"
- Choose previous deployment

**Manual Rollback:**
```bash
git revert HEAD
npm run build
# Redeploy
```

---

## Post-Launch Marketing

- [ ] Share on LinkedIn with portfolio URL
- [ ] Update GitHub profile link
- [ ] Add portfolio to resume/CV
- [ ] Share in developer communities
- [ ] Update email signature
- [ ] Post on Twitter/X if active
- [ ] Share with former colleagues

---

## Success Metrics

Track after launch:
- [ ] Website visitors/month
- [ ] Contact form submissions
- [ ] GitHub followers increase
- [ ] LinkedIn profile views increase
- [ ] Job/project inquiries

---

## Final Sign-Off

- [ ] All checklist items completed
- [ ] Website tested thoroughly
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Content accurate
- [ ] Ready for public

---

**Deployment Date**: _______________  
**Deployed By**: Harish Costa  
**Platform**: _________________  
**Live URL**: ___________________  
**Status**: ✅ READY TO DEPLOY

---

**Good luck with your portfolio! 🚀**
