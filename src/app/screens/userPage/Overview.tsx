import React from "react";
import SectionHeader from "../landingPage/SectionHeader";
import { useGlobals } from "../../hooks/useGlobals";

interface Props {
  savedCount: number;
}

function hasValue(value?: string | null) {
  return Boolean(value && value.trim().length > 0);
}

export default function Overview({ savedCount }: Props) {
  const { authMember } = useGlobals();

  const joined = authMember?.createdAt
    ? new Date(authMember.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "-";

  const checklist: [string, boolean][] = [
    ["NAME", hasValue(authMember?.memberNick)],
    ["PHONE", hasValue(authMember?.memberPhone)],
    ["EMAIL", hasValue(authMember?.memberEmail)],
    ["COUNTRY", hasValue(authMember?.memberCountry)],
    ["ADDRESS", hasValue(authMember?.memberAddress)],
    ["TELEGRAM", hasValue(authMember?.memberTelegram)],
    ["ABOUT", hasValue(authMember?.memberDesc)],
    ["AVATAR", hasValue(authMember?.memberImage)],
  ];

  const missing = checklist.filter(([, done]) => !done);

  const stats: [string, string, string][] = [
    [`${authMember?.memberPoints ?? 0}`, "REWARD POINTS", "var(--accent)"],
    [`${savedCount}`, "SAVED CARS", "var(--text)"],
    [`${(authMember?.memberType || "BUYER").toString()}`, "ACCOUNT TYPE", "var(--ok)"],
    [joined, "MEMBER SINCE", "var(--warn)"],
  ];

  return (
    <>
      <div className="mypage__stats">
        {stats.map(([n, l, c]) => (
          <div key={l} className="mypage__stat">
            <div className="mypage__stat-num" style={{ color: c }}>{n}</div>
            <div className="mypage__stat-label">{l}</div>
          </div>
        ))}
      </div>

      <div className="mypage__overview">
        <div>
          <SectionHeader number="01" title="Welcome back" subtitle="Here's a quick snapshot of your account." />
          <div className="mp-transit" style={{ padding: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
              Hello, {authMember?.memberNick || "Member"}
            </div>
            <div style={{ opacity: 0.7, lineHeight: 1.6 }}>
              {authMember?.memberDesc
                ? authMember.memberDesc
                : "Browse Korean cars at fixed prices, save your favorites, and reserve when you're ready. Inspected, insured, and customs-cleared by our team."}
            </div>
            <div style={{ marginTop: 16, fontSize: 12, opacity: 0.6 }}>
              Phone: {authMember?.memberPhone || "Not set"} | Email: {authMember?.memberEmail || "Not set"}
            </div>
          </div>
        </div>

        {missing.length > 0 && (
          <div>
            <SectionHeader number="02" title="Account checklist" subtitle="Complete your profile for a smoother experience." />
            <div className="mp-activity">
              {missing.map(([label], i) => (
                <div key={label} className={`mp-activity__row${i === 0 ? " mp-activity__row--first" : ""}`}>
                  <span className="mp-activity__kind">- {label}</span>
                  <span className="mp-activity__msg">Not set</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
