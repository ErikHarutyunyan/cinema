import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Seats } from '..';
import movieBg from '../../assets/img/movieBg2.jpg';

import { Back } from '@/components/Back';
import { Banner } from '@/components/Banner';
import { CreateMovie } from '@/components/CreateMovie';
import { IcEdit } from '@/components/Icons';
import { Loading } from '@/components/Loading';
import { Modal } from '@/components/Modal';

import { getMovie } from '@/app/features/cinema/cinemaActions';
import { selectCinema } from '@/app/features/cinema/cinemaSlice';

import { MovieWrapper } from './Movie.styled';

const Movie = () => {
  const sectionRef = useRef(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const { movie, movies, loading } = useSelector(selectCinema);
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetchCurrentMovie = () => {
    dispatch(getMovie(id));
  };
  useEffect(() => {
    try {
      fetchCurrentMovie();
    } catch (error) {
      console.error('Failed to fetch or movie data:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleScroll = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading || !movie) return <Loading />;
  return (
    <>
      <MovieWrapper $bg={movie?.poster}>
        <Banner bg={movieBg}></Banner>
        <div className="movie-content container">
          <div className="movie-content__poster">
            <div className="movie-content__poster__img"></div>
          </div>
          <div className="movie-content__info">
            <h1 className="title">{movie?.title}</h1>
            <p className="overview">{movie?.description}</p>
            <div className="action">
              <Back path={-1} />
              <button className="action__item" onClick={() => handleScroll()}>
                Get Available Ticket
              </button>
            </div>
          </div>
          <div className="movie-content__edit" onClick={handleOpenModal}>
            <IcEdit className={'iconEdit'} />
          </div>
        </div>
      </MovieWrapper>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreateMovie
          id={movie?._id}
          data={movie}
          initialEvents={movies}
          callBack={() => {
            handleCloseModal();
            fetchCurrentMovie();
          }}
        />
      </Modal>
      <Seats refProps={sectionRef} data={movie} />
    </>
  );
};

export default Movie;
