const accessKey = "2UOzj3ant2Jq_dFqdBx7aN3YFDgvfL_72KK9jHCSp1w";

const form = document.querySelector("form");
const input = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImage(){
    inputData = input.value ;
    const url  = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    // fetch data of url
    const response = await fetch(url);
    // convert the fetch data into json formate
    const data = await response.json();
    
    // json to image and text
    const results = data.results;
    
    if(page === 1){
        searchResults.innerHTML= "" ;
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
       
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });

page++;
if(page > 1){
   showMore.style.diplay= "block"; 
}
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImage();
});
showMore.addEventListener("click", (event) => {
    searchImage();
});