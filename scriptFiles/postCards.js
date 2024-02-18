




// Post Card Page





import { cardPostsURL } from './urlCall.js'; 

let currentIndex = 0;
const postsPerPage = 10; 
let totalPosts = [];

async function insertPostCards(loadMore = false) {
    try {
        if (!loadMore) {
            currentIndex = 0; 
            document.querySelector('#cards-container').innerHTML = '';
            window.showLoader(); 
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

        document.getElementById('see-more-button').style.display = currentIndex < totalPosts.length ? 'block' : 'none';
        document.getElementById('see-less-button').style.display = currentIndex > postsPerPage ? 'block' : 'none';
    } catch (error) {
        console.error("We could not fetch the posts for cards: ", error);

     
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message'; 
        errorDiv.textContent = "Something went wrong while fetching the posts. Please try again later.";
        const cardsContainer = document.querySelector('#cards-container');
        cardsContainer.appendChild(errorDiv); 

        document.getElementById('see-more-button').style.display = 'none';
    } finally {
        window.hideLoader();
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

    document.getElementById('see-more-button').addEventListener('click', () => {
        insertPostCards(true); 
    });

    document.getElementById('see-less-button').addEventListener('click', seeLessPosts); 
});