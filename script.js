const scenes = document.querySelectorAll('.scene');
const entry = document.getElementById('entry-screen');
const menu = document.getElementById('top-menu');
const logo = document.getElementById('main-logo');
const crackle = document.getElementById('vinyl-crackle');

let audioStarted = false;

const colors = [
    {r: 30, g: 45, b: 40}, // Green
    {r: 45, g: 40, b: 25}, // Gold
    {r: 50, g: 15, b: 15}, // Red
    {r: 18, g: 18, b: 18}  // Black
];

function lerpColor(f) {
    const section = f * (colors.length - 1);
    const i = Math.floor(section);
    const next = Math.min(i + 1, colors.length - 1);
    const localF = section - i;
    const r = Math.round(colors[i].r + (colors[next].r - colors[i].r) * localF);
    const g = Math.round(colors[i].g + (colors[next].g - colors[i].g) * localF);
    const b = Math.round(colors[i].b + (colors[next].b - colors[i].b) * localF);
    return `rgb(${r},${g},${b})`;
}

window.addEventListener('scroll', () => {
    // Ensuring we capture the scroll position correctly across browsers
    const y = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = Math.max(0, Math.min(y / totalHeight, 1));

    // 1. Background Logic
    document.body.style.backgroundColor = lerpColor(fraction);

    // 2. Entry Screen Removal
    if (y > 40) {
        entry.style.opacity = '0';
        if (!audioStarted) {
            crackle.volume = 0.2;
            crackle.play().catch(() => {});
            audioStarted = true;
        }
    } else {
        entry.style.opacity = '1';
    }

    // 3. Scene and Slide Logic
    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (fraction >= start && fraction < end) {
            scene.classList.add('active');
            
            // Logo handoff logic for the final scene
            if (index === scenes.length - 1) {
                menu.classList.add('visible');
                logo.classList.add('hidden');
            } else {
                menu.classList.remove('visible');
                logo.classList.remove('hidden');
            }

            const progress = (fraction - start) / (end - start);
            const rip = scene.querySelector('.rip-wrapper');
            if (rip) {
                if (progress > 0.45) rip.classList.add('ripped');
                else rip.classList.remove('ripped');
            }
        } else {
            scene.classList.remove('active');
        }
    });
});

console.log("Paper Vinyl: Animation Engine Running.");
