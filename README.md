# joycipe ✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/calebephrem/joycipe.svg?style=social)](https://github.com/calebephrem/joycipe/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/calebephrem/joycipe.svg?style=social)](https://github.com/calebephrem/joycipe/network/members)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)](https://expo.dev/)

## Overview

Joycipe is a delightful mobile application built with React Native and Expo, designed to simplify the culinary journey for food enthusiasts. It provides a seamless experience for discovering a vast array of recipes, from everyday meals to gourmet dishes. The application aims to be your go-to companion in the kitchen, offering intuitive navigation and a user-friendly interface to make finding and exploring new recipes an absolute joy.

Leveraging modern mobile development practices, Joycipe ensures a smooth and performant experience across both iOS and Android platforms. It integrates with robust backend services like Firebase to potentially offer features such as user authentication, saving favorite recipes, and personalized recommendations, enhancing the overall user experience and making meal planning effortless.

## Features 🚀

*   **Extensive Recipe Discovery**: Browse and explore a wide variety of recipes.
*   **Search Functionality**: Easily find specific recipes by name or ingredients.
*   **Intuitive Navigation**: Seamless experience with `@react-navigation/bottom-tabs` and `@react-navigation/stack`.
*   **Cross-Platform Compatibility**: Built with Expo and React Native for both iOS and Android.
*   **Modern UI Components**: Utilizes `lucide-react-native` for crisp, scalable icons and `expo-blur`, `expo-linear-gradient` for engaging visuals.age`.
*   **Firebase Integration**: Future-proofed for user authentication, cloud data storage, and personalized features.

## Tech Stack 🛠️

Joycipe is built with a modern and robust technology stack, focusing on performance, scalability, and developer experience.

| Category          | Technology                  | Version (Approx.) | Description                                              |
| :---------------- | :-------------------------- | :---------------- | :------------------------------------------------------- |
| **Frontend**      | React                       | `19.0.0`          | JavaScript library for building user interfaces.         |
|                   | React Native                | `0.79.1`          | Framework for building native mobile apps with React.    |
|                   | Expo                        | `53.0.0`          | Framework and platform for universal React applications. |
|                   | TypeScript                  | `~5.8.3`          | Typed superset of JavaScript that compiles to plain JS.  |
| **Navigation**    | React Navigation            | `7.x`             | Routing and navigation for React Native apps.            |
| **UI Components** | Lucide React Native         | `0.475.0`         | A beautiful hand-crafted icon set.                       |
|                   | React Native SVG            | `15.11.2`         | Provides SVG support to React Native.                    |
| **Native Features** | Expo Camera               | `~16.1.5`         | Camera API for photos and videos.                        |
|                   | Expo Haptics                | `~14.1.3`         | Provides haptic feedback.                                |
|                   | Expo Linear Gradient        | `~14.1.3`         | Render gradients.                                        |
|                   | Expo Blur                   | `~14.1.3`         | Apply blur effects to views.                             |
| **Storage**       | Async Storage               | `2.2.0`           | Asynchronous, unencrypted, persistent key-value storage. |
| **Backend**       | Firebase                    | `12.1.0`          | Google's mobile and web application development platform. |
| **Development**   | Babel                       | `~7.25.2`         | JavaScript compiler.                                     |
|                   | Expo Env                    | `1.1.1`           | Environment variable management for Expo.                |

## Prerequisites ⚙️

Before you begin, ensure you have the following installed:

*   **Node.js**: LTS version (v18.x or higher recommended). You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** or **Yarn**: npm comes with Node.js. Yarn can be installed via `npm install -g yarn`.
*   **Git**: For cloning the repository.
*   **Expo Go app**: Installed on your mobile device (iOS or Android) or a simulator/emulator.

## Installation 📦

Follow these steps to get Joycipe up and running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/calebephrem/joycipe.git
    cd joycipe
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Usage ▶️

To run the Joycipe application in development mode:

1.  **Start the Expo development server:**
    ```bash
    npm start
    # or
    yarn start
    ```

2.  This will open a new tab in your web browser with the Expo Developer Tools. You can then:
    *   **Scan the QR code** with the Expo Go app on your physical device.
    *   **Run on Android emulator** by pressing `a` in the terminal.
    *   **Run on iOS simulator** by pressing `i` in the terminal (macOS only).
    *   **Run in web browser** by pressing `w` in the terminal (experimental, mobile features may not work).

The app should load on your chosen device or simulator, and you can start exploring recipes!

## Environment Variables 🔑

Joycipe uses environment variables, managed via `expo-env`, for sensitive information like Firebase configuration. You'll need to create a `.env` file in the root of the project with your specific Firebase credentials.

Create a file named `.env` in the project root and add the following (replace with your actual Firebase project configuration):

```env
# Firebase Configuration
FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
FIREBASE_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET"
FIREBASE_MESSAGING_SENDER_ID="YOUR_FIREBASE_MESSAGING_SENDER_ID"
FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"
FIREBASE_MEASUREMENT_ID="YOUR_FIREBASE_MEASUREMENT_ID"
```

## Project Structure 📁

The project follows a modular structure to ensure maintainability and scalability:

```
├── app/                  # Main application entry point and navigation setup (Expo Router)
├── assets/               # Static assets like images, fonts, and icons
├── components/           # Reusable UI components (e.g., buttons, cards, headers)
├── config/               # Application-wide configuration settings (e.g., Firebase config)
├── constants/            # Global constants (e.g., color palettes, screen sizes)
├── hooks/                # Custom React hooks for shared logic
├── services/             # API interactions, Firebase calls, and other external service integrations
├── styles/               # Global styles, themes, and utility stylesheets
├── types/                # TypeScript type definitions and interfaces
├── utils/                # Utility functions (e.g., data formatting, helpers)
├── .env                  # Environment variables (not tracked by Git)
├── app.json              # Expo configuration file
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript compiler configuration
└── LICENSE               # Project license file
```

## Contributing 🤝

Contributions are welcome! If you'd like to contribute to Joycipe, please follow these steps:

1.  **Fork** the repository.
2.  **Clone** your forked repository: `git clone https://github.com/YOUR_USERNAME/joycipe.git`
3.  **Create a new branch**: `git checkout -b feature/your-feature-name`
4.  **Make your changes** and ensure they follow the project's coding style.
5.  **Commit your changes**: `git commit -m "feat: Add new feature"` (or `fix:`, `refactor:`, etc.)
6.  **Push to the branch**: `git push origin feature/your-feature-name`
7.  **Open a Pull Request** to the `main` branch of the original repository.

Please ensure your code passes linting and type checks. For significant changes, please open an issue first to discuss what you would like to change.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
