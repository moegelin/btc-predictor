import React from 'react';
import { SettingsContent } from '@features/settings';
import { WidgetContainer } from '@shared/ui/WidgetContainer';

export const SettingsPage: React.FC = () => {
  return (
    <WidgetContainer sx={{ backgroundColor: 'background.paper', mb: { xs: 2, sm: 0 } }}>
      <SettingsContent />
    </WidgetContainer>
  );
};
