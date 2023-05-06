# react-devenv-sandbox

Resource efficient front-end development environment.

Independently opt-in tools to help developers collaborate at writing robust code quickly in a resource constrained environment (e.g. low-end computer, intermittent power, intermittent network).

Using Web Server for Chrome extension:

http://127.0.0.1:8887/index.html
http://127.0.0.1:8887/dev/mocha-runner.html

```shell
npm install
npm test
npm start
```

```shell
npm run build
npm run start:build
```

## Metrics

- Storage friendly:
- Network resilient:
- CPU friendly:
- Battery friendly:

## Opt-in stages

### Bare

- Download deps from unpkg.com
- Chrome
- Extension: Web Server for Chrome

### Test

- Mocha + Chai
- Chrome Coverage
- TODO: React Test Renderer
- Optional: testing-library

### Dependency management

- Node.js
- NPM

### Bundle

- Node.js
- Rollup
- PostCSS

### Format

- Node.js
- Prettier

### Lint

- Node.js
- ESLint

### Type-check

- Node.js
- Typescript with JSDoc

### CI

- Github
- Node.js
- http-server
- Puppeteer
- Travis-CI
- nyc
- Coveralls

# Non-goals

- No support for legacy browsers
