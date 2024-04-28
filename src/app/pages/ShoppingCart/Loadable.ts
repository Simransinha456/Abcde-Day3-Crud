/**
 *
 * Asynchronously loads the component for ShoppingCart
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ShoppingCart = lazyLoad(
  () => import('./index'),
  module => module.ShoppingCart,
);
