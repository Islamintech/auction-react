import React, { useMemo, useState } from "react";
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
import "../../../css/carDetail.css";

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const cars = useSelector(retrieveCars);
  const savedIds = useSelector(retrieveSavedIds);

  const car = useMemo(() => cars.find((c) => c.id === id), [cars, id]);
  const isCrashed = car?.category === "crashed";
  const partsTotal = isCrashed && car?.parts ? car.parts.reduce((s, p) => s + p.price, 0) : 0;

  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<TabKey>(isCrashed ? "damage" : "specs");

  if (!car) {
    return (
      <div className="cardetail">
        <div className="cd-empty">
          Car not found. <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => history.push("/products")}>Back to listings</span>
        </div>
      </div>
    );
  }

  const images = [car.image || "sedan-a", "sedan-b", "suv-c", "sedan-c", "suv-a", car.image || "sedan-a"];
  const tabs: [TabKey, string][] = isCrashed
    ? [["damage", "Damage"], ["parts", "Parts"], ["specs", "Specs"], ["delivery", "Delivery"]]
    : [["specs", "Specs"], ["damage", "Damage"], ["delivery", "Delivery"], ["paperwork", "Paperwork"]];

  const more = cars.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 4);
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
        <span className="cd-crumb__current">{(car.make || "").toUpperCase()} {car.model.toUpperCase()}</span>
      </div>

      <div className="cd-top">
        <div>
          <div className="cd-gallery">
            <CarPlaceholder
              label={`${car.make || ""} ${car.model} · IMG ${activeImg + 1}/${images.length}`}
              tone={images[activeImg]}
              height={460}
            />
            <button className="cd-gallery__nav cd-gallery__nav--prev" onClick={() => setActiveImg((activeImg - 1 + images.length) % images.length)}>‹</button>
            <button className="cd-gallery__nav cd-gallery__nav--next" onClick={() => setActiveImg((activeImg + 1) % images.length)}>›</button>
            <div className="cd-gallery__tags">
              {isCrashed
                ? <Tag color="var(--warn)">● CRASHED</Tag>
                : <Tag outline color="var(--ok)">CLEAN TITLE</Tag>}
              <Tag outline color="var(--text)">VIN VERIFIED</Tag>
              {isCrashed && <Tag outline color="var(--warn)">PARTS INCLUDED</Tag>}
            </div>
          </div>
          <div className="cd-thumbs">
            {images.map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)} className={`cd-thumb${i === activeImg ? " cd-thumb--active" : ""}`}>
                <CarPlaceholder label={`0${i + 1}`} tone={img} height={70} />
              </div>
            ))}
          </div>

          <div className="cd-title-block">
            <div className="cd-title-row">
              <div>
                <div className="cd-title-meta">
                  #{car.id} · {car.year}
                </div>
                <h1 className="cd-title">{car.make} {car.model}</h1>
                <p className="cd-desc">
                  {isCrashed
                    ? car.damageDesc || "Damaged vehicle, sold as-is. All required replacement parts ship with the car."
                    : `Single owner. Full service history at authorized ${car.make} dealer. Korean inspection grade 4.5/5 — paint thickness within standard tolerance across all panels.`}
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
            <TabContent tab={tab} car={car} partsTotal={partsTotal} />
          </div>
        </div>

        <BuyPanel car={car} partsTotal={partsTotal} />
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
