import { getApiCall, postApiCall, urlWithParams } from "./url";
import { message } from "antd";

import { playlistsUrl } from "./url";
import { apiEndpoint } from "services/constants";
import {
  setAPlaylist,
  setPlayListData,
  setPlaylistMeta,
  playlistDelete,
  playlistUpdate,
  addPlaylist,
} from "store/actions/Playlist/PlaylistAction";

const baseUrlPlaylist = `${apiEndpoint}/${playlistsUrl}`;

export const getAllPlayList = (obj) => {
  const { callback, params,prevPlaylistKeyword } = obj;
  const url = urlWithParams(baseUrlPlaylist, params);
  return async (dispatch) => {

    if(prevPlaylistKeyword !== undefined){
      try {
        const response = await getApiCall({ url, dispatch,abort:true});
          if (!!response) {
            const { data, page_meta } = response;
            dispatch(setPlayListData(data));
            dispatch(
              setPlaylistMeta({
                page: page_meta.current_page,
                pages: page_meta.total / page_meta.per_page,
                total: page_meta.total,
              })
            );
          }else if(response===undefined){
            console.log('[Previous keyword search aborted], getApiCall response:',response)
          } else {
            message.error("Could not fetch playlist. Something went wrong");
          }
        } catch (err) {
          console.warn(err);
        } finally {
          callback && callback();
      }
    }else if(prevPlaylistKeyword === undefined){
      try {
        const response = await getApiCall({ url, dispatch,abort:false });
          if (!!response) {
            const { data, page_meta } = response;
            dispatch(setPlayListData(data));
            dispatch(
              setPlaylistMeta({
                page: page_meta.current_page,
                pages: page_meta.total / page_meta.per_page,
                total: page_meta.total,
              })
            );
          }else if(response===undefined){
            console.log('[Previous keyword search aborted], getApiCall response:',response)
          } else {
            message.error("Could not fetch playlist. Something went wrong");
          }
        } catch (err) {
          console.warn(err);
        } finally {
          callback && callback();
        }
    }

  };
};

export const getPlaylist = (obj) => {
  const { id, callback } = obj;
  const url = `${baseUrlPlaylist}/${id}`;
  return async (dispatch) => {
    const response = await getApiCall({ url, dispatch });
    try {
      if (!!response) {
        dispatch(setAPlaylist(response.data));
      } else {
        message.error("Something went wrong on the server side");
      }
    } catch (err) {
      console.warn(err);
    } finally {
      callback && callback();
    }
  };
};

export const deletePlaylist = (obj) => {
  const { id, callback } = obj;
  const url = `${baseUrlPlaylist}/${id}`;
  return (dispatch) => {
    try {
      const response = postApiCall({ dispatch, method: "DELETE", url });
      if (!!response) {
        dispatch(playlistDelete(id));
        message.success("Successfully deleted a playlist");
      } else {
        message.error("Sorry could not delete playlist. Something went wrong");
      }
    } catch (err) {
      console.warn(err);
    } finally {
      callback && callback();
    }
  };
};

export const newPlaylist = ({ body, callback, playables, final }) => {
  const url = baseUrlPlaylist;
  return async (dispatch) => {
    try {
      const response = await postApiCall({
        dispatch,
        method: "POST",
        url,
        body,
      });
      if (!!response) {
        dispatch(addPlaylist(response.data));

        if (playables.keys().next().value) {
          dispatch(
            createPlayables({ id: response.data.id, body: playables, callback })
          );
        } else {
          callback();
        }
        message.success("Successfully added a playlist");
      }
    } catch (err) {
      console.warn(err);
    } finally {
      final();
    }
  };
};

export const updatePlaylist = ({ id, body, callback, playables, final }) => {
  const url = `${baseUrlPlaylist}/${id}`;
  return async (dispatch) => {
    try {
      const response = await postApiCall({
        dispatch,
        method: "PUT",
        url,
        body,
      });
      if (!!response) {
        dispatch(playlistUpdate({ id, payload: body }));
        if (playables.keys().next().value) {
          dispatch(createPlayables({ id, body: playables, callback }));
        } else {
          callback();
        }
        message.success("Successfully updated playlist.");
      }
    } catch (err) {
      console.warn(err);
    } finally {
      final();
    }
  };
};

export const createPlayables = ({ id, body, callback }) => {
  const url = `${apiEndpoint}/playables?playlist_id=${id}`;
  return async (dispatch) => {
    try {
      const response = await postApiCall({
        dispatch,
        method: "POST",
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
  const url = `${apiEndpoint}/playables?playlist_id=${id}`;
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
