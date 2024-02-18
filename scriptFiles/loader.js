
//Loader


function showLoader() {
    document.getElementById('loader').style.display = 'block';
    setTimeout(hideLoader, 1500);
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', showLoader);


window.showLoader = showLoader;
window.hideLoader = hideLoader;