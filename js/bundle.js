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

document.addEventListener('DOMContentLoaded', function() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  if (accordionItems) {

    accordionItems.forEach(item => {
      const trigger = item.querySelector('.accordion-item-header');
      const content = item.querySelector('.accordion-item-content');

      trigger.addEventListener('click', function() {
        const parent = this.parentNode;

        if (parent.classList.contains('active')) {
          parent.classList.remove('active');
          content.style.height = '0';
        } else {
          document.querySelectorAll('.accordion-item').forEach(child => {
            child.classList.remove('active');
            child.querySelector('.accordion-item-content').style.height = '0';
          });
          parent.classList.add('active');
          content.style.height = content.scrollHeight + 'px';
        }
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {

  const tabsBlocks = document.querySelectorAll('.tabs-block');

  tabsBlocks.forEach(block => {
    const tabButtons = block.querySelectorAll('.tab-button');
    const tabPanels = block.querySelectorAll('.tab-panel');
    const panelsContainer = block.querySelector('.tab-panels');

    if (panelsContainer) {
      panelsContainer.style.position = 'relative';
      panelsContainer.style.minHeight = '400px';
    }

    tabPanels.forEach(panel => {
      panel.style.position = 'absolute';
      panel.style.top = '0';
      panel.style.left = '0';
      panel.style.width = '100%';
      panel.style.opacity = '0';
      panel.style.visibility = 'hidden';
      panel.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
      panel.style.pointerEvents = 'none';
    });

    function updateContainerHeight(panel) {
      if (!panelsContainer) return;

      const originalDisplay = panel.style.display;
      const originalVisibility = panel.style.visibility;
      const originalOpacity = panel.style.opacity;
      const originalPosition = panel.style.position;

      panel.style.position = 'relative';
      panel.style.visibility = 'visible';
      panel.style.opacity = '1';
      panel.style.display = 'block';

      const height = panel.offsetHeight;

      panel.style.position = originalPosition;
      panel.style.visibility = originalVisibility;
      panel.style.opacity = originalOpacity;
      panel.style.display = originalDisplay;

      panelsContainer.style.height = height + 'px';
    }

    function switchTab(tabId) {
      tabButtons.forEach(btn => btn.classList.remove('active'));

      const activeBtn = block.querySelector(`.tab-button[data-tab-id="${tabId}"]`);
      if (activeBtn) activeBtn.classList.add('active');

      tabPanels.forEach(panel => {
        panel.style.visibility = 'hidden';
        panel.style.opacity = '0';
        panel.style.pointerEvents = 'none';
      });

      const activePanel = block.querySelector(`.tab-panel[data-tab-id="${tabId}"]`);
      if (activePanel) {
        updateContainerHeight(activePanel);

        activePanel.style.visibility = 'visible';
        activePanel.style.opacity = '1';
        activePanel.style.pointerEvents = 'auto';
      }
    }

    tabButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab-id');
        switchTab(tabId);
      });
    });

    if (tabButtons.length > 0) {
      const firstPanel = block.querySelector('.tab-panel[data-tab-id="1"]');
      if (firstPanel && panelsContainer) {
        setTimeout(() => {
          panelsContainer.style.height = firstPanel.offsetHeight + 'px';
        }, 100);
      }

      setTimeout(() => {
        switchTab('1');
      }, 150);
    }
  });

  window.addEventListener('resize', function() {
    tabsBlocks.forEach(block => {
      const tabPanels = block.querySelectorAll('.tab-panel');
      const panelsContainer = block.querySelector('.tab-panels');

      const activePanel = Array.from(tabPanels).find(panel =>
          panel.style.visibility === 'visible'
      );

      if (activePanel && panelsContainer) {
        const originalDisplay = activePanel.style.display;
        const originalVisibility = activePanel.style.visibility;
        const originalOpacity = activePanel.style.opacity;
        const originalPosition = activePanel.style.position;

        activePanel.style.position = 'relative';
        activePanel.style.visibility = 'visible';
        activePanel.style.opacity = '1';
        activePanel.style.display = 'block';

        panelsContainer.style.height = activePanel.offsetHeight + 'px';

        activePanel.style.position = originalPosition;
        activePanel.style.visibility = originalVisibility;
        activePanel.style.opacity = originalOpacity;
        activePanel.style.display = originalDisplay;
      }
    });
  });

});

class CustomVideoPlayer {
  constructor(container) {
    this.container = container;
    this.video = container.querySelector('video');
    this.playButton = container.querySelector('.btn-play');

    if (!this.video || !this.playButton) return;

    this.init();
  }

  init() {
    this.video.removeAttribute('controls');
    this.video.setAttribute('playsinline', '');
    this.video.setAttribute('webkit-playsinline', '');
    this.video.setAttribute('preload', 'metadata');
    this.video.muted = true;

    this.poster = this.video.getAttribute('poster');

    if (!this.poster) {
      this.showPlayButton();
    } else {
      this.video.addEventListener('loadeddata', () => {
        this.showPlayButton();
      });
    }

    this.bindEvents();
  }

  showPlayButton() {
    this.playButton.style.transition = 'opacity 0.3s ease';
    this.playButton.style.pointerEvents = 'auto';
  }

  bindEvents() {
    this.container.addEventListener('click', (e) => {
      e.stopPropagation();

      if (this.video.readyState === 0) {
        this.video.load();
        this.showPlayButton();
        return;
      }

      this.toggleVideo(e);
    });

    this.playButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleVideo(e);
    });

    this.video.addEventListener('play', () => this.onPlay());
    this.video.addEventListener('pause', () => this.onPause());
    this.video.addEventListener('ended', () => this.onEnded());

    this.video.addEventListener('error', () => {
      console.log('Ошибка загрузки видео');
      this.container.style.background = '#f0f0f0';
      this.playButton.style.display = 'flex';
    });
  }

  toggleVideo(e) {
    e.stopPropagation();

    if (this.video.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    if (this.video.paused) {
      this.video.muted = true;

      const playPromise = this.video.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Видео не может быть воспроизведено автоматически');
          this.video.setAttribute('controls', '');
          this.playButton.style.display = 'none';
        });
      }
    }
  }

  pause() {
    if (!this.video.paused) {
      this.video.pause();
    }
  }

  onPlay() {
    this.playButton.style.opacity = '0';
    this.playButton.style.pointerEvents = 'none';
  }

  onPause() {
    this.playButton.style.opacity = '1';
    this.playButton.style.pointerEvents = 'auto';
  }

  onEnded() {
    this.playButton.style.opacity = '1';
    this.playButton.style.pointerEvents = 'auto';
    this.video.currentTime = 0;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const videoCards = document.querySelectorAll('.media-wrapper');

  videoCards.forEach(container => {
    new CustomVideoPlayer(container);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('.category-gallery-section');

  if (!section) return;

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let momentum = 0;
  let animationId = null;

  section.style.cursor = 'grab';

  section.addEventListener('mousedown', (e) => {
    isDragging = true;
    section.style.cursor = 'grabbing';
    startX = e.pageX;
    startScrollLeft = section.scrollLeft;
    momentum = 0;

    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const dx = e.pageX - startX;
    section.scrollLeft = startScrollLeft - dx;
    momentum = e.movementX * 2;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;

    isDragging = false;
    section.style.cursor = 'grab';

    if (Math.abs(momentum) > 1) {
      let velocity = momentum;

      function inertia() {

        const maxScroll = section.scrollWidth - section.clientWidth;

        if (Math.abs(velocity) > 0.5) {
          section.scrollLeft -= velocity;
          velocity *= 0.95;

          if (section.scrollLeft <= 0 || section.scrollLeft >= maxScroll) {
            section.scrollLeft = Math.max(0, Math.min(section.scrollLeft, maxScroll));
            return;
          }

          animationId = requestAnimationFrame(inertia);
        }
      }

      animationId = requestAnimationFrame(inertia);
    }
  });

  section.addEventListener('selectstart', (e) => {
    if (isDragging) e.preventDefault();
  });

  window.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      section.style.cursor = 'grab';
    }
  });
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

var swiper4 = new Swiper(".category-variables-slider", {
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  simulateTouch: true,
  grabCursor: true,
  pagination: {
    el: ".category-variables-slider .swiper-progressbar",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".category-variables-section .swiper-button-next",
    prevEl: ".category-variables-section .swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.51,
      spaceBetween: 10,
      mousewheel: {
        enabled: false,
      },
    },
    601: {
      slidesPerView: 2.2,
      spaceBetween: 20,
      mousewheel: {
        enabled: false,
      },
    },
    1024: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
  }
});

var swiper5 = new Swiper(".control-slider", {
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  simulateTouch: true,
  grabCursor: true,
  direction: "vertical",
  mousewheel: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    601: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  }
});
