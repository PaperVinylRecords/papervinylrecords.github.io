const scenes = document.querySelectorAll('.scene');
const entryScreen = document.getElementById('entry-screen');
const topMenu = document.getElementById('top-menu');
const mainLogo = document.getElementById('main-logo');
const overlay = document.getElementById('logo-overlay');
const navLogo = document.querySelector('.nav-logo');
const crackle = document.getElementById('vinyl-crackle');

let audioStarted = false;

// Audio Trim Settings (in seconds)
const loopStart = 2; 
const loopEnd = 12; 

// Gradient Shifts
const colors = [
    { start: '#121212', end: '#1a1a1a' }, 
    { start: '#1a1212', end: '#2a1a1a' }, 
    { start: '#121a12', end: '#1a2a1a' }, 
    { start: '#12121a', end: '#1a1a2a' }  
];

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollY / totalHeight;

    // 1. Audio Logic with Virtual Trim
    if (!audioStarted && scrollY > 10) {
        crackle.volume = 0;
        crackle.currentTime = loopStart;
        crackle.play();
        let fadeIn = setInterval(() => {
            if (crackle.volume < 0.25) { crackle.volume += 0.01; } 
            else { clearInterval(fadeIn); }
        }, 100);
        audioStarted = true;
    }

    // Loop the audio within the trimmed bounds
    if (crackle.currentTime >= loopEnd) {
        crackle.currentTime = loopStart;
    }

    // 2. Entry Screen & Color Shift
    if (scrollY > 50) { entryScreen.classList.add('hide-entry'); } 
    else { entryScreen.classList.remove('hide-entry'); }

    const colorIndex = Math.min(Math.floor(scrollFraction * colors.length), colors.length - 1);
    document.body.style.background = `linear-gradient(135deg, ${colors[colorIndex].start}, ${colors[colorIndex].end})`;

    // 3. Scene Handling
    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            
            if (index === scenes.length - 1) {
                mainLogo.classList.add('move-to-menu');
                topMenu.classList.add('visible');
                overlay.classList.add('active');
                navLogo.style.opacity = '1';
            } else {
                mainLogo.classList.remove('move-to-menu');
                topMenu.classList.remove('visible');
                overlay.classList.remove('active');
                navLogo.style.opacity = '0';
            }

            const sceneProgress = (scrollFraction - start) / (end - start);
            const ripWrapper = scene.querySelector('.rip-wrapper');
            if (ripWrapper && sceneProgress > 0.35) {
                ripWrapper.classList.add('ripped');
            } else if (ripWrapper) {
                ripWrapper.classList.remove('ripped');
            }
        } else {
            scene.classList.remove('active');
        }
    });
});
