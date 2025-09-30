// Lazy loading with Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
    // Carousel functionality
    const carousel = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel img');
    let index = 0;

    document.querySelector('.next').addEventListener('click', () => {
        index = (index + 1) % images.length;
        carousel.style.transform = `translateX(-${index * 100}%)`;
    });

    document.querySelector('.prev').addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        carousel.style.transform = `translateX(-${index * 100}%)`;
    });

    // Autoplay
    setInterval(() => {
        index = (index + 1) % images.length;
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }, 5000);

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const gridImages = document.querySelectorAll('.grid-img');

    gridImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
        });
    });

    document.querySelector('.close').addEventListener('click', () => {
        lightbox.style.display = 'none';
    });



    const lazyImages = document.querySelectorAll('img.lazy');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                obs.unobserve(img);
            }
        });
    }, {
        rootMargin: "0px 0px 200px 0px",
        threshold: 0.1
    });

    lazyImages.forEach(img => observer.observe(img));
});