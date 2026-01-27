// Function to create and display a movie card
function createMovieCard(movie) {
    let card = document.createElement("div");
    card.classList.add("card");

    let castList = movie.cast.join(', ') 
    let genresList = movie.genres.join(', ')

    let textData =
        "<div class='movie-title'>" + movie.title + "</div>" +
        "<div class='movie-year'>Released: " + movie.year + "</div>";
    
    if (movie.cast) {
        textData += "<div class='movie-cast'>Cast: " + castList + "</div>";
    }
    textData += "<div class='movie-genres'>Genres: " + genresList + "</div>";

    card.innerHTML = textData;

    if (movie.thumbnail) {
        card.style.backgroundImage = "url(" + movie.thumbnail + ")";
    }

    return card;
}

// Load JSON movies
function loadJSONMovies() {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            let movies = JSON.parse(req.responseText);
            const gridContainer = document.getElementById('grid-container');

                movies.forEach(function(movie) {
                    gridContainer.appendChild(createMovieCard(movie));
                });
        }
    }

    req.open("GET", "movieList.json", true);
    req.send();
}

// Load custom added movies from localStorage
function loadCustomMovies() {
    const customMovies = JSON.parse(localStorage.getItem('customMovies')) || [];
    const gridContainer = document.getElementById('grid-container');

    if (gridContainer && customMovies.length > 0) {
        customMovies.forEach(function(movie) {
            gridContainer.appendChild(createMovieCard(movie));
        });
    }
}

// Handle form submission
const form = document.getElementById('addMovieForm');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const title = document.getElementById('title').value;
        const year = parseInt(document.getElementById('year').value); //parseInt to convert string to number
        const genre = document.getElementById('genre').value;

        // Create new movie object
        const newMovie = {
            title: title,
            year: year,
            genres: [genre], // Store genre as an array 
            cast: []
        };

        // Get existing custom movies from localStorage
        let customMovies = JSON.parse(localStorage.getItem('customMovies')) || [];
        customMovies.push(newMovie);
        localStorage.setItem('customMovies', JSON.stringify(customMovies));

        // Show success message
        const result = document.querySelector('.result');
        if (result) {
            result.style.display = 'block';
        }

        // Reset form
        form.reset();

        // Optionally redirect to home page after 1 second
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
}

// Load movies when page loads
window.addEventListener('DOMContentLoaded', function() {
    loadJsonMovies();
    loadCustomMovies();
});