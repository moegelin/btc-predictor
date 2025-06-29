import React from 'react';
import { SettingsContent } from '../../settings';
import { WidgetContainer } from '../../common';

export const SettingsScreen: React.FC = () => {
  return (
    <WidgetContainer sx={{ backgroundColor: 'background.paper', mb: 0 }}>
      <SettingsContent />
    </WidgetContainer>
  );
};
