describe("Profile page tests", () => {
  before("lordy", function () {
    cy.visit("auth/sign-up");
    cy.get("#username").type("Antonette");
    cy.get("#email").type("Shanna@melissa.tv");
    cy.get("#password").type("dummy_password");
    cy.get("#confirmPassword").type("dummy_password");
    cy.get("form > .chakra-stack > .chakra-button").click();
    cy.get(
      ".chakra-toast > .chakra-toast__inner > #\\31  > .css-1xy7m1b"
    ).click();
    cy.wait(2000);
  });

  after("lordy", function () {
    cy.visit("auth/sign-in");
    cy.get("#email").type("Shanna@melissa.tv");
    cy.get("#password").type("dummy_password");
    cy.get("form > .chakra-stack > .chakra-button").click();
    cy.get(
      ".chakra-toast > .chakra-toast__inner > #\\31  > .css-1xy7m1b"
    ).click();
    cy.contains("button", "Antonette").click();
    cy.contains("Settings").click();
    //Deleting newly made account
    cy.get("#tabs-12--tab-1").click();
    cy.contains("button", "Delete Account").click();
    cy.contains("button", new RegExp(/^Delete$/)).click();
  });
  it("User profile update", function () {
    cy.contains("Antonette").click();
    cy.contains("Profile").click();
    cy.wait(2000);
    cy.contains("button", "Antonette").click();
    cy.contains("Settings").click();
    cy.wait(2000);
  });
  it("User tries to look at other users profile", function () {
    cy.visit("/profile/Bret");
    cy.wait(5000);
    //cy.url().should("eq", "https://keykorea.vercel.app");
  });
});
