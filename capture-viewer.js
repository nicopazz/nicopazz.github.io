// Ampliación progresiva de las capturas originales. Sin JS, el enlace abre la imagen.
(() => {
  'use strict';
  const viewer = document.querySelector('#captureViewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;
  const image = viewer.querySelector('img');
  const title = viewer.querySelector('h2');
  const region = viewer.querySelector('.capture-viewer-image');
  const zoom = viewer.querySelector('.viewer-zoom');
  let opener;

  const resetZoom = () => {
    viewer.classList.remove('is-zoomed');
    zoom.setAttribute('aria-pressed', 'false');
    zoom.textContent = 'Ver al 100 %';
    region.scrollTo(0, 0);
  };
  document.querySelectorAll('[data-capture]').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      const capture = link.closest('.interface-camera').querySelector('.project-capture');
      image.src = link.href;
      image.alt = capture.alt;
      image.width = Number(capture.getAttribute('width'));
      image.height = Number(capture.getAttribute('height'));
      title.textContent = `Captura de ${link.dataset.capture}`;
      resetZoom();
      viewer.showModal();
    });
  });
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const r = viewer.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => {
    resetZoom();
    opener?.focus({preventScroll: true});
  });
  zoom.addEventListener('click', () => {
    const expanded = !viewer.classList.contains('is-zoomed');
    viewer.classList.toggle('is-zoomed', expanded);
    zoom.setAttribute('aria-pressed', String(expanded));
    zoom.textContent = expanded ? 'Ajustar a la pantalla' : 'Ver al 100 %';
    region.scrollTo(0, 0);
    if (expanded) region.focus({preventScroll: true});
  });
})();
