const scenes = document.querySelectorAll('.scene');
const entryScreen = document.getElementById('entry-screen');
const topMenu = document.getElementById('top-menu');
const mainLogo = document.getElementById('main-logo');
const crackle = document.getElementById('vinyl-crackle');

let audioStarted = false;
const loopStart = 2; 
const loopEnd = 12; 

// Logo-inspired palette (Dark Forest, Neon Green, Paper Grey, Deep Black)
const colors = [
    {r: 12, g: 34, b: 31},   // Dark Forest
    {r: 0, g: 255, b: 0},    // Neon Green (Center Ring)
    {r: 224, g: 224, b: 224},// Paper Grey (Texture)
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

// CRITICAL: Set initial background color immediately on load
document.body.style.backgroundColor = `rgb(${colors[0].r}, ${colors[0].g}, ${colors[0].b})`;

window.addEventListener('scroll', () => {
    // Robust scroll position detection
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    ) - window.innerHeight;
    
    const scrollFraction = totalHeight > 0 ? scrollY / totalHeight : 0;

    // 1. Smooth Background Update
    document.body.style.backgroundColor = lerpColor(scrollFraction);

    // 2. Entry Screen Removal
    if (scrollY > 50) {
        entryScreen.style.opacity = '0';
        entryScreen.style.visibility = 'hidden';
    } else {
        entryScreen.style.opacity = '1';
        entryScreen.style.visibility = 'visible';
    }

    // 3. Audio & Scene Handling
    if (!audioStarted && scrollY > 20) {
        crackle.currentTime = loopStart;
        crackle.play().catch(() => {});
        audioStarted = true;
    }
    
    if (crackle.currentTime >= loopEnd) crackle.currentTime = loopStart;

    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            
            // Handle final contact scene and static fade-out
            if (index === scenes.length - 1) {
                if (crackle.volume > 0.01) crackle.volume -= 0.01;
                else crackle.pause();
                topMenu.classList.add('visible');
                mainLogo.classList.add('move-to-menu');
            } else {
                if (audioStarted && crackle.volume < 0.25) crackle.volume += 0.01;
                topMenu.classList.remove('visible');
                mainLogo.classList.remove('move-to-menu');
            }

            // Paper Ripping
            const sceneProgress = (scrollFraction - start) / (end - start);
            const rip = scene.querySelector('.rip-wrapper');
            if (rip) {
                if (sceneProgress > 0.35) rip.classList.add('ripped');
                else rip.classList.remove('ripped');
            }
        } else {
            scene.classList.remove('active');
        }
    });
});
