const baseUrl = "https://api.punkapi.com/v2/beers?page=";

const prevPage = document.querySelector(".prevPage")
const nextPage = document.querySelector(".nextPage")
const pageNumber = document.querySelector(".pageNumber")
const beers = document.querySelector(".beers")
const pageText = document.querySelector(".pageNumber")
const abvFilter = document.querySelector(".abvFilter")
const ibuFilter = document.querySelector(".ibuFilter")





let abv = ""
let ibu = ""
let page = 1;


prevPage.addEventListener("click", function(){
    page--;
    getBeers();
    window.scrollTo(0,100);
})

nextPage.addEventListener("click", function(){
    page++;
    getBeers();
    window.scrollTo(0,100);
})

abvFilter.addEventListener("change", function(e){
    if(e.target.value === "all"){
        abv = ""
    }

    else if(e.target.value === "weak"){
        abv = "&abv_lt=5"
        
    }
    else if(e.target.value === "mid"){
        abv = "&abv_gt=5&abv_lt=8"
        
    }
    else if(e.target.value === "strong"){
        abv = "&abv_gt=8"
        
    }
    page = 1;
    getBeers();
})

ibuFilter.addEventListener("change", function(e){
    if(e.target.value === "all"){
        ibu = ""
    }

    else if(e.target.value === "weak"){
        ibu = "&ibu_lt=40"
        console.log("weak")
    }
    else if(e.target.value === "mid"){
        ibu = "&ibu_gt=40&ibu_lt=70"
        console.log("mid")
    }
    else if(e.target.value === "strong"){
        ibu = "&ibu_gt=70"
        console.log("high")
    }
    page = 1;
    getBeers();
})


async function getBeers(){

    const response = await fetch(baseUrl + page + abv + ibu);
    const data = await response.json();
    
    let html = "";
     data.forEach(element => { 
        html += `<li class = "beer-card">
                    <div class="beerInfo">
                    <h1>${element.name}</h1>
                    <h4><em>${element.tagline}</em></h4>
                    <img class="beer-image" src="${element.image_url}">
                    <p class = "description">
                    <span> ${element.description} </span>
                    <span>Pair with: ${element.food_pairing}</span>
                    </p>
                    </div>
                    <p class = "values"><span>ABV: ${element.abv}</span> <span>IBU: ${element.ibu}</span></p>
                 </li>`
        
    });

    if(page===1){
        prevPage.disabled = true;
    }
    else{
        prevPage.disabled = false;
    }

    if(data.length<25){
        nextPage.disabled = true;
    }
    else{
        nextPage.disabled = false;
    }


    beers.innerHTML = html;
    pageNumber.textContent = page;

    
}



getBeers();






