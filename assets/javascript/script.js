function saveSearchToLocalStorage(postcode) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Check if the postcode is already in the list
    if (!searches.includes(postcode)) {
        searches.unshift(postcode);
        // searches = searches.slice(0, 5); // Keep only last 5 searches
        searches = searches.slice(0, 8); // Keep only last 8 searches
        localStorage.setItem('searches', JSON.stringify(searches));

        // Clear the search input value
        document.getElementById('postcodeInput').value = '';

        updateSearchHistory();
    }
}

function updateSearchHistory() {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    const listGroup = document.querySelector('.search-history');

    // Clear existing items in the list group
    listGroup.innerHTML = '';

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

document.getElementById('clearHistoryButton').addEventListener('click', function () {
    localStorage.removeItem('searches');

    // Clear the search input value
    document.getElementById('postcodeInput').value = '';

    updateSearchHistory();
});

document.addEventListener('DOMContentLoaded', function () {
    updateSearchHistory();
});
