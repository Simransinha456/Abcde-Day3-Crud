/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const HomePage = lazyLoad(
  () => import('.'),
  module => module.default,
);
