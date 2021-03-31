/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'

export default (mutation, callback) => {
  const [saving, changeSaving] = useState(false),
    mutate = useMutation(mutation);

  const update = async variables => {
    try {
      changeSaving(true);
      await mutate(variables);
      if (callback) callback();
    } catch (e) {
      throw e
    } finally {
      changeSaving(false);
    }
  };

  return { saving, update }
};
