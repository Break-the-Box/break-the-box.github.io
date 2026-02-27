document.addEventListener("DOMContentLoaded", function () {
    // Determine current page for active state
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === '/') {
        currentPath = 'index.html';
    }

    // Load Header
    fetch('components/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;

                // Set active class
                const navLinks = document.querySelectorAll('.main-nav a:not(.btn-primary-outline)');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPath) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                // Attach mobile menu event listener
                const toggleBtn = document.querySelector('.mobile-menu-toggle');
                const mainNav = document.querySelector('.main-nav');
                if (toggleBtn && mainNav) {
                    toggleBtn.addEventListener('click', function () {
                        mainNav.classList.toggle('active');
                    });
                }
            }
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch('components/footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});
