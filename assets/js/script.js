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
            if (dataElement) {
                dataElement.textContent = currentValue;
                dataElement.value = currentValue;
            }
            progressBar.style.setProperty('width', `${currentValue}%`, 'important');
            
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
                progressBar.style.setProperty('width', '0%', 'important');
                if (dataElement) {
                    dataElement.textContent = '0';
                }
                
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
        // Force override inline styles
        bar.style.setProperty('width', '0%', 'important');
        const dataElement = bar.parentElement.previousElementSibling.querySelector('data');
        if (dataElement) {
            dataElement.textContent = '0';
        }
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
            github: 'https://github.com/Shawaiz-Hussain/textile_ecomm_mobile_app'
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
            github: 'https://github.com/Shawaiz-Hussain/solar_solutions'
        }
    },
    'urbanarc': {
        id: 'urbanarc',
        title: 'Urban Arc',
        description: 'A contemporary furniture company website showcasing premium furniture designs and craftsmanship',
        category: 'Web Development',
        date: 'July 2023',
        type: 'E-commerce Furniture Retail Platform',
        image: './assets/images/urbaner_web.jpg',
        overview: 'Urban Arc is a professional website for a furniture design and manufacturing company. It showcases their product portfolio, services, and expertise in creating quality furniture pieces that blend comfort with aesthetic appeal.',
        features: [
            {
                title: 'Product Showcase',
                description: 'Beautiful gallery displaying furniture collections with detailed product information and specifications'
            },
            {
                title: 'Product Categories',
                description: 'Comprehensive organization of furniture types including visitor chairs, office furniture, and residential pieces'
            },
            {
                title: 'Responsive Design',
                description: 'Fully responsive website optimized for all devices and screen sizes'
            },
            {
                title: 'E-commerce Integration',
                description: 'Easy-to-use shopping cart, checkout system, and consultation booking for potential clients'
            },
            {
                title: 'Customer Engagement',
                description: 'Direct WhatsApp integration for personalized customer service and inquiries'
            }
        ],
        technologies: {
            frontend: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
            backend: ['PHP', 'MySQL', 'Secure Payment Processing']
        },
        links: {
            github: 'https://github.com/Shawaiz-Hussain/urbanarc',
            live: 'https://urbanarc.pk/'
        }
    },
    'arteest': {
        id: 'arteest',
        title: 'Arteest',
        description: 'An e-commerce platform offering art-inspired streetwear and creative merchandise featuring custom artwork and pop culture designs',
        category: 'Web Development',
        date: 'August 2023',
        type: 'E-commerce Art & Apparel Store',
        image: './assets/images/aarteest_Web.jpg',
        overview: 'Arteest is a vibrant e-commerce website specializing in art-inspired merchandise. It showcases unique apparel and products featuring original artwork, combining streetwear fashion with pop culture influences to create wearable art.',
        features: [
            {
                title: 'Product Showcase',
                description: 'Beautiful gallery displaying art-inspired merchandise including T-shirts, hoodies, mugs, and art prints'
            },
            {
                title: 'Shop Organization',
                description: 'Comprehensive categorization of products by type, collection, and artwork style'
            },
            {
                title: 'Responsive Design',
                description: 'Fully responsive website optimized for all devices and screen sizes'
            },
            {
                title: 'E-commerce Integration',
                description: 'Streamlined shopping experience with "quick add" options, secure checkout, and inventory management'
            }
        ],
        technologies: {
            frontend: ['HTML5', 'CSS3', 'JavaScript'],
            backend: ['Node.js/PHP', 'MongoDB/MySQL', 'Shopify/WooCommerce/Magento']
        },
        links: {
            github: 'https://github.com/Shawaiz-Hussain/arteest'
        }
    },
    'streamhubplatform': {
        title: 'Kron Cast',
        description: 'A comprehensive live-streaming and event platform designed for creators and audiences',
        category: 'Web Design',
        date: '2024',
        type: 'Figma Design',
        overview: 'Kron Cast is a modern live-streaming and event platform that combines the best features of streaming platforms like Twitch/YouTube Live with event-based platforms like Eventbrite/StageIt. The design focuses on creating an engaging environment where users can watch live events, discover content, and interact with creators in real-time.',
        image: './assets/images/KRONCAST.png',
        features: [
            {
                title: 'Live Event Streaming',
                description: 'Main video player interface for watching live events and streams with high-quality viewing experience.'
            },
            {
                title: 'Real-time Chat',
                description: 'Interactive chat panel for real-time audience engagement and community building during live events.'
            },
            {
                title: 'Event Discovery',
                description: 'Comprehensive event discovery system with cards showcasing upcoming events, courses, and streams.'
            },
            {
                title: 'Creator Support',
                description: 'Tools and features for content creators to manage their streams, interact with audiences, and grow their community.'
            }
        ],
        technologies: {
            frontend: ['Figma', 'UI/UX Design', 'Prototyping', 'Wireframing'],
            backend: ['Component Library', 'Design Tokens', 'Style Guide', 'Responsive Design']
        },
        links: {
            github: '#'
        }
    }
};

// Function to open project detail view
function openProjectDetail(projectId) {
    console.log('Opening project detail for:', projectId);
    // Get project data
    const project = projectsData[projectId];
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }
    console.log('Project data found:', project);

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
        const actionBtn = projectDetailArticle.querySelector('.project-detail-actions a');
        if (project.links.live) {
            actionBtn.href = project.links.live;
            actionBtn.innerHTML = '<ion-icon name="open-outline"></ion-icon>View Live Site';
        } else if (project.links.github) {
            actionBtn.href = project.links.github;
            actionBtn.innerHTML = '<ion-icon name="logo-github"></ion-icon>View on GitHub';
        }
        
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
    
    // Initialize progress bars
    initProgressBars();

    // Add click event to all project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        // Get project ID from data attribute or normalize from title
        let projectId = item.dataset.projectId;
        if (!projectId) {
            const projectTitle = item.querySelector('.project-title').textContent;
            projectId = projectTitle.replace(/\s+/g, '').toLowerCase();
        }
        
        // Add click event to the entire project item
        const projectLink = item.querySelector('.project-link');
        if (projectLink) {
            projectLink.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Project link clicked for:', projectId);
                openProjectDetail(projectId);
            });
        }
        
        // Add click event to the eye icon specifically
        const eyeIcon = item.querySelector('.project-item-icon-box');
        if (eyeIcon) {
            eyeIcon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Eye icon clicked for:', projectId);
                openProjectDetail(projectId);
            });
            
            // Add hover debugging for Solar Solutions
            if (projectId === 'solarsolutions') {
                const projectLink = item.querySelector('.project-link');
                projectLink.addEventListener('mouseenter', function() {
                    console.log('Solar Solutions hover started');
                });
                projectLink.addEventListener('mouseleave', function() {
                    console.log('Solar Solutions hover ended');
                });
            }
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