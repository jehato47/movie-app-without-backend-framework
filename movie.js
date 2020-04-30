image_url = "https://image.tmdb.org/t/p/w500"
search_url = "https://api.themoviedb.org/3/search/movie?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&query=fight&page=1&include_adult=false"
recommendation_url = "https://api.themoviedb.org/3/movie/550/recommendations?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&page=1"
populars_url = "https://api.themoviedb.org/3/movie/popular?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&page=1"
top_rated = "https://api.themoviedb.org/3/movie/top_rated?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&page=1"
latest = "https://api.themoviedb.org/3/movie/upcoming?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&page=1"
film_url = "https://api.themoviedb.org/3/movie/550?api_key=9240023865dd052e90b0564d9b5f6179"
film_url1 = "https://api.themoviedb.org/3/movie/"
film_url2 = "?api_key=9240023865dd052e90b0564d9b5f6179"
trailer_key = "http://api.themoviedb.org/3/movie/550/videos?api_key=9240023865dd052e90b0564d9b5f6179"
youtube_url = "https://www.youtube.com/watch?v="
cast_url_and_details = "https://api.themoviedb.org/3/movie/550?api_key=9240023865dd052e90b0564d9b5f6179&append_to_response=credits"
cast_url2 = "https://api.themoviedb.org/3/movie/551/credits?api_key=9240023865dd052e90b0564d9b5f6179"



// <p class="type">${response.genres[0].name}, ${response.genres[1].name}</p>


async function fulfill_cards(url,place) {
    let response = await fetch(url)
    let response2 = await response.text()
    let response3 = JSON.parse(response2)
    let films_list = response3.results
    films_list.forEach((f, j) => {
        fulfill_card(f, null, place)        
    })
    
    return films_list
}


function fulfill_card(f, j, place) {

    if (j === null) {
        let url = `https://api.themoviedb.org/3/movie/${f.id}?api_key=9240023865dd052e90b0564d9b5f6179`
        f = url
    }
    

    fetch(f)
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(response => {

            if (response.genres.length === 1) {

                release_datee = response.release_date.split("-")[0]
                let card = `<div class="movie_card" id="bright">
                    <div class="info_section">
                        <div class="movie_header">
                            <img id="inner_image" class="locandina" src="${image_url + response.poster_path}" />
                            <h1>${response.title}</h1>
                            <!-- <h4>${release_datee}, David Ayer</h4> -->
                            <h4>${release_datee}</h4>
                            <span class="minutes">${response.runtime} min</span>
                                                
                            <p class="type">${response.genres[0].name}</p>
                            
                        </div>
                        <div class="movie_desc">
                            <p class="text">
                                ${response.overview}
                            </p>
                        </div>
                        <div class="movie_social">
                            <ul>
                                <li><i class="material-icons">share</i></li>
                                <li><i class="material-icons"></i></li>
                                <li><i class="material-icons">chat_bubble</i></li>
                            </ul>
                        </div>
                    </div>
                    <div id="back" class="blur_back" style="background: url('${image_url + response.poster_path}')"></div>
                </div>`

                document.getElementById(place).innerHTML += card

            }

            else {
                release_datee = response.release_date.split("-")[0]
                let card = `<div class="movie_card" onclick="getCastAndDetails(${response.id})" id="bright">
                
                    <div class="info_section">
                        <div class="movie_header">
                            <img id="inner_image" class="locandina" src="${image_url + response.poster_path}" />
                            <h1>${response.title}</h1>
                            <!-- <h4>${release_datee}, David Ayer</h4> -->
                            <h4>${release_datee}</h4>
                            <span class="minutes">${response.runtime} min</span>
                                                
                            <p class="type">${response.genres[0].name}, ${response.genres[1].name}</p>
                            
                        </div>
                        <div class="movie_desc">
                            <p class="text">
                                ${response.overview}
                            </p>
                        </div>
                        <div class="movie_social">
                            <ul>
                                <li><i class="material-icons">share</i></li>
                                <li><i class="material-icons"></i></li>
                                <li><i class="material-icons">chat_bubble</i></li>
                            </ul>
                        </div>
                    </div>
                    <div id="back" class="blur_back" style="background: url('${image_url + response.backdrop_path}')"></div>
                </div>`

                document.getElementById(place).innerHTML += card
            }
        })
}



window.addEventListener("DOMContentLoaded", (e) => { mainPage() })


let k=1

function top_rated_f() {
    k=1;

    document.getElementById("loadmore").addEventListener("click", loadTopRateds)
    document.getElementById("cards").innerHTML = "";
    fulfill_cards(top_rated, "cards")
}

function loadTopRateds(){
    k+=1;
    let url = "https://api.themoviedb.org/3/movie/top_rated?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&page="
    fulfill_cards(url+String(k))  

}

function latest_f() {
    k=1;
    document.getElementById("loadmore").addEventListener("click", loadTopRateds)
    document.getElementById("cards").innerHTML = "";
    fulfill_cards(latest, "cards")
}


function loadLatest(){
    k+=1
    let url = "https://api.themoviedb.org/3/movie/upcoming?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&page="
    fulfill_cards(url+String(k), "cards") 
}


function populars_f() {
    k=1;
    document.getElementById("cards").innerHTML = "";
    fulfill_cards(populars_url, "cards")
}

function loadPopulars(){
    k+=1
    let url = "https://api.themoviedb.org/3/movie/popular?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&page="
    fulfill_cards(url+String(k), "cards") 
    
}

function mainPage() {
    k=1;
    document.getElementById("secondary-div").innerHTML = ""

    document.getElementById("secondary-div").innerHTML += `<div id="div-sort" class="mx-auto col-8 text-center ">
        <h4 id="h4-sort" class="text-center">Sort by</h4>
        <div>
            <button id="btn-sort-1" onclick="populars_f()" class="btn-sort">most popular</button>
            <button id="btn-sort-2" onclick="latest_f()" class="btn-sort">newest</button>
            <button id="btn-sort-3" onclick="top_rated_f()" class="btn-sort">best rated</button>
        </div>
    </div>
        <div id="cards">

        </div>
        <div class="container">
        <button id="loadmore" class="btn btn-heart btn-block" onclick="loadPopulars()">Load More</button>
        </div>

`   
    let url = "https://api.themoviedb.org/3/movie/popular?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&page="

    document.getElementById("cards").innerHTML = "";
    fulfill_cards(url+String(1), "cards")
}








