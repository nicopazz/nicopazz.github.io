document.addEventListener('DOMContentLoaded', () => {
    
    
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active'); 
        });
    }

    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        });
    });

    
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalButtonText = submitButton.innerHTML;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

           
            submitButton.disabled = true;
            submitButton.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.reset();
                    
                    Swal.fire({
                        title: '¡Mensaje Enviado!',
                        text: 'Gracias por contactarme. Te responderé a la brevedad.',
                        icon: 'success',
                        confirmButtonText: 'Genial',
                        background: '#11111a', 
                        color: '#ffffff',      
                        confirmButtonColor: '#3b82f6' 
                    });
                } else {
                    throw new Error('Error en la respuesta');
                }
            } catch (error) {
               
                Swal.fire({
                    title: '¡Ups!',
                    text: 'Hubo un problema al enviar el mensaje. Por favor intenta nuevamente.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    background: '#11111a',
                    color: '#ffffff',
                    confirmButtonColor: '#d33'
                });
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }
});