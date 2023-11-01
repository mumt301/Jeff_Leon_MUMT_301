document.getElementById('artistForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission to keep seing user input in search bar

    const userInput = document.getElementById('userInput').value; // Fetch the user input

    // Fetch artist releases and display in the table
    fetchArtistReleases(userInput)
        .then(releases => {
            if (releases) {
                displayReleasesTable(releases, userInput); // Pass userInput to display function
            }
        });
});

async function fetchArtistReleases(artistName) {
    try {
        const response = await fetch(`https://musicbrainz.org/ws/2/release/?query=artist:${artistName}&fmt=json`);
        const data = await response.json();
        return data.releases; // Returns array of releases
    } catch (error) {
        console.error('Error fetching artist releases:', error);
        return null;
    }
}

function displayReleasesTable(releases) {
    const tableBody = document.getElementById('tableData');
    tableBody.innerHTML = ''; // Clear previous data

    releases.forEach(release => {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = release.title;
        row.appendChild(titleCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = release.date ? release.date : 'N/A';
        row.appendChild(dateCell);

        tableBody.appendChild(row);
    });
}
