describe("Test Challenge mode", () => {
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
    cy.contains("AdminTest").click();
    cy.contains("Question Dashboard").click();
    cy.get("#tabs-23--tab-2").click({ force: true });
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

  it("Challenge mode is random + continue after incorrect", function () {
    cy.visit("/challenge");
    cy.contains("Start Challenge").click();
    cy.wait(2000);
    cy.get(".chakra-input").type("squid");
    cy.wait(2000);
    cy.get(".chakra-input").type("{enter}");
    cy.get(".chakra-input").type("fish");
    cy.wait(2000);
    cy.get(".chakra-input").type("{enter}");
    cy.get(".chakra-input").type("dolphin");
    cy.wait(2000);
    cy.get(".chakra-input").type("{enter}");
  });
});
