import React, { useState } from "react";
import {
  Grid,
  List,
  Card,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
} from "@mui/material";

export interface TransferListItem {
  id: string | number;
  label: string;
}

export interface TransferListProps {
  leftTitle?: string;
  rightTitle?: string;
  leftItems: TransferListItem[];
  rightItems: TransferListItem[];
  onChange?: (left: TransferListItem[], right: TransferListItem[]) => void;
}

function not(a: TransferListItem[], b: TransferListItem[]) {
  return a.filter(
    (value) => b.find((item) => item.id === value.id) === undefined
  );
}

function intersection(a: TransferListItem[], b: TransferListItem[]) {
  return a.filter(
    (value) => b.find((item) => item.id === value.id) !== undefined
  );
}

export const TransferList = ({
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  leftTitle = "Choices",
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  rightTitle = "Chosen",
  leftItems: initialLeft,
  rightItems: initialRight,
  onChange,
}: TransferListProps) => {
  const [checked, setChecked] = useState<TransferListItem[]>([]);
  const [left, setLeft] = useState<TransferListItem[]>(initialLeft);
  const [right, setRight] = useState<TransferListItem[]>(initialRight);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (item: TransferListItem) => () => {
    const currentIndex = checked.findIndex((i) => i.id === item.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    const newRight = right.concat(left);
    const newLeft: TransferListItem[] = [];
    setRight(newRight);
    setLeft(newLeft);
    setChecked([]);
    onChange?.(newLeft, newRight);
  };

  const handleCheckedRight = () => {
    const newRight = right.concat(leftChecked);
    const newLeft = not(left, leftChecked);
    setRight(newRight);
    setLeft(newLeft);
    setChecked(not(checked, leftChecked));
    onChange?.(newLeft, newRight);
  };

  const handleCheckedLeft = () => {
    const newLeft = left.concat(rightChecked);
    const newRight = not(right, rightChecked);
    setLeft(newLeft);
    setRight(newRight);
    setChecked(not(checked, rightChecked));
    onChange?.(newLeft, newRight);
  };

  const handleAllLeft = () => {
    const newLeft = left.concat(right);
    const newRight: TransferListItem[] = [];
    setLeft(newLeft);
    setRight(newRight);
    setChecked([]);
    onChange?.(newLeft, newRight);
  };

  const customList = (items: TransferListItem[]) => (
    <Card>
      <List dense component="div" role="list">
        {items.map((item) => {
          const labelId = `transfer-list-item-${item.id}-label`;
          return (
            <ListItem
              key={item.id}
              role="listitem"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={handleToggle(item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.findIndex((i) => i.id === item.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.label} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
};
