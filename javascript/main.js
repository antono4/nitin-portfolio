$(document).ready(function() {
    
    // Custom Cursor
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
    
    $('a, button, .skill-card, .hobby-card, .contact-card').on('mouseenter', function() {
        cursor.addClass('hover');
    }).on('mouseleave', function() {
        cursor.removeClass('hover');
    });
    
    // Navigation
    const navToggle = $('.nav-toggle');
    const mobileMenu = $('.mobile-menu');
    const navLinks = $('.nav-link');
    
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('.scroll-top').addClass('visible');
        } else {
            $('.scroll-top').removeClass('visible');
        }
        updateActiveNavLink();
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
    
    // Mobile menu
    navToggle.on('click', function() {
        $(this).toggleClass('active');
        mobileMenu.toggleClass('active');
        $('body').css('overflow', mobileMenu.hasClass('active') ? 'hidden' : '');
    });
    
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
            }, 800);
        }
    });
    
    // Scroll to top
    $('.scroll-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
    
    // Skill Progress Animation
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
    animateSkills();
    
    // Stats Counter Animation
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
    animateStats();
    
    // Timeline Animation
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
    animateTimeline();
    
    // Form submission
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const button = form.find('.btn-submit');
        const originalText = button.find('span').text();
        
        button.find('span').text('Sending...');
        button.prop('disabled', true);
        
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
});
