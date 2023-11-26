"use strict";

// Turn theremin on
function thereminOn(oscillator) {
  oscillator.play();
}

// Control the theremin
function thereminControl(e, oscillator, theremin) {
  let x = e.offsetX;
  let y = e.offsetY;
  console.log(x, y);

  let minFrequency = 220.0;
  let maxFrequency = 880.0;
  let freqRange = maxFrequency - minFrequency;
  let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
  let thereminVolume = 1.0 - y / theremin.clientHeight;

  const tooltip = document.getElementById("tooltip");
  tooltip.style.left = e.clientX + 10 + "px";
  tooltip.style.top = e.clientY + 10 + "px";

  const toggleCheckbox = document.getElementById("toggleCheckbox");
  if (toggleCheckbox.checked) {
    console.log(
      "Frequency: ",
      midiToFrequency(Math.round(frequencyToMidi(thereminFreq)))
    );
    const therminFreqTuned = midiToFrequency(
      Math.round(frequencyToMidi(thereminFreq))
    );

    const noteTuned = noteFromFrequency(therminFreqTuned,false)

    tooltip.innerText = noteTuned + ", " + therminFreqTuned.toFixed(2) + " Hz";
    oscillator.frequency = therminFreqTuned;
  } else {
    console.log("Frequency: ", thereminFreq);
    const noteDetuned = noteFromFrequency(thereminFreq,false)
    tooltip.innerText = noteDetuned + ", " + thereminFreq.toFixed(2) + " Hz";
    oscillator.frequency = thereminFreq;
  }

  console.log("Volume: ", thereminVolume);
  oscillator.volume = thereminVolume;
}

// Turn theremin off
function thereminOff(oscillator) {
  oscillator.stop();
}

function runAfterLoadingPage() {
  // Create a tooltip element
  const tooltip = document.createElement("div");
  tooltip.id = "tooltip";
  tooltip.style.position = "absolute";
  tooltip.style.display = "none";
  tooltip.style.backgroundColor = "#333";
  tooltip.style.color = "#fff";
  tooltip.style.padding = "5px";
  document.body.appendChild(tooltip);

  // Instantiate a sine wave with pizzicato.js
  const oscillator = new Pizzicato.Sound({
    source: "wave",
    options: {
      type: "sine",
      frequency: 220,
    },
  });

  // Get the theremin div from the html
  const theremin = document.getElementById("thereminZone");
  const toggleCheckbox = document.getElementById("toggleCheckbox");

  // Theremin plays when the mouse enters the theremin div
  theremin.addEventListener("mouseenter", function () {
    thereminOn(oscillator);
  });

  // Theremin is controlled while the mouse is inside the theremin div
  theremin.addEventListener("mousemove", function (e) {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "block";

    thereminControl(e, oscillator, theremin);
  });

  // Theremin stops when the mouse leaves the theremin div
  theremin.addEventListener("mouseleave", function () {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
    thereminOff(oscillator);
  });
}

window.onload = runAfterLoadingPage;
