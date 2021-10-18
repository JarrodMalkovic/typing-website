import { cyan } from "color-name";
import "cypress-file-upload";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

let createNewButton = `[data-cy="createNewButton"]`;
let fileUploader = `input[name="file"]`;
let imagePath = `logo.jpg`;
let doneButton = `[data-cy="doneButton"]`;
let saveButton = `[data-cy="saveButton"]`;

//    cy.get(fileUploader).trigger('dragenter');
//    cy.dropFile()

Cypress.Commands.add(
  "dropFile",
  {
    prevSubjectcs: false,
  },
  (fileName) => {
    Cypress.log({
      name: "dropFile",
    });
    return cy
      .fixture(fileName, "base64")
      .then(Cypress.Blob.base64StringToBlob)
      .then((blob) => {
        return cy.window().then((win) => {
          const file = new win.File([blob], fileName);
          const dataTransfer = new win.DataTransfer();
          dataTransfer.items.add(file);

          return cy.document().trigger("drop", {
            dataTransfer,
          });
        });
      });
  }
);
class Create {
  uploadFile() {
    cy.get(createNew).click();
    cy.get(fileUploader).trigger("dragenter");
    cy.dropFile(filePath);
    cy.get(doneButton).click();
    cy.get(saveButton).first().click();
  }
}
export default Create;
