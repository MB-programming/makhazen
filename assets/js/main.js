/* ============================================================
   Makhazen Alenayah - Main JS
   GSAP Animations + Data Rendering
============================================================ */

"use strict";

// ---- GSAP Setup ----
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ============================================================
// FLOATING PARTICLES
// ============================================================
function initParticles() {
  const container = document.getElementById('hero-particles');
  const count = window.innerWidth < 600 ? 20 : 40;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    `;

    const size  = Math.random() * 4 + 1;
    const x     = Math.random() * 100;
    const y     = Math.random() * 100;
    const isGold = Math.random() > 0.6;

    dot.style.width  = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left   = x + '%';
    dot.style.top    = y + '%';
    dot.style.background = isGold
      ? `rgba(255, 207, 6, ${Math.random() * 0.6 + 0.1})`
      : `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.03})`;

    container.appendChild(dot);

    gsap.to(dot, {
      y: (Math.random() - 0.5) * 80,
      x: (Math.random() - 0.5) * 40,
      opacity: Math.random() * 0.8 + 0.1,
      duration: Math.random() * 5 + 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 4,
    });
  }
}

// ============================================================
// PRELOADER ANIMATION
// ============================================================
function runPreloader(onComplete) {
  const tl = gsap.timeline({ onComplete });

  tl
    .to('.preloader-logo', {
      opacity: 1, scale: 1,
      duration: 1.0,
      ease: 'power3.out',
    })
    .to('.preloader-dots span', {
      opacity: 1,
      stagger: { each: 0.2, repeat: 2, yoyo: true },
      duration: 0.3,
    }, '-=0.2')
    .to('.preloader', {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
    }, '+=0.3')
    .set('.preloader', { display: 'none' });
}

// ============================================================
// HERO ENTRANCE
// ============================================================
function heroEntrance() {
  const tl = gsap.timeline();

  // Show header
  gsap.to('.site-header', { y: 0, duration: 0.8, ease: 'power3.out' });
  document.getElementById('site-header').classList.add('visible');

  // Patterns fade in
  tl.to('.hero-pattern-top, .hero-pattern-bottom', {
    opacity: 1,
    duration: 1.5,
    ease: 'power2.out',
  }, 0)

  // Logo
  .to('#hero-logo', {
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: 'power4.out',
  }, 0.2)

  // Tagline
  .to('.hero-tagline', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
  }, 0.7)

  // Stats
  .to('.hero-stats', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  }, 1.0)

  // Scroll hint
  .to('#scroll-hint', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }, 1.3);
}

// ============================================================
// STICKY HEADER ON SCROLL
// ============================================================
function initHeader() {
  const header = document.getElementById('site-header');
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      if (self.progress > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    },
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 60 },
          duration: 1.0,
          ease: 'power3.inOut',
        });
      }
    });
  });
}

// ============================================================
// SOCIAL SECTION ANIMATION
// ============================================================
function animateSocial() {
  gsap.to('.social-card', {
    scrollTrigger: {
      trigger: '.social-section',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
  });
}

// ============================================================
// BRANCHES SECTION ANIMATION
// ============================================================
function animateBranches() {
  ScrollTrigger.create({
    trigger: '.branches-section',
    start: 'top 75%',
    onEnter: () => {
      gsap.to('.branch-card', {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: 'power3.out',
      });
    },
  });
}

// ============================================================
// CONTACT SECTION ANIMATION
// ============================================================
function animateContact() {
  gsap.to('.contact-card', {
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 75%',
    },
    opacity: 1,
    scale: 1,
    duration: 0.9,
    ease: 'back.out(1.5)',
  });

  // Pulsing glow on the icon
  gsap.to('.contact-icon-wrap', {
    boxShadow: '0 0 30px rgba(255,207,6,0.35)',
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: 'sine.inOut',
  });
}

// ============================================================
// BRANDS SECTION ANIMATION
// ============================================================
function animateBrands() {
  ScrollTrigger.create({
    trigger: '.brands-section',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('.brand-card', {
        opacity: 1,
        scale: 1,
        stagger: {
          each: 0.04,
          from: 'start',
          grid: 'auto',
        },
        duration: 0.5,
        ease: 'back.out(1.7)',
      });
    },
  });
}

// ============================================================
// RENDER SOCIAL CARDS
// ============================================================
function renderSocial(items) {
  const grid = document.getElementById('social-grid');
  grid.innerHTML = '';

  const platformColors = {
    instagram: { bg: 'rgba(225,48,108,0.12)', icon: '#E1306C', glow: 'rgba(225,48,108,0.2)' },
    tiktok:    { bg: 'rgba(255,255,255,0.08)', icon: '#ffffff', glow: 'rgba(255,255,255,0.1)' },
    snapchat:  { bg: 'rgba(255,252,0,0.1)',  icon: '#FFFC00', glow: 'rgba(255,252,0,0.2)' },
    twitter:   { bg: 'rgba(255,255,255,0.08)', icon: '#ffffff', glow: 'rgba(255,255,255,0.1)' },
    whatsapp:  { bg: 'rgba(37,211,102,0.1)',  icon: '#25D366', glow: 'rgba(37,211,102,0.2)' },
    youtube:   { bg: 'rgba(255,0,0,0.1)',     icon: '#FF0000', glow: 'rgba(255,0,0,0.2)' },
    facebook:  { bg: 'rgba(24,119,242,0.1)',  icon: '#1877F2', glow: 'rgba(24,119,242,0.2)' },
  };

  items.forEach((item) => {
    const platform = item.platform.toLowerCase();
    const colors = platformColors[platform] || { bg: 'rgba(255,207,6,0.1)', icon: '#FFCF06', glow: 'rgba(255,207,6,0.2)' };

    const card = document.createElement('a');
    card.href        = item.url;
    card.target      = '_blank';
    card.rel         = 'noopener noreferrer';
    card.className   = 'social-card';
    card.style.setProperty('--card-color', colors.bg);
    card.style.setProperty('--card-glow', colors.glow);

    card.innerHTML = `
      <div class="social-icon" style="background:${colors.bg}; color:${colors.icon}">
        <i class="fab ${item.icon || 'fa-globe'}"></i>
      </div>
      <div class="social-info">
        <div class="social-platform">${item.platform_ar || item.platform}</div>
        <div class="social-username">${item.username || ''}</div>
      </div>
      <i class="fas fa-arrow-left social-arrow"></i>
    `;
    grid.appendChild(card);
  });

  animateSocial();
}

// ============================================================
// RENDER BRANCHES
// ============================================================
function renderBranches(branches) {
  const grid         = document.getElementById('branches-grid');
  const filterWrap   = document.getElementById('city-filter');
  const allBtn       = filterWrap.querySelector('[data-city="all"]');
  grid.innerHTML     = '';

  // Build unique cities list (preserve order)
  const cities = [];
  branches.forEach(b => {
    if (b.city_ar && !cities.find(c => c.ar === b.city_ar)) {
      cities.push({ ar: b.city_ar, en: b.city_en });
    }
  });

  // Create city filter buttons
  cities.forEach(city => {
    const btn = document.createElement('button');
    btn.className = 'city-btn';
    btn.dataset.city = city.ar;
    btn.textContent  = city.ar;
    filterWrap.appendChild(btn);
  });

  // Render branch cards
  branches.forEach(branch => {
    const card = document.createElement('div');
    card.className = 'branch-card';
    card.dataset.city = branch.city_ar || '';

    const phone = branch.phone ? `
      <div class="branch-phone">
        <i class="fas fa-phone-alt"></i>
        <a href="tel:${branch.phone}">${branch.phone}</a>
      </div>` : '';

    const mapBtn = branch.map_url ? `
      <a href="${branch.map_url}" target="_blank" rel="noopener" class="branch-map-btn">
        <i class="fas fa-map-marker-alt"></i> الموقع
      </a>` : '';

    card.innerHTML = `
      <div class="branch-top">
        <div class="branch-name">${branch.name_ar}</div>
        <span class="branch-city-badge">${branch.city_ar || ''}</span>
      </div>
      <div class="branch-address">
        <i class="fas fa-map-pin"></i>
        <span>${branch.address_ar || ''}</span>
      </div>
      <div class="branch-footer">
        ${phone}
        ${mapBtn}
      </div>
    `;
    grid.appendChild(card);
  });

  // City filter logic
  filterWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.city-btn');
    if (!btn) return;

    filterWrap.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selectedCity = btn.dataset.city;
    const cards = grid.querySelectorAll('.branch-card');

    cards.forEach(card => {
      if (selectedCity === 'all' || card.dataset.city === selectedCity) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // Re-animate visible cards
    gsap.fromTo(
      grid.querySelectorAll('.branch-card:not(.hidden)'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power3.out' }
    );
  });

  animateBranches();
}

// ============================================================
// RENDER CONTACT
// ============================================================
function renderContact(items) {
  const phonesWrap  = document.getElementById('contact-phones');
  const actionsWrap = document.getElementById('contact-actions');
  phonesWrap.innerHTML  = '';
  actionsWrap.innerHTML = '';

  let mainPhone    = null;
  let whatsappNum  = null;

  items.forEach(item => {
    if (item.type === 'phone') {
      mainPhone = item.value;
      phonesWrap.innerHTML += `
        <div class="contact-phone-item">
          <span class="label">${item.label_ar}</span>
          <a href="tel:${item.value}">${item.value}</a>
        </div>`;
    } else if (item.type === 'whatsapp') {
      whatsappNum = item.value;
    }
  });

  if (mainPhone) {
    actionsWrap.innerHTML += `
      <a href="tel:${mainPhone}" class="btn-contact btn-call">
        <i class="fas fa-phone-alt"></i> اتصل الآن
      </a>`;
  }
  if (whatsappNum) {
    const waLink = 'https://wa.me/' + whatsappNum.replace(/\D/g, '');
    actionsWrap.innerHTML += `
      <a href="${waLink}" target="_blank" rel="noopener" class="btn-contact btn-whatsapp">
        <i class="fab fa-whatsapp"></i> واتساب
      </a>`;
  }

  animateContact();
}

// ============================================================
// RENDER BRANDS
// ============================================================
function renderBrands(brands) {
  const grid = document.getElementById('brands-grid');
  grid.innerHTML = '';

  const icons = ['✦', '◆', '★', '❋', '✿', '◈', '⬡', '❖', '✤', '✵'];

  brands.forEach((brand, i) => {
    const card = document.createElement('div');

    const logoHtml = brand.logo_url
      ? `<div class="brand-logo-wrap">
           <img src="${brand.logo_url}" alt="${brand.name_en}" class="brand-logo-img" loading="lazy"
                onerror="this.parentElement.remove(); this.closest('.brand-card').classList.remove('has-logo')" />
         </div>`
      : `<div class="brand-logo-placeholder">${icons[i % icons.length]}</div>`;

    card.className = brand.logo_url ? 'brand-card has-logo' : 'brand-card';
    card.innerHTML = `
      ${logoHtml}
      <div class="brand-name-en">${brand.name_en}</div>
      ${brand.name_ar ? `<div class="brand-name-ar">${brand.name_ar}</div>` : ''}
    `;

    if (brand.website_url) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => window.open(brand.website_url, '_blank', 'noopener'));
    }

    grid.appendChild(card);
  });

  animateBrands();
}

// ============================================================
// FETCH DATA FROM API
// ============================================================
async function loadData() {
  try {
    const res  = await fetch('api/get_data.php');
    const data = await res.json();

    if (data.success) {
      renderSocial(data.social || []);
      renderBranches(data.branches || []);
      renderContact(data.contact || []);
      renderBrands(data.brands || []);
    } else {
      console.warn('API returned error, using fallback');
      loadFallbackData();
    }
  } catch (err) {
    console.warn('API unavailable, using fallback data');
    loadFallbackData();
  }
}

// ============================================================
// FALLBACK STATIC DATA (works without PHP)
// ============================================================
function loadFallbackData() {
  const social = [
    { platform: 'Instagram', platform_ar: 'انستقرام', url: '#', username: '@makhazen_alenayah', icon: 'fa-instagram' },
    { platform: 'TikTok',    platform_ar: 'تيك توك',   url: '#', username: '@makhazen_alenayah', icon: 'fa-tiktok'    },
    { platform: 'Snapchat',  platform_ar: 'سناب شات',  url: '#', username: 'makhazen_care',      icon: 'fa-snapchat'  },
    { platform: 'Twitter',   platform_ar: 'تويتر / X', url: '#', username: '@makhazen_care',     icon: 'fa-x-twitter' },
    { platform: 'WhatsApp',  platform_ar: 'واتساب',    url: '#', username: '0500000000',         icon: 'fa-whatsapp'  },
    { platform: 'YouTube',   platform_ar: 'يوتيوب',    url: '#', username: '@makhazen_alenayah', icon: 'fa-youtube'   },
  ];

  const branches = [
    { name_ar: 'فرع العليا',       city_ar: 'الرياض',       address_ar: 'حي العليا، طريق الملك فهد', phone: '0112345601', map_url: '#' },
    { name_ar: 'فرع النخيل مول',   city_ar: 'الرياض',       address_ar: 'نخيل مول، الرياض',          phone: '0112345602', map_url: '#' },
    { name_ar: 'فرع مول الرياض',   city_ar: 'الرياض',       address_ar: 'مول الرياض، طريق الملك عبدالله', phone: '0112345603', map_url: '#' },
    { name_ar: 'فرع حي طويق',      city_ar: 'الرياض',       address_ar: 'حي طويق، الرياض',           phone: '0112345604', map_url: '#' },
    { name_ar: 'فرع حي الياسمين',  city_ar: 'الرياض',       address_ar: 'حي الياسمين، الرياض',       phone: '0112345605', map_url: '#' },
    { name_ar: 'فرع البلد',        city_ar: 'جدة',          address_ar: 'البلد التاريخي، جدة',       phone: '0122345601', map_url: '#' },
    { name_ar: 'فرع الحمرا',       city_ar: 'جدة',          address_ar: 'حي الحمرا، جدة',            phone: '0122345602', map_url: '#' },
    { name_ar: 'فرع النزهة',       city_ar: 'جدة',          address_ar: 'حي النزهة، جدة',            phone: '0122345603', map_url: '#' },
    { name_ar: 'فرع جوهرة مول',   city_ar: 'جدة',          address_ar: 'جوهرة مول، جدة',            phone: '0122345604', map_url: '#' },
    { name_ar: 'فرع كورنيش الدمام',city_ar: 'الدمام',       address_ar: 'كورنيش الدمام',             phone: '0132345601', map_url: '#' },
    { name_ar: 'فرع الفيصلية',     city_ar: 'الدمام',       address_ar: 'حي الفيصلية، الدمام',       phone: '0132345602', map_url: '#' },
    { name_ar: 'فرع حي العنود',    city_ar: 'الدمام',       address_ar: 'حي العنود، الدمام',         phone: '0132345603', map_url: '#' },
    { name_ar: 'فرع حي الراكة',    city_ar: 'الخبر',        address_ar: 'حي الراكة الشمالية، الخبر',phone: '0132345604', map_url: '#' },
    { name_ar: 'فرع شارع الأمير',  city_ar: 'الخبر',        address_ar: 'شارع الأمير محمد، الخبر',   phone: '0132345605', map_url: '#' },
    { name_ar: 'فرع العزيزية',     city_ar: 'مكة المكرمة',  address_ar: 'حي العزيزية، مكة',         phone: '0122345610', map_url: '#' },
    { name_ar: 'فرع النسيم',       city_ar: 'مكة المكرمة',  address_ar: 'حي النسيم، مكة',           phone: '0122345611', map_url: '#' },
    { name_ar: 'فرع حي العوالي',   city_ar: 'المدينة المنورة',address_ar: 'حي العوالي، المدينة',     phone: '0148345601', map_url: '#' },
    { name_ar: 'فرع بني حارثة',   city_ar: 'المدينة المنورة',address_ar: 'حي بني حارثة، المدينة',   phone: '0148345602', map_url: '#' },
    { name_ar: 'فرع المنهل',       city_ar: 'أبها',          address_ar: 'حي المنهل، أبها',          phone: '0172345601', map_url: '#' },
    { name_ar: 'فرع الشهداء',      city_ar: 'الطائف',        address_ar: 'حي الشهداء، الطائف',       phone: '0122345620', map_url: '#' },
    { name_ar: 'فرع الفناتير',     city_ar: 'الجبيل',        address_ar: 'حي الفناتير، الجبيل',      phone: '0133345601', map_url: '#' },
    { name_ar: 'فرع المروة',       city_ar: 'تبوك',          address_ar: 'حي المروة، تبوك',          phone: '0144345601', map_url: '#' },
    { name_ar: 'فرع الحمر',        city_ar: 'حائل',          address_ar: 'حي الحمر، حائل',           phone: '0163345601', map_url: '#' },
    { name_ar: 'فرع وسط المدينة',  city_ar: 'بريدة',         address_ar: 'وسط مدينة بريدة',          phone: '0163345602', map_url: '#' },
    { name_ar: 'فرع الشرفية',      city_ar: 'ينبع',          address_ar: 'حي الشرفية، ينبع',         phone: '0144345602', map_url: '#' },
  ];

  const contact = [
    { type: 'phone',    value: '920000000',      label_ar: 'خدمة العملاء' },
    { type: 'whatsapp', value: '+966500000000',  label_ar: 'واتساب'       },
  ];

  const brandNames = [
    { en: "L'Oréal Paris",        ar: 'لوريال باريس'        },
    { en: 'Maybelline New York',   ar: 'ميبيلين نيويورك'     },
    { en: 'NYX Professional',     ar: 'ناكس برو ميك أب'     },
    { en: 'MAC Cosmetics',         ar: 'ماك كوزمتيكس'       },
    { en: 'Fenty Beauty',          ar: 'فينتي بيوتي'         },
    { en: 'Charlotte Tilbury',     ar: 'شارلوت تيلبيري'      },
    { en: 'Urban Decay',           ar: 'أربان ديكاي'         },
    { en: 'NARS Cosmetics',        ar: 'نارس كوزمتيكس'       },
    { en: 'Lancôme',               ar: 'لانكوم باريس'        },
    { en: 'YSL Beauty',            ar: 'إيف سان لوران'       },
    { en: 'Dior Beauty',           ar: 'ديور بيوتي'          },
    { en: 'Chanel Beauty',         ar: 'شانيل بيوتي'         },
    { en: 'Givenchy Beauty',       ar: 'جيفنشي بيوتي'        },
    { en: 'Armani Beauty',         ar: 'أرماني بيوتي'        },
    { en: 'Tom Ford Beauty',       ar: 'توم فورد بيوتي'      },
    { en: 'Valentino Beauty',      ar: 'فالنتينو بيوتي'      },
    { en: 'Burberry Beauty',       ar: 'باربيري بيوتي'       },
    { en: 'Jo Malone London',      ar: 'جو مالون لندن'       },
    { en: 'Parfums de Marly',      ar: 'بارفانز دي مارلي'    },
    { en: 'Kilian Paris',          ar: 'كيليان باريس'        },
    { en: 'Prada Beauty',          ar: 'برادا بيوتي'         },
    { en: 'Carolina Herrera',      ar: 'كارولينا هيريرا'     },
    { en: 'Viktor&Rolf',           ar: 'فيكتور آند رولف'     },
    { en: 'Narciso Rodriguez',     ar: 'ناركيسو رودريغيز'    },
    { en: 'Memo Paris',            ar: 'ميمو باريس'          },
  ];

  const brands = brandNames.map((b, i) => ({ name_en: b.en, name_ar: b.ar, logo_url: null }));

  renderSocial(social);
  renderBranches(branches);
  renderContact(contact);
  renderBrands(brands);
}

// ============================================================
// SECTION HEADERS SCROLL ANIMATION
// ============================================================
function initSectionAnimations() {
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    });
  });
}

// ============================================================
// PARALLAX ON PATTERNS
// ============================================================
function initParallax() {
  gsap.utils.toArray('.section-pattern-accent, .brands-pattern-bottom, .footer-pattern').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: -40,
      ease: 'none',
    });
  });

  // Hero pattern parallax on scroll
  gsap.to('.hero-pattern-top', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    y: -80,
    ease: 'none',
  });
  gsap.to('.hero-pattern-bottom', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    y: 60,
    ease: 'none',
  });
}

// ============================================================
// SCROLL-TRIGGERED GSAP for ScrollTo
// ============================================================
if (gsap.plugins && !gsap.plugins.scrollTo) {
  // ScrollTo plugin not loaded - use manual fallback
  const _links = document.querySelectorAll('a[href^="#"]');
  _links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initParticles();

  runPreloader(() => {
    heroEntrance();
    initHeader();
    initSectionAnimations();
    initParallax();
    loadData();
  });
});
