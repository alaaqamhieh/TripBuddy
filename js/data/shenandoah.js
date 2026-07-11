/*
 * TripBuddy trip definition: Central Shenandoah Scenic Loop (v3)
 * Curated from NPS info + travel blogs (see `sources`).
 *
 * v3: meetup moved to Charlottesville (with walkable morning stops), the
 * after-park town visits dropped from the default day, and dinner moved to
 * Glen Allen / Short Pump on the way home. Sperryville & Culpeper remain as
 * addable suggestions.
 *
 * `pois` is the full pool of places, each with a `seq` number that encodes the
 * natural driving order (northbound on Skyline Drive = mileposts decreasing).
 * `defaultItinerary` is the recommended day; everything else shows up as an
 * addable suggestion pin. Coordinates are [lng, lat]; `snapToRoute` pins get
 * pulled exactly onto the fetched road line.
 */
window.TRIP = {
  id: "shenandoah-central-loop",
  version: 3,
  title: "Shenandoah Scenic Loop",
  subtitle: "Charlottesville meetup · northbound Skyline Drive · dinner back in Glen Allen",
  center: [-78.38, 38.45],
  overviewBounds: [[-78.75, 37.25], [-77.30, 38.80]],
  parkBounds: [[-78.62, 38.30], [-78.15, 38.72]],
  notes: [
    "The park runs northbound: enter at Swift Run Gap (MP 65.5) and mileposts count DOWN to Thornton Gap (MP 31.5) — no backtracking.",
    "Skyline Drive speed limit is mostly 35 mph — the drive is part of the sightseeing.",
    "Entrance: $30 per private vehicle, covers everyone in the car for 7 consecutive days.",
    "Pets are not allowed on Stony Man Trail.",
    "Return leg is Thornton Gap → US-522 S → I-64 E, about 2¼ hours to Glen Allen — Sperryville and Culpeper are right on that road if anyone wants a leg-stretch (they're in Recommendations).",
    "Check Skyline Drive road status the night before — mountain conditions change fast."
  ],
  statusUrl: "https://www.nps.gov/shen/planyourvisit/conditions.htm",

  // Friends' starting points — everyone converges on the meetup stop.
  friends: [
    {
      id: "glenallen", name: "Glen Allen crew", coords: [-77.5064, 37.6660],
      toMeetup: "≈1h 05m to Charlottesville via I-64 W"
    },
    {
      id: "ashland", name: "Ashland crew", coords: [-77.4797, 37.7590],
      toMeetup: "≈1h 15m to Charlottesville via I-64 W"
    }
  ],
  meetupId: "meetup",

  pois: [
    {
      id: "chester", seq: 0, kind: "home", name: "Chester, VA", locked: true,
      time: "6:45 AM", window: "Depart",
      coords: [-77.4408, 37.3568], gplace: "Chester, VA",
      desc: "Home base. Leave by 6:45 AM — about 1h 10m to Charlottesville via I-64 W.",
      photo: { q: "Chester Virginia", r: 3000 }
    },
    {
      id: "meetup", seq: 10, kind: "meetup", name: "Meet up · Charlottesville Downtown Mall",
      time: "8:00 AM", window: "8:00 – 9:15 AM",
      coords: [-78.4790, 38.0299], gplace: "Downtown Mall, Charlottesville, VA",
      desc: "Everyone (including Capron) meets on the Downtown Mall — one of the longest pedestrian malls in the country: eight brick-paved, tree-lined blocks of cafes and local shops with a European feel. Coffee and a slow stroll here, then roll out together toward the mountains by ~9:15.",
      tips: [
        "Mudhouse Coffee on the Mall is the classic local roaster stop",
        "Bodo's Bagels is THE Charlottesville breakfast institution (grab a bacon-egg-cheese)",
        "Want a grander walk? UVA's Lawn & Rotunda are 5 min away — see Recommendations",
        "Free parking is easiest at the Market St or Water St garages early on a weekend"
      ],
      blog: { label: "Visit Charlottesville — day trip guide", url: "https://www.visitcharlottesville.org/blog/day-trip-to-charlottesville-albemarle-county/" },
      photo: { q: "Downtown Mall Charlottesville", r: 1500 }
    },
    {
      id: "bodos", seq: 12, kind: "food", name: "Bodo's Bagels (Corner)",
      coords: [-78.5008, 38.0355], suggested: true,
      desc: "Charlottesville's beloved bagel shop by UVA — fast, cheap, and legendary. Perfect grab-and-go breakfast before the mountain drive if the group skips a sit-down.",
      photo: { q: "The Corner Charlottesville", r: 1200 }
    },
    {
      id: "uvalawn", seq: 14, kind: "site", name: "UVA Rotunda & The Lawn",
      coords: [-78.5034, 38.0356], suggested: true,
      desc: "Jefferson's UNESCO World Heritage 'Academical Village' — the Rotunda, the terraced Lawn, and the hidden serpentine-wall gardens make a beautiful 30–45 min walk, 5 minutes from the Downtown Mall.",
      blog: { label: "Stay Charlottesville — things to do", url: "https://www.staycharlottesville.com/things-to-do-charlottesville-va" },
      photo: { q: "University of Virginia Rotunda", r: 1500 }
    },
    {
      id: "ixart", seq: 15, kind: "site", name: "IX Art Park",
      coords: [-78.4816, 38.0250], suggested: true,
      desc: "Free, colorful outdoor art park a short walk off the Downtown Mall — murals and quirky installations, a fun 15-minute photo detour.",
      photo: { q: "IX Art Park Charlottesville", r: 1200 }
    },
    {
      id: "saunders", seq: 16, kind: "hike", name: "Saunders-Monticello Trail",
      coords: [-78.4530, 37.9964], suggested: true,
      desc: "Gentle 2-mile boardwalk trail through the woods toward Monticello — the nicest easy walk in town if you'd rather be under trees than on brick. Adds ~1 hour + short drive.",
      photo: { q: "Saunders-Monticello Trail", r: 2500 }
    },
    {
      id: "swiftrun", seq: 20, kind: "entrance", name: "Swift Run Gap Entrance", mp: "MP 65.5",
      time: "10:00 AM", window: "10:00 AM",
      coords: [-78.5427, 38.3597], snapToRoute: true,
      desc: "From Charlottesville it's ~40 min up US-29 N → US-33 W to enter Skyline Drive where US-33 crosses the Blue Ridge. $30/vehicle covers everyone in the car for 7 days. From here the whole day drives north — mileposts count down.",
      photo: { q: "Swift Run Gap", r: 2000 }
    },
    {
      id: "thepoint", seq: 25, kind: "overlook", name: "The Point Overlook", mp: "MP 55.5",
      coords: [-78.4530, 38.4870], snapToRoute: true, suggested: true,
      desc: "Bloggers call this the most unbeatable easy-access view in the park — a sweeping westward panorama right on your way north. A 5-minute stop.",
      blog: { label: "The National Parks Experience — best overlooks", url: "https://www.travel-experience-live.com/best-overlooks-views-in-shenandoah-national-park/" },
      photo: { q: "The Point Overlook Shenandoah", r: 2500 }
    },
    {
      id: "bigmeadows", seq: 30, kind: "visitor", name: "Byrd Visitor Center · Big Meadows", mp: "MP 51",
      time: "10:40 AM", window: "10:40 – 11:05 AM",
      coords: [-78.4373, 38.5224], snapToRoute: true,
      desc: "Restrooms, gift shop, park film, and the big open meadow — deer sightings are almost guaranteed here in the morning.",
      tips: ["Grab a paper Skyline Drive map here", "Big Meadows often has deer right by the road"],
      photo: { q: "Big Meadows Shenandoah", r: 2500 }
    },
    {
      id: "wayside", seq: 32, kind: "food", name: "Big Meadows Wayside", mp: "MP 51.2",
      coords: [-78.4390, 38.5210], snapToRoute: true, suggested: true,
      desc: "Camp store + grill famous for its blackberry milkshakes and blackberry ice cream pie — the park's signature treat. Good picnic supply stop.",
      photo: { q: "Big Meadows Wayside", r: 2000 }
    },
    {
      id: "darkhollow", seq: 34, kind: "hike", name: "Dark Hollow Falls", mp: "MP 50.7",
      coords: [-78.4320, 38.5252], snapToRoute: true, suggested: true,
      desc: "The park's most popular waterfall: 1.4 mi round trip to a 70-ft cascade. Short but steep on the way back up — add ~1 hour if the group is up for two hikes.",
      photo: { q: "Dark Hollow Falls", r: 2000 }
    },
    {
      id: "franklincliffs", seq: 36, kind: "overlook", name: "Franklin Cliffs Overlook", mp: "MP 49",
      coords: [-78.4204, 38.5405], snapToRoute: true, suggested: true,
      desc: "Broad west-facing cliffs view over the Shenandoah Valley — quieter than the marquee stops.",
      photo: { q: "Franklin Cliffs Overlook", r: 2500 }
    },
    {
      id: "hawksbill", seq: 38, kind: "hike", name: "Hawksbill Summit (Upper trail)", mp: "MP 46.7",
      coords: [-78.4021, 38.5455], snapToRoute: true, suggested: true,
      desc: "2.1 mi round trip to the park's highest point (4,050 ft) with a 360° observation platform. Swap it in if you want the summit bragging rights instead of a second short stop.",
      photo: { q: "Hawksbill Mountain Shenandoah", r: 3000 }
    },
    {
      id: "oldragview", seq: 40, kind: "overlook", name: "Old Rag View Overlook", mp: "MP 46.5",
      time: "11:20 AM", window: "11:20 AM",
      coords: [-78.3995, 38.5480], snapToRoute: true,
      desc: "Eastward view of Old Rag Mountain's famous rocky spine — the park's most iconic silhouette, no scramble required.",
      photo: { q: "Old Rag Mountain", r: 4000 },
      blog: { label: "Well & Well Traveled — central overlooks", url: "https://www.wellandwelltraveled.com/shenandoah-national-park-the-best-skyline-drive-overlooks-in-the-middle-of-the-park/" }
    },
    {
      id: "crescentrock", seq: 50, kind: "overlook", name: "Crescent Rock Overlook", mp: "MP 44.4",
      time: "11:35 AM", window: "11:35 AM",
      coords: [-78.3860, 38.5647], snapToRoute: true,
      desc: "Head-on view of Hawksbill — the park's highest peak. One of the classic photo stops.",
      photo: { q: "Crescent Rock Overlook", r: 2000 }
    },
    {
      id: "stonyman", seq: 60, kind: "hike", name: "Stony Man Trail", mp: "MP 41.7",
      time: "12:00 PM", window: "12:00 – 1:15 PM",
      coords: [-78.3756, 38.5931],
      desc: "The best short hike in the Central District: 1.6 mi round trip, gentle grade, ending at Shenandoah's second-highest summit (4,011 ft) with 180°+ views over the Shenandoah Valley and Massanutten.",
      tips: ["No pets on this trail (NPS rule)", "Park at the Skyland north entrance lot", "Bloggers call it the park's best view-per-effort ratio"],
      blog: { label: "Blue Ridge Awaits trail guide", url: "https://blueridgeawaits.com/stony-man-trail/" },
      photo: { q: "Stony Man Shenandoah", r: 2000 }
    },
    {
      id: "skyland", seq: 70, kind: "food", name: "Lunch at Skyland Resort", mp: "MP 42.5",
      time: "1:20 PM", window: "1:20 – 2:10 PM",
      coords: [-78.3819, 38.5891], snapToRoute: true,
      desc: "Pollock Dining Room at Skyland — table service with valley views at the highest point on Skyline Drive, right next to the Stony Man trailhead. Picnic at Big Meadows is the backup plan.",
      photo: { q: "Skyland Resort Shenandoah", r: 1500 }
    },
    {
      id: "thorofare", seq: 75, kind: "overlook", name: "Thorofare Mountain Overlook", mp: "MP 40.5",
      coords: [-78.3665, 38.6027], snapToRoute: true, suggested: true,
      desc: "Another look at Old Rag's rocky spine, minutes north of Skyland — a favorite sunrise spot for photographers.",
      photo: { q: "Thorofare Mountain Overlook", r: 2500 }
    },
    {
      id: "pinnacles", seq: 78, kind: "overlook", name: "Pinnacles Overlook", mp: "MP 35.1",
      coords: [-78.3450, 38.6480], snapToRoute: true, suggested: true,
      desc: "Craggy west-side view near the Pinnacle — pairs naturally with Jewell Hollow a minute down the road.",
      photo: { q: "Pinnacles Overlook Shenandoah", r: 2500 }
    },
    {
      id: "jewellhollow", seq: 80, kind: "overlook", name: "Jewell Hollow Overlook", mp: "MP 36.4",
      time: "2:30 PM", window: "2:30 PM",
      coords: [-78.3524, 38.6371], snapToRoute: true,
      desc: "One last westward panorama over the valley — bloggers rank it among the best west-facing overlooks in the park.",
      photo: { q: "Jewell Hollow Overlook", r: 2500 }
    },
    {
      id: "hazelmtn", seq: 85, kind: "overlook", name: "Hazel Mountain Overlook", mp: "MP 33",
      coords: [-78.3320, 38.6553], snapToRoute: true, suggested: true,
      desc: "East-facing granite outcrop view — a photogenic quick stop just before the exit.",
      photo: { q: "Hazel Mountain Overlook", r: 2500 }
    },
    {
      id: "thorntongap", seq: 90, kind: "entrance", name: "Thornton Gap Exit", mp: "MP 31.5",
      time: "2:50 PM", window: "2:50 PM",
      coords: [-78.3208, 38.6614], snapToRoute: true,
      desc: "Exit onto US-211 east, then US-522 S → I-64 E toward Richmond — about 2¼ hours to Glen Allen for dinner. Sperryville and Culpeper are on the way if anyone needs a stop.",
      photo: { q: "Thornton Gap", r: 2000 }
    },
    {
      id: "sperryville", seq: 100, kind: "town", name: "Sperryville (quick stop)",
      coords: [-78.2270, 38.6376], gplace: "Sperryville, VA", suggested: true,
      desc: "8 minutes below Thornton Gap and directly on the way home — coffee or dessert at Before & After (riverside patio, honeysuckle latte), a stroll on the River Walk, or a peek into Copper Fox Distillery. A great 30–45 min leg-stretch if the group isn't rushing to dinner.",
      tips: ["Before & After — 31 Main St, riverside seating", "Copper Fox: applewood-smoked whiskey tastings"],
      blog: { label: "Washingtonian foodie guide to Sperryville", url: "https://washingtonian.com/2022/05/26/the-foodie-travel-guide-to-sperryville-virginia-where-to-eat-drink-and-stay/" },
      photo: { q: "Sperryville Virginia", r: 2000 }
    },
    {
      id: "copperfox", seq: 104, kind: "site", name: "Copper Fox Distillery",
      coords: [-78.2249, 38.6356], suggested: true,
      desc: "Tour + tasting of applewood-smoked single malt in a converted apple-packing plant, along Sperryville's River Walk.",
      photo: { q: "Copper Fox Distillery", r: 2000 }
    },
    {
      id: "luraycaverns", seq: 106, kind: "site", name: "Luray Caverns (detour)",
      coords: [-78.4839, 38.6640], gplace: "Luray Caverns, Luray, VA", suggested: true,
      desc: "The classic tourist add-on: 10-story chambers and the Great Stalacpipe Organ. It's a ~25-min detour west from Thornton Gap and adds 2+ hours — only if the group wants a big attraction before the drive home.",
      blog: { label: "Virginia Travel Tips — Luray guide", url: "https://virginiatraveltips.com/things-to-do-in-luray-va/" },
      photo: { q: "Luray Caverns", r: 3000 }
    },
    {
      id: "culpeper", seq: 108, kind: "town", name: "Culpeper (Davis St)",
      coords: [-77.9958, 38.4730], gplace: "Culpeper, VA", suggested: true,
      desc: "Historic Davis Street is directly on the route home — Grass Rootes, Piedmont Steakhouse, It's About Thyme, Pinto Thai. Swap dinner here instead of Glen Allen if the group gets hungry early.",
      blog: { label: "Culpeper downtown dining guide", url: "https://culpeperdowntown.com/dine/" },
      photo: { q: "Culpeper Virginia downtown", r: 2000 }
    },
    {
      id: "gadinner", seq: 112, kind: "dinner", name: "Dinner · Glen Allen / Short Pump",
      time: "5:15 PM", window: "5:15 – 7:15 PM",
      coords: [-77.6062, 37.6547], gplace: "Short Pump Town Center, Glen Allen, VA",
      desc: "Everyone regroups for dinner back on home turf in northern Richmond. Best group-dinner picks around Glen Allen / Short Pump: Rio Brazil Steakhouse or Texas de Brazil (festive, great for a hungry post-hike crew), The Kitchen + Bar @ Short Pump, Bonefish Grill, or Ruth's Chris if you're celebrating.",
      tips: [
        "Brazilian steakhouse = the crowd-pleaser after a hiking day",
        "Reserve ahead for groups — Saturday evenings fill up",
        "Glen Allen crew is home; Ashland ~20 min, Chester ~35 min after"
      ],
      blog: { label: "Best group dining in Glen Allen (Tripadvisor)", url: "https://www.tripadvisor.com/Restaurants-g57768-zfp9-Glen_Allen_Virginia.html" },
      photo: { q: "Short Pump Town Center", r: 2000 }
    },
    {
      id: "home", seq: 120, kind: "home", name: "Home to Chester", locked: true,
      time: "~8:00 PM", window: "Evening",
      coords: [-77.4408, 37.3568], gplace: "Chester, VA",
      desc: "About 35 minutes from Short Pump down VA-288. The Glen Allen and Ashland crews are already basically home.",
      photo: { q: "Virginia Piedmont", r: 5000 }
    }
  ],

  defaultItinerary: [
    "chester", "meetup", "swiftrun", "bigmeadows", "oldragview", "crescentrock",
    "stonyman", "skyland", "jewellhollow", "thorntongap", "gadinner", "home"
  ],

  sources: [
    { label: "NPS — Shenandoah conditions & fees", url: "https://www.nps.gov/shen/planyourvisit/conditions.htm" },
    { label: "Visit Charlottesville — day trip guide", url: "https://www.visitcharlottesville.org/blog/day-trip-to-charlottesville-albemarle-county/" },
    { label: "Stay Charlottesville — 20+ things to do", url: "https://www.staycharlottesville.com/things-to-do-charlottesville-va" },
    { label: "Blue Ridge Awaits — Stony Man Trail", url: "https://blueridgeawaits.com/stony-man-trail/" },
    { label: "The National Parks Experience — 20 best overlooks", url: "https://www.travel-experience-live.com/best-overlooks-views-in-shenandoah-national-park/" },
    { label: "Well & Well Traveled — central district overlooks", url: "https://www.wellandwelltraveled.com/shenandoah-national-park-the-best-skyline-drive-overlooks-in-the-middle-of-the-park/" },
    { label: "Parks Collecting — 25 best Skyline Drive overlooks", url: "https://parkscollecting.com/best-overlooks-on-skyline-drive/" },
    { label: "Washingtonian — Sperryville foodie guide", url: "https://washingtonian.com/2022/05/26/the-foodie-travel-guide-to-sperryville-virginia-where-to-eat-drink-and-stay/" },
    { label: "Tripadvisor — group dining in Glen Allen", url: "https://www.tripadvisor.com/Restaurants-g57768-zfp9-Glen_Allen_Virginia.html" },
    { label: "Virginia Travel Tips — Luray beyond the caverns", url: "https://virginiatraveltips.com/things-to-do-in-luray-va/" }
  ]
};
