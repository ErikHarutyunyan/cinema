import { Suspense, lazy } from 'react';

const LazyMovie = lazy(() => import('./Movie'));

const Movie = (props) => (
  <Suspense fallback={null}>
    <LazyMovie {...props} />
  </Suspense>
);

export default Movie;
