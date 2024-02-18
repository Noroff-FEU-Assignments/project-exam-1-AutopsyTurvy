

    

// Post Detail Page


async function fetchPostDetails() {
    let postContainer = document.getElementById('post-container');
    if (!postContainer) {
        postContainer = document.createElement('div');
        postContainer.id = 'post-container';



        
        //note 
        //attaching the error to an element within the html created odd behaviour
        //the post-container is in my index.html- this should create another div, in the event of an error :)



        document.body.appendChild(postContainer); 
    }

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (!postId) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Error: Post ID is missing.';
        errorMessage.className = 'error-message';
        postContainer.appendChild(errorMessage);
        return;
    }

    try {
        const response = await fetch(`https://www.the-lore-of-pour.com/wp-json/wp/v2/posts/${postId}?_embed`);
        if (!response.ok) {
            console.error('Failed to load: HTTP error! status:', response.status); 
            postContainer.textContent = `Error: Failed to load post. Status: ${response.status}`;
            return;
        }
        const post = await response.json();

        const decodedTitle = decodeHtmlEntities(post.title.rendered);
        const cleanTitle = removeSpecialCharacters(decodedTitle);

        document.getElementById('postTitle').textContent = cleanTitle;
        document.getElementById('postContent').innerHTML = post.content.rendered;

        applyStyling();
    } catch (error) {
        console.error('An unexpected error occurred:', error.message); 
        postContainer.textContent = 'Error: An unexpected error occurred.';
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
            if (this.src.trim() !== '') {
                modalImg.src = this.src;
                modalImg.style.display = 'block'; 
                modal.style.display = "block";
            } else {
                console.log('Empty image src, not displaying modal.');
            }
        });
    }

    window.onclick = function(event) {
        const modal = document.getElementById('myModal');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}