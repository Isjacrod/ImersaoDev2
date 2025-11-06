// Load images to cache
var imagesList = (function(){
    // Urls
    let imagesURL = {
        "gen_alegre" : "https://cdn130.picsart.com/316808022195211.png",
        "gen_confuso" : "https://64.media.tumblr.com/e6e958d9741feb230c6beccb19ec4f8f/tumblr_pza3tmEk7G1v9djrpo3_400.png",
        "gen_completo" : "https://static.wikia.nocookie.net/dr-stone/images/5/52/Gen_Asagiri_Full_Body_Anime.png",
        "suika_presentation" : "https://static.wikia.nocookie.net/dr-stone/images/7/70/Suika_Full_Body_Anime.png",
        "suika_deception" : "https://cdn130.picsart.com/307529008125211.png",
        "gen_majutso" : "https://cdn131.picsart.com/328105187056211.png?type=png&to=min&r=640",
        "gen_guess" : "https://64.media.tumblr.com/acfb13419e89234dd163810b548e6291/b663fa658eeece21-cc/s1280x1920/60ca6fa5802e6b9db7e13589fdff875e4d13d0bb.png",
        "suika_happy" : "https://cdn140.picsart.com/307476994074211.png",
        "suika_impressive" : "https://static.wikia.nocookie.net/dr-stone/images/4/42/Suika_helmet_icon_3.png"
    }
    // Create images elements
    let tmpList = {};
    for (e in imagesURL) {
        tmpList[e] = new Image();
        tmpList[e].src = imagesURL[e];
    }
    return tmpList;
})()

// Character constructor
function Character(balloonID, displayID) {
    this.balloon = new Balloon(balloonID);
    this.buttons = new actionButtons(balloonID);
    let avatar = document.getElementById(displayID);
    // Change image
    this.skin = function (skinName) {
        avatar.replaceChildren(imagesList[skinName]);
    }
    // Change text balloon
    this.speak = function(phrase) {
        this.balloon.speak(phrase);
    }
    this.shout = function(word) {
        this.balloon.shout(word);
    }
}

// Ballon constructor
function Balloon(id) {
    let balloon = document.getElementById(id);
    let textArea = balloon.querySelector(".text-area");
    let shoutArea = balloon.querySelector(".shout-area");
    let optionsMenu = balloon.querySelector(".options-menu");
    let lastPhrase = [];
    let lastPhraseIndex = 0;
    let lastPhraseLetter = 0;
    let phraseAnimationController;
    let animationSpeed = 50;

    // Write to balloon
    this.speak = function(text) {
        lastPhraseIndex = 0;
        lastPhrase = text;
        shoutArea.classList.add("removed");
        showContinueButton();
        nextPhrase();
    }
    this.shout = function(text) {
        shoutArea.classList.remove("removed");
        shoutArea.textContent = text;
    }

    // Hide or show options
    function hideMenu() {
        optionsMenu.classList.add("removed");
    }
    function showMenu() {
        optionsMenu.classList.remove("removed");
    }

    // Add button to continue
    let nextButton = createButton(">");
    nextButton.addEventListener('click', nextPhrase);
    function showContinueButton() {
        balloon.insertAdjacentElement('beforeend', nextButton);
        hideMenu();
    }

    // Change to next phrase
    function nextPhrase() {
        clearInterval(phraseAnimationController);
        lastPhraseLetter = 0;
        textArea.textContent = '';
        phraseAnimationController = setInterval(
            animateText, animationSpeed, textArea, lastPhrase[lastPhraseIndex]
        )
        // textArea.textContent = lastPhrase[lastPhraseIndex];
        lastPhraseIndex++;

        // If the mext index is the last
        if ((lastPhraseIndex + 1) == (lastPhrase.length)) {
            // Check if will show the options or not
            if (lastPhrase[(lastPhraseIndex)])
                showMenu();
            // Remove the next button anyway(end of dialog)
            nextButton.remove();           
        }
    }
    // Animate text
    function animateText(where, text) {
        where.textContent = where.textContent + text.charAt(lastPhraseLetter);
        lastPhraseLetter++;
     }
}

// Buttons Creator
function actionButtons(balloonRef) {
    let menuOptions = document.getElementById(balloonRef).querySelector(".options-menu");
    // Define function and optionaly value to the button
    this.defineButtonFunction = function(pos, fn, value) {
        let buttonRef = menuOptions.querySelector(`.main-button[name=${pos}]`);
        // Clone and add events (clone remove events)
        let buttonClone = buttonRef.cloneNode(true);
        buttonClone.addEventListener('click', fn)
        buttonClone.classList.remove("removed");
        if (value != null)
            buttonClone.value = value;
        // Replace real button for its clone
        buttonRef.replaceWith(buttonClone)
    } 
    // Hide buttons
    this.hide = function(pos) {
        let buttonRef = menuOptions.querySelector(`.main-button[name=${pos}]`).classList.add("removed");
    }
    this.hideAll = function() {
        for (el of menuOptions.children) {
            el.classList.add("removed");
        }
    }
}

// Game script
function changeScene(scene) {
    switch (scene) {
        case "start":
            suika.skin("suika_impressive");
            suika.speak(["（＊〇□〇）……！", "nao acredito", false]);
            gen.speak(["Olá, eu sou Gen O Mentalista.", `Vou tentar adivinhar o número que você está pensando em até ${gameSession.chances} tentativas`, `pense em um número de ${gameSession.min} a ${gameSession.max}`, "E se eu acertar seu número, então me diga", `de ${gameSession.min} a ${gameSession.max}... 1 número... Pensou?`, true]);
            gen.buttons.defineButtonFunction("button1", bye, "não");
            gen.buttons.defineButtonFunction("button2", gameStart, "pronto");
            gen.buttons.hide("button3");
            gen.skin("gen_completo");
            break;
        case "gameStart":
            suika.skin("suika_presentation");
            gen.skin("gen_majutso");
            gen.buttons.defineButtonFunction("button1", choose, "menor");
            gen.buttons.defineButtonFunction("button2", victory, "acertou");
            gen.buttons.defineButtonFunction("button3", choose, "maior");
            break;
        case "won":
            suika.skin("suika_happy");
            suika.speak(["Ele conseguiu", "De novo?", true]);
            suika.buttons.hideAll();
            suika.buttons.defineButtonFunction("button1", start, "sim");
            suika.buttons.defineButtonFunction("button2", end, "não");
            gen.skin("gen_guess");
            gen.speak(["Mas é claro", "Eu sou um mentalista afinal", false]);
            break;
        case "lose":
            suika.skin("suika_deception");
            suika.speak(["não pode ser", false]);
            gen.skin("gen_confuso");
            gen.speak(["Parece que você não está se concentrando direito", true]);
            gen.buttons.hideAll();
            gen.buttons.defineButtonFunction("button1", start, "Tentar de Novo");
            break;
        case "bye":
            suika.skin("suika_deception");
            suika.speak(["parece que você não conseguiu convencê-los", false]);
            gen.skin('gen_confuso');
            gen.speak(["então tchau", true]);
            gen.buttons.hideAll();
            gen.buttons.defineButtonFunction("button1", start, "reiniciar");
            break;
        case "end":
            gen.skin("gen_alegre");
            gen.speak(["...",  "Eu recomendo", false]);
            suika.skin("suika_happy");
            suika.speak(["Assista Doctor Stone", false]);
            break;
    }
}

// Game Logic Constructor
function gameCreator() {
    this.min = 0;
    this.max = 100;
    this.chances = Math.round(Math.log2(this.max));

    this.divide = function() {
        let diference = Math.round((this.max - this.min) / 2);
        this.chances--;
        return (this.min + diference);
    }
    this.actualGuess = this.divide();

    this.bigger = function() {
        this.min = this.actualGuess + 1;
        this.actualGuess = this.divide();
    }

    this.smaller = function() {
        this.max = this.actualGuess - 1;
        this.actualGuess = this.divide();
    }
}

// Start Game
var gameSession;
function start() {
    gameSession = new gameCreator();
    gen = new Character("gen_balloon", "gen_image");
    suika = new Character("suika_balloon", "suika_image");
    changeScene("start");
}
start();

// Main Routine
function choose(ev) {
    if (ev.currentTarget.name == "button1")
        gameSession.smaller();
    else if (ev.currentTarget.name == "button3")
        gameSession.bigger();
    
    updateInfo()
}

function updateInfo() {
    gen.speak(["O número que você pensou foi:", true])
    gen.shout(gameSession.actualGuess);
    suika.speak(["Tentativas restantes", false])
    suika.shout(gameSession.chances);
    loseCheck();
}

function loseCheck() {
    if (gameSession.chances < 0) {
        changeScene("lose");
    }
}

// Scenario triggers
function gameStart() {
    changeScene("gameStart");
    updateInfo();
}

function victory() {
    changeScene("won");
}

function bye() {
    changeScene("bye");
}

function end() {
    changeScene("end");
}

// Auxiliary Functions 

// function to create generic buttons
function createButton(content) {
    let button = document.createElement("input");
    button.setAttribute('type', 'button');
    button.setAttribute('value', content);
    button.className = 'main-button';
    return button;
}

// vh trick to get 100% viewport height on mobile
// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
window.addEventListener('resize', getViewPortHeight);
window.addEventListener('load', getViewPortHeight);
function getViewPortHeight() {
  // Get 1% of total pixel
  let vh = window.innerHeight * 0.01;
  // Add custom property to css root
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}