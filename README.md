# Phaser 3 Typescript Template

A template to build games with Phaser 3 using TypeScript and Webpack.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm start`     | Build and run game                |
| `npm run build` | Build for production environments |

## Getting Started

1. Clone the repo
2. Run `npm install` to install dependencies
3. Run `npm start` to start game

## Customizing Template

### Babel
You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you
want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently
targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

  ```
  "browsers": [
    ">0.25%",
    "not ie 11",
    "not op_mini all"
  ]
  ```

### Webpack
If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can
modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create
new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code
After you run the `npm run build` command, your code will be built into a single bundle located at 
`dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), 
you should be able to open `http://mycoolserver.com/index.html` and play your game.
