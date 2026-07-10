# TripBuddy ⛰️

Your personal trip advisor, rendered as an **interactive 3D map**: photo pins for every
stop, the route drawn along real roads, and a timed itinerary you can fly through.

Tell your advisor (Claude) where you want to go — it researches travel blogs, reviews,
and local guides, then maps the best version of your day here.

## Current trip

**Shenandoah Scenic Loop** — Central District day trip from Chester, VA:
Swift Run Gap → Big Meadows → Stony Man Trail → Crescent Rock → Old Rag View →
Jewell Hollow → Thornton Gap → Sperryville → dinner in Culpeper.

## Features

- **True 3D terrain** — MapLibre GL + AWS/Mapzen elevation tiles, so the Blue Ridge
  actually rises off the map (1.5× exaggeration), draped in Esri satellite imagery.
- **Photo pins** — every stop pulls a real photo from Wikimedia Commons (geosearch,
  no API key), with popups holding timings, mileposts, tips, and blog links.
- **Real road route** — driving geometry fetched from OSRM in your browser and drawn
  as a sunrise-gradient line along Skyline Drive; distance/drive-time stats update
  from the live route. Overlook pins snap onto the road.
- **Fly the route** — a 90-second cinematic camera tour along the whole loop.
- **Timed itinerary panel** — tap any stop to fly to it; includes alternate town
  options (Luray) and one-tap Google Maps navigation links.

## Run it

It's a static site — no build step:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

Or deploy the folder as-is to any static host (Vercel, Netlify, GitHub Pages).

> Note: terrain/satellite tiles, OSRM routing, and Commons photos load from public
> services at runtime, so the map needs internet access in the *browser*.

## Add a new trip

1. Copy `js/data/shenandoah.js` to `js/data/<your-trip>.js` and edit the
   `window.TRIP` object — stops (in driving order), coords `[lng, lat]`, times,
   descriptions, blog links, and photo hints.
2. Point the `<script src="js/data/…">` tag in `index.html` at your file.

Stops marked `snapToRoute: true` are pulled exactly onto the fetched road line, so
approximate coordinates for roadside pull-offs are fine.

## Stack

Vanilla JS + [MapLibre GL JS](https://maplibre.org/) (vendored in `vendor/`).
No framework, no build, no API keys.
