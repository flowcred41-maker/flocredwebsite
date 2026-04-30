# FLOCRED Website — Complete Deployment Guide
## You can go live in under 30 minutes. No technical knowledge needed.

---

## OPTION 1 — Vercel (Recommended — Free, Fast, Automatic HTTPS)

### Step 1: Create a Vercel account
1. Go to https://vercel.com
2. Click "Sign Up" → "Continue with GitHub" (or email)
3. Create account — free plan is more than enough

### Step 2: Create a GitHub account (if you don't have one)
1. Go to https://github.com
2. Sign up — free

### Step 3: Create a new GitHub repository
1. Go to https://github.com/new
2. Repository name: `flocred-website`
3. Set to **Private**
4. Click "Create repository"

### Step 4: Upload the files
1. On the new repository page, click "uploading an existing file"
2. Drag ALL the files from the zip into the uploader
3. Important: The `admin` folder — upload admin/index.html separately into a folder named `admin`
4. Click "Commit changes"

### Step 5: Deploy to Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `flocred-website` repo
4. Framework Preset: **Other**
5. Root Directory: leave blank (.)
6. Click **Deploy**

### Step 6: Add your custom domain (flocred.com)
1. In Vercel dashboard → your project → Settings → Domains
2. Add: `www.flocred.com` and `flocred.com`
3. Vercel shows you DNS records to add
4. Go to your domain registrar (where you bought flocred.com)
5. Add the A record and CNAME Vercel gives you
6. Wait 10–30 minutes — live!

---

## OPTION 2 — Direct Upload to Existing Hosting

If flocred.com runs on cPanel/Hostinger/GoDaddy hosting:
1. Login to your hosting control panel
2. Open File Manager → public_html folder
3. Delete existing files (or rename them as backup)
4. Upload ALL files from the zip
5. Make sure `index.html` is in the root of public_html
6. Done — visit flocred.com

---

## AFTER GOING LIVE — Critical Setup Checklist

### 1. Google Tag Manager (GTM-M3VLZG2Q already in all pages)
- Login: https://tagmanager.google.com
- Container: GTM-M3VLZG2Q
- Add tags for: Google Analytics 4, Google Ads Conversion, Meta Pixel
- Publish container

### 2. Meta Pixel (replace XXXXXXXXXXXXXXXXXX in all pages)
- Go to: https://business.facebook.com → Events Manager
- Copy your Pixel ID
- In each HTML file, find: `fbq('init','XXXXXXXXXXXXXXXXXX')`
- Replace XXXXXXXXXXXXXXXXXX with your actual Pixel ID
- Do this in: index.html, eligibility.html, holiday-in-emi.html, ads-landing.html

### 3. Google Analytics 4
- Go to: https://analytics.google.com
- Create property → Get Measurement ID (G-XXXXXXXXXX)
- Add to GTM as a new tag → GA4 Configuration

### 4. Google Search Console
- Go to: https://search.google.com/search-console
- Add property → URL prefix → https://www.flocred.com
- Verify via HTML file or DNS
- Submit sitemap: https://www.flocred.com/sitemap.xml

### 5. Admin Panel
- URL: https://www.flocred.com/admin/
- Login: admin@flocred.com / admin123
- CHANGE THIS PASSWORD immediately in admin/index.html line ~630

### 6. ARIA AI (Connect Claude API)
- Deploy a serverless function at `/api/aria`
- In Vercel: Settings → Environment Variables
- Add: ANTHROPIC_API_KEY = sk-ant-XXXXXXXX (get from console.anthropic.com)
- Use the ARIA system prompt from index.html comment block
- Without this, ARIA uses scripted fallback responses (still works)

### 7. Supabase (already connected)
- URL: lzxolgrleaxxtpdwkhwd.supabase.co (already in all files)
- All leads auto-save on form submission
- Check leads: https://supabase.com/dashboard → your project → Table Editor → leads

### 8. IndexNow (instant Google indexing)
- Get key from: https://www.bing.com/indexnow
- Add to Vercel env vars: INDEXNOW_KEY=your_key
- Ping after each new page: https://api.indexnow.org/indexnow?url=https://www.flocred.com/&key=your_key

---

## PAGES LIVE AFTER DEPLOYMENT

| Page | URL | Status |
|------|-----|--------|
| Homepage | /index.html | ✅ Built |
| Eligibility Check | /eligibility.html | ✅ Built |
| Holiday in EMI | /holiday-in-emi.html | ✅ Built |
| Lender Partnership | /lender-partnership.html | ✅ Built |
| Careers (10 jobs) | /careers.html | ✅ Built |
| About + IPO | /about.html | ✅ Built |
| Contact | /contact.html | ✅ Built |
| All Legal | /legal.html | ✅ Built |
| Admin Panel | /admin/ | ✅ Built |
| Sitemap | /sitemap.html | ✅ Built |
| XML Sitemap | /sitemap.xml | ✅ Built |
| Google Ads LP | /ads-landing.html | ✅ Built |
| Robots.txt | /robots.txt | ✅ Built |
| Credit Engine | /credit-engine.html | ✅ Existing |
| Dashboard | /dashboard.html | ✅ Existing |

## PAGES TO BUILD NEXT SESSION
- /equity-shield.html (Equity Shield / No NPA product)  
- /nri-loans.html (Full NRI infrastructure)
- /corporate-wellness.html (Corporate Financial Wellness)
- /personal-loan.html (Product page)
- /home-loan.html (Product page)
- /business-loan.html (Product page)
- /cibil-score.html (CIBIL guide)
- /blog.html (Blog listing)
- /loans/personal-loan/[city].html (130+ city pages)

---

## SUPPORT
For any deployment issues: Call +91-9319369315 or WhatsApp ARIA
CIN: U67100DL2022PTC400764
