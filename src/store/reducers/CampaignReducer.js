import * as actions from '../actions/Campaign/CampaignAction';

const initialState = {
  data: [],
  campaign: {},
  total: undefined,
  totalPage: undefined,
  currentPage: 1,
  keyword: undefined,
};

export default function campaignReducer(state = initialState, action) {
  let { payload } = action;
  switch (action.type) {
    case actions.ADD_NEW_CAMPAIGN:
      const new_campaign_data = [payload, ...state.data];
      return {
        data: new_campaign_data,
      };
    case actions.SET_CAMPAIGN_DATA:
      return {
        ...state,
        data: payload,
      };
    case actions.SET_CAMPAIGN_META:
      return {
        ...state,
        total: payload.total,
        totalPage: payload.pages,
        currentPage: payload.page,
      };
    case actions.SET_CAMPAIGN_CURRENTPAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case actions.DELETE_CAMPAIGN:
      let data_without_deleted = state.data.filter((campaign) => {
        return campaign.id !== payload;
      });

      return {
        ...state,
        data: data_without_deleted,
      };
    case actions.SET_CAMPAIGN_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    case actions.SET_CAMPAIGN:
      return {
        ...state,
        campaign: payload,
      };
    case actions.UPDATE_CAMPAIGN:
      let updated_data = [];
      console.log('campaign data in reducer', payload);
      state.data.forEach((campaign, index) => {
        if (campaign.id === action.id) {
          updated_data = [...state.data];
          let updated_campaign = { ...updated_data[index] };
          updated_campaign = {
            ...updated_campaign,
            ...action.payload,
          };
          // console.log('updated campaign data in reducer', updated_campaign);
          console.log(
            'updated campaign data in reducer',
            campaign.id,
            action.id
          );
          updated_data[index] = updated_campaign;
        }
        console.log(
          'updated campaign data in reducer',
          campaign.id,
          campaign.status
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
