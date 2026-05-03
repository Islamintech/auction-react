import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FilterGroup from "./FilterGroup";
import FilterRow from "./FilterRow";
import Chip from "./Chip";
import Tag from "./Tag";
import CarCard from "../landingPage/CarCard";
import CarPlaceholder from "../landingPage/CarPlaceholder";
import { retrieveCars, retrieveSavedIds } from "../landingPage/selector";
import { setCars, toggleSaved } from "../landingPage/slice";
import { AuctionCar } from "../../../lib/types/landing";
import CarService from "../../services/CarService";
import { imageUrl } from "../../../lib/api";
import "../../../css/carList.css";

type View = "grid" | "list";
type Density = "spacious" | "compact";
type Sort = "newest" | "price-l" | "price-h" | "km" | "year";

interface Filters {
  brand: string;
  category: string;
  priceMax: number;
  sort: Sort;
}

const CONDITIONS: [string, string][] = [
  ["all", "All cars"],
  ["ready", "Ready to drive"],
  ["crashed", "Crashed + parts"],
];

export default function CarListPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cars = useSelector(retrieveCars);
  const savedIds = useSelector(retrieveSavedIds);

  const [view, setView] = useState<View>("grid");
  const [density, setDensity] = useState<Density>("spacious");
  const [filters, setFilters] = useState<Filters>({
    brand: "all",
    category: "all",
    priceMax: 1000000,
    sort: "newest",
  });

  useEffect(() => {
    const service = new CarService();
    service
      .getAll({ page: 1, limit: 100, order: "createdAt" })
      .then((data) => dispatch(setCars(data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  const brands = useMemo(() => {
    const set = new Set(cars.map((c) => c.brand).filter(Boolean));
    return [["all", "All"] as [string, string], ...Array.from(set).map((b) => [b, b] as [string, string])];
  }, [cars]);

  const filtered = useMemo(() => {
    const out = cars.filter((c) => {
      if (filters.brand !== "all" && c.brand !== filters.brand) return false;
      if (filters.category !== "all" && c.category !== filters.category) return false;
      if (c.price > filters.priceMax) return false;
      return true;
    });
    const sorted = [...out];
    switch (filters.sort) {
      case "price-l": sorted.sort((a, b) => a.price - b.price); break;
      case "price-h": sorted.sort((a, b) => b.price - a.price); break;
      case "km":     sorted.sort((a, b) => (a.km ?? 0) - (b.km ?? 0)); break;
      case "year":   sorted.sort((a, b) => b.year - a.year); break;
      default: break;
    }
    return sorted;
  }, [cars, filters]);

  const onSave = (id: string) => dispatch(toggleSaved(id));
  const openCar = (c: AuctionCar) => history.push(`/products/${c.id}`);
  const update = (patch: Partial<Filters>) => setFilters({ ...filters, ...patch });

  return (
    <div className="carlist">
      <div className="carlist__head">
        <div className="carlist__crumb">MARKETPLACE / ALL VEHICLES</div>
        <div className="carlist__head-row">
          <h1 className="carlist__title">{filtered.length} cars from Korea</h1>
          <div className="carlist__toolbar">
            <span className="carlist__toolbar-label">SORT</span>
            <select
              className="carlist__sort"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as Sort })}
            >
              <option value="newest">Newest listed</option>
              <option value="price-l">Price: low → high</option>
              <option value="price-h">Price: high → low</option>
              <option value="km">Mileage</option>
              <option value="year">Year</option>
            </select>
            <span className="carlist__divider" />
            <button
              className={`carlist__view-btn${view === "grid" ? " carlist__view-btn--active" : ""}`}
              onClick={() => setView("grid")}
            >▦</button>
            <button
              className={`carlist__view-btn${view === "list" ? " carlist__view-btn--active" : ""}`}
              onClick={() => setView("list")}
            >☰</button>
          </div>
        </div>
      </div>

      <div className="carlist__layout">
        <aside className="carlist__filters">
          <div className="carlist__filters-title">FILTERS</div>

          <FilterGroup title="Condition">
            {CONDITIONS.map(([v, l]) => (
              <FilterRow key={v} label={l} active={filters.category === v} onClick={() => update({ category: v })} />
            ))}
          </FilterGroup>

          <FilterGroup title="Brand">
            {brands.map(([v, l]) => (
              <FilterRow key={v} label={l} active={filters.brand === v} onClick={() => update({ brand: v })} />
            ))}
          </FilterGroup>

          <FilterGroup title="Price (USD)">
            <div className="cl-range">
              <input
                type="range"
                min={10000}
                max={1000000}
                step={5000}
                value={filters.priceMax}
                onChange={(e) => update({ priceMax: +e.target.value })}
                className="cl-range__input"
              />
              <div className="cl-range__labels">
                <span>$10K</span>
                <span className="cl-range__current">≤ ${(filters.priceMax / 1000).toFixed(0)}K</span>
                <span>$1M</span>
              </div>
            </div>
          </FilterGroup>

          <FilterGroup title="Density">
            <div className="cl-density">
              {(["spacious", "compact"] as Density[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setDensity(v)}
                  className={`cl-density__btn${density === v ? " cl-density__btn--active" : ""}`}
                >
                  {v.toUpperCase()}
                </button>
              ))}
            </div>
          </FilterGroup>
        </aside>

        <div className="carlist__results">
          <div className="cl-chips">
            {filters.brand !== "all" && (
              <Chip label={`Brand: ${filters.brand}`} onClose={() => update({ brand: "all" })} />
            )}
            {filters.category !== "all" && (
              <Chip
                label={`Condition: ${filters.category === "ready" ? "Ready" : "Crashed"}`}
                onClose={() => update({ category: "all" })}
              />
            )}
            <Chip label={`Max $${(filters.priceMax / 1000).toFixed(0)}K`} />
            <span className="cl-chips__count">· {filtered.length} RESULTS</span>
          </div>

          {view === "grid" ? (
            <div className="cl-grid">
              {filtered.map((c) => (
                <CarCard
                  key={c.id}
                  car={c}
                  saved={savedIds.includes(c.id)}
                  onSave={onSave}
                  onOpen={openCar}
                  density={density}
                />
              ))}
            </div>
          ) : (
            <div className="cl-list">
              <div className="cl-list__head">
                <span>IMAGE</span>
                <span>VEHICLE</span>
                <span>YEAR</span>
                <span>KM</span>
                <span>COLOR</span>
                <span>PRICE</span>
                <span>STATUS</span>
              </div>
              {filtered.map((c) => {
                const img = imageUrl(c.image);
                return (
                  <div key={c.id} onClick={() => openCar(c)} className="cl-list__row">
                    {img ? (
                      <div style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", height: 70, borderRadius: 6 }} />
                    ) : (
                      <CarPlaceholder label={c.brand} tone={c.brand} height={70} />
                    )}
                    <div>
                      <div className="cl-list__model">{c.brand} {c.title}</div>
                    </div>
                    <span className="cl-list__num">{c.year}</span>
                    <span className="cl-list__num cl-list__num--mute">{c.km?.toLocaleString() ?? "—"}</span>
                    <span className="cl-list__num cl-list__num--mute">{c.color || "—"}</span>
                    <span className="cl-list__price">${c.price.toLocaleString()}</span>
                    <Tag color={c.category === "crashed" ? "var(--warn)" : "var(--text)"} outline={c.category !== "crashed"}>
                      {c.category === "crashed" ? "CRASHED" : "READY"}
                    </Tag>
                  </div>
                );
              })}
            </div>
          )}

          {filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", opacity: 0.6 }}>No cars match those filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
