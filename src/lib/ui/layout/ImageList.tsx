import React from 'react';
import { 
  ImageList as MuiImageList, 
  ImageListProps,
  ImageListItem,
  ImageListItemProps,
  ImageListItemBar,
  ImageListItemBarProps,
} from '@mui/material';

export interface CustomImageListProps extends ImageListProps {
  items?: Array<{
    img: string;
    title?: string;
    itemProps?: ImageListItemProps;
    itemBarProps?: ImageListItemBarProps;
  }>;
}

export const ImageList = ({ items, children, ...props }: CustomImageListProps) => {
  return (
    <MuiImageList {...props}>
      {items ? (
        items.map(({ img, title, itemProps, itemBarProps }, index) => (
          <ImageListItem key={index} {...itemProps}>
            <img src={img} alt={title} loading="lazy" />
            {title && <ImageListItemBar title={title} {...itemBarProps} />}
          </ImageListItem>
        ))
      ) : (
        children
      )}
    </MuiImageList>
  );
}; 