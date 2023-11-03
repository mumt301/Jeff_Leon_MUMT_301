document.getElementById('artistForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const userInput = document.getElementById('userInput').value; // Get user input
    fetchReleaseGroups(userInput);
});

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
    const uniqueReleases = {};

    releaseGroups.forEach(release => {
        const releaseDate = release['first-release-date'];
        if (!(release.title in uniqueReleases) || (uniqueReleases[release.title] > releaseDate) && release.date)  {
            uniqueReleases[release.title] = releaseDate;
        }
    });

    const sortedReleases = Object.keys(uniqueReleases)
    .sort((a, b) => {
            if (uniqueReleases[a] < uniqueReleases[b] || uniqueReleases[a] === 'N/A') {
                return -1;
            } else if (uniqueReleases[a] > uniqueReleases[b] || uniqueReleases[b] === 'N/A') {
                return 1;
            } else {
                return 0;
            }
        });

    console.log(sortedReleases);
    displayReleaseGroups(sortedReleases, uniqueReleases);
}

function displayReleaseGroups(releases, uniqueReleases) {
    const tableBody = document.getElementById('tableData');
    tableBody.innerHTML = '';

    releases.forEach(release => {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = release;
        row.appendChild(titleCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = uniqueReleases[release];
        row.appendChild(dateCell);

        tableBody.appendChild(row);
    });
}