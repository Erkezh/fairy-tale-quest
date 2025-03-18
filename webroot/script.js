/** @typedef {import('../src/message.ts').DevvitSystemMessage} DevvitSystemMessage */
/** @typedef {import('../src/message.ts').WebViewMessage} WebViewMessage */

const storyNodes = {
  start: {
    text: "On a cold autumn evening, you receive a mysterious letter carried by the wind. The parchment bears faint runes and words that beckon you into the ancient forest, where the secrets of your lineage lie hidden.",
    choices: [
      { text: "Read the letter", next: "readLetter" },
      { text: "Discard the letter and forget it", next: "ignoreLetter" }
    ]
  },
  readLetter: {
    text: "You carefully read the letter. It speaks of an ancient prophecy linking your family to the forest’s mysteries—of sacrifice, trials, and the path to ancestral wisdom. A burning desire to know the truth fills you.",
    choices: [
      { text: "Venture into the forest", next: "forestEntrance" },
      { text: "Keep the letter and search for clues at home", next: "homeClues" }
    ]
  },
  ignoreLetter: {
    text: "You decide the letter is nothing more than a fanciful tale and try to forget about it. Yet that night, strange sounds disturb your sleep, and an unsettling feeling lingers... In time, you realize you have missed your chance to change your fate. The End.",
    choices: []
  },
  homeClues: {
    text: "At home, you discover an old diary once belonging to your ancestors. The entries hint that the path to ancient knowledge lies through the forest—filled with both dangers and answers about your origins.",
    choices: [
      { text: "Venture into the forest", next: "forestEntrance" },
      { text: "Keep the diary and wait for a sign", next: "waiting" }
    ]
  },
  waiting: {
    text: "Days pass in silent anticipation, yet the quiet deepens your unease. Finally, haunting visions make it clear: the time to act has come. You pack your belongings and head into the forest.",
    choices: [
      { text: "Step into the forest", next: "forestEntrance" }
    ]
  },
  forestEntrance: {
    text: "At the edge of the forest, a thick mist and rustling leaves greet you—as if the forest itself is alive. Two trails lie before you: one leads to ancient ruins, the other deep into the woods where ancestral voices are said to dwell.",
    choices: [
      { text: "Take the path to the ruins", next: "ruins" },
      { text: "Venture into the deep woods", next: "deepWoods" }
    ]
  },
  ruins: {
    text: "You arrive at overgrown ruins, shrouded in moss and vines. Here you find a carved statue adorned with the same runes as on the letter. An aura of ancient power lingers in the air.",
    choices: [
      { text: "Examine the statue", next: "statue" },
      { text: "Search the ruins for more clues", next: "exploreRuins" }
    ]
  },
  deepWoods: {
    text: "In the depths of the woods, you hear soft whispers. The forest seems to breathe, and unseen forces guide your steps. Soon you discover an ancient altar cloaked in shadows.",
    choices: [
      { text: "Touch the altar", next: "altarTouch" },
      { text: "Turn back and choose the other path", next: "forestEntrance" }
    ]
  },
  statue: {
    text: "Examining the statue, you notice one of its features appears to move. The carved eye begins to glow, and a voice from the depths of time whispers of your destiny.",
    choices: [
      { text: "Embrace your fate and continue", next: "voiceGuide" },
      { text: "Reject the call", next: "statueRejection" }
    ]
  },
  exploreRuins: {
    text: "While exploring the ruins, you uncover ancient inscriptions and symbols that weave a mysterious tale of a lost battle and a sacrificial act to save the forest.",
    choices: [
      { text: "Record the findings in your diary", next: "gatherInfo" },
      { text: "Return to the statue", next: "statue" }
    ]
  },
  altarTouch: {
    text: "Upon touching the altar, you are struck by a sudden vision—flashes of ancient rituals, battles, and loss. You feel your ancestors’ wisdom surging within, though at a steep price.",
    choices: [
      { text: "Accept the vision and move forward", next: "voiceGuide" },
      { text: "Reject the vision and flee", next: "runAway" }
    ]
  },
  voiceGuide: {
    text: "The mysterious voice becomes your guide, leading you to a hidden sanctuary where the secrets of your lineage are etched in stone. On this path, trials await that will forever alter your destiny.",
    choices: [
      { text: "Proceed to the sanctuary", next: "sanctuary" },
      { text: "Seek allies among the forest spirits", next: "forestSpirits" }
    ]
  },
  statueRejection: {
    text: "You reject the call of the statue, and darkness begins to close in. The forest grows hostile, and you realize you've forfeited your chance to unlock ancestral power. The End.",
    choices: []
  },
  gatherInfo: {
    text: "Recording the ancient clues, you understand that the key to saving the forest—and realizing your destiny—lies within a hidden sanctuary deep in the woods. With your diary in hand, you set forth.",
    choices: [
      { text: "Head to the sanctuary", next: "sanctuary" }
    ]
  },
  runAway: {
    text: "Overwhelmed by fear, you flee from the woods. Yet the shadow of lost knowledge haunts you for the rest of your days. The End.",
    choices: []
  },
  forestSpirits: {
    text: "You call upon the forest spirits, and they bestow upon you a fragment of their ancient wisdom. Empowered by their gift, you feel ready to overcome any obstacle on your way to the sanctuary.",
    choices: [
      { text: "Journey to the sanctuary with your new allies", next: "sanctuary" }
    ]
  },
  sanctuary: {
    text: "At last, you arrive at the hidden sanctuary. Here, you face the final trial: choosing between embracing forbidden knowledge or sacrificing for the greater good. Your decision will determine the future of the forest and your bloodline.",
    choices: [
      { text: "Accept the ancient power at any cost", next: "darkSacrifice" },
      { text: "Sacrifice yourself to save the forest", next: "nobleSacrifice" },
      { text: "Preserve the wisdom for future generations", next: "wisdomLegacy" }
    ]
  },
  darkSacrifice: {
    text: "You choose to harness the ancient power, even though it corrupts your soul. You become the new bearer of a dreadful curse, altering the course of history forever. The End.",
    choices: []
  },
  nobleSacrifice: {
    text: "You sacrifice yourself to save the forest and your people, believing that true power lies in selflessness. Your heroism inspires generations, and the forest slowly begins to heal. The End.",
    choices: []
  },
  wisdomLegacy: {
    text: "You decide to preserve the ancient wisdom, passing it on to the elders. Your tale becomes a legend, and the forest lives on as a guardian of forgotten truths. The End.",
    choices: []
  }
};

const storyTextEl = document.getElementById('storyText');
const choicesContainer = document.getElementById('choicesContainer');
const resetBtn = document.getElementById('resetBtn');
let currentNode = storyNodes.start;

function renderNode(node) {
  storyTextEl.innerHTML = node.text;
  choicesContainer.innerHTML = '';
  if (node.choices.length > 0) {
    node.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      btn.onclick = () => {
        currentNode = storyNodes[choice.next];
        renderNode(currentNode);
      };
      choicesContainer.appendChild(btn);
    });
    resetBtn.style.display = 'none';
  } else {
    resetBtn.style.display = 'block';
  }
}

resetBtn.onclick = function() {
  currentNode = storyNodes.start;
  renderNode(currentNode);
  resetBtn.style.display = 'none';
};

const bgMusic = document.getElementById('bgMusic');
const toggleMusic = document.getElementById('toggleMusic');
const toggleMusicIcon = document.getElementById('toggleMusicIcon');

if (bgMusic.paused) {
  toggleMusicIcon.src = './assets/mute.png';
} else {
  toggleMusicIcon.src = './assets/high-volume.png';
}

toggleMusic.onclick = function() {
  if (bgMusic.paused) {
    bgMusic.play();
    toggleMusicIcon.src = './assets/high-volume.png';
  } else {
    bgMusic.pause();
    toggleMusicIcon.src = './assets/mute.png';
  }
};

renderNode(currentNode);
