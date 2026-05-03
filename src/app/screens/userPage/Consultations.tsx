import React, { useEffect, useState } from "react";
import ConsultationService from "../../services/ConsultationService";
import { Consultation, ConsultationStatus } from "../../../lib/types/consultation";

const statusColor: Record<ConsultationStatus, string> = {
  PENDING: "var(--warn, #ffb547)",
  IN_PROGRESS: "var(--accent, #d4a248)",
  RESOLVED: "var(--ok, #3ee07c)",
  CANCELLED: "var(--text-mute, #888)",
};

export default function Consultations() {
  const [items, setItems] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const service = new ConsultationService();
    service
      .getMy()
      .then((data) => setItems(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="mp-empty"><div className="mp-empty__title">Loading…</div></div>;
  }

  if (items.length === 0) {
    return (
      <div className="mp-empty">
        <div className="mp-empty__title">No consultations yet</div>
        <p className="mp-empty__body">
          Open any car and click "Request consultation" to ask our specialists.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mp-section-note">
        {items.length} CONSULTATION{items.length === 1 ? "" : "S"} · LATEST FIRST
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((c) => {
          const date = c.createdAt
            ? new Date(c.createdAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";
          return (
            <div
              key={c._id}
              style={{
                border: "1px solid var(--rule, #2a2d34)",
                borderRadius: 8,
                padding: 16,
                background: "var(--surface, transparent)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    padding: "3px 8px",
                    borderRadius: 4,
                    color: statusColor[c.status],
                    border: `1px solid ${statusColor[c.status]}`,
                  }}
                >
                  ● {c.status.replace("_", " ")}
                </span>
                <span style={{ fontSize: 11, opacity: 0.6 }}>{date}</span>
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>
                CAR:{" "}
                <span style={{ fontFamily: "var(--mono-font)" }}>
                  {!c.carId
                    ? "(deleted)"
                    : typeof c.carId === "string"
                    ? `#${c.carId.slice(-8)}`
                    : `${c.carId.carBrand || c.carId.brand || ""} ${c.carId.carTitle || c.carId.title || ""}`.trim() ||
                      `#${(c.carId._id || "").slice(-8)}`}
                </span>{" "}
                · CONTACT VIA {c.preferredContact}
              </div>
              {c.message && (
                <div style={{ marginTop: 8, lineHeight: 1.6 }}>{c.message}</div>
              )}
              {c.adminNote && (
                <div
                  style={{
                    marginTop: 12,
                    padding: 12,
                    background: "rgba(62, 224, 124, 0.08)",
                    borderLeft: "3px solid var(--ok, #3ee07c)",
                    borderRadius: 4,
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", opacity: 0.7, marginBottom: 4 }}>
                    REPLY FROM TEAM
                  </div>
                  {c.adminNote}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
