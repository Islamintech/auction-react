import React from "react";
import Tag from "./Tag";
import { AuctionCar } from "../../../lib/types/landing";

export type TabKey = "specs" | "damage" | "parts" | "delivery" | "paperwork";

const formatPartPrice = (price: string | number) =>
  typeof price === "number" ? `$${price.toLocaleString()}` : price;

export default function TabContent({ tab, car }: { tab: TabKey; car: AuctionCar }) {
  const isCrashed = car.category === "crashed";
  const damaged = car.damagedParts || [];

  if (tab === "specs") {
    const rows: [string, string | number][] = [
      ["Brand", car.brand],
      ["Year", car.year],
      ["Mileage", `${(car.km ?? 0).toLocaleString()} km`],
      ["Color", car.color || "—"],
      ["Status", car.status],
      ["Body type", isCrashed ? "Damaged · runs" : "—"],
      ["Inspection grade", isCrashed ? "Damaged · graded R3" : "4.5 / 5"],
    ];
    return (
      <div className="cd-specs">
        {rows.map(([k, v]) => (
          <div key={k} className="cd-specs__row">
            <span className="cd-specs__k">{k}</span>
            <span className="cd-specs__v">{v}</span>
          </div>
        ))}
      </div>
    );
  }

  if (tab === "damage") {
    return (
      <div>
        {damaged.length > 0 ? (
          <ul className="cd-damage-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {damaged.map((d, i) => (
              <li key={i} style={{ padding: "10px 0", borderBottom: "1px solid var(--rule)", display: "flex", justifyContent: "space-between" }}>
                <span>● {d.name}</span>
                <span style={{ opacity: 0.7 }}>{formatPartPrice(d.price)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ opacity: 0.7 }}>No damage reported.</div>
        )}
        <p className="cd-damage-note" style={{ marginTop: 16 }}>
          {isCrashed
            ? `Damaged vehicle, sold as-is. All required replacement parts ship in the same container.`
            : `Frame measurements pass standard tolerance. CarHistory report (KR) shows zero accident records.`}
        </p>
      </div>
    );
  }

  if (tab === "parts" && isCrashed) {
    return (
      <div>
        <div className="cd-parts-head">
          <div>
            <div className="cd-parts-head__label">PARTS INCLUDED · SHIPS WITH CAR</div>
            <div className="cd-parts-head__title">{damaged.length} replacement parts</div>
          </div>
        </div>
        {damaged.length > 0 ? (
          <div className="cd-parts-table">
            <div className="cd-parts-table__head">
              <span>PART</span><span>OEM #</span><span>VALUE</span><span>STATUS</span>
            </div>
            {damaged.map((p, i) => (
              <div key={i} className={`cd-parts-table__row${i === 0 ? " cd-parts-table__row--first" : ""}`}>
                <span className="cd-parts-table__name">{p.name}</span>
                <span className="cd-parts-table__oem">{p.oem || "—"}</span>
                <span className="cd-parts-table__price">{formatPartPrice(p.price)}</span>
                <Tag outline color={p.ship === false ? "var(--warn)" : "var(--ok)"}>
                  {p.ship === false ? "PENDING" : "✓ READY"}
                </Tag>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ opacity: 0.7, padding: 20 }}>No parts listed.</div>
        )}
      </div>
    );
  }

  if (tab === "delivery") {
    const steps = ["Reserved", "Inspected", "Loaded", "In transit", "Delivered"];
    const cities: [string, string, string][] = [
      ["Tashkent", "21 days", "$1,240"],
      ["Almaty", "24 days", "$1,380"],
      ["Tbilisi", "29 days", "$1,720"],
    ];
    return (
      <div>
        <div className="cd-deliv-timeline">
          {steps.map((step, i) => {
            const done = i < 2;
            return (
              <div key={step} className="cd-deliv-step">
                <div className={`cd-deliv-step__bar${done ? " cd-deliv-step__bar--done" : ""}`} />
                <div className={`cd-deliv-step__dot${done ? " cd-deliv-step__dot--done" : ""}`} />
                <div className="cd-deliv-step__label">{step}</div>
              </div>
            );
          })}
        </div>
        <div className="cd-deliv-cards">
          {cities.map(([city, days, p]) => (
            <div key={city} className="cd-deliv-card">
              <div className="cd-deliv-card__city">{city}</div>
              <div className="cd-deliv-card__sub">{days.toUpperCase()} · {p}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === "paperwork") {
    const docs: [string, "verified" | "pending" | "optional"][] = [
      ["Vehicle title (KR)", "verified"],
      ["Export license", "verified"],
      ["Bill of lading", "pending"],
      ["Customs declaration", "pending"],
      ["Marine insurance certificate", "verified"],
      ["Buyer ID verification", "optional"],
    ];
    const colorOf = (s: string) =>
      s === "verified" ? "var(--ok)" : s === "pending" ? "var(--warn)" : "var(--text-mute)";
    return (
      <div className="cd-paper">
        {docs.map(([d, s], i) => (
          <div key={d} className={`cd-paper__row${i === 0 ? " cd-paper__row--first" : ""}`}>
            <span className="cd-paper__label">{d}</span>
            <Tag outline color={colorOf(s)}>{s}</Tag>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
