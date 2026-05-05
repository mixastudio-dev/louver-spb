const header = document.querySelector('header');

if (header) {
  const toggleScrolledClass = () => {
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggleScrolledClass);
  toggleScrolledClass();
}

document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const currentPath = window.location.pathname;
      const linkPath = this.pathname;

      if (linkPath !== '' && linkPath !== currentPath) {
        const url = linkPath + targetId;
        window.location.href = url;
      } else {
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        const windowHeight = window.innerHeight;
        const elementHeight = targetElement.offsetHeight;

        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (windowHeight / 2) + (elementHeight / 2);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        history.pushState(null, null, targetId);
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  var modalButtons = document.querySelectorAll('.open-modal-dialog'),
      overlay = document.querySelector('body'),
      closeButtons = document.querySelectorAll('.modal-dialog .modal-close');

  var currentOpenModal = null;

  async function openModal(modalBtn) {
    return new Promise(resolve => {
      var modalId = modalBtn.getAttribute('data-src'),
          modalElem = document.querySelector('.modal-dialog.' + modalId);

      if (currentOpenModal && currentOpenModal !== modalElem) {
        closeModalDirectly(currentOpenModal);
      }

      overlay.classList.add('modal-open');
      modalElem.style.display = 'flex';

      setTimeout(function() {
        modalElem.classList.add('modal-opening');
        currentOpenModal = modalElem;
        resolve();
      }, 0);
    });
  }

  async function closeModal(closeBtn) {
    return new Promise(resolve => {
      var modal = closeBtn.closest('.modal-dialog');
      modal.classList.remove('modal-opening');
      modal.classList.add('modal-closing');

      setTimeout(function() {
        modal.classList.remove('modal-closing');
        modal.style.display = 'none';
        overlay.classList.remove('modal-open');
        if (currentOpenModal === modal) {
          currentOpenModal = null;
        }
        resolve();
      }, 500);
    });
  }

  function closeModalDirectly(modalElem) {
    modalElem.classList.remove('modal-opening');
    modalElem.style.display = 'none';

    if (currentOpenModal === modalElem) {
      currentOpenModal = null;
    }

    var anyModalOpen = document.querySelector('.modal-dialog[style*="display: flex"]');
    if (!anyModalOpen) {
      overlay.classList.remove('modal-open');
    }
  }

  /* open modal */
  modalButtons.forEach(function(modalBtn) {
    modalBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      await openModal(modalBtn);
    });
  });

  /* close modal */
  closeButtons.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', async function(e) {
      await closeModal(closeBtn);
    });
  });

  document.querySelectorAll('.modal-dialog').forEach(function(modal) {
    modal.addEventListener('click', async function(e) {
      const modalBody = modal.querySelector('.modal-body');
      if (modalBody && !modalBody.contains(e.target)) {
        await closeModal(modal);
      }
    });
  });

});

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const closeMenuButton = document.querySelector('.close-menu-button');
  const headerNav = document.querySelector('.header-nav');

  function isMobileView() {
    return window.innerWidth <= 1024;
  }

  function openMenu() {
    if (isMobileView()) {
      headerNav.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    headerNav.classList.remove('show');
    document.body.style.overflow = '';
  }

  mobileMenuButton.addEventListener('click', openMenu);
  closeMenuButton.addEventListener('click', closeMenu);

  const menuLinks = document.querySelectorAll('.main-menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (isMobileView()) {
        closeMenu();
      }
    });
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });

});

function checkVisibility() {
  const blocks = document.querySelectorAll('.animate-block');

  blocks.forEach(block => {
    if (block.hasAttribute('data-animated')) {
      return;
    }

    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const isInFooter = block.closest('footer');
    const offset = (isInFooter || window.innerWidth < 768) ? 0 : 0;

    const isVisible = rect.top <= windowHeight - offset && rect.bottom >= 0;

    if (isVisible) {
      const delay = block.getAttribute('data-delay') || 0;
      setTimeout(() => {
        block.classList.add('animated');
        block.setAttribute('data-animated', 'true');
      }, parseInt(delay));
    }
  });
}

function checkAllBlocks() {
  const blocks = document.querySelectorAll('.animate-block');

  blocks.forEach(block => {
    if (block.hasAttribute('data-animated')) {
      return;
    }

    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const isInFooter = block.closest('footer');
    const offset = (isInFooter || window.innerWidth < 768) ? 0 : 0;

    if (rect.top <= windowHeight - offset && rect.bottom >= 0) {
      const delay = block.getAttribute('data-delay') || 0;
      setTimeout(() => {
        block.classList.add('animated');
        block.setAttribute('data-animated', 'true');
      }, parseInt(delay));
    }
  });
}

window.addEventListener('load', function() {
  checkVisibility();
  setTimeout(checkAllBlocks, 500);
});

window.addEventListener('scroll', checkVisibility);

window.addEventListener('resize', function() {
  setTimeout(checkAllBlocks, 100);
});



var swiper1 = new Swiper(".directions-slider", {
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  simulateTouch: true,
  grabCursor: true,
  mousewheel: {
    enabled: true,
    sensitivity: 1,
    releaseOnEdges: true,
    thresholdDelta: 50,
    forceToAxis: false,
  },
  pagination: {
    el: ".directions-slider .swiper-progressbar",
    type: "progressbar",
  },
  on: {
    init: function (swiper) {
      updateCounter(swiper);
    },
    slideChange: function (swiper) {
      updateCounter(swiper);
    },
    progress: function (swiper) {
      updateCounter(swiper);
    }
  },
  breakpoints: {
    0: {
      slidesPerView: 1.65,
      spaceBetween: 10,
      mousewheel: {
        enabled: false,
      },
    },
    601: {
      slidesPerView: 2.4,
      spaceBetween: 20,
      mousewheel: {
        enabled: false,
      },
    },
    1024: {
      slidesPerView: 2.8,
      spaceBetween: 20,
    },
  }
});

function updateCounter(swiper) {
  const totalSlides = swiper.slides.length;
  const slidesPerView = swiper.params.slidesPerView;

  let lastVisibleSlide = Math.ceil(swiper.progress * (totalSlides - slidesPerView) + slidesPerView);

  if (lastVisibleSlide > totalSlides) lastVisibleSlide = totalSlides;
  if (lastVisibleSlide < 1) lastVisibleSlide = 1;

  if (swiper.progress >= 0.99) {
    lastVisibleSlide = totalSlides;
  }

  document.querySelector(".directions-slider .swiper-counter").innerHTML =
      lastVisibleSlide.toString().padStart(2, '0') + "/" +
      totalSlides.toString().padStart(2, '0');
}

var swiper2 = new Swiper(".projects-slider", {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".projects-slider .swiper-button-next",
    prevEl: ".projects-slider .swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    }
  }
});

var swiper3 = new Swiper(".process-slider", {
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  simulateTouch: true,
  grabCursor: true,
  mousewheel: {
    enabled: true,
    sensitivity: 1,
    releaseOnEdges: true,
    thresholdDelta: 50,
    forceToAxis: false,
  },
  pagination: {
    el: ".process-slider .swiper-progressbar",
    type: "progressbar",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.4,
      spaceBetween: 10,
      mousewheel: {
        enabled: false,
      },
    },
    601: {
      slidesPerView: 1.5,
      spaceBetween: 20,
      mousewheel: {
        enabled: false,
      },
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 2.2,
      spaceBetween: 20,
    },
    1420: {
      slidesPerView: 2.8,
      spaceBetween: 20,
    }
  }
});