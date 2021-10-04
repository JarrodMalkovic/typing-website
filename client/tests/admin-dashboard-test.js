import { describe } from 'jest-circus';

describe('Admin permissions check (Test A1)', () => {
  it('Scenario: Non-admin user logs in, expect: no admin-dashboard menu item', () => {});
});

describe('Admin permissions check (Test A2)', () => {
  it('Scenario: Admin user logs in, expect: admin-dashboard menu item is there', () => {});
});

describe('Permision escalation (Test B)', () => {
  it('Scenario: Admin promotes other non-admin user to admin, expect: admin-dashboard menu item is there', () => {});
});

describe('Adding Questions (Test C)', () => {
  it('Scenario: Admin adds a question to a set, expect: question in database', () => {});
});

describe('Changing Questions (Test D)', () => {
  it('Scenario: Admin changes a question from a set, expect: changed question in database', () => {});
});

describe('Deleting Questions (Test E)', () => {
  it('Scenario: Admin deletes a question from a set, expect: question no longer in database', () => {});
});

describe('Dictation test (Test F)', () => {
  it('Scenario: Admin uploads dictation, expect: file successfully added', () => {});
});

describe('Dictation file type (Test G)', () => {
  it('Scenario: Admin uploads incorrect file type, expect: error message, database unchanged', () => {});
});
