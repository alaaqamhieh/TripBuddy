/* TripBuddy — customizable 3D itinerary map */
(function () {
  "use strict";
  const TRIP = window.TRIP;
  const pool = Object.fromEntries(TRIP.pois.map(p => [p.id, p]));
  const STORE_KEY = `tripbuddy:${TRIP.id}:v${TRIP.version}:itin`;

  // ------------------------------------------------------------ itinerary state
  function loadItin() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY));
      if (Array.isArray(raw) && raw.every(id => pool[id])) return raw;
    } catch (e) { /* fall through */ }
    return null;
  }
  let itin = loadItin() || [...TRIP.defaultItinerary];
  const saveItin = () => localStorage.setItem(STORE_KEY, JSON.stringify(itin));

  // ---------------------------------------------------------------- map style
  const style = {
    version: 8,
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    sources: {
      satellite: {
        type: "raster",
        tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
        tileSize: 256, maxzoom: 18,
        attribution: "Imagery © Esri · Streets © CARTO/OpenStreetMap · Terrain © AWS/Mapzen"
      },
      satlabels: {
        type: "raster",
        tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"],
        tileSize: 256, maxzoom: 18
      },
      streets: {
        type: "raster",
        tiles: [
          "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
          "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
          "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        ],
        tileSize: 256, maxzoom: 19
      },
      dem: {
        type: "raster-dem",
        tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
        encoding: "terrarium", tileSize: 256, maxzoom: 14
      }
    },
    layers: [
      { id: "streets", type: "raster", source: "streets", layout: { visibility: "none" } },
      { id: "sat", type: "raster", source: "satellite" },
      { id: "satlbl", type: "raster", source: "satlabels", paint: { "raster-opacity": 0.85 } }
    ],
    terrain: { source: "dem", exaggeration: 1.5 },
    sky: {
      "sky-color": "#8fb8de", "horizon-color": "#e8d8c3", "fog-color": "#dfe8f0",
      "sky-horizon-blend": 0.6, "horizon-fog-blend": 0.7
    }
  };

  const map = new maplibregl.Map({
    container: "map",
    style,
    center: TRIP.center,
    zoom: 9.6,
    pitch: 55,
    bearing: 0,           // north-up by default
    maxPitch: 75,
    attributionControl: { compact: true }
  });
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");

  // basemap toggle
  function setBase(mode) {
    const sat = mode === "sat";
    map.setLayoutProperty("sat", "visibility", sat ? "visible" : "none");
    map.setLayoutProperty("satlbl", "visibility", sat ? "visible" : "none");
    map.setLayoutProperty("streets", "visibility", sat ? "none" : "visible");
    document.getElementById("base-sat").classList.toggle("on", sat);
    document.getElementById("base-map").classList.toggle("on", !sat);
  }
  document.getElementById("base-sat").addEventListener("click", () => setBase("sat"));
  document.getElementById("base-map").addEventListener("click", () => setBase("map"));
  document.getElementById("north-btn").addEventListener("click", () => {
    map.easeTo({ bearing: 0, pitch: 55, duration: 800 });
  });
  document.getElementById("flat-btn").addEventListener("click", () => {
    const flat = map.getPitch() > 10;
    map.easeTo({ pitch: flat ? 0 : 60, duration: 800 });
    document.getElementById("flat-btn").textContent = flat ? "3D" : "2D";
  });

  // ------------------------------------------------------------------- pins
  const KIND = {
    home:     { color: "#e8b464", icon: "⌂", label: "Home" },
    meetup:   { color: "#e8b464", icon: "✚", label: "Meetup" },
    entrance: { color: "#79c2a7", icon: "⛩", label: "Park gate" },
    visitor:  { color: "#79c2a7", icon: "ℹ", label: "Visitor center" },
    hike:     { color: "#e4674f", icon: "⛰", label: "Hike" },
    overlook: { color: "#6da8e8", icon: "◉", label: "Overlook" },
    food:     { color: "#d99ad4", icon: "✦", label: "Food & drink" },
    town:     { color: "#d99ad4", icon: "✦", label: "Town stop" },
    dinner:   { color: "#d99ad4", icon: "✦", label: "Dinner" },
    site:     { color: "#b8a4e3", icon: "★", label: "Attraction" },
    friend:   { color: "#9aa5b1", icon: "➤", label: "Friend start" }
  };

  const markers = {};

  function gmapsNav(p) {
    const dest = p.gplace ? encodeURIComponent(p.gplace) : `${p.coords[1].toFixed(5)},${p.coords[0].toFixed(5)}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
  }

  function inItin(id) { return itin.includes(id); }

  function popupHTML(p) {
    const k = KIND[p.kind];
    const on = inItin(p.id);
    const idx = itin.indexOf(p.id);
    const btn = p.locked ? "" : on
      ? `<button class="pop-btn pop-remove" data-id="${p.id}">✕ Remove from day</button>`
      : `<button class="pop-btn pop-add" data-id="${p.id}">＋ Add to my day</button>`;
    return `
      <div class="pop">
        <div class="pop-photo" id="photo-${p.id}"><div class="pop-photo-fallback">${k.icon}</div></div>
        <div class="pop-gallery" id="gallery-${p.id}"></div>
        <div class="pop-body">
          <div class="pop-time">${on && idx >= 0 ? `Stop ${idx}` : "Suggestion"}${p.window ? ` · ${p.window}` : ""}${p.mp ? ` · ${p.mp}` : ""}</div>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          ${p.tips ? `<ul class="pop-tips">${p.tips.map(t => `<li>${t}</li>`).join("")}</ul>` : ""}
          <div class="pop-links">
            <a href="${gmapsNav(p)}" target="_blank" rel="noopener">Navigate ↗</a>
            ${p.blog ? `<a href="${p.blog.url}" target="_blank" rel="noopener">${p.blog.label} ↗</a>` : ""}
          </div>
          ${btn}
        </div>
      </div>`;
  }

  function pinLabel(p) {
    const idx = itin.indexOf(p.id);
    return idx >= 0 ? String(idx) : "+";
  }

  function refreshPin(p) {
    const m = markers[p.id];
    if (!m) return;
    const el = m.getElement();
    const on = inItin(p.id);
    el.classList.toggle("pin-suggest", !on);
    el.querySelector(".pin-dot").textContent = pinLabel(p);
  }

  function addPoiMarker(p) {
    const k = KIND[p.kind];
    const el = document.createElement("div");
    el.className = "pin";
    el.style.setProperty("--pin", k.color);
    el.innerHTML = `<span class="pin-dot"></span>`;
    el.title = p.name;
    const popup = new maplibregl.Popup({ offset: 34, maxWidth: "320px" });
    popup.on("open", () => {
      popup.setHTML(popupHTML(p));       // rebuild so Add/Remove state is current
      loadPhotos(p);
    });
    const m = new maplibregl.Marker({ element: el, anchor: "bottom" })
      .setLngLat(p.coords).setPopup(popup).addTo(map);
    markers[p.id] = m;
    refreshPin(p);
  }

  // home + chester share coords; skip duplicate end pin
  TRIP.pois.filter(p => p.id !== "home").forEach(addPoiMarker);

  // friends' start pins (informational)
  TRIP.friends.forEach(f => {
    const el = document.createElement("div");
    el.className = "pin pin-friend";
    el.style.setProperty("--pin", KIND.friend.color);
    el.innerHTML = `<span class="pin-dot">➤</span>`;
    el.title = f.name;
    const meet = pool[TRIP.meetupId];
    const popup = new maplibregl.Popup({ offset: 34, maxWidth: "300px" }).setHTML(`
      <div class="pop"><div class="pop-body">
        <div class="pop-time">Friend start point</div>
        <h3>${f.name}</h3>
        <p>${f.toMeetup}.</p>
        <div class="pop-links">
          <a href="https://www.google.com/maps/dir/?api=1&origin=${f.coords[1]},${f.coords[0]}&destination=${encodeURIComponent(meet.gplace)}" target="_blank" rel="noopener">Route to meetup ↗</a>
        </div>
      </div></div>`);
    new maplibregl.Marker({ element: el, anchor: "bottom" })
      .setLngLat(f.coords).setPopup(popup).addTo(map);
  });

  // --------------------------------------------------- itinerary + suggestions
  const listEl = document.getElementById("itinerary");
  const recsEl = document.getElementById("recs");

  function renderItinerary() {
    listEl.innerHTML = "";
    itin.forEach((id, i) => {
      const p = pool[id];
      const k = KIND[p.kind];
      const li = document.createElement("li");
      li.className = "it-item";
      const custom = p.time === undefined;
      li.innerHTML = `
        <div class="it-time">${p.time || "·"}</div>
        <div class="it-rail"><span class="it-dot" style="--pin:${k.color}">${i}</span></div>
        <div class="it-card">
          <div class="it-thumb" id="thumb-${p.id}"><span>${k.icon}</span></div>
          <div class="it-text">
            <div class="it-name">${p.name}${p.mp ? ` <em>${p.mp}</em>` : ""}</div>
            <div class="it-window">${p.window || (custom ? "added stop" : "")}</div>
          </div>
          <div class="it-ctrl">
            <button class="ic" data-act="up" data-id="${id}" ${i <= 1 ? "disabled" : ""} title="Move up">▲</button>
            <button class="ic" data-act="down" data-id="${id}" ${i === 0 || i >= itin.length - 2 ? "disabled" : ""} title="Move down">▼</button>
            <button class="ic ic-x" data-act="rm" data-id="${id}" ${p.locked ? "disabled" : ""} title="Remove">✕</button>
          </div>
        </div>`;
      li.querySelector(".it-card").addEventListener("click", (e) => {
        if (e.target.closest(".ic")) return;
        focusStop(p);
      });
      listEl.appendChild(li);
    });
    fillThumbs(itin.map(id => pool[id]));
    updateGmapsLink();
  }

  function renderRecs() {
    const rest = TRIP.pois.filter(p => !inItin(p.id));
    recsEl.innerHTML = rest.length ? "" : `<div class="rec-empty">Everything's in your plan — nice.</div>`;
    rest.forEach(p => {
      const k = KIND[p.kind];
      const row = document.createElement("div");
      row.className = "rec-item";
      row.innerHTML = `
        <div class="it-thumb" id="thumb-${p.id}"><span>${k.icon}</span></div>
        <div class="it-text">
          <div class="it-name">${p.name}${p.mp ? ` <em>${p.mp}</em>` : ""}</div>
          <div class="it-window">${k.label}</div>
        </div>
        <button class="rec-add" data-id="${p.id}">＋ Add</button>`;
      row.addEventListener("click", (e) => {
        if (e.target.closest(".rec-add")) return;
        focusStop(p);
      });
      recsEl.appendChild(row);
    });
    fillThumbs(rest);
  }

  function renderAll() {
    renderItinerary();
    renderRecs();
    TRIP.pois.forEach(refreshPin);
    scheduleRoute();
  }

  // insert by natural driving order (seq), respecting locked endpoints
  function addStop(id) {
    if (inItin(id)) return;
    const seq = pool[id].seq;
    let at = itin.length - 1; // before "home"
    for (let i = 1; i < itin.length - 1; i++) {
      if (pool[itin[i]].seq > seq) { at = i; break; }
    }
    itin.splice(at, 0, id);
    saveItin(); renderAll();
  }
  function removeStop(id) {
    if (pool[id].locked) return;
    itin = itin.filter(x => x !== id);
    saveItin(); renderAll();
  }
  function moveStop(id, dir) {
    const i = itin.indexOf(id);
    const j = i + dir;
    if (i <= 0 || j <= 0 || j >= itin.length - 1) return;
    [itin[i], itin[j]] = [itin[j], itin[i]];
    saveItin(); renderAll();
  }

  // one delegated handler for itinerary controls, rec adds, and popup buttons
  document.addEventListener("click", (e) => {
    const ic = e.target.closest(".ic");
    if (ic && !ic.disabled) {
      const id = ic.dataset.id;
      if (ic.dataset.act === "up") moveStop(id, -1);
      else if (ic.dataset.act === "down") moveStop(id, +1);
      else removeStop(id);
      return;
    }
    const add = e.target.closest(".rec-add, .pop-add");
    if (add) { addStop(add.dataset.id); closePopups(); return; }
    const rm = e.target.closest(".pop-remove");
    if (rm) { removeStop(rm.dataset.id); closePopups(); return; }
    const g = e.target.closest(".pop-gallery img");
    if (g) {
      const main = g.closest(".pop").querySelector(".pop-photo");
      main.style.backgroundImage = `url("${g.dataset.full || g.src}")`;
      main.classList.add("has-img");
    }
  });

  function closePopups() {
    Object.values(markers).forEach(m => { const p = m.getPopup(); if (p && p.isOpen()) m.togglePopup(); });
  }

  document.getElementById("reset-btn").addEventListener("click", () => {
    itin = [...TRIP.defaultItinerary];
    saveItin(); renderAll();
  });

  // dynamic Google Maps link mirroring the current plan (editable there too)
  function updateGmapsLink() {
    const parts = itin.map(id => {
      const p = pool[id];
      return p.gplace ? encodeURIComponent(p.gplace.replace(/ /g, "+")) : `${p.coords[1].toFixed(5)},${p.coords[0].toFixed(5)}`;
    });
    document.getElementById("gmaps-btn").href = "https://www.google.com/maps/dir/" + parts.join("/");
    const n = itin.length;
    document.getElementById("gmaps-note").textContent =
      n > 11 ? `Heads up: Google Maps caps at ~10 stops (you have ${n - 1}).` : "";
  }

  // ------------------------------------------------------------ static panel bits
  document.getElementById("trip-title").textContent = TRIP.title;
  document.getElementById("trip-subtitle").textContent = TRIP.subtitle;
  document.getElementById("notes").innerHTML =
    TRIP.notes.map(n => `<li>${n}</li>`).join("") +
    `<li><a href="${TRIP.statusUrl}" target="_blank" rel="noopener">Check Skyline Drive status (NPS) ↗</a></li>`;
  document.getElementById("sources").innerHTML = TRIP.sources
    .map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join("");
  document.getElementById("friends-note").innerHTML =
    `<li>Chester → Short Pump: ≈30 min via VA-288 N</li>` +
    TRIP.friends.map(f => `<li>${f.name}: ${f.toMeetup}</li>`).join("") +
    `<li>Tap the grey ➤ pins on the map for each crew's route to the meetup.</li>`;

  function focusStop(p) {
    const inPark = p.mp !== undefined;
    map.flyTo({ center: p.coords, zoom: inPark ? 13.6 : 12.2, pitch: 62, duration: 2200, essential: true });
    const m = markers[p.id];
    if (m && !m.getPopup().isOpen()) m.togglePopup();
  }

  document.getElementById("overview-btn").addEventListener("click", () => {
    stopTour();
    map.fitBounds(TRIP.overviewBounds, { pitch: 50, bearing: 0, duration: 2200 });
  });
  document.getElementById("park-btn").addEventListener("click", () => {
    stopTour();
    map.fitBounds(TRIP.parkBounds, { pitch: 60, bearing: 0, duration: 2200 });
  });
  document.getElementById("panel-toggle").addEventListener("click", () => {
    document.body.classList.toggle("panel-closed");
  });

  // ------------------------------------------------------------------ photos
  async function commonsQuery(params) {
    const r = await fetch("https://commons.wikimedia.org/w/api.php?origin=*&format=json&action=query&" + params);
    if (!r.ok) throw new Error("commons " + r.status);
    return r.json();
  }
  function imageUrls(data, n) {
    const pages = (data.query && data.query.pages) || {};
    return Object.values(pages)
      .filter(p => p.imageinfo && /\.(jpe?g|png)$/i.test(p.title))
      .sort((a, b) => (a.index || 99) - (b.index || 99))
      .slice(0, n)
      .map(p => p.imageinfo[0].thumburl);
  }

  const photoCache = {};
  async function findPhotos(p) {
    if (photoCache[p.id]) return photoCache[p.id];
    let urls = [];
    try {
      const geo = await commonsQuery(
        `generator=geosearch&ggscoord=${p.coords[1]}%7C${p.coords[0]}` +
        `&ggsradius=${(p.photo && p.photo.r) || 2000}&ggslimit=10&ggsnamespace=6` +
        `&prop=imageinfo&iiprop=url&iiurlwidth=640`);
      urls = imageUrls(geo, 4);
      if (urls.length < 2 && p.photo && p.photo.q) {
        const txt = await commonsQuery(
          `generator=search&gsrsearch=${encodeURIComponent(p.photo.q)}` +
          `&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=640`);
        urls = urls.concat(imageUrls(txt, 4 - urls.length));
      }
    } catch (e) { /* offline — icon fallback stays */ }
    photoCache[p.id] = urls;
    return urls;
  }

  async function loadPhotos(p) {
    const urls = await findPhotos(p);
    const main = document.getElementById(`photo-${p.id}`);
    const gal = document.getElementById(`gallery-${p.id}`);
    if (main && urls[0]) {
      main.style.backgroundImage = `url("${urls[0]}")`;
      main.classList.add("has-img");
    }
    if (gal && urls.length > 1) {
      gal.innerHTML = urls.map(u => `<img src="${u}" data-full="${u}" alt="">`).join("");
    }
  }

  function fillThumbs(pois) {
    pois.forEach((p, i) => {
      setTimeout(async () => {
        const urls = await findPhotos(p);
        const t = document.getElementById(`thumb-${p.id}`);
        if (urls[0] && t) {
          t.style.backgroundImage = `url("${urls[0]}")`;
          t.classList.add("has-img");
        }
      }, i * 300);
    });
  }

  // ------------------------------------------------------------------- route
  let routeLine = null;
  let routeTimer = null;

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
          "line-gradient": ["interpolate", ["linear"], ["line-progress"], 0, "#f2c14e", 0.5, "#e8834f", 1, "#d1495b"]
        }
      });
    }
    map.setPaintProperty("route-line", "line-dasharray", dashed ? [1.4, 1.6] : [1, 0]);
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
    const pts = itin.map(id => pool[id].coords).map(c => `${c[0]},${c[1]}`).join(";");
    const url = `https://router.project-osrm.org/route/v1/driving/${pts}?overview=full&geometries=geojson&steps=false`;
    const r = await fetch(url);
    if (!r.ok) throw new Error("osrm " + r.status);
    const j = await r.json();
    if (!j.routes || !j.routes.length) throw new Error("no route");
    return j.routes[0];
  }

  async function refreshRoute() {
    try {
      const route = await fetchRoute();
      drawRoute(route.geometry.coordinates, false);
      const mi = Math.round(route.distance / 1609.34);
      const h = Math.floor(route.duration / 3600);
      const m = Math.round((route.duration % 3600) / 60);
      document.getElementById("stat-dist").textContent = `${mi} mi`;
      document.getElementById("stat-drive").textContent = `${h}h ${String(m).padStart(2, "0")}m driving`;
      TRIP.pois.forEach(p => {
        if (p.snapToRoute && inItin(p.id) && markers[p.id]) {
          const s = nearestOnRoute(p.coords);
          if (s) { markers[p.id].setLngLat(s); p.coords = s; }
        }
      });
    } catch (e) {
      drawRoute(itin.map(id => pool[id].coords), true);
      document.getElementById("stat-dist").textContent = "≈310 mi";
      document.getElementById("stat-drive").textContent = "≈7 h driving";
    }
  }

  function scheduleRoute() {
    clearTimeout(routeTimer);
    routeTimer = setTimeout(() => { if (inited) refreshRoute(); }, 700);
  }

  let inited = false;
  async function init() {
    if (inited) return;
    inited = true;
    await refreshRoute();
    map.fitBounds(TRIP.overviewBounds, { pitch: 50, bearing: 0, duration: 3000 });
  }
  map.once("load", init);
  setTimeout(() => { if (map.getStyle()) init(); }, 6000);

  renderItinerary();
  renderRecs();

  // ---------------------------------------------------------------- fly tour
  let tourRAF = null;
  function stopTour() {
    if (tourRAF) { cancelAnimationFrame(tourRAF); tourRAF = null; }
    document.getElementById("tour-btn").textContent = "▶ Fly the route";
  }

  document.getElementById("tour-btn").addEventListener("click", () => {
    if (tourRAF) { stopTour(); return; }
    if (!routeLine) return;
    document.getElementById("tour-btn").textContent = "■ Stop tour";

    const line = routeLine;
    const cum = [0];
    for (let i = 1; i < line.length; i++) {
      const dx = line[i][0] - line[i - 1][0];
      const dy = line[i][1] - line[i - 1][1];
      cum.push(cum[i - 1] + Math.hypot(dx, dy * 1.3));
    }
    const total = cum[cum.length - 1];
    const DURATION = 90000;
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
      const pr = ((now - start) % DURATION) / DURATION;
      const d = pr * total;
      const pos = at(d);
      const ahead = at(Math.min(total, d + total * 0.004));
      const brg = (Math.atan2(ahead[0] - pos[0], ahead[1] - pos[1]) * 180) / Math.PI;
      map.jumpTo({ center: pos, zoom: 12.8, pitch: 68, bearing: brg });
      tourRAF = requestAnimationFrame(frame);
    }
    map.once("moveend", () => { tourRAF = requestAnimationFrame(frame); });
    map.flyTo({ center: line[0], zoom: 12.8, pitch: 68, duration: 1600 });
    map.once("dragstart", stopTour);
  });
})();
