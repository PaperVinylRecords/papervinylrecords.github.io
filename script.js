const scenes = document.querySelectorAll('.scene');
const entryScreen = document.getElementById('entry-screen');
const topMenu = document.getElementById('top-menu');
const mainLogo = document.getElementById('main-logo');
const navLogo = document.querySelector('.nav-logo'); // TARGET THE NAV LOGO
const crackle = document.getElementById('vinyl-crackle');

let audioStarted = false;
const loopStart = 2; 
const loopEnd = 12; 

// Logo-inspired palette
const colors = [
    {r: 12, g: 34, b: 31},   // Dark Forest
    {r: 0, g: 255, b: 0},    // Neon Green
    {r: 224, g: 224, b: 224},// Paper Grey
    {r: 18, g: 18, b: 18}    // Deep Black
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

// FIX: Set background color IMMEDIATELY on script load
document.body.style.backgroundColor = `rgb(${colors[0].r}, ${colors[0].g}, ${colors[0].b})`;

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = totalHeight > 0 ? scrollY / totalHeight : 0;

    // 1. Smooth Background Update
    document.body.style.backgroundColor = lerpColor(scrollFraction);

    // 2. Entry Screen Removal
    if (scrollY > 50) {
        entryScreen.style.opacity = '0';
        entryScreen.style.visibility = 'hidden';
    }

    // 3. Scene Handling
    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            
            if (index === scenes.length - 1) {
                // FADE OUT MAIN, FADE IN NAV LOGO
                mainLogo.classList.add('move-to-menu');
                topMenu.classList.add('visible');
                if(navLogo) navLogo.style.opacity = '1'; 
            } else {
                mainLogo.classList.remove('move-to-menu');
                topMenu.classList.remove('visible');
                if(navLogo) navLogo.style.opacity = '0';
            }

            const sceneProgress = (scrollFraction - start) / (end - start);
            const rip = scene.querySelector('.rip-wrapper');
            if (rip && sceneProgress > 0.35) rip.classList.add('ripped');
            else if (rip) rip.classList.remove('ripped');
        } else {
            scene.classList.remove('active');
        }
    });
});
