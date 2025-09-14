'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Auto-scroll testimonials
const initTestimonialsScroll = () => {
    const testimonialsList = document.querySelector('.testimonials-list');
    const testimonialItems = document.querySelectorAll('.testimonials-item');
    let currentIndex = 0;
    
    // Only initialize if we have testimonials
    if (!testimonialsList || testimonialItems.length === 0) return;

    const scrollToNext = () => {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        const targetItem = testimonialItems[currentIndex];
        
        testimonialsList.scrollTo({
            left: targetItem.offsetLeft,
            behavior: 'smooth'
        });
    };

    // Start auto-scrolling
    const scrollInterval = setInterval(scrollToNext, 4000); // Scroll every 4 seconds

    // Pause on hover or touch
    testimonialsList.addEventListener('mouseenter', () => clearInterval(scrollInterval));
    testimonialsList.addEventListener('touchstart', () => clearInterval(scrollInterval));

    // Resume on mouse leave or touch end
    let resumeInterval;
    testimonialsList.addEventListener('mouseleave', () => {
        clearInterval(resumeInterval);
        resumeInterval = setInterval(scrollToNext, 4000);
    });
    testimonialsList.addEventListener('touchend', () => {
        clearInterval(resumeInterval);
        resumeInterval = setInterval(scrollToNext, 4000);
    });
};

// Progress bar animation functionality
const initProgressBars = () => {
    const ANIMATION_DURATION = 1500; // 1.5 seconds
    
    // Utility function to animate both progress bar and number
    const animateProgress = (dataElement, progressBar, targetValue) => {
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
            
            // Smooth easing function
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const currentValue = Math.round(targetValue * easeProgress);
            
            // Update both elements
            dataElement.textContent = currentValue;
            dataElement.value = currentValue;
            progressBar.style.width = `${currentValue}%`;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    };
    
    // Set up the Intersection Observer
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const dataElement = progressBar.parentElement.previousElementSibling.querySelector('data');
                const targetPercentage = parseInt(dataElement.value);
                
                // Reset and start animation
                progressBar.style.width = '0%';
                dataElement.textContent = '0';
                
                setTimeout(() => {
                    animateProgress(dataElement, progressBar, targetPercentage);
                    progressBar.classList.add('animate');
                }, 50);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    // Initialize all progress bars
    document.querySelectorAll('.skill-progress-fill').forEach(bar => {
        bar.style.width = '0%';
        const dataElement = bar.parentElement.previousElementSibling.querySelector('data');
        dataElement.textContent = '0';
        progressObserver.observe(bar);
    });
};



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// Portfolio

// Project data
const projectsData = {
    'chohantextile': {
        id: 'chohantextile',
        title: 'ChohanTextile E-commerce',
        description: 'A modern e-commerce mobile application for textile products',
        category: 'Mobile Development',
        date: 'May 2023',
        type: 'Mobile App',
        image: './assets/images/Textie.png',
        overview: 'ChohanTextile is a comprehensive e-commerce mobile application built with React Native and Firebase. The app provides a seamless shopping experience with secure payments via Stripe, real-time inventory management, and an intuitive admin panel.',
        features: [
            {
                title: 'Product Catalog',
                description: 'Beautifully organized products with categories, filters, and search functionality'
            },
            {
                title: 'Secure Checkout',
                description: 'Seamless Stripe integration supporting multiple payment methods and secure transactions'
            },
            {
                title: 'User Authentication',
                description: 'Secure login with Firebase Authentication and social login options for better user experience'
            },
            {
                title: 'Admin Dashboard',
                description: 'Comprehensive admin panel for managing products, orders, and customer data efficiently'
            }
        ],
        technologies: {
            frontend: ['React Native', 'Redux', 'JavaScript', 'Styled Components'],
            backend: ['Firebase', 'Node.js', 'Express', 'Stripe API']
        },
        links: {
            github: 'https://github.com/yourusername/chohantextile',
            demo: 'https://chohantextile-demo.com'
        }
    },
    'solarsolutions': {
        id: 'solarsolutions',
        title: 'Solar Solutions',
        description: 'A comprehensive web platform for solar energy solutions and consultations',
        category: 'Web Development',
        date: 'June 2023',
        type: 'Solar Solutions Inc.',
        image: './assets/images/solar.png',
        overview: 'Solar Solutions is a web platform connecting homeowners with solar energy providers. It features an intuitive interface for getting instant quotes, comparing solar panel options, and scheduling installations.',
        features: [
            {
                title: 'Instant Solar Quotes',
                description: 'IPersonalized solar quotes in seconds based on home and energy usage details.'
            },
            {
                title: 'Savings Calculator',
                description: 'Interactive calculator showing potential energy bill savings and environmental impact.'
            },
            {
                title: 'Product Comparison',
                description: 'Compare different solar panel models and battery storage options.'
            },
            {
                title: 'Installation Scheduling',
                description: 'Integrated calendar for scheduling consultations with certified technicians.'
            }
        ],
        technologies: {
            frontend: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
            backend: ['PHP', 'MySQL', 'RESTful API']
        },
        links: {
            github: 'https://github.com/yourusername/solar-solutions',
            demo: 'https://solar-solutions-demo.com'
        }
    },
    // Add more projects here...
};

// Function to open project detail view
function openProjectDetail(projectId) {
    // Get project data
    const project = projectsData[projectId];
    if (!project) return;

    // Hide all articles
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        article.classList.remove('active');
    });
    
    // Show project detail article
    const projectDetailArticle = document.querySelector('article[data-page="project-detail"]');
    if (projectDetailArticle) {
        // Update content with project data
        projectDetailArticle.querySelector('.project-detail-title').textContent = project.title;
        projectDetailArticle.querySelector('.project-detail-description').textContent = project.description;
        
        // Update meta information
        const metaItems = projectDetailArticle.querySelectorAll('.project-detail-meta-item span');
        metaItems[0].textContent = project.category;
        metaItems[1].textContent = project.date;
        metaItems[2].textContent = project.type;
        
        // Update overview
        projectDetailArticle.querySelector('.project-detail-overview').textContent = project.overview;
        
        // Update features
        const featuresGrid = projectDetailArticle.querySelector('.project-detail-features-grid');
        featuresGrid.innerHTML = project.features.map(feature => `
            <div class="project-detail-feature-item">
                <h4 class="project-detail-feature-title">
                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                    ${feature.title}
                </h4>
                <p class="project-detail-feature-description">${feature.description}</p>
            </div>
        `).join('');
        
        // Update technologies
        const techTags = {
            frontend: projectDetailArticle.querySelector('.project-detail-tech-category:first-child .project-detail-tech-tags'),
            backend: projectDetailArticle.querySelector('.project-detail-tech-category:last-child .project-detail-tech-tags')
        };
        
        techTags.frontend.innerHTML = project.technologies.frontend.map(tech => 
            `<span class="project-detail-tech-tag">${tech}</span>`
        ).join('');
        
        techTags.backend.innerHTML = project.technologies.backend.map(tech => 
            `<span class="project-detail-tech-tag">${tech}</span>`
        ).join('');
        
        // Update image
        const projectImage = projectDetailArticle.querySelector('.project-detail-img');
        projectImage.src = project.image;
        projectImage.alt = project.title;
        
        // Update links
        const [githubBtn, demoBtn] = projectDetailArticle.querySelectorAll('.project-detail-actions a');
        githubBtn.href = project.links.github;
        demoBtn.href = project.links.demo;
        
        projectDetailArticle.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Function to go back to portfolio
function backToPortfolio() {
    // Hide all articles
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        article.classList.remove('active');
    });
    
    // Show portfolio article
    const portfolioArticle = document.querySelector('article[data-page="portfolio"]');
    if (portfolioArticle) {
        portfolioArticle.classList.add('active');
    }
}

// Function to open image in fullscreen
function openFullscreen() {
    const overlay = document.getElementById('projectDetailFullscreenOverlay');
    const projectImage = document.querySelector('.project-detail-img');
    const fullscreenImage = overlay.querySelector('.project-detail-fullscreen-img');
    
    if (overlay && projectImage && fullscreenImage) {
        // Update fullscreen image source and alt text
        fullscreenImage.src = projectImage.src;
        fullscreenImage.alt = projectImage.alt;
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Function to close fullscreen view
function closeFullscreen() {
    const overlay = document.getElementById('projectDetailFullscreenOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close fullscreen when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeFullscreen();
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize auto-scroll for testimonials
    initTestimonialsScroll();

    // Add click event to all project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        const projectId = item.querySelector('.project-title').textContent;
        
        // Add click event to the eye icon
        const eyeIcon = item.querySelector('.project-item-icon-box');
        if (eyeIcon) {
            eyeIcon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                // Match the project ID exactly as it appears in the projectsData object
                const normalizedId = projectId.replace(/\s+/g, '').toLowerCase();
                openProjectDetail(normalizedId);
            });
        }
    });
    
    // Back button event
    const backBtn = document.querySelector('.project-detail-back');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            backToPortfolio();
        });
    }
    
    // Close button event
    const closeBtn = document.querySelector('.project-detail-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFullscreen);
    }
    
    // Close fullscreen when clicking on overlay
    const overlay = document.getElementById('projectDetailFullscreenOverlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeFullscreen();
            }
        });
    }
});