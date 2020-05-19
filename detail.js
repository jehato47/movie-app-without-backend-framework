let image_url = "https://image.tmdb.org/t/p/w500"
let search_url = "https://api.themoviedb.org/3/search/movie?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&query=fight&page=1&include_adult=false"
let recommendation_url1 = "https://api.themoviedb.org/3/movie/"
let recommendation_url2 = "/recommendations?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&page=1"
let populars_url = "https://api.themoviedb.org/3/movie/popular?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&page=1"
let top_rated = "https://api.themoviedb.org/3/movie/top_rated?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&page=1"
let latest = "https://api.themoviedb.org/3/movie/upcoming?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&page=1"
let film_url = "https://api.themoviedb.org/3/movie/550?api_key=9240023865dd052e90b0564d9b5f6179"
let film_url1 = "https://api.themoviedb.org/3/movie/"
let film_url2 = "?api_key=9240023865dd052e90b0564d9b5f6179"
let trailer_key1 = "http://api.themoviedb.org/3/movie/"
let trailer_key2 = "/videos?api_key=9240023865dd052e90b0564d9b5f6179"
let youtube_url = "https://www.youtube.com/watch?v="
let cast_url_and_details1 = "https://api.themoviedb.org/3/movie/"
let cast_url_and_details2 = "?api_key=9240023865dd052e90b0564d9b5f6179&append_to_response=credits"
let cast_url2 = "https://api.themoviedb.org/3/movie/551/credits?api_key=9240023865dd052e90b0564d9b5f6179"
let len1;
let len;



let details = {};
async function getCastAndDetails(idd) {
    // This is the main function of the details page
    // We do three basic things here
    // Take data and let it to an object 
    // After that we use our object in template literal

    await fetch(cast_url_and_details1 + String(idd) + cast_url_and_details2)
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(response => {
            details.genres = response.genres
            details.casts = response.credits.cast
            details.response = response

        })

    await fetch(trailer_key1 + String(idd) + trailer_key2)
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(response => details.url = response)

    await fetch(recommendation_url1 + String(idd) + recommendation_url2)
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(response => {
            details.recommendations = response.results
        })

        len1 = details.recommendations.length
        len = details.casts.length

    
    createDetailPage()
    createCasts()
    createRecoms()

}





let r = 0;
function createRecoms(){
    let recomDiv = document.getElementById("recom-cards")
    
        while(len1 > 0){
            

            let card = `<div onclick="getCastAndDetails(${details.recommendations[r].id})" class="movie_card" id="bright">
                    <div class="info_section">
                        <div class="movie_header">
                            <img id="inner_image" class="locandina" src="${image_url + details.recommendations[r].poster_path}" />
                            <h1>${details.recommendations[r].title}</h1>
                            <!-- <h4>${release_datee}, David Ayer</h4> -->
                            <h4>${release_datee}</h4>
                            
                            
                        </div>
                        <div class="movie_desc">
                            <p class="text">
                                ${details.recommendations[r].overview}
                            </p>
                        </div>
                        
                    </div>
                    <div id="back" class="blur_back" style="background: url('${image_url + details.recommendations[r].poster_path}')"></div>
                </div>`
                recomDiv.innerHTML += card

                len1 -=1
                r+=1 
                if(len === r || r % 6===0){
                    break
                }
        }
}




let point = 0
let x = 0;

function createCasts() {

    
    while (len > 1) {
        let cast = `<div style="background:#111111; display: flex; justify-content: space-between; align-items: center;"
                                            class="col-md-5 m-4">
                                            <img style="width: 80px; height: 120px"
                                                src="https://image.tmdb.org/t/p/w500${details.casts[x].profile_path}" alt="">
                                                <div style="margin-right: auto;margin-left: 30px;">
                                                    <h3>${details.casts[x].name}</h3>
                                                    <h4>${details.casts[x].character}</h4>
                                                </div>
</div>`
        document.getElementById("castcrew").innerHTML += cast;
        len -= 1;
        x += 1;

        if (x % 6 === 0) {
            break;
        }
    }
}


function createDetailPage() {
    if (details.url.results.length === 0) {
        let card1 = `<div class="container" style="display:flex; justify-content:center">
            <div class="row justify-content-center mt-4">
                <div style="color:#CCCCCC; width: 185px; display: flex; flex-direction: column;" class="box">
                    <img width="100%" src="${image_url + details.response.poster_path}" alt="">

                        <div>
                            <h3 class="text-center left-info">Stars</h3>
                            <h3 class="text-center left-info">Votes</h3>
                        </div>

                        <div>
                            <button class="btn btn-block btn-heart">
                                Heart
            </button>
                        </div>

                        <div class="left-info-div" style="margin-bottom: 20px;">
                            <div>${details.genres[0].name}</div>
                            <!--<div></div>-->
                </div>

                        <div class="left-info-div">
                            <span class="left-info-span">Released</span>
                            <h3 class="left-info">${details.response.release_date}</h3>
                        </div>

                        <div class="left-info-div">
                            <span class="left-info-span">Director</span>
                            <h3 class="left-info">James Gray</h3>
                        </div>

                        <div class="left-info-div">
                            <span class="left-info-span">Runtime</span>
                            <h3 class="left-info">${details.response.runtime}min</h3>
                        </div>

                        <div class="left-info-div">
                            <span class="left-info-span">Budget</span>
                            <h3 class="left-info">$${details.response.budget}</h3>
                        </div>

                        <div class="left-info-div">
                            <span class="left-info-span">Revenue</span>
                            <h3 class="left-info mb-5">$${details.response.revenue}</h3>
                        </div>

    </div>
                    <div class="box col-md-7" style="color: #CCCCCC; margin-left: 30px">

                        <div style="margin-bottom: 30px">
                            <h1>${details.response.title}</h1>
                            <h4>${details.response.tagline}</h4>
                        </div>

                        <p style="margin-bottom: 40px">${details.response.overview}</p>

                        <div style="display: flex; flex-direction: column;">
                            <h2 style="margin-bottom: 30px;">Cast & Crew</h2>
                            <div class="row p-3" id="castcrew">

                                <!-- Create Casts Function Fulfills Here With Casts And Details -->

</div>
                            <button onclick="createCasts()" class="btn btn-heart btn-block" style="align-self: center; ">See More</button>
                        </div>

                        <div>
                            <div id="trailer">
                                <h2 style="margin: 35px 0;">Trailer</h2>
                                <iframe allowfullscreen style="width: 100%; height: 30vw;" src="https://www.youtube.com/embed/"
                                    allow="accelerometer ;autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    frameborder="0" class="sc-kGXeez ekwPLV"></iframe>
                            </div>
                            <h2 style="margin-top: 50px">Recommendations</h2>
                            <div id="recom-cards">

                            </div>

                            <button id="recommandations" onclick="createRecoms()" class="btn btn-heart btn-block">See More</button>
                        </div>

                    </div>
                </div>
            </div>
                            `
                            document.getElementById("secondary-div").innerHTML = card1


    }

    else{
                let card1 = `<div class="container" style="display:flex; justify-content:center">
                <div class="row justify-content-center mt-4">
                    <div style="color:#CCCCCC; width: 185px; display: flex; flex-direction: column;" class="box">
                        <img width="100%" src="${image_url + details.response.poster_path}" alt="">

                            <div>
                                <h3 class="text-center left-info">Stars</h3>
                                <h3 class="text-center left-info">Votes</h3>
                            </div>

                            <div>
                                <button class="btn btn-block btn-heart">
                                    Heart
            </button>
                            </div>

                            <div class="left-info-div" style="margin-bottom: 20px;">
                                <div>${details.genres[0].name}</div>
                                <!--<div></div>-->
                </div>

                            <div class="left-info-div">
                                <span class="left-info-span">Released</span>
                                <h3 class="left-info">${details.response.release_date}</h3>
                            </div>

                            <div class="left-info-div">
                                <span class="left-info-span">Director</span>
                                <h3 class="left-info">James Gray</h3>
                            </div>

                            <div class="left-info-div">
                                <span class="left-info-span">Runtime</span>
                                <h3 class="left-info">${details.response.runtime}min</h3>
                            </div>

                            <div class="left-info-div">
                                <span class="left-info-span">Budget</span>
                                <h3 class="left-info">$${details.response.budget}</h3>
                            </div>

                            <div class="left-info-div">
                                <span class="left-info-span">Revenue</span>
                                <h3 class="left-info mb-5">$${details.response.revenue}</h3>
                            </div>

    </div>
                        <div class="box col-md-7" style="color: #CCCCCC; margin-left: 30px">

                            <div style="margin-bottom: 30px">
                                <h1>${details.response.title}</h1>
                                <h4>${details.response.tagline}</h4>
                            </div>

                            <p style="margin-bottom: 40px">${details.response.overview}</p>

                            <div style="display: flex; flex-direction: column;">
                                <h2 style="margin-bottom: 30px;">Cast & Crew</h2>
                                <div class="row p-3" id="castcrew">

                                    <!-- Create Casts Function Fulfills Here With Casts And Details -->

</div>
                                <button onclick="createCasts()" class="btn btn-heart btn-block" style="align-self: center; ">See More</button>
                            </div>

                            <div>
                                <div id="trailer">
                                    <h2 style="margin: 35px 0;">Trailer</h2>
                                    <iframe allowfullscreen style="width: 100%; height: 30vw;" src="https://www.youtube.com/embed/${details.url.results[0].key}"
                                        allow="accelerometer ;autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        frameborder="0" class="sc-kGXeez ekwPLV"></iframe>
                                </div>
                                <h2 style="margin-top: 50px">Recommendations</h2>
                                <div id="recom-cards">

                                </div>

                                <button id="recommandations" onclick="createRecoms()" class="btn btn-heart btn-block">See More</button>
                            </div>

                        </div>
                    </div>
                </div>`
                            document.getElementById("secondary-div").innerHTML = card1

                        }


}





