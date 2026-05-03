const artistData = {
    'wilrhy': {
        name: 'WilRhy',
        desc: 'WilRhy brings heavy vinyl influence to the Paper Vinyl roster with deep, rhythmic textures and analog warmth.',
        img: 'images /wilrhy.jpg',
        spotify: 'https://open.spotify.com/artist/1b29I5ZHtYsY0QF2NDxAai?si=Xs06vnsCQleIDk24s1Uqzg',
        soundcloud: '',
        insta: 'https://instagram.com/kirbdevpublic'
    },
    'frostability': {
        name: 'Frostability',
        desc: 'Frostability specializes in chilling atmospheres and crisp, sharp production styles that define the label vibe.',
        img: 'images /frostability.jpg',
        spotify: 'https://open.spotify.com/artist/6Pnqtln6eh4XN3dOTz82h0?si=mT_R9Gv4SK6Qds0RgjWaeA',
        soundcloud: '',
        insta: 'https://instagram.com/aydensstuff'
    },
    'undyingbear': {
        name: 'undyingbear',
        desc: 'Experimental and relentless, undyingbear pushes the boundaries of traditional underground sounds and textures.',
        img: 'images /undyingbear.jpg',
        spotify: 'https://open.spotify.com/artist/3sLlAACq5X1c0tey9Um4iR?si=wnvpP8LGTAShYgAFCy06Rg',
        soundcloud: '',
        insta: 'https://instagram.com/JudeGehrkeBowling'
    },
    'twistedanimations': {
        name: 'TwistedAnimations',
        desc: 'TwistedAnimations creates immersive auditory worlds with a focus on chaotic visual energy and cinematic sound.',
        img: 'images /twistedanimations.jpg',
        spotify: 'https://open.spotify.com/artist/0lvJH8oBsZd5XqF0ETI3TD?si=-lHHhLA1ScmAcwqYDxn3ZQ',
        soundcloud: '',
        insta: '',
    },
    'smitebite': {
        name: 'SmiteBite',
        desc: 'Aggressive and raw, SmiteBite delivers high-impact sounds designed for a lasting impression on the dancefloor.',
        img: 'images /smitebite.jpg',
        spotify: '',
        soundcloud: 'https://soundcloud.com/smite-bite-14261925?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
        insta: '',
    }
};

let typingTimer;

function typeWriter(text, i, element) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        // Standard typing speed - adjust 40 to change speed
        typingTimer = setTimeout(() => typeWriter(text, i + 1, element), 40);
    }
}

function openArtist(id) {
    const data = artistData[id];
    if (!data) return;

    const modal = document.getElementById('artist-modal');
    const box = document.getElementById('modal-box');
    const desc = document.getElementById('modal-desc');
    const linksContainer = document.querySelector('.modal-links');

    document.getElementById('modal-name').innerText = data.name;
    document.getElementById('modal-img').src = data.img;
    
    // Reset typing state
    desc.innerHTML = ""; 
    clearTimeout(typingTimer);
    
    // Clear and build buttons
    linksContainer.innerHTML = ""; 
    if (data.spotify) {
        linksContainer.innerHTML += `<a href="${data.spotify}" target="_blank" class="spotify-btn">Spotify</a>`;
    }
    if (data.soundcloud) {
        linksContainer.innerHTML += `<a href="${data.soundcloud}" target="_blank" class="sc-btn">SoundCloud</a>`;
    }
    if (data.insta) {
        linksContainer.innerHTML += `<a href="${data.insta}" target="_blank" class="insta-btn">Instagram</a>`;
    }

    modal.style.display = 'flex';
    setTimeout(() => {
        box.classList.add('active');
        // Trigger typing after the zoom animation finishes
        setTimeout(() => typeWriter(data.desc, 0, desc), 500);
    }, 10);
}

function closeArtist() {
    const box = document.getElementById('modal-box');
    box.classList.remove('active');
    
    // Stop typing immediately if they close the window
    clearTimeout(typingTimer);
    
    setTimeout(() => {
        document.getElementById('artist-modal').style.display = 'none';
    }, 500); // Matches the CSS transition time
}

// Close if user clicks the dark overlay
window.onclick = function(event) {
    const modal = document.getElementById('artist-modal');
    if (event.target == modal) {
        closeArtist();
    }
}
