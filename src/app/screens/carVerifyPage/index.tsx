import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuctionCar } from "../../../lib/types/landing";
import CarService from "../../services/CarService";
import { imageUrl } from "../../../lib/api";
import Lightbox from "./Lightbox";
import "../../../css/carVerify.css";

type Status = "idle" | "loading" | "found" | "empty" | "error";

export default function CarVerifyPage() {
  const history = useHistory();
  const [vin, setVin] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [car, setCar] = useState<AuctionCar | null>(null);
  const [searched, setSearched] = useState("");
  const [lightboxAt, setLightboxAt] = useState<number | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = vin.trim();
    if (!query) return;
    setStatus("loading");
    setCar(null);
    setSearched(query);
    try {
      const service = new CarService();
      const result = await service.verifyByVin(query);
      // Only a sold record counts as a valid proof of purchase.
      if (result && result.sold) {
        setCar(result);
        setStatus("found");
      } else {
        setStatus("empty");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const money = (n?: number) =>
    typeof n === "number" ? `$${n.toLocaleString()}` : "—";

  return (
    <div className="cv">
      <div className="cv__container">
        <div className="cv__crumb">PUBLIC REGISTRY / VEHICLE VERIFICATION</div>
        <h1 className="cv__title">Verify a vehicle by VIN</h1>
        <p className="cv__lead">
          Enter a Vehicle Identification Number to confirm a completed sale.
          Verified records can be used as proof of purchase for customs clearance.
        </p>

        <form className="cv__search" onSubmit={handleSearch}>
          <input
            className="cv__input"
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            placeholder="e.g. KMHD84LF5KU123456"
            spellCheck={false}
            autoComplete="off"
            maxLength={32}
          />
          <button
            className="cv__submit"
            type="submit"
            disabled={status === "loading" || !vin.trim()}
          >
            {status === "loading" ? "Searching…" : "Verify"}
          </button>
        </form>

        {status === "loading" && (
          <div className="cv__state">Looking up VIN…</div>
        )}

        {status === "error" && (
          <div className="cv__state cv__state--error">
            Something went wrong. Please try again.
          </div>
        )}

        {status === "empty" && (
          <div className="cv__state cv__state--empty">
            <div className="cv__empty-mark">∅</div>
            <div className="cv__empty-title">No verified sale found</div>
            <div className="cv__empty-text">
              No sold vehicle matches VIN <strong>{searched}</strong>. The VIN may
              be invalid, or the vehicle has not been sold through our registry.
            </div>
          </div>
        )}

        {status === "found" && car && (
          <div className="cv__result">
            <div className="cv__badge">
              <span className="cv__badge-dot" />
              VERIFIED SALE
            </div>

            <div className="cv__card">
              {(() => {
                const gallery =
                  car.images && car.images.length > 0
                    ? car.images
                    : car.image
                    ? [car.image]
                    : [];
                const cover = imageUrl(gallery[0] ?? car.image);
                return (
                  <div
                    className={`cv__media${cover ? " cv__media--clickable" : ""}`}
                    onClick={() => cover && setLightboxAt(0)}
                    role={cover ? "button" : undefined}
                    tabIndex={cover ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (cover && (e.key === "Enter" || e.key === " ")) setLightboxAt(0);
                    }}
                  >
                    {cover ? (
                      <>
                        <div
                          className="cv__photo"
                          style={{ backgroundImage: `url(${cover})` }}
                        />
                        <span className="cv__media-hint">
                          {gallery.length > 1 ? `+${gallery.length} photos` : "View photo"}
                        </span>
                      </>
                    ) : (
                      <div className="cv__photo cv__photo--empty">{car.brand}</div>
                    )}
                  </div>
                );
              })()}

              <div className="cv__body">
                <div className="cv__vehicle">
                  {car.brand} {car.title}
                </div>
                <div className="cv__vin">VIN · {car.vin ?? searched}</div>

                <div className="cv__proof">
                  <div className="cv__proof-row">
                    <span className="cv__proof-label">Buyer</span>
                    <span className="cv__proof-value">{car.buyerName ?? "—"}</span>
                  </div>
                  <div className="cv__proof-row">
                    <span className="cv__proof-label">Sale price</span>
                    <span className="cv__proof-value cv__proof-value--price">
                      {money(car.salePrice ?? car.price)}
                    </span>
                  </div>
                  {car.soldAt && (
                    <div className="cv__proof-row">
                      <span className="cv__proof-label">Sold on</span>
                      <span className="cv__proof-value">
                        {new Date(car.soldAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="cv__details">
              <div className="cv__details-title">Vehicle details on record</div>
              <div className="cv__spec-grid">
                <Spec label="Brand" value={car.brand} />
                <Spec label="Model" value={car.title} />
                <Spec label="Year" value={car.year} />
                <Spec
                  label="Mileage"
                  value={car.km != null ? `${car.km.toLocaleString()} km` : "—"}
                />
                <Spec label="Color" value={car.color} />
                <Spec
                  label="Condition"
                  value={car.category === "crashed" ? "Crashed" : "Ready"}
                />
                <Spec label="Listing price" value={money(car.price)} />
                <Spec label="Status" value={car.status} />
              </div>

              {car.desc && (
                <div className="cv__desc">
                  <div className="cv__desc-label">Description</div>
                  <p className="cv__desc-text">{car.desc}</p>
                </div>
              )}

              {car.category === "crashed" && (car.damage || car.damageDesc) && (
                <div className="cv__parts">
                  <div className="cv__desc-label">Damage</div>
                  {car.damage && <p className="cv__desc-text">{car.damage}</p>}
                  {car.damageDesc && <p className="cv__desc-text">{car.damageDesc}</p>}
                </div>
              )}

              <button
                className="cv__open"
                onClick={() => history.push(`/products/${car.id}`)}
              >
                View full listing →
              </button>
            </div>
          </div>
        )}
      </div>

      {car && lightboxAt !== null && (
        <Lightbox
          images={
            car.images && car.images.length > 0
              ? car.images
              : car.image
              ? [car.image]
              : []
          }
          startIndex={lightboxAt}
          onClose={() => setLightboxAt(null)}
        />
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="cv__spec">
      <span className="cv__spec-label">{label}</span>
      <span className="cv__spec-value">{value || "—"}</span>
    </div>
  );
}
