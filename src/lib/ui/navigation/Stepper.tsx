import React from 'react';
import { 
  Stepper as MuiStepper, 
  StepperProps,
  Step,
  StepProps,
  StepLabel,
  StepLabelProps,
  StepContent,
  StepContentProps,
} from '@mui/material';

export interface CustomStepperProps extends StepperProps {
  steps?: Array<{
    label: string;
    content?: React.ReactNode;
    props?: StepProps;
    labelProps?: StepLabelProps;
    contentProps?: StepContentProps;
  }>;
}

export const Stepper = ({ steps, children, ...props }: CustomStepperProps) => {
  return (
    <MuiStepper {...props}>
      {steps ? (
        steps.map(({ label, content, props: stepProps, labelProps, contentProps }, index) => (
          <Step key={index} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
            {content && (
              <StepContent {...contentProps}>
                {content}
              </StepContent>
            )}
          </Step>
        ))
      ) : (
        children
      )}
    </MuiStepper>
  );
}; 