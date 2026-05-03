const scenes = document.querySelectorAll('.scene');
const entry = document.getElementById('entry-screen');
const menu = document.getElementById('top-menu');
const logo = document.getElementById('main-logo');
const crackle = document.getElementById('vinyl-crackle');

let audioStarted = false;

// Calming tones sampled from your artwork
const colors = [
    {r: 30, g: 45, b: 40},   // Muted Green (Calming Daily)
    {r: 45, g: 40, b: 25},   // Muted Gold (Cha-ching)
    {r: 50, g: 15, b: 15},   // Deep Muted Red (BFUP)
    {r: 18, g: 18, b: 18}    // Black (Contact)
];

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const max = document.body.scrollHeight - window.innerHeight;
    const fraction = Math.max(0, Math.min(y / max, 1));

    // 1. Entry Screen & Audio Activation
    if (y > 60) {
        entry.style.opacity = '0';
        if (!audioStarted) {
            crackle.volume = 0.2;
            crackle.play().catch(() => {});
            audioStarted = true;
        }
    } else {
        entry.style.opacity = '1';
    }

    // 2. Smooth Background Transitions
    const section = fraction * (colors.length - 1);
    const i = Math.floor(section);
    const next = Math.min(i + 1, colors.length - 1);
    const localF = section - i;
    
    const r = Math.round(colors[i].r + (colors[next].r - colors[i].r) * localF);
    const g = Math.round(colors[i].g + (colors[next].g - colors[i].g) * localF);
    const b = Math.round(colors[i].b + (colors[next].b - colors[i].b) * localF);
    document.body.style.backgroundColor = `rgb(${r},${g},${b})`;

    // 3. Scene and Logic Management
    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (fraction >= start && fraction < end) {
            scene.classList.add('active');
            
            // Handle Menu/Logo handoff in the very last section
            if (index === scenes.length - 1) {
                menu.classList.add('visible');
                logo.classList.add('hidden');
            } else {
                menu.classList.remove('visible');
                logo.classList.remove('hidden');
            }

            // Paper Ripping Progress
            const progress = (fraction - start) / (end - start);
            const rip = scene.querySelector('.rip-wrapper');
            if (rip) {
                // Rips when halfway through the artist's section
                if (progress > 0.45) rip.classList.add('ripped');
                else rip.classList.remove('ripped');
            }
        } else {
            scene.classList.remove('active');
        }
    });
});

console.log("Paper Vinyl Records: Full Script Rebuilt & Centered.");
