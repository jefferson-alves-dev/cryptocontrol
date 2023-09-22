/** @type {import('jest').Config} */
const config = {
  roots: ['<rootDir>/tests'],
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@tests/(.*)': '<rootDir>/tests/$1',
    '@bootstrap/(.*)': '<rootDir>/src/api/bootstrap/$1',
    '@utils/(.*)': '<rootDir>/src/api/utils/$1',
    '@presentation/(.*)': '<rootDir>/src/api/presentation/$1',
    '@services/(.*)': '<rootDir>/src/api/services/$1',
    '@infra/(.*)': '<rootDir>/src/api/infra/$1',
    '@config/(.*)': '<rootDir>/src/api/config/$1',
    '@domain/(.*)': '<rootDir>/src/api/domain/$1',
  },
}

// eslint-disable-next-line no-undef
module.exports = config
