import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { createRoom } from '@/app/features/cinema/cinemaActions';

import { CreateRoomWrapper } from './CreateRoom.styled';

const CreateRoom = ({ callBack }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const handleCreateRoom = async () => {
    const name = inputRef.current.value;
    inputRef.current.value = '';
    await dispatch(createRoom(name));
    callBack();
  };
  return (
    <CreateRoomWrapper>
      <h3>Create Room</h3>
      <input ref={inputRef} type="text" placeholder="Enter Room Name" aria-label="Name Room" />
      <button className="send" onClick={handleCreateRoom}>
        Send
      </button>
    </CreateRoomWrapper>
  );
};

export default CreateRoom;
