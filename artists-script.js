const artistData = {
    'wilrhy': { name: 'WilRhy', desc: '', img: 'images/wilrhy.jpg', spotify: '#', insta: '#' },
    'frostability': { name: 'Frostability', desc: '', img: 'images/frostability.jpg', spotify: '#', insta: '#' },
    'undyingbear': { name: 'undyingbear', desc: '', img: 'images/undyingbear.jpg', spotify: '#', insta: '#' },
    'twistedanimations': { name: 'TwistedAnimations', desc: '', img: 'images/twistedanimations.jpg', spotify: '#', insta: '#' },
    'smitebite': { name: 'SmiteBite', desc: '', img: 'images/smitebite.jpg', spotify: '#', insta: '#' }
};

const modal = document.getElementById('artist-modal');
const modalBox = document.getElementById('modal-box');
const cards = document.querySelectorAll('.artist-card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const data = artistData[id];
        
        // Fill modal data
        document.getElementById('modal-name').innerText = data.name;
        document.getElementById('modal-desc').innerText = data.desc;
        document.getElementById('modal-img').src = data.img;
        
        // Open and animate
        modal.style.display = 'flex';
        setTimeout(() => {
            modalBox.classList.add('active');
        }, 10);
    });
});

document.getElementById('close-modal').addEventListener('click', closeModal);

function closeModal() {
    modalBox.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Wait for zoom-out animation
}
