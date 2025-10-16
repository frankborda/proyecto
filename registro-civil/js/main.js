// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// =============================================
// SMOOTH SCROLLING
// =============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      const navLinks = document.getElementById("nav-links");
      const hamburgerMenu = document.getElementById("hamburger-menu");
      if (window.innerWidth <= 768 && navLinks && hamburgerMenu) {
        navLinks.classList.remove("active");
        hamburgerMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  });
});

// =============================================
// CONFIGURACIÓN DEL MENÚ HAMBURGUESA
// =============================================
function setupHamburgerMenu() {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navLinks = document.getElementById("nav-links");

  if (!hamburgerMenu || !navLinks) return;

  hamburgerMenu.addEventListener("click", function () {
    // Alternar clase active en el menú hamburguesa
    this.classList.toggle("active");

    // Alternar clase active en los enlaces de navegación
    navLinks.classList.toggle("active");

    // Prevenir scroll del body cuando el menú está abierto
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Cerrar menú al hacer clic en un enlace
  const navItems = navLinks.querySelectorAll("a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburgerMenu.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (event) => {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnHamburger = hamburgerMenu.contains(event.target);

    if (
      !isClickInsideNav &&
      !isClickOnHamburger &&
      navLinks.classList.contains("active")
    ) {
      hamburgerMenu.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// Datos para los modales
const modalData = {
  modal1: {
    title: "Municipalidad Provincial de Azangaro – Puno",
    image: "assets/index/municipalidades/AZANGARO.png",
    text: "Implementación exitosa que redujo tiempos de atención en 70% y eliminó errores en registros. Transformación digital completa que mejoró significativamente los servicios al ciudadano.",
  },
  modal2: {
    title: "Municipalidad Provincial de Castilla - Arequipa",
    image: "assets/index/municipalidades/CASTILLA.png",
    text: "Digitalización completa que optimizó nuestros procesos y mejoró el servicio al ciudadano. Implementación realizada en tiempo récord con excelentes resultados.",
  },
  modal3: {
    title: "Municipalidad Provincial de Caylloma - Arequipa",
    image: "assets/index/municipalidades/CAYLLOMA.png",
    text: "Sistema 100% operativo desde el primer día, con capacitación efectiva y soporte continuo. Los ciudadanos ahora disfrutan de trámites más rápidos y eficientes.",
  },
  modal4: {
    title: "Municipalidad Distrital de Cerro Azul - Lima",
    image: "assets/index/municipalidades/CERRO-AZUL.png",
    text: "Modernización completa del registro civil con atención al ciudadano 24/7 mediante plataforma digital. Mejora notable en la satisfacción de los usuarios.",
  },
  modal5: {
    title: "Municipalidad Provincial de el Collao - Puno",
    image: "assets/index/municipalidades/EL-COLLAO-ILAVE.png",
    text: "Implementación que triplicó la eficiencia en emisión de certificados y partidas digitales. Procesos optimizados y mayor transparencia en la gestión.",
  },
  modal6: {
    title: "Municipalidad Provincial de Paita - Piura",
    image: "assets/index/municipalidades/PAITA.png",
    text: "Solución integral que mejoró la transparencia y accesibilidad de los servicios municipales. Digitalización exitosa de archivos históricos.",
  },
};

// Datos para el carrusel
const municipalidadesData = [
  {
    id: "modal1",
    image: "assets/index/municipalidades/AZANGARO.png",
    title: "Municipalidad Provincial de Azangaro – Puno",
    description: "Implementación exitosa que redujo tiempos de atención en 70%",
  },
  {
    id: "modal2",
    image: "assets/index/municipalidades/CASTILLA.png",
    title: "Municipalidad Provincial de Castilla - Arequipa",
    description: "Digitalización completa que optimizó nuestros procesos",
  },
  {
    id: "modal3",
    image: "assets/index/municipalidades/CAYLLOMA.png",
    title: "Municipalidad Provincial de Caylloma - Arequipa",
    description: "Sistema 100% operativo desde el primer día",
  },
  {
    id: "modal4",
    image: "assets/index/municipalidades/CERRO-AZUL.png",
    title: "Municipalidad Distrital de Cerro Azul - Lima",
    description: "Modernización completa del registro civil",
  },
  {
    id: "modal5",
    image: "assets/index/municipalidades/EL-COLLAO-ILAVE.png",
    title: "Municipalidad Provincial de el  Collao Ilave - Puno",
    description: "Implementación que triplicó la eficiencia",
  },
  {
    id: "modal6",
    image: "assets/index/municipalidades/PAITA.png",
    title: "Municipalidad Distrital de Paita - Piura",
    description: "Solución integral que mejoró la transparencia",
  },
];

// =============================================
// CONFIGURACIÓN DEL CARRUSEL DE MUNICIPALIDADES
// =============================================
function setupMunicipalidadesCarousel() {
  const carousel = document.getElementById("carousel");
  const indicatorsContainer = document.getElementById("indicators");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");

  // Verificar que todos los elementos existan
  if (
    !carousel ||
    !indicatorsContainer ||
    !prevButton ||
    !nextButton ||
    !modalOverlay
  ) {
    console.error("No se encontraron todos los elementos del carrusel");
    return;
  }

  const totalItems = municipalidadesData.length;
  let currentIndex = 0;
  let autoSlideInterval;

  // Crear elementos del carrusel
  function createCarouselItems() {
    carousel.innerHTML = "";
    indicatorsContainer.innerHTML = "";

    // Crear elementos de carrusel
    for (let i = 0; i < totalItems; i++) {
      const item = document.createElement("div");
      item.className = "carousel-item";
      item.setAttribute("data-modal", municipalidadesData[i].id);

      const img = document.createElement("img");
      img.src = municipalidadesData[i].image;
      img.alt = municipalidadesData[i].title;
      img.className = "carousel-img";

      const caption = document.createElement("div");
      caption.className = "carousel-caption";

      const title = document.createElement("h3");
      title.textContent = municipalidadesData[i].title;

      const description = document.createElement("p");
      description.textContent = municipalidadesData[i].description;

      caption.appendChild(title);
      caption.appendChild(description);
      item.appendChild(img);
      item.appendChild(caption);
      carousel.appendChild(item);

      // Crear indicadores
      const indicator = document.createElement("div");
      indicator.className = "indicator";
      if (i === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => {
        stopAutoSlide();
        goToSlide(i);
        startAutoSlide();
      });
      indicatorsContainer.appendChild(indicator);
    }

    updateCarousel();
  }

  // Función para actualizar el carrusel
  function updateCarousel() {
    const items = document.querySelectorAll(".carousel-item");
    const indicators = document.querySelectorAll(".indicator");

    items.forEach((item, index) => {
      // Calcular la posición relativa al índice actual
      let position = index - currentIndex;

      // Ajustar para el efecto de carrusel infinito
      if (position < -totalItems / 2) position += totalItems;
      if (position > totalItems / 2) position -= totalItems;

      // Aplicar transformaciones según la posición
      if (position === 0) {
        // Elemento central
        item.style.transform = "translateX(-50%) scale(1)";
        item.style.opacity = "1";
        item.style.zIndex = "5";
        item.style.filter = "blur(0)";
        item.classList.add("active");
      } else if (position === -1 || position === 1) {
        // Elementos adyacentes
        const translateX = position * 300;
        item.style.transform = `translateX(calc(-50% + ${translateX}px)) scale(0.9)`;
        item.style.opacity = "0.8";
        item.style.zIndex = "4";
        item.style.filter = "blur(1px)";
        item.classList.remove("active");
      } else if (position === -2 || position === 2) {
        // Elementos más lejanos
        const translateX = position * 300;
        item.style.transform = `translateX(calc(-50% + ${translateX}px)) scale(0.85)`;
        item.style.opacity = "0.6";
        item.style.zIndex = "3";
        item.style.filter = "blur(2px)";
        item.classList.remove("active");
      } else {
        // Elementos fuera de vista
        item.style.transform = "translateX(calc(-50% + 800px)) scale(0.8)";
        item.style.opacity = "0";
        item.style.zIndex = "2";
        item.style.filter = "blur(3px)";
        item.classList.remove("active");
      }
    });

    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  // Función para ir a un slide específico
  function goToSlide(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = totalItems - 1;
    if (currentIndex >= totalItems) currentIndex = 0;
    updateCarousel();
  }

  // Función para abrir modal
  function openModal(modalId) {
    const data = modalData[modalId];

    if (data && modalImg && modalTitle && modalText) {
      modalImg.src = data.image;
      modalImg.alt = data.title;
      modalTitle.textContent = data.title;
      modalText.textContent = data.text;

      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  // Función para cerrar modal
  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Función para avanzar al siguiente slide
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  // Función para retroceder al slide anterior
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Función para iniciar la transición automática
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Cambiar cada 3 segundos
  }

  // Función para detener la transición automática
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Event listeners para botones de navegación
  nextButton.addEventListener("click", function () {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  prevButton.addEventListener("click", function () {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });

  // Event listeners para las imágenes
  carousel.addEventListener("click", function (e) {
    const item = e.target.closest(".carousel-item");
    if (item) {
      const modalId = item.getAttribute("data-modal");
      openModal(modalId);
    }
  });

  // Event listener para cerrar modal
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // Cerrar modal al hacer clic fuera del contenido
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Pausar auto slide al pasar el ratón por encima
  carousel.addEventListener("mouseenter", stopAutoSlide);

  // Reanudar auto slide al quitar el ratón
  carousel.addEventListener("mouseleave", startAutoSlide);

  // Inicializar el carrusel y comenzar la transición automática
  createCarouselItems();
  startAutoSlide();

  // Navegación con teclado
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    } else if (e.key === "ArrowLeft") {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
      // espace para salir del modal
    } else if (e.key === "Escape") {
      closeModal();
    }
  });
}

// =============================================
// CONTACT FORM HANDLING
// =============================================
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  const confirmationMessage = document.getElementById("confirmationMessage");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const asunto = document.getElementById("asunto").value;
    const mensaje = document.getElementById("mensaje").value;

    if (!nombre || !correo || !asunto || !mensaje) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const municipalidad = document.getElementById("municipalidad").value;
    const asuntoSelect = document.getElementById("asunto");
    const asuntoTexto = asuntoSelect.options[asuntoSelect.selectedIndex].text;

    const cuerpo =
      `Nombre: ${nombre}\n` +
      `Correo: ${correo}\n` +
      `Municipalidad: ${municipalidad}\n` +
      `Asunto: ${asuntoTexto}\n\n` +
      `Mensaje:\n${mensaje}`;

    const asuntoCodificado = encodeURIComponent(asuntoTexto);
    const cuerpoCodificado = encodeURIComponent(cuerpo);

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=rs.siamsoft@gmail.com&su=${asuntoCodificado}&body=${cuerpoCodificado}`;

    if (confirmationMessage) {
      confirmationMessage.style.display = "block";
    }

    setTimeout(function () {
      window.open(gmailLink, "_blank");
      contactForm.reset();

      if (confirmationMessage) {
        setTimeout(function () {
          confirmationMessage.style.display = "none";
        }, 5000);
      }
    }, 1000);
  });
}

// =============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// =============================================
function setupAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        // Dejar de observar una vez que la animación se ha activado
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elementos a animar - seleccionar correctamente
  const elementsToAnimate = document.querySelectorAll(
    ".feature-card, .process-step, .testimonio-card, .hero-text, .hero-visual, .section-title"
  );

  elementsToAnimate.forEach((el) => {
    // Aplicar estilos iniciales para la animación
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";

    // Observar el elemento
    observer.observe(el);
  });

  console.log(
    `Observando ${elementsToAnimate.length} elementos para animación`
  );
}

// =============================================
// SETUP MODALS FUNCTION
// =============================================
function setupModals() {
  // Esta función ahora está integrada en setupMunicipalidadesCarousel
  console.log("Modales configurados a través del carrusel");
}

// =============================================
// INITIALIZATION
// =============================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("SIAMSoft - Sistema de Registro Civil Digital inicializado");

  // Inicializar el menú hamburguesa
  setupHamburgerMenu();

  // Inicializar el carrusel de municipalidades (esto incluye los modales)
  setupMunicipalidadesCarousel();

  // Inicializar el formulario de contacto
  setupContactForm();

  // Inicializar animaciones - con un pequeño delay para asegurar que el DOM esté listo
  setTimeout(() => {
    setupAnimations();
  }, 100);
});

// También inicializar animaciones cuando la página se carga completamente
window.addEventListener("load", setupAnimations);
