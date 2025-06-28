import React from 'react';
import { SettingsContent } from '../../settings';
import { WidgetContainer } from '../../common';

type SettingsScreenProps = {
  // Add any props needed for settings in the future
};

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return (
    <WidgetContainer sx={{ backgroundColor: 'background.paper', mb: 0 }}>
      <SettingsContent />
    </WidgetContainer>
  );
};
