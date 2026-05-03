const scenes = document.querySelectorAll('.scene');
const menu = document.getElementById('top-menu');
const logo = document.getElementById('main-logo');
const crackle = document.getElementById('vinyl-crackle');

let audioStarted = false;

// Sampled colors from your specific images
const colors = [
    {r: 35, g: 55, b: 45},   // Calming Daily (Muted Green)
    {r: 50, g: 45, b: 30},   // ChaChing (Muted Gold)
    {r: 60, g: 20, b: 20},   // BFUP (Deep Muted Red)
    {r: 18, g: 18, b: 18}    // Black (Contact)
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
    const y = window.pageYOffset || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = Math.max(0, Math.min(y / max, 1));

    // Audio & Background Color
    document.body.style.backgroundColor = lerpColor(fraction);
    if (!audioStarted && y > 100) {
        crackle.volume = 0.2;
        crackle.play().catch(() => {});
        audioStarted = true;
    }

    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (fraction >= start && fraction < end) {
            scene.classList.add('active');
            
            // Handle final scene handoff
            if (index === scenes.length - 1) {
                menu.classList.add('visible');
                logo.classList.add('hidden');
            } else {
                menu.classList.remove('visible');
                logo.classList.remove('hidden');
            }

            // Rip Progress
            const progress = (fraction - start) / (end - start);
            const rip = scene.querySelector('.rip-wrapper');
            if (rip) {
                if (progress > 0.4) rip.classList.add('ripped');
                else rip.classList.remove('ripped');
            }
        } else {
            scene.classList.remove('active');
        }
    });
});
