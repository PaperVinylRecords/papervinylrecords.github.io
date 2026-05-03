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

// Smooth color transition points
const colors = [
    [18, 18, 18],   // Dark Grey
    [30, 20, 20],   // Deep Red tint
    [20, 30, 20],   // Deep Green tint
    [18, 18, 28]    // Deep Blue tint
];

function lerpColor(f) {
    const section = f * (colors.length - 1);
    const i = Math.floor(section);
    const next = Math.min(i + 1, colors.length - 1);
    const localF = section - i;

    const r = Math.round(colors[i][0] + (colors[next][0] - colors[i][0]) * localF);
    const g = Math.round(colors[i][1] + (colors[next][1] - colors[i][1]) * localF);
    const b = Math.round(colors[i][2] + (colors[next][2] - colors[i][2]) * localF);
    
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
        crackle.play();
        audioStarted = true;
    }
    if (crackle.currentTime >= loopEnd) crackle.currentTime = loopStart;

    // 2. Smooth Background Transition
    const bgColor = lerpColor(scrollFraction);
    document.body.style.backgroundColor = bgColor;

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
            
            // IS THIS THE FINAL CONTACT SCENE?
            if (index === scenes.length - 1) {
                // Fade out crackle
                if (crackle.volume > 0.01) crackle.volume -= 0.01;
                else crackle.pause();

                mainLogo.classList.add('move-to-menu');
                topMenu.classList.add('visible');
                overlay.classList.add('active');
                if(navLogo) navLogo.style.opacity = '1';
            } else {
                // Fade in/keep crackle during artists
                if (audioStarted && crackle.volume < 0.25) crackle.volume += 0.01;
                
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
