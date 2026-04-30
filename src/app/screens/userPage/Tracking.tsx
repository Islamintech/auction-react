import React from "react";
import CarPlaceholder from "../landingPage/CarPlaceholder";
import Tag from "./Tag";

interface Shipment {
  id: string;
  model: string;
  img: string;
  stage: number;
  eta: string;
  vessel: string;
  loc: string;
  kn: number;
  container: string;
  amt: string;
  cat: "ready" | "crashed";
  parts: number;
}

const SHIPMENTS: Shipment[] = [
  { id: "GV80-BUSAN-0418", model: "Genesis GV80 Coupe 3.5T", img: "suv-a", stage: 3, eta: "May 9", vessel: "MV NORDIC ORION", loc: "Sea of Japan", kn: 7.2, container: "MSCU 481039-7", amt: "$63,100", cat: "ready", parts: 0 },
  { id: "KG5X-DAEGU-0422", model: "Kia K5 GT-Line 2.5T (crashed)", img: "sedan-c", stage: 1, eta: "May 16", vessel: "—", loc: "Daegu inspection bay", kn: 0, container: "pending", amt: "$14,800 + 8 parts", cat: "crashed", parts: 8 },
  { id: "IO6-INCHEON-0425", model: "Hyundai Ioniq 6 LR", img: "sedan-b", stage: 0, eta: "May 19", vessel: "—", loc: "Incheon dealer holding", kn: 0, container: "pending", amt: "$46,200", cat: "ready", parts: 0 },
];

const STEPS = ["Reserved", "Inspected", "Loaded", "In transit", "Delivered"];

export default function Tracking() {
  return (
    <div>
      <div className="mp-section-note">
        2 SHIPMENTS IN TRANSIT · 1 AT KOREAN PORT · LIVE GPS
      </div>
      {SHIPMENTS.map((s) => (
        <div key={s.id} className="mp-track-card">
          <div className="mp-track-card__head">
            <CarPlaceholder label={s.id.split("-")[0]} tone={s.img} height={110} />
            <div>
              <div className="mp-track-card__tagrow">
                {s.cat === "crashed" && <Tag color="var(--warn)">CRASHED + {s.parts} PARTS</Tag>}
                <span className="mp-track-card__id">#{s.id}</span>
              </div>
              <div className="mp-track-card__title">{s.model}</div>
              <div className="mp-track-card__sub">
                {s.amt} · ETA Tashkent {s.eta} · Container {s.container}
              </div>
              <div className="mp-track-card__loc">
                🚢 {s.vessel === "—" ? s.loc : `${s.vessel} · ${s.loc} · ${s.kn} kn`}
              </div>
            </div>
            <div className="mp-track-card__cta">
              <button className="mp-btn mp-btn--secondary mp-btn--sm">Live map</button>
              <button className="mp-btn mp-btn--secondary mp-btn--sm">Documents</button>
              <button className="mp-btn mp-btn--secondary mp-btn--sm">Contact agent</button>
            </div>
          </div>
          <div className="mp-timeline">
            {STEPS.map((label, i) => {
              const done = i <= s.stage;
              const active = i === s.stage;
              const labelCls = active ? "mp-timeline__label--active" : done ? "mp-timeline__label--done" : "";
              return (
                <div key={label} className="mp-timeline__step">
                  <div className={`mp-timeline__bar${i < s.stage ? " mp-timeline__bar--done" : ""}`} />
                  <div className={`mp-timeline__dot${done ? " mp-timeline__dot--done" : ""}`} />
                  <div className={`mp-timeline__label ${labelCls}`}>{label}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
