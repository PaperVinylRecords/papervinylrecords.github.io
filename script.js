const scenes = document.querySelectorAll('.scene');
const entryScreen = document.getElementById('entry-screen');
const topMenu = document.getElementById('top-menu');
const mainLogo = document.getElementById('main-logo');
const navLogo = document.querySelector('.nav-logo');
const crackle = document.getElementById('vinyl-crackle');

let audioStarted = false;

// --- AUDIO CONFIGURATION ---
const loopStart = 2; // Start of loop (seconds)
const loopEnd = 12;  // End of loop (seconds)

// --- LOGO COLOR PALETTE (RGB) ---
const colors = [
    {r: 12, g: 34, b: 31},   // Dark Forest Green
    {r: 0, g: 255, b: 0},    // Neon Green
    {r: 224, g: 224, b: 224},// Paper Grey
    {r: 18, g: 18, b: 18}    // Final Deep Black
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

// Set initial color immediately
document.body.style.backgroundColor = `rgb(${colors[0].r}, ${colors[0].g}, ${colors[0].b})`;

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = totalHeight > 0 ? scrollY / totalHeight : 0;

    // 1. UPDATE SMOOTH BACKGROUND COLOR
    document.body.style.backgroundColor = lerpColor(scrollFraction);

    // 2. ENTRY SCREEN & AUDIO START
    if (scrollY > 50) {
        entryScreen.style.opacity = '0';
        entryScreen.style.visibility = 'hidden';
        
        if (!audioStarted) {
            crackle.currentTime = loopStart;
            crackle.play().catch(() => console.log("Audio waiting for interaction"));
            audioStarted = true;
        }
    } else {
        entryScreen.style.opacity = '1';
        entryScreen.style.visibility = 'visible';
    }

    // 3. VIRTUAL AUDIO LOOP
    if (crackle.currentTime >= loopEnd) {
        crackle.currentTime = loopStart;
    }

    // 4. SCENE HANDLING (RIP & LOGO HANDOFF)
    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            
            // IF FINAL CONTACT SCENE
            if (index === scenes.length - 1) {
                // Fade out crackle static
                if (crackle.volume > 0.01) crackle.volume -= 0.01;
                else crackle.pause();

                topMenu.classList.add('visible');
                mainLogo.classList.add('move-to-menu');
                if(navLogo) navLogo.style.opacity = '1';
            } else {
                // Keep crackle active during artists
                if (audioStarted && crackle.volume < 0.25) crackle.volume += 0.01;
                
                topMenu.classList.remove('visible');
                mainLogo.classList.remove('move-to-menu');
                if(navLogo) navLogo.style.opacity = '0';
            }

            // RIP TIMING
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

// FILL IN THIS LINE: console.log("Paper Vinyl Records Script Loaded Successfully!");
console.log("PVR Script Loaded Unsuccessfully (jk)")
