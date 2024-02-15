// Post Card Page




import { baseURL, cardPostsURL } from './urlCall.js'; 


// My total number of posts was 20-- remember this :)
let currentIndex = 0;
const postsPerPage = 10; 
let totalPosts = [];





async function insertPostCards(loadMore = false) {
    const cardLoader = document.getElementById('loader');
    try {
        if (!loadMore) {
            currentIndex = 0; 
            document.querySelector('#cards-container').innerHTML = '';
        }
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
        document.getElementById('see-more-button').style.display = currentIndex < totalPosts.length ? 'block' : 'none'; 
        document.getElementById('see-less-button').style.display = currentIndex > postsPerPage ? 'block' : 'none';
    } catch (error) {
        console.error("We could not fetch the posts for cards: ", error);
        cardLoader.style.display = 'none';
    }
}

function seeLessPosts() {
 
    document.getElementById('see-less-button').style.display = 'none';


    document.querySelector('#cards-container').innerHTML = '';


    currentIndex = 0;
    totalPosts = [];
    insertPostCards(); 
}

document.addEventListener('DOMContentLoaded', () => {
    insertPostCards();

    const loadMoreBtn = document.getElementById('see-more-button');
    loadMoreBtn.style.display = 'block'; 

    loadMoreBtn.addEventListener('click', () => {
        insertPostCards(true); 
    });

    const seeLessBtn = document.getElementById('see-less-button'); 
    seeLessBtn.addEventListener('click', seeLessPosts);
});