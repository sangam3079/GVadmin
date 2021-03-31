/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import {css} from 'styled-components'

// screenSmallerThan.desktop
// adjust sizes accordingly for now 1024, 768 and 576 sizes are used
const sizes = {
  desktop: 1024,
  tablet : 768,
  phone  : 576,
}

const screenSmallerThan = Object.keys(sizes).reduce(
  (accumulator, label) => {
    const emSize = sizes[label] / 16;
    accumulator[label] = (...args: any) => css`
      @media (max-width: ${emSize}em) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);

const screenLargerThan = Object.keys(sizes).reduce(
  (accumulator, label) => {
    const emSize = sizes[label] / 16;
    accumulator[label] = (...args: any) => css`
      @media (min-width: ${emSize}em) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);

export {screenSmallerThan, screenLargerThan}
