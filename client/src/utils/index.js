import { BASE_URL } from '@/configs';

export function formatMovies(movies, data) {
  var moviesToFormat = movies;
  if (data) {
    const filteredMovies = movies.filter((movie) => movie._id !== data._id);

    moviesToFormat = filteredMovies.length < movies.length ? filteredMovies : movies;
  }

  return moviesToFormat.map((movie) => {
    const startTime = new Date(movie.startTime);
    const endTime = new Date(movie.endTime);

    return {
      id: movie._id,
      title: movie.title,
      description: movie.description,
      poster: `${BASE_URL}/${movie.poster}`,
      start: new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours(), startTime.getMinutes()),
      end: new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), endTime.getHours(), endTime.getMinutes()),
    };
  });
}
