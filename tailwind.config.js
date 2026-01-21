/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Mono', 'monospace'],        // titles, numbers, labels
        body: ['DM Sans', 'system-ui', 'sans-serif'], // paragraphs
        accent: ['Inter', 'system-ui', 'sans-serif'], // buttons, UI
      },
      fontSize: {
        base: '18px',
      },
      colors: {
        'manga-black': '#0a0a0a',
        'manga-white': '#fafaff',
        'manga-paper': '#f4ebd0',
        'manga-ink': '#1a1a1a',
        'manga-red': '#dc2626',
        'manga-accent': '#fbbf24',
        'manga-highlight': '#22d3ee',
      },
    },
  },
  plugins: [],
}
