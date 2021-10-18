describe("Leaderboard tests", () => {
  before("lordy", function () {
    //Login
    cy.visit("auth/sign-in");
    cy.get("#email").type("AdminTest@test.com");
    cy.get("#password").type("Testing123");
    cy.contains("button", "Sign in").click();
    cy.wait(2000);
    cy.get(
      ".chakra-toast > .chakra-toast__inner > #\\31  > .css-1xy7m1b"
    ).click();
    //Populate some questions (Once I get file uploading working, can do this using excel)
    cy.contains("AdminTest").click();
    cy.contains("Question Dashboard").click();
    //Adding Q1
    cy.contains("Add Question").click();
    cy.contains("Select exercise").parent().select("Words");
    cy.contains("Select subexercise")
      .parent()
      .select("Two Syllables Without Ending Consonant");
    cy.get("#question").type("오징어");
    cy.get("#translation").type("Squid");
    cy.contains("button", "Create Question").click();
    cy.get(
      ".chakra-toast > .chakra-toast__inner > #\\32  > .css-1xy7m1b"
    ).click();
    //Adding Q2
    cy.contains("Add Question").click();
    cy.contains("Select exercise").parent().select("Words");
    cy.contains("Select subexercise")
      .parent()
      .select("Two Syllables Without Ending Consonant");
    cy.get("#question").type("생선");
    cy.get("#translation").type("Fish");
    cy.contains("button", "Create Question").click();
    cy.get(
      ".chakra-toast > .chakra-toast__inner > #\\33  > .css-1xy7m1b"
    ).click();
    //Adding Q3
    cy.contains("Add Question").click();
    cy.contains("Select exercise").parent().select("Words");
    cy.contains("Select subexercise")
      .parent()
      .select("Two Syllables Without Ending Consonant");
    cy.get("#question").type("돌고래");
    cy.get("#translation").type("Dolphin");
    cy.contains("button", "Create Question").click();
    cy.wait(500);
  });

  after("lordy", function () {
    //Delete added questions
    cy.contains("button", "AdminTest").click();
    cy.contains("Question Dashboard").click();
    cy.get("#tabs-50--tab-2").click();
    cy.wait(2000);
    cy.get(
      "tbody.css-0 > :nth-child(1) > :nth-child(1) > .chakra-checkbox > .chakra-checkbox__control"
    ).click();
    cy.get(
      ":nth-child(2) > :nth-child(1) > .chakra-checkbox > .chakra-checkbox__control"
    ).click();
    cy.get(
      ":nth-child(3) > :nth-child(1) > .chakra-checkbox > .chakra-checkbox__control"
    ).click();
    cy.contains("Delete Selected Item").click();
    cy.contains("button", new RegExp(/^Delete$/)).click();
  });

  it("WPM Scores", function () {
    //Score = 120, time ~= 1.5s, WPM ~= 120, Accuracy = 100%
    cy.visit("/practice");
    cy.contains("Words").parent().click();
    cy.contains("Two Syllables Without Ending Consonant").click();
    cy.contains("Start Two Syllables Without Ending Consonant").click();
    cy.wait(500);
    cy.get(".chakra-input").type("오징어{enter}");
    cy.wait(500);
    cy.get(".chakra-input").type("생선{enter}");
    cy.wait(500);
    cy.get(".chakra-input").type("돌고래{enter}");
    //Score = 80, time ~= 1.5s, WPM ~= 80, Accuracy = 67%
    cy.visit("/practice");
    cy.contains("Words").parent().click();
    cy.contains("Two Syllables Without Ending Consonant").click();
    cy.contains("Start Two Syllables Without Ending Consonant").click();
    cy.wait(500);
    cy.get(".chakra-input").type("오징어{enter}");
    cy.wait(500);
    cy.get(".chakra-input").type("woops{enter}");
    cy.wait(500);
    cy.get(".chakra-input").type("돌고래{enter}");
    cy.contains("Leaderboard").click();
    cy.contains("Select Category").click();
    cy.contains("Words").click();
  });
  it("Leaderboard displays", function () {
    cy.contains("All Exercises Leaderboard");
    cy.contains("Rank");
    cy.contains("User");
    cy.contains("Subexercise");
    cy.contains("Score");
    cy.contains("WPM");
    cy.contains("Accuracy");
    cy.contains("Time Elapsed");
    cy.wait(2000);
  });
  it("Leaderboard in descending order", function () {
    /*
    cy.get("tbody.css-0 > :nth-child(1) > :nth-child(4)").should(
      "have.text",
      "83.26"
    );
    */
    let one = cy
      .get("tbody.css-0 > :nth-child(1) > :nth-child(4)")
      .invoke("text");
    let two = cy
      .get("tbody.css-0 > :nth-child(2) > :nth-child(4)")
      .invoke("text");

    if (one >= two) {
      cy.expect(true).to.equal(true);
    } else {
      cy.expect(true).to.equal(false);
    }
  });
});
