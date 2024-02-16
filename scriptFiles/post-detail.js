
//Post Detail Page-- 


async function fetchPostDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (!postId) {
        window.hideLoader();
        return;
    }

    try {
       
        const response = await fetch(`https://www.the-lore-of-pour.com/wp-json/wp/v2/posts/${postId}?_embed`);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            window.hideLoader(); 
            return;
        }
        const post = await response.json();

        const decodedTitle = decodeHtmlEntities(post.title.rendered);
        const cleanTitle = removeSpecialCharacters(decodedTitle);

        document.getElementById('postTitle').textContent = cleanTitle;
        document.getElementById('postContent').innerHTML = post.content.rendered;

        applyStyling();
    } finally {
        window.hideLoader(); 
    }
}

document.addEventListener('DOMContentLoaded', fetchPostDetails);

function decodeHtmlEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.textContent;
}

function removeSpecialCharacters(text) {
    return text.replace(/[^a-zA-Z\s,:;]/g, '');
}

function applyStyling() {
    const postContent = document.getElementById('postContent');
    postContent.style.textAlign = 'center';

    const images = postContent.getElementsByTagName('img');
    for (let img of images) {
        img.style.display = 'block';
        img.style.marginLeft = 'auto';
        img.style.marginRight = 'auto';

        img.addEventListener('click', function() {
            const modal = document.getElementById('myModal');
            const modalImg = document.getElementById('modalImage');
            modal.style.display = "block";
            modalImg.src = this.src; 
        });
    }

    window.onclick = function(event) {
        const modal = document.getElementById('myModal');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}