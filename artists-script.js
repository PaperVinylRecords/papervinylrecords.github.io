const artistData = {
    'wilrhy': {
        name: 'WilRhy',
        desc: "", // TYPE YOUR BIO HERE
        img: 'images /wilrhy.jpg',
        spotify: 'https://spotify.com',
        soundcloud: '',
        insta: 'https://instagram.com'
    },
    'frostability': {
        name: 'Frostability',
        desc: "", // TYPE YOUR BIO HERE
        img: 'images /frostability.jpg',
        spotify: 'https://spotify.com',
        soundcloud: '',
        insta: 'https://instagram.com'
    },
    'undyingbear': {
        name: 'undyingbear',
        desc: "", // TYPE YOUR BIO HERE
        img: 'images /undyingbear.jpg',
        spotify: 'https://spotify.com',
        soundcloud: '',
        insta: 'https://instagram.com'
    },
    'twistedanimations': {
        name: 'TwistedAnimations',
        desc: "", // TYPE YOUR BIO HERE
        img: 'images /twistedanimations.jpg',
        spotify: 'https://spotify.com',
        soundcloud: '',
        insta: '',
    },
    'smitebite': {
        name: 'SmiteBite',
        desc: "", // TYPE YOUR BIO HERE
        img: 'images /smitebite.jpg',
        spotify: '',
        soundcloud: 'https://soundcloud.com',
        insta: '',
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
    if (!data) return;

    const modal = document.getElementById('artist-modal');
    const box = document.getElementById('modal-box');
    const desc = document.getElementById('modal-desc');
    const linksContainer = document.querySelector('.modal-links');

    document.getElementById('modal-name').innerText = data.name;
    document.getElementById('modal-img').src = data.img;
    
    desc.innerHTML = ""; 
    clearTimeout(typingTimer);
    
    // Build Icons
    linksContainer.innerHTML = ""; 
    if (data.spotify) {
        linksContainer.innerHTML += `<a href="${data.spotify}" target="_blank" class="spotify-icon"><i class="fab fa-spotify"></i></a>`;
    }
    if (data.soundcloud) {
        linksContainer.innerHTML += `<a href="${data.soundcloud}" target="_blank" class="sc-icon"><i class="fab fa-soundcloud"></i></a>`;
    }
    if (data.insta) {
        linksContainer.innerHTML += `<a href="${data.insta}" target="_blank" class="insta-icon"><i class="fab fa-instagram"></i></a>`;
    }

    modal.style.display = 'flex';
    setTimeout(() => {
        box.classList.add('active');
        // Only start typing if there is text in the desc field
        if(data.desc) {
            setTimeout(() => typeWriter(data.desc, 0, desc), 500);
        }
    }, 10);
}

function closeArtist() {
    const box = document.getElementById('modal-box');
    box.classList.remove('active');
    clearTimeout(typingTimer);
    setTimeout(() => {
        document.getElementById('artist-modal').style.display = 'none';
    }, 500);
}

window.onclick = function(event) {
    const modal = document.getElementById('artist-modal');
    if (event.target == modal) {
        closeArtist();
    }
}
