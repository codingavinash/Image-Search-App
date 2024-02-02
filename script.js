const apiKey ="t9252zw78JNZX9SatSfsZh4plHzt3M7oIdiiGCFYWVQ";

const form = document.getElementById("form1")
const input = document.getElementById("input-text");
const images = document.querySelector(".images");
const showMore = document.querySelector(".show-more");

let inputData ="";
let page = 1;

async function searchimgs(){
    inputData = input.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const results = data.results;

    if(page === 1){
        images.innerHTML="";
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("images-card");
        const img = document.createElement('img');
        img.src = result.urls.small;
        img.alt = result.alt_description;
        const imgLink = document.createElement('a');
        imgLink.href = result.links.html;
        imgLink.target ="_blank";
        imgLink.textContent = result.alt_description;

        imageWrapper.appendChild(img);
        imageWrapper.appendChild(imgLink);
        images.appendChild(imageWrapper);
    });
    page++;

    if(page>1){
        showMore.style.display = "block";
    }
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    page = 1;
    searchimgs();  
})
showMore.addEventListener('click',()=>{
    searchimgs();  
})