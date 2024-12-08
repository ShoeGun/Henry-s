// Function to display the specified section and update the navigation link styling
function showSection(sectionId) {
    console.log("Attempting to show section:", sectionId); // Debugging line

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(function(section) {
        console.log("Hiding section:", section.id); // Debugging line
        section.style.display = 'none';
    });

    // Show the selected section
    console.log("Showing section:", sectionId); // Debugging line
    document.getElementById(sectionId).style.display = 'block';

    // Toggle CTA visibility based on the section
    const cta = document.getElementById('cta');
    if (cta) {
        if (sectionId === 'services') {
            cta.style.display = 'block'; // Show the CTA on the Services page
        } else {
            cta.style.display = 'none'; // Hide the CTA for other sections
        }
    }

    // Update active class for the clicked nav link
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[data-section='${sectionId}']`);
    if (activeLink) {
        activeLink.classList.add('active');
        console.log("Activated link for section:", sectionId); // Debugging line
    } else {
        console.warn(`No link found for section: ${sectionId}`);
    }

    // Special handling for "items" section to initialize carousels
    if (sectionId === 'items') {
        console.log('Initializing carousels for the "items" section');
        initCarousel('carousel1', 'slide-indicators-1');
        initCarousel('carousel2', 'slide-indicators-2');
    }
}

// Carousel behavior
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
});

// Initialize Carousel Logic
function initCarousel(carouselId, indicatorId) {
    console.log(`Initializing carousel: ${carouselId} with indicators: ${indicatorId}`);
    let slides = document.getElementById(carouselId).getElementsByClassName("carousel-slide");
    if (!slides.length) {
        console.warn(`No slides found for carousel: ${carouselId}`);
        return; // Exit if no slides found
    }
    let currentSlide = 0;
    let autoPlayTimer = setInterval(() => nextSlide(1), 4000); // Autoplay setup

    function createSlideIndicators() {
        let indicatorContainer = document.getElementById(indicatorId);
        if (!indicatorContainer) {
            console.warn(`No indicator container found with ID: ${indicatorId}`);
            return; // Exit if no indicator container found
        }
        indicatorContainer.innerHTML = ''; // Reset indicators

        for (let i = 0; i < slides.length; i++) {
            let dot = document.createElement("span");
            dot.classList.add("dot");
            dot.onclick = () => {
                console.log(`Moving to slide: ${i} in carousel: ${carouselId}`);
                goToSlide(i);
            };
            indicatorContainer.appendChild(dot);
        }
        console.log(`Created ${slides.length} slide indicators for: ${carouselId}`);
    }

    function goToSlide(n) {
        console.log(`Going to slide: ${n} in carousel: ${carouselId}`);
        clearInterval(autoPlayTimer); // Stop the autoplay when a dot is clicked
        currentSlide = n;
        showSlides();
        autoPlayTimer = setInterval(() => nextSlide(1), 4000); // Restart autoplay
    }

    function showSlides() {
        console.log(`Showing slides for carousel: ${carouselId}`);
        Array.from(slides).forEach((slide, index) => {
            slide.style.display = "none"; // Hide all slides
        });

        slides[currentSlide].style.display = "block"; // Show the current slide
        let dots = document.getElementById(indicatorId).getElementsByClassName("dot");
        if (dots[currentSlide]) { // Check if the dot exists to avoid errors
            dots[currentSlide].classList.add("active");
        }
    }

    function nextSlide(n) {
        console.log(`Current slide before change: ${currentSlide}`);
        currentSlide += n;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        console.log(`Current slide after change: ${currentSlide}`);
        showSlides();
    }

    createSlideIndicators();
    showSlides(); // Initially show the first slide
}
