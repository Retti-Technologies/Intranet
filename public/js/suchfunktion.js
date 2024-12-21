function searchContent() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.content-item');
    let hasResults = false;

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const title = item.getAttribute('data-title').toLowerCase();

        if (text.includes(input) || title.includes(input)) {
            item.classList.remove('hidden');
            hasResults = true;
        } else {
            item.classList.add('hidden');
        }
    });

    // Keine Ergebnisse gefunden
    const noResultsMessage = document.getElementById('noResults');
    noResultsMessage.style.display = hasResults ? 'none' : 'block';
}
