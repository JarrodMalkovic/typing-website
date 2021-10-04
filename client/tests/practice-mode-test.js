import { describe } from 'jest-circus';

describe('Visual Error Feedback (Test 1A)', () => {
  it('Scenario: User types something incorrectly in practice mode, expect: visual feedback ', () => {});
});

describe('Running Score Accuracy (Test 1B)', () => {
  it('Scenario: User completes exercise at set accuracy and speed, expect: functions return same speed and accuracy', () => {});
});

describe('View all practice exercises (Test 2A)', () => {
  it('Scenario: User will go to practice exercises, expect: all exercises to be available ', () => {});
});

describe('Attempting sub-exercise before previous exercise (Test 2B)', () => {
  it('Scenario: User clicks on a sub-exercise before having completed previous sub-exercise, expect: error message, no redirection', () => {});
});

//What is the difference between this and Test 1B?
describe('Running score availability (Test 2C)', () => {
  it('Scenario: User working through exercise, expect: functions return same speed and accuracy', () => {});
});

describe('Question Redirection (Test 2D)', () => {
  it('Scenario: User completes a question in an exercise set, expect: user directed to next queston automatically', () => {});
});
