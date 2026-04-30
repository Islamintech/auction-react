import React from "react";
import SectionHeader from "./SectionHeader";
import { t } from "./strings";

const ROWS: [string, string, number, number][] = [
  ["Aziz K.", "Tashkent", 14, 412300],
  ["Бекжан А.", "Almaty", 11, 358900],
  ["Daniel P.", "Tbilisi", 9, 287400],
  ["김민수", "Seoul", 8, 244100],
  ["Otabek R.", "Samarkand", 6, 188000],
];

export default function Leaderboard() {
  return (
    <div>
      <SectionHeader number="03" title={t.sections.leaderboard} subtitle="Most active buyers this month." />
      <div className="landing-lb">
        {ROWS.map(([name, city, cnt, vol], i) => (
          <div key={name} className={`landing-lb__row${i === 0 ? " landing-lb__row--first" : ""}`}>
            <span className={`landing-lb__rank${i < 3 ? " landing-lb__rank--top" : ""}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="landing-lb__name">{name}</div>
              <div className="landing-lb__city">{city.toUpperCase()}</div>
            </div>
            <div className="landing-lb__count">{cnt} cars</div>
            <div className="landing-lb__vol">${vol.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
