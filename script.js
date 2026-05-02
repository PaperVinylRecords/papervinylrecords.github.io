const scenes = document.querySelectorAll('.scene');

window.addEventListener('scroll', () => {
    const scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
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
