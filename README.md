# Crypto Price Tracker

A responsive React + Redux Toolkit application that tracks real-time cryptocurrency prices, simulating WebSocket updates and managing all state via Redux.

## Features

- Responsive UI table displaying cryptocurrency data
- Real-time price updates simulated with WebSocket-like functionality
- Complete Redux state management using Redux Toolkit
- Color-coded percentage changes
- 7-day price charts for each cryptocurrency
- Optimized re-renders using Redux selectors

## Tech Stack

- **React**: UI library
- **Next.js**: React framework
- **Redux Toolkit**: State management
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **TypeScript**: Type safety

## Architecture

The application follows a clean architecture pattern:

- **Components**: UI components for rendering the crypto data
- **Redux Store**: Central state management
  - **Slices**: Feature-based state management
  - **Selectors**: Optimized data selection from the store
- **Utils**: Helper functions for formatting and data manipulation

## WebSocket Simulation

The application simulates WebSocket connections using `setInterval` to periodically update the cryptocurrency data. Every 2 seconds, the application:

1. Generates random price changes
2. Updates prices, percentage changes, and volumes
3. Updates the sparkline chart data
4. Dispatches Redux actions to update the state

## Setup Instructions

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/crypto-price-tracker.git
   cd crypto-price-tracker
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Demo

![Crypto Price Tracker Demo](demo.gif)

## Future Improvements

- Integrate real WebSocket connections (e.g., Binance API)
- Add filtering and sorting options
- Implement localStorage for persisting user preferences
- Add unit tests for reducers and selectors
- Add detailed view for each cryptocurrency
