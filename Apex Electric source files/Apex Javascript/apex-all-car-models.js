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

  // Read the page name from the <body> tag
  const pageName = document.body.dataset.page;

  // Map dataset language code to folder names
  const folderMap = {
    en: "English translation",
    jp: "Japanese translation",
    zh: "Chinese translation"
  };

  const folderName = folderMap[lang];

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


// Update Select Model Tab
document.addEventListener('DOMContentLoaded', () => {

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navigation = document.querySelectorAll('nav a[data-type="option"]');

  navigation.forEach(link => {

    const href = link.getAttribute('href');
    if (href === currentPage) {

      // Apply active style
      link.classList.remove('text-black', 'border-transparent', 'hover:text-blue-700', 'hover:border-b-blue-700');
      link.classList.add('text-blue-700', 'border-blue-700');
      
    } else {

      // Apply inactive style
      link.classList.remove('text-blue-700', 'border-blue-700');
      link.classList.add('text-black', 'border-transparent', 'hover:text-blue-700', 'hover:border-b-blue-700');
    }
  });
});

// Swap hero images
const heroImg = document.getElementById('hero-img');
const gallery = document.getElementById('image-gallery');
const toggleBtn = document.getElementById('toggleBtn');

// 1. Swap main hero image when clicking any thumbnail inside #image-gallery
gallery.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    heroImg.src = e.target.src;
  }
});

// 2. Toggle gallery visibility
toggleBtn.addEventListener('click', () => {
  gallery.classList.toggle('hidden');
});

// Back-to-top button
function BackToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}