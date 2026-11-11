// Languages
async function Selectlang(selection) {
  const lang = selection.dataset.lang.toLowerCase();

  // Save the chosen language to localStorage
  localStorage.setItem('choose_language', lang);

  // Update active button colors
  document.querySelectorAll("#lang-color [data-lang]").forEach((span) => {
    const isActive = span.dataset.lang.toLowerCase() === lang;
    span.classList.toggle("text-blue-700", isActive);
    span.classList.toggle("text-black", !isActive);
  });

  // Read page name from body attribute
  const pageName = document.body.dataset.page || "Apex-home";

  // Map dataset language code to folder names
  const folderMap = {
    en: "English translation",
    jp: "Japanese translation",
    zh: "Chinese translation"
  };

  const folderName = folderMap[lang];

  // Fetch language file
  try {
    const response = await fetch(`/Language pack/${folderName}/${pageName}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-translate]").forEach((el) => {
      const key = el.dataset.translate;
      if (translations[key]) {
        el.innerHTML = translations[key];
      }
    });
  } catch (error) {
    console.error("Translation load error:", error);
  }
}

// Auto-apply saved language on load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('choose_language') || 'en';
  
  // 'i' flag ensures "en" matches "EN"
  const targetLangSpan = document.querySelector(`#lang-color [data-lang="${savedLang}" i]`) 
                      || document.querySelector('#lang-color [data-lang="EN" i]');

  if (targetLangSpan) {
    Selectlang(targetLangSpan);
  }
});

// Hero bg images
const heroImages = [
  "/public/Images/hero-main-Image.png", 
  "/public/Images/hero-image-2.png", 
  "/public/Images/hero-image-3.png"
];

let currentSlide = 0;

// Main function triggered by onclick="Heroslide(this)"
function Heroslide(clickedElement) {
  const elementId = clickedElement.id;

  if (elementId === "hero-left-arrow") {
    currentSlide = (currentSlide - 1 + heroImages.length) % heroImages.length;
  } else if (elementId === "hero-right-arrow") {
    currentSlide = (currentSlide + 1) % heroImages.length;
  } else if (clickedElement.dataset.slide !== undefined) {
    currentSlide = Number(clickedElement.dataset.slide);
  }

  updateHeroUI();
}

// UI Update function using attribute selectors
function updateHeroUI() {
  const heroImg = document.getElementById("hero-img");
  if (heroImg) {
    heroImg.src = heroImages[currentSlide];
  }

  const slide = document.querySelectorAll("[data-slide]");

  slide.forEach((slide) => {
    const dotIndex = Number(slide.dataset.slide);

    if (dotIndex === currentSlide) {
      slide.className = "w-18 h-2.5 bg-linear-to-r from-blue-500 to-blue-800 rounded-full transition-all duration-300 cursor-pointer";
    } else {
      slide.className = "w-10 h-2.5 bg-gray-400 opacity-80 rounded-full transition-all duration-300 cursor-pointer";
    }
  });
}

// Future of mobility details section
document.addEventListener('DOMContentLoaded', () => {

  // 1. Data Store for Models
  const carData = {
    apex: {
      title: "Apex Model S1",
      image: "/public/Images/Apex-main-car-2.png",
      detailUrl: "apex-model-s1.html",
      taglineKey: "car_s1_tagline",
      descKey: "car_s1_desc"
    },
    g9: {
      title: "G9",
      image: "/public/Images/Apex-car-2.png",
      detailUrl: "g9.html",
      taglineKey: "car_g9_tagline",
      descKey: "car_g9_desc"
    },
    p5: {
      title: "P5",
      image: "/public/Images/Apex-car-3.png",
      detailUrl: "p5.html",
      taglineKey: "car_p5_tagline",
      descKey: "car_p5_desc"
    },
    g3i: {
      title: "G3i",
      image: "/public/Images/Apex-car-4.png",
      detailUrl: "g3i.html",
      taglineKey: "car_g3i_tagline",
      descKey: "car_g3i_desc"
    },
    p7: {
      title: "P7 WING",
      image: "/public/Images/Apex-car-5.png",
      detailUrl: "p7-wing.html",
      taglineKey: "car_g7_tagline",
      descKey: "car_g7_desc"
    }
  };

  // 2. DOM Elements
  const carImage = document.getElementById('car-image');
  const carTitle = document.getElementById('car-title');
  const carTagline = document.getElementById('car-tagline');
  const carDesc = document.getElementById('car-desc');
  const carLink = document.getElementById('car-link');
  
  const options = document.querySelectorAll('[data-type="option"]');
  const dots = document.querySelectorAll('[data-type="dot"]');

  // 3. Switch Function
  function setActiveModel(modelKey) {
    const data = carData[modelKey];
    if (!data) return;

    // Update Image & Title
    carImage.src = data.image;
    carImage.alt = data.title;
    carTitle.textContent = data.title;
    carLink.href = data.detailUrl;
    
    // Update translation keys
    carTagline.setAttribute('data-translate', data.taglineKey);
    carDesc.setAttribute('data-translate', data.descKey);

    // Refresh translation for active language
    const activeLang = document.querySelector('#lang-color .text-blue-700') || document.querySelector('[data-lang="en"]');
    if (activeLang) {
      Selectlang(activeLang);
    }

    // Update Tab UI
    options.forEach(option => {
      if (option.dataset.car === modelKey) {
        option.classList.remove('text-black', 'border-transparent', 'hover:text-blue-700', 'hover:border-b-blue-700');
        option.classList.add('text-blue-700', 'border-b-blue-700');
      } else {
        option.classList.remove('text-blue-700', 'border-b-blue-700');
        option.classList.add('text-black', 'border-transparent', 'hover:text-blue-700', 'hover:border-b-blue-700');
      }
    });

      // Update button click destination based on current car
      carLink.onclick = () => {
      window.location.href = data.detailUrl;
    };

    // Update Dots UI
    dots.forEach(dot => {
      if (dot.dataset.car === modelKey) {
        dot.className = "w-12 h-2 sm:w-18 sm:h-2.5 bg-gradient-to-r from-blue-500 to-blue-800 rounded-full transition-all duration-300 cursor-pointer";
      } else {
        dot.className = "w-8 h-2 sm:w-10 sm:h-2.5 bg-gray-400 opacity-80 rounded-full transition-all duration-300 cursor-pointer";
      }
    });
  }

  // 4. Attach Event Listeners
  options.forEach(option => {
    option.addEventListener('click', () => setActiveModel(option.dataset.car));
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => setActiveModel(dot.dataset.car));
  });

  // 5. Initialize Page State on Load
  setActiveModel('apex');
});

// Back-to-top button
function BackToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}