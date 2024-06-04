import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IcChEmpty, IcChSelected, IcChTaken } from '../Icons';
import { Text } from '../Text';

import { bookSeats, getMovie } from '@/app/features/cinema/cinemaActions';

import {
  CinemaContainer,
  HallWrapper,
  Info,
  Screen,
  Seat,
  Seats,
  ShowCaseContainer,
} from './Hall.styled';

// Assuming `moiveTrueData` is passed as a prop or imported
const Hall = ({ data }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const dispatch = useDispatch();

  const handleSelectedState = useCallback((seatId) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId) ? prevSelectedSeats.filter((id) => id !== seatId) : [...prevSelectedSeats, seatId]
    );
  }, []);

  const handleBuySeats = async () => {
    const movieData = {
      seatIds: selectedSeats,
      movieId: data._id,
    };
    await dispatch(bookSeats(movieData));
    await dispatch(getMovie(data._id));
  };

  // const totalPrice = useMemo(() => selectedSeats.length * data.price, [selectedSeats, data]);

  return (
    <div className="container">
      <Text title={'Take available seats'} />
      <HallWrapper>
        <ShowCase />
        {/* <Movies movie={data} /> */}
        <Cinema movie={data} selectedSeats={selectedSeats} onSelectedSeatsChange={handleSelectedState} />
        {selectedSeats.length ? (
          <>
            <Info>
              You have selected <span>{selectedSeats.length}</span> seats
            </Info>
            <button onClick={handleBuySeats}>Buy Ticket</button>
          </>
        ) : null}
      </HallWrapper>
    </div>
  );
};
export default Hall;

// function Movies({ movie }) {
//   return (
//     <MoviesContainer>
//       <label htmlFor="movie">Movie:</label>
//       <MovieSelect id="movie" value={movie.title} disabled>
//         <option value={movie.title}>
//           {movie.title} (${movie.price})
//         </option>
//       </MovieSelect>
//     </MoviesContainer>
//   );
// }

function ShowCase() {
  return (
    <ShowCaseContainer>
      <li>
        <small className="empty">Available</small>
        <IcChEmpty />
      </li>
      <li>
        <small className="selected">Selected</small>
        <IcChSelected />
      </li>
      <li>
        <small className="taken">Taken</small>
        <IcChTaken />
      </li>
    </ShowCaseContainer>
  );
}

function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
  return (
    <CinemaContainer>
      <Screen $bg={movie.poster} />
      <Seats>
        {movie.seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat._id);
          const isOccupied = !seat.isAvailable;
          return (
            <Seat
              key={seat._id}
              tabIndex={!isOccupied ? 0 : undefined}
              onClick={!isOccupied ? () => onSelectedSeatsChange(seat._id) : undefined}
              onKeyPress={!isOccupied ? (e) => e.key === 'Enter' && onSelectedSeatsChange(seat._id) : undefined}
            >
              {isOccupied ? <IcChTaken /> : isSelected ? <IcChSelected className="selected" /> : <IcChEmpty className="empty" />}
            </Seat>
          );
        })}
      </Seats>
    </CinemaContainer>
  );
}
