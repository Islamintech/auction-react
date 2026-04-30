import React from "react";
import SectionHeader from "./SectionHeader";
import CarPlaceholder from "./CarPlaceholder";
import { t } from "./strings";

const POSTS = [
  { tag: "BUYER STORY", title: "My GV80 arrived in 19 days. Here's the timeline.", author: "Aziz K.", date: "Apr 22", replies: 34, image: "suv-a" },
  { tag: "GUIDE", title: "Decoding Korean auction grades: 3.5 vs 4 vs 4.5", author: "Editorial", date: "Apr 19", replies: 18, image: "sedan-c" },
  { tag: "Q&A", title: "EV import duties dropped 6% — what changes for you", author: "Logistics desk", date: "Apr 17", replies: 52, image: "sedan-b" },
  { tag: "INSPECTION", title: "How we caught a re-sprayed Palisade before sale", author: "Inspector Lee", date: "Apr 14", replies: 27, image: "suv-c" },
];

export default function CommunityGrid({ onOpen }: { onOpen: () => void }) {
  return (
    <div>
      <SectionHeader
        number="04"
        title={t.sections.community}
        subtitle="Stories from buyers and sellers."
        link="All posts →"
        onLink={onOpen}
      />
      <div className="landing-comm">
        {POSTS.map((p) => (
          <div key={p.title} className="landing-comm__card" onClick={onOpen}>
            <CarPlaceholder label={p.tag} tone={p.image} height={120} />
            <div className="landing-comm__body">
              <div className="landing-comm__tag">{p.tag}</div>
              <div className="landing-comm__title">{p.title}</div>
              <div className="landing-comm__meta">
                <span>
                  {p.author.toUpperCase()} · {p.date.toUpperCase()}
                </span>
                <span>{p.replies} replies</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
