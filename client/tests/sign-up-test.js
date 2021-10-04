import { describe } from 'jest-circus';

describe('Email in use (Test A)', () => {
  it('Scenario: User signs up with an email already in database, expect: error message, database unchanged', () => {});
});

describe('Username taken (Test B)', () => {
  it('Scenario: User signs up with username already in database, expect: error message, database unchanged', () => {});
});

describe('Invalid email address (Test C)', () => {
  it('Scenario: User signs up with an invalid email address, expect: error message, database unchanged', () => {});
});

describe('Successful sign up (Test D)', () => {
  it('Scenario: User can sign up with valid email, username, and password, expect: redirected to home page', () => {});
});

describe('Successful login (Test E)', () => {
  it('Scenario: User can login with valid email, username, and password, expect: redirected to home page', () => {});
});
