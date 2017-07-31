// const { expect } = require('chai');
// const { setupDriver } = require('../utils/setup-driver');
// const ui = require('../utils/ui');
// const async = require('../../../utils/async');
//
// describe.skip('Nav tests', () => {
//     let driver = null;
//
//     const appUrl = 'http://localhost:3002';
//
//     beforeEach(() => {
//         driver = setupDriver('chrome');
//         ui.setDriver(driver);
//     });
//
//     afterEach(() => {
//         driver.quit();
//     });
//
//     it('Should navigate to home when brand is clicked', () => {
//         return driver.get(appUrl)
//             .then(() => ui.click('.navbar-brand'))
//             .then(() => {
//                 return driver.getCurrentUrl();
//             })
//             .then((url) => {
//                 expect(url).to.equal(appUrl + '/');
//             });
//     });
//
//     it('Should navigate to /films when films when nav item is clicked', () => {
//         return driver.get(appUrl)
//             .then(() => ui.click('#nav-btn-films'))
//             .then(() => {
//                 return driver.getCurrentUrl();
//             })
//             .then((url) => {
//                 expect(url).to.equal(appUrl + '/films');
//             });
//     });
//     // etc ...
// });
