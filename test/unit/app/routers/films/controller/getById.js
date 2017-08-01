// getById(req, res, id) {
//     return data.films.findById(id)
//         .then((film) => {
//             return res.render('films/single', {
//                 context: film,
//             });
//         });
// },

const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/films.router/controller');

describe('films controller', () => {
    let data = null;
    let controller = null;
    const film = [{ film: 'totoro' }];

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            films: {
                findById(id) {
                    return Promise.resolve(film);
                },
            },
        };

        controller = init(data);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();
    });

    it('expect get by id to return film', () => {
        return controller.getById(req, res)
            .then(() => {
                expect(res.context).to.be.deep.equal({
                    context: film,
                });
                expect(res.viewName).to.be.equal('films/single');
            });
    });
});
