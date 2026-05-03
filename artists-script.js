// Ensure every artist from your HTML has a corresponding key here
const artistData = {
    'wilrhy': { 
        name: 'WilRhy', 
        desc: 'WilRhy brings heavy vinyl influence to the Paper Vinyl roster with deep, rhythmic textures.', 
        img: 'images/wilrhy.jpg' 
    },
    'frostability': { 
        name: 'Frostability', 
        desc: 'Frostability specializes in chilling atmospheres and crisp, sharp production styles.', 
        img: 'images/frostability.jpg' 
    },
    'undyingbear': { 
        name: 'undyingbear', 
        desc: 'Experimental and relentless, undyingbear pushes the boundaries of traditional underground sounds.', 
        img: 'images/undyingbear.jpg' 
    },
    'twistedanimations': { 
        name: 'TwistedAnimations', 
        desc: 'TwistedAnimations creates immersive auditory worlds with a focus on chaotic visual energy.', 
        img: 'images/twistedanimations.jpg' 
    },
    'smitebite': { 
        name: 'SmiteBite', 
        desc: 'Aggressive and raw, SmiteBite delivers high-impact sounds designed for a lasting impression.', 
        img: 'images/smitebite.jpg' 
    }
};

let typingTimer;
function typeWriter(text, i, element) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        typingTimer = setTimeout(() => typeWriter(text, i + 1, element), 40);
    }
}

function openArtist(id) {
    const data = artistData[id];
    // If the ID clicked doesn't exist in our data, stop here
    if (!data) return;

    const modal = document.getElementById('artist-modal');
    const box = document.getElementById('modal-box');
    const desc = document.getElementById('modal-desc');

    document.getElementById('modal-name').innerText = data.name;
    document.getElementById('modal-img').src = data.img;
    desc.innerHTML = ""; // Clear for fresh typing
    clearTimeout(typingTimer);

    modal.style.display = 'flex';
    setTimeout(() => {
        box.classList.add('active');
        // Start typing after the zoom animation (approx 500ms)
        setTimeout(() => typeWriter(data.desc, 0, desc), 500);
    }, 10);
}

function closeArtist() {
    const box = document.getElementById('modal-box');
    box.classList.remove('active');
    setTimeout(() => {
        document.getElementById('artist-modal').style.display = 'none';
    }, 500);
}
