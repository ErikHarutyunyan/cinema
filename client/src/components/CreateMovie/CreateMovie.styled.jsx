import styled from 'styled-components';

export const CreateMovieWrapper = styled.div`
  height: 100%;
  .saveMovie {
    width: auto;
    padding: 12px 24px;
    margin-top: 20px;
    border: 1px solid #ffc226;
    color: #ffc226;
    font-size: 16px;
    font-weight: 600;
    border-radius: 18px;
    transition: all 0.5s ease-in-out;
    &:hover {
      background-color: #ffc226;
      color: #000;
    }
  }
  .formControl {
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;

    &-box {
      display: flex;
      flex-direction: column;
      color: #fff;
      gap: 10px;
      input {
        width: 334px;
        padding: 12px 24px 12px 24px;
        border-radius: 8px;
        border: 3px solid #ff6f00;
        color: #000;
        font-weight: 600;
        background: #000;
        color: #fff;
        &::placeholder {
          color: #ffffffb1;
        }
      }
      textarea {
        width: 334px;
        resize: none;
        padding: 12px 24px 12px 24px;
        border: 3px solid #ff6f00;
        border-radius: 8px;
        font-weight: 600;
        background: #000;
        color: #fff;
        &::placeholder {
          color: #ffffffb1;
        }
      }
    }
    .imgBox {
      width: 100%;
      display: flex;
      flex-direction: row;
      input {
        width: 250px;
        cursor: pointer;
      }
      ::-webkit-file-upload-button {
        background: none;
        color: #febd25;
        outline: none;
        box-shadow: none;
        border: none;
        cursor: pointer;
      }
      div {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      img {
        max-width: 120px;
        object-fit: scale-down;
      }
    }
  }
`;

export const CalendarWrapper = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 18px;
  margin-top: 40px;
  width: 100%;
  height: 100%;
  width: 1050px;
  height: 550px;
  .rbc-day-slot .rbc-event {
    background: #000000e3;
    color: #fc9821;
  }
  .rbc-calendar {
    font-family: 'Arial', sans-serif;
    color: #000;
  }

  .rbc-header {
    background-color: #f0f0f0;
    border-bottom: 1px solid #e0e0e0;
    text-align: center;
    padding: 5px 10px;
    font-weight: bold;
  }

  .rbc-today {
    background-color: #e3f2fd;
  }

  .rbc-event {
    background-color: #1976d2;
    color: white;
    border-radius: 5px;
    padding: 4px 8px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rbc-event-content {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .rbc-agenda-view table {
    width: 100%;
    border-collapse: collapse;
  }

  .rbc-agenda-view table thead tr th {
    padding: 8px;
    border-bottom: 2px solid #dedede;
  }

  .rbc-agenda-view table tbody tr td {
    padding: 8px;
    border-bottom: 1px solid #eee;
  }

  .rbc-allday-cell {
    display: none;
  }
  .rbc-time-view .rbc-header {
    border-bottom: none;
  }

  .custom-event {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    strong {
      font-size: 12px;
      margin-top: 5px;
    }
    .img-wrap {
      height: 100%;
      text-align: left;

      img {
        width: 100%;
        height: 100%;
        max-height: 120px;
        max-width: 80px;
        border-radius: 5px;
        object-fit: contain;
      }
    }
  }

  .rbc-day-slot .rbc-event-label {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    padding-right: 5px;
    width: auto;
    text-wrap: balance;
    font-size: 11px;
  }
`;
