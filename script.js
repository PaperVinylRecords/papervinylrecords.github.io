const scenes = document.querySelectorAll('.scene');
const entryScreen = document.getElementById('entry-screen');
const topMenu = document.getElementById('top-menu');
const mainLogo = document.getElementById('main-logo');
const overlay = document.getElementById('logo-overlay');
const navLogo = document.querySelector('.nav-logo');
const crackle = document.getElementById('vinyl-crackle');

let audioStarted = false;
const loopStart = 2; 
const loopEnd = 12; 

const colors = [
    { start: '#121212', end: '#1a1a1a' }, 
    { start: '#1a1212', end: '#2a1a1a' }, 
    { start: '#121a12', end: '#1a2a1a' }, 
    { start: '#12121a', end: '#1a1a2a' }  
];

window.addEventListener('scroll', () => {
    // UPDATED: Use documentElement for more reliable height sensing
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Safety check to prevent division by zero
    const scrollFraction = totalHeight > 0 ? scrollY / totalHeight : 0;

    // 1. Force Entry Screen to hide
    if (scrollY > 50) {
        entryScreen.style.opacity = '0';
        entryScreen.style.visibility = 'hidden';
    } else {
        entryScreen.style.opacity = '1';
        entryScreen.style.visibility = 'visible';
    }

    // 2. Audio & Colors
    if (!audioStarted && scrollY > 20) {
        crackle.play().catch(() => {}); // Catch prevents errors if browser blocks auto-play
        audioStarted = true;
    }
    
    const colorIndex = Math.min(Math.floor(scrollFraction * colors.length), colors.length - 1);
    document.body.style.background = `linear-gradient(135deg, ${colors[colorIndex].start}, ${colors[colorIndex].end})`;

    // 3. Scene Handling
    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            
            // Logic for Logo/Menu handoff
            if (index === scenes.length - 1) {
                mainLogo.classList.add('move-to-menu');
                topMenu.classList.add('visible');
                overlay.classList.add('active');
                if(navLogo) navLogo.style.opacity = '1';
            } else {
                mainLogo.classList.remove('move-to-menu');
                topMenu.classList.remove('visible');
                overlay.classList.remove('active');
                if(navLogo) navLogo.style.opacity = '0';
            }

            const sceneProgress = (scrollFraction - start) / (end - start);
            const ripWrapper = scene.querySelector('.rip-wrapper');
            if (ripWrapper) {
                if (sceneProgress > 0.3) {
                    ripWrapper.classList.add('ripped');
                } else {
                    ripWrapper.classList.remove('ripped');
                }
            }
        } else {
            scene.classList.remove('active');
        }
    });
});
