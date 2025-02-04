import React from 'react';
import { 
  Table as MuiTable, 
  TableProps,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

export interface CustomTableProps extends Omit<TableProps, 'variant'> {
  headers?: string[];
  rows?: Array<string[]>;
  variant?: 'outlined' | 'elevation';
}

export const Table = ({ 
  headers, 
  rows, 
  children, 
  ...props 
}: CustomTableProps) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable {...props}>
        {headers && (
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        {rows ? (
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          children
        )}
      </MuiTable>
    </TableContainer>
  );
}; 