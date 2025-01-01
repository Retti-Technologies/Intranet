// Funktion zum Laden einer HTML-Datei und Einfügen in ein Element
function loadTemplate(url, targetId) {
    fetch(url) // Lade die HTML-Datei
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
            }
            return response.text(); // Hole den Textinhalt der Datei
        })
        .then(data => {
            document.getElementById(targetId).innerHTML = data; // Füge den Inhalt ein
        })
        .catch(error => console.error(error));
}

// Header und Footer laden
loadTemplate('/templates/footer.html', 'footer');
