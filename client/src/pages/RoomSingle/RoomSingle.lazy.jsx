import { Suspense, lazy } from 'react';

const LazyRoomSingle = lazy(() => import('./RoomSingle'));

const RoomSingle = (props) => (
  <Suspense fallback={null}>
    <LazyRoomSingle {...props} />
  </Suspense>
);

export default RoomSingle;
