/**
 *
 * Asynchronously loads the component for Usermap
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
