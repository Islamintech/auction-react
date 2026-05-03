import React from "react";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepConnector from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import SectionHeader from "./SectionHeader";

const STEPS: [string, string][] = [
  ["Vehicle selection", "Choose from auctions, dealers, or private sellers."],
  ["Documentation", "Invoice, export certificate, and bill of lading prepared."],
  ["Ocean freight", "Korea to Uzbekistan shipping arranged and tracked."],
  ["Customs clearance", "Duty, VAT, and import formalities handled for you."],
  ["Final delivery", "Local delivery, registration support, and handover."],
];

export default function HowItWorks() {
  return (
    <section className="landing__section--tight">
      <SectionHeader
        number="02"
        title="How it works"
        subtitle="From Korea to your driveway in ~45-60 days."
      />
      <Box className="landing__steps" component="div">
        <Stepper
          alternativeLabel
          activeStep={-1}
          connector={<StepConnector className="landing__step-connector" />}
        >
          {STEPS.map(([title, body], i) => (
            <Step key={title} className="landing__step">
              <StepLabel
                icon={<span className="landing__step-index">{String(i + 1).padStart(2, "0")}</span>}
              >
                <Typography component="span" className="landing__step-title">
                  {title}
                </Typography>
                <Typography component="span" className="landing__step-body">
                  {body}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </section>
  );
}
