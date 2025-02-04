import React from 'react';
import { 
  Accordion as MuiAccordion, 
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  AccordionDetails,
  AccordionDetailsProps,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface CustomAccordionProps extends Omit<AccordionProps, 'children'> {
  summaryProps?: AccordionSummaryProps;
  summaryContent?: React.ReactNode;
  detailsProps?: AccordionDetailsProps;
  detailsContent?: React.ReactNode;
  children?: React.ReactNode;
}

export const Accordion = ({
  summaryProps,
  summaryContent,
  detailsProps,
  detailsContent,
  children,
  ...props
}: CustomAccordionProps) => {
  return (
    <MuiAccordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} {...summaryProps}>
        {summaryContent}
      </AccordionSummary>
      <AccordionDetails {...detailsProps}>
        {detailsContent}
        {children}
      </AccordionDetails>
    </MuiAccordion>
  );
};