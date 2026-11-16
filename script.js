document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js');

    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('navigation-links');

    if (mobileMenuBtn && navLinksContainer) {
        const mobileViewport = window.matchMedia('(max-width: 968px)');
        const navbar = mobileMenuBtn.closest('.navbar');

        const setMenuOpen = (open, restoreFocus = false) => {
            const isOpen = mobileViewport.matches && open;
            if (restoreFocus && mobileViewport.matches) mobileMenuBtn.focus();
            navLinksContainer.classList.toggle('active', isOpen);
            mobileMenuBtn.classList.toggle('active', isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            mobileMenuBtn.setAttribute('aria-label', isOpen
                ? 'Cerrar menú de navegación'
                : 'Abrir menú de navegación');
            navLinksContainer.inert = mobileViewport.matches && !isOpen;
        };

        mobileMenuBtn.addEventListener('click', () => {
            setMenuOpen(mobileMenuBtn.getAttribute('aria-expanded') !== 'true');
        });

        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                setMenuOpen(false);
                const target = document.getElementById(link.hash.slice(1));
                if (target) {
                    // Continuar la lectura en la sección elegida, sin alterar el scroll nativo.
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                }
            });
        });

        navbar.addEventListener('keydown', event => {
            if (event.key === 'Escape' && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
                event.preventDefault();
                setMenuOpen(false, true);
            }
        });

        navbar.addEventListener('focusout', event => {
            if (!navbar.contains(event.relatedTarget)) setMenuOpen(false);
        });

        document.addEventListener('click', event => {
            if (!navbar.contains(event.target)) setMenuOpen(false);
        });

        mobileViewport.addEventListener('change', () => {
            const focusInLinks = navLinksContainer.contains(document.activeElement);
            const focusOnToggle = document.activeElement === mobileMenuBtn;
            setMenuOpen(false, focusInLinks);
            if (!mobileViewport.matches && focusOnToggle) {
                navLinksContainer.querySelector('a').focus();
            }
        });

        setMenuOpen(false);
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalButtonText = submitButton.innerHTML;
        const contactStatus = document.getElementById('contact-status');
        // La confirmación conserva su diseño sin descargar una biblioteca en cada visita.
        let alertLibrary;
        let submitting = false;
        const loadAlertLibrary = () => {
            if (typeof window.Swal?.fire === 'function') return Promise.resolve();
            if (alertLibrary) return alertLibrary;
            alertLibrary = new Promise(resolve => {
                const script = document.createElement('script');
                script.src = 'public/vendor/sweetalert2-11.26.3.min.js';
                script.async = true;
                const finish = () => { window.clearTimeout(timeout); resolve(); };
                const timeout = window.setTimeout(finish, 3000);
                script.onload = script.onerror = finish;
                document.head.append(script);
            });
            return alertLibrary;
        };

        const showContactResult = async (success, message) => {
            const title = success ? '¡Mensaje enviado!' : 'No se pudo enviar el mensaje';
            await loadAlertLibrary();
            if (typeof window.Swal?.fire === 'function') {
                try {
                    contactStatus.textContent = '';
                    await window.Swal.fire({
                        title,
                        text: message,
                        icon: success ? 'success' : 'error',
                        confirmButtonText: 'Entendido',
                        background: '#11111a',
                        color: '#f4f5fa',
                        confirmButtonColor: '#2456b5',
                        returnFocus: true
                    });
                    return;
                } catch {
                    // La confirmación también debe funcionar si falla la biblioteca externa.
                }
            }
            contactStatus.classList.remove('sr-only');
            contactStatus.textContent = title + '. ' + message;
        };

        contactForm.addEventListener('submit', async event => {
            event.preventDefault();
            if (submitting || submitButton.disabled || !contactForm.reportValidity()) return;
            submitting = true;

            contactStatus.classList.add('sr-only');
            contactStatus.textContent = 'Enviando mensaje…';
            contactForm.setAttribute('aria-busy', 'true');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando…';
            void loadAlertLibrary();

            let success = false;
            let message = 'No se pudo completar el envío. Tus datos se conservaron; podés reintentar o contactarme por correo electrónico.';
            const controller = new AbortController();
            const timeout = window.setTimeout(() => controller.abort(), 20000);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' },
                    signal: controller.signal
                });
                if (response.ok) {
                    success = true;
                    contactForm.reset();
                    message = 'Gracias por contactarme. Te responderé a la brevedad.';
                } else if (response.status === 429) {
                    message = 'Hay demasiados intentos de envío. Esperá unos minutos o contactame por correo electrónico.';
                } else if (response.status === 400 || response.status === 422) {
                    message = 'Revisá los datos del formulario e intentá nuevamente. También podés contactarme por correo electrónico.';
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    message = 'La confirmación tardó demasiado. No pude confirmar el envío; podés contactarme por correo electrónico.';
                }
            } finally {
                window.clearTimeout(timeout);
                contactForm.removeAttribute('aria-busy');
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }

            submitButton.focus();
            try {
                await showContactResult(success, message);
            } finally {
                submitting = false;
            }
        });
    }

});
