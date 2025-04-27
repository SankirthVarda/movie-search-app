const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const moviesDiv = document.getElementById('movies');

// Your real TMDB API Key
const apiKey = '8f2a15ecf83698602b237520068f4064';

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const query = input.value.trim();
  if (query !== '') {
    searchMovies(query);
  }
});

async function searchMovies(query) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
    if (!response.ok) {
      throw new Error('Movies not found');
    }
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    moviesDiv.innerHTML = `<p>${error.message}</p>`;
  }
}

function displayMovies(movies) {
  moviesDiv.innerHTML = '';
  if (movies.length === 0) {
    moviesDiv.innerHTML = '<p>No movies found.</p>';
    return;
  }
  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Release Year: ${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
    `;
    moviesDiv.appendChild(movieDiv);
  });
}
