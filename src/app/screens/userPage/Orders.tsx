import React from "react";
import CarPlaceholder from "../landingPage/CarPlaceholder";
import Tag from "./Tag";

const ROWS: [string, string, string, string, string, string][] = [
  ["#0418", "Genesis GV80 Coupe 3.5T", "Apr 18, 2026", "$63,100", "In transit", "suv-a"],
  ["#0312", "Hyundai Sonata DN8 N-Line", "Mar 12, 2026", "$31,400", "Delivered", "sedan-c"],
  ["#0228", "Kia EV6 GT-Line", "Feb 28, 2026", "$42,800", "Delivered", "sedan-b"],
  ["#0117", "Genesis G70 3.3T Sport", "Jan 17, 2026", "$38,900", "Delivered", "sedan-a"],
];

export default function Orders() {
  return (
    <div className="mp-orders">
      {ROWS.map(([num, model, date, amt, status, img], i) => (
        <div key={num} className={`mp-orders__row${i === 0 ? " mp-orders__row--first" : ""}`}>
          <span className="mp-orders__num">{num}</span>
          <CarPlaceholder label={num.replace("#", "")} tone={img} height={48} />
          <span className="mp-orders__model">{model}</span>
          <span className="mp-orders__date">{date}</span>
          <span className="mp-orders__amt">{amt}</span>
          <Tag outline color={status === "Delivered" ? "var(--ok)" : "var(--warn)"}>
            {status}
          </Tag>
          <button className="mp-btn mp-btn--secondary mp-btn--sm">Invoice</button>
        </div>
      ))}
    </div>
  );
}
