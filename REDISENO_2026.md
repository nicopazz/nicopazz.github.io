# Portfolio profesional — rediseño 2026

## Propósito
Presentar a Nicolás Paz como desarrollador Full Stack (también abierto a Frontend y Backend), con una identidad visual sobria orientada a reclutadores y empresas tecnológicas.

## Decisiones
- Se conserva **HTML + CSS + JavaScript**, sin framework ni compilación; GitHub Pages puede continuar con su configuración actual.
- Identidad **Tech Minimalista Premium**: azul petróleo oscuro, acento turquesa, tipografía legible y jerarquía visual clara.
- Archiva, UTNalert y la prueba técnica reciben mayor prioridad que los proyectos anteriores.
- Se documenta la experiencia en **La Gráfica**, vinculada al proyecto de digitalización del **Archivo Histórico de Tucumán**. No se afirma vínculo laboral directo con el Archivo ni adopción oficial de Archiva.
- UTNalert se describe expresamente como **proyecto colaborativo**.
- C# / .NET / LINQ / ADO.NET se separan como **conocimientos académicos**.
- Se preservan los enlaces a GitHub, LinkedIn y contacto directo.
- Se mejora SEO de base con title, description, canonical, Open Graph y datos estructurados.
- Se agrega navegación móvil con control accesible, foco visible, contenido semántico y soporte para reduced motion.
- Se retira el formulario de Formspree en favor de contacto directo por email, para eliminar una dependencia externa en el flujo principal.
- Todo el diseño está en `style.css` y la navegación en `script.js`; `index.html` contiene el contenido.

## Qué falta antes de publicar
1. **Sustituir el CV**: la descarga/enlace aún utiliza `public/CV_Nicolas_Paz_FullStackDeveloper.pdf` del sitio anterior. Reemplazar por la versión Full Stack actualizada cuando esté aprobada.
2. **Capturas reales**: Esmae y RollingVet reutilizan imágenes existentes. Archiva, UTNalert y el Gestor de bares utilizan encabezados visuales abstractos, **no** capturas de pantalla. Incorporar capturas verificadas de esos proyectos cuando estén disponibles.
3. **Revisar enlaces de demo**: Esmae y RollingVet mantienen los destinos declarados en sus repositorios, pero no hay validación automática de disponibilidad real en este cambio.
4. **Revisar contenido profesional**: validar que la descripción de la experiencia y cada proyecto coincida con el alcance efectivamente realizado.
5. **Pruebas visuales manuales**: escritorio y móvil, navegación con teclado, contraste, tamaño de textos, carga de imágenes, funcionamiento de enlaces y ausencia de desbordamientos horizontales.
6. Opcional: crear una imagen social OG específica y agregarla al metadato `og:image`.

## Cómo probar localmente
```bash
git clone https://github.com/nicopazz/nicopazz.github.io.git
cd nicopazz.github.io
git switch redesign/portfolio-profesional-2026
python -m http.server 8000
```

Abrir `http://localhost:8000` y comprobar el sitio. Alternativamente, abrir `index.html` directamente.

## Publicación
**Esta rama NO debe fusionarse ni desplegarse automáticamente.** Después de la revisión y aprobación explícita del propietario, fusionar el PR a `main` según la configuración existente de GitHub Pages.
