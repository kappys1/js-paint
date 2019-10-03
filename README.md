# JS Paint

![licence](https://img.shields.io/badge/licence-MIT-blue.svg?style=flat) 
[![Build Status](https://travis-ci.org/kappys1/js-paint.svg?branch=master)](https://travis-ci.org/kappys1/js-paint)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Coverage Status](https://coveralls.io/repos/github/kappys1/js-paint/badge.svg?branch=master)](https://coveralls.io/github/kappys1/js-paint?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A simple paint builded with Vanilla JS.
It's develop for a exercice.

## [Play with it](https://kappys1.github.io/js-paint/) 
 
## Install

1. clone 

2. Install

    ```shell
    npm i js-accordion --save
    ```

## Usage

To test and develop yourself

```shell
npm run dev
```

## Build

To get a release.

    ```shell
    npm run build
    ```

## Test

To run a test case with coverage.

    ```shell
    npm run test
    ```


## To Do

- [x] Paint
- [x] Components using ES6, Webpack, Babel.
- [x] Theme Style using SCSS with BEM CSS pattern
- [x] TDD ([Jest](https://jestjs.io/)) with mock canvas
- [x] Coverage test and upload to [Coveralls](https://coveralls.io/github/kappys1/js-paint)
- [x] Eslint ([Airbnb](https://github.com/airbnb/javascript))
- [x] Stylelint with prettier and bem pattern
- [x] Automatic test, build and deploys with [travis](https://travis-ci.org/kappys1/js-paint)
- [x] Automatic release and changelog with [semantic release](https://github.com/semantic-release/semantic-release).
- [x] Create pipeline of deployment with diferent states.

## Pipelines

- **Development**: to develop new features, from this branch you could create diferents branchs to make this features or fix something and after generate pulls request.

- **Staging**: to test the new features.

- **master**: production.

| Branches    | Stages     | site                                                           |
| ----------- | ---------- | -------------------------------------------------------------- |
| Staging |  Staging   | [heroku](https://js-paint-staging.herokuapp.com/)       |
| Master  | Production | [Github Pages](https://kappys1.github.io/js-paint/) |
