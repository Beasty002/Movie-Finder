const API_KEY = "api_key=8c72c95a59121aae424474da628b54d2";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500/"
const API_URL = BASE_URL + "movie/latest"
const MOVIE_SEARCH_URL = BASE_URL + '/search/multi?' + '&language=en-US&' + API_KEY
const searchR = document.getElementById("searchResults");
const latestM = document.getElementById("latestM");
const form = document.querySelector("form");
const search = document.getElementById("searchBar");


document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    let searchTerm = params.get('search');
    getEntertainment(searchTerm);
});


function getEntertainment(searchTerm) {
    let url = `${MOVIE_SEARCH_URL}&query=${searchTerm}`;
    fetch(url).then(res => res.json()).then(data => {
        const h1 = document.querySelector(".errMsg");
        if (data.results.length == 0) {
            h1.style.display = "block";

        }
        else {
            searchR.innerHTML = "";
            searchHandler(searchTerm)
            show(data.results);
        }
        removeLoader();
    })
}
function removeLoader() {
    let loader = document.getElementById("loader");
    loader.remove();
    document.body.style.overflow = "scroll";
    document.body.style.overflowX = "hidden";
}
function show(data) {
    data.forEach(el => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.id = "c" + el.id;
        let title = el.name || el.original_name || el.title;
        let vote = el.vote_average || "N/A";
        const typeofVote = typeof (vote);
        if (typeofVote == "number") {
            vote = vote.toFixed(1);
        }
        let trueOverlay = "none-overlay"
        if (el.overview) {
            trueOverlay = "overlay"
        }
        let cardHTML = ` <figure>
        <img src="${IMG_URL + el.poster_path}" alt="${title}">
        <div class="${trueOverlay}">
            <div class="content">
                <p>${el.overview}</p>
            </div>
        </div>
    </figure>
    <span class="movie-rating">⭐ ${vote}</span>
    <h3 class="movie-title">${title}</h3>
`;
        card.innerHTML = cardHTML;
        let media_type = el.media_type;
        if (el.poster_path) {
            searchR.append(card);
            details(card, media_type);
        }
    });

}
function details(card, type) {
    let figure = card.querySelector("figure");
    figure.addEventListener("click", () => {
        window.location.href = `details.html?id=${card.id}&type=${type}`
    })
}




form.addEventListener("submit", e => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        window.location.href = `./searchpage.html?search=${search.value}`
    }
})

function searchHandler(searchTerm) {
    const h1 = document.createElement("h1");
    const searchMsg = `Showing Results for "<span id="searchVal">${searchTerm}</span>"`
    h1.innerHTML = searchMsg;
    const resultContainer = document.querySelector(".results");
    const existH1 = resultContainer.querySelector("h1");
    if (existH1) {
        resultContainer.removeChild(existH1);
    }
    resultContainer.prepend(h1);
}

