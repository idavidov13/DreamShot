/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import "cypress-iframe";
import "cypress-xpath";

import { homePageFramerURL } from "../../data/constants";

describe("Test #8", () => {
  it('Does display 3d animation after clicking on "click to view in 3d" button', () => {
    //Open the URL
    cy.viewport(1920, 1200);
    cy.visit(homePageFramerURL);

    //Get the framer

    cy.get(".framer-ws79ko").trigger("mouseover");

    cy.get("div.framer-8nn08p.3D-button")
      .invoke("css", "opacity", "1")
      .wait(1000)
      .get("span.framer-text")
      .should("be.visible");

    cy.get(
      ".framer-yvxyy1 > .framer-styles-preset-605wog > .framer-text"
    ).click();

    cy.get(
      'iframe[src="https://my.spline.design/framercopy-bd9e7275da55ebaf7252e8a0e4e0055f/"]'
    ).should("be.visible");
  });
});
