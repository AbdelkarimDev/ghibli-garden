const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/films.router/controller');

describe('films controller', () => {
    let data = null;
    let controller = null;
    const films = [1, 2, 3, 4];

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            films: {
                getAll() {
                    return Promise.resolve(films);
                },
            },
        };

        controller = init(data);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();
    });

    it('expect get all to return films', () => {
        return controller.getAll(req, res)
            .then(() => {
                expect(res.context).to.be.deep.equal({
                    context: films,
                });
                expect(res.viewName).to.be.equal('films/all');
            });
    });
});
