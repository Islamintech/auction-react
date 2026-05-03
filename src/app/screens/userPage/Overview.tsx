import React from "react";
import SectionHeader from "../landingPage/SectionHeader";
import { useGlobals } from "../../hooks/useGlobals";

interface Props {
  savedCount: number;
}

export default function Overview({ savedCount }: Props) {
  const { authMember } = useGlobals();

  const joined = authMember?.createdAt
    ? new Date(authMember.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "—";

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
              Hello, {authMember?.memberNick} 👋
            </div>
            <div style={{ opacity: 0.7, lineHeight: 1.6 }}>
              {authMember?.memberDesc
                ? authMember.memberDesc
                : "Browse Korean cars at fixed prices, save your favorites, and reserve when you're ready. Inspected, insured, and customs-cleared by our team."}
            </div>
            <div style={{ marginTop: 16, fontSize: 12, opacity: 0.6 }}>
              📞 {authMember?.memberPhone || "Phone not set"} · ✉️ {authMember?.memberEmail || "Email not set"}
            </div>
          </div>
        </div>

        {(() => {
          const items: [string, string | null | undefined, boolean][] = [
            ["NICKNAME", authMember?.memberNick, !!authMember?.memberNick],
            ["PHONE", authMember?.memberPhone, !!authMember?.memberPhone],
            ["EMAIL", authMember?.memberEmail, !!authMember?.memberEmail],
            ["ADDRESS", authMember?.memberAddress, !!authMember?.memberAddress],
            ["AVATAR", authMember?.memberImage ? "Uploaded" : null, !!authMember?.memberImage],
            ["TELEGRAM", authMember?.memberTelegram, !!authMember?.memberTelegram],
          ];
          const missing = items.filter(([, , ok]) => !ok);
          if (missing.length === 0) return null;
          return (
            <div>
              <SectionHeader number="02" title="Account checklist" subtitle="Complete your profile for a smoother experience." />
              <div className="mp-activity">
                {missing.map(([k, v], i) => (
                  <div key={k} className={`mp-activity__row${i === 0 ? " mp-activity__row--first" : ""}`}>
                    <span className="mp-activity__kind">— {k}</span>
                    <span className="mp-activity__msg">{v || "Not set"}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </>
  );
}
