document.getElementById('artistForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const userInput = document.getElementById('userInput').value; // Get user input
    fetchReleaseGroups(userInput);
});

// Fetch Release Groups using AJAX syntax.
function fetchReleaseGroups(artistName) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                filterAndDisplayReleaseGroups(data['release-groups']);
            } else {
                console.error('Error fetching release groups:', xhr.status);
            }
        }
    };
    xhr.open('GET', `https://musicbrainz.org/ws/2/release-group/?query=artist:${artistName}&fmt=json`);
    xhr.send();
}

function filterAndDisplayReleaseGroups(releaseGroups) {
    const validReleases = releaseGroups.filter(release => release['first-release-date']);
    const sortedReleases = validReleases.sort((a, b) => new Date(a['first-release-date']) - new Date(b['first-release-date']));

    displayReleaseGroups(sortedReleases);
}


function displayReleaseGroups(releases) {
    const tableBody = document.getElementById('tableData');
    tableBody.innerHTML = '';

    releases.forEach(release => {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = release.title;
        row.appendChild(titleCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = release['first-release-date'];
        row.appendChild(dateCell);

        tableBody.appendChild(row);
    });
}