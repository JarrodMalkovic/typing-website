describe("Admin-dashboard tests", () => {
  beforeEach("lordy", function () {
    cy.fixture("users.json").as("mockedUsers");
  });

  before("lordy", function () {
    //fixtures
    //Login as an admin
    cy.visit("auth/sign-in");
    cy.get("#email").type("admin@keykorea.com");
    cy.get("#password").type(":8{Dzj8F^:up.5'/");
    cy.contains("button", "Sign in").click();
    cy.wait(2000);
    cy.get(
      ".chakra-toast > .chakra-toast__inner > #\\31  > .css-1xy7m1b"
    ).click();
  });

  it("Admin user can see dashboard", function () {
    cy.contains("SuperAdminAccount").click();
    cy.contains("Question Dashboard").should("exist");
    cy.contains("Exercise Dashboard").should("exist");
    cy.contains("Subexercise Dashboard").should("exist");
    cy.contains("Exercise Statistics").should("exist");
    cy.contains("User Management").should("exist");
    cy.contains("SuperAdminAccount").click();
  });

  it("Admin can promote/demote user", function () {
    cy.contains("SuperAdminAccount").click();
    //cy.contains("SuperAdminAccount").click();
    cy.contains("User Management").click();
    cy.get(".chakra-input").type("Bret");
    cy.contains("button", "Promote").click();
    cy.contains("button", 'Promote "Bret"').click();
    //Bret is now promoted!
    cy.wait(2000);
    //Now we are going to demote Bret
    cy.contains("button", "Demote").click();
    cy.contains("button", 'Demote "Bret"').click();
  });

  it("Admin can add questions", function () {
    cy.contains("SuperAdminAccount").click();
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
    cy.wait(2000);
    cy.contains("Practice").click();
    cy.contains("Words").parent().click();
    cy.contains("Two Syllables Without Ending Consonant").click();
    cy.contains("Start Two Syllables Without Ending Consonant").click();
    cy.get(".chakra-input").type("Ayyyyy");
    cy.wait(500);
  });

  it("Admin can change questions (Manual)", function () {
    //MANUAL TESTING
  });

  //Just remove the first (and only) question in that set
  it("Admin can delete questions", function () {
    cy.contains("SuperAdminAccount").click();
    cy.contains("Question Dashboard").click();
    cy.wait(500);
    cy.get("#tabs-70--tab-2").click({ force: true });
    cy.get(
      "tbody.css-0 > :nth-child(1) > :nth-child(1) > .chakra-checkbox > .chakra-checkbox__control"
    ).click();
    cy.contains("Delete Selected Item").click({ force: true });
    cy.contains("button", new RegExp(/^Delete$/)).click({ force: true });
    cy.wait(1000);
    cy.contains("You have successfully deleted the selected question.");
    cy.get(
      ".chakra-toast > .chakra-toast__inner > #\\33  > .css-1xy7m1b"
    ).click();
  });

  it("Admin can upload dictation (Manual)", function () {
    //MANUAL TESTING
  });

  it("Correct dictation file type (Manual)", function () {
    //MANUAL TESTING
  });

  it("Nonadmin user can't see admin dashbaord", function () {
    //Signs in as a user
    cy.visit("auth/sign-in");
    cy.get("#email").type(this.mockedUsers[0].email);
    cy.get("#password").type("dummy_password");
    cy.contains("button", "Sign in").click();
    cy.get(
      ".chakra-toast > .chakra-toast__inner > #\\31  > .css-1xy7m1b"
    ).click();
    cy.wait(2000);
    //Checks if admin dashboard is in the menu
    cy.contains(this.mockedUsers[0].username).click({ force: true });
    cy.contains("Question Dashboard").should("not.exist");
    cy.contains("Exercise Dashboard").should("not.exist");
    cy.contains("Subexercise Dashboard").should("not.exist");
    cy.contains("Exercise Statistics").should("not.exist");
    cy.contains("User Management").should("not.exist");
  });
});
