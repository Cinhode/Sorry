
document.addEventListener('DOMContentLoaded', () => {
    const forgiveBtn = document.getElementById('forgive-btn');
    const notForgiveBtn = document.getElementById('not-forgive-btn');
    const backgroundMusic = document.getElementById('background-music');
    const notForgivePopup = document.getElementById('not-forgive-popup');
    const popupCloseBtn = document.getElementById('popup-close-btn');
    const popupContent = document.querySelector('.popup-content');
    const mainContainer = document.querySelector('.container'); // Get the main container

    // New audio elements
    const thudSound = document.getElementById('thud-sound');
    const fart2Sound = document.getElementById('fart-2-sound');
    const aaSound = document.getElementById('aa-sound');

    let notForgiveClickCount = 0;
    let notForgiveBtnMoveTimeout;

    // Particle generation
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        document.body.appendChild(particle);

        const size = Math.random() * 5 + 2; // 2-7px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;

        const animationDuration = Math.random() * 3 + 3; // 3-6s
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        setTimeout(() => {
            particle.remove();
        }, animationDuration * 1000);
    }

    setInterval(createParticle, 300); // Create a new particle every 300ms

    // Handle "Không tha thứ" button click
    notForgiveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        notForgiveClickCount++;

        // Make the button move randomly
        clearTimeout(notForgiveBtnMoveTimeout);

        const moveButton = () => {
            const btnRect = notForgiveBtn.getBoundingClientRect();
            const containerRect = mainContainer.getBoundingClientRect();

            let newX, newY;
            let attempts = 0;
            const maxAttempts = 50; // Prevent infinite loop if no space
            const padding = 20; // Padding to keep button away from edges and container

            do {
                newX = Math.random() * (window.innerWidth - btnRect.width - padding * 2) + padding;
                newY = Math.random() * (window.innerHeight - btnRect.height - padding * 2) + padding;
                attempts++;
            } while (
                attempts < maxAttempts &&
                // Check for overlap with the main container
                !(newX + btnRect.width < containerRect.left ||
                newX > containerRect.right ||
                newY + btnRect.height < containerRect.top ||
                newY > containerRect.bottom)
            );

            notForgiveBtn.style.position = 'fixed'; // Use fixed to position relative to viewport
            notForgiveBtn.style.left = `${newX}px`;
            notForgiveBtn.style.top = `${newY}px`;
            notForgiveBtn.style.transition = 'all 0.5s ease-out';
            notForgiveBtn.style.zIndex = '999'; // Ensure it's always on top

            // Stop moving after one move for now, unless further clicks trigger more moves
        };
        moveButton();

        if (notForgiveClickCount === 1) {
            thudSound.play();
        } else if (notForgiveClickCount === 2) {
            fart2Sound.play();
        } else if (notForgiveClickCount >= 3) {
            aaSound.play();
            notForgivePopup.classList.add('active');
            // Reset count if popup is shown, to restart the sequence if closed and re-clicked
            notForgiveClickCount = 0;
        }
    });

    // Handle popup close button click
    popupCloseBtn.addEventListener('click', () => {
        notForgivePopup.classList.remove('active');
        // Reset button position and stop movement
        clearTimeout(notForgiveBtnMoveTimeout);
        notForgiveBtn.style.position = 'relative';
        notForgiveBtn.style.left = 'auto';
        notForgiveBtn.style.top = 'auto';
        notForgiveBtn.style.transition = 'none';
        notForgiveBtn.style.zIndex = 'auto'; // Reset z-index
    });

    // Enable the "Tha thứ" button to navigate to page2.html
    forgiveBtn.addEventListener('click', () => {
        // Play music immediately before navigating, if not already playing
        if (backgroundMusic && backgroundMusic.paused) {
            backgroundMusic.play().catch(error => console.log("Play failed on navigation: ", error));
        }
        window.location.href = 'page2.html';
    });

    // Autoplay music on initial page load
    if (backgroundMusic) {
        backgroundMusic.volume = 0.5;
        backgroundMusic.play().catch(error => {
            console.log("Autoplay was prevented. User interaction is needed for music.", error);
            // Optionally, add a visible play button if autoplay fails
        });
    }

    // If on page2.html, ensure music plays
    if (window.location.pathname.endsWith('page2.html')) {
        const backgroundMusicPage2 = document.getElementById('background-music-page2');
        if (backgroundMusicPage2) {
            backgroundMusicPage2.volume = 0.5;
            backgroundMusicPage2.play().catch(error => {
                console.log("Autoplay on page2 was prevented. User interaction is needed for music.", error);
            });
        }
    }
});
