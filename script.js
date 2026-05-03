const scenes = document.querySelectorAll('.scene');
const entryScreen = document.getElementById('entry-screen');
const topMenu = document.getElementById('top-menu');
const mainLogo = document.getElementById('main-logo');
const navLogo = document.querySelector('.nav-logo');
const crackle = document.getElementById('vinyl-crackle');

let audioStarted = false;
const loopStart = 2; 
const loopEnd = 12; 

// Your exact logo palette
const colors = [
    {r: 12, g: 34, b: 31},   // Dark Forest (Start)
    {r: 0, g: 255, b: 0},    // Neon Green (Transition)
    {r: 224, g: 224, b: 224},// Paper Grey
    {r: 18, g: 18, b: 18}    // Deep Black (End)
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

// FORCE THE INITIAL COLOR IMMEDIATELY
document.body.style.backgroundColor = `rgb(${colors[0].r}, ${colors[0].g}, ${colors[0].b})`;

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = totalHeight > 0 ? scrollY / totalHeight : 0;

    // Smooth Update
    document.body.style.backgroundColor = lerpColor(scrollFraction);

    if (scrollY > 50) {
        entryScreen.style.opacity = '0';
        entryScreen.style.visibility = 'hidden';
        if (!audioStarted) {
            crackle.play().catch(() => {});
            audioStarted = true;
        }
    }

    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            
            if (index === scenes.length - 1) {
                mainLogo.classList.add('move-to-menu');
                topMenu.classList.add('visible');
                // Ensure the nav logo fades in correctly
                if(navLogo) navLogo.style.opacity = '1';
            } else {
                mainLogo.classList.remove('move-to-menu');
                topMenu.classList.remove('visible');
                if(navLogo) navLogo.style.opacity = '0';
            }
        } else {
            scene.classList.remove('active');
        }
    });
});
