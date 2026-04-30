import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Overview from "./Overview";
import Saved from "./Saved";
import Tracking from "./Tracking";
import Orders from "./Orders";
import SettingsTab from "./Settings";
import { retrieveCars, retrieveSavedIds } from "../landingPage/selector";
import { toggleSaved } from "../landingPage/slice";
import { AuctionCar } from "../../../lib/types/landing";
import "../../../css/userPage.css";

type TabKey = "overview" | "saved" | "tracking" | "orders" | "settings";

export default function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cars = useSelector(retrieveCars);
  const savedIds = useSelector(retrieveSavedIds);
  const saved = cars.filter((c) => savedIds.includes(c.id));
  const [tab, setTab] = useState<TabKey>("overview");

  const onSave = (id: string) => dispatch(toggleSaved(id));
  const openCar = (_c: AuctionCar) => history.push("/products");
  const goCars = () => history.push("/products");

  const tabs: [TabKey, string][] = [
    ["overview", "Overview"],
    ["saved", `Saved · ${saved.length}`],
    ["tracking", "Tracking · 2"],
    ["orders", "Orders"],
    ["settings", "Settings"],
  ];

  return (
    <div className="mypage">
      <div className="mypage__head">
        <div className="mypage__crumb">ACCOUNT / OVERVIEW</div>
        <div className="mypage__head-row">
          <div className="mypage__id">
            <div className="mypage__avatar">AK</div>
            <div>
              <h1 className="mypage__name">Aziz Karimov</h1>
              <div className="mypage__meta">
                <span>BUYER · LVL 3</span>
                <span className="mypage__meta-sep">|</span>
                <span>TASHKENT, UZ</span>
                <span className="mypage__meta-sep">|</span>
                <span>JOINED OCT 2024</span>
                <span className="mypage__meta-sep">|</span>
                <span className="mypage__meta-ok">● ID VERIFIED</span>
              </div>
            </div>
          </div>
          <div className="mypage__head-cta">
            <button className="mp-btn mp-btn--secondary mp-btn--md">Edit profile</button>
            <button className="mp-btn mp-btn--primary mp-btn--md">Add deposit</button>
          </div>
        </div>

        <div className="mypage__tabs">
          {tabs.map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`mypage__tab${tab === k ? " mypage__tab--active" : ""}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="mypage__body">
        {tab === "overview" && <Overview />}
        {tab === "saved" && <Saved saved={saved} onSave={onSave} onOpen={openCar} onBrowse={goCars} />}
        {tab === "tracking" && <Tracking />}
        {tab === "orders" && <Orders />}
        {tab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}
