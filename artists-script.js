const artistData = {
    'wilrhy': { name: 'WilRhy', desc: "", img: 'images /wilrhy.jpg', spotify: 'https://spotify.com', soundcloud: '', insta: 'https://instagram.com' },
    'frostability': { name: 'Frostability', desc: "", img: 'images /frostability.jpg', spotify: 'https://spotify.com', soundcloud: '', insta: 'https://instagram.com' },
    'undyingbear': { name: 'undyingbear', desc: "", img: 'images /undyingbear.jpg', spotify: 'https://spotify.com', soundcloud: '', insta: 'https://instagram.com' },
    'twistedanimations': { name: 'TwistedAnimations', desc: "", img: 'images /twistedanimations.jpg', spotify: 'https://spotify.com', soundcloud: '', insta: '' },
    'smitebite': { name: 'SmiteBite', desc: "", img: 'images /smitebite.jpg', spotify: '', soundcloud: 'https://soundcloud.com', insta: '' }
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
    const desc = document.getElementById('modal-desc');
    const linksContainer = document.querySelector('.modal-links');

    document.getElementById('modal-name').innerText = data.name;
    document.getElementById('modal-img').src = data.img;
    desc.innerHTML = ""; 
    clearTimeout(typingTimer);
    
    linksContainer.innerHTML = ""; 
    if (data.spotify) linksContainer.innerHTML += `<a href="${data.spotify}" target="_blank" class="spotify-icon"><svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.306c-.214.351-.673.463-1.024.249-2.81-1.717-6.347-2.105-10.513-1.152-.403.092-.81-.159-.903-.562-.092-.403.159-.81.562-.903 4.567-1.044 8.47-.59 11.629 1.341.351.214.463.673.249 1.024zm1.47-3.255c-.269.438-.838.577-1.276.308-3.216-1.977-8.118-2.548-11.92-1.393-.497.151-1.025-.13-1.176-.627-.151-.497.13-1.025.627-1.176 4.343-1.318 9.74-.68 13.46 1.612.439.269.578.838.309 1.276zm.126-3.414C15.24 8.23 8.87 8.018 5.16 9.144c-.58.176-1.196-.156-1.372-.736-.176-.58.156-1.196.736-1.372 4.257-1.293 11.292-1.045 15.753 1.603.522.316.692.99.376 1.512-.316.522-.99.692-1.512.376z"/></svg></a>`;
    if (data.soundcloud) linksContainer.innerHTML += `<a href="${data.soundcloud}" target="_blank" class="sc-icon"><svg viewBox="0 0 24 24"><path d="M12.33 13.916c-.035 0-.063.023-.063.06l-.004 2.85c0 .034.025.062.06.062h3.313c.036 0 .065-.028.065-.062v-2.85c0-.037-.029-.06-.065-.06h-3.306zm-1.85 2.914l-.004-.002c-.03 0-.057-.02-.06-.05V12.1c.003-.035.03-.064.066-.064.032 0 .06.025.064.06v4.68c-.004.034-.03.064-.066.064zm-1.876-.062l-.005.002c-.03 0-.057-.02-.061-.05l-.004-3.15c0-.036.027-.065.062-.065.034 0 .06.027.065.062l.004 3.151c-.005.03-.03.05-.061.05zm-1.875 0c-.03 0-.057-.02-.061-.05l-.004-2.85c.004-.034.032-.06.065-.06s.061.026.065.06l.004 2.85c-.004.03-.031.05-.065.05zm-1.874 0c-.03 0-.056-.02-.061-.05l-.004-1.8c.004-.033.031-.06.065-.06s.06.027.065.06l.004 1.8c-.005.03-.032.05-.065.05zm-1.876 0c-.03 0-.057-.02-.061-.05l-.004-1.05c0-.033.028-.06.061-.06.035 0 .061.027.065.06l.004 1.05c-.005.03-.03.05-.065.05zm-1.875 0c-.032 0-.058-.022-.062-.054l-.003-.45c.003-.033.03-.06.065-.06s.061.027.065.06l.003.45c-.004.032-.03.054-.068.054zm17.994-3.41c-.482 0-.93.136-1.314.368-.224-2.023-1.942-3.585-4.02-3.585-.626 0-1.213.14-1.734.39-.333-.947-1.233-1.628-2.296-1.628-.152 0-.3.013-.443.04.004-.066.012-.132.012-.2 0-1.572-1.274-2.846-2.845-2.846-.033 0-.063.01-.096.012v12.018c.032.003.06.013.093.013h12.646c1.472 0 2.666-1.194 2.666-2.666s-1.194-2.667-2.666-2.667z"/></svg></a>`;
    if (data.insta) linksContainer.innerHTML += `<a href="${data.insta}" target="_blank" class="insta-icon"><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.367-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.367-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.367.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.351-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.337-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>`;

    modal.style.display = 'flex';
    // Small delay before adding class to ensure transition plays
    setTimeout(() => {
        modal.classList.add('show');
        if(data.desc) setTimeout(() => typeWriter(data.desc, 0, desc), 500);
    }, 20);
}

function closeArtist() {
    const modal = document.getElementById('artist-modal');
    modal.classList.remove('show');
    clearTimeout(typingTimer);
    // Wait for animation to finish before hiding display
    setTimeout(() => {
        modal.style.display = 'none';
    }, 450); 
}
