import { Button, ConfirmWrapper, Question, Title } from './Confirm.styled';

const Confirm = ({ onClose, onConfirm }) => {
  return (
    <ConfirmWrapper>
      <Title>Delete Room</Title>
      <Question>Are you going to delete the room?</Question>
      <Button onClick={onConfirm}>Yes</Button>
      <Button onClick={onClose}>No</Button>
    </ConfirmWrapper>
  );
};

export default Confirm;
