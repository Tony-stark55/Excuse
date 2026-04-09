# 🫠 ExcuseMe — AI Excuse Generator

> Generate the perfect excuse in seconds. English or Hinglish. For students, college, work & life.

---

## 📁 Folder Structure

```
excuse-me/
├── index.html    ← main page (all UI)
├── style.css     ← all styles + mobile CSS
├── app.js        ← Groq AI logic + share buttons
├── logo.png      ← YOUR logo (add this yourself)
└── README.md     ← this file
```

---

## 🚀 How to Run Locally

1. Download/unzip this folder
2. Open `index.html` in any browser
3. That's it — no server needed

> **Note:** If Groq API gives CORS errors locally, deploy to Netlify (free, takes 2 minutes).

---

## 🔑 API Key

Your Groq key is already added in `app.js` line 2.

To get a new key: [console.groq.com](https://console.groq.com) → API Keys → Create

Groq free tier = **14,400 requests/day** — plenty for a new site.

---

## 🖼️ How to Add Your Logo

1. Export your logo as `logo.png` (recommended: 200×200px, transparent background)
2. Put `logo.png` in the same folder as `index.html`
3. It will automatically show next to "ExcuseMe" in the header
4. If no logo.png is found, the header still looks fine (logo auto-hides)

---

## 🌐 How to Make It Live (Free — Google can find it)

### Step 1 — Deploy on Netlify (Free)
1. Go to [netlify.com](https://netlify.com) → Sign up free
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag your entire `excuse-me` folder onto the page
4. Done — you get a URL like `https://excuseme-xyz.netlify.app`

### Step 2 — Custom Domain (Optional, ~₹800/year)
- Buy a domain: [namecheap.com](https://namecheap.com) or [godaddy.com](https://godaddy.com)
- In Netlify: Site settings → Domain management → Add custom domain
- Follow the DNS steps — takes 10–30 minutes

### Step 3 — Get on Google (SEO)
1. Go to [Google Search Console](https://search.google.com/search-console) → Add property → enter your Netlify URL
2. Verify ownership (Netlify makes this easy — HTML file method)
3. Submit your sitemap: `https://yoursite.com/sitemap.xml`
4. Google will index your site in 1–7 days
5. After that, searching "excuse generator india" or "hinglish excuse" can show your site

---

## 📊 How to See Traffic (Free Analytics)

### Google Analytics (best option)
1. Go to [analytics.google.com](https://analytics.google.com) → Create account → Create property
2. Get your **Measurement ID** — looks like `G-XXXXXXXXXX`
3. Open `index.html`, find this line near the top:
   ```
   gtag('config', 'G-XXXXXXXXXX');
   ```
4. Replace `G-XXXXXXXXXX` with your real ID (appears twice)
5. Deploy again → you'll see live users, countries, devices, page views

### What you can see:
- How many people visited today / this week
- Which country they're from
- What device (phone vs laptop)
- Which excuses are most popular (set up events)
- How long they stay on site

---

## 💰 How to Earn Money

### Option 1 — Google AdSense (easiest, passive)
1. Go to [adsense.google.com](https://adsense.google.com) → Apply
2. You need: a live website, original content, consistent traffic
3. Once approved, paste 1 ad script in `index.html`
4. Place ad banner **below the result card** — non-intrusive
5. Earn ₹50–₹500 per 1000 visitors depending on your audience
6. **Indian traffic earns less** (~₹30–80 per 1000), international traffic earns more

### Option 2 — Go Viral First, Monetize Later
- Post "AI excuse generator for students 🫠" on Instagram Reels
- Show funny Hinglish excuses — people will share it
- Once you have 500+ daily users, AdSense approval is easier
- Make YouTube Shorts of people reacting to excuses

### Option 3 — Gumroad Pro Version (₹49 one-time)
- Add a "Pro Mode" with 5 extra tones (Indian Parent Mode, Teacher Mode, etc.)
- Gate it behind a Gumroad payment link
- Free users get 3 tones, Pro gets 8 tones

### Option 4 — Sell Shoutouts / Backlinks
- Once you have 1000+ daily visitors, other student websites pay ₹500–₹2000/month
  to put their link in your footer or a "Powered by" section

---

## 🛠️ Customisation Tips

| What to change | Where |
|---|---|
| Add more situations | `index.html` — inside `<select id="situation">` |
| Change accent colour | `style.css` — `--acc` variable at top |
| Change AI model | `app.js` — `GROQ_MODEL` variable |
| Add more tones | `index.html` (new button) + `app.js` (toneGuideEN/HI) |
| Change fonts | `index.html` Google Fonts link + `style.css` `--f-head` / `--f-body` |

---

## 🐛 Common Issues

**Excuses not generating?**
- Check your Groq key is correct in `app.js`
- Open browser DevTools (F12) → Console tab — check for errors
- Groq free tier has rate limits — wait a minute and retry

**Logo not showing?**
- Make sure file is named exactly `logo.png` (lowercase)
- Must be in the same folder as `index.html`

**iOS select dropdown looks different?**
- Normal — iOS has its own native dropdown style, can't override fully
- The site still works perfectly

---

## 📬 Credits

Built with [Groq API](https://groq.com) · Fonts by [Google Fonts](https://fonts.google.com) · Deployed on [Netlify](https://netlify.com)

---

*Made with zero responsibility 🫠*
