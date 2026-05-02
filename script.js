const scenes = document.querySelectorAll('.scene');
const totalArtists = scenes.length - 1; // Minus 1 for the contact page

window.addEventListener('scroll', () => {
    const scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
    scenes.forEach((scene, index) => {
        // Calculate the "start" and "end" points for each artist's turn on screen
        const start = index / scenes.length;
        const end = (index + 1) / scenes.length;

        if (scrollFraction >= start && scrollFraction < end) {
            scene.classList.add('active');
            
            // If the user scrolls past the halfway point of this specific artist, RIP IT
            const sceneProgress = (scrollFraction - start) / (end - start);
            const ripWrapper = scene.querySelector('.rip-wrapper');
            
            if (ripWrapper && sceneProgress > 0.4) {
                ripWrapper.classList.add('ripped');
            } else if (ripWrapper) {
                ripWrapper.classList.remove('ripped');
            }
        } else {
            scene.classList.remove('active');
        }
    });
});
