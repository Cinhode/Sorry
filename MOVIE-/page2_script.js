
document.addEventListener('DOMContentLoaded', () => {
    const goBtn = document.getElementById('go-btn');
    const noGoBtn = document.getElementById('no-go-btn');
    const noGoPopup = document.getElementById('no-go-popup');
    const noGoPopupCloseBtn = document.getElementById('no-go-popup-close-btn');
    const backgroundMusicPage2 = document.getElementById('background-music-page2');

    // Handle "Đi" button click
    if (goBtn) {
        goBtn.addEventListener('click', () => {
            // Ensure music continues if possible
            if (backgroundMusicPage2 && !backgroundMusicPage2.paused) {
                sessionStorage.setItem('musicPlaying', 'true');
                sessionStorage.setItem('musicCurrentTime', backgroundMusicPage2.currentTime);
            }
            window.location.href = 'CONGRATULATION.html';
        });
    }

    // Handle "Không đi" button click
    if (noGoBtn) {
        noGoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            noGoPopup.classList.add('active');
        });
    }

    // Handle "Đóng" button click for "Không đi" popup
    if (noGoPopupCloseBtn) {
        noGoPopupCloseBtn.addEventListener('click', () => {
            noGoPopup.classList.remove('active');
        });
    }

    // Music playback on page2.html
    if (backgroundMusicPage2) {
        backgroundMusicPage2.volume = 0.5;
        // Try to play music if it was playing on index.html, or start fresh
        if (sessionStorage.getItem('musicPlaying') === 'true') {
            backgroundMusicPage2.currentTime = parseFloat(sessionStorage.getItem('musicCurrentTime') || '0');
        }
        backgroundMusicPage2.play().catch(error => {
            console.log("Autoplay on page2 was prevented. User interaction is needed for music.", error);
        });
    }

    // Fireworks effect for CONGRATULATION.html
    if (window.location.pathname.endsWith('CONGRATULATION.html')) {
        const fireworksContainer = document.getElementById('fireworks-container');

        function createFirework() {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            fireworksContainer.appendChild(firework);

            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const colors = ['#ff0', '#f00', '#0ff', '#f0f', '#0f0', '#fff'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            firework.style.left = `${x}px`;
            firework.style.top = `${y}px`;
            firework.style.backgroundColor = color;

            setTimeout(() => {
                firework.remove();
            }, 1000); // Matches animation duration
        }

        // Create fireworks continuously
        setInterval(createFirework, 200);

        // Re-enable music for CONGRATULATION.html if it was playing
        const backgroundMusicCongrats = document.createElement('audio');
        backgroundMusicCongrats.id = 'background-music-congrats';
        backgroundMusicCongrats.loop = true;
        backgroundMusicCongrats.autoplay = true;
        backgroundMusicCongrats.src = 'ytmp3free.cc_happy-happy-happy-lyrics-tiktok-song-youtubemp3free.org.mp3'; // Use the new happy music
        document.body.appendChild(backgroundMusicCongrats);

        if (sessionStorage.getItem('musicPlaying') === 'true') {
            backgroundMusicCongrats.currentTime = parseFloat(sessionStorage.getItem('musicCurrentTime') || '0');
        }
        backgroundMusicCongrats.volume = 0.5;
        backgroundMusicCongrats.play().catch(error => {
            console.log("Autoplay on CONGRATULATION.html was prevented. User interaction is needed for music.", error);
        });
    }
});
