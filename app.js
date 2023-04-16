// Define global variables
const movieList = document.querySelector('#movie-list');
const genreInput = document.querySelector('#genre');
const ratingInput = document.querySelector('#rating');
const yearInput = document.querySelector('#year');
const errorElement = document.querySelector('#error-message');
const recommendButton = document.querySelector('#recommend-button');

// Load movie data from data.json file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Define recommendation logic function
    function recommendMovies() {
      // Clear previous movie recommendations
      movieList.innerHTML = '';

      // Get user input values
      const genre = genreInput.value.toLowerCase();
      const rating = ratingInput.value;
      const year = yearInput.value;

      // Validate user input
      if (isNaN(year) || year.length !== 4) {
        errorElement.textContent = 'Please enter a valid 4-digit year';
        return;
      } else {
        errorElement.textContent = '';
      }

      // Filter movies based on user input
      const recommendedMovies = data.filter(movie => {
        return (
          movie.genre.toLowerCase().includes(genre) &&
          movie.rating >= rating &&
          movie.releaseYear == year
        );
      });

      // Display recommended movies on the page
      recommendedMovies.forEach(movie => {
        const movieItem = document.createElement('li');
        movieItem.textContent = movie.title;
        movieList.appendChild(movieItem);
      });
    }

    // Add event listener to recommend button
    recommendButton.addEventListener('click', recommendMovies);
  })
  .catch(error => {
    console.log('Error loading movie data:', error);
  });
