import { useEffect, useRef, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch } from 'react-redux';
import { Bounce, toast } from 'react-toastify';

import moment from 'moment';

import { createMovie, updateMovie } from '@/app/features/cinema/cinemaActions';

import { CalendarWrapper, CreateMovieWrapper } from './CreateMovie.styled';
import { BASE_URL } from '@/configs';
import { formatMovies } from '@/utils';

const localizer = momentLocalizer(moment);

const EventComponent = ({ event }) => {
  return (
    <div className="custom-event">
      <strong>{event.title}</strong>
      <div className="img-wrap">{event.poster && <img src={event.poster} alt="poster" />}</div>
    </div>
  );
};

const CreateMovie = ({ id, data = null, initialEvents, callBack }) => {
  const [events, setEvents] = useState(formatMovies(initialEvents, data));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bcView, setBCView] = useState('week');

  const dispatch = useDispatch();
  const prewImg = data?.poster ? `${BASE_URL}/${data?.poster}` : '';
  const [movieForm, setMovieForm] = useState({
    title: data?.title || '',
    description: data?.description || '',
    poster: prewImg,
    startTime: new Date(data?.startTime) || null,
    endTime: new Date(data?.endTime) || null,
  });

  useEffect(() => {
    if (data) {
      const newEvent = {
        title: data.title || '',
        description: data.description || '',
        poster: `${BASE_URL}\\${data.poster}` || null,
        start: new Date(data.startTime) || null,
        end: new Date(data.endTime) || null,
      };
      setEvents([...events, newEvent]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const [previewUrl, setPreviewUrl] = useState(prewImg || '');
  const formData = useRef(new FormData());
  const fileInputRef = useRef(null);
  if (!data) formData.current.set('roomId', id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieForm((prev) => ({ ...prev, [name]: value }));
    formData.current.set(name, value);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formData.current.set('poster', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setMovieForm((prev) => ({ ...prev, poster: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEventClick = (event) => {
    alert(`Movie: ${event.title}\nDescription: ${event.description}\nImage URL: ${event.poster}`);
  };

  const handleSelectSlot = ({ start, end }) => {
    if (selectedEvent && (selectedEvent.start !== start || selectedEvent.end !== end)) {
      toast.info('You have already selected a slot. Please cancel the current selection to choose another.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
      return;
    }

    if (!movieForm.title || !movieForm.description || !movieForm.poster) {
      toast.info('Please enter all movie details first.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });

      return;
    }
    const now = new Date();

    if (moment(start).isBefore(now, 'minute')) {
      toast.info('You cannot select a slot in the past.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
      return;
    }

    const isSlotAvailable = events.every((event) => end <= event.start || start >= event.end);

    if (!isSlotAvailable) {
      toast.info('This slot is already booked. Please choose another time.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
      return;
    }

    const newEvent = {
      ...movieForm,
      start,
      end,
      allDay: false,
    };

    setMovieForm((prev) => ({ ...prev, startTime: start.toISOString() }));
    formData.current.set('startTime', start.toISOString());
    setMovieForm((prev) => ({ ...prev, endTime: end.toISOString() }));
    formData.current.set('endTime', end.toISOString());
    setEvents([...events, newEvent]);
    setSelectedEvent(newEvent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieId = id;
    if (!data) {
      await dispatch(createMovie(formData.current));
    } else {
      const data = formData.current;
      await dispatch(updateMovie({ movieId, data }));
    }
    callBack();
  };

  const clearSelection = () => {
    setSelectedEvent(null);
    setEvents(initialEvents);
    setMovieForm({ title: '', description: '', poster: null });
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const components = {
    event: EventComponent,
  };

  return (
    <CreateMovieWrapper>
      <form onSubmit={handleSubmit}>
        <div className="formControl">
          <div className="formControl-box">
            <label htmlFor="title">Movie Title:</label>
            <input id="title" name="title" value={movieForm.title} placeholder="Enter Movie Name" onChange={handleInputChange} required />
          </div>
          <div className="formControl-box">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter Movie Description"
              value={movieForm.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="formControl-box imgBox">
            <div>
              <label htmlFor="image">Image:</label>
              <input id="image" name="image" type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/gif, image/jpeg" />
            </div>
            {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '100%', height: 'auto' }} />}
          </div>
        </div>

        <CalendarWrapper>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleEventClick}
            style={{ width: '100%', height: '100%' }}
            views={{
              day: true,
              week: true,
              month: false,
              agenda: true,
            }}
            view={bcView}
            onView={setBCView}
            components={components}
            resizable={false}
            draggable={false}
          />
        </CalendarWrapper>
        <button type="submit" className="saveMovie">
          Save Movie Details
        </button>
        {selectedEvent && (
          <div>
            <button type="button" className="saveMovie" onClick={clearSelection}>
              Cancel Movie
            </button>
          </div>
        )}
      </form>
    </CreateMovieWrapper>
  );
};

export default CreateMovie;
