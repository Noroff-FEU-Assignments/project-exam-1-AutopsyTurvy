
//Loader


function showLoader() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('nav-bar-footer').classList.add('invisible');

    setTimeout(hideLoader, 1500);
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';

    document.getElementById('nav-bar-footer').classList.remove('invisible');
}

document.addEventListener('DOMContentLoaded', showLoader);


window.showLoader = showLoader;
window.hideLoader = hideLoader;