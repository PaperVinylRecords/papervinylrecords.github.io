const scenes = document.querySelectorAll('.scene');
const entryScreen = document.getElementById('entry-screen');
const topMenu = document.getElementById('top-menu');
const mainLogo = document.getElementById('main-logo');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollY / totalHeight;

    // Handle Entry Screen
    if (scrollY > 50) {
        entryScreen.classList.add('hide-entry');
    } else {
        entryScreen.classList.remove('hide-entry');
    }

    // Handle Artist Scenes and Ripping
    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            
            // Trigger Logo Handoff on final scene
            if (index === scenes.length - 1) {
                topMenu.classList.add('visible');
                mainLogo.classList.add('fade-out');
            } else {
                topMenu.classList.remove('visible');
                mainLogo.classList.remove('fade-out');
            }

            const sceneProgress = (scrollFraction - start) / (end - start);
            const ripWrapper = scene.querySelector('.rip-wrapper');
            
            if (ripWrapper && sceneProgress > 0.35) {
                ripWrapper.classList.add('ripped');
            } else if (ripWrapper) {
                ripWrapper.classList.remove('ripped');
            }
        } else {
            scene.classList.remove('active');
        }
    });
});
