// Loader.js


function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', showLoader);


window.showLoader = showLoader;
window.hideLoader = hideLoader;