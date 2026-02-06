var grid = document.getElementById('grid-container');
var form = document.getElementById('addMovieForm');
let movies;

//load movies from JSON file
if(localStorage.getItem('customMovies')){ //checks if there are custom movies in localStorage
    movies = JSON.parse(localStorage.getItem('customMovies'));
    if (grid) {
        createMovieCard();
    }
} else{
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            movies = JSON.parse(request.responseText);
            localStorage.setItem('customMovies', JSON.stringify(movies)); // Store movies in localStorage for later use
            if (grid) {
                createMovieCard();
            }
        }
    };

    request.open("GET", "movieList.json", true);
    request.send();
}

// Function to create and display a movie card
function createMovieCard() {
    grid.innerHTML = '';

    movies.forEach(function(movie) {
    let card = document.createElement("div");
    card.classList.add("card");

    let textData =
        "<div class='movie-title'>" + movie.title + "</div>" +
        "<div class='movie-year'>Released: " + movie.year + "</div>";
    
    if (movie.cast) {
        textData += "<div class='movie-cast'>Cast: " + movie.cast.join(', ') + "</div>";
    }
    textData += "<div class='movie-genres'>Genres: " + movie.genres.join(', ') + "</div>";

    if (movie.thumbnail) {
        card.style.backgroundImage = "url(" + movie.thumbnail + ")";
    }

    card.innerHTML = textData;
    grid.appendChild(card);
    });
};

//form submission
if (form) {
    let titleInput = document.getElementById('title');
    let yearInput = document.getElementById('year');
    let genreInput = document.getElementById('genre');

    form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Create new movie object
    var newMovie = {
        title: titleInput.value,
        year: parseInt(yearInput.value), //parseInt to convert string to number
        genres: [genreInput.value], // Store genre as an array 
        cast: []
    };

    movies.push(newMovie);
    localStorage.setItem('customMovies', JSON.stringify(movies));//takes new customMovies and turns it back to JSON
    
    if(grid){ 
        createMovieCard();
    }

    // Show success message
    const result = document.querySelector('.result');
    if (result) { //checks if result exists
        result.style.display = 'block';
    }

    // Optionally redirect to home page after 1 second
    setTimeout(()=>{
        window.location.href = 'index.html';
    }, 1000);

    form.reset();
    });
}
