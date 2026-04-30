import React from "react";
import CarCard from "../landingPage/CarCard";
import { AuctionCar } from "../../../lib/types/landing";

interface Props {
  saved: AuctionCar[];
  onSave: (id: string) => void;
  onOpen: (car: AuctionCar) => void;
  onBrowse: () => void;
}

export default function Saved({ saved, onSave, onOpen, onBrowse }: Props) {
  return (
    <>
      <div className="mp-section-note">
        {saved.length} CARS SAVED · TAP HEART TO REMOVE
      </div>
      {saved.length === 0 ? (
        <div className="mp-empty">
          <div className="mp-empty__title">No saved cars yet</div>
          <p className="mp-empty__body">Tap the heart on any car to save it for later.</p>
          <button className="mp-btn mp-btn--primary mp-btn--md" style={{ marginTop: 16 }} onClick={onBrowse}>
            Browse cars →
          </button>
        </div>
      ) : (
        <div className="mp-saved-grid">
          {saved.map((c) => (
            <CarCard key={c.id} car={c} saved onSave={onSave} onOpen={onOpen} />
          ))}
        </div>
      )}
    </>
  );
}
