export const SET_INVITATIONS_DATA = "SET_INVITATIONS_DATA";
export const SET_INVITATIONS_META = "SET_INVITATIONS_META";
export const SET_INVITATIONS_KEYWORD = "SET_INVITATIONS_KEYWORD";
export const SET_INVITATIONS_CURRENTPAGE = "SET_INVITATIONS_CURRENTPAGE";

export function setInvitationsData(payload) {
  return {
    type: SET_INVITATIONS_DATA,
    payload,
  };
}
export function setMeta(payload) {
  return {
    type: SET_INVITATIONS_META,
    payload: { ...payload },
  };
}
export function setInvitationsKeyword(payload) {
  return {
    type: SET_INVITATIONS_KEYWORD,
    payload,
  };
}
export function setInvitationsCurrentpage(payload) {
  return {
    type: SET_INVITATIONS_CURRENTPAGE,
    payload,
  };
}
