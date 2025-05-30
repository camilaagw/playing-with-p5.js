async function loadGallery() {
  try {
    const response = await fetch('./gallery-data.json');
    const galleryItems = await response.json();

    const galleryContainer = document.querySelector('.gallery');

    galleryItems.forEach(item => {
      const containerLink = document.createElement('a');
      containerLink.className = 'container';
      containerLink.href = item.href;

      const img = document.createElement('img');
      img.className = 'gallery-item';
      img.src = item.image;
      img.alt = item.title;

      const overlay = document.createElement('div');
      overlay.className = `overlay ${item.overlayClass}`.trim();
      overlay.textContent = item.title;

      containerLink.appendChild(img);
      containerLink.appendChild(overlay);
      galleryContainer.appendChild(containerLink);
    });
  } catch (error) {
    console.error('Error loading gallery:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadGallery);