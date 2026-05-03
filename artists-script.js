const artistData = {
    'wilrhy': { 
        name: 'WilRhy', 
        desc: 'ENTER_DESCRIPTION_HERE', 
        img: 'images /wilrhy.jpg' 
    },
    'frostability': { 
        name: 'Frostability', 
        desc: 'ENTER_DESCRIPTION_HERE', 
        img: 'images /frostability.jpg' 
    },
    'undyingbear': { 
        name: 'undyingbear', 
        desc: 'ENTER_DESCRIPTION_HERE', 
        img: 'images /undyingbear.jpg' 
    },
    'twistedanimations': { 
        name: 'TwistedAnimations', 
        desc: 'ENTER_DESCRIPTION_HERE', 
        img: 'images /twistedanimations.jpg' 
    },
    'smitebite': { 
        name: 'SmiteBite', 
        desc: 'ENTER_DESCRIPTION_HERE', 
        img: 'images /smitebite.jpg' 
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

    document.getElementById('modal-name').innerText = data.name;
    document.getElementById('modal-img').src = data.img;
    desc.innerHTML = ""; 
    clearTimeout(typingTimer);

    modal.style.display = 'flex';
    setTimeout(() => {
        box.classList.add('active');
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
