import { Link } from 'react-router-dom';

import { CardBox, CardWrapper } from './Card.styled';

const Card = ({ movies, title, state, link, poster, trash }) => {
  return (
    <Link to={link} state={state}>
      <CardWrapper $room $bg={!movies && poster}>
        <CardBox className="cardBox" $bg={!movies && poster}>
          <div className={!movies ? 'movieTitle' : 'title'}>
            <h3>{title}</h3>
            {trash && trash}
          </div>
          {movies && (
            <div className="quantity">
              <p>Movies</p>
              <p className="number">{movies.length}</p>
            </div>
          )}
        </CardBox>
      </CardWrapper>
    </Link>
  );
};

export default Card;
