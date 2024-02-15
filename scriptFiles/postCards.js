
import { baseURL, cardPostsURL } from './urlCall.js'; 


let currentIndex = 0;
const postsPerPage = 10; 
let totalPosts = [];





async function insertPostCards(loadMore = false) {
    if (!loadMore) {
        currentIndex = 0;
    }
    const cardLoader = document.getElementById('loader');
    try {
        if (totalPosts.length === 0) { 
            const response = await fetch(cardPostsURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            totalPosts = await response.json();
        }

        const postsToShow = totalPosts.slice(currentIndex, currentIndex + postsPerPage);
        currentIndex += postsToShow.length;

        const cardsContainer = document.querySelector('#cards-container');

        postsToShow.forEach(post => {
            const cardElement = document.createElement('div');
            cardElement.className = 'post-card';
         
            const imgRegex = /<img.*?src=["'](.*?)["']/;
            const imgMatch = post.content.rendered.match(imgRegex);
            const imgSrc = imgMatch ? imgMatch[1] : '';

            const imageHTML = imgSrc ? `<a href="/sitePages/post-detail.html?postId=${post.id}"><div class="post-card-image"><img src="${imgSrc}" alt=""></div></a>` : '';

            cardElement.innerHTML = imageHTML + `<h2>${post.title.rendered}</h2>`;

            cardsContainer.appendChild(cardElement);
        });

        cardLoader.style.display = 'none';
    } catch (error) {
        console.error("We could not fetch the posts for cards: ", error);
        cardLoader.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', (event) => {
    const cardsContainer = document.querySelector('#cards-container');
    if (cardsContainer) {
        insertPostCards();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.getElementById('load-more-button');
    loadMoreBtn.style.display = 'block'; 

    loadMoreBtn.addEventListener('click', () => {
        insertPostCards(true); 
        if (currentIndex >= totalPosts.length) {
            loadMoreBtn.style.display = 'none'; 
        }
    });
});