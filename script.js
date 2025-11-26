document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully');

    // Render Content
    renderProfile();
    renderSection('experience-list', experienceData);
    renderSection('projects-list', projectsData);
    renderSection('certifications-list', certificationsData);
    renderSection('education-list', educationData);

    // Initialize Animations
    initializeAnimations();
    initializeSmoothScroll();
});

function renderProfile() {
    if (typeof profileData === 'undefined') return;

    const titleEl = document.getElementById('hero-title');
    if (titleEl) {
        titleEl.innerHTML = `${profileData.title} <span class="highlight">${profileData.highlight}</span>`;
    }

    const subtitleEl = document.getElementById('hero-subtitle');
    if (subtitleEl) subtitleEl.textContent = profileData.subtitle;

    const contactTextEl = document.getElementById('contact-text');
    if (contactTextEl) contactTextEl.textContent = profileData.contactText;

    const contactEmailEl = document.getElementById('contact-email');
    if (contactEmailEl) contactEmailEl.href = `mailto:${profileData.email}`;

    const footerTextEl = document.getElementById('footer-text');
    if (footerTextEl) footerTextEl.innerHTML = profileData.footerText;
}

function renderSection(elementId, data) {
    const container = document.getElementById(elementId);
    if (!container || typeof data === 'undefined') return;

    container.innerHTML = data.map((item, index) => `
        <div class="card">
            <div class="card-header">
                <span class="spec-label">NO. 0${index + 1}</span>
            </div>
            <h3 class="card-title">${item.title}</h3>
            <p class="card-subtitle">${item.subtitle}</p>
            ${item.majors ? `<p class="card-text" style="margin-bottom: 0.5rem; font-weight: bold;">MAJORS: ${item.majors}</p>` : ''}
            ${item.text ? `<p class="card-text">${item.text}</p>` : ''}
        </div>
    `).join('');
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}
