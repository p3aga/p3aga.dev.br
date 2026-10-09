const isMobile = (() => window.innerWidth <= 640)

const toggleBodyOverflowHidden = (() => {
  if (isMobile()) {
    document.body.classList.toggle('overflow-hidden')
  }
});

export { isMobile, toggleBodyOverflowHidden };
