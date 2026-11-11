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

  // Lightbox Slider Functionality
  document.addEventListener('DOMContentLoaded', () => {
      const lightboxModal = document.getElementById('lightbox-modal');
      const lightboxImg = document.getElementById('lightbox-img');
      const lightboxPrev = document.getElementById('lightbox-prev');
      const lightboxNext = document.getElementById('lightbox-next');
      const enlargeBtn = document.getElementById('enlarge-btn');
      const galleryCards = document.querySelectorAll('[data-show="enlarge-image"] img');

      let currentIndex = 0;

      function updateLightboxImage() {
          if (galleryCards.length > 0) {
              lightboxImg.src = galleryCards[currentIndex].src;
          }
      }

      function openLightbox(index = 0) {
        currentIndex = index;
        updateLightboxImage();
        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
      }

      function closeLightbox() {
          lightboxModal.classList.add('hidden');
          lightboxModal.classList.remove('flex');
      }

      // 1. Click "CLICK TO ENLARGE" opens the first image (index 0)
      if (enlargeBtn) {
          enlargeBtn.addEventListener('click', () => {
              openLightbox(0);
          });
      }

      // 2. Click any grid thumbnail opens lightbox at that specific image's index
      galleryCards.forEach((img, idx) => {
          const card = img.closest('[data-show="enlarge-image"]');
          if (card) {
              card.addEventListener('click', () => {
                  openLightbox(idx);
              });
          }
      });

      // 3. Next button (Infinite Loop forward)
      if (lightboxNext) {
          lightboxNext.addEventListener('click', (e) => {
              e.stopPropagation();
              currentIndex = (currentIndex + 1) % galleryCards.length;
              updateLightboxImage();
          });
      }

      // 4. Previous button (Infinite Loop backward)
      if (lightboxPrev) {
          lightboxPrev.addEventListener('click', (e) => {
              e.stopPropagation();
              currentIndex = (currentIndex - 1 + galleryCards.length) % galleryCards.length;
              updateLightboxImage();
          });
      }

      // 5. Close when clicking anywhere outside the active image
      if (lightboxModal) {
          lightboxModal.addEventListener('click', (e) => {
              // Closes only if the user clicks outside the image itself
              if (e.target !== lightboxImg) {
                  closeLightbox();
              }
          });
      }

      // 6. Keyboard navigation (ESC to close, Left/Right arrow keys to slide)
      document.addEventListener('keydown', (e) => {
          if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
              if (e.key === 'Escape') {
                  closeLightbox();
              } else if (e.key === 'ArrowRight') {
                  currentIndex = (currentIndex + 1) % galleryCards.length;
                  updateLightboxImage();
              } else if (e.key === 'ArrowLeft') {
                  currentIndex = (currentIndex - 1 + galleryCards.length) % galleryCards.length;
                  updateLightboxImage();
              }
          }
      });
  });

  // Back-to-top button
  function BackToTop() {
      window.scrollTo({
      top: 0,
      behavior: 'smooth'
      });
  }