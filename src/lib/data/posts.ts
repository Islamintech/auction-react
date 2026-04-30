import { Post } from "../types/post";

export const POSTS: Post[] = [
  {
    id: "p-2026-04-22-gv80",
    category: "BUYER STORY",
    title: "My GV80 arrived in 19 days. Here's the timeline.",
    excerpt:
      "Day-by-day from auction win in Incheon to handover in Tashkent — paperwork, shipping, customs, plates.",
    body:
      "I bid on a 2022 Genesis GV80 3.5T on a Tuesday afternoon. Inspection report flagged a minor curb-rash on the rear-right alloy — everything else was 4.5 grade. By Wednesday morning the dealer in Pyeongtaek had the car under our export name.\n\nDay 4: container booked out of Busan. Day 9: vessel departed. Day 14: arrived Bandar Abbas; transfer to rail. Day 18: customs cleared in Tashkent (we handle the HS-code paperwork in advance, so this part is fast). Day 19: the car was on my driveway with all 4 keys, the original Korean service book, and a fresh inspection sticker.\n\nThe one thing I'd do differently: pay for the optional paint-correction add-on at the Korean side. It's $180 and saves a trip to a detailer here.",
    author: "Aziz K.",
    date: "2026-04-22",
    replies: 34,
    image: "suv-a",
    featured: true,
  },
  {
    id: "p-2026-04-19-grades",
    category: "GUIDE",
    title: "Decoding Korean auction grades: 3.5 vs 4 vs 4.5",
    excerpt:
      "What the inspector's letter-grade really means, and which grade is the sweet spot for export buyers.",
    body:
      "Every car at a Korean auction is graded by an independent inspector on a 0–5 scale, plus a letter for the interior. The scale is harsher than what most North-American or European buyers are used to.\n\n4.5 is showroom-fresh: under 30,000 km, no panel work, no smoke. 4 is the working buyer's grade — minor stone chips, light wear. 3.5 starts to include accident-repair history, but often only cosmetic. Below 3.5 you're looking at structural repair work, and that's where our crashed-with-parts inventory comes from.\n\nFor export, 4 is usually the right balance of price and post-arrival surprises.",
    author: "Editorial",
    date: "2026-04-19",
    replies: 18,
    image: "sedan-c",
  },
  {
    id: "p-2026-04-17-ev-duty",
    category: "MARKET",
    title: "EV import duties dropped 6% — what changes for you",
    excerpt:
      "The new tariff schedule takes effect May 1. We ran the numbers on three popular EV models.",
    body:
      "The Customs Committee published the revised tariff schedule last week. For EVs under 200 kW, the landed-cost saving on a typical Ioniq 6 is roughly $1,400. On an EV6 GT it's closer to $2,100.\n\nThe catch: the new rate only applies to vehicles cleared after May 1. If your container is already on the water but won't clear before then, you can request a hold at the bonded warehouse for up to 14 days — usually worth it.",
    author: "Logistics desk",
    date: "2026-04-17",
    replies: 52,
    image: "sedan-b",
  },
  {
    id: "p-2026-04-14-palisade",
    category: "INSPECTION",
    title: "How we caught a re-sprayed Palisade before sale",
    excerpt:
      "Paint thickness gauge on every panel, every time. Here's what the readings looked like.",
    body:
      "The seller listed the car as accident-free. Our inspector ran the paint-depth gauge on all 14 measurable panels. Twelve came in at 95–115 microns (factory). The right rear quarter and the trunk lid both read 240+ microns. That's a respray, full stop.\n\nWe pulled the car from sale, refunded the deposit holders, and the seller is now flagged in our dealer database.",
    author: "Inspector Lee",
    date: "2026-04-14",
    replies: 27,
    image: "suv-c",
  },
  {
    id: "p-2026-04-08-shipping-lanes",
    category: "ANNOUNCEMENT",
    title: "New direct lane: Busan → Aktau, 11 days",
    excerpt:
      "We've signed a quarterly slot agreement that cuts 4 days off the Caspian route.",
    body:
      "Starting this month we're moving the Kazakhstan-bound containers through a direct Busan → Aktau lane instead of the usual Bandar Abbas transshipment. Expect 11–13 days door-to-port versus the previous 15–17.\n\nPricing is unchanged — we absorbed the lane premium for the first quarter as a buyer benefit.",
    author: "Logistics desk",
    date: "2026-04-08",
    replies: 9,
    image: "van-a",
  },
  {
    id: "p-2026-04-02-q1-recap",
    category: "MARKET",
    title: "Q1 2026 recap: what sold, what stalled",
    excerpt:
      "Hybrids up 22%, large SUVs flat, and one surprise winner in the crashed-parts category.",
    body:
      "Hybrid sedans had a strong quarter — Sonata Hybrid and K5 Hybrid both moved in under 6 days on average. Large SUV demand was flat year-over-year despite the segment growing globally; we suspect EV substitution.\n\nThe surprise: crashed Genesis G70s outsold the ready-to-drive variants 3:1, with parts kits going to body shops in Almaty and Tashkent.",
    author: "Editorial",
    date: "2026-04-02",
    replies: 14,
    image: "sedan-a",
  },
];
