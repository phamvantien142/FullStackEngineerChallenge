const dotenv = require('dotenv')

dotenv.config()
module.exports = {
  preset: 'ts-jest',
  name: 'backend-api',
  moduleFileExtensions: ['ts', 'js', 'json'],
  verbose: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|ts)$': 'babel-jest',
  },
  testMatch: [
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  globalSetup: '<rootDir>/jest/setup.js',
  globalTeardown: '<rootDir>/jest/teardown.js',
  testEnvironment: 'node'
}
