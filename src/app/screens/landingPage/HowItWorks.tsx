import React from "react";
import SectionHeader from "./SectionHeader";

const STEPS: [string, string][] = [
  ["Browse & inspect", "Real-time inventory from 14 licensed Korean dealers. 240-point inspection on every ready car, full damage report on every crashed one."],
  ["Buy at fixed price", "No bidding wars. The price you see is the price you pay. 5% deposit reserves the car instantly."],
  ["We export", "KR customs, marine insurance, and shipping. Crashed cars travel with their replacement parts in the same container."],
  ["Door delivery", "Local customs handled. Door delivery in Tashkent, Almaty, Bishkek, Tbilisi & 34 more cities."],
];

export default function HowItWorks() {
  return (
    <section className="landing__section--tight">
      <SectionHeader
        number="02"
        title="How it works"
        subtitle="Buy in Seoul. Drive (or rebuild) in Tashkent. We handle everything between."
      />
      <div className="landing__steps">
        {STEPS.map(([title, body], i) => (
          <div key={title} className="landing__step">
            <div className="landing__step-num">STEP 0{i + 1}</div>
            <h3 className="landing__step-title">{title}</h3>
            <p className="landing__step-body">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
