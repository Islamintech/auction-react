import React, { useState } from "react";

export function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mp-card">
      <div className="mp-card__head">{title}</div>
      <div className="mp-card__body">{children}</div>
    </div>
  );
}

export function SettingsRow({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status?: "ok" | "warn";
}) {
  const cls =
    status === "ok" ? "mp-row__value mp-row__value--ok"
    : status === "warn" ? "mp-row__value mp-row__value--warn"
    : "mp-row__value";
  return (
    <div className="mp-row">
      <span className="mp-row__label">{label}</span>
      <span className={cls}>{value}</span>
    </div>
  );
}

export function ToggleRow({ label, on }: { label: string; on?: boolean }) {
  const [v, setV] = useState(!!on);
  return (
    <div className="mp-toggle-row">
      <span>{label}</span>
      <button className={`mp-toggle${v ? " mp-toggle--on" : ""}`} onClick={() => setV(!v)}>
        <span className="mp-toggle__thumb" />
      </button>
    </div>
  );
}

export default function SettingsTab() {
  return (
    <div className="mp-settings-grid">
      <SettingsCard title="Account">
        {[
          ["Full name", "Aziz Karimov"],
          ["Email", "aziz@example.uz"],
          ["Phone", "+998 90 ••• 4781"],
          ["Country", "Uzbekistan"],
        ].map(([k, v]) => (
          <SettingsRow key={k} label={k} value={v} />
        ))}
      </SettingsCard>
      <SettingsCard title="Verification">
        <SettingsRow label="ID document" value="Verified" status="ok" />
        <SettingsRow label="Address proof" value="Verified" status="ok" />
        <SettingsRow label="Bank account" value="Pending review" status="warn" />
        <SettingsRow label="2FA" value="Enabled" status="ok" />
      </SettingsCard>
      <SettingsCard title="Notifications">
        <ToggleRow label="Email — price drop alerts" on />
        <ToggleRow label="SMS — shipment milestones" on />
        <ToggleRow label="Email — newsletter" />
        <ToggleRow label="Push — shipment updates" on />
      </SettingsCard>
      <SettingsCard title="Payments">
        <SettingsRow label="Card on file" value="•••• 4218 (Mastercard)" />
        <SettingsRow label="Bank wire" value="Hamkorbank, Tashkent" />
        <SettingsRow label="Default currency" value="USD" />
        <SettingsRow label="Deposit balance" value="$24,800.00" />
      </SettingsCard>
    </div>
  );
}
