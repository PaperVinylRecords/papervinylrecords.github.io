const scenes = document.querySelectorAll('.scene');
const entryScreen = document.getElementById('entry-screen');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollY / totalHeight;

    // 1. Handle Entry Screen Visibility
    if (scrollY > 50) {
        entryScreen.classList.add('hide-entry');
    } else {
        entryScreen.classList.remove('hide-entry');
    }

    // 2. Handle Artist Scenes and Ripping
    scenes.forEach((scene, index) => {
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            
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
