# Data Trainer

## Overview

Data Trainer is an Angular-based web application designed to facilitate data matching, specifically with recipes and ingredients. It integrates with a backend server to fetch and submit data, helping users match ingredients manually and automatically.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Services](#services)
- [Components](#components)
- [Environment Configuration](#environment-configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication using user IDs.
- Ingredient and recipe fetching from a backend server.
- Ingredient matching with search and manual override capabilities.
- Swipeable interface to navigate through ingredients.
- Tracking matched recipes per user.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v12 or above)
- [npm](https://www.npmjs.com/) (v6 or above)
- [Angular CLI](https://angular.io/cli) (v9 or above)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/data-trainer.git
   ```

2. Navigate to the project directory:
   ```sh
   cd data-trainer
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

## Running the Application

To run the application in development mode, execute:
```sh
ng serve
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project Structure

- **src/app**: Contains the core application code.
  - **components**: Angular components (e.g., matcher, header, manual-selector).
  - **services**: Services for data fetching, search, and event handling.
  - **interfaces.ts**: TypeScript interfaces used throughout the application.
- **e2e**: End-to-end tests.
- **src/assets**: Static assets like images, CSS files, etc.
- **angular.json**: Configuration file for Angular CLI.

## Services

- **DataService**: Handles HTTP calls to the backend server for fetching and posting data.
- **ManualSelectorService**: Manages events related to manual ingredient selection.
- **ResetViewService**: Provides a mechanism to reset the application view.
- **SearchWordsService**: Implements searching functionality for matching ingredients based on user input.
- **SwipeService**: Manages swipe events for ingredient navigation.

## Components

1. **AppComponent**: The root component.
2. **HeaderComponent**: Manages user login.
3. **MatcherComponent**: Main interface for matching recipes and ingredients.
4. **IngredientMatcherComponent**: Handles individual ingredient matching logic and UI.
5. **ManualSelectorComponent**: Provides a manual override interface for ingredient selection.
6. **StartComponent**: Initial start page for user login.

## Environment Configuration

The application uses an environment configuration located at `src/environments`. Adjust endpoints and other settings as necessary:

- **environment.ts**: Default environment settings.
- **environment.prod.ts**: Production environment settings.


