/* TripBuddy — 3D itinerary map */
(function () {
  "use strict";
  const TRIP = window.TRIP;

  // ---------------------------------------------------------------- map style
  const style = {
    version: 8,
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    sources: {
      satellite: {
        type: "raster",
        tiles: [
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        ],
        tileSize: 256,
        maxzoom: 18,
        attribution:
          "Imagery © Esri &amp; contributors · Terrain © AWS/Mapzen · © OpenStreetMap"
      },
      labels: {
        type: "raster",
        tiles: [
          "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        ],
        tileSize: 256,
        maxzoom: 18
      },
      dem: {
        type: "raster-dem",
        tiles: [
          "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
        ],
        encoding: "terrarium",
        tileSize: 256,
        maxzoom: 14
      }
    },
    layers: [
      { id: "sat", type: "raster", source: "satellite" },
      { id: "lbl", type: "raster", source: "labels", paint: { "raster-opacity": 0.85 } }
    ],
    terrain: { source: "dem", exaggeration: 1.5 },
    sky: {
      "sky-color": "#8fb8de",
      "horizon-color": "#e8d8c3",
      "fog-color": "#dfe8f0",
      "sky-horizon-blend": 0.6,
      "horizon-fog-blend": 0.7
    }
  };

  const map = new maplibregl.Map({
    container: "map",
    style,
    center: TRIP.center,
    zoom: 9.6,
    pitch: 62,
    bearing: -18,
    maxPitch: 75,
    hash: false,
    attributionControl: { compact: true }
  });
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
  map.touchZoomRotate.enableRotation();

  // ------------------------------------------------------------------- pins
  const KIND = {
    home:     { color: "#e8b464", icon: "⌂",  label: "Home base" },
    entrance: { color: "#79c2a7", icon: "⛩", label: "Park gate" },
    visitor:  { color: "#79c2a7", icon: "ℹ",  label: "Visitor center" },
    hike:     { color: "#e4674f", icon: "⛰", label: "Hike" },
    overlook: { color: "#6da8e8", icon: "◉",  label: "Overlook" },
    food:     { color: "#d99ad4", icon: "✦",  label: "Food" },
    town:     { color: "#d99ad4", icon: "✦",  label: "Town stop" },
    dinner:   { color: "#d99ad4", icon: "✦",  label: "Dinner" },
    option:   { color: "#9aa5b1", icon: "?",  label: "Alternate" }
  };

  const markers = {};

  function gmapsNav(c) {
    return `https://www.google.com/maps/dir/?api=1&destination=${c[1].toFixed(5)},${c[0].toFixed(5)}`;
  }

  function popupHTML(stop, isOption) {
    const k = KIND[isOption ? "option" : stop.kind];
    return `
      <div class="pop">
        <div class="pop-photo" id="photo-${stop.id}">
          <div class="pop-photo-fallback">${k.icon}</div>
        </div>
        <div class="pop-body">
          <div class="pop-time">${stop.window || ""}${stop.mp ? ` · ${stop.mp}` : ""}</div>
          <h3>${stop.name}</h3>
          <p>${stop.desc}</p>
          ${stop.tips ? `<ul class="pop-tips">${stop.tips.map(t => `<li>${t}</li>`).join("")}</ul>` : ""}
          <div class="pop-links">
            <a href="${stop.gmaps || gmapsNav(stop.coords)}" target="_blank" rel="noopener">Navigate ↗</a>
            ${stop.blog ? `<a href="${stop.blog.url}" target="_blank" rel="noopener">${stop.blog.label} ↗</a>` : ""}
          </div>
        </div>
      </div>`;
  }

  function addMarker(stop, isOption) {
    const k = KIND[isOption ? "option" : stop.kind];
    const el = document.createElement("div");
    el.className = "pin" + (isOption ? " pin-option" : "");
    el.style.setProperty("--pin", k.color);
    el.innerHTML = `<span class="pin-dot">${isOption ? "+" : stop.n}</span><span class="pin-tip"></span>`;
    el.title = stop.name;
    const popup = new maplibregl.Popup({ offset: 34, maxWidth: "320px" })
      .setHTML(popupHTML(stop, isOption));
    popup.on("open", () => loadPhoto(stop, `photo-${stop.id}`));
    const m = new maplibregl.Marker({ element: el, anchor: "bottom" })
      .setLngLat(stop.coords)
      .setPopup(popup)
      .addTo(map);
    markers[stop.id] = m;
    return m;
  }

  TRIP.stops.filter(s => s.id !== "home").forEach(s => addMarker(s, false));
  TRIP.options.forEach(o => addMarker(o, true));

  // --------------------------------------------------------------- itinerary
  const listEl = document.getElementById("itinerary");
  TRIP.stops.forEach(stop => {
    const k = KIND[stop.kind];
    const li = document.createElement("li");
    li.className = "it-item";
    li.innerHTML = `
      <div class="it-time">${stop.time}</div>
      <div class="it-rail"><span class="it-dot" style="--pin:${k.color}"></span></div>
      <div class="it-card">
        <div class="it-thumb" id="thumb-${stop.id}"><span>${k.icon}</span></div>
        <div class="it-text">
          <div class="it-name">${stop.name}${stop.mp ? ` <em>${stop.mp}</em>` : ""}</div>
          <div class="it-window">${stop.window}</div>
        </div>
      </div>`;
    li.addEventListener("click", () => focusStop(stop));
    listEl.appendChild(li);
  });

  const notesEl = document.getElementById("notes");
  notesEl.innerHTML =
    TRIP.notes.map(n => `<li>${n}</li>`).join("") +
    `<li><a href="${TRIP.statusUrl}" target="_blank" rel="noopener">Check Skyline Drive status (NPS) ↗</a></li>`;

  document.getElementById("sources").innerHTML = TRIP.sources
    .map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`)
    .join("");

  document.getElementById("gmaps-btn").href = TRIP.gmapsFullRoute;
  document.getElementById("trip-title").textContent = TRIP.title;
  document.getElementById("trip-subtitle").textContent = TRIP.subtitle;

  function focusStop(stop) {
    const inPark = stop.mp !== undefined || stop.kind === "hike";
    map.flyTo({
      center: stop.coords,
      zoom: inPark ? 13.6 : 12.2,
      pitch: 65,
      bearing: map.getBearing(),
      duration: 2400,
      essential: true
    });
    const m = markers[stop.id];
    if (m) { if (!m.getPopup().isOpen()) m.togglePopup(); }
  }

  document.getElementById("overview-btn").addEventListener("click", () => {
    stopTour();
    map.fitBounds(TRIP.overviewBounds, { pitch: 55, bearing: -18, duration: 2200 });
  });
  document.getElementById("park-btn").addEventListener("click", () => {
    stopTour();
    map.fitBounds(TRIP.parkBounds, { pitch: 62, bearing: -30, duration: 2200 });
  });

  const toggle = document.getElementById("panel-toggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("panel-closed");
  });

  // ------------------------------------------------------------------ photos
  // Wikimedia Commons geosearch — free, key-less, CORS-enabled. Falls back to
  // a text search on the stop name, then to the icon tile.
  async function commonsQuery(params) {
    const url =
      "https://commons.wikimedia.org/w/api.php?origin=*&format=json&action=query&" + params;
    const r = await fetch(url);
    if (!r.ok) throw new Error("commons " + r.status);
    return r.json();
  }

  function firstImageUrl(data) {
    const pages = (data.query && data.query.pages) || {};
    const imgs = Object.values(pages)
      .filter(p => p.imageinfo && /\.(jpe?g|png)$/i.test(p.title))
      .sort((a, b) => (a.index || 99) - (b.index || 99));
    return imgs.length ? imgs[0].imageinfo[0].thumburl : null;
  }

  const photoCache = {};
  async function findPhoto(stop) {
    if (photoCache[stop.id] !== undefined) return photoCache[stop.id];
    let url = null;
    try {
      const geo = await commonsQuery(
        `generator=geosearch&ggscoord=${stop.coords[1]}%7C${stop.coords[0]}` +
        `&ggsradius=${(stop.photo && stop.photo.r) || 2000}&ggslimit=6&ggsnamespace=6` +
        `&prop=imageinfo&iiprop=url&iiurlwidth=640`
      );
      url = firstImageUrl(geo);
      if (!url && stop.photo && stop.photo.q) {
        const txt = await commonsQuery(
          `generator=search&gsrsearch=${encodeURIComponent(stop.photo.q)}` +
          `&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url&iiurlwidth=640`
        );
        url = firstImageUrl(txt);
      }
    } catch (e) { /* offline or blocked — icon fallback stays */ }
    photoCache[stop.id] = url;
    return url;
  }

  async function loadPhoto(stop, containerId) {
    const el = document.getElementById(containerId);
    if (!el || el.dataset.done) return;
    const url = await findPhoto(stop);
    if (url && el.isConnected !== false) {
      el.dataset.done = "1";
      el.style.backgroundImage = `url("${url}")`;
      el.classList.add("has-img");
    }
  }

  // eager thumbnails for the sidebar (staggered to be polite to the API)
  [...TRIP.stops, ...TRIP.options].forEach((s, i) => {
    setTimeout(async () => {
      const url = await findPhoto(s);
      const t = document.getElementById(`thumb-${s.id}`);
      if (url && t) {
        t.style.backgroundImage = `url("${url}")`;
        t.classList.add("has-img");
      }
    }, i * 350);
  });

  // ------------------------------------------------------------------- route
  const routeOrder = TRIP.stops.map(s => s.coords);
  let routeLine = null;

  function drawRoute(coords, dashed) {
    const gj = { type: "Feature", geometry: { type: "LineString", coordinates: coords } };
    if (map.getSource("route")) {
      map.getSource("route").setData(gj);
    } else {
      map.addSource("route", { type: "geojson", data: gj, lineMetrics: true });
      map.addLayer({
        id: "route-casing", type: "line", source: "route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#0b1524", "line-width": 7, "line-opacity": 0.55, "line-blur": 2 }
      });
      map.addLayer({
        id: "route-line", type: "line", source: "route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-width": 3.5,
          "line-gradient": [
            "interpolate", ["linear"], ["line-progress"],
            0, "#f2c14e", 0.5, "#e8834f", 1, "#d1495b"
          ]
        }
      });
    }
    if (dashed) map.setPaintProperty("route-line", "line-dasharray", [1.4, 1.6]);
    routeLine = coords;
  }

  function nearestOnRoute(pt) {
    let best = null, bd = Infinity;
    for (const c of routeLine) {
      const d = (c[0] - pt[0]) ** 2 + (c[1] - pt[1]) ** 2;
      if (d < bd) { bd = d; best = c; }
    }
    return best;
  }

  async function fetchRoute() {
    const pts = routeOrder.map(c => `${c[0]},${c[1]}`).join(";");
    const url = `https://router.project-osrm.org/route/v1/driving/${pts}?overview=full&geometries=geojson&steps=false`;
    const r = await fetch(url);
    if (!r.ok) throw new Error("osrm " + r.status);
    const j = await r.json();
    if (!j.routes || !j.routes.length) throw new Error("no route");
    return j.routes[0];
  }

  let inited = false;
  async function init() {
    if (inited) return;
    inited = true;
    try {
      const route = await fetchRoute();
      drawRoute(route.geometry.coordinates, false);
      const mi = Math.round(route.distance / 1609.34);
      const h = Math.floor(route.duration / 3600);
      const m = Math.round((route.duration % 3600) / 60);
      document.getElementById("stat-dist").textContent = `${mi} mi`;
      document.getElementById("stat-drive").textContent = `${h}h ${String(m).padStart(2, "0")}m driving`;
      // pull road-side stops (overlooks, gates) exactly onto the road line
      TRIP.stops.forEach(s => {
        if (s.snapToRoute && markers[s.id]) {
          const p = nearestOnRoute(s.coords);
          if (p) { markers[s.id].setLngLat(p); s.coords = p; }
        }
      });
    } catch (e) {
      // OSRM unreachable — draw straight legs so the shape of the day still reads
      drawRoute(routeOrder, true);
      document.getElementById("stat-dist").textContent = "≈310 mi";
      document.getElementById("stat-drive").textContent = "≈6¾ h driving";
    }
    map.fitBounds(TRIP.overviewBounds, { pitch: 55, bearing: -18, duration: 3200 });
  }
  map.once("load", init);
  // safety net: if tile errors keep "load" from firing, init once the style is in
  setTimeout(() => { if (map.isStyleLoaded() || map.getStyle()) init(); }, 6000);

  // ---------------------------------------------------------------- fly tour
  let tourRAF = null;
  function stopTour() {
    if (tourRAF) { cancelAnimationFrame(tourRAF); tourRAF = null; }
    document.getElementById("tour-btn").textContent = "▶ Fly the route";
  }

  function stopTourAndReset() { stopTour(); }

  document.getElementById("tour-btn").addEventListener("click", () => {
    if (tourRAF) { stopTour(); return; }
    if (!routeLine) return;
    document.getElementById("tour-btn").textContent = "■ Stop tour";

    // cumulative distances along the line
    const line = routeLine;
    const cum = [0];
    for (let i = 1; i < line.length; i++) {
      const dx = line[i][0] - line[i - 1][0];
      const dy = line[i][1] - line[i - 1][1];
      cum.push(cum[i - 1] + Math.hypot(dx, dy * 1.3));
    }
    const total = cum[cum.length - 1];
    const DURATION = 90000; // 90s full loop
    const start = performance.now();

    function at(d) {
      let lo = 0, hi = cum.length - 1;
      while (lo < hi) { const mid = (lo + hi) >> 1; if (cum[mid] < d) lo = mid + 1; else hi = mid; }
      const i = Math.max(1, lo);
      const t = (d - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
      return [
        line[i - 1][0] + (line[i][0] - line[i - 1][0]) * t,
        line[i - 1][1] + (line[i][1] - line[i - 1][1]) * t
      ];
    }

    function frame(now) {
      const p = ((now - start) % DURATION) / DURATION;
      const d = p * total;
      const pos = at(d);
      const ahead = at(Math.min(total, d + total * 0.004));
      const brg = (Math.atan2(ahead[0] - pos[0], ahead[1] - pos[1]) * 180) / Math.PI;
      map.jumpTo({ center: pos, zoom: 12.8, pitch: 68, bearing: brg });
      tourRAF = requestAnimationFrame(frame);
    }
    map.once("moveend", () => { tourRAF = requestAnimationFrame(frame); });
    map.flyTo({ center: line[0], zoom: 12.8, pitch: 68, duration: 1600 });
    // let a manual drag cancel the tour
    map.once("dragstart", stopTourAndReset);
  });
})();
