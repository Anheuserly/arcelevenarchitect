// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lazy loading images
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Form validation
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        // If form is valid, you can submit it
        console.log('Form submitted successfully');
        form.reset();
    }
});

function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (name.value.trim() === '') {
        isValid = false;
        showError(name, 'Name is required');
    } else {
        removeError(name);
    }

    if (email.value.trim() === '') {
        isValid = false;
        showError(email, 'Email is required');
    } else if (!isValidEmail(email.value)) {
        isValid = false;
        showError(email, 'Please enter a valid email');
    } else {
        removeError(email);
    }

    if (message.value.trim() === '') {
        isValid = false;
        showError(message, 'Message is required');
    } else {
        removeError(message);
    }

    return isValid;
}

function showError(input, message) {
    const formControl = input.parentElement;
    const errorDiv = formControl.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerText = message;
    if (!formControl.querySelector('.error-message')) {
        formControl.appendChild(errorDiv);
    }
    input.classList.add('error');
}

function removeError(input) {
    const formControl = input.parentElement;
    const errorDiv = formControl.querySelector('.error-message');
    if (errorDiv) {
        formControl.removeChild(errorDiv);
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Animated counter for statistics
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Usage example (you'll need to add elements with these IDs in your HTML):
// document.getElementById("projectsCount").innerHTML = "0";
// animateValue(document.getElementById("projectsCount"), 0, 100, 2000);
        const openNavBtn = document.querySelector('.open-nav-btn');
        const navPanel = document.getElementById('navPanel');
        const closeNavBtn = document.getElementById('closeNav');

        openNavBtn.addEventListener('click', () => {
            navPanel.classList.add('active');
        });

        closeNavBtn.addEventListener('click', () => {
            navPanel.classList.remove('active');
        });
        document.getElementById('closeNav').addEventListener('click', function() {
            document.getElementById('navPanel').classList.remove('active');
        });
        
        // Example to open the panel (you may need to add this to an appropriate event or button)
        function openNav() {
            document.getElementById('navPanel').classList.add('active');
        }
        const searchToggle = document.querySelector('.search-toggle');
        const searchBox = document.querySelector('.search-box');
        
        searchToggle.addEventListener('click', () => {
            searchBox.style.display = searchBox.style.display === 'flex' ? 'none' : 'flex';
        });
        document.querySelector('.search-toggle').addEventListener('click', function() {
            document.querySelector('.search-wrapper').classList.toggle('open');
        });
        