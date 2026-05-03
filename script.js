const scenes = document.querySelectorAll('.scene');
const topMenu = document.getElementById('top-menu');
const mainLogo = document.getElementById('main-logo');
const crackle = document.getElementById('vinyl-crackle');

let audioStarted = false;

// Logo-inspired palette (Dark Forest, Neon Green, Paper Grey)
const colors = [
    {r: 12, g: 34, b: 31},   // Dark Forest
    {r: 0, g: 255, b: 0},    // Neon Green
    {r: 224, g: 224, b: 224},// Paper Grey
    {r: 18, g: 18, b: 18}    // Black
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

// Set initial background color immediately
document.body.style.backgroundColor = `rgb(${colors[0].r}, ${colors[0].g}, ${colors[0].b})`;

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = totalHeight > 0 ? scrollY / totalHeight : 0;

    // Background Update
    document.body.style.backgroundColor = lerpColor(scrollFraction);

    // Audio & Scene logic remains same...
    if (!audioStarted && scrollY > 10) {
        crackle.play().catch(() => {});
        audioStarted = true;
    }

    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            if (index === scenes.length - 1) {
                topMenu.classList.add('visible');
                mainLogo.classList.add('move-to-menu');
            } else {
                topMenu.classList.remove('visible');
                mainLogo.classList.remove('move-to-menu');
            }
        } else {
            scene.classList.remove('active');
        }
    });
});
