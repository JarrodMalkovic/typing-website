describe("Login tests", () => {
  beforeEach(() => {
    cy.fixture("users.json").as("mockedUsers");
    cy.visit("auth/sign-in");
  });

  it("Can login through the UI", function () {
    //Bret is already in the database
    cy.get("#email").type(this.mockedUsers[0].email);
    cy.get("#password").type("dummy_password");
    cy.contains("button", "Sign in").click();
    cy.url().should("eq", "https://keykorea.vercel.app/auth/sign-in");
  });

  it("Checks for invalid email", function () {
    cy.get("#email").type("meepmorp1234");
    cy.get("#password").type("dummy_password");
    cy.contains("button", "Sign in").click();
    cy.url().should("eq", "https://keykorea.vercel.app/auth/sign-in");
    cy.contains("Invalid email");
  });

  it("Tests if user can logout", function () {
    cy.get("#email").type(this.mockedUsers[0].email);
    cy.get("#password").type("dummy_password");
    cy.contains("button", "Sign in").click();
    cy.wait(2000);
    cy.get(
      ".chakra-toast > .chakra-toast__inner > #\\31  > .css-1xy7m1b"
    ).click();
    cy.contains(this.mockedUsers[0].username).click();
    cy.contains("Sign out").click();
    cy.contains("Sign In");
  });
});
