const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const ui = require('../utils/ui');
const async = require('../../../utils/async');

describe.skip('Home page tests', () => {
    let driver = null;

    const appUrl = 'http://localhost:3002';

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
    });

    afterEach(() => {
        driver.quit();
    });

    it('Should have h1 title with respective id', () => {
        return driver.get(appUrl)
            .then(() => ui.waitFor('#title-welcome'))
            .then((elem) => {
                expect(elem).to.not.be.undefined;
            });
    });

    it('Should have h1 title with "Welcome" message', () => {
        return driver.get(appUrl)
            .then(() => ui.waitFor('#title-welcome'))
            .then((elem) => {
                return elem.getText();
            })
            .then((text) => {
                expect(text).to.contain('Welcome');
            });
    });
});
