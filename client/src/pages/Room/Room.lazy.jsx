import { Suspense, lazy } from 'react';

const LazyRoom = lazy(() => import('./Room'));

const Room = (props) => (
  <Suspense fallback={null}>
    <LazyRoom {...props} />
  </Suspense>
);

export default Room;
