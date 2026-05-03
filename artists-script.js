const artistData = {
    'wilrhy': { 
        name: 'WilRhy', 
        desc: 'ENTER_WILRHY_DESCRIPTION', 
        img: 'images /wilrhy.jpg',
        spotify: 'https://open.spotify.com/artist/1b29I5ZHtYsY0QF2NDxAai?si=Xs06vnsCQleIDk24s1Uqzg',
        soundcloud: '', // Leave blank if no profile
        insta: 'https://instagram.com/kirbdevpublic'
    },
    'frostability': { 
        name: 'Frostability', 
        desc: 'ENTER_FROSTABILITY_DESCRIPTION', 
        img: 'images /frostability.jpg',
        spotify: 'https://open.spotify.com/artist/6Pnqtln6eh4XN3dOTz82h0?si=mT_R9Gv4SK6Qds0RgjWaeA',
        soundcloud: '',
        insta: 'https://instagram.com/aydensstuff'
    },
    'undyingbear': { 
        name: 'undyingbear', 
        desc: 'ENTER_UNDYINGBEAR_DESCRIPTION', 
        img: 'images /undyingbear.jpg',
        spotify: 'https://open.spotify.com/artist/3sLlAACq5X1c0tey9Um4iR?si=wnvpP8LGTAShYgAFCy06Rg',
        soundcloud: '',
        insta: 'https://instagram.com/JudeGehrkeBowling'
    },
    'twistedanimations': { 
        name: 'TwistedAnimations', 
        desc: 'ENTER_TWISTEDANIMATIONS_DESCRIPTION', 
        img: 'images /twistedanimations.jpg',
        spotify: 'https://open.spotify.com/artist/0lvJH8oBsZd5XqF0ETI3TD?si=-lHHhLA1ScmAcwqYDxn3ZQ',
        soundcloud: '',
        insta: '',
    },
    'smitebite': { 
        name: 'SmiteBite', 
        desc: 'ENTER_SMITEBITE_DESCRIPTION', 
        img: 'images /smitebite.jpg',
        spotify: '', // No Spotify profile yet
        soundcloud: 'https://soundcloud.com/smite-bite-14261925?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', // SmiteBite SoundCloud Link
        insta: '', // No insta right now.
    }
};

function openArtist(id) {
    const data = artistData[id];
    if (!data) return;

    const modal = document.getElementById('artist-modal');
    const box = document.getElementById('modal-box');
    const desc = document.getElementById('modal-desc');
    const linksContainer = document.querySelector('.modal-links');

    document.getElementById('modal-name').innerText = data.name;
    document.getElementById('modal-img').src = data.img;
    desc.innerHTML = ""; 
    linksContainer.innerHTML = ""; // Clear old buttons

    // Template Logic: Only create buttons if a link is provided
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
        setTimeout(() => typeWriter(data.desc, 0, desc), 500);
    }, 10);
}

// ... keep your existing typeWriter and closeArtist functions ...
