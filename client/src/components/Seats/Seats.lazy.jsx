import { Suspense, lazy } from 'react';

const LazySeats = lazy(() => import('./Seats'));

const Seats = (props) => (
  <Suspense fallback={null}>
    <LazySeats {...props} />
  </Suspense>
);

export default Seats;
