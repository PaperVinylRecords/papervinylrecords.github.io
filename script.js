// Force the browser to start at the top on every refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

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
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = totalHeight > 0 ? scrollY / totalHeight : 0;

    // 1. Aggressive Entry Screen Removal
    if (scrollY > 30) {
        entryScreen.style.opacity = '0';
        entryScreen.style.visibility = 'hidden';
        
        // Start Audio once scrolling begins
        if (!audioStarted) {
            crackle.currentTime = loopStart;
            crackle.play().catch(e => console.log("Audio waiting for interaction"));
            audioStarted = true;
        }
    } else {
        entryScreen.style.opacity = '1';
        entryScreen.style.visibility = 'visible';
    }

    // 2. Loop Audio virtually
    if (crackle.currentTime >= loopEnd) {
        crackle.currentTime = loopStart;
    }

    // 3. Background Color Shift
    const colorIndex = Math.min(Math.floor(scrollFraction * colors.length), colors.length - 1);
    document.body.style.background = `linear-gradient(135deg, ${colors[colorIndex].start}, ${colors[colorIndex].end})`;

    // 4. Scene Handling (Artists & Album presentations)
    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            
            // Logo handoff at the end
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

            // Paper Ripping logic
            const sceneProgress = (scrollFraction - start) / (end - start);
            const ripWrapper = scene.querySelector('.rip-wrapper');
            if (ripWrapper) {
                if (sceneProgress > 0.35) {
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
