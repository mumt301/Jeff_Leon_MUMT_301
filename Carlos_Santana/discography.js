// Get a references, to the search input, grid container, and info container 
const searchInput = document.getElementById("searchInput");
const gridContainer = document.getElementById("grid-container");
const infoContainer = document.getElementById("infoContainer");

// Sample discography data
const discography = [
  {
    title: "Shape Shifter",
    releaseDate: "05/15/2012",
    numTracks: 13,
    duration: "57 minutes",
    producers: "Carlos Santana, Eric Bazilian, Walter Afanasieff",
    label: "Starfaith, Sony",
  },
  {
    title: "Guitar Heaven",
    releaseDate: "09/21/2010",
    numTracks: 15,
    duration: "1 hour 4 minutes",
    producers: "Carlos Santana, Clive Davis, Matt Serletic and Howard Benson",
    label: "Arista, Columbia",
  },
  {
    title: "Ultimate Santana",
    releaseDate: "10/16/2007",
    numTracks: 18,
    duration: "1 hour 17 minutes",
    producers: "Fred Catero, Clive Davis",
    label: "Arista, Columbia",
  },
  {
    title: "Shaman",
    releaseDate: "10/22/2002",
    numTracks: 16,
    duration: "1 hour 17 minutes",
    producers: "Andres Munera, Fernando Tobon, Jose Gaviria, Kike Santander,\n" +
    "\tCori Rooney, Dan Shea, Alex Ander, Rick Nowels, Lester Mendez, Dallas Austin,\n" +
    "\tCarlos Santana, Jerry Duplessis, Wyclef Jean, Howard Benson, P.O.D,  Clarence Greenwood\n" +
    "\tDido Armstrong, Rollo Armstrong, Michael Shrieve, Jeeve, Klaus Derendorf, JB Eckl,\n" + 
    "\tKC Porter, Benny Rietveld, Walter Afanasieff",
    label: "Arista Records",
  },
  {
    title: "Corazon",
    releaseDate: "05/06/2014",
    numTracks: 15,
    duration: "58 minutes",
    producers: "Lester Mendez",
    label: "RCA/Sony Latin Iberia",
  }
];

// Function to show information about the queried element
function showInfo(query) {

    gridContainer.style.display = "none";

  // Find the matching album in the discography
  const matchingItem = discography.find((item) => item.title.toLowerCase() === query.toLowerCase());

  if (matchingItem) {
    // Display the matching information
    infoContainer.style.display = "block"; // Show the information container
    infoContainer.innerHTML = `
    <pre class="textBlock">
      <b>${matchingItem.title}</b>
      Release Date: ${matchingItem.releaseDate}
      Number of Tracks: ${matchingItem.numTracks}
      Duration: ${matchingItem.duration}
      Producers: ${matchingItem.producers}
      Label: ${matchingItem.label}
    </pre>
    `;
  } else {
    // If no match is found, clear the infoContainer and hide it
    infoContainer.style.display = "none"; // Hide the information container
  }
}

// Event listener to trigger the search on input change
searchInput.addEventListener("input", function () {
  const searchTerm = this.value;
  showInfo(searchTerm);
});

