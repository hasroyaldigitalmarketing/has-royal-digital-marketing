/* ============================================
   HAS Royal Digital Marketing - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile Nav Toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* --- Header Scroll Effect --- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* --- Scroll Fade-in Animation --- */
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Animated Counter --- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) {
      counterObserver.observe(c);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-counter'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.innerHTML = current.toLocaleString() + '<span class="suffix">' + suffix + '</span>';
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.innerHTML = target.toLocaleString() + '<span class="suffix">' + suffix + '</span>';
      }
    }
    requestAnimationFrame(step);
  }

  /* --- Lead Form Submission --- */
  var leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formCard = leadForm;
      var successMsg = document.getElementById('formSuccess');

      if (formCard) formCard.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('show');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      setTimeout(function () {
        leadForm.reset();
      }, 500);
    });
  }

  /* --- Contact Form Submission --- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var successMsg = document.getElementById('contactSuccess');
      contactForm.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setTimeout(function () {
        contactForm.reset();
      }, 500);
    });
  }

  /* --- Multi-Step Booking Form --- */
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    var currentStep = 1;
    var totalSteps = 3;
    var steps = bookingForm.querySelectorAll('.booking-step');
    var dots = document.querySelectorAll('.booking-step-dot');
    var progressBar = document.getElementById('bookingProgress');

    function showStep(step) {
      steps.forEach(function (s) {
        s.classList.remove('active');
      });
      var target = bookingForm.querySelector('.booking-step[data-step="' + step + '"]');
      if (target) target.classList.add('active');

      dots.forEach(function (d) {
        d.classList.remove('active', 'completed');
        var dotStep = parseInt(d.getAttribute('data-step'), 10);
        if (dotStep === step) d.classList.add('active');
        else if (dotStep < step) d.classList.add('completed');
      });

      if (progressBar) {
        progressBar.style.width = (step / totalSteps * 100) + '%';
      }
      currentStep = step;
    }

    function validateStep(step) {
      var stepEl = bookingForm.querySelector('.booking-step[data-step="' + step + '"]');
      if (!stepEl) return true;
      var inputs = stepEl.querySelectorAll('input[required], select[required], textarea[required]');
      var valid = true;
      inputs.forEach(function (input) {
        if (!input.value || input.value.trim() === '') {
          input.style.borderColor = 'var(--error-500, #ef4444)';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      return valid;
    }

    bookingForm.querySelectorAll('.booking-next').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (validateStep(currentStep) && currentStep < totalSteps) {
          showStep(currentStep + 1);
        }
      });
    });

    bookingForm.querySelectorAll('.booking-prev').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentStep > 1) showStep(currentStep - 1);
      });
    });

    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateStep(currentStep)) return;
      bookingForm.style.display = 'none';
      var dotsContainer = document.querySelector('.booking-steps-indicator');
      var progressContainer = document.querySelector('.booking-progress');
      if (dotsContainer) dotsContainer.style.display = 'none';
      if (progressContainer) progressContainer.style.display = 'none';
      var success = document.getElementById('bookingSuccess');
      if (success) {
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setTimeout(function () { bookingForm.reset(); }, 500);
    });

    showStep(1);
  }

  /* --- Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Set Active Nav Link Based on Current Page --- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

});
