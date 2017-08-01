const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const ui = require('../utils/ui');
const async = require('../../../utils/async');

describe('Film comments tests', () => {
    let driver = null;

    const appUrl = 'http://localhost:3002';
    const name = 'Pesho';
    const comment = 'Some comment ...';

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
    });

    afterEach(() => {
        driver.quit();
    });

    // it('Should nav to films', () => {
    //     return driver.get(appUrl)
    //         .then(() => {
    //             return ui.click('#nav-btn-films');
    //         })
    //         .then(() => {
    //             return ui.waitForMany('.card');
    //         })
    //         .then(() => {
    //             return ui.click('.card-block:first-of-type a');
    //         });
    // });

    it('Should allow adding comment for registered', () => {
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
                return ui.setValue('input[name="username"]', name + 'theUser');
            })
            .then(() => {
                return ui.setValue('input[name="password"]',
                    name + '-is-' + name);
            })
            .then(() => {
                return ui.click('input[type="submit"]');
            })
            .then(() => {
                return ui.waitFor('.success');
            })
            .then(() => {
                return ui.click('#nav-btn-films');
            })
            .then(() => {
                return ui.waitFor('#all-films');
            })
            .then(() => {
                return ui.click('.card-block:first-of-type a');
            })
            .then(() => {
                return ui.waitFor('.comment-films');
            })
            .then(() => {
                return ui.click('.comment-films');
            })
            .then(() => {
                return ui.waitFor('#comment');
            })
            .then(() => {
                return ui.setValue('#comment', comment);
            })
            .then(() => {
                return ui.click('input[type="submit"]');
            })
            .then(() => {
                return ui.click('input[type="submit"]');
            })
            .then(() => {
                return ui.waitFor('.success"]');
            })
            .then(() => {
                return ui.getText('.success li"]');
            })
            .then((text) => {
                expect(text).to.contain('added successfully');
            });
    });
});
