const CONTACT_EMAIL = "fidy353@gmail.com";
const CONTACT_PHONE = "+261 38 09 992 63";

const stack = document.querySelector("#page-stack");
const sections = [...document.querySelectorAll("[data-index]")];
const panels = [...document.querySelectorAll(".panel")];
const header = document.querySelector(".site-header");
const rail = document.querySelector(".section-rail");
const railCurrent = document.querySelector(".rail-current");
const railProgress = document.querySelector(".rail-line i");
const navLinks = [...document.querySelectorAll("[data-section-link]")];
const projectDialog = document.querySelector("#project-dialog");
const galleryDialog = document.querySelector("#gallery-dialog");
const contactDialog = document.querySelector("#contact-dialog");
const toast = document.querySelector(".toast");
const progress = document.querySelector(".scroll-progress i");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

const galleryProjects = [
  ["graphic", "card-wide", "Habillage véhicule", "Direction artistique · Covering · Mobilité de marque", "assets/gallery/01-car-wrapping.webp", "Concept d’habillage graphique rouge, bleu et beige sur une voiture", "Graphisme / Branding", "↗"],
  ["graphic", "", "Habillage de stand", "Scénographie · Signalétique · Expérience de marque", "assets/gallery/02-exhibition-stand.webp", "Concept de stand d’exposition aux couleurs RF", "Événement / Identité", "↗"],
  ["graphic", "card-tall", "Packaging café", "Brand system · Édition limitée · Packaging", "assets/gallery/03-coffee-packaging.webp", "Série de packagings café rouge, bleu et beige", "Packaging / Branding", "↗"],
  ["3d", "", "Collection cosmétique", "Mockup · Direction artistique · Produit", "assets/gallery/04-cosmetics-mockup.webp", "Mockup de flacons cosmétiques sur podium", "Mockup / Produit", "↗"],
  ["graphic", "", "Partenariat textile", "Capsule collection · Co-branding · Apparel", "assets/gallery/05-apparel-partnership.webp", "Concept de partenariat textile et collection capsule", "Co-branding / Apparel", "↗"],
  ["graphic", "card-wide", "Creative summit", "Key visual · Campagne · Événement tech", "assets/gallery/06-tech-event-keyvisual.webp", "Key visual futuriste pour un événement créatif", "Key visual / Event", "↗"],
  ["graphic", "", "Social campaign", "Toolkit · Réseaux sociaux · Déclinaisons", "assets/gallery/07-social-campaign.webp", "Grille de contenus pour une campagne sociale", "Digital / Social", "↗"],
  ["graphic", "card-tall", "Restaurant identity", "Menu · Branding éditorial · Hospitality", "assets/gallery/08-restaurant-branding.webp", "Menus et identité visuelle pour restaurant", "Édition / Branding", "↗"],
  ["3d", "", "Fragrance visual", "CGI · Verre · Lighting studio", "assets/gallery/09-fragrance-3d.webp", "Rendu 3D d’un flacon de parfum dans une ambiance bleue", "3D / CGI", "↗"],
  ["3d", "card-wide", "Sneaker CGI", "Modélisation · Matières · Campagne produit", "assets/gallery/10-sneaker-cgi.webp", "Concept de sneaker 3D sur fond rouge", "3D / Footwear", "↗"],
  ["3d", "", "Retail display", "Concept retail · Visual merchandising · Produit", "assets/gallery/11-retail-display.webp", "Concept d’espace retail et présentoir de produits", "3D / Retail", "↗"],
  ["3d", "card-tall", "Furniture study", "Product visualization · Matériaux · Lighting", "assets/gallery/12-furniture-render.webp", "Rendu produit d’un fauteuil rouge en studio", "3D / Product", "↗"],
  ["motion", "card-wide", "Motion showreel", "Montage · CGI · VFX · Brand film", "assets/gallery/13-motion-showreel.webp", "Mosaïque d’images issues d’un showreel motion design", "Motion / VFX", "▶"],
  ["motion", "", "Kinetic typography", "Animation typographique · Rythme · Social content", "assets/gallery/14-kinetic-typography.webp", "Composition de typographie cinétique rouge et blanche", "Motion / Type", "▶"],
  ["motion", "", "Music visualizer", "Identité animée · Sound design · Visualizer", "assets/gallery/15-music-visualizer.webp", "Interface de visualiseur musical bleu et rouge", "Motion / Music", "▶"],
  ["motion", "card-wide", "Product reveal", "CGI · Animation produit · Social ads", "assets/gallery/16-product-reveal.webp", "Frame d’une animation de révélation produit", "Motion / CGI", "▶"]
];

const galleryRoot = document.querySelector("#project-gallery");
if (galleryRoot) {
  galleryRoot.innerHTML = galleryProjects.map((project, index) => {
    const [category, extraClass, title, subtitle, image, alt, type, icon] = project;
    return `<button class="gallery-card ${extraClass} reveal-on-scroll" type="button" data-category="${category}" data-gallery-title="${title}" data-gallery-subtitle="${subtitle}" data-gallery-image="${image}">
      <img src="${image}" alt="${alt}" loading="lazy" />
      <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="card-copy"><strong>${title}</strong><small>${type}</small></span><i>${icon}</i>
    </button>`;
  }).join("");
}

const projectData = {
  graphic: {
    kicker: "Projet signature / Habillage & identité",
    title: "Une marque conçue pour être reconnue.",
    description: "Une direction artistique complète déclinée sur véhicule, campagne et supports commerciaux. L’objectif : une présence forte, cohérente et immédiatement mémorisable.",
    image: "assets/gallery/01-car-wrapping.webp",
    tags: ["Art direction", "Branding", "Covering", "Campaign"]
  },
  threeD: {
    kicker: "Projet signature / CGI produit",
    title: "Le produit, rendu irrésistible.",
    description: "Modélisation, matières, éclairage et composition pour produire des visuels publicitaires premium, sans les contraintes d’un shooting physique.",
    image: "assets/gallery/09-fragrance-3d.webp",
    tags: ["Modeling", "Texturing", "Lighting", "4K render"]
  },
  motion: {
    kicker: "Projet signature / Showreel",
    title: "Le mouvement qui retient l’attention.",
    description: "Une sélection de rythmes, transitions, animations typographiques et révélations produit pensée pour les campagnes, les réseaux sociaux et les présentations de marque.",
    image: "assets/gallery/13-motion-showreel.webp",
    tags: ["Editing", "Motion 2D/3D", "VFX", "Social ads"]
  }
};

function setActiveSection(section) {
  const index = Number(section.dataset.index);
  const theme = section.dataset.theme;
  const onLight = theme === "beige";
  const onDark = theme === "dark";

  header.classList.toggle("on-light", onLight);
  header.classList.toggle("on-dark", onDark);
  rail.classList.toggle("on-light", onLight);
  railCurrent.textContent = String(index).padStart(2, "0");
  railProgress.style.transform = `translateY(${(index - 1) * 100}%)`;

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.sectionLink === section.id);
  });
  panels.forEach((panel) => panel.classList.toggle("is-visible", panel === section));
}

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActiveSection(visible.target);
}, { root: stack, threshold: [0.18, 0.35, 0.55, 0.75] });
sections.forEach((section) => sectionObserver.observe(section));
setActiveSection(sections[0]);

// Barre de progression de page.
function updateScrollProgress() {
  const max = stack.scrollHeight - stack.clientHeight;
  const ratio = max > 0 ? stack.scrollTop / max : 0;
  progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
}
stack.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

// Navigation verticale au clavier sur les trois écrans principaux.
document.addEventListener("keydown", (event) => {
  if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
  if (galleryDialog?.open || projectDialog?.open || contactDialog?.open) return;
  if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp"].includes(event.key)) return;

  const current = sections.findIndex((section) => section.id === navLinks.find((link) => link.classList.contains("active"))?.dataset.sectionLink);
  const direction = ["ArrowDown", "PageDown"].includes(event.key) ? 1 : -1;
  const nextIndex = Math.max(0, Math.min(sections.length - 1, current + direction));
  if (nextIndex !== current) {
    event.preventDefault();
    sections[nextIndex].scrollIntoView({ behavior: "smooth" });
  }
});

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => document.querySelector(`#${button.dataset.next}`)?.scrollIntoView({ behavior: "smooth" }));
});

// Menu mobile.
function closeMobileMenu() {
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
}
menuToggle.addEventListener("click", () => {
  const opening = !mobileMenu.classList.contains("is-open");
  menuToggle.classList.toggle("is-open", opening);
  menuToggle.setAttribute("aria-expanded", String(opening));
  menuToggle.setAttribute("aria-label", opening ? "Fermer le menu" : "Ouvrir le menu");
  mobileMenu.classList.toggle("is-open", opening);
  mobileMenu.setAttribute("aria-hidden", String(!opening));
});
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileMenu));
window.addEventListener("resize", () => { if (window.innerWidth > 1080) closeMobileMenu(); });

// Apparition progressive des éléments de la galerie.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, { root: stack, threshold: 0.08, rootMargin: "0px 0px -40px" });
document.querySelectorAll(".reveal-on-scroll").forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  revealObserver.observe(item);
});

// Cartes avec inclinaison légère au pointeur.
if (window.matchMedia("(pointer:fine)").matches) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const strength = Number(card.dataset.tilt || 6);
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1100px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) translateZ(0)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

// Curseur personnalisé.
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
    cursorRing.animate({ left: `${event.clientX}px`, top: `${event.clientY}px` }, { duration: 170, fill: "forwards" });
  });
  document.querySelectorAll("a, button, .tilt-card").forEach((item) => {
    item.addEventListener("pointerenter", () => cursorRing.classList.add("is-active"));
    item.addEventListener("pointerleave", () => cursorRing.classList.remove("is-active"));
  });
}

// Effet magnétique subtil.
document.querySelectorAll(".magnetic").forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });
  item.addEventListener("pointerleave", () => { item.style.transform = "translate(0,0)"; });
});

// Modale des trois projets principaux.
document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectData[button.dataset.project];
    if (!project) return;
    document.querySelector("#dialog-kicker").textContent = project.kicker;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-description").textContent = project.description;
    const image = document.querySelector("#dialog-image");
    image.src = project.image;
    image.alt = project.title;
    document.querySelector("#dialog-tags").innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
    projectDialog.showModal();
  });
});
document.querySelector("[data-close-dialog]").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", (event) => { if (event.target === projectDialog) projectDialog.close(); });

// Galerie filtrable et lightbox.
const galleryCards = [...document.querySelectorAll(".gallery-card")];
const galleryImage = document.querySelector("#gallery-dialog-image");
const galleryTitle = document.querySelector("#gallery-dialog-title");
const gallerySubtitle = document.querySelector("#gallery-dialog-subtitle");
const galleryType = document.querySelector("#gallery-dialog-type");
let activeGalleryIndex = 0;

function visibleGalleryCards() {
  return galleryCards.filter((card) => !card.classList.contains("is-hidden"));
}
function showGalleryCard(card) {
  const visible = visibleGalleryCards();
  activeGalleryIndex = Math.max(0, visible.indexOf(card));
  galleryImage.src = card.dataset.galleryImage;
  galleryImage.alt = card.querySelector("img")?.alt || card.dataset.galleryTitle;
  galleryTitle.textContent = card.dataset.galleryTitle;
  gallerySubtitle.textContent = card.dataset.gallerySubtitle;
  galleryType.textContent = `${String(galleryCards.indexOf(card) + 1).padStart(2, "0")} / RF Studio`;
}
function openGallery(card) {
  showGalleryCard(card);
  galleryDialog.showModal();
}
function moveGallery(direction) {
  const visible = visibleGalleryCards();
  if (!visible.length) return;
  activeGalleryIndex = (activeGalleryIndex + direction + visible.length) % visible.length;
  showGalleryCard(visible[activeGalleryIndex]);
}
galleryCards.forEach((card) => card.addEventListener("click", () => openGallery(card)));
document.querySelector("[data-close-gallery]").addEventListener("click", () => galleryDialog.close());
document.querySelector(".gallery-prev").addEventListener("click", () => moveGallery(-1));
document.querySelector(".gallery-next").addEventListener("click", () => moveGallery(1));
galleryDialog.addEventListener("click", (event) => { if (event.target === galleryDialog) galleryDialog.close(); });
document.addEventListener("keydown", (event) => {
  if (!galleryDialog.open) return;
  if (event.key === "ArrowLeft") moveGallery(-1);
  if (event.key === "ArrowRight") moveGallery(1);
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
    const filter = button.dataset.filter;
    galleryCards.forEach((card) => {
      card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

// Contact.
document.querySelectorAll("[data-open-contact]").forEach((button) => {
  button.addEventListener("click", () => {
    if (projectDialog.open) projectDialog.close();
    if (galleryDialog.open) galleryDialog.close();
    closeMobileMenu();
    contactDialog.showModal();
  });
});
document.querySelector("[data-close-contact]").addEventListener("click", () => contactDialog.close());
contactDialog.addEventListener("click", (event) => { if (event.target === contactDialog) contactDialog.close(); });

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3000);
}

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Projet ${data.get("service")} — ${data.get("name")}`);
  const body = encodeURIComponent(
`Bonjour Fidele,

Je vous contacte au sujet d'un projet.

Nom / entreprise : ${data.get("name")}
E-mail : ${data.get("email")}
Service : ${data.get("service")}

Détails du projet :
${data.get("message")}

Téléphone de contact : ${CONTACT_PHONE}

Merci.`
  );
  showToast("Ouverture de votre application e-mail…");
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

// Année automatique.
document.querySelectorAll("[data-year]").forEach((item) => { item.textContent = new Date().getFullYear(); });
