import React from "react";
import CarPlaceholder from "./CarPlaceholder";
import { AuctionCar } from "../../../lib/types/landing";

interface Props {
  car: AuctionCar;
  saved: boolean;
  onSave: (id: string) => void;
  onOpen: (car: AuctionCar) => void;
  density?: "spacious" | "compact";
}

export default function CarCard({ car, saved, onSave, onOpen, density = "spacious" }: Props) {
  const compact = density === "compact";
  const isCrashed = car.category === "crashed";
  const partsTotal = isCrashed && car.parts ? car.parts.reduce((s, p) => s + p.price, 0) : 0;
  const modelHead = car.model.split(" ")[0];

  return (
    <div className={`car-card${compact ? " car-card--compact" : ""}`} onClick={() => onOpen(car)}>
      <div className="car-card__media">
        <CarPlaceholder
          label={`${car.make ?? ""} ${modelHead}`.trim()}
          tone={car.image || "sedan-a"}
          height={compact ? 150 : 190}
          compact={compact}
        />
        <div className="car-card__tags">
          {isCrashed ? (
            <span className="car-tag car-tag--warn">● CRASHED</span>
          ) : (
            <span className="car-tag car-tag--outline">READY</span>
          )}
          {isCrashed ? (
            <span className="car-tag car-tag--outline car-tag--warn-o">PARTS INCL.</span>
          ) : (
            <span className="car-tag car-tag--outline car-tag--ok-o">CLEAN</span>
          )}
        </div>
        <button
          className={`car-card__save${saved ? " car-card__save--on" : ""}`}
          onClick={(e) => { e.stopPropagation(); onSave(car.id); }}
          aria-label="Save"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
            <path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z" />
          </svg>
        </button>
      </div>

      <div className="car-card__body">
        <div className="car-card__head">
          <div className="car-card__head-main">
            <div className="car-card__meta">
              {(car.make ?? "—")} · {car.year} · {(car.location ?? "").toUpperCase()}
            </div>
            <div className="car-card__name">{car.model}</div>
          </div>
          <div className="car-card__id">#{car.id}</div>
        </div>

        <div className="car-card__specs">
          <span>{(car.km ?? 0).toLocaleString()} KM</span>
          <span className="car-card__sep">|</span>
          <span>{(car.fuel ?? "").toUpperCase()}</span>
          <span className="car-card__sep">|</span>
          <span>{(car.trans ?? "").toUpperCase()}</span>
        </div>

        <div className="car-card__rule" />

        <div className="car-card__foot">
          <div>
            <div className="car-card__price-label">
              {isCrashed ? `Car + ${car.parts?.length ?? 0} parts` : "Price"}
            </div>
            <div className="car-card__price">${car.price.toLocaleString()}</div>
            {isCrashed && (
              <div className="car-card__price-extra">+ ${partsTotal.toLocaleString()} parts</div>
            )}
          </div>
          <div className="car-card__ship">
            <div className="car-card__ship-row">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 17c2 2 4 2 6 0s4-2 6 0 4 2 6 0" />
                <path d="M4 14l1.5-5h13L20 14" />
                <path d="M12 9V4" />
              </svg>
              +$1,240
            </div>
            <div className="car-card__ship-label">EST. TO TAS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
