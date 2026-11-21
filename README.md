# Devarth V. Sambare · Games Portfolio

Games-only site. The real estate portfolio is a separate site and is not linked from here.

- `index.html`: the portfolio. Start screen, a playable hero (Overload's hold-and-release loop on a canvas, tap-to-play on phones), achievements, OVERLOAD with trailer and design pillars, Primitive Chaos with a weather switcher, shipped projects, experience timeline and power cards
- `assets/resume.pdf`: games resume. Source: `resume/resume.html`. Edit, then print to PDF:
```
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf=assets\resume.pdf resume\resume.html
esume.pdf resume
esume.html
esume.pdf resume
esume.html
```
- `assets/v3/`: media and sound effects. `sfx.js` plays the ElevenLabs sounds in `assets/v3/sfx/` (hover, click, start, achievement, whoosh, charge, rain); the hero's blast and kill notes are synthesised in the page

Run locally: `python -m http.server 8000`, open http://localhost:8000
Deploy: commit and push, Vercel redeploys.
