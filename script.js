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

// Logo-inspired palette: Dark Forest, Neon Accent, and Paper Grey
const colors = [
    {r: 12, g: 34, b: 31},  // Dark Forest Green (from logo background)
    {r: 0, g: 255, b: 0},   // Neon Green (from center ring)
    {r: 224, g: 224, b: 224},// Paper Grey (from vinyl texture)
    {r: 18, g: 18, b: 18}   // Deep Black for the final contact section
];

function lerpColor(f) {
    const section = f * (colors.length - 1);
    const i = Math.floor(section);
    const next = Math.min(i + 1, colors.length - 1);
    const localF = section - i;

    const r = Math.round(colors[i].r + (colors[next].r - colors[i].r) * localF);
    const g = Math.round(colors[i].g + (colors[next].g - colors[i].g) * localF);
    const b = Math.round(colors[i].b + (colors[next].b - colors[i].b) * localF);
    
    return `rgb(${r}, ${g}, ${b})`;
}

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = totalHeight > 0 ? scrollY / totalHeight : 0;

    // 1. Audio Start & Loop
    if (!audioStarted && scrollY > 10) {
        crackle.volume = 0;
        crackle.currentTime = loopStart;
        crackle.play().catch(() => {}); 
        audioStarted = true;
    }
    if (crackle.currentTime >= loopEnd) crackle.currentTime = loopStart;

    // 2. Smooth Background Transition
    document.body.style.backgroundColor = lerpColor(scrollFraction);

    // 3. Entry Screen Hide
    if (scrollY > 50) {
        entryScreen.style.opacity = '0';
        entryScreen.style.visibility = 'hidden';
    } else {
        entryScreen.style.opacity = '1';
        entryScreen.style.visibility = 'visible';
    }

    // 4. Scene Handling
    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            
            if (index === scenes.length - 1) {
                // Fade out crackle at the end
                if (crackle.volume > 0.01) crackle.volume -= 0.01;
                else crackle.pause();

                mainLogo.classList.add('move-to-menu');
                topMenu.classList.add('visible');
                overlay.classList.add('active');
                if(navLogo) navLogo.style.opacity = '1';
            } else {
                // Fade in/keep crackle during artists
                if (audioStarted && crackle.volume < 0.20) crackle.volume += 0.01;
                
                mainLogo.classList.remove('move-to-menu');
                topMenu.classList.remove('visible');
                overlay.classList.remove('active');
                if(navLogo) navLogo.style.opacity = '0';
            }

            const sceneProgress = (scrollFraction - start) / (end - start);
            const ripWrapper = scene.querySelector('.rip-wrapper');
            if (ripWrapper) {
                if (sceneProgress > 0.35) ripWrapper.classList.add('ripped');
                else ripWrapper.classList.remove('ripped');
            }
        } else {
            scene.classList.remove('active');
        }
    });
});
