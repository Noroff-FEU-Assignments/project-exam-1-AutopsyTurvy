





// errorHandler.js

const displayErrorMessage = (error, containerSelector) => {
    const errorContainer = document.querySelector(containerSelector);
    if (!errorContainer) return;

    let userFriendlyMessage;

   
    switch(error.type) {
        case 'NetworkError':
            userFriendlyMessage = "There's a problem with your network connection. Please try restarting your router, or try again later.";
            break;
        case 'NotFoundError':
            userFriendlyMessage = "The requested resource couldn't be found. It may have been deleted or moved. We will rectify this situation as fast as we can.";
            break;
        case 'ServerError':
            userFriendlyMessage = "Apologies- Our server encountered an error. Please try again a little later.";
            break;
        default:
            userFriendlyMessage = "There was an issue fetching the posts you were looking for. Please try again a bit later!";
    }

    errorContainer.innerHTML = `
        <div class="error-message">
            <strong>Error:</strong> ${userFriendlyMessage}
        </div>`;
};


const clearErrorMessage = (containerSelector) => {
    const errorContainer = document.querySelector(containerSelector);
    if (!errorContainer) return;

    errorContainer.innerHTML = ''; 
};

export { displayErrorMessage, clearErrorMessage };

