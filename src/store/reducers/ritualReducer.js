import * as actions from '../actions/Ritual/RitualAction';
const initialState = {
  data: [],
  ritual: {},
  total: undefined,
  totalPage: undefined,
  currentPage: 1,
  keyword: undefined,
};

export default function ritualReducer(state = initialState, action) {
  let { payload } = action;
  switch (action.type) {
    case actions.SET_RITUAL_DATA:
      return {
        ...state,
        data: payload,
      };
    case actions.SET_RITUAL_META:
      return {
        ...state,
        ...payload,
      };
    case actions.DELETE_RITUAL:
      const clone = [...state.data];
      const dataWithoutDeleted = clone.filter(
        (ritual) => ritual.id !== payload
      );
      return {
        ...state,
        data: dataWithoutDeleted,
      };
    case actions.UPDATE_RITUAL:
      let updated_data = [];
      state.data.forEach((ritual, index) => {
        if (ritual.id === action.id) {
          updated_data = [...state.data];
          let updated_ritual = { ...updated_data[index] };
          updated_ritual = {
            ...updated_ritual,
            ...payload,
          };
          updated_data[index] = updated_ritual;
        }
      });
      return {
        ...state,
        data: updated_data,
      };
    case actions.SET_A_RITUAL:
      return {
        ...state,
        ritual: payload,
      };
    case actions.NEW_RITUAL:
      const new_data = [payload, ...state.data];
      return {
        data: new_data,
      };
    case actions.SET_RITUAL_CURRENTPAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case actions.SET_RITUAL_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    default:
      return state;
  }
}
