import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from 'commons/Route';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';
import Authentication from 'components/Authentication';
import { UserProvider } from 'contexts/UserContext';

import '../../global.scss';

import {
  DASHBOARD,
  CUSTOMERS,
  COMPOSERS,
  EMAIL_MARKETINGS,
  TRACKS,
  CATEGORIES,
  GENRES,
  DOWNLOAD,
  SUBSCRIPTIONS,
  SLIDER,
  SETTINGS,
  LOGS,
  // NOTIFICATIONS,
  CAMPAIGN,
  PLAYLISTS,
  RITUALS,
  TAGS,
  TAGS_GROUP,
  PROMOS,
  PROMO_CODE,
  INVITATIONS,
  REDEMPTIONS,
} from 'constants/routes';

import Dashboard from '../../components/Dashboard';
import Customers from '../../components/Customers/Customers';
import Composers from '../../components/Composers/Composers';
import EmailMarketings from '../../components/EmailMarketings';
import Tracks from '../../components/Tracks/Tracks';
import Categories from '../../components/Categories/Categories';
import Genres from '../../components/Genres/Genres';
import Subscriptions from '../../components/Subscriptions/Subscriptions';
import Slider from '../../components/Slider';
import Settings from '../../components/Settings';
import Logs from '../../components/Logs/Logs';
// import Notifications from '../../components/Notifications/Notifications';
import Campaign from '../Campaign/Campaign';
import Downloads from '../../components/Downloads/Download';
import Playlist from 'components/Playlists';
import Ritual from '../../components/Rituals';
import Tags from 'components/Tags/TagsIndex';
import Promos from '../../components/Promos/Promos';
import PromoCode from '../../components/PromoCodes/PromoCodes';
import Redemptions from '../Redemptions/Redemptions';
import Invitation from '../../components/Invitations/Invitations';

import CustomerForm from '../Customers/Form';
import ComposerForm from '../Composers/Form';
import PromoCodeForm from '../PromoCodes/Form';
import TrackForm from '../Tracks/Form';
import GenreForm from '../Genres/Form';
import CategoryForm from '../Categories/Form';
import SubscriptionForm from '../Subscriptions/Form';
// import NotificationForm from '../Notifications/Form';
import PlaylistForm from '../Playlists/Form';
import RitualForm from '../Rituals/Form';
import CampaignForm from '../Campaign/Form';

import TagForm from 'components/Tags/TagForm';
import TagGroupForm from 'components/Tags/TagGroupForm';

function App({ history }) {
  return (
    <UserProvider history={history}>
      <ToastContainer
        autoClose={3000}
        closeButton={false}
        transition={Slide}
        hideProgressBar
        draggable={false}
        position='top-right'
        toastClassName='toast-inner-container'
        className='toast-container'
      />

      <Switch>
        <Redirect exact from='/' to={DASHBOARD} />
        <PublicRoute restricted path='/auth' component={Authentication} />
        <PrivateRoute exact path={CUSTOMERS.NEW} component={CustomerForm} />
        <PrivateRoute exact path={CUSTOMERS.EDIT} component={CustomerForm} />
        <PrivateRoute exact path={PROMO_CODE.NEW} component={PromoCodeForm} />
        <PrivateRoute exact path={PROMO_CODE.EDIT} component={PromoCodeForm} />
        <PrivateRoute exact path={COMPOSERS.NEW} component={ComposerForm} />
        <PrivateRoute exact path={COMPOSERS.EDIT} component={ComposerForm} />
        <PrivateRoute exact path={TRACKS.NEW} component={TrackForm} />
        <PrivateRoute exact path={TRACKS.EDIT} component={TrackForm} />
        <PrivateRoute exact path={CATEGORIES.NEW} component={CategoryForm} />
        <PrivateRoute exact path={CATEGORIES.EDIT} component={CategoryForm} />
        <PrivateRoute exact path={GENRES.NEW} component={GenreForm} />
        <PrivateRoute exact path={GENRES.EDIT} component={GenreForm} />
        <PrivateRoute
          exact
          path={SUBSCRIPTIONS.NEW}
          component={SubscriptionForm}
        />
        <PrivateRoute
          exact
          path={SUBSCRIPTIONS.EDIT}
          component={SubscriptionForm}
        />
        {/* <PrivateRoute
          exact
          path={NOTIFICATIONS.EDIT}
          component={NotificationForm}
        />
        <PrivateRoute
          exact
          path={NOTIFICATIONS.NEW}
          component={NotificationForm}
        /> */}
        <PrivateRoute exact path={PLAYLISTS.EDIT} component={PlaylistForm} />
        <PrivateRoute exact path={PLAYLISTS.NEW} component={PlaylistForm} />
        <PrivateRoute exact path={RITUALS.EDIT} component={RitualForm} />
        <PrivateRoute exact path={RITUALS.NEW} component={RitualForm} />
        <PrivateRoute exact path={CAMPAIGN.EDIT} component={CampaignForm} />
        <PrivateRoute exact path={CAMPAIGN.NEW} component={CampaignForm} />
        <PrivateRoute exact path={TAGS.EDIT} component={TagForm} />
        <PrivateRoute exact path={TAGS.NEW} component={TagForm} />
        <PrivateRoute exact path={TAGS_GROUP.EDIT} component={TagGroupForm} />
        <PrivateRoute exact path={TAGS_GROUP.NEW} component={TagGroupForm} />

        <PrivateRoute path={DASHBOARD} component={Dashboard} />
        <PrivateRoute path={CUSTOMERS.INDEX} component={Customers} />
        <PrivateRoute path={COMPOSERS.INDEX} component={Composers} />
        <PrivateRoute path={PROMOS.INDEX} component={Promos} />
        <PrivateRoute path={PROMO_CODE.INDEX} component={PromoCode} />
        <PrivateRoute path={REDEMPTIONS.INDEX} component={Redemptions} />
        <PrivateRoute path={INVITATIONS.INDEX} component={Invitation} />
        <PrivateRoute
          path={EMAIL_MARKETINGS.INDEX}
          component={EmailMarketings}
        />
        <PrivateRoute path={TRACKS.INDEX} component={Tracks} />
        <PrivateRoute path={CATEGORIES.INDEX} component={Categories} />
        <PrivateRoute path={GENRES.INDEX} component={Genres} />
        {/* <PrivateRoute path={NOTIFICATIONS.INDEX} component={Notifications} /> */}
        <PrivateRoute path={CAMPAIGN.INDEX} component={Campaign} />
        <PrivateRoute path={SUBSCRIPTIONS.INDEX} component={Subscriptions} />
        <PrivateRoute path={DOWNLOAD.INDEX} component={Downloads} />
        <PrivateRoute path={PLAYLISTS.INDEX} component={Playlist} />
        <PrivateRoute path={RITUALS.INDEX} component={Ritual} />
        <PrivateRoute path={SLIDER} component={Slider} />
        <PrivateRoute path={SETTINGS} component={Settings} />
        <PrivateRoute path={LOGS} component={Logs} />
        <PrivateRoute path={TAGS} component={Tags} />
      </Switch>
    </UserProvider>
  );
}

App.propTypes = {
  history: PropTypes.object,
};

export default withRouter(App);
