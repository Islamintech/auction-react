import React from "react";
import LiveDot from "./LiveDot";
import CarPlaceholder from "./CarPlaceholder";
import { AuctionCar } from "../../../lib/types/landing";
import { t } from "./strings";

interface Props {
  crashed: AuctionCar[];
  onBrowseCars: () => void;
  onOpenCar: (car: AuctionCar) => void;
}

export default function Hero({ crashed, onBrowseCars, onOpenCar }: Props) {
  return (
    <section className="landing__hero">
      <div className="landing__hero-bg">
        <CarPlaceholder label="HERO" tone="sedan-a" height="100%" />
      </div>
      <div className="landing__hero-overlay" />

      <div className="landing__hero-grid">
        <div>
          <div className="landing__eyebrow">
            <LiveDot size={6} /> {t.hero.eyebrow}
          </div>
          <h1 className="landing__headline">{t.hero.headline}</h1>
          <p className="landing__subtitle">{t.hero.subtitle}</p>
          <div className="landing__cta-row">
            <button className="landing-btn landing-btn--primary landing-btn--lg" onClick={onBrowseCars}>
              {t.hero.cta1} →
            </button>
            <button className="landing-btn landing-btn--secondary landing-btn--lg" onClick={onBrowseCars}>
              ▶ {t.hero.cta2}
            </button>
          </div>
        </div>

        <div className="landing__crashed-panel">
          <div className="landing__crashed-head">
            <div className="landing__crashed-head-left">
              <span className="landing__warn-dot" />
              <span className="landing__crashed-label">{t.sections.crashed}</span>
            </div>
            <span className="landing__crashed-count">{crashed.length} LISTED</span>
          </div>

          {crashed.slice(0, 3).map((c, i) => {
            const partsTotal = c.parts ? c.parts.reduce((s, p) => s + p.price, 0) : 0;
            return (
              <div
                key={c.id}
                onClick={() => onOpenCar(c)}
                className={`landing__crashed-row${i === 0 ? " landing__crashed-row--first" : ""}`}
              >
                <div style={{ minWidth: 0 }}>
                  <div className="landing__crashed-meta">
                    #{c.id} · {(c.damage || "").toUpperCase()}
                  </div>
                  <div className="landing__crashed-name">
                    {c.year} {c.model}
                  </div>
                  <div className="landing__crashed-parts">
                    {c.parts?.length ?? 0} parts incl. · +${partsTotal.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="landing__crashed-price">${c.price.toLocaleString()}</div>
                  <div className="landing__crashed-tag">WITH PARTS</div>
                </div>
              </div>
            );
          })}

          <button className="landing__crashed-cta" onClick={onBrowseCars}>
            BROWSE ALL CRASHED →
          </button>
        </div>
      </div>

      <div className="landing__stats">
        {[
          ["2,847", "CARS LISTED"],
          ["38", "COUNTRIES SHIPPED"],
          ["~21d", "AVG SEOUL → TASHKENT"],
          ["98.4%", "BUYER SATISFACTION"],
        ].map(([n, l]) => (
          <div key={l} className="landing__stat">
            <div className="landing__stat-num">{n}</div>
            <div className="landing__stat-label">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
