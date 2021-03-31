import * as actions from "../actions/Redemptions/RedemptionsAction";
const initialState = {
  data: [],
  total: undefined,
  totalPage: undefined,
  currentPage: 1,
  keyword: undefined,
};

export default function redemptionsReducer(state = initialState, action) {
  let { payload } = action;
  switch (action.type) {
    case actions.SET_REDEMPTIONS_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case actions.SET_REDEMPTIONS_META:
      return {
        ...state,
        total: payload.total,
        totalPage: payload.pages,
        currentPage: payload.page,
      };
    case actions.SET_REDEMPTIONS_CURRENTPAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case actions.SET_REDEMPTIONS_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    default:
      return state;
  }
}
