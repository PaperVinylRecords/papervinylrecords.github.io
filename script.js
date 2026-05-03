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

    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            
            // Check if we are at the final Contact scene
            if (index === scenes.length - 1) {
                // Fade and move the main logo
                mainLogo.classList.add('move-to-menu');
                // Drop the menu down
                topMenu.classList.add('visible');
            } else {
                mainLogo.classList.remove('move-to-menu');
                topMenu.classList.remove('visible');
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
