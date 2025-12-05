# MinVærApp - Weather Application

Weather application built with Next.js that provides weather information for cities worldwide. Features include city search, location-based weather, recent searches, dark mode, and multi-language support (English/Norwegian).

## Features

- 🌍 **City Search**: Search and select cities from around the world
- 📍 **Location-based Weather**: Get weather for your current location
- 📚 **Recent Searches**: Quick access to your last 3 searched cities
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 🌐 **Internationalization**: Support for English and Norwegian
- 🎨 **Dynamic Gradients**: Weather-based background gradients that change based on conditions

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- WeatherAPI.com API key ([Get one here](https://www.weatherapi.com/))

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd my-weather
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint

## Architecture & Code Structure

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Internationalization**: i18next
- **Form Validation**: Zod
- **Testing**: Vitest + React Testing Library

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, Input, etc.)
│   ├── layout/         # Layout components (Header)
│   ├── providers/      # Context providers (Theme, Query)
│   └── HandleStateWrappers/  # Loading/Error/Empty state wrappers
│
├── modules/            # Feature modules
│   └── weather/        # Weather feature module
│       ├── components/ # Weather-specific components
│       ├── hooks/      # Custom hooks (useLocation)
│       └── utils/      # Utility functions
│
├── data/               # Data layer
│   └── weather/        # Weather API and queries
│       ├── weather.api.ts      # API client
│       ├── weather.models.ts   # Zod schemas and types
│       └── weather.queries.ts  # React Query hooks
│
├── store/              # Zustand stores
│   ├── location.store.ts
│   └── recent-searches.store.ts
│
├── hooks/              # Global custom hooks
├── utils/              # Utility functions
├── constants/          # Application constants
├── types/              # TypeScript type definitions
└── localization/       # i18n configuration and translations

__tests__/              # Test files
├── unit/               # Unit tests
└── integration/        # Integration tests
```

### Key Architectural Patterns

#### 1. **Feature-Based Module Structure**

The weather feature is organized as a self-contained module with its own components, hooks, and utilities. This promotes code organization and reusability.

#### 2. **Separation of Concerns**

- **Data Layer** (`data/`): Handles API calls, data transformation, and validation
- **Presentation Layer** (`components/`, `modules/`): UI components and user interactions
- **State Layer** (`store/`): Global state management with Zustand
- **Business Logic** (`utils/`, `hooks/`): Reusable logic and custom hooks

#### 3. **Type Safety**

- Zod schemas for runtime validation of API responses
- TypeScript interfaces for compile-time type checking
- Type inference from Zod schemas ensures consistency

#### 4. **State Management**

- **Zustand** for global state (location, recent searches)
- **React Query** for server state (weather data, city search)
- Local component state for UI-specific state

#### 5. **Data Fetching Strategy**

- React Query handles caching, refetching, and error states
- Query keys are organized using a factory pattern
- Automatic cache invalidation and background updates

### Key Files

- `src/data/weather/weather.api.ts` - API client with error handling and data transformation
- `src/data/weather/weather.queries.ts` - React Query hooks for data fetching
- `src/modules/weather/utils/buildWeatherQuery.ts` - Query building logic (city vs coordinates)
- `src/modules/weather/utils/getWeatherGradient.ts` - Weather code to gradient mapping
- `src/store/recent-searches.store.ts` - Recent searches state with persistence

### Testing

The project includes comprehensive unit and integration tests:

- **Unit Tests**: Test utilities, hooks, stores, and API functions in isolation
- **Integration Tests**: Test component interactions with stores and data fetching

Run tests with:

```bash
npm test
```

## Environment Variables

| Variable                      | Description            | Required |
| ----------------------------- | ---------------------- | -------- |
| `NEXT_PUBLIC_WEATHER_API_KEY` | WeatherAPI.com API key | Yes      |

## License

Private project
