function saveSearchToLocalStorage(postcode) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];

    if (!searches.includes(postcode)) {
        searches.unshift(postcode);
        searches = searches.slice(0, 8); // 
        localStorage.setItem('searches', JSON.stringify(searches));
        document.getElementById('postcodeInput').value = '';

        updateSearchHistory();
    }
}

function updateSearchHistory() {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    const listGroup = document.querySelector('.search-history');
    listGroup.innerHTML = '';
    for (let i = 0; i < searches.length; i++) {
        const listItem = document.createElement('a');
        listItem.id = `postcode${i + 1}`;
        listItem.href = '#';
        listItem.className = 'list-group-item list-group-item-action';
        listItem.textContent = searches[i];
        listItem.addEventListener('click', function (event) {
            event.preventDefault();
            fetchPostcodeInfo(searches[i]);
        });
        listGroup.appendChild(listItem);
    }
}


document.getElementById('clearHistoryButton').addEventListener('click', function () {
    localStorage.removeItem('searches');
    document.getElementById('postcodeInput').value = '';

    updateSearchHistory();
});

document.addEventListener('DOMContentLoaded', function () {
    updateSearchHistory();
});
