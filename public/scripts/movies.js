const movieContainer = document.getElementById('movies')
const searchBtn = document.querySelector('.btn-search')
const loadMovie = document.getElementById('load-movies')

const delMovieToDB = (infos) => {
  fetch('/api/delmovie', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(infos),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


const addMovieToDB = (infos) => {
  fetch('api/addMovie', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(infos),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


const searchMovies = (movie) => {
  movieContainer.innerHTML = ""

  fetch(`http://www.omdbapi.com/?s=${movie}&apikey=adf1f2d7&`)
    .then(response => response.json())
    .then((data) => {
      console.log(data.Search);

      data.Search.forEach((movie) => {
          let movieCard = `<section>
          <div id="card" class="card" data-img=${movie.Poster} style="background-image: url(${movie.Poster})">
            <div class="inner">
              <div class="header">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <h1 class="main-title">${movie.Title.substring(0,15)}</h1>
                <div class="stars">
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star-half" aria-hidden="true"></i>
                </div>
              </div>
              <div class="content">
                <p class="type">${movie.Type}</p>
                <a class="year" href="#">${movie.Year}</a>
              </div>
              <div class="btn_row">
                <a href="#" class="card-action">Add to my DB<i class="fa fa-caret-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <!-- the trailer -->
          </div>
        </section>`
        console.log(movie.Title)
        movieContainer.insertAdjacentHTML('beforeend', movieCard)

      })

      const loadMovies = document.querySelectorAll('.card-action')
      loadMovies.forEach((element, index) => {
        element.addEventListener('click', () => {
          console.log(element, index);
          addMovieToDB({data: data.Search[index]})
        })
      });
    })
}

const getMovieFromDB = () => {
  fetch('api/movie', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    console.log(data.data)
    data.data.forEach((movie) => {
      console.log(movie);
      let movieCard2 = `<section>
      <div id="card" class="card" data-img=${movie.url} style="background-image: url(${movie.url})">
        <div class="inner">
          <div class="header">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
            <h1 class="main-title">${movie.title.substring(0,15)}</h1>
            <div class="stars">
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star-half" aria-hidden="true"></i>
            </div>
          </div>
          <div class="content">
            <p class="type">${movie.type}</p>
            <a class="year" href="#">${movie.year}</a>
          </div>
          <div class="btn_row">
          <a href="#" class="card-delete">Delete from my DB<i class="fa fa-caret-right" aria-hidden="true"></i>
          </a>
        </div>
        </div>
        <!-- the trailer -->
      </div>
    </section>`
    movieContainer.insertAdjacentHTML('beforeend', movieCard2) 
    })
    const delMovies = document.querySelectorAll('.card-delete')
    delMovies.forEach((element, index) => {
      element.addEventListener('click', () => {
        console.log(element, index);
        delMovieToDB({data: data.data[index]})
        movieContainer.innerHTML = ""
        getMovieFromDB()


        
      })
    });

  })
  .catch((error) => {
    console.error('Error:', error);
  });
}



// ENTRY POINTS
searchBtn.addEventListener('click', (event) => {
  let input = document.getElementById('searchInput')
  console.log(input.value)
  searchMovies(input.value)
})

loadMovie.addEventListener('click', (event) => {
  getMovieFromDB()

})

