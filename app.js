
const sounds = {
    key1: new Audio('https://www.99sounds.org/free-sound-packs/drum-kit/drum_kit/kick-drum.wav'),
    key2: new Audio('https://www.99sounds.org/free-sound-packs/drum-kit/drum_kit/snare-drum.wav'),
    key3: new Audio('https://www.99sounds.org/free-sound-packs/drum-kit/drum_kit/hihat.wav'),
    key4: new Audio('https://www.99sounds.org/free-sound-packs/drum-kit/drum_kit/tom-1.wav'),
    key5: new Audio('https://www.99sounds.org/free-sound-packs/drum-kit/drum_kit/tom-2.wav'),
    key6: new Audio('https://www.99sounds.org/free-sound-packs/drum-kit/drum_kit/tom-3.wav'),
    key7: new Audio('https://www.99sounds.org/free-sound-packs/drum-kit/drum_kit/cymbal-1.wav'),
    key8: new Audio('https://www.99sounds.org/free-sound-packs/drum-kit/drum_kit/cymbal-2.wav'),
    key9: new Audio('https://www.99sounds.org/free-sound-packs/drum-kit/drum_kit/clap.wav')
  };
  
  let isRecording = [false, false, false, false]; 
  let recordedSounds = [[], [], [], []]; 

  function playSound(key) {
    sounds[key].play();
  }
  

  function startRecording(channel) {
    isRecording[channel] = true;
    document.getElementById(`channel${channel + 1}`).classList.add('recording');
  }
  
 
  function stopRecording(channel) {
    isRecording[channel] = false;
    document.getElementById(`channel${channel + 1}`).classList.remove('recording');
  }
  

  function recordSound(key, channel) {
    if (isRecording[channel]) {
      recordedSounds[channel].push(key);
    }
  }
  
 
  function playRecording(channel) {
    recordedSounds[channel].forEach((key, index) => {
      setTimeout(() => playSound(key), index * 500);
    });
  }
  

  function playAllChannels() {
    recordedSounds.forEach((channel, index) => {
      playRecording(index);
    });
  }
  

  document.querySelectorAll('.key').forEach((button, index) => {
    const key = `key${index + 1}`;
    button.addEventListener('click', () => playSound(key));
    document.addEventListener('keydown', (e) => {
      if (e.key.toUpperCase() === button.textContent) {
        playSound(key);
      }
    });
    
    
    button.addEventListener('mousedown', () => recordSound(key, 0));
  });
  

  document.getElementById('record1').addEventListener('click', () => startRecording(0));
  document.getElementById('record2').addEventListener('click', () => startRecording(1));
  document.getElementById('record3').addEventListener('click', () => startRecording(2));
  document.getElementById('record4').addEventListener('click', () => startRecording(3));
  
  document.getElementById('playAll').addEventListener('click', playAllChannels);
  