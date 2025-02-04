import React from 'react';
import { 
  Collapse,
  Fade,
  Grow,
  Slide,
  Zoom,
  CollapseProps,
  FadeProps,
  GrowProps,
  SlideProps,
  ZoomProps,
} from '@mui/material';

export const CollapseTransition = (props: CollapseProps) => {
  return <Collapse {...props} />;
};

export const FadeTransition = (props: FadeProps) => {
  return <Fade {...props} />;
};

export const GrowTransition = (props: GrowProps) => {
  return <Grow {...props} />;
};

export const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} />;
};

export const ZoomTransition = (props: ZoomProps) => {
  return <Zoom {...props} />;
};
