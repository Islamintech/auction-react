import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Overview from "./Overview";
import Saved from "./Saved";
import SettingsTab from "./Settings";
import Consultations from "./Consultations";
import { retrieveCars, retrieveSavedIds } from "../landingPage/selector";
import { setCars, toggleSaved } from "../landingPage/slice";
import { AuctionCar } from "../../../lib/types/landing";
import { useGlobals } from "../../hooks/useGlobals";
import { imageUrl } from "../../../lib/api";
import CarService from "../../services/CarService";
import "../../../css/userPage.css";

type TabKey = "overview" | "saved" | "consultations" | "settings";

function initialsOf(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

function formatJoined(d?: Date | string) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "";
  return `JOINED ${date.toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase()}`;
}

export default function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cars = useSelector(retrieveCars);
  const savedIds = useSelector(retrieveSavedIds);
  const saved = cars.filter((c) => savedIds.includes(c.id));
  const [tab, setTab] = useState<TabKey>("overview");
  const { authMember, openSignup } = useGlobals();

  useEffect(() => {
    if (cars.length > 0) return;
    const service = new CarService();
    service
      .getAll({ page: 1, limit: 100, order: "createdAt" })
      .then((data) => dispatch(setCars(data)))
      .catch((err) => console.log(err));
  }, [cars.length, dispatch]);

  const onSave = (id: string) => dispatch(toggleSaved(id));
  const openCar = (_c: AuctionCar) => history.push("/products");
  const goCars = () => history.push("/products");

  if (!authMember) {
    return (
      <div className="mypage">
        <div className="mypage__head">
          <div className="mypage__crumb">ACCOUNT</div>
          <div style={{ padding: "60px 0", textAlign: "center" }}>
            <h1 className="mypage__name" style={{ marginBottom: 12 }}>Sign up to access your account</h1>
            <p style={{ opacity: 0.7, marginBottom: 24 }}>
              Track shipments, save cars, and manage orders. It takes 30 seconds.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="mp-btn mp-btn--primary mp-btn--md" onClick={openSignup}>
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const avatar = imageUrl(authMember.memberImage);
  const name = authMember.memberNick || "Member";
  const country = authMember.memberCountry || authMember.memberAddress || "—";

  const tabs: [TabKey, string][] = [
    ["overview", "Overview"],
    ["saved", `Saved · ${saved.length}`],
    ["consultations", "Consultations"],
    ["settings", "Settings"],
  ];

  return (
    <div className="mypage">
      <div className="mypage__head">
        <div className="mypage__crumb">ACCOUNT / OVERVIEW</div>
        <div className="mypage__head-row">
          <div className="mypage__id">
            {avatar ? (
              <img className="mypage__avatar" src={avatar} alt={name} style={{ objectFit: "cover" }} />
            ) : (
              <div className="mypage__avatar">{initialsOf(name)}</div>
            )}
            <div>
              <h1 className="mypage__name">{name}</h1>
              <div className="mypage__meta">
                <span>{(authMember.memberType || "BUYER").toUpperCase()} · {authMember.memberPoints ?? 0} PTS</span>
                <span className="mypage__meta-sep">|</span>
                <span>{country.toUpperCase()}</span>
                <span className="mypage__meta-sep">|</span>
                <span>{formatJoined(authMember.createdAt)}</span>
                <span className="mypage__meta-sep">|</span>
                <span className="mypage__meta-ok">● {(authMember.memberStatus || "ACTIVE").toString()}</span>
              </div>
            </div>
          </div>
          <div className="mypage__head-cta">
            <button className="mp-btn mp-btn--secondary mp-btn--md" onClick={() => setTab("settings")}>
              Edit profile
            </button>
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
        {tab === "overview" && <Overview savedCount={saved.length} />}
        {tab === "saved" && <Saved saved={saved} onSave={onSave} onOpen={openCar} onBrowse={goCars} />}
        {tab === "consultations" && <Consultations />}
        {tab === "settings" && <SettingsTab onSaved={() => setTab("overview")} />}
      </div>
    </div>
  );
}
