const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const ui = require('../utils/ui');
const async = require('../../../utils/async');

describe.skip('Register tests', () => {
    let driver = null;

    const appUrl = 'http://localhost:3002';
    const name = ((() => {
        let n = '';
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 8; i+=1) {
            n += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return n;
    })());

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
    });

    afterEach(() => {
        driver.quit();
    });

    it('Should register with valid data', () => {
        return driver.get(appUrl)
            .then(() => ui.click('#sign-up'))
            .then(() => {
                return ui.waitFor('.form-register');
            })
            .then(() => {
                return ui.setValue('input[name="name"]', name);
            })
            .then(() => {
                return ui.setValue('input[name="email"]', name + '@gmail.com');
            })
            .then(() => {
                return ui.setValue('input[name="username"]', name + 'theUser');
            })
            .then(() => {
                return ui.setValue('input[name="password"]',
                    name + '-is-' + name);
            })
            .then(() => {
                return ui.setValue('input[name="password2"]',
                    name + '-is-' + name);
            })
            .then(() => {
                return ui.click('input[type="submit"]');
            })
            .then(() => {
                return ui.waitFor('.success');
            })
            .then(() => {
                return ui.getText('.success');
            })
            .then((text) => {
                expect(text).to.contain('can log in');
            });
    });
});
