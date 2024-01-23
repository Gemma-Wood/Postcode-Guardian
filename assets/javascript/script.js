function saveSearchToLocalStorage(postcode) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.unshift(postcode);
    searches = searches.slice(0, 5); // Keep only last 5 searches
    localStorage.setItem('searches', JSON.stringify(searches));
    updateSearchHistory();
}

// function updateSearchHistory() {
//     const searches = JSON.parse(localStorage.getItem('searches')) || [];
//     for (let i = 1; i <= 5; i++) {
//         const searchElement = document.getElementById(`postcode${i}`);
//         if (searches[i - 1]) {
//             searchElement.textContent = searches[i - 1];
//             searchElement.onclick = () => fetchPostcodeInfo(searches[i - 1]);
//             searchElement.style.display = 'block';
//         } else {
//             searchElement.style.display = 'none';
//         }
//     }
// }

function updateSearchHistory() {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    for (let i = 1; i <= 5; i++) {
        const searchElement = document.getElementById(`postcode${i}`);
        if (searches[i - 1]) {
            searchElement.textContent = searches[i - 1];
            searchElement.href = "#"; // Resetting href if you need it for something
            searchElement.style.display = 'block';
            searchElement.onclick = () => fetchPostcodeInfo(searches[i - 1]);
        } else {
            searchElement.style.display = 'none';
        }
    }
}

document.getElementById('clearHistoryButton').addEventListener('click', function() {
    localStorage.removeItem('searches');
    updateSearchHistory();
});

document.addEventListener('DOMContentLoaded', function() {
    updateSearchHistory();
});