window.addEventListener("load", function () {
  const track = document.getElementById("carousel-track");
  const dotsContainer = document.getElementById("dots");
  const originalCards = [...document.querySelectorAll(".recomm-card")];

  const visibleCards = 3;
  const totalOriginal = originalCards.length;
  const cardWidth = originalCards[0].offsetWidth + 4;

  const prepend = originalCards.slice(-visibleCards).map(card => card.cloneNode(true));
  const append = originalCards.slice(0, visibleCards).map(card => card.cloneNode(true));

  prepend.forEach(clone => track.prepend(clone));
  append.forEach(clone => track.append(clone));

  const allCards = document.querySelectorAll(".recomm-card");
  let currentIndex = visibleCards;

  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

  for (let i = 0; i <= totalOriginal - visibleCards; i++) {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i + visibleCards;
      goToSlide(currentIndex);
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dots span");

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove("active"));
    let adjustedIndex = (index - visibleCards) % (totalOriginal - visibleCards + 1);
    if (adjustedIndex < 0) adjustedIndex += (totalOriginal - visibleCards + 1);
    dots[adjustedIndex].classList.add("active");
  }

  function goToSlide(index, skipTransition = false) {
    if (skipTransition) {
      track.style.transition = "none";
    } else {
      track.style.transition = "transform 0.5s ease";
    }
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    currentIndex = index;
    updateDots(index);
  }

  track.addEventListener("transitionend", () => {
    if (currentIndex >= totalOriginal + visibleCards) {
      currentIndex = visibleCards;
      goToSlide(currentIndex, true);
    } else if (currentIndex <= 0) {
      currentIndex = totalOriginal;
      goToSlide(currentIndex, true);
    }
  });

  function autoSlide() {
    goToSlide(currentIndex + 1);
  }

  let interval = setInterval(autoSlide, 1500);

  function resetAutoSlide() {
    clearInterval(interval);
    interval = setInterval(autoSlide, 1500);
  }

  track.addEventListener("mouseenter", () => clearInterval(interval));
  track.addEventListener("mouseleave", resetAutoSlide);
});

