document.addEventListener('DOMContentLoaded', function () {
    let hasScrolled = false;

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight * 0.8 && rect.bottom >= 0;
    }

    function animateOnScroll() {
        if (!hasScrolled) return;

        document.querySelectorAll('.fade-in, .slide-in').forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }

    // Detecta o primeiro scroll para iniciar as animações
    window.addEventListener('scroll', function () {
        hasScrolled = true;
        animateOnScroll();
    });

    // Chamada inicial caso o usuário já tenha descido a página ao carregar
    animateOnScroll();
});
