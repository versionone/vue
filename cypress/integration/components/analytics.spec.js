/// <reference types="Cypress" />

let log;
let warn;
Cypress.on('window:before:load', (win) => {
  log = cy.spy(win.console, "log");
  warn = cy.spy(win.console, 'warn');
});

context('analytics', () => {
  it('analytics events can be triggered and handled selectively for specific event channels', () => {
    cy.visit('http://localhost:9000/packages/analytics/examples/create-and-fire-analytics-events/component');
    cy.get('#test-bed button')
      .click()
      .then(() => {
        expect(log).to.be.calledWith([], { action: 'Save' });
        expect(log).to.not.be.calledWith(false);
      });
  });
  it('analytics events can be augmented with contextual data', () => {
    cy.visit('http://localhost:9000/packages/analytics/examples/adding-analytics-context/component');
    cy.get('#test-bed button')
      .click()
      .then(() => {
        expect(log).to.be.calledWith([{ oid: 'Workitem:1' }, { room: 'Room:2' }], { action: 'Save' });
      });
  });
  it('analytics events can be used via `withAnalytics` HoC', () => {
    cy.visit('http://localhost:9000/packages/analytics/examples/passing-events-in-callbacks/component');
    cy.get('#test-bed button')
      .click({ multiple: true, })
      .then(() => {
        expect(log).to.be.calledWith([], { action: 'Save' });
        expect(log).to.be.calledWith([], { action: 'Save', control: 'SaveButtonEventMapObjs', });
        expect(log).to.be.calledWith([], { action: 'Save', control: 'SaveButtonEventMapFuncs', });
      });
  });
  it('analytics events can only be updated before being fired', () => {
    cy.visit('http://localhost:9000/packages/analytics/examples/updating-events/component');
    cy.get('#test-bed button')
      .click()
      .then(() => {
        expect(log).to.be.calledWith([], { action: 'Save', updatedViaValue: true, updatedViaFunc: true, });
        expect(warn).to.be.calledWith('Cannot update an event after firing');
      });
  });
  it('analytics events can be fired asynchronously even after a component unmounts', () => {
    cy.visit('http://localhost:9000/packages/analytics/examples/async-event-firing/component');
    cy.get('#test-bed button')
      .click()
      .then(() => {
        expect(log).to.be.calledWith('WorkitemForm will unmount');
        expect(log).to.be.calledWith([{ form: 'Workitem', formAction: 'new' }], { action: 'Save', workitemOid: 'Workitem:1234' });
      });
  });
});
