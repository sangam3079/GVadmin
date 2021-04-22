import * as actions from '../actions/UserCampaign/UserGroupsCampaignAction'

const initialState = {
    data: [],
    campaign: {},
    total: undefined,
    totalPage: undefined,
    currentPage: 1,
    keyword: undefined,
};

export default function userGroupsCampaignReducer(state = initialState, action) {
    let { payload } = action;
    switch (action.type) {
      case actions.ADD_NEW_USERGROUPSCAMPAIGN:
      const new_userGroupsCampaign_data = [payload, ...state.data];
      return {
        data: new_userGroupsCampaign_data,
      };
      case actions.SET_USERGROUPSCAMPAIGN_DATA:
        return {
          ...state,
          data: payload,
        };
      case actions.SET_USERGROUPSCAMPAIGN_META:
        return {
          ...state,
          total: payload.total,
          totalPage: payload.pages,
          currentPage: payload.page,
        };
      case actions.SET_USERGROUPSCAMPAIGN_CURRENTPAGE:
        return {
          ...state,
          currentPage: action.payload,
        };  
      case actions.DELETE_USERGROUPSCAMPAIGN:
        let data_without_deleted = state.data.filter((userGroupsCampaign) => {
          return userGroupsCampaign.id !== payload;
        });
  
        return {
          ...state,
          data: data_without_deleted,
        };  
      case actions.SET_USERGROUPSCAMPAIGN_KEYWORD:
        return {
          ...state,
          keyword: action.payload,
        }; 
      case actions.SET_USERGROUPSCAMPAIGN:
        return {
          ...state,
          campaign: payload,
        };  
      case actions.UPDATE_USERGROUPSCAMPAIGN:
        let updated_data = [];
        console.log('userGroupsCampaign data in reducer', payload);
        state.data.forEach((userGroupsCampaign, index) => {
          if (userGroupsCampaign.id === action.id) {
            updated_data = [...state.data];
            let updated_userGroupsCampaign = { ...updated_data[index] };
            updated_userGroupsCampaign = {
              ...updated_userGroupsCampaign,
              ...action.payload,
            };
            // console.log('updated userGroupsCampaign data in reducer', updated_userGroupsCampaign);
            console.log(
              'updated userGroupsCampaign data in reducer',
              userGroupsCampaign.id,
              action.id
            );
            updated_data[index] = updated_userGroupsCampaign;
          }
          console.log(
            'updated userGroupsCampaign data in reducer',
            userGroupsCampaign.id,
            userGroupsCampaign.status
          );
        });
        return {
          ...state,
          data: updated_data,
        };  

      default:
        return state;
    }
}