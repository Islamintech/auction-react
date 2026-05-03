import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import CarPlaceholder from "../landingPage/CarPlaceholder";
import CarCard from "../landingPage/CarCard";
import SectionHeader from "../landingPage/SectionHeader";
import Tag from "./Tag";
import BuyPanel from "./BuyPanel";
import TabContent, { TabKey } from "./TabContent";
import { retrieveCars, retrieveSavedIds } from "../landingPage/selector";
import { toggleSaved } from "../landingPage/slice";
import { AuctionCar } from "../../../lib/types/landing";
import CarService from "../../services/CarService";
import { imageUrl } from "../../../lib/api";
import "../../../css/carDetail.css";

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const cars = useSelector(retrieveCars);
  const savedIds = useSelector(retrieveSavedIds);

  const [car, setCar] = useState<AuctionCar | null>(null);
  const [related, setRelated] = useState<AuctionCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<TabKey>("specs");

  useEffect(() => {
    const service = new CarService();
    setLoading(true);
    setActiveImg(0);
    service
      .getById(id)
      .then((data) => {
        setCar(data);
        setTab(data.category === "crashed" ? "damage" : "specs");
      })
      .catch((err) => {
        console.log(err);
        setCar(null);
      })
      .finally(() => setLoading(false));

    service
      .getAll({ page: 1, limit: 20, order: "createdAt" })
      .then((data) => setRelated(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (loading) {
    return <div className="cardetail"><div className="cd-empty">Loading…</div></div>;
  }

  if (!car) {
    return (
      <div className="cardetail">
        <div className="cd-empty">
          Car not found. <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => history.push("/products")}>Back to listings</span>
        </div>
      </div>
    );
  }

  const isCrashed = car.category === "crashed";
  const partsCount = car.damagedParts?.length ?? 0;
  const images = car.images && car.images.length > 0 ? car.images : car.image ? [car.image] : [];
  const activeImage = images[activeImg] ? imageUrl(images[activeImg]) : "";

  const tabs: [TabKey, string][] = isCrashed
    ? [["damage", "Damage"], ["parts", "Parts"], ["specs", "Specs"], ["delivery", "Delivery"]]
    : [["specs", "Specs"], ["damage", "Damage"], ["delivery", "Delivery"], ["paperwork", "Paperwork"]];

  const more = (related.length > 0 ? related : cars)
    .filter((c) => c.id !== car.id && c.category === car.category)
    .slice(0, 4);
  const saved = savedIds.includes(car.id);

  const goLanding = () => history.push("/");
  const goCars = () => history.push("/products");
  const openCar = (c: AuctionCar) => history.push(`/products/${c.id}`);
  const onSave = (idArg: string) => dispatch(toggleSaved(idArg));

  return (
    <div className="cardetail">
      <div className="cd-crumb">
        <span className="cd-crumb__link" onClick={goLanding}>HOME</span>
        <span>/</span>
        <span className="cd-crumb__link" onClick={goCars}>CARS</span>
        <span>/</span>
        <span className="cd-crumb__current">{car.brand.toUpperCase()} {car.title.toUpperCase()}</span>
      </div>

      <div className="cd-top">
        <div>
          <div className="cd-gallery">
            {activeImage ? (
              <div style={{ backgroundImage: `url(${activeImage})`, backgroundSize: "cover", backgroundPosition: "center", height: 460, borderRadius: 12 }} />
            ) : (
              <CarPlaceholder label={`${car.brand} ${car.title}`} tone={car.brand} height={460} />
            )}
            {images.length > 1 && (
              <>
                <button className="cd-gallery__nav cd-gallery__nav--prev" onClick={() => setActiveImg((activeImg - 1 + images.length) % images.length)}>‹</button>
                <button className="cd-gallery__nav cd-gallery__nav--next" onClick={() => setActiveImg((activeImg + 1) % images.length)}>›</button>
              </>
            )}
            <div className="cd-gallery__tags">
              {isCrashed
                ? <Tag color="var(--warn)">● CRASHED</Tag>
                : <Tag outline color="var(--ok)">CLEAN TITLE</Tag>}
              <Tag outline color="var(--text)">VIN VERIFIED</Tag>
              {isCrashed && partsCount > 0 && <Tag outline color="var(--warn)">PARTS INCLUDED</Tag>}
            </div>
          </div>
          {images.length > 1 && (
            <div className="cd-thumbs">
              {images.map((img, i) => {
                const u = imageUrl(img);
                return (
                  <div key={i} onClick={() => setActiveImg(i)} className={`cd-thumb${i === activeImg ? " cd-thumb--active" : ""}`}>
                    {u ? (
                      <div style={{ backgroundImage: `url(${u})`, backgroundSize: "cover", backgroundPosition: "center", height: 70, borderRadius: 6 }} />
                    ) : (
                      <CarPlaceholder label={`0${i + 1}`} tone={car.brand} height={70} />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="cd-title-block">
            <div className="cd-title-row">
              <div>
                <div className="cd-title-meta">
                  {car.brand} · {car.year}
                </div>
                <h1 className="cd-title">{car.title}</h1>
                <p className="cd-desc">
                  {car.desc ||
                    (isCrashed
                      ? "Damaged vehicle, sold as-is. All required replacement parts ship with the car."
                      : `Single owner. Korean inspection grade 4.5/5 — paint thickness within standard tolerance across all panels.`)}
                </p>
              </div>
              <button className={`cd-save${saved ? " cd-save--on" : ""}`} onClick={() => onSave(car.id)}>
                {saved ? "♥" : "♡"}
              </button>
            </div>
          </div>

          <div className="cd-tabs">
            {tabs.map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`cd-tab${tab === k ? " cd-tab--active" : ""}`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="cd-tab-content">
            <TabContent tab={tab} car={car} />
          </div>
        </div>

        <BuyPanel car={car} />
      </div>

      <section className="cd-similar">
        <SectionHeader
          number="—"
          title={isCrashed ? "Similar crashed cars" : "Similar cars"}
          subtitle="Same segment, in inventory now."
        />
        <div className="cd-similar__grid">
          {more.map((c) => (
            <CarCard
              key={c.id}
              car={c}
              saved={savedIds.includes(c.id)}
              onSave={onSave}
              onOpen={openCar}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
