import React from "react";
import { AuctionCar } from "../../../lib/types/landing";
import { t } from "./strings";
import { useGlobals } from "../../hooks/useGlobals";

interface Props {
  crashed: AuctionCar[];
  onBrowseCars: () => void;
  onOpenCar: (car: AuctionCar) => void;
}

export default function Hero({ crashed, onBrowseCars, onOpenCar }: Props) {
  const { authMember, openSignup } = useGlobals();
  return (
    <section className="landing__hero">
      <div className="landing__hero-bg">
        <video
          className="landing__hero-video"
          src="/video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </div>
      <div className="landing__hero-overlay" />

      <div className="landing__hero-grid">
        <div>
          <h1 className="landing__headline">{t.hero.headline}</h1>
          <div className="landing__cta-row">
            {authMember ? (
              <button className="landing-btn landing-btn--primary landing-btn--lg" onClick={onBrowseCars}>
                Browse cars →
              </button>
            ) : (
              <button className="landing-btn landing-btn--primary landing-btn--lg" onClick={openSignup}>
                Sign up →
              </button>
            )}
          </div>
        </div>

      </div>

      <div className="landing__stats">
        {[
          ["1,200+", "CARS DELIVERED"],
          ["3", "SOURCING CHANNELS"],
          ["45–60d", "KOREA → UZBEKISTAN"],
          ["96%", "REPEAT BUYERS"],
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
