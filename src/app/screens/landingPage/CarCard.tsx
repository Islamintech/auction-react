import React from "react";
import CarPlaceholder from "./CarPlaceholder";
import { AuctionCar } from "../../../lib/types/landing";
import { imageUrl } from "../../../lib/api";

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
  const img = imageUrl(car.image);
  const mediaHeight = compact ? 150 : 190;

  return (
    <div className={`car-card${compact ? " car-card--compact" : ""}`} onClick={() => onOpen(car)}>
      <div className="car-card__media">
        {img ? (
          <div style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", height: mediaHeight, borderRadius: 8 }} />
        ) : (
          <CarPlaceholder label={car.brand} tone={car.brand} height={mediaHeight} compact={compact} />
        )}
        <div className="car-card__tags">
          {isCrashed ? (
            <span className="car-tag car-tag--warn">● CRASHED</span>
          ) : (
            <span className="car-tag car-tag--outline">READY</span>
          )}
        </div>
      </div>

      <div className="car-card__body">
        <div className="car-card__head">
          <div className="car-card__head-main">
            <div className="car-card__meta">{car.brand} · {car.year}</div>
            <div className="car-card__name">{car.title}</div>
          </div>
        </div>

        <div className="car-card__specs">
          <span>{(car.km ?? 0).toLocaleString()} KM</span>
          {car.color && <><span className="car-card__sep">|</span><span>{car.color.toUpperCase()}</span></>}
          <span className="car-card__sep">|</span>
          <span>👁 {(car.viewCount ?? 0).toLocaleString()}</span>
          <span className="car-card__sep">|</span>
          <span>♥ {(car.likeCount ?? 0).toLocaleString()}</span>
        </div>

        <div className="car-card__rule" />

        <div className="car-card__foot">
          <div>
            <div className="car-card__price-label">{isCrashed ? "Car" : "Price"}</div>
            <div className="car-card__price">${car.price.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
