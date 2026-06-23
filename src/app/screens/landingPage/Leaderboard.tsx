import React, { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import { useTranslation } from "react-i18next";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { imageUrl } from "../../../lib/api";

export default function Leaderboard() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<Member[]>([]);

  useEffect(() => {
    const service = new MemberService();
    service
      .getTopUsers()
      .then((data) => {
        const sorted = [...data].sort((a, b) => (b.memberPoints ?? 0) - (a.memberPoints ?? 0));
        setUsers(sorted.slice(0, 5));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <SectionHeader number="03" title={t("sections.leaderboard")} subtitle={t("sections.leaderboardSub")} />
      <div className="landing-lb">
        {users.length === 0 && (
          <div style={{ padding: 20, opacity: 0.6 }}>No active users yet.</div>
        )}
        {users.map((u, i) => {
          const avatar = imageUrl(u.memberImage);
          return (
            <div key={u._id} className={`landing-lb__row${i === 0 ? " landing-lb__row--first" : ""}`}>
              <span className={`landing-lb__rank${i < 3 ? " landing-lb__rank--top" : ""}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {avatar ? (
                  <img
                    src={avatar}
                    alt={u.memberNick}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      objectFit: "cover",
                      background: "var(--rule, #2a2d34)",
                      flexShrink: 0,
                      display: "block",
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "var(--rule, #2a2d34)",
                      color: "var(--text)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {(u.memberNick?.[0] || "?").toUpperCase()}
                  </div>
                )}
                <div className="landing-lb__name">{u.memberNick}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
