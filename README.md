**Valspector** is an online tool for retrieving and displaying basic statistics from any Valorant account, by passing RIOT ID and TAG, including match history, performance metrics, and rankings.

## Project Setup

### Version
- **Next.js** version: `14.2.12`
- **React** version: `18`
- **Sass** version: `1.79.1`

## Getting Started

To run the project locally, follow the instructions below.

### Prerequisites

- Node.js (version 16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/valspector.git
   ```
2. Navigate to the project folder:
   ```bash
   cd valspector
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Scripts

- **Development Mode**: To start the development server:
  ```bash
  npm run dev
  ```
  This will run the Next.js development server at `http://localhost:3000`.

- **Build for Production**: To build the project:
  ```bash
  npm run build
  ```
  This will generate the production-ready files.

- **Start the Production Server**: After building, run:
  ```bash
  npm start
  ```

- **Linting**: To run the linter and check for code quality:
  ```bash
  npm run lint
  ```

## Technologies

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Sass**: A CSS pre-processor that adds power and elegance to the basic language.
- **ESLint**: A linter for identifying and fixing code quality issues.

## Development

### Directory Structure

- `/pages`: Contains the application’s main pages and routes.
- `/components`: Reusable React components used across the application.
- `/styles`: Sass styles for styling the components and pages.

### TypeScript

This project uses **TypeScript** to provide static typing, improving code quality and developer experience.

### Linting

The project uses **ESLint** with the **Next.js** configuration to maintain consistent code standards.