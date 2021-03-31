import { getApiCall, postApiCall, urlWithParams } from './url';

import { genresUrl } from './url';
import { apiEndpoint } from 'services/constants';
import {
  setGenreData,
  setMeta,
  genreDelete,
  setAGenre,
  addGenre,
  genreUpdate,
} from 'store/actions/Genre/GenreAction';
import { message } from 'antd';

export const getAllgenres = (obj) => {
  let { callback, params, prevSearchKeyword } = obj;
  let url = urlWithParams(`${apiEndpoint}/${genresUrl}`, params);
  return (dispatch) => {
    if (prevSearchKeyword !== undefined) {
      getApiCall({ url, dispatch, abort: true })
        .then((resp) => {
          if (resp !== 0 && resp !== undefined) {
            let { data, page_meta } = resp;
            dispatch(setGenreData(data));
            dispatch(
              setMeta({
                page: page_meta.current_page,
                pages: page_meta.total / page_meta.per_page,
                total: page_meta.total,
              })
            );
          } else if (resp === undefined) {
            console.log('getAllCustomers response:', resp);
          } else {
            message.error('Could not fetch genre. Something went wrong');
          }
        })
        .catch((err) => console.log(err))
        .finally(() => callback());
    } else if (prevSearchKeyword === undefined) {
      getApiCall({ url, dispatch, abort: false })
        .then((resp) => {
          if (resp !== 0 && resp !== undefined) {
            let { data, page_meta } = resp;
            dispatch(setGenreData(data));
            dispatch(
              setMeta({
                page: page_meta.current_page,
                pages: page_meta.total / page_meta.per_page,
                total: page_meta.total,
              })
            );
          } else if (resp === undefined) {
            console.log('getAllCustomers response:', resp);
          } else {
            message.error('Could not fetch genre. Something went wrong');
          }
        })
        .catch((err) => console.log(err))
        .finally(() => callback());
    }
  };
};

export const getGenre = (obj) => {
  let { id, callback } = obj;
  let url = `${apiEndpoint}/${genresUrl}/${id}`;
  return (dispatch) => {
    getApiCall({ url, dispatch })
      .then((resp) => {
        if (resp !== 0) {
          dispatch(setAGenre(resp.data));
        } else {
          message.error('Something went wrong on server side');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => callback());
  };
};

export const deleteGenre = (obj) => {
  let { id, callback } = obj;
  let url = `${apiEndpoint}/${genresUrl}/${id}`;
  return (dispatch) => {
    postApiCall({ dispatch, method: 'DELETE', url })
      .then((resp) => {
        if (resp !== 0) {
          dispatch(genreDelete(id));
          message.success('Sucessfully deleted a genre');
        } else {
          message.error('Sorry could not delete genre. Something went wrong');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => callback());
  };
};

export const newGenre = ({ body, callback }) => {
  let url = `${apiEndpoint}/${genresUrl}`;
  return (dispatch) => {
    postApiCall({ dispatch, method: 'POST', url, body })
      .then((resp) => {
        if (resp !== 0) {
          dispatch(addGenre(resp.data));
          message.success('Sucessfully added a genre');
        } else {
          message.error('Sorry couldnot add a genre. Something went wrong');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => callback());
  };
};

export const updateGenre = ({ id, body, callback }) => {
  console.log(body);
  let url = `${apiEndpoint}/${genresUrl}/${id}`;
  return (dispatch) => {
    postApiCall({ dispatch, method: 'PUT', url, body })
      .then((resp) => {
        if (resp !== 0) {
          console.log(resp);
          dispatch(genreUpdate({ id, payload: body }));
          message.success('Sucessfully updated genre.');
        } else {
          message.error('Sorry couldnot updated genre. Something went wrong');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => callback());
  };
};
