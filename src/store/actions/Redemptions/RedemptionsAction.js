export const SET_REDEMPTIONS_DATA = "SET_REDEMPTIONS_DATA";
export const SET_REDEMPTIONS_META = "SET_REDEMPTIONS_META";
export const SET_REDEMPTIONS_KEYWORD = "SET_REDEMPTIONS_KEYWORD";
export const SET_REDEMPTIONS_CURRENTPAGE = "SET_REDEMPTIONS_CURRENTPAGE";

export function setRedemptionsData(payload) {
  return {
    type: SET_REDEMPTIONS_DATA,
    payload,
  };
}
export function setMeta(payload) {
  return {
    type: SET_REDEMPTIONS_META,
    payload: { ...payload },
  };
}
export function setRedemptionsKeyword(payload) {
  return {
    type: SET_REDEMPTIONS_KEYWORD,
    payload,
  };
}
export function setRedemptionsCurrentpage(payload) {
  return {
    type: SET_REDEMPTIONS_CURRENTPAGE,
    payload,
  };
}
