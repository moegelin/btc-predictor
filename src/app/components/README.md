# Components Folder Structure

This folder contains all the React components used in the application. The components are organized into the following folders:

## Folder Structure

- **chart/**: Components related to charts and data visualization
  - `ChartTooltip.tsx`: Custom tooltip component for charts
  - `PriceHistoryChart.tsx`: Chart component for displaying price history

- **common/**: Reusable components that can be used across different parts of the application
  - Common UI elements like buttons, inputs, modals, etc.

- **game/**: Components specific to the Bitcoin price guessing game
  - `PredictionHistory.tsx`: Component for displaying game history
  - `PredictionControls.tsx`: Controls for making price predictions
  - `PredictionStatus.tsx`: Component for displaying the current guess status
  - `PriceDisplay.tsx`: Component for displaying the current Bitcoin price
  - `ResultDisplay.tsx`: Component for displaying the result of a guess

- **layout/**: Components related to the application layout
  - `AppDesktopLayout.tsx`: Layout component for desktop view
  - `AppMobileLayout.tsx`: Layout component for mobile view
  - `Header.tsx`: Header component with logo, score, and theme toggle

## Best Practices

- Each folder has an `index.ts` file that exports all components from that folder
- Components are organized by feature/domain to make it easier to find and maintain related components
- CSS files are placed next to their corresponding component files
- Each component has a clear, single responsibility
