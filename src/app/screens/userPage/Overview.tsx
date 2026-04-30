import React from "react";
import SectionHeader from "../landingPage/SectionHeader";
import CarPlaceholder from "../landingPage/CarPlaceholder";

const STATS: [string, string, string][] = [
  ["$24,800", "WALLET BALANCE", "var(--accent)"],
  ["2", "IN TRANSIT", "var(--warn)"],
  ["1", "AT KR PORT", "var(--text)"],
  ["7", "CARS DELIVERED", "var(--ok)"],
];

const TIMELINE: [string, string][] = [
  ["Reserved", "Apr 18"],
  ["Inspected", "Apr 20"],
  ["Loaded", "Apr 24"],
  ["In transit", "today"],
  ["Delivered", "—"],
];

const ACTIVITY: [string, string, string][] = [
  ["RESERVED", "You reserved K5 GT-Line (crashed) · 8 parts", "2h ago"],
  ["SHIPMENT", "GV80 cleared Busan customs", "4h ago"],
  ["SAVE", "You saved Palisade Calligraphy", "yesterday"],
  ["DEPOSIT", "Deposit added $5,000", "Apr 25"],
  ["DELIVERED", "Sonata DN8 delivered to Tashkent", "Apr 22"],
];

const CURRENT_STAGE = 3;

export default function Overview() {
  return (
    <>
      <div className="mypage__stats">
        {STATS.map(([n, l, c]) => (
          <div key={l} className="mypage__stat">
            <div className="mypage__stat-num" style={{ color: c }}>{n}</div>
            <div className="mypage__stat-label">{l}</div>
          </div>
        ))}
      </div>

      <div className="mypage__overview">
        <div>
          <SectionHeader number="01" title="In transit" subtitle="Tracking your most recent purchase." />
          <div className="mp-transit">
            <div className="mp-transit__head">
              <CarPlaceholder label="GV80 · 24" tone="suv-a" height={120} />
              <div>
                <div className="mp-transit__id">#GV80-BUSAN-0418 · CONTAINER MSCU 481039-7</div>
                <div className="mp-transit__title">Genesis GV80 Coupe 3.5T</div>
                <div className="mp-transit__sub">Reserved Apr 18 · $63,100 · ETA Tashkent May 9</div>
                <div className="mp-transit__loc">🚢 MV NORDIC ORION · Sea of Japan, 38° 41′ N · 7.2 kn</div>
              </div>
            </div>
            <div className="mp-timeline">
              {TIMELINE.map(([s, d], i) => {
                const done = i < CURRENT_STAGE;
                return (
                  <div key={s} className="mp-timeline__step">
                    <div className={`mp-timeline__bar${done ? " mp-timeline__bar--done" : ""}`} />
                    <div className={`mp-timeline__dot${done ? " mp-timeline__dot--done" : ""}`} />
                    <div className="mp-timeline__label mp-timeline__label--done">{s}</div>
                    <div className="mp-timeline__date">{d}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <SectionHeader number="02" title="Activity" subtitle="Last 7 days." />
          <div className="mp-activity">
            {ACTIVITY.map(([k, msg, time], i) => {
              const kindCls =
                k === "SHIPMENT" ? " mp-activity__kind--shipment"
                : k === "DELIVERED" ? " mp-activity__kind--delivered"
                : "";
              return (
                <div key={i} className={`mp-activity__row${i === 0 ? " mp-activity__row--first" : ""}`}>
                  <span className={`mp-activity__kind${kindCls}`}>{k}</span>
                  <span className="mp-activity__msg">{msg}</span>
                  <span className="mp-activity__time">{time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
