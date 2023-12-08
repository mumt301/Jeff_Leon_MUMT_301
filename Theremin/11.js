{

  const clientId = "fX3zHMxUmnFfBl0qGGdc";
  const apiKey = "yOnyq6VEvqqbCoiB2dHWpNP9Y7SrmXcQFGUVZ2Xi";

  async function loadSounds() {
    try {
      var sounds = {
        orchestra: await fetchSound('1289'),
        anxious: await fetchSound('1294'),
      };

      const soundCheckbox = document.getElementById("soundCheckbox");
      const sound = sounds[document.getElementById("soundSelect").value]

      if (soundCheckbox.checked) {
        console.log(sound);
      }
    } catch (error) {
      console.error("Error loading sounds:", error);
    }
  }

  async function fetchSound(soundId) {
    const apiUrl = `https://freesound.org/apiv2/sounds/${soundId}/?token=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error loading sound: ${response.statusText}`);
    }

    const soundData = await response.json();
    return soundData;
  }

  function midiToFrequency(midinumber, concertA = 440) {
    // converts a MIDI note number into its equivalent frequency.
    const A4 = 69
    if (midinumber === A4) {
        return concertA;
    }
    let semitones = midinumber - A4;
    return interval(440, semitones);
}

  // Instantiate a sine wave with pizzicato.js
  let oscillator = new Pizzicato.Sound({
    source: "wave",
    options: {
      type: "sine",
      frequency: 220,
    },
  });

  var effects = {
    reverb: new Pizzicato.Effects.Reverb({
      time: 3, // Reverb time in seconds
      decay: 0.8, // Reverb decay
      reverse: false, // Whether to use reverse reverb
      mix: 0.5,
    }),

    delay: new Pizzicato.Effects.Delay({
      feedback: 0.4,
      time: 0.3,
      mix: 0.4,
    }),

    flanger: new Pizzicato.Effects.Flanger({
      time: 0.45,
      speed: 0.2,
      depth: 0.1,
      feedback: 0.1,
      mix: 0.5,
    }),
  };

  // Turn theremin on
  function thereminOn(oscillator) {
    const fxCheckbox = document.getElementById("fxCheckbox");
    const effect = effects[document.getElementById("effectsSelect").value];

    if (!fxCheckbox.checked) {
      oscillator.removeEffect(effect);
      oscillator.play();
    } else {
      console.log(effect);
      oscillator.addEffect(effect);
      oscillator.play();
    }
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

      const noteTuned = noteFromFrequency(therminFreqTuned, false);

      tooltip.innerText =
        noteTuned + ", " + therminFreqTuned.toFixed(2) + " Hz";
      oscillator.frequency = therminFreqTuned;
    } else {
      console.log("Frequency: ", thereminFreq);
      const noteDetuned = noteFromFrequency(thereminFreq, false);
      tooltip.innerText = noteDetuned + ", " + thereminFreq.toFixed(2) + " Hz";
      oscillator.frequency = thereminFreq;
    }

    console.log("Volume: ", thereminVolume);
    oscillator.volume = thereminVolume;
  }

  // Turn theremin off
  function thereminOff(oscillator) {
    const effect = effects[document.getElementById("effectsSelect").value];
    oscillator.removeEffect(effect);
    oscillator.stop();
  }

  function getSelectedWaveform() {
    const selectedWaveform = document.getElementById("waveformSelect").value;
    console.log(selectedWaveform);
    oscillator = new Pizzicato.Sound({
      source: "wave",
      options: {
        type: selectedWaveform,
        frequency: 220,
      },
    });
  }

  function runAfterLoadingPage() {
    // Create a tooltip element
    const tooltip = document.createElement("div");
    tooltip.id = "tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.backgroundColor = "#333";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "5px";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);

    // Get the theremin div from the html
    const theremin = document.getElementById("thereminZone");
    //const toggleCheckbox = document.getElementById("toggleCheckbox");

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
}
