import React from "react";
import { t } from "./strings";
import { useGlobals } from "../../hooks/useGlobals";

interface Props {
  onSignup: () => void;
  onConsultation?: () => void;
}

export default function BigCTA({ onSignup, onConsultation }: Props) {
  const { authMember } = useGlobals();

  if (authMember) {
    return (
      <section className="landing__section--cta">
        <div className="landing-cta">
          <div>
            <h2 className="landing-cta__title">Need help choosing? Talk to an expert.</h2>
            <p className="landing-cta__body">
              Our specialists in Seoul and Tashkent can guide you through inspection grades,
              shipping options, and customs — free for verified members.
            </p>
          </div>
          <div className="landing-cta__side">
            <button className="landing-cta__btn" onClick={onConsultation}>
              Get consultation →
            </button>
            <span className="landing-cta__note">REPLY WITHIN 24 HOURS</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="landing__section--cta">
      <div className="landing-cta">
        <div>
          <h2 className="landing-cta__title">Ready to buy? Set up your account in 4 minutes.</h2>
          <p className="landing-cta__body">
            Free to register. 5% refundable deposit only when you reserve your first car. ID verification handled by Veriff.
          </p>
        </div>
        <div className="landing-cta__side">
          <button className="landing-cta__btn" onClick={onSignup}>
            {t.nav.signup} →
          </button>
          <span className="landing-cta__note">NO CREDIT CARD REQUIRED</span>
        </div>
      </div>
    </section>
  );
}
