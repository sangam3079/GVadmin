export const SET_RITUAL_DATA = 'SET_RITUAL_DATA';
export const SET_A_RITUAL = 'SET_A_RITUAL';
export const SET_RITUAL_META = 'SET_RITUAL_META';
export const DELETE_RITUAL = 'DELETE_RITUAL';
export const NEW_RITUAL = 'NEW_RITUAL';
export const UPDATE_RITUAL = 'UPDATE_RITUAL';
export const SET_RITUAL_KEYWORD = 'SET_RITUAL_KEYWORD';
export const SET_RITUAL_CURRENTPAGE = 'SET_RITUAL_CURRENTPAGE';

export function setRitualData(payload) {
  return {
    type: SET_RITUAL_DATA,
    payload,
  };
}

export function setRitualMeta(payload) {
  return {
    type: SET_RITUAL_META,
    payload,
  };
}

export function setARitual(payload) {
  return {
    type: SET_A_RITUAL,
    payload,
  };
}

export function ritualDelete(id) {
  return {
    type: DELETE_RITUAL,
    payload: id,
  };
}

export function addRitual(payload) {
  return {
    type: NEW_RITUAL,
    payload,
  };
}

export function ritualUpdate(payload) {
  return {
    type: UPDATE_RITUAL,
    payload,
  };
}

export function setRitualKeyword(payload) {
  return {
    type: SET_RITUAL_KEYWORD,
    payload,
  };
}

export function setRitualCurrentpage(payload) {
  return {
    type: SET_RITUAL_CURRENTPAGE,
    payload,
  };
}
