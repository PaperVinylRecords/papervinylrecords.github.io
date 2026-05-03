const artistData = {
    'wilrhy': {
        name: 'WilRhy',
        desc: 'WilRhy brings a signature blend of lo-fi textures and heavy vinyl influence to the Paper Vinyl roster.',
        spotify: 'https://spotify.com',
        insta: 'https://instagram.com'
    },
    'frostability': {
        name: 'Frostability',
        desc: 'Known for chilling atmospheres and crisp production, Frostability is a staple of the underground scene.',
        spotify: 'https://spotify.com',
        insta: 'https://instagram.com'
    },
    'undyingbear': {
        name: 'undyingbear',
        desc: 'Experimental beats that refuse to quit. undyingbear pushes the boundaries of traditional genre lines.',
        spotify: 'https://spotify.com',
        insta: 'https://instagram.com'
    },
    'twistedanimations': {
        name: 'TwistedAnimations',
        desc: 'Visual and auditory chaos. TwistedAnimations creates immersive worlds within every track.',
        spotify: 'https://spotify.com',
        insta: 'https://instagram.com'
    },
    'smitebite': {
        name: 'SmiteBite',
        desc: 'Aggressive, raw, and unapologetic. SmiteBite delivers high-energy sounds that leave an impact.',
        spotify: 'https://spotify.com',
        insta: 'https://instagram.com'
    }
};

function openArtist(id) {
    const data = artistData[id];
    document.getElementById('modal-name').innerText = data.name;
    document.getElementById('modal-desc').innerText = data.desc;
    document.getElementById('modal-spotify').href = data.spotify;
    document.getElementById('modal-insta').href = data.insta;
    document.getElementById('artist-modal').style.display = 'block';
}

function closeArtist() {
    document.getElementById('artist-modal').style.display = 'none';
}

// Close modal if user clicks outside of the box
window.onclick = function(event) {
    let modal = document.getElementById('artist-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
