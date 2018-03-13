import { RSAA } from 'redux-api-middleware';

// Action Types
export const FETCH_TOGGLES_REQUEST = 'toggles/togglesPending';
export const FETCH_TOGGLES_SUCCESS = 'toggles/togglesSuccess';
export const FETCH_TOGGLES_ERROR = 'toggles/togglesError';

// Action Creators
export const fetchToggles = () => ({
  [RSAA]: {
    endpoint: 'http://localhost:3000/toggles',
    method: 'GET',
    types: [FETCH_TOGGLES_REQUEST, FETCH_TOGGLES_SUCCESS, FETCH_TOGGLES_ERROR],
  },
});

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TOGGLES_REQUEST:
      return { ...state, pending: true };
    case FETCH_TOGGLES_SUCCESS:
      return { ...state, ...action.payload, pending: false };
    case FETCH_TOGGLES_ERROR:
      return { pending: false };
    default:
      return { ...state };
  }
};
// Exports
export default reducer;

const togglesActions = {
  fetchToggles,
};

export { togglesActions };
