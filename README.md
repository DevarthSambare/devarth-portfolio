# Devarth V. Sambare — Portfolio (v2)

Single-page portfolio. Dark editorial design, scroll reveals, autoplaying muted video reels, per-project galleries, optional weave mini-game, and a lightbox for full-size media.

## IMPORTANT: add your resume before deploying

This build does NOT include `resume.pdf` (it wasn't in the uploads this round).
The Résumé buttons link to `assets/resume.pdf`.

**Before/after deploying, put your resume here:**
```
assets/resume.pdf
```
Your current live site already has one. Either:
- Download it from `https://devarth-portfolio.vercel.app/assets/resume.pdf` and drop it into `assets/`, OR
- Re-upload your latest resume PDF named exactly `resume.pdf` into `assets/`.

Until you do, the Résumé buttons will 404.

## How to open locally
Double-click `index.html`. (Videos may need a local server on some browsers: run `python -m http.server 8000` in this folder, then open `http://localhost:8000`.)

## How to deploy
Commit this folder to your GitHub repo (the same one connected to Vercel). Vercel auto-deploys on push. Done.

## How to ADD A NEW PROJECT later (easy)

Everything is driven by two arrays near the top of the `<script>` in `index.html`:
`FEATURED` (big entries) and `MORE` (smaller cards).

**Steps:**
1. Make a folder: `assets/projects/your-slug/`
2. Put media in it: a `reel.mp4` (+ `poster.jpg`), a `hero.jpg`, and gallery images `g1.jpg`, `g2.jpg`, etc.
3. Open `index.html`, find the `FEATURED` array.
4. Copy one project block, paste it, and edit the fields:

```js
{
  slug: 'your-slug',
  title: 'Project Name',
  eyebrow: 'Studio / Client / Year',
  roles: [{t:'Your Role'}],                 // add {t:'...', muted:true} for partial credit
  lead: 'One or two sentence summary.',
  bullets: [
    'What you did, specific and verb-led',
    'Another thing you did',
  ],
  tags: ['Unreal Engine 5','Tag','Tag'],
  hero: 'assets/projects/your-slug/reel.mp4', heroIsVideo: true,
  poster: 'assets/projects/your-slug/poster.jpg',
  gallery: [
    {type:'video', src:'assets/projects/your-slug/reel2.mp4', label:'Clip'},
    {type:'img', src:'assets/projects/your-slug/g1.jpg'},
    {type:'img', src:'assets/projects/your-slug/g2.jpg', label:'Caption'},
  ]
},
```

If the hero is an image instead of a video, use:
```js
hero: 'assets/projects/your-slug/hero.jpg', heroIsVideo: false,
```

5. Save, commit to GitHub. Vercel redeploys automatically.

That's it. No build step, no tooling. Add as many projects as you want.

## Making a video poster + compressing (optional, for new clips)
If you add raw video later and it's huge, compress it before committing:
```
ffmpeg -i input.mp4 -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 28 -preset fast -maxrate 1800k -bufsize 3600k -c:a aac -b:a 96k -movflags +faststart reel.mp4
ffmpeg -ss 1 -i reel.mp4 -frames:v 1 poster.jpg
```

## Current projects in this build
Featured: Scout Guide VR, Cycle Game, Cellular Jail VR, Barren Island VR, Dicino
More: Cabin in the Woods (animation exercise), CourtRoom VR (animation + VR functions, partial contribution)
In-development highlight at top of Work: Primitive Chaos
