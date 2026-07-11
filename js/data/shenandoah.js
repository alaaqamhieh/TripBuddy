/*
 * TripBuddy trip definition: Central Shenandoah Scenic Loop (v2)
 * Curated from NPS info + travel blogs (see `sources`).
 *
 * `pois` is the full pool of places, each with a `seq` number that encodes the
 * natural driving order (northbound on Skyline Drive = mileposts decreasing).
 * `defaultItinerary` is the recommended day; everything else shows up as an
 * addable suggestion pin. Coordinates are [lng, lat]; `snapToRoute` pins get
 * pulled exactly onto the fetched road line.
 */
window.TRIP = {
  id: "shenandoah-central-loop",
  version: 2,
  title: "Shenandoah Scenic Loop",
  subtitle: "Central District · northbound Skyline Drive · hike + overlooks + towns",
  center: [-78.38, 38.55],
  overviewBounds: [[-78.75, 37.25], [-77.30, 38.80]],
  parkBounds: [[-78.62, 38.30], [-78.15, 38.72]],
  notes: [
    "The day runs northbound: enter at Swift Run Gap (MP 65.5) and mileposts count DOWN to Thornton Gap (MP 31.5) — no backtracking.",
    "Skyline Drive speed limit is mostly 35 mph — the drive is part of the sightseeing.",
    "Entrance: $30 per private vehicle, covers everyone in the car for 7 consecutive days.",
    "Pets are not allowed on Stony Man Trail.",
    "Check Skyline Drive road status the night before — mountain conditions change fast."
  ],
  statusUrl: "https://www.nps.gov/shen/planyourvisit/conditions.htm",

  // Friends' starting points — everyone converges on the meetup stop.
  friends: [
    {
      id: "glenallen", name: "Glen Allen crew", coords: [-77.5064, 37.6660],
      toMeetup: "≈12 min to Short Pump via W Broad St / I-64 W"
    },
    {
      id: "ashland", name: "Ashland crew", coords: [-77.4797, 37.7590],
      toMeetup: "≈22 min to Short Pump via I-295 S → I-64 W"
    }
  ],
  meetupId: "meetup",

  pois: [
    {
      id: "chester", seq: 0, kind: "home", name: "Chester, VA", locked: true,
      time: "6:30 AM", window: "Depart",
      coords: [-77.4408, 37.3568], gplace: "Chester, VA",
      desc: "Home base. Leave by 6:30 AM — about 30 min to the Short Pump meetup via VA-288 N → I-64 W.",
      photo: { q: "Chester Virginia", r: 3000 }
    },
    {
      id: "meetup", seq: 10, kind: "meetup", name: "Meet up · Short Pump",
      time: "7:00 AM", window: "7:00 – 7:10 AM",
      coords: [-77.6135, 37.6510], gplace: "Short Pump Town Center, Richmond, VA",
      desc: "Everyone converges just off I-64 exit 178 (W Broad St) — easy for Chester (≈30 min via 288), Glen Allen (≈12 min), and Ashland (≈22 min via 295). Grab coffee, consolidate cars if you want, and roll out together by 7:10.",
      tips: ["Wawa & Starbucks on W Broad St for coffee + bathrooms", "From here it's ≈1h 50m to the park entrance"],
      photo: { q: "Short Pump Town Center", r: 2000 }
    },
    {
      id: "swiftrun", seq: 20, kind: "entrance", name: "Swift Run Gap Entrance", mp: "MP 65.5",
      time: "9:10 AM", window: "9:10 AM",
      coords: [-78.5427, 38.3597], snapToRoute: true,
      desc: "Enter Skyline Drive where US-33 crosses the Blue Ridge. $30/vehicle covers everyone in the car for 7 days. From here the whole day drives north — mileposts count down.",
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
      time: "10:00 AM", window: "10:00 – 10:30 AM",
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
      time: "10:45 AM", window: "10:45 AM",
      coords: [-78.3995, 38.5480], snapToRoute: true,
      desc: "Eastward view of Old Rag Mountain's famous rocky spine — the park's most iconic silhouette, no scramble required.",
      photo: { q: "Old Rag Mountain", r: 4000 },
      blog: { label: "Well & Well Traveled — central overlooks", url: "https://www.wellandwelltraveled.com/shenandoah-national-park-the-best-skyline-drive-overlooks-in-the-middle-of-the-park/" }
    },
    {
      id: "crescentrock", seq: 50, kind: "overlook", name: "Crescent Rock Overlook", mp: "MP 44.4",
      time: "11:05 AM", window: "11:05 AM",
      coords: [-78.3860, 38.5647], snapToRoute: true,
      desc: "Head-on view of Hawksbill — the park's highest peak. One of the classic photo stops.",
      photo: { q: "Crescent Rock Overlook", r: 2000 }
    },
    {
      id: "stonyman", seq: 60, kind: "hike", name: "Stony Man Trail", mp: "MP 41.7",
      time: "11:30 AM", window: "11:30 AM – 12:45 PM",
      coords: [-78.3756, 38.5931],
      desc: "The best short hike in the Central District: 1.6 mi round trip, gentle grade, ending at Shenandoah's second-highest summit (4,011 ft) with 180°+ views over the Shenandoah Valley and Massanutten.",
      tips: ["No pets on this trail (NPS rule)", "Park at the Skyland north entrance lot", "Bloggers call it the park's best view-per-effort ratio"],
      blog: { label: "Blue Ridge Awaits trail guide", url: "https://blueridgeawaits.com/stony-man-trail/" },
      photo: { q: "Stony Man Shenandoah", r: 2000 }
    },
    {
      id: "skyland", seq: 70, kind: "food", name: "Lunch at Skyland Resort", mp: "MP 42.5",
      time: "12:50 PM", window: "12:50 – 1:40 PM",
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
      time: "2:00 PM", window: "2:00 PM",
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
      time: "2:20 PM", window: "2:20 PM",
      coords: [-78.3208, 38.6614], snapToRoute: true,
      desc: "Exit onto US-211 east. Sperryville is 8 minutes downhill.",
      photo: { q: "Thornton Gap", r: 2000 }
    },
    {
      id: "sperryville", seq: 100, kind: "town", name: "Sperryville",
      time: "2:30 PM", window: "2:30 – 3:45 PM",
      coords: [-78.2270, 38.6376], gplace: "Sperryville, VA",
      desc: "The charm stop. Coffee or dessert at Before & After (riverside patio — the honeysuckle latte is the cult order), stroll the River Walk, and peek into Copper Fox Distillery or Pen Druid Brewing with Blue Ridge views.",
      tips: ["Before & After — 31 Main St, riverside seating", "River Walk starts across from Happy Camper", "Copper Fox: applewood-smoked whiskey tastings"],
      blog: { label: "Washingtonian foodie guide to Sperryville", url: "https://washingtonian.com/2022/05/26/the-foodie-travel-guide-to-sperryville-virginia-where-to-eat-drink-and-stay/" },
      photo: { q: "Sperryville Virginia", r: 2000 }
    },
    {
      id: "beforeafter", seq: 102, kind: "food", name: "Before & After Coffee",
      coords: [-78.2274, 38.6384], suggested: true,
      desc: "Riverside coffee haven on Main St — honeysuckle lattes, ginger scones, picnic boxes. The consensus 'must' in every Sperryville guide.",
      blog: { label: "Restaurant reviews & menu", url: "https://www.restaurantji.com/va/sperryville/before-and-after-/" },
      photo: { q: "Sperryville Virginia Main Street", r: 1500 }
    },
    {
      id: "copperfox", seq: 104, kind: "site", name: "Copper Fox Distillery",
      coords: [-78.2249, 38.6356], suggested: true,
      desc: "Tour + tasting of applewood-smoked single malt in a converted apple-packing plant, along the River Walk.",
      photo: { q: "Copper Fox Distillery", r: 2000 }
    },
    {
      id: "pendruid", seq: 106, kind: "food", name: "Pen Druid Brewing",
      coords: [-78.2118, 38.6321], suggested: true,
      desc: "Wild-fermented beers with widescreen Blue Ridge views just east of town — a relaxed golden-hour stop.",
      photo: { q: "Sperryville Virginia", r: 3000 }
    },
    {
      id: "luraycaverns", seq: 108, kind: "site", name: "Luray Caverns (detour)",
      coords: [-78.4839, 38.6640], gplace: "Luray Caverns, Luray, VA", suggested: true,
      desc: "The classic tourist add-on: 10-story chambers and the Great Stalacpipe Organ, with the Garden Maze outside. It's a ~25-min detour west from Thornton Gap and adds 2+ hours — swap it in instead of Sperryville if the group wants a big attraction. Downtown Luray also has the gentle 2-mile paved Hawksbill Greenway.",
      blog: { label: "Virginia Travel Tips — Luray guide", url: "https://virginiatraveltips.com/things-to-do-in-luray-va/" },
      photo: { q: "Luray Caverns", r: 3000 }
    },
    {
      id: "culpeper", seq: 110, kind: "dinner", name: "Dinner in Culpeper",
      time: "4:15 PM", window: "4:15 – 6:15 PM",
      coords: [-77.9958, 38.4730], gplace: "Culpeper, VA",
      desc: "Proper dinner on historic Davis Street: Grass Rootes (basement pub, live music), Piedmont Steakhouse (1890s brick building), It's About Thyme (European), or Pinto Thai. Walk the downtown block after.",
      tips: ["Grass Rootes & Piedmont Steakhouse are the local picks", "Sweet Roux next door for casual American"],
      blog: { label: "Culpeper downtown dining guide", url: "https://culpeperdowntown.com/dine/" },
      photo: { q: "Culpeper Virginia downtown", r: 2000 }
    },
    {
      id: "home", seq: 120, kind: "home", name: "Home (drop-offs on the way)", locked: true,
      time: "~7:45 PM", window: "Evening",
      coords: [-77.4408, 37.3568], gplace: "Chester, VA",
      desc: "About 75 minutes from Culpeper via US-522 → I-64 E. Ashland and Glen Allen friends peel off at I-295 / Short Pump; Chester continues down VA-288.",
      photo: { q: "Virginia Piedmont", r: 5000 }
    }
  ],

  defaultItinerary: [
    "chester", "meetup", "swiftrun", "bigmeadows", "oldragview", "crescentrock",
    "stonyman", "skyland", "jewellhollow", "thorntongap", "sperryville",
    "culpeper", "home"
  ],

  sources: [
    { label: "NPS — Shenandoah conditions & fees", url: "https://www.nps.gov/shen/planyourvisit/conditions.htm" },
    { label: "Blue Ridge Awaits — Stony Man Trail", url: "https://blueridgeawaits.com/stony-man-trail/" },
    { label: "Adventure Planning Queen — Stony Man guide", url: "https://adventureplanningqueen.com/stony-man-trail-shenandoah/" },
    { label: "The National Parks Experience — 20 best overlooks", url: "https://www.travel-experience-live.com/best-overlooks-views-in-shenandoah-national-park/" },
    { label: "Well & Well Traveled — central district overlooks", url: "https://www.wellandwelltraveled.com/shenandoah-national-park-the-best-skyline-drive-overlooks-in-the-middle-of-the-park/" },
    { label: "Parks Collecting — 25 best Skyline Drive overlooks", url: "https://parkscollecting.com/best-overlooks-on-skyline-drive/" },
    { label: "Washingtonian — Sperryville foodie guide", url: "https://washingtonian.com/2022/05/26/the-foodie-travel-guide-to-sperryville-virginia-where-to-eat-drink-and-stay/" },
    { label: "Enriching Pursuits — Sperryville like a local", url: "https://enrichingpursuits.com/things-to-do-in-sperryville-va/" },
    { label: "Culpeper Renaissance — downtown dining", url: "https://culpeperdowntown.com/dine/" },
    { label: "Virginia Travel Tips — Luray beyond the caverns", url: "https://virginiatraveltips.com/things-to-do-in-luray-va/" }
  ]
};
