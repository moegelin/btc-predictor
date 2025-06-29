import React, { type ReactNode } from 'react';
import { Paper, type SxProps, useTheme } from '@mui/material';

type WidgetContainerProps = {
  children: ReactNode;
  sx?: SxProps;
};

export const WidgetContainer: React.FC<WidgetContainerProps> = ({ children, sx }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Return a Paper component with custom styles
  return (
    <Paper
      elevation={isDarkMode ? 4 : 0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        backgroundColor: theme.customColors.cardBackground,
        border: theme.customColors.cardBorder,
        mb: { xs: 2, sm: 4 },
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};
