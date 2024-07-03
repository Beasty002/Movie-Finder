
const API_KEY = "api_key=8c72c95a59121aae424474da628b54d2";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500/"
const API_URL = BASE_URL + "movie/latest"
const MOVIE_SEARCH_URL = BASE_URL + '/search/multi?' + '&language=en-US&' + API_KEY
const latestM = document.getElementById("latestContainer")
const latestT = document.getElementById("latestTVContainer")
const searchR = document.getElementById("searchResults")
const form = document.querySelector("form");
const search = document.getElementById("searchBar");
const cont = document.querySelectorAll(".container");

let nav = document.querySelector("header");
var lastScrollTop = 0;
var url = ''
var latesturl = ''


getEntertainment("latestT", undefined);
getEntertainment("latestM", undefined);


function getEntertainment(type, searchTerm) {
    //fixing the url to fetch based on the type
    if (type === 'latestM') {
        url = `${BASE_URL}/movie/now_playing?${API_KEY}`
    }
    else if (type === 'latestT') {
        url = `${BASE_URL}/discover/tv?${API_KEY}`
    }
    else if (type === "search" && searchTerm) {
        url = `${MOVIE_SEARCH_URL}&query=${searchTerm}`
    }
    else {
        console.log("error")
    }
    fetch(url).then(res => res.json()).then(data => {
        const h1 = document.querySelector(".errMsg");
        if (data.results.length != 0) {
            show(data.results, type);
            h1.style.display = "none";
        }
        else {
            h1.style.display = "block";
        }

    })
}
// function errorMsg() {
//     const h1 = document.createElement("h1");
//     h1.textContent = "No results found"
//     h1.classList.add("errMsg");
//     document.body.appendChild(h1);
// }

function show(data, type) {
    data.forEach(el => {
        console.log(el)
        let card = document.createElement("div");
        card.classList.add("card");
        card.id = "c" + el.id;
        let title = el.name || el.original_name || el.title; //for movie the title is original_name and for movie it is title so it will check if one exists if not then it will take another
        let vote = el.vote_average || "N/A";
        const types = typeof (vote);
        if (types == "number") {
            vote = vote.toFixed(1);
        }
        // html code for the movie/tv show card
        let container = ` <figure>
            <img src="${IMG_URL + el.poster_path}" alt="${title}">
            <div class="overlay">
                <div class="content">
                    <p>${el.overview}</p>
                </div>
            </div>
        </figure>
        <span class="movie-rating">⭐ ${vote}</span>
        <h3 class="movie-title">${title}</h3>
    `;


        card.innerHTML = container;
        //checking what type the movie is and appending to the respective container  according to it 
        if (el.poster_path) {
            if (type === 'latestM') {
                latestM.appendChild(card);
            }
            else if (type === 'latestT') {
                latestT.appendChild(card);
            }
            else {
                searchResults.appendChild(card);
            }
            movieDetail(card);
        }
    });

}

function movieDetail(card) {
    let figure = card.querySelector("figure");
    figure.addEventListener("click", () => {
        //sending the id to next page in the url so that another page can use the id to show more details about the movie
        window.location.href = `moviepage.html?id=${card.id}`
    })
}


form.addEventListener("submit", e => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        searchR.innerHTML = "";
        const h1 = document.createElement("h1");
        const searchMsg = `Showing Results for "<span id="searchVal">${searchTerm}</span>"`
        h1.innerHTML = searchMsg;
        cont.forEach(el => {
            el.style.display = "none"
        });
        const resultContainer = document.querySelector(".results");
        resultContainer.style.display = "block";
        const existH1 = resultContainer.querySelector("h1");
        if (existH1) {
            resultContainer.removeChild(existH1);
        }
        resultContainer.prepend(h1);
        getEntertainment("search", searchTerm)



    }
})



//to scroll through the movie / tv cards
function scrollCard(e) {
    let parent = e.parentElement;
    let val = 850;
    if (e.classList.contains("left")) {
        // i want to scroll to left i want to decrease the left value so it is made negative
        val = -val;
    }
    parent.scrollBy({
        left: val,
        behavior: "smooth"
    });
    setTimeout(() => updateVisibility(e), 500);
}
function updateVisibility(e) {
    //to update the visibility of the left and right button if we cant scroll on certain direction then hide the button
    let parent = e.parentElement;
    let leftBtn = parent.querySelector('.btn-cont.left');
    let rightBtn = parent.querySelector('.btn-cont.right');
    if (parent.scrollLeft === 0) {
        leftBtn.style.display = "none";
    }
    else {
        leftBtn.style.display = "block";
    }

    //this condition checks if the scrolling content reached the right most end or not
    //scrollLeft gives the length the parent has scrolled from left and client width gives the length of width visible to us and the scrollWidth is the total width of the parent upto which it can be scrolled in

    if (parent.scrollLeft + parent.clientWidth >= parent.scrollWidth) {
        rightBtn.style.display = "none";
    }
    else {
        rightBtn.style.display = "block";
    }
}

