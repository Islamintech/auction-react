import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Hero from "./Hero";
import Featured from "./Featured";
import HowItWorks from "./HowItWorks";
import Leaderboard from "./Leaderboard";
import CommunityGrid from "./CommunityGrid";
import BigCTA from "./BigCTA";
import { retrieveCars, retrieveSavedIds } from "./selector";
import { toggleSaved } from "./slice";
import { AuctionCar } from "../../../lib/types/landing";
import "../../../css/landing.css";

export default function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cars = useSelector(retrieveCars);
  const savedIds = useSelector(retrieveSavedIds);

  const crashed = cars.filter((c) => c.category === "crashed");
  const ready = cars.filter((c) => c.category === "ready");
  const featured = ready.slice(0, 4);

  const goCars = () => history.push("/products");
  const goCommunity = () => history.push("/news");
  const goSignup = () => history.push("/");
  const openCar = (_c: AuctionCar) => history.push("/products");
  const onSave = (id: string) => dispatch(toggleSaved(id));

  return (
    <div className="landing">
      <Hero crashed={crashed} onBrowseCars={goCars} onOpenCar={openCar} />
      <Featured
        cars={featured}
        savedIds={savedIds}
        onSave={onSave}
        onOpen={openCar}
        onViewAll={goCars}
      />
      <HowItWorks />
      <section className="landing__section--split">
        <Leaderboard />
        <CommunityGrid onOpen={goCommunity} />
      </section>
      <BigCTA onSignup={goSignup} />
    </div>
  );
}
