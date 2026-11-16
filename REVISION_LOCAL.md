# Revisión local del portfolio

Modernización implementada el 16 de noviembre de 2026 en `desarrollo-portfolio`.
Este registro corresponde a las verificaciones locales previas a la publicación, autorizada posteriormente por el titular del portfolio. La configuración de GitHub Pages se conserva.

## Abrir el sitio

La vista local comprobada está en http://127.0.0.1:8765/.
Si el servidor ya no está activo, desde la carpeta del repositorio ejecutar:

```powershell
py -m http.server 8765 --bind 127.0.0.1
```

También puede usarse Live Server de VS Code. Recargar con Ctrl + F5.

- Inicio: `/index.html`
- Archiva: `/proyectos/archiva.html`
- UTNalert: `/proyectos/utnalert.html`

## Verificaciones realizadas

- `node --check script.js` y `git diff --check`, sin errores.
- Anidación HTML, IDs únicos, un H1 y un main por página; idioma, metadatos y JSON-LD.
- Referencias locales, fragmentos internos y relaciones ARIA existentes.
- Etiquetas asociadas, campos obligatorios y protecciones de enlaces externos.
- CV definitivo conservado: `public/Nicolas_Paz_Full_Stack.pdf`.
- SHA-256 del CV: `D8A09C1288AA5F7EF4B76A5BB72728E7D06ED055A603C4A77246D4F0D3881C57`.
- Endpoint de Formspree conservado: `https://formspree.io/f/mqaryvyp`.
- Respuestas HTTP 200 en localhost para las tres páginas, CSS, JavaScript, CV e imágenes nuevas.
- Pruebas de lógica con DOM y red simulados: menú a 320, 375, 430, 768, 968, 1366 y 1920 px; apertura, cierre, Escape, salida del foco, clic exterior y cambio de breakpoint.
- Dieciocho escenarios simulados del formulario: éxito, errores HTTP, red y timeout, con SweetAlert disponible, ausente o fallando. También prevención de envíos duplicados y restauración de foco. No hubo envíos reales.
- Revisión independiente de código. Corregido el orden de eliminación de `inert` antes de devolver el foco a un enlace al pasar a escritorio.
- Contraste calculado sobre pares de colores definidos en CSS: texto principal 18,11:1; secundario 9,20:1; texto atenuado y placeholders 6,73:1; extremos de los botones primarios 6,83:1 y 7,27:1. Esto no sustituye una auditoría visual completa.

## Contenido y recursos

- Las funciones descritas de Archiva y UTNalert se contrastaron con sus repositorios privados mediante lectura autorizada. No se copiaron secretos, datos de usuarios ni documentación interna.
- Archiva: empleador La Gráfica, institución vinculada Archivo Histórico de Tucumán, software personal. Sin atribuir adopción institucional.
- UTNalert: proyecto del equipo, aportes individuales diferenciados y clasificación visual con IA marcada como experimental.
- Repositorios públicos comprobados: `nicopazz/prueba_tecnica_zoco`, `nicopazz/esmae`, `nicopazz/RollingVet`.
- Demos con HTTP 200: `https://esmae.vercel.app/` y `https://rollingvet-tuc.netlify.app/`. No se probaron transacciones ni operaciones del backend.
- El enlace existente al certificado de Rolling Code respondió HTTP 200.
- Capturas principales conservadas. La fotografía fue reemplazada por el usuario por `public/Perfil_3.png`; antes de publicar se actualizaron sus referencias de metadatos y dimensiones (1086 × 1448). Copias JPEG de Esmae y RollingVet optimizadas sin reemplazar los PNG originales.
- Captura del gestor de bares: misma imagen ya referenciada por el portfolio, desde `https://raw.githubusercontent.com/nicopazz/prueba_tecnica_zoco/main/evidencias/CRUD.PNG`; ahora servida localmente como copia optimizada.
- No se añadieron frameworks ni dependencias de ejecución.

## Revisión manual pendiente

No se pudo obtener acceso al navegador automatizado. La alternativa de control nativo encontró Chrome minimizado y no permitió completar la inspección. Las pruebas simuladas no acreditan renderizado ni comportamiento nativo del navegador.

Revisar las tres páginas en 320, 375, 430, 768, 968, 1366 y 1920 px:

1. Confirmar ausencia de scroll horizontal, recortes de texto y superposiciones.
2. Revisar proporción de la foto, encuadre y nitidez de capturas, saltos de línea y espaciados.
3. Recorrer con Tab y Shift + Tab; usar Enter/Espacio en el menú, Escape para cerrarlo y comprobar el foco al redimensionar.
4. Abrir ambos casos de estudio y volver a Proyectos. Comprobar todos los enlaces internos.
5. Descargar el CV y abrir el PDF.
6. Revisar el formulario vacío y con un email inválido. No enviar datos válidos como prueba sin autorización.
7. Comprobar movimiento reducido, zoom al 200 %, contraste real y lectura con NVDA u otro lector de pantalla.
8. Desactivar JavaScript y verificar que el contenido y los enlaces de navegación sigan disponibles.

No se afirma cumplimiento completo de WCAG 2.2 AA, validación visual responsive, resultados de Lighthouse ni funcionamiento completo de servicios externos.
