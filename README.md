## Create React Native App

This project helps you to create a React Native app with atomic design. It is based on [React Native Cli](https://facebook.github.io/react-native/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [React Native Cli](https://facebook.github.io/react-native/) - React Native command line interface.
- [Package Manager](https://pnpm.js.org/) - Fast, disk space efficient package manager. (Optional).

<b>NOTE</b>: You can use any package manager you want, but I recommend using [pnpm](https://pnpm.js.org/) because it is faster and more disk space efficient than npm and yarn.

### Installing

#### 1. Install React Native Cli

```bash
pnpm install -g @kazion/create-rn-app
```

#### 2. Create a new React Native app

```bash
@kazion/create-rn-app [options]
```

#### 3. Start the app

```bash
cd [app-name]
pnpm start
```

## Options

| Option                                    | Description                | Default  |
| ----------------------------------------- | -------------------------- | -------- |
| `-h, --help`                              | Output usage information.  |          |
| `-v, --version`                           | Output the version number. |          |
| `-n, --projectName <projectName>`                       | Name of the app.           |          |
| `-t, --template <template>`               | Template to use.           | `simple` |
| `-p, --package-manager <package-manager>` | Package manager to use.    | `pnpm`   |

## Templates

You can choose between different templates to create your app.

```bash
@kazion/create-rn-app --template <template>
```

### Available Templates

#### Simple (Default)

- This template uses [React Navigation](https://reactnavigation.org/) to navigate between screens.
- It uses [Zustand](https://zustand.surge.sh/) to manage global state.

#### GraphQL

- This template uses [Apollo Client](https://www.apollographql.com/docs/react/) to connect to a GraphQL server.
- It also uses [React Navigation](https://reactnavigation.org/) to navigate between screens.
- It uses [Zustand](https://zustand.surge.sh/) to manage global state.

#### REST

- This template uses [Axios](https://axios-http.com/) to connect to a REST API.
- It also uses [React Navigation](https://reactnavigation.org/) to navigate between screens.
- It uses [Zustand](https://zustand.surge.sh/) to manage global state.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Native Cli](https://facebook.github.io/react-native/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://zustand.surge.sh/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Axios](https://axios-http.com/)
- [pnpm](https://pnpm.js.org/)

## Author

Developed with ❤️ by [Patrick Kabwe](https://www.linkedin.com/in/patrick-kabwe-08197714a/)
