import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShowAddressDetails from "./ShowAddressDetails";
import AddressInfo from "./AddressInfo";
import ShowContactDetails from "./ShowContactDetails";
import ContactInfo from "./ContactInfo";
import ShowMethodInfo from "./ShowMethodInfo";
import ShowPaymentInfo from "./ShowPaymentInfo";
import PaymentInfo from "./PaymentInfo";

export default function DetailAccordian() {
  const [expanded, setExpanded] = React.useState("panel4")

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [errorObject, setErrorObject] = React.useState({});

  const inputMappedWithPanel = {
    email: "panel2",
  };

  React.useEffect(() => {
    let isAlreadyOpen = false;

    Object.keys(errorObject).map((element) => {
      if (!isAlreadyOpen && inputMappedWithPanel[element]) {
        setExpanded(inputMappedWithPanel[element]);
        isAlreadyOpen = true;
      }
    });
  }, [errorObject]);

  return (
    <div className="mt-4">
      <Accordion
        sx={{ boxShadow: "none", border: "none" }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ChevronRightIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            className="text-gray-400"
          >
            BILLING
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            <div className="max-h-[70px] overflow-hidden text-ellipsis">
              <ShowAddressDetails />
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddressInfo />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ boxShadow: "none", border: "none" }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ChevronRightIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            className="text-gray-400"
          >
            CONTACT
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            <div className="max-h-[70px] overflow-hidden text-ellipsis">
              <ShowContactDetails />
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ContactInfo />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ boxShadow: "none", border: "none" }}
        expanded={expanded === "panel3"}
      >
        <AccordionSummary aria-controls="panel3bh-content" id="panel2bh-header">
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            className="text-gray-400"
          >
            METHOD
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            <div className="max-h-[70px] overflow-hidden text-ellipsis">
              <ShowMethodInfo />
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ContactInfo />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ boxShadow: "none", border: "none" }}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ChevronRightIcon />}
          aria-controls="panel4bh-content"
          id="panel2bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            className="text-gray-400"
          >
            PAYMENT
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            <div className="max-h-[70px] overflow-hidden text-ellipsis">
              <ShowPaymentInfo />
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PaymentInfo
            setErrorObject={setErrorObject}
            errorObject={errorObject}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
