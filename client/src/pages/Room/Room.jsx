import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cinemaBg from '../../assets/img/cinemaBg.jpg';

import { Banner } from '@/components/Banner';
import { Card } from '@/components/Card';
import { Confirm } from '@/components/Confirm';
import { IcTrash } from '@/components/Icons';
import { List } from '@/components/List';
import { Loading } from '@/components/Loading';
import { Modal } from '@/components/Modal';
import { Text } from '@/components/Text';

import { deleteRoom, getRooms } from '@/app/features/cinema/cinemaActions';
import { selectCinema } from '@/app/features/cinema/cinemaSlice';

import { Pagination, RoomWrapper } from './Room.styled';
import { CreateRoom } from './component/CreateRoom';
import usePagination from '@/hooks/usePagination/usePagination';
import { ROOM } from '@/router/Main/paths';

const Room = () => {
  const { rooms, loading } = useSelector(selectCinema);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalRemoveRoom, setModalRemoveRoom] = useState(false);
  const [idCurrentRoom, setIdCurrentRoom] = useState(null);
  const dispatch = useDispatch();

  const fetchRoom = () => {
    dispatch(getRooms());
  };

  useEffect(() => {
    if (rooms.length === 0) {
      fetchRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const itemsPerPage = 8;
  const { currentData, next, prev, jump, currentPage, maxPage } = usePagination(rooms, itemsPerPage);
  if (loading) return <Loading />;

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const askRemoveRoom = (e, id) => {
    e.preventDefault();
    setIdCurrentRoom(id);
    setModalRemoveRoom(true);
  };
  const handleRemoveRoom = async () => {
    await dispatch(deleteRoom(idCurrentRoom));
    fetchRoom();
    setModalRemoveRoom(false);
  };

  return (
    <RoomWrapper>
      <Banner bg={cinemaBg}>
        <Text title="Welcome Cinema" subTitle="The best Cinema World" className="bannerText" />
      </Banner>
      <div className="container">
        <div className="roomCreate">
          <div className="btnWrapper">
            <button onClick={handleOpenModal}>Create Room</button>
          </div>
        </div>
        <div className="roomListContainer">
          <List>
            {currentData?.map((room) => {
              const { _id, name, movies } = room;
              return (
                <Card
                  state={room}
                  key={_id}
                  movies={movies}
                  title={name}
                  link={`${ROOM}/${_id}`}
                  trash={<IcTrash className="remove" onClick={(e) => askRemoveRoom(e, _id)} />}
                />
              );
            })}
          </List>
          {rooms.length > itemsPerPage ? (
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
          ) : null}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreateRoom
          callBack={() => {
            fetchRoom();
            handleCloseModal();
          }}
        />
      </Modal>
      <Modal isOpen={isModalRemoveRoom} onClose={() => setModalRemoveRoom(false)}>
        <Confirm onClose={() => setModalRemoveRoom(false)} onConfirm={handleRemoveRoom} />
      </Modal>
    </RoomWrapper>
  );
};

export default Room;
