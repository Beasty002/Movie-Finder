const API_KEY = "api_key=8c72c95a59121aae424474da628b54d2";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/original/"
const backgroundImg = document.getElementById("background");
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const table = document.querySelector("#detailTable tbody");
const rating = document.getElementById("ratingVal");
const ratingQty = document.getElementById("ratingQty");
const overview = document.getElementById("overview");
const genre = document.getElementById("genre");
const creator = document.getElementById("creator");
const stars = document.getElementById("stars");
const releaseDate = document.getElementById("releaseDate");
const relContainer = document.getElementById("relContainer");
const recommendedSection = document.getElementById("recommendations");
const form = document.querySelector("form");
const search = document.getElementById("searchBar");
const genreType = document.getElementById("type");
const genreContainer = document.querySelector(".type-genre")
let creatorFound = false;


let url = "";
document.addEventListener('DOMContentLoaded', () => {
    // console.log(window.location);
    const params = new URLSearchParams(window.location.search); //window.location returns the whole link of the page wheras the window.location.search just gives us the query involved in the link like the text after the question mark search
    // console.log(params.get('type')) //here we can get the value involved in the query like type=movie it search for the query with "type" and returns its value i.e movie
    //for custom url use the one belowm
    // let loc = "http://127.0.0.1:5500/searchpage.html?id=m786892&type=movie";
    // const url = new URL(loc)
    // console.log(url.search)
    let type = params.get('type');
    let id = params.get('id');
    id = id.slice(1);
    loadContent(type, id);
})

function loadContent(type, id) {
    if (type === "movie") {
        url = `${BASE_URL}/movie/${id}?${API_KEY}` //here we are using the api to get the data of the movie with the id given in the url
    }
    else if (type === "tv") {
        url = `${BASE_URL}/tv/${id}?${API_KEY}` //here we are using the api to get the data of the tv show with the id given in the
    }
    fetch(url).then(res => res.json()).then(data => {
        fillData(type, data);
        if (data.created_by && data.created_by.length != 0) {
            creatorFound = true;
            creator.innerText = data.created_by[0].name;
        }
        if (type === "tv") {
            addSeasonEpisode(data);
            genreType.innerText = "TV series";
        }
        else {
            genreType.innerText = "Movie";
            genreContainer.style.gridTemplateColumns = "73px 1fr"
        }
        recommendations(id, type);
        getcredits(id, type);
    })




}
function addSeasonEpisode(data) {
    let epNum = data.number_of_episodes;
    let seasonNum = data.number_of_seasons;
    const releaseRow = document.getElementById('release');
    const seasonsRow = document.createElement('tr');
    const episodesRow = document.createElement('tr');
    seasonsRow.innerHTML = `<th>Seasons</th><td>${seasonNum}</td>`;
    episodesRow.innerHTML = `<th>Episodes</th><td>${epNum}</td>`;
    table.insertBefore(episodesRow, releaseRow);
    table.insertBefore(seasonsRow, episodesRow);
}

async function getcredits(id, type) {
    let res = await fetch(`${BASE_URL}/${type}/${id}/credits?${API_KEY}`);
    let data = await res.json();
    if (!creatorFound) {
        let directorArr = data.crew.filter((el) => {
            return el.known_for_department === "Directing";
        });

        if (directorArr.length === 0) {
            creator.innerText = "Unknown";
        }
        else {
            creator.innerText = directorArr[0].name;

        }
    }
    for (i = 0; i < 6; i++) {
        let span = document.createElement("span")
        console.log(data.cast)
        if (data.cast) {
            if (data?.cast[i]?.name) {
                span.innerText = data.cast[i].name;
                span.classList.add("cast-name");
                stars.appendChild(span)
            }
        }

    }
    removeLoader();
}
function removeLoader() {
    let loader = document.getElementById("loader");
    loader.remove();
    document.body.style.overflow = "scroll";
    document.body.style.overflowX = "hidden";
}

function fillData(type, data) {
    let titleName = data.name || data.original_name || data.title;
    title.innerText = titleName;
    appendGenre(data.genres);
    let vote = data.vote_average || "N/A";
    const typeofVote = typeof (vote);
    if (typeofVote == "number") {
        vote = vote.toFixed(1);
        ratingQty.innerText = `(${data.vote_count})`;
    }

    rating.innerText = vote;
    overview.innerText = data.overview || "N/A";
    if (!data.overview || data.overview.length < 120) {
        document.querySelector("#readMore").style.display = "none"
        document.querySelector("#overview").style.webkitLineClamp = "3";
    }
    const date = new Date(data.release_date || data.first_air_date);

    releaseDate.innerText = date.toDateString() || "N/A";


    let img = document.querySelector("#background");
    if (!data.backdrop_path) {
        img.src = "./default.jpg";
    }
    else {
        img.src = IMG_URL + data.backdrop_path;
    }
    let img1 = document.querySelector("#poster");
    img1.src = IMG_URL + data.poster_path;



}

function appendGenre(g) {
    g.forEach(element => {
        let linkTag = document.createElement("a");
        linkTag.id = element.id;
        linkTag.innerText = element.name;
        genre.appendChild(linkTag)
    });
}

function toggleOverview(e) {
    let overview = document.querySelector("#overview");
    overview.classList.toggle("active");
    if (e.innerText === "Read More") {
        e.innerText = "Read Less"
    }
    else {
        e.innerText = "Read More"
    }

}

function recommendations(id, type) {
    let url = `https://api.themoviedb.org/3/${type}/${id}/recommendations?${API_KEY}`
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if (data.results.length === 0) {
            document.querySelector("#recommendedSection").style.display = "none";
        }
        data.results.forEach(el => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.id = "c" + el.id;
            let title = el.name || el.original_name || el.title;
            let vote = el.vote_average || "N/A";
            const typeofVote = typeof (vote);
            if (typeofVote == "number") {
                vote = vote.toFixed(1);
            }
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
            let media_type = el.media_type;
            //checking what type the movie is and appending to the respective container  according to it 
            if (el.poster_path) {
                recommendedSection.appendChild(card)
                details(card, media_type);
            }
        });
    })
}
function details(card, type) {
    let figure = card.querySelector("figure");
    figure.addEventListener("click", () => {
        window.location.href = `./details.html?id=${card.id}&type=${type}`
    })
}
function scrollCard(e) {
    let parent = e.parentElement;
    let val = 850;
    if (e.classList.contains("left")) {
        val = -val;
    }
    parent.scrollBy({
        left: val,
        behavior: "smooth"
    });
    setTimeout(() => updateVisibility(e), 500);
}
function updateVisibility(e) {
    let parent = e.parentElement;
    let leftBtn = parent.querySelector('.btn-cont.left');
    let rightBtn = parent.querySelector('.btn-cont.right');
    if (parent.scrollLeft === 0) {
        leftBtn.style.display = "none";
    }
    else {
        leftBtn.style.display = "block";
    }
    if (parent.scrollLeft + parent.clientWidth >= parent.scrollWidth) {
        rightBtn.style.display = "none";
    }
    else {
        rightBtn.style.display = "block";
    }
}
var lastScrollTop = 0;
nav = document.querySelector("header");
window.addEventListener("scroll", () => {
    var scrollTop = window.pageYOffset; //
    if (scrollTop > lastScrollTop) {
        nav.style.top = "-100px"
    }
    else {
        nav.style.top = "0px"
    }
    lastScrollTop = scrollTop;
})



// --------------------------------------------------------------------------------------   Event listener for on submit

form.addEventListener("submit", e => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        console.log(searchTerm)
        window.location.href = `./searchpage.html?search=${search.value}`
    }
})
