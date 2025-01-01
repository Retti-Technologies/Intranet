// Liste der internen Seiten
const pages = [
    { url: "/sub sites/arduinodata.html", title: "Seite 1" },
    { url: "/sub sites/page2.html", title: "Seite 2" },
    { url: "/sub sites/page3.html", title: "Seite 3" },
];

// Meta-Daten abrufen und anzeigen
async function loadMetaData() {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = ""; // Vorherigen Inhalt leeren

    for (const page of pages) {
        try {
            // Abruf der internen Seite
            const response = await fetch(page.url);
            const text = await response.text();

            // HTML-Inhalt parsen
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");

            // Meta-Daten extrahieren
            const description = doc.querySelector('meta[name="description"]')?.content || "Keine Beschreibung verfügbar";
            const keywords = doc.querySelector('meta[name="keywords"]')?.content || "Keine Schlüsselwörter verfügbar";

            // HTML erstellen
            const div = document.createElement("div");
            div.className = "content-item";
            div.dataset.keywords = keywords.toLowerCase(); // Keywords für die Suche speichern
            div.dataset.url = page.url; // URL für die Weiterleitung speichern
            div.innerHTML = `
                <h2>${page.title}</h2>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Keywords:</strong> ${keywords}</p>
            `;

            // Klick-Event hinzufügen
            div.addEventListener("click", () => {
                window.location.href = page.url; // Weiterleitung zur Seite
            });

            contentDiv.appendChild(div);
        } catch (error) {
            console.error(`Fehler beim Laden von ${page.url}:`, error);
        }
    }
}

// Suchfunktion
function searchContent() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.content-item');
    let hasResults = false;

    items.forEach(item => {
        const keywords = item.dataset.keywords; // Keywords aus dem Dataset abrufen
        if (keywords.includes(input)) {
            item.style.display = "block"; // Anzeigen, wenn das Schlüsselwort gefunden wird
            hasResults = true;
        } else {
            item.style.display = "none"; // Ausblenden, wenn kein Treffer
        }
    });

    const noResultsMessage = document.getElementById('noResults');
    noResultsMessage.style.display = hasResults ? 'none' : 'block'; // Nachricht anzeigen, wenn keine Treffer
}

// Seite initialisieren
loadMetaData();