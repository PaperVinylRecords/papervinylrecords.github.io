const artistData = {
    'wilrhy': { name: 'WilRhy', desc: 'WilRhy brings heavy vinyl influence to the Paper Vinyl roster.', img: 'images/wilrhy.jpg' },
    // Add others here...
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
    const modal = document.getElementById('artist-modal');
    const box = document.getElementById('modal-box');
    const desc = document.getElementById('modal-desc');

    document.getElementById('modal-name').innerText = data.name;
    document.getElementById('modal-img').src = data.img;
    desc.innerHTML = ""; // Clear for typing
    clearTimeout(typingTimer);

    modal.style.display = 'flex';
    setTimeout(() => {
        box.classList.add('active');
        // Start typing after zoom finishes
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
