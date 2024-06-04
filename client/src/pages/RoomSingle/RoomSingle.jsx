import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import roomBg from '../../assets/img/roomBg.jpg';
import { Pagination } from '../Room/Room.styled';

import { Back } from '@/components/Back';
import { Banner } from '@/components/Banner';
import { Card } from '@/components/Card';
import { Confirm } from '@/components/Confirm';
import { CreateMovie } from '@/components/CreateMovie';
import { IcCheck, IcEdit, IcTrash } from '@/components/Icons';
import { List } from '@/components/List';
import { Loading } from '@/components/Loading';
import { Modal } from '@/components/Modal';
import { Text } from '@/components/Text';

import { deleteMovie, getRoomById, getRooms, updateRoomName } from '@/app/features/cinema/cinemaActions';
import { selectCinema } from '@/app/features/cinema/cinemaSlice';

import { RoomSingleWrapper } from './RoomSingle.styled';
import usePagination from '@/hooks/usePagination/usePagination';
import { HOME, MOVIE } from '@/router/Main/paths';

const RoomSingle = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalRemoveMovie, setModalRemoveMovie] = useState(false);
  const [idCurrentMovie, setIdCurrentMovie] = useState(null);
  const [editNameRoom, setEditNameRoom] = useState(false);
  const inputRef = useRef(' ');
  const { room, movies, loading } = useSelector(selectCinema);
  const { id } = useParams();
  const dispatch = useDispatch();

  const fetchCurrentRoom = () => {
    dispatch(getRoomById(id));
  };
  const fetchRoom = () => {
    dispatch(getRooms());
  };
  useEffect(() => {
    try {
      fetchCurrentRoom();
    } catch (error) {
      console.error('Failed to fetch room data:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (room) inputRef.current.value = room.name;
    return;
  }, [room]);
  const itemsPerPage = 8;
  const data = movies || [];
  const { currentData, next, prev, jump, currentPage, maxPage } = usePagination(data, itemsPerPage);
  if (loading || !room) return <Loading />;
  const handleEditName = () => {
    setEditNameRoom(!editNameRoom);
  };
  const handleUpdateName = async () => {
    const name = inputRef.current.value;
    await dispatch(updateRoomName({ id: room._id, name: name }));
    await fetchRoom();
    fetchCurrentRoom();
    setEditNameRoom(!editNameRoom);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const askRemoveRoom = (e, id) => {
    setIdCurrentMovie(id);
    e.preventDefault();
    setModalRemoveMovie(true);
  };

  const handleRemoveMovie = async () => {
    await dispatch(deleteMovie(idCurrentMovie));
    await fetchRoom();
    await fetchCurrentRoom();
    setModalRemoveMovie();
  };

  return (
    <RoomSingleWrapper>
      <Banner bg={roomBg}>
        <Text title="Welcome Cinema Room" subTitle="You can see all movies in this room" className="bannerText" />
      </Banner>
      <div className="container">
        <Back path={HOME} />
        <div className="roomInfo">
          <input
            ref={inputRef}
            type="text"
            defaultValue={inputRef?.current?.value}
            className={`roomTile ${editNameRoom ? 'edit' : ''}`}
            aria-label="room title"
            disabled={!editNameRoom}
            size={inputRef?.current?.value?.length}
          />
          {editNameRoom ? (
            <div className="icon check" onClick={() => handleUpdateName()}>
              <IcCheck />
            </div>
          ) : (
            <div className="icon edit" onClick={() => handleEditName()}>
              <IcEdit className={'iconEdit'} />
            </div>
          )}
        </div>
        <div className="movieCreate">
          <div className="btnWrapper">
            <button onClick={handleOpenModal}>Movie Add</button>
          </div>
        </div>
        <div className="movieListContainer">
          <List>
            {currentData.map((movie, index) => {
              const { _id: id, title, poster } = movie;
              return (
                <Card
                  t
                  trash={<IcTrash className="remove" onClick={(e) => askRemoveRoom(e, id)} />}
                  state={movie}
                  key={index}
                  title={title}
                  link={`${MOVIE}/${id}`}
                  poster={poster}
                />
              );
            })}
          </List>
          {data.length > itemsPerPage && (
            <Pagination>
              <button onClick={prev} disabled={currentPage === 0}>
                Previous
              </button>
              {Array.from({ length: maxPage }, (_, index) => (
                <button key={index} onClick={() => jump(index)} style={{ fontWeight: currentPage === index ? 'bold' : 'normal' }}>
                  {index + 1}
                </button>
              ))}
              <button onClick={next} disabled={currentPage === maxPage - 1}>
                Next
              </button>
            </Pagination>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreateMovie
          id={id}
          initialEvents={movies}
          callBack={() => {
            handleCloseModal();
            fetchCurrentRoom();
            fetchRoom();
          }}
        />
      </Modal>
      <Modal isOpen={isModalRemoveMovie} onClose={() => setModalRemoveMovie(false)}>
        <Confirm onClose={() => setModalRemoveMovie(false)} onConfirm={handleRemoveMovie} />
      </Modal>
    </RoomSingleWrapper>
  );
};

export default RoomSingle;
