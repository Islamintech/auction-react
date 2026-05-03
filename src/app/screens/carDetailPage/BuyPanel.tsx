import React, { useState } from "react";
import Tag from "./Tag";
import { AuctionCar } from "../../../lib/types/landing";
import ConsultationModal from "../../components/consultation/ConsultationModal";

export default function BuyPanel({ car }: { car: AuctionCar }) {
  const [consultOpen, setConsultOpen] = useState(false);
  const isCrashed = car.category === "crashed";
  const partsCount = car.damagedParts?.length ?? 0;
  const fee = Math.round(car.price * 0.045);
  const total = car.price + fee + 480 + 760 + 2150;

  const breakdown: [string, number][] = [
    [`Vehicle${isCrashed && partsCount ? " + parts" : ""}`, car.price],
    ["Buyer fee (4.5%)", fee],
    ["KR export", 480],
    ["Marine + insurance", 760],
    ["UZ customs (est.)", 2150],
  ];

  return (
    <aside className="cd-aside">
      <div className="cd-buy">
        <div className="cd-buy__tags">
          {isCrashed ? (
            <>
              <Tag color="var(--warn)">● CRASHED</Tag>
              {partsCount > 0 && <Tag outline color="var(--warn)">PARTS INCLUDED</Tag>}
            </>
          ) : (
            <Tag outline color="var(--text)">READY TO DRIVE</Tag>
          )}
        </div>
        <div className="cd-buy__label">{isCrashed && partsCount ? "CAR + PARTS · FIXED PRICE" : "FIXED PRICE"}</div>
        <div className="cd-buy__price">${car.price.toLocaleString()}</div>

        {isCrashed && partsCount > 0 && (
          <div className="cd-buy__breakdown">
            Vehicle <b>${car.price.toLocaleString()}</b><br />
            + <b>{partsCount} replacement parts</b> <em>included</em>
          </div>
        )}

        <button className="cd-btn cd-btn--primary cd-btn--lg" style={{ marginTop: 18 }}>
          Reserve with $2,500 deposit
        </button>
        <button
          className="cd-btn cd-btn--secondary cd-btn--md"
          style={{ marginTop: 8 }}
          onClick={() => setConsultOpen(true)}
        >
          Request consultation
        </button>

        <div className="cd-cost">
          <div className="cd-cost__label">ESTIMATED LANDED COST · TASHKENT</div>
          {breakdown.map(([l, v]) => (
            <div key={l} className="cd-cost__row">
              <span>{l}</span>
              <b>${v.toLocaleString()}</b>
            </div>
          ))}
          <div className="cd-cost__total">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <ConsultationModal
        open={consultOpen}
        onClose={() => setConsultOpen(false)}
        carId={car.id}
        carTitle={`${car.brand} ${car.title}`}
      />

      <div className="cd-trust">
        <div className="cd-trust__grid">
          {[
            ["🛡", "Buyer protection"],
            ["⚓", "Lloyds insured"],
            ["🛂", "Customs cleared"],
          ].map(([ico, l]) => (
            <div key={l} className="cd-trust__cell">
              <div className="cd-trust__icon">{ico}</div>
              <div className="cd-trust__label">{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
