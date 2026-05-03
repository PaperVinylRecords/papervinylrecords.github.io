const scenes = document.querySelectorAll('.scene');
const entry = document.getElementById('entry-screen');
const menu = document.getElementById('top-menu');
const logo = document.getElementById('main-logo');
const crackle = document.getElementById('vinyl-crackle');

let audioStarted = false;

const colors = [
    {r: 35, g: 55, b: 45},   // Forest
    {r: 50, g: 45, b: 30},   // Gold/Chaching
    {r: 60, g: 20, b: 20},   // Red/BFUP
    {r: 18, g: 18, b: 18}    // Black
];

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const max = document.body.scrollHeight - window.innerHeight;
    const fraction = y / max;

    // 1. Entry Screen & Audio
    if (y > 50) {
        entry.style.opacity = '0';
        entry.style.pointerEvents = 'none';
        if (!audioStarted) {
            crackle.volume = 0.2;
            crackle.play().catch(() => {});
            audioStarted = true;
        }
    } else {
        entry.style.opacity = '1';
        entry.style.pointerEvents = 'all';
    }

    // 2. Background Colors
    const section = fraction * (colors.length - 1);
    const i = Math.floor(section);
    const next = Math.min(i + 1, colors.length - 1);
    const localF = section - i;
    const r = Math.round(colors[i].r + (colors[next].r - colors[i].r) * localF);
    const g = Math.round(colors[i].g + (colors[next].g - colors[i].g) * localF);
    const b = Math.round(colors[i].b + (colors[next].b - colors[i].b) * localF);
    document.body.style.backgroundColor = `rgb(${r},${g},${b})`;

    // 3. Scene Logic
    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (fraction >= start && fraction < end) {
            scene.classList.add('active');
            
            // Logic for Logo/Menu handoff in the very last scene
            if (index === scenes.length - 1) {
                menu.classList.add('visible');
                logo.classList.add('hidden');
            } else {
                menu.classList.remove('visible');
                logo.classList.remove('hidden');
            }

            // Rip logic
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
