const scrollBar = document.getElementById('scroll-bar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / totalScroll) * 100;
  scrollBar.style.width = progress + '%';

  if (scrolled > window.innerHeight) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
