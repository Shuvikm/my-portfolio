# Shuvik M — Portfolio

A manga-aesthetic personal portfolio built with **React + TypeScript + Vite**.  
Live at → [shuvikm.github.io/my-portfolio](https://shuvikm.github.io/my-portfolio) *(update link if deployed elsewhere)*

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS + custom Brutal-Manga CSS |
| Animation | Lenis smooth scroll, CSS keyframes, Intersection Observer |
| Backend | Express + MongoDB (contact form) |
| Deployment | GitHub Pages / Vercel |

---

## Sections

- **Hero** — Animated intro with glitch text and ribbon overlay
- **About** — Skills grid and bio
- **Projects** — Featured work cards
- **Journey** — Education & experience timeline
- **Fav Manga Panels** — 3D carousel of favourite manga moments
- **GitHub Activity** — Live contribution graph
- **Contact** — Working contact form (email via Express backend)

---

## Local Development

```powershell
# Install deps
npm install

# Start frontend dev server
npm run dev

# Start backend (contact form)
cd server
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.  
Backend runs on `http://localhost:5001`.

---

## Resume

The resume is served at `/resume.pdf` and embedded in the portfolio via the Resume modal.  
To update: replace `public/resume.pdf` with the new PDF.

---

## License

MIT — feel free to fork and adapt.
