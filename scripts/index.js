import {data}  from './data.js';


document.addEventListener("DOMContentLoaded", () => {  
    const delete_icon =   document.getElementById('delete-icon')
  const searchInput = document.querySelector('.search');
  const searchResults = document.querySelector('.res');


  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = 1;
              // observer.unobserve(entry.target); // Ferma l'osservazione dopo il primo ingresso
          }else{
            entry.target.style.opacity = 0.5
          }
      });
  }, { root: searchResults, threshold: 1 });

  const updateResults = (query) => {
      searchResults.innerHTML = ''; // Pulisce i risultati precedenti
      if (!query) return;

      let filteredMovies = data.filter(movie => 
          movie.title.toLowerCase().includes(query.toLowerCase().trim())
      );

      if (filteredMovies.length === 0) {
          const noResult = document.createElement('div');
          noResult.textContent = "No movies found...";
          noResult.classList.add('not-found');
          searchResults.appendChild(noResult);
          return;
      }

      filteredMovies.forEach(movie => {
          const div = document.createElement('div');
          div.className = 'movie-item';
          div.setAttribute('title',`${movie.title}`)
          
        
          const img = document.createElement('img');
          img.src = movie.poster;
          img.alt = `${movie.title} Poster`;

          const infoDiv = document.createElement('div');
          infoDiv.className = 'movie-info';
      

          const title = document.createElement('a');
          title.className = 'movie-title';
          title.textContent = movie.title;
          title.setAttribute('href',`https://en.wikipedia.org/wiki/${movie.title}`)
          title.setAttribute('title',`cerca ${movie.title} su Wikipedia`)

          const year = document.createElement('div');
          year.className = 'movie-year';
          year.textContent = `Year: ${movie.year}`;

          const description = document.createElement('div');
          description.className = 'movie-description';
          description.textContent = movie.description || 'No description available.';

       
          infoDiv.appendChild(title);
          infoDiv.appendChild(year);
          infoDiv.appendChild(description);
          div.appendChild(img);
          div.appendChild(infoDiv);
          searchResults.appendChild(div);

          observer.observe(div); 
         
      });

     
  };



  const displayIcon = () =>{

    if(searchInput && searchInput.value.trim() !=='' ){
        delete_icon.style.display='block'
    }else{
        delete_icon.style.display='none'
       
    }
  }

  const clearInput = ()=>{
delete_icon.style.display='none'
searchInput.value=''
updateResults(searchInput.value)

   
  }
  searchInput.addEventListener('input', (e) => updateResults(e.target.value));
  searchInput.addEventListener('input',()=>displayIcon())
  delete_icon.addEventListener('click',()=>clearInput())

});




