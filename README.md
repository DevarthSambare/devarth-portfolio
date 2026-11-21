# Devarth V. Sambare · Games Portfolio

Games-only site. The real estate portfolio is a separate site and is not linked from here.

- `index.html`: the portfolio (OVERLOAD, Primitive Chaos, VR and installation games)
- `assets/resume.pdf`: games resume. Source: `resume/resume.html`. Edit, then print to PDF:
```
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf=assets\resume.pdf resume\resume.html
esume.pdf resume
esume.html
esume.pdf resume
esume.html
```
- `assets/v3/`: new media and quiet sound effects (`sfx.js`, ElevenLabs sounds)

Run locally: `python -m http.server 8000`, open http://localhost:8000
Deploy: commit and push, Vercel redeploys.
