import React from 'react';
import { WidgetContainer } from '@app/components/common';
import { SettingsContent } from '@features/settings';

export const SettingsPage: React.FC = () => {
  return (
    <WidgetContainer sx={{ backgroundColor: 'background.paper', mb: { xs: 2, sm: 0 } }}>
      <SettingsContent />
    </WidgetContainer>
  );
};
