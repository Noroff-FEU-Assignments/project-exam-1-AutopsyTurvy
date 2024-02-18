




// main.js



import { allPostsURL } from './urlCall.js';
import { carouselControls } from './carousel.js';
import { displayErrorMessage } from './errorHandling.js';

async function insertPostTitlesAndImages() {
    window.showLoader();
    try {
        const response = await fetch(allPostsURL); 
        if (!response.ok) { 
  
            throw {type: 'ServerError', message: `Failed to load: ${response.statusText}`};
        }
        const posts = await response.json();
        const postsContainer = document.querySelector('#posts-container');

        let mostRecentPostDate = new Date(Math.max(...posts.map(post => new Date(post.date_gmt))));
        let mostRecentPostId = posts.find(post => new Date(post.date_gmt).getTime() === mostRecentPostDate.getTime()).id;

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';

            const imgRegex = /<img.*?src=["'](.*?)["']/;
            const imgMatch = post.content.rendered.match(imgRegex);
            const imgSrc = imgMatch ? imgMatch[1] : '';
            const imageHTML = imgSrc ? `<a href="sitePages/post-detail.html?postId=${post.id}"><div class="post-image"><img src="${imgSrc}" alt=""></div></a>` : '';

            let mostRecentNote = post.id === mostRecentPostId ? " (Our most recent Article)" : "";
            postElement.innerHTML = imageHTML + `<h2>${post.title.rendered}${mostRecentNote}</h2>`;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
  
        if (error.name === "TypeError") {
            displayErrorMessage({type: 'NetworkError', message: error.message}, '.loader');
        } else {
            displayErrorMessage({type: error.type || 'GeneralError', message: error.message}, '.loader');
        }
    } finally {
        window.hideLoader(); 
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const postsContainer = document.querySelector('#posts-container');
    if (postsContainer) {
        await insertPostTitlesAndImages();
        carouselControls();
    }
});