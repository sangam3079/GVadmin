import * as actions from "../actions/Invitations/InvitationsAction";
const initialState = {
  data: [],
  total: undefined,
  totalPage: undefined,
  currentPage: 1,
  keyword: undefined,
};

export default function invitationsReducer(state = initialState, action) {
  let { payload } = action;
  switch (action.type) {
    case actions.SET_INVITATIONS_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case actions.SET_INVITATIONS_META:
      return {
        ...state,
        total: payload.total,
        totalPage: payload.pages,
        currentPage: payload.page,
      };
    case actions.SET_INVITATIONS_CURRENTPAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case actions.SET_INVITATIONS_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    default:
      return state;
  }
}
