//KEYBOARD SETUP TESTS
describe("Keyboard setup tests", () => {
  before(() => {
    cy.visit("/setup");
    //Navigate through the keybaord setup stuff
    cy.contains("Next").click();
    cy.contains("Next").click();
    cy.contains("Next").click();
    cy.contains("Next").click();
  });
  it("Test that input box is there", () => {
    cy.contains(
      "Type in the text box below to check your keyboard is setup properly!"
    );
  });
  it("Tests typing in English", () => {
    cy.get(".chakra-input").type("Test");
    cy.contains(
      "Oh no! You are not typing in Hangul. Ensure that your keyboard is setup in Korean."
    );
  });
  it("Tests typing in Korean", () => {
    cy.get(".chakra-input").clear().type("ㅂㄷㅈㄱㅂㅈㄷㄱ");
    cy.contains(
      "Everything looks setup correctly! Have fun practicing your korean typing skills!"
    );
  });
  it("Tests redirection", () => {
    cy.contains("Continue to Practice!").click();
    cy.url().should("eq", "https://keykorea.vercel.app/practice");
    //Redirected to login if not signed in
  });
});
