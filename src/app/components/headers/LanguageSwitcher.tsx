import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { Lang } from "../../../i18n";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "ENG" },
  { code: "ru", label: "RUS" },
  { code: "uz", label: "UZB" },
  { code: "ko", label: "KOR" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const current = LANGS.find((l) => l.code === i18n.language) ?? LANGS[0];

  const select = (code: Lang) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    document.documentElement.lang = code;
    setAnchorEl(null);
  };

  return (
    <>
      <button
        type="button"
        className="lang-switch"
        aria-label="Change language"
        aria-haspopup="menu"
        aria-expanded={Boolean(anchorEl)}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <LanguageIcon />
        <span className="lang-switch__code">{current.label}</span>
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        slotProps={{ paper: { className: "lang-menu-paper" } }}
      >
        {LANGS.map((l) => (
          <MenuItem
            key={l.code}
            className="lang-menu-item"
            dense
            selected={l.code === i18n.language}
            onClick={() => select(l.code)}
          >
            {l.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
