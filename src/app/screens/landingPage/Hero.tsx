import React, { useEffect, useRef, useState } from "react";
import { AuctionCar } from "../../../lib/types/landing";
import { useTranslation } from "react-i18next";
import { useGlobals } from "../../hooks/useGlobals";

interface Props {
  crashed: AuctionCar[];
  onBrowseCars: () => void;
  onOpenCar: (car: AuctionCar) => void;
}

export default function Hero({ crashed, onBrowseCars, onOpenCar }: Props) {
  const { authMember, openSignup } = useGlobals();
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true; // React doesn't reliably set the muted property; browsers require it for autoplay
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="landing__hero">
      <div className="landing__hero-bg">
        <video
          ref={videoRef}
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
          <h1 className="landing__headline">{t("hero.headline")}</h1>
          <div className="landing__cta-row">
            {authMember ? (
              <button className="landing-btn landing-btn--primary landing-btn--lg" onClick={onBrowseCars}>
                {t("hero.browse")} →
              </button>
            ) : (
              <button className="landing-btn landing-btn--primary landing-btn--lg" onClick={openSignup}>
                {t("hero.signup")} →
              </button>
            )}
          </div>
        </div>

        <div
          className={`landing__scroll${scrolled ? " landing__scroll--hidden" : ""}`}
          aria-hidden="true"
          onClick={() =>
            window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" })
          }
        >
          <span className="landing__scroll-label">{t("hero.scroll")}</span>
          <span className="landing__scroll-arrow" />
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
