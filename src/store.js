import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Sidebar from 'store/reducers/SidebarReducer';
import Track from 'store/reducers/TrackReducer';
import Profile from 'store/reducers/ProfileReducer';
import Category from 'store/reducers/CategoryReducer';
import Composition from 'store/reducers/CompositionReducer';
import Customer from 'store/reducers/CustomerReducer';
import Genre from 'store/reducers/GenreReducer';
import Subscription from 'store/reducers/SubscriptionReducer';
import Log from 'store/reducers/LogReducer';
import SubscriptionLog from 'store/reducers/SubscriptionLogReducer';
import Notification from 'store/reducers/NotificationReducer';
import Download from 'store/reducers/DownloadReducer';
import UploadPercentage from 'store/reducers/UploadPercentageReducer';
import Tag from 'store/reducers/TagsReducer';
import TagGroup from 'store/reducers/TagsGroupReducer';
import Playlist from 'store/reducers/playlistReducer';
import Ritual from 'store/reducers/ritualReducer';
import Campaign from 'store/reducers/CampaignReducer';
import PromoCodes from 'store/reducers/PromoCodesReducer';
import Invitations from 'store/reducers/InvitationsReducer';
import Redemptions from 'store/reducers/RedemptionsReducer';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  form: formReducer,
  Sidebar,
  Track,
  Profile,
  Customer,
  Category,
  Composition,
  Genre,
  Subscription,
  Log,
  Notification,
  Download,
  SubscriptionLog,
  UploadPercentage,
  Playlist,
  Ritual,
  Campaign,
  Tag,
  TagGroup,
  PromoCodes,
  Invitations,
  Redemptions,
});

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

export default store;
