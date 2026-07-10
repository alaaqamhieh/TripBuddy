/*
 * TripBuddy trip definition: Central Shenandoah Scenic Loop
 * Curated from NPS info + travel blogs (see `sources`).
 * Coordinates are [lng, lat]. Stops marked `snapToRoute` are pulled onto the
 * driving route once real road geometry loads, so overlook pins sit on
 * Skyline Drive itself.
 */
window.TRIP = {
  id: "shenandoah-central-loop",
  title: "Shenandoah Scenic Loop",
  subtitle: "Central District · Stony Man Trail + 3 overlooks + small-town stops",
  origin: "Chester, VA",
  center: [-78.38, 38.55],
  overviewBounds: [[-78.75, 37.25], [-77.30, 38.80]],
  parkBounds: [[-78.62, 38.30], [-78.15, 38.72]],
  notes: [
    "Skyline Drive is 105 mi total — you're doing only the best central stretch. Speed limit is mostly 35 mph, so it feels scenic and slow.",
    "Entrance: $30 per private vehicle, covers everyone in the car for 7 consecutive days.",
    "Pets are not allowed on Stony Man Trail.",
    "Check Skyline Drive road status the night before — mountain conditions change fast."
  ],
  statusUrl: "https://www.nps.gov/shen/planyourvisit/conditions.htm",
  gmapsFullRoute:
    "https://www.google.com/maps/dir/Chester,+VA/38.3597,-78.5427/38.5931,-78.3756/38.5647,-78.3860/38.5480,-78.3995/38.6371,-78.3524/Sperryville,+VA/Culpeper,+VA/Chester,+VA",
  stops: [
    {
      id: "chester", n: 0, kind: "home", name: "Chester, VA",
      time: "6:45 AM", window: "Depart",
      coords: [-77.4408, 37.3568],
      desc: "Home base. Leave by 6:45 AM to reach the park entrance around 9:15 with a coffee stop built in.",
      photo: { q: "Chester Virginia", r: 3000 }
    },
    {
      id: "swiftrun", n: 1, kind: "entrance", name: "Swift Run Gap Entrance", mp: "MP 65.5",
      time: "9:15 AM", window: "9:15 AM",
      coords: [-78.5427, 38.3597], snapToRoute: true,
      desc: "Enter Skyline Drive where US-33 crosses the Blue Ridge. $30/vehicle, good for 7 days. Then a slow, scenic climb north.",
      photo: { q: "Swift Run Gap", r: 2000 }
    },
    {
      id: "bigmeadows", n: 2, kind: "visitor", name: "Byrd Visitor Center · Big Meadows", mp: "MP 51",
      time: "10:15 AM", window: "10:15 – 10:45 AM",
      coords: [-78.4373, 38.5224], snapToRoute: true,
      desc: "Restrooms, gift shop, park film, and the big open meadow — deer sightings are almost guaranteed here in the morning.",
      tips: ["Grab a paper Skyline Drive map here", "Big Meadows often has deer right by the road"],
      photo: { q: "Big Meadows Shenandoah", r: 2500 }
    },
    {
      id: "stonyman", n: 3, kind: "hike", name: "Stony Man Trail", mp: "MP 41.7",
      time: "11:15 AM", window: "11:15 AM – 12:30 PM",
      coords: [-78.3756, 38.5931],
      desc: "The best short hike in the Central District: 1.6 mi round trip, gentle grade, ending at Shenandoah's second-highest summit (4,011 ft) with 180°+ views over the Shenandoah Valley and Massanutten.",
      tips: ["No pets on this trail (NPS rule)", "Park at the Skyland north entrance lot", "Bloggers call it the park's best view-per-effort ratio"],
      blog: { label: "Blue Ridge Awaits trail guide", url: "https://blueridgeawaits.com/stony-man-trail/" },
      photo: { q: "Stony Man Shenandoah", r: 2000 }
    },
    {
      id: "skyland", n: 4, kind: "food", name: "Lunch at Skyland Resort", mp: "MP 42.5",
      time: "12:45 PM", window: "12:45 – 1:30 PM",
      coords: [-78.3819, 38.5891], snapToRoute: true,
      desc: "Pollock Dining Room at Skyland — table service with valley views, the highest point on Skyline Drive. Picnic at Big Meadows is the backup plan.",
      photo: { q: "Skyland Resort Shenandoah", r: 1500 }
    },
    {
      id: "crescentrock", n: 5, kind: "overlook", name: "Crescent Rock Overlook", mp: "MP 44.4",
      time: "1:40 PM", window: "1:40 PM",
      coords: [-78.3860, 38.5647], snapToRoute: true,
      desc: "Short drive south for a head-on view of Hawksbill — the park's highest peak. One of the classic photo stops.",
      photo: { q: "Crescent Rock Overlook", r: 2000 }
    },
    {
      id: "oldragview", n: 6, kind: "overlook", name: "Old Rag View Overlook", mp: "MP 46.5",
      time: "2:00 PM", window: "2:00 PM",
      coords: [-78.3995, 38.5480], snapToRoute: true,
      desc: "Eastward view of Old Rag Mountain's famous rocky spine — the park's most iconic silhouette, no scramble required.",
      photo: { q: "Old Rag Mountain", r: 4000 },
      blog: { label: "Well & Well Traveled — central overlooks", url: "https://www.wellandwelltraveled.com/shenandoah-national-park-the-best-skyline-drive-overlooks-in-the-middle-of-the-park/" }
    },
    {
      id: "jewellhollow", n: 7, kind: "overlook", name: "Jewell Hollow Overlook", mp: "MP 36.4",
      time: "2:20 PM", window: "2:20 PM",
      coords: [-78.3524, 38.6371], snapToRoute: true,
      desc: "Turn back north for one last westward panorama over the valley — bloggers rank it among the best west-facing overlooks in the park.",
      photo: { q: "Jewell Hollow Overlook", r: 2500 }
    },
    {
      id: "thorntongap", n: 8, kind: "entrance", name: "Thornton Gap Exit", mp: "MP 31.5",
      time: "2:45 PM", window: "2:45 – 3:00 PM",
      coords: [-78.3208, 38.6614], snapToRoute: true,
      desc: "Exit onto US-211 east. Sperryville is 8 minutes downhill.",
      photo: { q: "Thornton Gap", r: 2000 }
    },
    {
      id: "sperryville", n: 9, kind: "town", name: "Sperryville",
      time: "3:15 PM", window: "3:15 – 4:30 PM",
      coords: [-78.2270, 38.6376],
      desc: "The charm stop. Coffee or dessert at Before & After (riverside patio — the honeysuckle latte is the cult order), stroll the River Walk, and peek into Copper Fox Distillery or Pen Druid Brewing with Blue Ridge views.",
      tips: ["Before & After — 31 Main St, riverside seating", "River Walk starts across from Happy Camper", "Copper Fox: applewood-smoked whiskey tastings"],
      blog: { label: "Washingtonian foodie guide to Sperryville", url: "https://washingtonian.com/2022/05/26/the-foodie-travel-guide-to-sperryville-virginia-where-to-eat-drink-and-stay/" },
      photo: { q: "Sperryville Virginia", r: 2000 }
    },
    {
      id: "culpeper", n: 10, kind: "dinner", name: "Dinner in Culpeper",
      time: "5:00 PM", window: "5:00 – 7:00 PM",
      coords: [-77.9958, 38.4730],
      desc: "Proper dinner on historic Davis Street: Grass Rootes (basement pub, live music), Piedmont Steakhouse (1890s brick building), It's About Thyme (European), or Pinto Thai. Walk the downtown block after.",
      tips: ["Grass Rootes & Piedmont Steakhouse are the local picks", "Sweet Roux next door for casual American"],
      blog: { label: "Culpeper downtown dining guide", url: "https://culpeperdowntown.com/dine/" },
      photo: { q: "Culpeper Virginia downtown", r: 2000 }
    },
    {
      id: "home", n: 11, kind: "home", name: "Back to Chester",
      time: "~8:15 PM", window: "Evening",
      coords: [-77.4408, 37.3568],
      desc: "About 75 minutes home from Culpeper via US-522 and I-64. Total day: mountain views, one great hike, two towns, zero 14-hour-marathon feeling.",
      photo: { q: "Chester Virginia", r: 3000 }
    }
  ],
  // Alternate town stops — shown as hollow "option" pins with their own routes.
  options: [
    {
      id: "luray", name: "Option: Luray", coords: [-78.4595, 38.6654],
      desc: "Swap in Luray if you want the classic tourist stop: Luray Caverns (10-story chambers + the Stalacpipe Organ, add 2+ hrs), the gentle 2-mile paved Hawksbill Greenway, and a boutique-lined Main Street under the Singing Tower.",
      gmaps: "https://www.google.com/maps/dir/Chester,+VA/38.3597,-78.5427/38.5931,-78.3756/38.6371,-78.3524/Luray,+VA/Chester,+VA",
      blog: { label: "Virginia Travel Tips — 12 things to do in Luray", url: "https://virginiatraveltips.com/things-to-do-in-luray-va/" },
      photo: { q: "Luray Caverns", r: 3000 }
    }
  ],
  sources: [
    { label: "NPS — Shenandoah conditions & fees", url: "https://www.nps.gov/shen/planyourvisit/conditions.htm" },
    { label: "Blue Ridge Awaits — Stony Man Trail", url: "https://blueridgeawaits.com/stony-man-trail/" },
    { label: "Adventure Planning Queen — Stony Man guide", url: "https://adventureplanningqueen.com/stony-man-trail-shenandoah/" },
    { label: "The National Parks Experience — 20 best overlooks", url: "https://www.travel-experience-live.com/best-overlooks-views-in-shenandoah-national-park/" },
    { label: "Well & Well Traveled — central district overlooks", url: "https://www.wellandwelltraveled.com/shenandoah-national-park-the-best-skyline-drive-overlooks-in-the-middle-of-the-park/" },
    { label: "Washingtonian — Sperryville foodie guide", url: "https://washingtonian.com/2022/05/26/the-foodie-travel-guide-to-sperryville-virginia-where-to-eat-drink-and-stay/" },
    { label: "Enriching Pursuits — Sperryville like a local", url: "https://enrichingpursuits.com/things-to-do-in-sperryville-va/" },
    { label: "Culpeper Renaissance — downtown dining", url: "https://culpeperdowntown.com/dine/" },
    { label: "Virginia Travel Tips — Luray beyond the caverns", url: "https://virginiatraveltips.com/things-to-do-in-luray-va/" }
  ]
};
