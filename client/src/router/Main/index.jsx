import { Route } from 'react-router-dom';

import { NOT_FOUND_PAGE, ROOM_SINGLE, SEATS } from './paths';
import { Layout } from '@/layout/Main';
import { Movie, NotFoundPage, Room, RoomSingle } from '@/pages';

export const MainRoute = () => {
  return (
    <Route path={'/'} element={<Layout />}>
      <Route index element={<Room />} />
      <Route path={ROOM_SINGLE} element={<RoomSingle />} />
      <Route path={SEATS} element={<Movie />}></Route>
      {/* <Route path={SEATS} element={<Seats />} /> */}
      {/* Routes only for non-authenticated users */}
      {/* <Route element={<PublicRoute />}>
        <Route path={LOGIN} element={<Login />} />
      </Route> */}
      <Route path={NOT_FOUND_PAGE} element={<NotFoundPage />} />
    </Route>
  );
};
