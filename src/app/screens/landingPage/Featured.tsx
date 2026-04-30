import React from "react";
import SectionHeader from "./SectionHeader";
import CarCard from "./CarCard";
import { AuctionCar } from "../../../lib/types/landing";
import { t } from "./strings";

interface Props {
  cars: AuctionCar[];
  savedIds: string[];
  onSave: (id: string) => void;
  onOpen: (car: AuctionCar) => void;
  onViewAll: () => void;
}

export default function Featured({ cars, savedIds, onSave, onOpen, onViewAll }: Props) {
  return (
    <section className="landing__section">
      <SectionHeader
        number="01"
        title={t.sections.featured}
        subtitle="Curated by our chief inspector each Monday."
        link="View all →"
        onLink={onViewAll}
      />
      <div className="landing__featured-grid">
        {cars.map((c) => (
          <CarCard key={c.id} car={c} saved={savedIds.includes(c.id)} onSave={onSave} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
