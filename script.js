// ==================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ====================
const DOM = {
  body: document.body,
  header: document.querySelector('.header'),
  mobileContactBtn: document.getElementById('mobile-contact'),
  contactToggle: document.querySelector('.contact-toggle'),
  workModal: document.getElementById('work-modal'),
  workModalOverlay: document.getElementById('work-modal-overlay'),
  workModalClose: document.getElementById('work-modal-close'),
  workModalMainImg: document.getElementById('work-modal-main-img'),
  workModalZoom: document.getElementById('work-modal-zoom'),
  workCards: document.querySelectorAll('.work-card'),
  workViewBtns: document.querySelectorAll('.work-card__view-btn'),
  sections: document.querySelectorAll('section[id]'),
  cards: document.querySelectorAll('.card'),
  teamMembers: document.querySelectorAll('.team-member'),
  heroHalves: document.querySelectorAll('.hero__half'),
  teamModal: document.getElementById('team-modal'),
  teamModalOverlay: document.getElementById('team-modal-overlay'),
  teamModalClose: document.getElementById('team-modal-close'),
  teamModalImg: document.getElementById('team-modal-img'),
  heroDesktopServicesBtn: document.querySelector('.hero__desktop-services-btn'),
  heroMainBtn: document.querySelector('.hero__main-btn'),
  mobileMenu: document.getElementById('mobile-nav'),
  burgerBtn: document.getElementById('burger-btn'),
  burgerClose: document.getElementById('burger-close'),
  burgerWrapper: document.getElementById('burger-wrapper'),
  menuOverlay: document.querySelector('.menu-overlay'),
  mobileMenuLinks: document.querySelectorAll('.mobile-menu__link'),
  telegramDropdown: document.querySelector('.telegram-dropdown'),
  telegramMenu: document.querySelector('.telegram-dropdown__menu'),
  onsiteFeatures: document.querySelectorAll('.onsite-feature'),
  worksCarouselTrack: document.querySelector('.works-carousel__track'),
  worksCarouselSlides: document.querySelectorAll('.works-carousel__slide'),
  worksCarouselPrev: document.querySelector('.works-carousel__prev'),
  worksCarouselNext: document.querySelector('.works-carousel__next'),
  worksCarouselDots: document.querySelectorAll('.works-carousel__dot'),
  workModalThumbnails: document.getElementById('work-modal-thumbnails'),
  dropdowns: document.querySelectorAll('.dropdown'),
  servicesDropdown: document.querySelector('.header-nav .dropdown'),
  mobileDropdowns: document.querySelectorAll('.mobile-dropdown'),
  mobileDropdownIcons: document.querySelectorAll('.mobile-dropdown-icon'),
  mobileDropdownLink: document.querySelector('.mobile-menu__link--dropdown'),
  workCardButtons: document.querySelectorAll('.work-card__view-btn')
};

// Переменные состояния
let resizeTimeout = null;
let lastScrollTop = 0;
let isAnimating = false;
const animationDuration = 300;
let isTouchDevice = false;

// Переменные для карусели работ
let currentSlideIndex = 0;
let totalSlides = 4;
let slidesPerView = 3;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = null;
let slideWidth = 0;

// Данные для модального окна работ
const worksData = {
  1: {
    vessel: 'Nord Star Patrol 36+',
    type: 'Установка видеонаблюдения',
    duration: '5 дней',
    description: 'Работы выполнялись по задаче повышения контроля и безопасности при управлении судном. Клиенту требовалось получить единое, наглядное и удобное решение для визуального контроля всех ключевых зон лодки, без разрозненных экранов и лишних приборов.',
    works: [
      'Установлены четыре камеры видеонаблюдения с охватом основных зон судна',
      'Выполнена коммутация всех камер в единую систему',
      'Настроен вывод изображения на одно головное устройство',
      'Установлено и настроено головное устройство Raymarine Axiom XL 24',
      'Проведена настройка отображения и переключения видеопотоков',
      'Проверена стабильность работы системы в различных режимах'
    ],
    result: 'Лодка получила современную систему видеоконтроля, полностью интегрированную в навигационный комплекс. Все камеры выводятся на один большой дисплей Raymarine Axiom XL 24, без задержек и с корректной картинкой. Управление стало удобнее и безопаснее, особенно при манёврах, швартовке и работе в ограниченных пространствах. Владелец получил централизованное решение без лишних экранов и разрозненных систем, соответствующее уровню и классу судна.',
    images: [
      'assets/фото_наших_работ.jpg',
      'assets/фото_наших_работ1.jpg',
      'assets/фото_наших_работ3.jpg'
    ]
  },
  2: {
    vessel: 'Yamaha FZR 1800',
    type: 'Капремонт двигателя',
    duration: '3 дня',
    description: 'Гидроцикл поступил после длительного простоя без эксплуатации. За время хранения на деталях двигателя образовалась коррозия. Из за ржавчины произошло снижение компрессии, что напрямую повлияло на запуск и стабильную работу мотора.',
    works: [
      'Разборка двигателя',
      'Диагностика состояния цилиндропоршневой группы',
      'Устранение последствий коррозии на деталях двигателя',
      'Восстановление компрессии',
      'Сборка двигателя с соблюдением заводских допусков',
      'Проверка работы двигателя после ремонта'
    ],
    result: 'Компрессия восстановлена до рабочих значений. Двигатель запускается стабильно и работает ровно во всех режимах. Последствия простоя устранены, мотор готов к дальнейшей эксплуатации без ограничений.',
    images: [
      'assets/фото_наших_работ1.jpg',
      'assets/фото_наших_работ3.jpg',
      'assets/фото_наших_работ4.jpg'
    ]
  },
  3: {
    vessel: 'BRP RXT 300',
    type: 'Ремонт двигателя и электроники',
    duration: '4 дня',
    description: 'Гидроцикл поступил с серьёзной механической неисправностью. В процессе диагностики выявлено разрушение поршня. Причина поломки оказалась не в износе, а в неверной настройке блока управления. В погоне за увеличением мощности были нарушены рабочие режимы двигателя, что привело к перегрузке и механическому повреждению.',
    works: [
      'Полная разборка двигателя',
      'Дефектовка цилиндропоршневой группы',
      'Замена повреждённого поршня',
      'Сборка двигателя с соблюдением заводских допусков',
      'Проверка всех сопряжённых узлов',
      'Откат прошивки блока управления в штатную заводскую конфигурацию',
      'Контрольный запуск и проверка работы двигателя'
    ],
    result: 'Двигатель восстановлен и работает в штатных режимах. Компрессия приведена к нормальным значениям. Риск повторного разрушения устранён за счёт возврата корректных настроек блока управления.',
    images: [
      'assets/фото_наших_работ3.jpg',
      'assets/фото_наших_работ4.jpg',
      'assets/фото_наших_работ.jpg'
    ]
  },
  4: {
    vessel: 'Victory A7',
    type: 'Полная сборка и настройка',
    duration: '7 дней',
    description: 'Техника: абсолютно новая Victory A7, полученная «в металле» без навесного оборудования и электроники. Задача была собрать лодку под использование в реальных условиях: установить силовую часть, навигацию, приборы и обновить рулевое управление под будущие нагрузки.',
    works: [
      'Установка двигателя Mercury 250 Pro XS',
      'Установка эхолота Lowrance 12"',
      'Установка мультиприбора Mercury',
      'Установка системы идентификации судов (AIS)',
      'Замена и настройка рулевого управления',
      'Диагностика всех систем после сборки',
      'Настройка приборы под реальные условия эксплуатации'
    ],
    result: 'Victory A7 собрана полностью под эксплуатацию: двигатель, навигация, приборы и рулевое работают как единая система. Управление мягкое и точное, все данные корректно отображаются на приборах и Lowrance. Лодка готова к использованию без доработок и дополнительных выездов.',
    images: [
      'assets/фото_наших_работ4.jpg',
      'assets/фото_наших_работ.jpg',
      'assets/фото_наших_работ1.jpg'
    ]
  }
};

// ==================== УТИЛИТЫ ====================
const Utils = {
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  },

  smoothScrollTo(element, offset = 20) {
    const headerHeight = DOM.header?.offsetHeight || 80;
    const elementPosition = element.offsetTop - headerHeight - offset;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  },

  closeAllMenus() {
    // Закрываем мобильное меню
    if (DOM.mobileMenu && DOM.mobileMenu.classList.contains('active')) {
      DOM.mobileMenu.classList.remove('active');
      DOM.menuOverlay.classList.remove('active');
      DOM.body.classList.remove('menu-open');
      DOM.body.style.overflow = '';
      
      // Переключаем иконки бургер-меню
      DOM.burgerBtn.classList.remove('active');
      DOM.burgerClose.classList.remove('active');
    }

    // Закрываем меню контактов
    if (DOM.mobileContactBtn && DOM.mobileContactBtn.classList.contains('active')) {
      DOM.mobileContactBtn.classList.remove('active');
    }

    // Закрываем выпадающие меню
    DOM.dropdowns.forEach(dropdown => {
      const menu = dropdown.querySelector('.dropdown-menu');
      if (menu) {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateY(-10px)';
      }
    });

    // Закрываем мобильные выпадающие меню
    DOM.mobileDropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  },

  checkMobile() {
    return window.innerWidth <= 767;
  },

  checkDesktop() {
    return window.innerWidth >= 1024;
  },

  checkTablet() {
    return window.innerWidth >= 768 && window.innerWidth <= 1023;
  },

  detectTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  }
};

// ==================== КАРТОЧКИ УСЛУГ ====================
function initCards() {
  DOM.cards.forEach(card => {
    card.removeEventListener('click', handleCardClick);
    card.addEventListener('click', handleCardClick);
  });
}

function handleCardClick(e) {
  return true;
}

// ==================== КАРТОЧКИ РАБОТ С КНОПКОЙ НА ФОТО ====================
const WorkCards = {
  init() {
    // Обработчики для кнопок "Смотреть"
    DOM.workViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const workCard = btn.closest('.works-carousel__slide');
        if (workCard) {
          const projectId = workCard.getAttribute('data-project');
          WorkModal.open(projectId);
        }
      });
    });

    // Обработчики для кликов по карточкам
    DOM.worksCarouselSlides.forEach(slide => {
      slide.addEventListener('click', (e) => {
        if (!e.target.closest('.work-card__view-btn')) {
          const projectId = slide.getAttribute('data-project');
          if (projectId) {
            WorkModal.open(projectId);
          }
        }
      });
    });
  }
};

// ==================== БУРГЕР МЕНЮ ====================
const BurgerMenu = {
  init() {
    if (DOM.burgerWrapper && DOM.burgerBtn && DOM.burgerClose) {
      DOM.burgerWrapper.addEventListener('click', BurgerMenu.toggle);
    }

    // Закрытие при клике на оверлей
    if (DOM.menuOverlay) {
      DOM.menuOverlay.addEventListener('click', BurgerMenu.close);
    }

    // Закрытие при клике на ссылки (кроме выпадающего меню Услуги)
    if (DOM.mobileMenuLinks) {
      DOM.mobileMenuLinks.forEach(link => {
        if (!link.classList.contains('mobile-menu__link--dropdown')) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
              const target = document.querySelector(href);
              if (target) {
                BurgerMenu.close();
                setTimeout(() => {
                  Utils.smoothScrollTo(target);
                }, 300);
              }
            } else if (href) {
              BurgerMenu.close();
              setTimeout(() => {
                window.location.href = href;
              }, 300);
            } else {
              BurgerMenu.close();
            }
          });
        }
      });
    }

    // Закрытие при нажатии ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        BurgerMenu.close();
      }
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
      if (DOM.mobileMenu && DOM.mobileMenu.classList.contains('active') &&
          !DOM.burgerWrapper.contains(e.target) &&
          !DOM.mobileMenu.contains(e.target)) {
        BurgerMenu.close();
      }
    });

    // Инициализация мобильного выпадающего меню услуг
    BurgerMenu.initMobileDropdowns();
  },

  initMobileDropdowns() {
    DOM.mobileDropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('.mobile-menu__link--dropdown');
      if (link) {
        // Создаем крестик для закрытия
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-dropdown-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.setAttribute('aria-label', 'Закрыть меню');
        
        // Добавляем крестик в ссылку
        link.appendChild(closeBtn);
        
        // Обработчик для ссылки
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          // Проверяем, не кликнули ли по крестику
          if (e.target.closest('.mobile-dropdown-close')) {
            dropdown.classList.remove('active');
            return;
          }
          
          dropdown.classList.toggle('active');
        });

        // Обработчик для крестика
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropdown.classList.remove('active');
        });
      }

      // Добавляем обработчики для ссылок внутри выпадающего меню
      const dropdownItems = dropdown.querySelectorAll('.mobile-dropdown-item');
      dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const href = item.getAttribute('href');
          BurgerMenu.close();
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        });
      });
    });
  },

  toggle(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    const isActive = DOM.mobileMenu.classList.contains('active');
    
    if (isActive) {
      BurgerMenu.close();
    } else {
      BurgerMenu.open();
    }

    // Закрываем меню контактов, если оно открыто
    if (DOM.mobileContactBtn && DOM.mobileContactBtn.classList.contains('active')) {
      DOM.mobileContactBtn.classList.remove('active');
    }
  },

  open() {
    DOM.mobileMenu.classList.add('active');
    DOM.menuOverlay.classList.add('active');
    DOM.body.classList.add('menu-open');
    DOM.body.style.overflow = 'hidden';
    
    // Переключаем иконки
    DOM.burgerBtn.classList.add('active');
    DOM.burgerClose.classList.add('active');
  },

  close() {
    DOM.mobileMenu.classList.remove('active');
    DOM.menuOverlay.classList.remove('active');
    DOM.body.classList.remove('menu-open');
    DOM.body.style.overflow = '';
    
    // Переключаем иконки
    DOM.burgerBtn.classList.remove('active');
    DOM.burgerClose.classList.remove('active');
    
    // Закрываем все мобильные выпадающие меню
    DOM.mobileDropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }
};

// ==================== МЕНЮ КОНТАКТОВ ДЛЯ МОБИЛЬНЫХ ====================
const ContactMenu = {
  init() {
    if (DOM.contactToggle) {
      DOM.contactToggle.addEventListener('click', ContactMenu.toggle);
    }

    // Закрытие при клике на ссылки
    const contactLinks = DOM.mobileContactBtn?.querySelectorAll('.mobile-contact-link');
    contactLinks?.forEach(link => {
      link.addEventListener('click', () => {
        DOM.mobileContactBtn.classList.remove('active');
      });
    });

    // Закрытие при клике вне
    document.addEventListener('click', (e) => {
      if (DOM.mobileContactBtn && 
          !DOM.mobileContactBtn.contains(e.target) && 
          DOM.mobileContactBtn.classList.contains('active')) {
        DOM.mobileContactBtn.classList.remove('active');
      }
    });
  },

  toggle(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    // Закрываем меню навигации, если оно открыто
    if (DOM.mobileMenu && DOM.mobileMenu.classList.contains('active')) {
      BurgerMenu.close();
    }

    if (DOM.mobileContactBtn) {
      DOM.mobileContactBtn.classList.toggle('active');
    }
  }
};

// ==================== КАРУСЕЛЬ РАБОТ ====================
const WorksCarousel = {
  init() {
    if (!DOM.worksCarouselTrack || !DOM.worksCarouselSlides.length) return;

    // Устанавливаем начальные значения
    totalSlides = DOM.worksCarouselSlides.length;
    WorksCarousel.updateSlidesPerView();
    WorksCarousel.updateSlideWidth();
    
    // Клонируем слайды для бесконечной карусели
    WorksCarousel.cloneSlides();
    
    // Устанавливаем начальную позицию
    WorksCarousel.setPositionByIndex(currentSlideIndex);
    
    // Инициализация навигации
    WorksCarousel.initNavigation();
    
    // Инициализация свайпа
    WorksCarousel.initSwipe();
    
    // Обновляем карусель при ресайзе
    window.addEventListener('resize', WorksCarousel.handleResize);
  },

  updateSlidesPerView() {
    if (Utils.checkMobile()) {
      slidesPerView = 1;
    } else if (Utils.checkTablet()) {
      slidesPerView = 2;
    } else {
      slidesPerView = 3;
    }
  },

  updateSlideWidth() {
    const container = document.querySelector('.works-carousel__container');
    if (container) {
      slideWidth = container.clientWidth / slidesPerView;
    }
  },

  cloneSlides() {
    const slides = DOM.worksCarouselSlides;
    
    // Клонируем последние слайды и добавляем в начало
    for (let i = 0; i < slidesPerView; i++) {
      const clone = slides[slides.length - 1 - i].cloneNode(true);
      clone.classList.add('clone');
      DOM.worksCarouselTrack.insertBefore(clone, slides[0]);
    }
    
    // Клонируем первые слайды и добавляем в конец
    for (let i = 0; i < slidesPerView; i++) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add('clone');
      DOM.worksCarouselTrack.appendChild(clone);
    }
    
    // Обновляем ссылки на слайды
    WorksCarousel.updateSlideReferences();
  },

  updateSlideReferences() {
    DOM.worksCarouselSlides = document.querySelectorAll('.works-carousel__slide');
  },

  initNavigation() {
    // Кнопки вперед/назад
    if (DOM.worksCarouselPrev) {
      DOM.worksCarouselPrev.addEventListener('click', WorksCarousel.prevSlide);
    }
    
    if (DOM.worksCarouselNext) {
      DOM.worksCarouselNext.addEventListener('click', WorksCarousel.nextSlide);
    }
    
    // Точки навигации
    if (DOM.worksCarouselDots) {
      DOM.worksCarouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          WorksCarousel.goToSlide(index);
        });
      });
    }
  },

  initSwipe() {
    if (!Utils.checkMobile() || !DOM.worksCarouselTrack) return;
    
    DOM.worksCarouselTrack.addEventListener('touchstart', WorksCarousel.touchStart);
    DOM.worksCarouselTrack.addEventListener('touchmove', WorksCarousel.touchMove);
    DOM.worksCarouselTrack.addEventListener('touchend', WorksCarousel.touchEnd);
    
    DOM.worksCarouselTrack.addEventListener('mousedown', WorksCarousel.touchStart);
    DOM.worksCarouselTrack.addEventListener('mousemove', WorksCarousel.touchMove);
    DOM.worksCarouselTrack.addEventListener('mouseup', WorksCarousel.touchEnd);
    DOM.worksCarouselTrack.addEventListener('mouseleave', WorksCarousel.touchEnd);
  },

  touchStart(e) {
    if (!Utils.checkMobile()) return;
    
    isDragging = true;
    startPos = WorksCarousel.getPositionX(e);
    prevTranslate = currentTranslate;
    
    DOM.worksCarouselTrack.style.cursor = 'grabbing';
    DOM.worksCarouselTrack.style.transition = 'none';
    
    cancelAnimationFrame(animationID);
  },

  touchMove(e) {
    if (!isDragging) return;
    
    const currentPosition = WorksCarousel.getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
    
    DOM.worksCarouselTrack.style.transform = `translateX(${currentTranslate}px)`;
  },

  touchEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    DOM.worksCarouselTrack.style.cursor = 'grab';
    
    const movedBy = currentTranslate - prevTranslate;
    
    // Если свайп был достаточно сильным
    if (Math.abs(movedBy) > slideWidth * 0.2) {
      if (movedBy > 0) {
        WorksCarousel.prevSlide();
      } else {
        WorksCarousel.nextSlide();
      }
    } else {
      // Возвращаем на место
      WorksCarousel.setPositionByIndex(currentSlideIndex);
    }
  },

  getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  },

  prevSlide() {
    if (currentSlideIndex <= 0) {
      currentSlideIndex = totalSlides - 1;
    } else {
      currentSlideIndex--;
    }
    WorksCarousel.updateCarousel();
  },

  nextSlide() {
    if (currentSlideIndex >= totalSlides - 1) {
      currentSlideIndex = 0;
    } else {
      currentSlideIndex++;
    }
    WorksCarousel.updateCarousel();
  },

  goToSlide(index) {
    currentSlideIndex = index;
    WorksCarousel.updateCarousel();
  },

  updateCarousel() {
    WorksCarousel.setPositionByIndex(currentSlideIndex);
    WorksCarousel.updateDots();
  },

  setPositionByIndex(index) {
    currentTranslate = -index * slideWidth;
    DOM.worksCarouselTrack.style.transform = `translateX(${currentTranslate}px)`;
    DOM.worksCarouselTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  },

  updateDots() {
    if (!DOM.worksCarouselDots) return;
    
    DOM.worksCarouselDots.forEach((dot, index) => {
      if (index === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  },

  handleResize() {
    WorksCarousel.updateSlidesPerView();
    WorksCarousel.updateSlideWidth();
    WorksCarousel.setPositionByIndex(currentSlideIndex);
  }
};

// ==================== МОДАЛЬНОЕ ОКНО ДЛЯ РАБОТ ====================
const WorkModal = {
  init() {
    // Закрытие модального окна
    if (DOM.workModalOverlay) {
      DOM.workModalOverlay.addEventListener('click', WorkModal.close);
    }
    
    if (DOM.workModalClose) {
      DOM.workModalClose.addEventListener('click', WorkModal.close);
    }

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && DOM.workModal.classList.contains('active')) {
        WorkModal.close();
      }
    });

    // Инициализация кнопки увеличения
    if (DOM.workModalZoom) {
      DOM.workModalZoom.addEventListener('click', WorkModal.zoomImage);
    }

    // Инициализация свайпа для галереи на мобильных
    WorkModal.initSwipe();
  },

  initSwipe() {
    if (!Utils.checkMobile()) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const mainImage = document.querySelector('.work-modal-main-image');
    if (!mainImage) return;
    
    mainImage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    });
    
    mainImage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      WorkModal.handleSwipe(touchStartX, touchEndX);
    });
  },

  handleSwipe(startX, endX) {
    const swipeThreshold = 30;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Свайп влево - следующее фото
        WorkModal.nextImage();
      } else {
        // Свайп вправо - предыдущее фото
        WorkModal.prevImage();
      }
    }
  },

  open(projectId) {
    const project = worksData[projectId];
    if (!project) {
      console.error('Проект не найден:', projectId);
      return;
    }

    // Закрываем все меню
    Utils.closeAllMenus();

    // Заполняем данные
    document.getElementById('work-modal-vessel').textContent = project.vessel;
    document.getElementById('work-modal-type').textContent = project.type;
    document.getElementById('work-modal-duration').textContent = project.duration;
    document.getElementById('work-modal-desc').textContent = project.description;

    // Обновляем список работ
    const worksList = document.getElementById('work-modal-list');
    if (worksList) {
      worksList.innerHTML = '';
      project.works.forEach(work => {
        const li = document.createElement('li');
        li.textContent = work;
        worksList.appendChild(li);
      });
    }

    // Обновляем результат
    const resultElement = document.getElementById('work-modal-result');
    if (resultElement) {
      resultElement.textContent = project.result;
    }

    // Обновляем галерею
    WorkModal.updateGallery(project.images, projectId);

    // Показываем модальное окно
    DOM.workModal.classList.add('active');
    DOM.body.style.overflow = 'hidden';
    DOM.body.classList.add('modal-open');
  },

  close() {
    DOM.workModal.classList.remove('active');
    DOM.body.style.overflow = '';
    DOM.body.classList.remove('modal-open');
  },

  updateGallery(images, projectId) {
    // Очищаем миниатюры
    if (DOM.workModalThumbnails) {
      DOM.workModalThumbnails.innerHTML = '';
    }
    
    // Устанавливаем первое изображение как основное
    if (DOM.workModalMainImg && images.length > 0) {
      DOM.workModalMainImg.src = images[0];
      DOM.workModalMainImg.alt = `Фото проекта ${projectId}`;
      DOM.workModalMainImg.dataset.index = 0;
    }
    
    // Добавляем миниатюры
    images.forEach((imgSrc, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'work-modal-thumbnail';
      if (index === 0) {
        thumbnail.classList.add('active');
      }
      thumbnail.dataset.index = index;
      
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = `Миниатюра ${index + 1}`;
      img.loading = 'lazy';
      
      thumbnail.appendChild(img);
      thumbnail.addEventListener('click', () => {
        WorkModal.setActiveImage(index, images);
      });
      
      if (DOM.workModalThumbnails) {
        DOM.workModalThumbnails.appendChild(thumbnail);
      }
    });
    
    // Сохраняем данные для навигации
    WorkModal.currentImages = images;
    WorkModal.currentImageIndex = 0;
  },

  setActiveImage(index, images) {
    if (!DOM.workModalMainImg || !images) return;
    
    DOM.workModalMainImg.src = images[index];
    DOM.workModalMainImg.dataset.index = index;
    WorkModal.currentImageIndex = index;
    
    // Обновляем активную миниатюру
    const thumbnails = document.querySelectorAll('.work-modal-thumbnail');
    thumbnails.forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  },

  prevImage() {
    if (!WorkModal.currentImages || WorkModal.currentImages.length <= 1) return;
    
    let newIndex = WorkModal.currentImageIndex - 1;
    if (newIndex < 0) {
      newIndex = WorkModal.currentImages.length - 1;
    }
    
    WorkModal.setActiveImage(newIndex, WorkModal.currentImages);
  },

  nextImage() {
    if (!WorkModal.currentImages || WorkModal.currentImages.length <= 1) return;
    
    let newIndex = WorkModal.currentImageIndex + 1;
    if (newIndex >= WorkModal.currentImages.length) {
      newIndex = 0;
    }
    
    WorkModal.setActiveImage(newIndex, WorkModal.currentImages);
  },

  zoomImage() {
    if (!DOM.workModalMainImg || !DOM.workModalMainImg.src) return;
    
    const imgSrc = DOM.workModalMainImg.src;
    const imgAlt = DOM.workModalMainImg.alt;
    
    // Создаем модальное окно для увеличенного изображения
    const zoomModal = document.createElement('div');
    zoomModal.className = 'zoom-modal active';
    zoomModal.innerHTML = `
      <div class="zoom-modal__overlay"></div>
      <div class="zoom-modal__content">
        <button class="zoom-modal__close">
          <i class="fas fa-times"></i>
        </button>
        <img src="${imgSrc}" alt="${imgAlt}" class="zoom-modal__img">
      </div>
    `;
    
    DOM.body.appendChild(zoomModal);
    
    // Закрытие по клику на оверлей или кнопку
    const overlay = zoomModal.querySelector('.zoom-modal__overlay');
    const closeBtn = zoomModal.querySelector('.zoom-modal__close');
    
    const closeZoomModal = () => {
      zoomModal.classList.remove('active');
      setTimeout(() => {
        if (zoomModal.parentNode) {
          zoomModal.parentNode.removeChild(zoomModal);
        }
      }, 300);
    };
    
    overlay.addEventListener('click', closeZoomModal);
    closeBtn.addEventListener('click', closeZoomModal);
    
    // Закрытие по ESC
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeZoomModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // На десктопе добавляем кнопки навигации
    if (Utils.checkDesktop() && WorkModal.currentImages && WorkModal.currentImages.length > 1) {
      const content = zoomModal.querySelector('.zoom-modal__content');
      
      const prevBtn = document.createElement('button');
      prevBtn.className = 'zoom-modal__prev';
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        WorkModal.prevImage();
        const zoomImg = zoomModal.querySelector('.zoom-modal__img');
        zoomImg.src = WorkModal.currentImages[WorkModal.currentImageIndex];
      });
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'zoom-modal__next';
      nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        WorkModal.nextImage();
        const zoomImg = zoomModal.querySelector('.zoom-modal__img');
        zoomImg.src = WorkModal.currentImages[WorkModal.currentImageIndex];
      });
      
      content.appendChild(prevBtn);
      content.appendChild(nextBtn);
    }
  }
};

// ==================== МОДАЛЬНОЕ ОКНО ДЛЯ КОМАНДЫ ====================
const TeamModal = {
  init() {
    // Открытие модального окна при клике на фото команды
    DOM.teamMembers.forEach(member => {
      member.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img && img.src) {
          DOM.teamModalImg.src = img.src;
          DOM.teamModalImg.alt = img.alt;
          TeamModal.open();
        }
      });
    });

    // Закрытие модального окна
    if (DOM.teamModalOverlay) {
      DOM.teamModalOverlay.addEventListener('click', TeamModal.close);
    }
    
    if (DOM.teamModalClose) {
      DOM.teamModalClose.addEventListener('click', TeamModal.close);
    }

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && DOM.teamModal.classList.contains('active')) {
        TeamModal.close();
      }
    });
  },

  open() {
    // Закрываем все меню
    Utils.closeAllMenus();
    
    DOM.teamModal.classList.add('active');
    DOM.body.style.overflow = 'hidden';
    DOM.body.classList.add('modal-open');
  },

  close() {
    DOM.teamModal.classList.remove('active');
    DOM.body.style.overflow = '';
    DOM.body.classList.remove('modal-open');
  }
};

// ==================== ПЛАВНЫЙ СКРОЛЛ ====================
const SmoothScroll = {
  init() {
    // Обработчики для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', SmoothScroll.handleClick);
    });
  },

  handleClick(e) {
    const href = this.getAttribute('href');
    
    if (href === '#' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      e.preventDefault();
      
      // Закрываем все меню
      Utils.closeAllMenus();
      
      // Закрываем модальные окна
      if (DOM.workModal.classList.contains('active')) {
        WorkModal.close();
      }
      
      if (DOM.teamModal.classList.contains('active')) {
        TeamModal.close();
      }
      
      // Плавный скролл
      Utils.smoothScrollTo(targetElement);
    }
  }
};

// ==================== ИЗМЕНЕНИЕ ШАПКИ ПРИ СКРОЛЛЕ ====================
const HeaderScroll = {
  init() {
    window.addEventListener('scroll', Utils.throttle(HeaderScroll.update, 50));
    HeaderScroll.update();
    
    // Создаем кнопку "Наверх"
    HeaderScroll.createScrollToTopBtn();
  },

  createScrollToTopBtn() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Наверх');
    DOM.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  },

  update() {
    if (!DOM.header) return;

    const scrollY = window.scrollY;
    const scrollDirection = scrollY > lastScrollTop ? 'down' : 'up';
    lastScrollTop = scrollY <= 0 ? 0 : scrollY;

    // Определяем положение относительно секций
    const heroSection = document.querySelector('.hero');
    const worksSection = document.querySelector('#works');
    
    const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 0;
    
    // Плавное изменение прозрачности хэдера
    if (scrollY <= 50) {
      // В самом верху - прозрачный хэдер
      DOM.header.style.background = 'transparent';
      DOM.header.style.backdropFilter = 'blur(15px)';
      DOM.header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      DOM.header.classList.remove('scrolled');
    } else if (scrollY < heroBottom - 100) {
      // В зоне героя - плавное затемнение
      const opacity = Math.min(0.95, (scrollY - 50) / (heroBottom - 150) * 0.95);
      DOM.header.style.background = `rgba(10, 10, 10, ${opacity})`;
      DOM.header.style.backdropFilter = 'blur(15px)';
      DOM.header.style.borderBottom = '1px solid var(--border-color)';
      DOM.header.classList.add('scrolled');
    } else {
      // После героя - полностью затемненный
      DOM.header.style.background = 'rgba(10, 10, 10, 0.95)';
      DOM.header.style.backdropFilter = 'blur(15px)';
      DOM.header.style.borderBottom = '1px solid var(--border-color)';
      DOM.header.classList.add('scrolled');
    }

    // При быстром поднятии вверх - сразу возвращаем прозрачность
    if (scrollDirection === 'up' && scrollY < 100) {
      DOM.header.style.background = 'transparent';
      DOM.header.style.backdropFilter = 'blur(15px)';
      DOM.header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      DOM.header.classList.remove('scrolled');
    }

    // Показываем/скрываем кнопку "Наверх"
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
      if (scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  }
};

// ==================== ГЛАВНЫЙ ЭКРАН ====================
const HeroSection = {
  init() {
    HeroSection.setHeight();
    HeroSection.adjustImages();
    HeroSection.setupMobileBehavior();
    
    // Настройка скролла героя
    const heroScroll = document.querySelector('.hero__scroll');
    if (heroScroll) {
      heroScroll.addEventListener('click', () => {
        const worksSection = document.querySelector('#works');
        if (worksSection) {
          Utils.smoothScrollTo(worksSection);
        }
      });
    }

    // Обновление при ресайзе
    window.addEventListener('resize', HeroSection.handleResize);
  },

  setHeight() {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.height = '100vh';
    }
  },

  adjustImages() {
    const windowWidth = window.innerWidth;
    const isMobile = Utils.checkMobile();
    
    DOM.heroHalves.forEach(half => {
      if (half) {
        if (isMobile) {
          // На мобильной версии убираем анимации
          half.style.transition = 'none';
          half.style.backgroundPosition = 'center center';
        } else {
          half.style.backgroundPosition = half.classList.contains('hero__half--yacht') 
            ? 'right center' 
            : 'left center';
        }
      }
    });
  },

  setupMobileBehavior() {
    const isMobile = Utils.checkMobile();
    
    if (isMobile) {
      // На мобильной версии убираем все анимации
      if (DOM.heroDesktopServicesBtn) {
        DOM.heroDesktopServicesBtn.style.transition = 'none';
      }
      if (DOM.heroMainBtn) {
        DOM.heroMainBtn.style.transition = 'none';
      }
      
      // Убираем hover эффекты на мобильной версии
      DOM.heroHalves.forEach(half => {
        half.style.pointerEvents = 'none';
      });
    }
  },

  handleResize() {
    HeroSection.adjustImages();
    HeroSection.setHeight();
  }
};

// ==================== ВИДЕО ДЛЯ КАРТОЧЕК ====================
const VideoHandler = {
  init() {
    const videos = document.querySelectorAll('video[autoplay]');
    
    videos.forEach(video => {
      // Устанавливаем muted для автовоспроизведения
      video.muted = true;
      
      // Пытаемся воспроизвести
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Автовоспроизведение видео заблокировано:', error);
          // Показываем кнопку воспроизведения
          VideoHandler.addPlayButton(video);
        });
      }
    });
  },
  
  addPlayButton(video) {
    const playButton = document.createElement('button');
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    playButton.className = 'video-play-button';
    playButton.style.position = 'absolute';
    playButton.style.top = '50%';
    playButton.style.left = '50%';
    playButton.style.transform = 'translate(-50%, -50%)';
    playButton.style.zIndex = '3';
    playButton.style.background = 'rgba(0, 0, 0, 0.7)';
    playButton.style.border = 'none';
    playButton.style.borderRadius = '50%';
    playButton.style.width = '60px';
    playButton.style.height = '60px';
    playButton.style.color = 'white';
    playButton.style.fontSize = '24px';
    playButton.style.cursor = 'pointer';
    playButton.style.display = 'flex';
    playButton.style.alignItems = 'center';
    playButton.style.justifyContent = 'center';
    
    video.parentNode.style.position = 'relative';
    video.parentNode.appendChild(playButton);
    
    playButton.addEventListener('click', () => {
      video.play();
      playButton.style.display = 'none';
    });
    
    video.addEventListener('play', () => {
      playButton.style.display = 'none';
    });
    
    video.addEventListener('pause', () => {
      playButton.style.display = 'flex';
    });
  }
};

// ==================== ВЫПАДАЮЩИЕ МЕНЮ ====================
const Dropdowns = {
  init() {
    // Выпадающее меню "Услуги" в хедере
    if (DOM.servicesDropdown) {
      const dropdownMenu = DOM.servicesDropdown.querySelector('.dropdown-menu');
      const dropdownLink = DOM.servicesDropdown.querySelector('.nav__link');
      
      if (dropdownMenu && dropdownLink) {
        // Для десктопа - hover
        if (Utils.checkDesktop()) {
          DOM.servicesDropdown.addEventListener('mouseenter', () => {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
          });
          
          DOM.servicesDropdown.addEventListener('mouseleave', () => {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateY(-10px)';
          });
        } else {
          // Для мобильных/планшетов - клик
          dropdownLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isVisible = dropdownMenu.style.visibility === 'visible';
            
            if (isVisible) {
              dropdownMenu.style.opacity = '0';
              dropdownMenu.style.visibility = 'hidden';
              dropdownMenu.style.transform = 'translateY(-10px)';
            } else {
              dropdownMenu.style.opacity = '1';
              dropdownMenu.style.visibility = 'visible';
              dropdownMenu.style.transform = 'translateY(0)';
            }
          });
        }
      }
    }
    
    // Закрытие при клике вне
    document.addEventListener('click', (e) => {
      DOM.dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
          const menu = dropdown.querySelector('.dropdown-menu');
          if (menu) {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
          }
        }
      });
    });
  }
};

// ==================== АДАПТИВНОСТЬ И РЕСАЙЗ ====================
const Responsive = {
  init() {
    // Определяем touch устройство
    isTouchDevice = Utils.detectTouchDevice();
    if (isTouchDevice) {
      DOM.body.classList.add('touch');
    }
    
    window.addEventListener('resize', Utils.debounce(Responsive.handleResize, 250));
    Responsive.checkWindowSize();
    Responsive.setupOnsiteFeatures();
    Responsive.setupTeamGrid();
  },

  handleResize() {
    Responsive.checkWindowSize();
    HeroSection.adjustImages();
    HeroSection.setupMobileBehavior();
    HeroSection.setHeight();
    
    // Переинициализируем карточки при изменении размера
    initCards();
    
    // Настраиваем блок команды в зависимости от устройства
    Responsive.setupTeamGrid();
    
    // Настраиваем блок выездной работы
    Responsive.setupOnsiteFeatures();
    
    // Обновляем карусель
    if (DOM.worksCarouselTrack) {
      WorksCarousel.handleResize();
    }
  },

  checkWindowSize() {
    const windowWidth = window.innerWidth;
    const isMobile = Utils.checkMobile();

    // На десктопе закрываем мобильные меню
    if (windowWidth > 767) {
      Utils.closeAllMenus();
    }
  },

  setupTeamGrid() {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;

    const isMobile = Utils.checkMobile();
    const isTablet = Utils.checkTablet();
    const isDesktop = Utils.checkDesktop();

    if (isMobile) {
      // Мобильная версия: 2 колонки, убираем анимации
      teamGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
      teamGrid.style.gap = '15px';
      
      DOM.teamMembers.forEach(member => {
        member.style.transition = 'none';
        const photo = member.querySelector('.team-member__photo');
        if (photo) {
          photo.style.transition = 'none';
          photo.style.border = '2px solid var(--accent-color)';
        }
      });
    } else if (isTablet) {
      // Планшет: 3 колонки, возвращаем анимации
      teamGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      teamGrid.style.gap = '15px';
      
      DOM.teamMembers.forEach(member => {
        member.style.transition = isTouchDevice ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        const photo = member.querySelector('.team-member__photo');
        if (photo) {
          photo.style.transition = isTouchDevice ? 'none' : 'border-color 0.3s ease';
          photo.style.border = '3px solid transparent';
        }
      });
    } else if (isDesktop) {
      // Десктоп: 3 колонки, возвращаем все анимации
      teamGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      teamGrid.style.gap = '20px';
      
      DOM.teamMembers.forEach(member => {
        member.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        const photo = member.querySelector('.team-member__photo');
        if (photo) {
          photo.style.transition = 'border-color 0.3s ease';
          photo.style.border = '3px solid transparent';
        }
      });
    }
  },

  setupOnsiteFeatures() {
    const isMobile = Utils.checkMobile();
    const isTablet = Utils.checkTablet();
    
    DOM.onsiteFeatures?.forEach(feature => {
      if (isMobile || isTablet || isTouchDevice) {
        feature.classList.add('touch');
      } else {
        feature.classList.remove('touch');
      }
    });
  }
};

// ==================== ТЕЛЕГРАМ ВЫПАДАЮЩЕЕ МЕНЮ ====================
const TelegramDropdown = {
  init() {
    if (!DOM.telegramDropdown || !DOM.telegramMenu) return;
    
    DOM.telegramDropdown.addEventListener('mouseenter', () => {
      if (!Utils.checkMobile()) {
        DOM.telegramMenu.style.opacity = '1';
        DOM.telegramMenu.style.visibility = 'visible';
        DOM.telegramMenu.style.transform = 'translateY(0)';
      }
    });
    
    DOM.telegramDropdown.addEventListener('mouseleave', () => {
      if (!Utils.checkMobile()) {
        DOM.telegramMenu.style.opacity = '0';
        DOM.telegramMenu.style.visibility = 'hidden';
        DOM.telegramMenu.style.transform = 'translateY(-10px)';
      }
    });
    
    // На мобильных - по клику
    if (Utils.checkMobile()) {
      const telegramLink = DOM.telegramDropdown.querySelector('.header-social__link.telegram');
      if (telegramLink) {
        telegramLink.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const isVisible = DOM.telegramMenu.style.visibility === 'visible';
          
          if (isVisible) {
            DOM.telegramMenu.style.opacity = '0';
            DOM.telegramMenu.style.visibility = 'hidden';
            DOM.telegramMenu.style.transform = 'translateY(-10px)';
          } else {
            DOM.telegramMenu.style.opacity = '1';
            DOM.telegramMenu.style.visibility = 'visible';
            DOM.telegramMenu.style.transform = 'translateY(0)';
          }
        });
      }
    }
    
    // Закрытие при клике вне
    document.addEventListener('click', (e) => {
      if (DOM.telegramDropdown && DOM.telegramMenu && 
          !DOM.telegramDropdown.contains(e.target) && 
          DOM.telegramMenu.style.visibility === 'visible') {
        DOM.telegramMenu.style.opacity = '0';
        DOM.telegramMenu.style.visibility = 'hidden';
        DOM.telegramMenu.style.transform = 'translateY(-10px)';
      }
    });
  }
};

// ==================== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ====================
const App = {
  init() {
    // Инициализация модулей
    BurgerMenu.init();
    ContactMenu.init();
    WorkModal.init();
    TeamModal.init();
    SmoothScroll.init();
    WorksCarousel.init();
    HeaderScroll.init();
    HeroSection.init();
    VideoHandler.init();
    Responsive.init();
    TelegramDropdown.init();
    Dropdowns.init();
    WorkCards.init();
    
    // Инициализация карточек
    initCards();
    
    // Настройка блока команды при загрузке
    Responsive.setupTeamGrid();
    
    // Настройка блока выездной работы
    Responsive.setupOnsiteFeatures();
    
    // Добавляем класс загрузки
    setTimeout(() => {
      DOM.body.classList.add('loaded');
    }, 100);

    console.log('Boost Marine website loaded successfully!');
  }
};

// ==================== ЗАГРУЗКА ПРИЛОЖЕНИЯ ====================
document.addEventListener('DOMContentLoaded', App.init);

// Обработка события загрузки всех ресурсов
window.addEventListener('load', () => {
  console.log('Все ресурсы загружены');
});

// Добавляем стили для увеличенного изображения
const zoomModalStyles = `
.zoom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
}

.zoom-modal.active {
  opacity: 1;
  visibility: visible;
}

.zoom-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
}

.zoom-modal__content {
  position: relative;
  z-index: 3001;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-modal__img {
  width: auto;
  height: auto;
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
}

.zoom-modal__close {
  position: fixed;
  top: 30px;
  right: 30px;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid var(--accent-color);
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 3002;
}

.zoom-modal__close:hover {
  background: var(--accent-color);
  transform: rotate(90deg);
}

.zoom-modal__prev,
.zoom-modal__next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3002;
  font-size: 1.2rem;
}

.zoom-modal__prev:hover,
.zoom-modal__next:hover {
  background: var(--accent-color);
  color: white;
}

.zoom-modal__prev {
  left: 20px;
}

.zoom-modal__next {
  right: 20px;
}

@media (max-width: 767px) {
  .zoom-modal__close {
    top: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    font-size: 1.8rem;
  }
  
  .zoom-modal__prev,
  .zoom-modal__next {
    display: none;
  }
}
`;

// Добавляем стили в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = zoomModalStyles;
document.head.appendChild(styleSheet);