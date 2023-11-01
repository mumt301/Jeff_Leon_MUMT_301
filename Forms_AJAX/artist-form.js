//const searchResult = document.getElementById("searchResult");
const artistName = document.getElementById('userInput');
document.getElementById('artistForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const artistName = document.getElementById('userInput').value;
    

    // Fetch artist releases and display in the table
    fetchArtistReleases(artistName)
    .then(releases => {
        if (releases) {
        console.log('Releases for ' + artistName + ':', releases);
        //displayReleasesTable(releases);
        }
        
    });
});

async function fetchArtistReleases() {
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

    releases.forEach(release => {
        if(release.name === artistName) {
            const row = document.createElement('tr');

            const titleCell = document.createElement('td');
            titleCell.textContent = release.title;
            row.appendChild(titleCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = release.date ? release.date : 'N/A';
            row.appendChild(dateCell);

            tableBody.appendChild(row);
        }
        
    });
}


    

