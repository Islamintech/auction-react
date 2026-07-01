import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuctionCar } from "../../../lib/types/landing";
import CarService from "../../services/CarService";
import { imageUrl } from "../../../lib/api";
import Lightbox from "./Lightbox";
import "../../../css/carVerify.css";

type Status = "idle" | "loading" | "found" | "empty" | "error";

// Keep the last verify result around for a minute so a refresh or a
// trip to the car detail page and back doesn't wipe the lookup.
const CACHE_KEY = "vinVerify:last";
const CACHE_TTL = 60 * 1000; // 1 minute

type Cached = {
  vin: string;
  searched: string;
  status: Status;
  car: AuctionCar | null;
  ts: number;
};

function readCache(): Cached | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Cached;
    if (Date.now() - data.ts > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export default function CarVerifyPage() {
  const { t } = useTranslation();
  const [vin, setVin] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [car, setCar] = useState<AuctionCar | null>(null);
  const [searched, setSearched] = useState("");
  const [lightboxAt, setLightboxAt] = useState<number | null>(null);

  // Restore a recent lookup on mount (handles refresh / back navigation).
  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setVin(cached.vin);
      setSearched(cached.searched);
      setCar(cached.car);
      setStatus(cached.status);
    }
  }, []);

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
      const found = !!(result && result.sold);
      const nextStatus: Status = found ? "found" : "empty";
      const nextCar = found ? result : null;
      setCar(nextCar);
      setStatus(nextStatus);
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ vin: query, searched: query, status: nextStatus, car: nextCar, ts: Date.now() })
        );
      } catch {
        /* storage may be unavailable — non-fatal */
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
        <div className="cv__crumb">{t("verify.crumb")}</div>
        <h1 className="cv__title">{t("verify.title")}</h1>
        <p className="cv__lead">{t("verify.lead")}</p>

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
            {status === "loading" ? t("verify.searching") : t("verify.verify")}
          </button>
        </form>

        {status === "loading" && (
          <div className="cv__state">{t("verify.lookingUp")}</div>
        )}

        {status === "error" && (
          <div className="cv__state cv__state--error">
            {t("verify.error")}
          </div>
        )}

        {status === "empty" && (
          <div className="cv__state cv__state--empty">
            <div className="cv__empty-mark">∅</div>
            <div className="cv__empty-title">{t("verify.noSaleTitle")}</div>
            <div className="cv__empty-text">
              {t("verify.noSaleTextPre")}<strong>{searched}</strong>{t("verify.noSaleTextPost")}
            </div>
          </div>
        )}

        {status === "found" && car && (
          <div className="cv__result">
            <div className="cv__badge">
              <span className="cv__badge-dot" />
              {t("verify.verifiedBadge")}
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
                          {gallery.length > 1 ? t("verify.photos", { count: gallery.length }) : t("verify.viewPhoto")}
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
                    <span className="cv__proof-label">{t("verify.buyer")}</span>
                    <span className="cv__proof-value">{car.buyerName ?? "—"}</span>
                  </div>
                  <div className="cv__proof-row">
                    <span className="cv__proof-label">{t("verify.salePrice")}</span>
                    <span className="cv__proof-value cv__proof-value--price">
                      {money(car.salePrice ?? car.price)}
                    </span>
                  </div>
                  {car.soldAt && (
                    <div className="cv__proof-row">
                      <span className="cv__proof-label">{t("verify.soldOn")}</span>
                      <span className="cv__proof-value">
                        {new Date(car.soldAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="cv__details">
              <div className="cv__details-title">{t("verify.detailsTitle")}</div>
              <div className="cv__spec-grid">
                <Spec label={t("verify.brand")} value={car.brand} />
                <Spec label={t("verify.model")} value={car.title} />
                <Spec label={t("verify.year")} value={car.year} />
                <Spec
                  label={t("verify.mileage")}
                  value={car.km != null ? `${car.km.toLocaleString()} km` : "—"}
                />
                <Spec label={t("verify.color")} value={car.color} />
                <Spec
                  label={t("verify.condition")}
                  value={car.category === "crashed" ? t("verify.crashed") : t("verify.ready")}
                />
                <Spec label={t("verify.status")} value={car.status} />
              </div>

              {car.desc && (
                <div className="cv__desc">
                  <div className="cv__desc-label">{t("verify.description")}</div>
                  <p className="cv__desc-text">{car.desc}</p>
                </div>
              )}

              {car.category === "crashed" && (car.damage || car.damageDesc) && (
                <div className="cv__parts">
                  <div className="cv__desc-label">{t("verify.damage")}</div>
                  {car.damage && <p className="cv__desc-text">{car.damage}</p>}
                  {car.damageDesc && <p className="cv__desc-text">{car.damageDesc}</p>}
                </div>
              )}
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
