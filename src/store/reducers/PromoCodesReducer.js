import * as actions from "../actions/PromoCodes/PromoCodesAction";
const initialState = {
  data: [],
  promoCodes: {},
  total: undefined,
  totalPage: undefined,
  currentPage: 1,
  keyword: undefined,
};

export default function promoCodesReducer(state = initialState, action) {
  let { payload } = action;
  switch (action.type) {
    case actions.SET_PROMO_CODES_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case actions.SET_PROMO_CODES_META:
      return {
        ...state,
        total: payload.total,
        totalPage: payload.pages,
        currentPage: payload.page,
      };
    case actions.UPDATE_PROMO_CODES:
      let updated_data = [];
      state.data.forEach((promoCodes, index) => {
        if (promoCodes.id === action.id) {
          updated_data = [...state.data];
          let updated_promoCodes = { ...updated_data[index] };
          updated_promoCodes = {
            ...updated_promoCodes,
            ...action.payload,
          };
          updated_data[index] = updated_promoCodes;
        }
      });
      return {
        ...state,
        data: updated_data,
      };
    case actions.SET_PROMO_CODES:
      return {
        ...state,
        promoCodes: payload,
      };
    case actions.NEW_PROMO_CODES:
      let new_data = [action.payload, ...state.data];
      return {
        ...state,
        data: new_data,
      };
    case actions.DELETE_PROMO_CODE:
      let clone = [...state.data];
      let dataWithoutDeleted = clone.filter(
        (promo) => promo.id !== action.payload
      );
      return {
        ...state,
        data: dataWithoutDeleted,
      };
    case actions.SET_PROMO_CODES_CURRENTPAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case actions.SET_PROMO_CODES_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    default:
      return state;
  }
}
