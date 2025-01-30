 // Typing animation (for the title slide)
  const titleSlide = document.querySelector('.slide'); // First slide
  const dynamicText = titleSlide.querySelector('.dynamic-text');
  const phrases = [
    "efficiency",
    "performance",
    "cost effectiveness",
    "domain specific modeling"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let deletingSpeed = 50;
  let pauseBetweenPhrases = 1200;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, pauseBetweenPhrases);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }
  }

  type();
  
  // Initialize Bespoke
  const deck = bespoke.from('article.deck');

  // Add event listener for slide changes
  deck.on('activate', function(e) {
    const slides = document.querySelectorAll('.bespoke-slide');

    // Remove shadow class from all slides
    slides.forEach(slide => {
      slide.classList.remove('bespoke-shadow');
    });

    // Add shadow class to immediate previous slide
    if (e.index > 0) {
      slides[e.index - 1].classList.add('bespoke-shadow');
    }

    // Add shadow class to immediate next slide
    if (e.index < slides.length - 1) {
      slides[e.index + 1].classList.add('bespoke-shadow');
    }
  });
  
  bespoke.from('article', [
    bespoke.plugins.classes(),
    bespoke.plugins.scale('transform'),
    bespoke.plugins.bullets('li, .adapter-card'),
]);