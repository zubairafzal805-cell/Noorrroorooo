
const gifts = {

    chocolate: {
        emoji: "🍫",
        title: "A Little Sweetness",
        message: "You have this lovely way of making ordinary conversations feel special. Somehow, talking to you can turn a completely normal day into a better one. So here's a little sweetness for someone who brings so much of it into my days. ♡"
    },

    teddy: {
        emoji: "🧸",
        title: "Your Cozy Bear",
        message: "A tiny teddy for the days when you need a little comfort. Whenever you're having a bad day, I hope you remember that you deserve kindness, happiness, and so many reasons to smile. Please take good care of yourself. 🤍"
    },

    flowers: {
        emoji: "💐",
        title: "Flowers For You",
        message: "These flowers are just a little reminder of how lovely you are as a person. It's not just the way you talk, but your kindness, your simplicity, and the beautiful way you make people feel. You truly deserve flowers, today and on so many other days. 🌷"
    },

    star: {
        emoji: "⭐",
        title: "A Little Wish",
        message: "If I could make one wish for you, it would be that life gives you more beautiful moments than difficult ones. May you achieve everything you're hoping for, find happiness in little things, and always have a reason to smile. ✨"
    },

    letter: {
        emoji: "💌",
        title: "A Tiny Letter",
        message: "Noor, even though we've never met, your friendship has become something genuinely special to me. I appreciate our conversations, your little habits, your kindness, and simply the person you are. I'm really glad our paths crossed. I hope you always know that your friendship is something I value a lot, and I never consider it ordinary. ♡"
    },

    mystery: {
        emoji: "🎁",
        title: "One Last Little Surprise",
        message: "And here's the last little gift. If I had a thousand words to appreciate you, I think I'd still run out of words. You have such a lovely personality, a kind heart, and a way of making conversations feel memorable. Never forget how wonderful you are as a person. I hope life is always gentle with you, and I hope this little surprise gave you a smile. You deserve so many beautiful things, Noor. Always stay the lovely person you are. 🫶🏻"
    }

};


// Elements

const giftCards = document.querySelectorAll(".gift-card");

const modal = document.getElementById("modal");

const modalEmoji = document.getElementById("modal-emoji");

const modalTitle = document.getElementById("modal-title");

const modalMessage = document.getElementById("modal-message");

const closeModalButton = document.getElementById("close-modal");

const modalOkButton = document.getElementById("modal-ok");

const progressText = document.getElementById("progress-text");

const progressFill = document.getElementById("progress-fill");

const progressMessage = document.getElementById("progress-message");

const mysteryCard = document.querySelector(".mystery-card");

const mysteryEmoji = document.getElementById("mystery-emoji");

const mysterySubtitle = document.getElementById("mystery-subtitle");

const mysteryLabel = document.getElementById("mystery-label");

const celebration = document.getElementById("celebration");

const celebrationClose = document.getElementById("celebration-close");


// Track opened gifts

const openedGifts = new Set();

let mysteryUnlocked = false;

let celebrationShown = false;


// Gift buttons

giftCards.forEach(card => {

    card.addEventListener("click", () => {

        const giftName = card.dataset.gift;

        // Mystery gift lock

        if (giftName === "mystery" && !mysteryUnlocked) {

            showMessage(
                "🔐",
                "A Little Secret!",
                "Your secret surprise is still waiting! Open the other five gifts first, and this little mystery will be yours. 🎀"
            );

            return;
        }


        const gift = gifts[giftName];


        // Mark as opened

        if (!openedGifts.has(giftName)) {

            openedGifts.add(giftName);

            card.classList.add("opened");

        }


        // Update the gift button

        if (giftName === "mystery") {

            card.querySelector(".open-label").textContent =
                "Opened with love ♡";

        } else {

            card.querySelector(".open-label").textContent =
                "Opened ♡";

        }


        updateProgress();


        // Show message

        showMessage(
            gift.emoji,
            gift.title,
            gift.message
        );


        // Floating sparkles

        createSparkles(14);


        // Unlock mystery when all five gifts are opened

        if (openedGifts.size === 5 && !mysteryUnlocked) {

            unlockMystery();

        }

    });

});


// Progress

function updateProgress() {

    const count = openedGifts.size;

    progressText.textContent = `${count} / 5`;

    progressFill.style.width = `${count * 20}%`;


    if (count === 0) {

        progressMessage.textContent =
            "Your little surprises are waiting ✨";

    } else if (count < 5) {

        progressMessage.textContent =
            `${count} little gift${count > 1 ? "s" : ""} opened! Keep going ♡`;

    } else {

        progressMessage.textContent =
            "All your gifts are ready! Your secret is unlocked 🎀";

    }

}


// Unlock Mystery

function unlockMystery() {

    mysteryUnlocked = true;

    mysteryCard.classList.remove("locked");

    mysteryCard.classList.add("unlocked");

    mysteryEmoji.textContent = "🎁";

    mysterySubtitle.textContent = "Something special is waiting!";

    mysteryLabel.textContent = "Your secret is unlocked! ♡";


    createSparkles(30);

}


// Show popup

function showMessage(emoji, title, message) {

    modalEmoji.textContent = emoji;

    modalTitle.textContent = title;

    modalMessage.textContent = message;

    modal.classList.add("show");

}


// Close popup

function closeModal() {

    modal.classList.remove("show");


    // Show final celebration after all gifts opened

    if (
        openedGifts.size === 5 &&
        mysteryUnlocked &&
        !celebrationShown
    ) {

        celebrationShown = true;

        setTimeout(() => {

            celebration.classList.add("show");

            createSparkles(35);

        }, 450);

    }

}


closeModalButton.addEventListener("click", closeModal);

modalOkButton.addEventListener("click", closeModal);


modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});


// Celebration close

celebrationClose.addEventListener("click", () => {

    celebration.classList.remove("show");

});


// Background sparkle animation

function createSparkles(amount = 4) {

    const container = document.getElementById("sparkles");

    const symbols = ["✧", "♡", "✦", "⋆", "✿"];

    for (let i = 0; i < amount; i++) {

        const sparkle = document.createElement("span");

        sparkle.classList.add("sparkle");

        sparkle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        sparkle.style.left =
            Math.random() * 100 + "%";

        sparkle.style.fontSize =
            (Math.random() * 16 + 10) + "px";

        sparkle.style.animationDuration =
            (Math.random() * 7 + 6) + "s";

        sparkle.style.animationDelay =
            Math.random() * 3 + "s";

        container.appendChild(sparkle);


        setTimeout(() => {

            sparkle.remove();

        }, 14000);

    }

}


// Ambient sparkles

setInterval(() => {

    createSparkles(2);

}, 1800);


