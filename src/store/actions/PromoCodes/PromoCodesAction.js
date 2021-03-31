export const SET_PROMO_CODES_DATA = "SET_PROMO_CODES_DATA";
export const SET_PROMO_CODES_META = "SET_PROMO_CODES_META";
export const SET_PROMO_CODES = "SET_PROMO_CODES";
export const NEW_PROMO_CODES = "NEW_PROMO_CODES";
export const UPDATE_PROMO_CODES = "UPDATE_PROMO_CODES";
export const SET_PROMO_CODES_KEYWORD = "SET_PROMO_CODES_KEYWORD";
export const SET_PROMO_CODES_CURRENTPAGE = "SET_PROMO_CODES_CURRENTPAGE";
export const DELETE_PROMO_CODE = "DELETE_PROMO_CODE";

export function setPromoCodesData(payload) {
  return {
    type: SET_PROMO_CODES_DATA,
    payload,
  };
}

export function setMeta(payload) {
  return {
    type: SET_PROMO_CODES_META,
    payload: { ...payload },
  };
}

export function addPromoCodes(payload) {
  return {
    type: NEW_PROMO_CODES,
    payload,
  };
}

export function setPromoCodes(payload) {
  return {
    type: SET_PROMO_CODES,
    payload,
  };
}

export function promoCodesUpdate({ id, payload }) {
  return {
    type: UPDATE_PROMO_CODES,
    payload,
    id,
  };
}

export function setPromoCodesKeyword(payload) {
  return {
    type: SET_PROMO_CODES_KEYWORD,
    payload,
  };
}

export function setPromoCodesCurrentpage(payload) {
  return {
    type: SET_PROMO_CODES_CURRENTPAGE,
    payload,
  };
}

export function deletePromoCode(id) {
  return {
    type: DELETE_PROMO_CODE,
    payload: id,
  };
}
