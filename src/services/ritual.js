import { getApiCall, postApiCall, urlWithParams } from './url';
import { message } from 'antd';

import { ritualsUrl } from './url';
import { apiEndpoint } from 'services/constants';
import {
  setARitual,
  setRitualData,
  setRitualMeta,
  ritualDelete,
  ritualUpdate,
  addRitual,
} from 'store/actions/Ritual/RitualAction';

const baseUrlRitual = `${apiEndpoint}/${ritualsUrl}`;

export const getAllRitual = (obj) => {
  const { callback, params, prevRitualKeyword } = obj;
  const url = urlWithParams(baseUrlRitual, params);
  return async (dispatch) => {
    if (prevRitualKeyword !== undefined) {
      try {
        const response = await getApiCall({ url, dispatch, abort: true });
        if (!!response) {
          const { data, page_meta } = response;
          dispatch(setRitualData(data));
          dispatch(
            setRitualMeta({
              page: page_meta.current_page,
              pages: page_meta.total / page_meta.per_page,
              total: page_meta.total,
            })
          );
        } else if (response === undefined) {
          console.log(
            '[Previous keyword search aborted], getApiCall response:',
            response
          );
        } else {
          message.error('Could not fetch Ritual. Something went wrong');
        }
      } catch (err) {
        console.warn(err);
      } finally {
        callback && callback();
      }
    } else if (prevRitualKeyword === undefined) {
      try {
        const response = await getApiCall({ url, dispatch, abort: false });
        if (!!response) {
          const { data, page_meta } = response;
          dispatch(setRitualData(data));
          dispatch(
            setRitualMeta({
              page: page_meta.current_page,
              pages: page_meta.total / page_meta.per_page,
              total: page_meta.total,
            })
          );
        } else if (response === undefined) {
          console.log(
            '[Previous keyword search aborted], getApiCall response:',
            response
          );
        } else {
          message.error('Could not fetch Ritual. Something went wrong');
        }
      } catch (err) {
        console.warn(err);
      } finally {
        callback && callback();
      }
    }
  };
};

export const getRitual = (obj) => {
  const { id, callback } = obj;
  const url = `${baseUrlRitual}/${id}`;
  return async (dispatch) => {
    const response = await getApiCall({ url, dispatch });
    try {
      if (!!response) {
        dispatch(setARitual(response.data));
      } else {
        message.error('Something went wrong on the server side');
      }
    } catch (err) {
      console.warn(err);
    } finally {
      callback && callback();
    }
  };
};

export const deleteRitual = (obj) => {
  const { id, callback } = obj;
  const url = `${baseUrlRitual}/${id}`;
  return (dispatch) => {
    try {
      const response = postApiCall({ dispatch, method: 'DELETE', url });
      if (!!response) {
        dispatch(ritualDelete(id));
        message.success('Successfully deleted a Ritual');
      } else {
        message.error('Sorry could not delete Ritual. Something went wrong');
      }
    } catch (err) {
      console.warn(err);
    } finally {
      callback && callback();
    }
  };
};

export const newRitual = ({ body, callback, playables, final }) => {
  const url = baseUrlRitual;
  return async (dispatch) => {
    try {
      const response = await postApiCall({
        dispatch,
        method: 'POST',
        url,
        body,
      });
      if (!!response) {
        dispatch(addRitual(response.data));

        if (playables.keys().next().value) {
          dispatch(
            createPlayables({ id: response.data.id, body: playables, callback })
          );
        } else {
          callback();
        }
        message.success('Successfully added a Ritual');
      }
    } catch (err) {
      console.warn(err);
    } finally {
      final();
    }
  };
};

export const updateRitual = ({ id, body, callback, playables, final }) => {
  const url = `${baseUrlRitual}/${id}`;
  return async (dispatch) => {
    try {
      const response = await postApiCall({
        dispatch,
        method: 'PUT',
        url,
        body,
      });
      if (!!response) {
        dispatch(ritualUpdate({ id, payload: body }));
        if (playables.keys().next().value) {
          dispatch(createPlayables({ id, body: playables, callback }));
        } else {
          callback();
        }
        message.success('Successfully updated Ritual.');
      }
    } catch (err) {
      console.warn(err);
    } finally {
      final();
    }
  };
};

export const createPlayables = ({ id, body, callback }) => {
  const url = `${apiEndpoint}/playables?ritual_id=${id}`;
  return async (dispatch) => {
    try {
      const response = await postApiCall({
        dispatch,
        method: 'POST',
        url,
        body,
      });
      if (!!response) {
        callback();
      }
    } catch (err) {
      console.warn(err);
    }
  };
};

export const getPlayables = ({ id, callback }) => {
  const url = `${apiEndpoint}/playables?ritual_id=${id}`;
  return (dispatch) => {
    getApiCall({ dispatch, id, url })
      .then((resp) => {
        if (resp !== 0) {
          callback(resp.data);
        }
      })
      .catch((err) => console.log(err));
  };
};
