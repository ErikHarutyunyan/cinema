import { Hall } from '@/components/Hall';

import { SeatsWrapper } from './Seats.styled';

const Seats = ({ refProps, data }) => {
  return (
    <SeatsWrapper ref={refProps}>
      <Hall data={data} />
    </SeatsWrapper>
  );
};

export default Seats;
