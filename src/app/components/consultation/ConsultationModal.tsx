import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ConsultationService from "../../services/ConsultationService";
import { ConsultationInput, PreferredContact } from "../../../lib/types/consultation";
import { useGlobals } from "../../hooks/useGlobals";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";

interface CarOption {
  id: string;
  label: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  carId?: string;
  carTitle?: string;
  carOptions?: CarOption[];
}

const CONTACT_OPTIONS: PreferredContact[] = ["CALL", "EMAIL", "TELEGRAM", "WHATSAPP"];

const CONTACT_LABELS: Record<PreferredContact, string> = {
  CALL: "Phone call",
  EMAIL: "Email",
  TELEGRAM: "Telegram",
  WHATSAPP: "WhatsApp",
};

export default function ConsultationModal({ open, onClose, carId, carTitle, carOptions }: Props) {
  const { authMember } = useGlobals();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferred, setPreferred] = useState<PreferredContact>("PHONE");
  const [message, setMessage] = useState("");
  const [selectedCarId, setSelectedCarId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const showPicker = !carId && (carOptions?.length ?? 0) > 0;
  const effectiveCarId = carId || selectedCarId;

  useEffect(() => {
    if (!open) return;
    setName(authMember?.memberNick || "");
    setEmail(authMember?.memberEmail || "");
    setPhone(authMember?.memberPhone || "");
    setPreferred("CALL");
    setMessage("");
    setSelectedCarId(carOptions?.[0]?.id || "");
  }, [open, authMember, carOptions]);

  const handleSubmit = async () => {
    try {
      if (!name.trim() || !email.trim() || !phone.trim()) {
        throw new Error("Name, email and phone are required");
      }
      if (!effectiveCarId) throw new Error("Please select a car");

      setSubmitting(true);
      const input: ConsultationInput = {
        carId: effectiveCarId,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        preferredContact: preferred,
        message: message.trim() || undefined,
      };
      const service = new ConsultationService();
      await service.create(input);
      await sweetTopSmallSuccessAlert("Consultation request sent", 1000);
      onClose();
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2, overflow: "hidden" } }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 4, position: "relative" }}>
          <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>

          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
            <ContactSupportIcon sx={{ color: "var(--accent, #d4a248)" }} />
            <Typography sx={{ fontSize: 12, letterSpacing: "0.18em", opacity: 0.6 }}>
              REQUEST CONSULTATION
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
            Talk to an expert
          </Typography>
          {carTitle && (
            <Typography sx={{ fontSize: 13, opacity: 0.7, mt: 0.5 }}>
              About: <b>{carTitle}</b>
            </Typography>
          )}
          <Typography sx={{ fontSize: 12, opacity: 0.6, mt: 0.5, mb: 3 }}>
            We reply within 24 hours during business days.
          </Typography>

          <Stack spacing={2}>
            {showPicker && (
              <TextField
                fullWidth
                size="small"
                select
                label="Which car?"
                value={selectedCarId}
                onChange={(e) => setSelectedCarId(e.target.value)}
              >
                {carOptions!.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField
              fullWidth
              size="small"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              size="small"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              size="small"
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              size="small"
              select
              label="Preferred contact"
              value={preferred}
              onChange={(e) => setPreferred(e.target.value as PreferredContact)}
            >
              {CONTACT_OPTIONS.map((c) => (
                <MenuItem key={c} value={c}>
                  {CONTACT_LABELS[c]}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              multiline
              minRows={3}
              size="small"
              label="Message (optional)"
              placeholder="Anything specific you'd like to know?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              variant="contained"
              disabled={submitting}
              onClick={handleSubmit}
              sx={{
                py: 1.2,
                background: "var(--text, #0b0c0e)",
                color: "var(--bg, #f1ece1)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                "&:hover": { background: "var(--text-mute, #1a1d24)" },
              }}
            >
              {submitting ? "Sending…" : "Send request"}
            </Button>
            <Typography sx={{ fontSize: 11, opacity: 0.55, textAlign: "center" }}>
              By submitting you agree to be contacted via your selected channel.
            </Typography>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
