document.addEventListener('DOMContentLoaded', function() {
    // Анимации при прокрутке
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Эффект при прокрутке для навигации
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Инициализация EmailJS
    emailjs.init("kcE6SQT2NhiXVlDiQ"); // Замените на ваш Public Key

    // Обработка отправки формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Form submitted'); // Для отладки
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            console.log('Form data:', formData); // Для отладки
            emailjs.send("service_h344zrn", "template_198vwfw", { // Замените на ваши Service ID и Template ID
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: "baronstocwork@gmail.com"
            })
            .then(function(response) {
                console.log('Email sent:', response); // Для отладки
                alert('Сообщение успешно отправлено!');
                contactForm.reset();
            }, function(error) {
                console.log('Email error:', error); // Для отладки
                alert('Ошибка при отправке сообщения: ' + JSON.stringify(error));
            });
        });
    }
});
