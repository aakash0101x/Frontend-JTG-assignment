window.addEventListener("load", function () {
  const track = document.getElementById("carousel-track");
  const dotsContainer = document.getElementById("dots");
  const origcards = [...document.querySelectorAll(".recomm-card")];

  const visibcards = 3;
  const totorigin = origcards.length;
  const cardWidth = origcards[0].offsetWidth + 4;

  const prepend = origcards.slice(-visibcards).map(card => card.cloneNode(true));
  const append = origcards.slice(0, visibcards).map(card => card.cloneNode(true));

  prepend.forEach(clone => track.prepend(clone));
  append.forEach(clone => track.append(clone));
  let currentIndex = visibcards;
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

  for (let i = 0; i <= totorigin - visibcards; i++) {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i + visibcards;
      goToSlide(currentIndex);
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dots span");

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove("active"));
    let adjustind = (index - visibcards) % (totorigin - visibcards + 1);
    if (adjustind < 0) adjustind += (totorigin - visibcards + 1);
    dots[adjustind].classList.add("active");
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
    if (currentIndex >= totorigin + visibcards) {
      currentIndex = visibcards;
      goToSlide(currentIndex, true);
    } else if (currentIndex <= 0) {
      currentIndex = totorigin;
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