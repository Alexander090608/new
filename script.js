const req = new XMLHttpRequest();

req.onreadystatechange = function() {
    if (req.readyState === 4 && req.status === 200) {
        let movies = JSON.parse(req.responseText);
        console.log(movies[1].year);

        const gridContainer = document.getElementById('grid-container');

        movies.forEach(function(movie) {
            let card = document.createElement("div");
            card.classList.add("card");

            let castList = movie.cast.join(', ') 
            let genresList = movie.genres.join(', ') 

            let textData =
                "<div class='movie-title'>" + movie.title + "</div>" +
                "<div class='movie-year'>Released: " + movie.year + "</div>" +
                "<div class='movie-cast'>Cast: " + castList + "</div>" +
                "<div class='movie-genres'>Genres: " + genresList + "</div>";

            card.innerHTML = textData;

            if (movie.thumbnail) {
                card.style.backgroundImage = "url(" + movie.thumbnail + ")";
            }

            gridContainer.appendChild(card);
        });
    }
}

req.open("GET", "movieList.json", true);
req.send();