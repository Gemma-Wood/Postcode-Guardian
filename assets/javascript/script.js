function saveSearchToLocalStorage(postcode) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.unshift(postcode);
    // searches = searches.slice(0, 5); // Keep only last 5 searches
    searches = searches.slice(0, 8); // Keep only last 8 searches
    localStorage.setItem('searches', JSON.stringify(searches));
    updateSearchHistory();
}

function updateSearchHistory() {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    const listGroup = document.querySelector('.search-history');

    // Clear existing items in the list group
    listGroup.innerHTML = '';

    // for (let i = 1; i <= 5; i++) {
    //     const searchElement = document.getElementById(`postcode${i}`);
    //     if (searches[i - 1]) {
    //         searchElement.textContent = searches[i - 1];
    //         searchElement.href = "#";
    //         searchElement.style.display = 'block';
    //         searchElement.onclick = () => fetchPostcodeInfo(searches[i - 1]);
    //     } else {
    //         searchElement.style.display = 'none';
    //     }
    // }

    // Loop through the searches and add them to the list group
    for (let i = 0; i < searches.length; i++) {
        const listItem = document.createElement('a');
        listItem.id = `postcode${i + 1}`;
        listItem.href = '#';
        listItem.className = 'list-group-item list-group-item-action';
        listItem.textContent = searches[i];
        listItem.onclick = () => fetchPostcodeInfo(searches[i]);

        listGroup.appendChild(listItem);
    }
}

document.getElementById('clearHistoryButton').addEventListener('click', function() {
    localStorage.removeItem('searches');
    updateSearchHistory();
});

document.addEventListener('DOMContentLoaded', function() {
    updateSearchHistory();
});