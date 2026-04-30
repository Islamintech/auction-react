import React from "react";
import Tag from "./Tag";
import { AuctionCar } from "../../../lib/types/landing";

export type TabKey = "specs" | "damage" | "parts" | "delivery" | "paperwork";

function damageStatus(damage: string | undefined, side: "front" | "rear" | "left" | "right") {
  const d = (damage || "").toLowerCase();
  if (d.includes(side)) return "damaged";
  if (side === "left" && d.includes("side")) return "minor";
  if (side === "right" && d.includes("side")) return "minor";
  return "clean";
}

export default function TabContent({ tab, car, partsTotal }: { tab: TabKey; car: AuctionCar; partsTotal: number }) {
  const isCrashed = car.category === "crashed";

  if (tab === "specs") {
    const rows: [string, string | number][] = [
      ["Year", car.year],
      ["Mileage", `${(car.km ?? 0).toLocaleString()} km`],
      ["Fuel", car.fuel ?? "—"],
      ["Transmission", car.trans ?? "—"],
      ["Color", car.color ?? "—"],
      ["Body type", isCrashed ? "Damaged · runs" : "Sedan"],
      ["Engine", "3.5L V6 Twin-Turbo"],
      ["Power", "375 hp / 391 lb·ft"],
      ["Drive", "AWD"],
      ["Seats", "5"],
      ["VIN", "KMHL34J••••••42718"],
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
    const sides: ["front" | "rear" | "left" | "right", string][] = [
      ["front", "Front"],
      ["rear", "Rear"],
      ["left", "Left side"],
      ["right", "Right side"],
    ];
    return (
      <div>
        <div className="cd-damage-grid">
          {sides.map(([s, label]) => {
            const status = isCrashed ? damageStatus(car.damage, s) : s === "right" ? "minor" : "clean";
            return (
              <div key={s} className="cd-damage-cell">
                <div className="cd-damage-cell__label">{label.toUpperCase()}</div>
                <div className={`cd-damage-cell__status cd-status--${status}`}>
                  ● {status === "clean" ? "Clean" : status === "damaged" ? "Damaged" : "Minor"}
                </div>
              </div>
            );
          })}
        </div>
        <p className="cd-damage-note">
          {isCrashed
            ? `${car.damageDesc || "Damaged vehicle, sold as-is."} All required replacement parts ship in the same container, sourced from licensed Korean breakers and OEM channels.`
            : `Right rear quarter panel: 0.18mm above factory paint thickness — consistent with quality respray, no underlying repair. Frame measurements pass standard tolerance. CarHistory report (KR) shows zero accident records.`}
        </p>
      </div>
    );
  }

  if (tab === "parts" && isCrashed && car.parts) {
    return (
      <div>
        <div className="cd-parts-head">
          <div>
            <div className="cd-parts-head__label">PARTS INCLUDED · SHIPS WITH CAR</div>
            <div className="cd-parts-head__title">{car.parts.length} replacement parts</div>
          </div>
          <div>
            <div className="cd-parts-head__label" style={{ textAlign: "right" }}>PARTS VALUE</div>
            <div className="cd-parts-head__total">${partsTotal.toLocaleString()}</div>
          </div>
        </div>
        <div className="cd-parts-table">
          <div className="cd-parts-table__head">
            <span>PART</span><span>OEM #</span><span>VALUE</span><span>STATUS</span>
          </div>
          {car.parts.map((p, i) => (
            <div key={p.oem || p.name} className={`cd-parts-table__row${i === 0 ? " cd-parts-table__row--first" : ""}`}>
              <span className="cd-parts-table__name">{p.name}</span>
              <span className="cd-parts-table__oem">{p.oem || "—"}</span>
              <span className="cd-parts-table__price">${p.price}</span>
              <Tag outline color={p.ship ? "var(--ok)" : "var(--warn)"}>
                {p.ship ? "✓ READY" : "PENDING"}
              </Tag>
            </div>
          ))}
        </div>
        <p className="cd-parts-note">
          Parts are crated separately and loaded with the car in the same 40HC container. Customs declaration lists each part by OEM number.
        </p>
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
