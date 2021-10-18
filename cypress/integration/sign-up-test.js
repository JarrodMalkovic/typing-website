describe("Sign-up Tests", () => {
  beforeEach(() => {
    // fixtures
    cy.fixture("users.json").as("mockedUsers");
    cy.visit("auth/sign-up");
  });

  it("Username taken", function () {
    //Bret should already be in the database
    cy.get("#username").type(this.mockedUsers[0].username);
    cy.get("#email").type(this.mockedUsers[0].email);
    cy.get("#password").type("dummy_password");
    cy.get("#confirmPassword").type("dummy_password");
    cy.get("form > .chakra-stack > .chakra-button").click();
    cy.url().should("eq", "https://keykorea.vercel.app/auth/sign-up");
    cy.contains("username already exists.");
  });
  it("Tests a successful sign up", function () {
    cy.get("#username").type(this.mockedUsers[1].username);
    cy.get("#email").type(this.mockedUsers[1].email);
    cy.get("#password").type("dummy_password");
    cy.get("#confirmPassword").type("dummy_password");
    cy.get("form > .chakra-stack > .chakra-button").click();
    cy.wait(2000);
    cy.url().should("eq", "https://keykorea.vercel.app/");
    cy.visit("settings");
    //Deleting newly made account
    cy.get("#tabs-10--tab-1").click();
    cy.contains("button", "Delete Account").click();
    cy.contains("button", new RegExp(/^Delete$/)).click();
    cy.contains("You have successfully deleted your account");
  });
  it("Invalid email address", function () {
    cy.get("#email").type("meepmorp1234");
    cy.get("form > .chakra-stack > .chakra-button").click();
    cy.contains("Invalid email");
  });
  it("Confirm password doesn't match", function () {
    cy.get("#password").type("dummy_password");
    cy.get("#confirmPassword").type("nope");
    cy.get("form > .chakra-stack > .chakra-button").click();
    cy.contains("Passwords must match");
  });
});
