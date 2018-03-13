import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import nock from 'nock';
import reducer, { togglesActions, FETCH_TOGGLES_REQUEST, FETCH_TOGGLES_SUCCESS } from './counter';

require('isomorphic-fetch');

const mockStore = configureMockStore([apiMiddleware, thunk]);

describe('Toggles actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should dispatch "TOGGLES_SUCCESS" when fetchToggles is done', async () => {
    nock('http://localhost:3000')
      .get('/toggles')
      .reply(200, { toggle1: true, toggle2: false });

    const store = mockStore({});
    const expectedActions = [
      { type: FETCH_TOGGLES_REQUEST },
      { type: FETCH_TOGGLES_SUCCESS, payload: { toggle1: true, toggle2: false } },
    ];

    await store.dispatch(togglesActions.fetchToggles());

		expect(store.getActions()).toMatchObject(expectedActions);
  });
});

describe('Toggles reducer', () => {
  it('should append received company', () => {
    const result = reducer({}, {
      payload: { toggle1: true },
      type: FETCH_TOGGLES_SUCCESS,
    });

    expect(result.toggle1).toEqual(true);
  });
});
