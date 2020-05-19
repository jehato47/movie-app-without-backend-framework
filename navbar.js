let search = "https://api.themoviedb.org/3/search/movie?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&query="
let search2 = "&page="
let search3 = "&include_adult=false"



document.getElementById("search_form").addEventListener("submit", (e) => {
    target = document.getElementById("search").value
    url = search + target + search2 + "1" + search3


    let cards = document.getElementById("cards")

    // This is because if you go to details it will clear secondary div
    
        document.getElementById("secondary-div").innerHTML=""
        document.getElementById("secondary-div").innerHTML+=`<div id="div-sort" class="mx-auto col-8 text-center ">
        <h4 id="h4-sort" class="text-center">Sort by</h4>
        <div>
            <button id="btn-sort-1" onclick="populars_f()" class="btn-sort">most popular</button>
            <button id="btn-sort-2" onclick="latest_f()" class="btn-sort">newest</button>
            <button id="btn-sort-3" onclick="top_rated_f()" class="btn-sort">best rated</button>
        </div>
    </div>`
        fulfill_cards(search + target + search2, "secondary-div")

    e.preventDefault()
})








