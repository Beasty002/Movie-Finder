

// const API_KEY = "api_key=8c72c95a59121aae424474da628b54d2";
// const BASE_URL = "https://api.themoviedb.org/3";
// const IMG_URL = "https://image.tmdb.org/t/p/w500/"
// const API_URL = BASE_URL + "movie/latest"
// const MOVIE_SEARCH_URL = BASE_URL + '/search/multi?' + '&language=en-US&' + API_KEY
// const latestM = document.getElementById("latestContainer")
// const latestT = document.getElementById("latestTVContainer")
// const searchR = document.getElementById("searchResults")
// const form = document.querySelector("form");
// const search = document.getElementById("searchBar");
// let nav = document.querySelector("header");
// var lastScrollTop = 0;
// showLatest();
// showLatestTV();
// async function showLatest() {
//     const res = await fetch(`${BASE_URL}/movie/now_playing?${API_KEY}`);
//     const data = await res.json();
//     data.results.forEach(element => {
//         let movie = document.createElement("div");
//         movie.classList.add("movie");
//         movie.id = "m" + element.id;

//         let container = `
//     <figure>
//         <img src="${IMG_URL + element.poster_path}" alt="${element.title}">
//         <div class="overlay">
//             <div class="content">
//                 <p>${element.overview}</p>
//             </div>
//         </div>
//     </figure>
//     <span class="movie-rating">⭐ ${element.vote_average.toFixed(1)}</span>
//     <h3 class="movie-title">${element.title}</h3>
// `;
//         movie.innerHTML = container;
//         latestM.appendChild(movie);
//     });
// }


// async function showLatestTV() {
//     const res = await fetch(`${BASE_URL}/discover/tv?${API_KEY}`);
//     const data = await res.json();
//     data.results.forEach(element => {
//         // console.log(element)
//         let movie = document.createElement("div");
//         movie.classList.add("movie");
//         movie.id = "m" + element.id;
//         let container = `
//             <figure>
//                 <img src="${IMG_URL + element.poster_path}" alt="${element.original_name}">
//                 <div class="overlay">
//                     <div class="content">
//                         <p>${element.overview}</p>
//                     </div>
//                 </div>
//             </figure>
//             <span class="movie-rating">⭐ ${element.vote_average.toFixed(1)}</span>
//             <h3 class="movie-title">${element.original_name}</h3>
//         `;
//         movie.innerHTML = container;
//         latestT.appendChild(movie);
//     });



// }
// // async function upcommingMovies() {
// //     const res = await fetch("https://api.themoviedb.org/3/tv/upcoming?api_key=8c72c95a59121aae424474da628b54d2&language=en-US&page=1");
// //     const data = await res.json();
// //     const today = new Date().toJSON().slice(0, 10);
// //     console.log(today)
// //     const upcomming = data.results.filter(movie =>
// //         movie.release_date > today
// //     )
// //     upcomming.forEach(element => {
// //         let movie = document.createElement("div");
// //         movie.classList.add("movie");
// //         movie.id = "t" + element.id;
// //         let container = `
// //             <figure>
// //                 <img src="${IMG_URL + element.poster_path}" alt="${element.original_title}">
// //                 <div class="overlay">
// //                     <div class="content">
// //                         <p>${element.overview}</p>
// //                     </div>
// //                 </div>
// //             </figure>
// //             <span class="movie-rating">⭐ ${element.vote_average.toFixed(1)}</span>
// //             <h3 class="movie-title">${element.original_title}</h3>
// //         `;
// //         movie.innerHTML = container;
// //         latestT.appendChild(movie);
// //     });



// // }

// form.addEventListener("submit", (e) => {
//     e.preventDefault()
//     const searchTerm = search.value;
//     if (searchTerm) {
//         searchR.innerHTML = ""
//         document.querySelector("#searchVal").innerText = `${searchTerm}`
//         const cont = document.querySelectorAll(".container");
//         cont.forEach(element => {
//             element.style.display = "none"
//         });
//         const resultContainer = document.querySelector(".results");
//         resultContainer.style.display = "block";
//         async function search() {
//             const res = await fetch(`${MOVIE_SEARCH_URL}&query=${searchTerm}`);
//             const data = await res.json();
//             data.results.forEach(element => {
//                 let movie = document.createElement("div");
//                 movie.classList.add("movie");
//                 movie.id = "t" + element.id;
//                 let container = `
//                     <figure>
//                         <img src="${IMG_URL + element.poster_path}" alt="${element.original_name}">
//                         <div class="overlay">
//                             <div class="content">
//                                 <p>${element.overview}</p>
//                             </div>
//                         </div>
//                     </figure>
//                     <span class="movie-rating">⭐ ${element.vote_average}</span>
//                     <h3 class="movie-title">${element.original_name}</h3>
//                 `;
//                 movie.innerHTML = container;
//                 searchR.appendChild(movie);
//             });
//         }
//         search()

//     }
// })





// // function he() {
// //     let x = document.getElementById("m786892");
// //     console.log(x.querySelector("figure").clientHeight)
// // }





// function scrollRight(e) {
//     let parent = e.parentElement;
//     parent.scrollBy({
//         left: 850,
//         behavior: 'smooth'
//     });
//     setTimeout(() => updateVisibility(e), 300);
//     parent.querySelector('.btn-cont.left').style.display = "block"

// }
// function scrollLeftt(e) {
//     let parent = e.parentElement;
//     parent.scrollBy({
//         left: -850, // Adjust this value as needed
//         behavior: 'smooth'
//     });
//     setTimeout(() => updateVisibility(e), 300);
//     parent.querySelector('.btn-cont.right').style.display = "block";
// }

// function updateVisibility(e) {
//     let parent = e.parentElement;
//     let scrollLeftButton = parent.querySelector('.btn-cont.left');
//     let scrollRightButton = parent.querySelector('.btn-cont.right');
//     if (parent.scrollLeft === 0) {
//         scrollLeftButton.style.display = 'none';
//     }
//     else {
//         scrollLeftButton.style.display = 'block';
//     }
//     // console.clear()
//     // console.log("scroll Left: " + parent.scrollLeft);
//     // console.log("Client Width: " + parent.clientWidth);
//     // console.log("scrollWidth : " + parent.scrollWidth);



//     if (parent.scrollLeft + parent.clientWidth >= parent.scrollWidth) {
//         scrollRightButton.style.display = 'none';
//     }
//     else {
//         scrollRightButton.style.display = 'block';
//     }
// }



// window.addEventListener("scroll", () => {
//     var scrollTop = window.scrollY;
//     if (scrollTop > lastScrollTop) {
//         nav.style.top = "-80px"
//     }
//     else {
//         nav.style.top = "0px"
//     }
//     lastScrollTop = scrollTop;
// })