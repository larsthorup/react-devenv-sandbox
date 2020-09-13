# react-devenv-sandbox

Resource efficient front-end development environment.

Independently opt-in tools to help developers collaborate at writing robust code quickly in a resource constrained environment (e.g. low-end computer, intermittent power, intermittent network).

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

- Chrome
- Extension: Web Server for Chrome

### Test

- Mocha + Chai
- Chrome Coverage
- Optional: testing-library

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
