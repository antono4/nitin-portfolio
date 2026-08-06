$(document).ready(function() {
    
    // ===================================
    // Custom Cursor
    // ===================================
    const cursor = $('.cursor');
    const cursorFollower = $('.cursor-follower');
    
    $(document).on('mousemove', function(e) {
        cursor.css({
            left: e.clientX,
            top: e.clientY
        });
        
        setTimeout(function() {
            cursorFollower.css({
                left: e.clientX,
                top: e.clientY
            });
        }, 100);
    });
    
    $('a, button, .skill-card, .hobby-card, .contact-card, .timeline-content').on('mouseenter', function() {
        cursor.addClass('hover');
    }).on('mouseleave', function() {
        cursor.removeClass('hover');
    });
    
    // ===================================
    // Navigation
    // ===================================
    const floatingNav = $('.floating-nav');
    const navToggle = $('.nav-toggle');
    const mobileMenu = $('.mobile-menu');
    const navLinks = $('.nav-link');
    
    // Scroll effects
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            floatingNav.addClass('scrolled');
        } else {
            floatingNav.removeClass('scrolled');
        }
        
        // Scroll to top button
        if ($(window).scrollTop() > 500) {
            $('.scroll-top').addClass('visible');
        } else {
            $('.scroll-top').removeClass('visible');
        }
        
        // Active nav link
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    navToggle.on('click', function() {
        $(this).toggleClass('active');
        mobileMenu.toggleClass('active');
        $('body').css('overflow', mobileMenu.hasClass('active') ? 'hidden' : '');
    });
    
    // Close mobile menu on link click
    $('.mobile-link').on('click', function() {
        navToggle.removeClass('active');
        mobileMenu.removeClass('active');
        $('body').css('overflow', '');
    });
    
    // Smooth scroll
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'easeOutQuart');
        }
    });
    
    function updateActiveNavLink() {
        const scrollPos = $(window).scrollTop() + 200;
        
        $('section[id]').each(function() {
            const section = $(this);
            const sectionTop = section.offset().top;
            const sectionBottom = sectionTop + section.outerHeight();
            const sectionId = section.attr('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.removeClass('active');
                $(`.nav-link[href="#${sectionId}"]`).addClass('active');
            }
        });
    }
    
    // ===================================
    // Scroll to Top
    // ===================================
    $('.scroll-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'easeOutQuart');
    });
    
    // ===================================
    // Skill Progress Animation
    // ===================================
    function animateSkills() {
        $('.skill-card').each(function() {
            const card = $(this);
            const progress = card.find('.skill-progress');
            const percent = card.data('skill');
            const rect = card[0].getBoundingClientRect();
            
            if (rect.top < $(window).height() && !card.hasClass('animated')) {
                card.addClass('animated');
                setTimeout(function() {
                    progress.css('width', percent + '%');
                }, 200);
            }
        });
    }
    
    $(window).on('scroll', animateSkills);
    animateSkills(); // Initial check
    
    // ===================================
    // Stats Counter Animation
    // ===================================
    function animateStats() {
        $('.stat-number').each(function() {
            const stat = $(this);
            const target = parseInt(stat.data('count'));
            const rect = stat[0].getBoundingClientRect();
            
            if (rect.top < $(window).height() && !stat.hasClass('animated')) {
                stat.addClass('animated');
                $({ count: 0 }).animate({ count: target }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        stat.text(Math.round(this.count));
                    },
                    complete: function() {
                        stat.text(target);
                    }
                });
            }
        });
    }
    
    $(window).on('scroll', animateStats);
    animateStats(); // Initial check
    
    // ===================================
    // Timeline Animation
    // ===================================
    function animateTimeline() {
        $('.timeline-item').each(function() {
            const item = $(this);
            const rect = item[0].getBoundingClientRect();
            
            if (rect.top < $(window).height() * 0.8 && !item.hasClass('visible')) {
                item.addClass('visible');
            }
        });
    }
    
    $(window).on('scroll', animateTimeline);
    animateTimeline(); // Initial check
    
    // ===================================
    // Card Hover Effects
    // ===================================
    $('.skill-card, .hobby-card, .contact-card').on('mouseenter', function() {
        $(this).find('.skill-icon, .hobby-overlay i, .contact-icon i').addClass('fa-beat');
    }).on('mouseleave', function() {
        $(this).find('.skill-icon, .hobby-overlay i, .contact-icon i').removeClass('fa-beat');
    });
    
    // ===================================
    // Form Submission
    // ===================================
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const button = form.find('.btn-submit');
        const originalText = button.find('span').text();
        
        button.find('span').text('Sending...');
        button.prop('disabled', true);
        
        // Simulate form submission
        setTimeout(function() {
            button.find('span').text('Message Sent!');
            button.css('background', '#10b981');
            
            setTimeout(function() {
                button.find('span').text(originalText);
                button.css('background', '');
                button.prop('disabled', false);
                form[0].reset();
            }, 2000);
        }, 1500);
    });
    
    // ===================================
    // Parallax Effect on Hero
    // ===================================
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        const heroGradient = $('.hero-gradient');
        
        if (scrolled < $(window).height()) {
            heroGradient.css('transform', `translateY(${scrolled * 0.3}px)`);
        }
    });
    
    // ===================================
    // Intersection Observer for Sections
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    $('.section-header').each(function() {
        observer.observe(this);
    });
    
    // ===================================
    // Prevent animation replay on scroll up
    // ===================================
    let lastScrollTop = 0;
    $(window).on('scroll', function() {
        const st = $(this).scrollTop();
        
        if (st < lastScrollTop) {
            // Scrolling up - don't replay animations
        }
        lastScrollTop = st;
    });
    
    console.log('Portfolio loaded successfully!');
});
