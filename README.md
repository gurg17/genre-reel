# Genre Reel

## Architectural Decisions

### Framework: Vue 3 + Vite

- **Vue 3** was chosen for its modern reactivity system, composition API, and strong TypeScript support, making it ideal for building maintainable, scalable, and performant SPAs.
- **Vite** is used as the build tool for its fast cold starts, instant hot module replacement, and first-class support for Vue 3. Vite also simplifies environment variable management and modern JavaScript/TypeScript transpilation.
- **Pinia** is used for state management due to its simplicity, modularity, and seamless integration with Vue 3.
- **TailwindCSS** is used for utility-first, responsive, and consistent styling.
- **Vitest** is used for unit testing, providing a fast and modern test runner with native Vite integration.
- **Playwright** is used for end-to-end testing, ensuring robust UI and integration coverage.

### Caching Layer

- A caching layer is implemented to optimize API requests and improve performance. Frequently accessed data is cached in memory and/or local storage, reducing redundant network calls and providing a smoother user experience. The caching logic is abstracted to allow easy updates and consistent usage across the app.

### Project Structure

- The project is organized by feature and domain (e.g., `components/`, `services/`, `stores/`, `views/`).
- API logic is abstracted in the `services/` directory, with type safety enforced via TypeScript interfaces.
- State is managed centrally in `stores/` using Pinia.
- UI components are reusable and composable, following Vue 3 best practices.

### Local Storage Abstraction

- All local storage access is abstracted via a utility (`localStore`) to ensure consistent error handling and serialization.

### TypeScript

- TypeScript is used throughout the project for type safety and improved developer experience.

## Prerequisites

- **Node.js**: v22.x (see `@tsconfig/node22` in devDependencies)
- **Package Manager**: [npm](https://www.npmjs.com/) (preferred), but pnpm/yarn can also be used

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Development server

```sh
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### 3. Type-check, build, and preview

```sh
npm run type-check
npm run build
npm run preview
```

### 4. Run unit tests

```sh
npm run test:unit
```

### 5. Run end-to-end tests

```sh
# Install browsers (first time only)
npx playwright install

# Build the project for CI testing
npm run build

# Run all e2e tests
npm run test:e2e

# E2E scripts for testing specific views will be added in the future to further enhance coverage.
```

## Environment Variables

- Update `.env.example` to `.env` and set the following:
  ```
  VITE_API_URL=https://api.tvmaze.com
  ```

## Additional Notes

- All code is formatted with Prettier and linted with ESLint (see scripts in `package.json`).
- The project uses modern ES modules and is intended for recent Node.js LTS versions (v22+).
- For any issues, please check the scripts and dependencies in `package.json`.
- A deployed version of the app is available at [https://genre-reel.pagarigan.org/](https://genre-reel.pagarigan.org/).
