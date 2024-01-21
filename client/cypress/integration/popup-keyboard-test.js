describe("Popup keyboard tests", () => {
  before("lordy", function () {
    //Add a question to practice mode
    cy.visit("auth/sign-in");
    cy.get("#email").type("AdminTest@test.com");
    cy.get("#password").type("Testing123");
    cy.contains("button", "Sign in").click();
    cy.wait(2000);
    cy.get(
      ".chakra-toast > .chakra-toast__inner > #\\31  > .css-1xy7m1b"
    ).click();
    cy.contains("AdminTest").click();
    cy.contains("Question Dashboard").click();
    cy.contains("Add Question").click();
    //Adding a question through popup field selector
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
    //Question added
    cy.contains("AdminTest").click();
    cy.contains("Sign out").click();
  });

  after("lordy", function () {
    //Delete added questions
    cy.visit("auth/sign-in");
    cy.get("#email").type("AdminTest@test.com");
    cy.get("#password").type("Testing123");
    cy.contains("button", "Sign in").click();
    cy.wait(2000);
    cy.get(
      ".chakra-toast > .chakra-toast__inner > #\\31  > .css-1xy7m1b"
    ).click();
    cy.contains("AdminTest").click();
    cy.contains("Question Dashboard").click();
    cy.get("#tabs-19--tab-2").click();
    cy.get(
      "tbody.css-0 > :nth-child(1) > :nth-child(1) > .chakra-checkbox > .chakra-checkbox__control"
    ).click();
    cy.contains("Delete Selected Item").click();
    cy.contains("button", new RegExp(/^Delete$/)).click();
  });

  it("Tests opening the keyboard", function () {
    //Login to access the practice mode
    cy.visit("auth/sign-in");
    cy.get("#email").type("Sincere@april.biz");
    cy.get("#password").type("dummy_password");
    cy.contains("button", "Sign in").click();
    cy.get(
      ".chakra-toast > .chakra-toast__inner > #\\31  > .css-1xy7m1b"
    ).click();
    cy.contains("Practice").click();
    cy.contains("Words").parent().click();
    cy.contains("Two Syllables Without Ending Consonant").click();
    cy.contains("Start Two Syllables Without Ending Consonant").click();
    cy.wait(2000);
    cy.get(".chakra-button__group > :nth-child(2)").click();
    cy.get(".react-simple-keyboard").should("exist");
    cy.wait(2000);
  });

  it("Tests closing the keyboard", function () {
    cy.wait(2000);
    cy.get(".chakra-button__group > :nth-child(2)").click();
    cy.get(".react-simple-keyboard").should("not.exist");
    cy.wait(2000);
  });
});
