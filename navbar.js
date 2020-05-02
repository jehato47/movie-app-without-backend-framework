let search = "https://api.themoviedb.org/3/search/movie?api_key=9240023865dd052e90b0564d9b5f6179&language=en-US&query="
let search2 = "&page="
let search3 = "&include_adult=false"




document.getElementById("search_form").addEventListener("submit", (e) => {
    target = document.getElementById("search").value
    url = search + target + search2 + "1" + search3
    fetch(url)
        .then(response => response.text())
        .then(response => console.log(JSON.parse(response)))
    let cards = document.getElementById("cards")

    // This is because if you go to details it will clear secondary div
    cards != undefined ?  cards.innerHTML = "": document.getElementById("secondary-div").innerHTML=""
    cards != undefined ?  cards.innerHTML = "": document.getElementById("secondary-div").innerHTML+=cards

    fulfill_cards(search + target + search2, "secondary-div")

    e.preventDefault()
})
