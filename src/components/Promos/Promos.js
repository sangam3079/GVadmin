import React from 'react';
import CustomLayout from '../CustomLayout/CustomLayout';
import { Tabs } from 'antd';

import PromoCode from '../../components/PromoCodes/PromoCodes';
import Redemptions from '../Redemptions/Redemptions';
import Invitation from '../../components/Invitations/Invitations';

const Promos = () => {
  const { TabPane } = Tabs;

  return (
    <CustomLayout sidebarSelectionKey='promos'>
      <Tabs defaultActiveKey='1' centered>
        <TabPane tab='Promo Codes' key='1'>
          <PromoCode />
        </TabPane>
        <TabPane tab='Redemption' key='2'>
          <Redemptions />
        </TabPane>
        <TabPane tab='Invitations' key='3'>
          <Invitation />
        </TabPane>
      </Tabs>
    </CustomLayout>
  );
};

export default Promos;
