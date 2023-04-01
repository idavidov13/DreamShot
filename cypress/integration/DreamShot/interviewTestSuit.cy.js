/// <reference types="Cypress" />

import {
  blurSetting,
  cardVisitButton,
  currencyDollar,
  homePageFramerURL,
  numberOfFAQQuestions,
  phoneType,
  submitButtonColor,
} from "../../data/constants";

describe("INTERVIEW TEST SUITE #1", () => {
  beforeEach(function () {
    //runs once before all tests in the block
    cy.visit(homePageFramerURL);
  });

  it('Does display products` currency symbol as "$"', () => {
    //Open the URL

    //Open Pricing tab
    cy.get(
      ".framer-1g3amks-container > .framer-WalAV > .framer-1892sln > .framer-1gmmtpa > .framer-styles-preset-kqguaa > span"
    ).click();

    //Check if Pricing tab is opened

    cy.url().should("include", "pricing");

    //Is currency symbol "$"

    cy.get("span.framer-text").contains(currencyDollar).should("exist");
  });

  it('Does contain 4 questions on the FAQ section from "Pricing" page', () => {
    //Open Pricing tab
    cy.get(
      ".framer-1g3amks-container > .framer-WalAV > .framer-1892sln > .framer-1gmmtpa > .framer-styles-preset-kqguaa > span"
    ).click();

    //Check if FAQ is visible

    cy.get(
      ".framer-1fgi6a3 > .framer-styles-preset-1m9bzi2 > .framer-text"
    ).should("be.visible");

    //Check if there are 4 questions

    cy.get(".framer-8l13dv").should("have.length", numberOfFAQQuestions);
  });

  it('Does display "visit" button on each card in the `Many types of components to customize section', () => {
    //Scroll down to specific element

    cy.get(
      ".framer-5yei0g > .framer-styles-preset-1m9bzi2 > .framer-text"
    ).scrollIntoView();

    //Check if every card has button "Visit"

    cy.get('[name="Card"]').each(($card) => {
      cy.wrap($card)
        .find('[name="Button"]')
        .should("have.text", cardVisitButton);
    });
  });

  it('Does display "Sign up" button`s color as rgb(255,82,79)', () => {
    //Scroll down to specific element

    cy.get(".framer-l3ry8h").scrollIntoView();

    //Checking the color of Sign up button

    cy.get('input[type="submit"][value="Sign Up"]').should(
      "have.css",
      "background-color",
      submitButtonColor
    );
  });

  it('Does blur the background after clicking "Get the app" button', () => {
    //Assert "Get the app" button presents

    cy.get(".framer-15fwyui").should("exist");

    //CLick on the button and check if the background is blurred

    cy.get(".framer-15fwyui")
      .click()
      .get("div.framer-vrqh0x")
      .invoke("attr", "style")
      .should("include", blurSetting);
  });

  it('Does display the "Updates" page after clicking the `Update` button', () => {
    //Check if the button "Updates" is visible
    //Command click() can be executed only if the button is visible

    //Open Updates tab
    cy.get(
      ".framer-7hrpx3-container > .framer-WalAV > .framer-1892sln > .framer-1gmmtpa > .framer-styles-preset-kqguaa > span"
    ).click();

    //Check if Pricing tab is opened

    cy.url().should("include", "updates");
  });

  it('Does display "get the app" and `watch video` one above the other on mobile', () => {
    //Open given URL on mobile

    cy.viewport(phoneType);

    //checking the possition of the buttons

    cy.get(".framer-15fwyui").invoke("offset").as("button1Offset");
    cy.get(".framer-wq259l").invoke("offset").as("button2Offset");

    cy.get("@button1Offset").then(($button1Offset) => {
      cy.get("@button2Offset").should(($button2Offset) => {
        expect($button1Offset.top).to.be.lessThan($button2Offset.top);
      });
    });
  });
});
