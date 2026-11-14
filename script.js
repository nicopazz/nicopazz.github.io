(() => {
      const menuButton = document.getElementById("menu-toggle");
      const nav = document.getElementById("site-navigation");
      const closeMenu = () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú de navegación");
      };
      menuButton.addEventListener("click", () => {
        const willOpen = !nav.classList.contains("open");
        nav.classList.toggle("open", willOpen);
        menuButton.setAttribute("aria-expanded", String(willOpen));
        menuButton.setAttribute("aria-label", willOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");
      });
      nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
      document.addEventListener("keydown", event => {
        if (event.key === "Escape" && nav.classList.contains("open")) {
          closeMenu();
          menuButton.focus();
        }
      });
      window.addEventListener("resize", () => {
        if (window.innerWidth > 760) closeMenu();
      });
      document.getElementById("year").textContent = String(new Date().getFullYear());
    })();
