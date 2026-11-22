// Set current year
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Page Slide
const pages = ["home", "projects", "experience", "contact", "playpen"];
const links = document.querySelectorAll('.nav-bar a');

function navigateWithAnimation(targetHref, animationClass) {
    document.body.classList.remove("slide-left", "slide-right");
    document.body.classList.add(animationClass);

    setTimeout(() => {
        window.location.href = targetHref;
    }, 500);
}

links.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const currentPage = window.location.pathname.split("/").pop().replace(".html", "") || "home";
        const targetPage = new URL(link.href).pathname.split("/").pop().replace(".html", "") || "home";

        if (currentPage === targetPage) return;

        const currentIndex = pages.indexOf(currentPage);
        const targetIndex = pages.indexOf(targetPage);

        const animationClass = targetIndex > currentIndex ? "slide-left" : "slide-right";

        // Push new state into history
        history.pushState({ page: targetPage }, "", link.href);

        navigateWithAnimation(link.href, animationClass);
    });
});

// Slide button links
document.querySelectorAll(".slide-btn a").forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const targetHref = button.getAttribute("href");

        // Push new state into history
        history.pushState({ page: targetHref }, "", targetHref);

        navigateWithAnimation(targetHref, "slide-left");
    });
});

// Handle browser Back/Forward button
window.addEventListener("popstate", (event) => {
    const targetHref = document.location.href;
    const currentPage = window.location.pathname.split("/").pop().replace(".html", "") || "home";
    const targetPage = targetHref.split("/").pop().replace(".html", "") || "home";

    const currentIndex = pages.indexOf(currentPage);
    const targetIndex = pages.indexOf(targetPage);
    const animationClass = targetIndex > currentIndex ? "slide-left" : "slide-right";

    // Animate before navigating
    document.body.classList.remove("slide-left", "slide-right");
    document.body.classList.add(animationClass);

    setTimeout(() => {
        window.location.href = targetHref;
    }, 500);
});


// Loader

// window.addEventListener("load", function () {
//     document.querySelector(".loader-container").classList.add("hidden");
//     setTimeout(() => {
//       document.querySelector(".main-loader").classList.add("visible");
//     }, 500); 
//   });

const brandWork = document.getElementById("brand-work");

if (brandWork) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const viewButtons = document.querySelectorAll(".pj-seg button");

    viewButtons.forEach(button => {
        button.addEventListener("click", () => {
            brandWork.dataset.view = button.dataset.view;
            viewButtons.forEach(b => b.setAttribute("aria-pressed", String(b === button)));
        });
    });

    document.querySelectorAll(".pj-brand").forEach(card => {
        card.querySelectorAll(".pj-arrow").forEach(arrow => {
            arrow.addEventListener("click", () => {
                const strip = card.querySelector('.pj-strip[data-set="' + brandWork.dataset.view + '"]');
                strip.scrollBy({ left: Number(arrow.dataset.dir) * strip.clientWidth * 0.8, behavior: reduceMotion ? "auto" : "smooth" });
            });
        });
    });

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lb-img");
    const lightboxCap = document.getElementById("lb-cap");
    const lightboxCount = document.getElementById("lb-count");
    let lightboxItems = [];
    let lightboxIndex = 0;
    let lightboxOpener = null;

    function showShot() {
        const img = lightboxItems[lightboxIndex];
        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt;
        lightboxCap.textContent = img.alt;
        lightboxCount.textContent = lightboxIndex + 1 + " / " + lightboxItems.length;
    }

    function stepShot(dir) {
        lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
        showShot();
    }

    document.querySelectorAll(".pj-shot").forEach(shot => {
        shot.addEventListener("click", () => {
            const strip = shot.parentElement;
            lightboxItems = Array.from(strip.querySelectorAll("img"));
            lightboxIndex = Array.from(strip.querySelectorAll(".pj-shot")).indexOf(shot);
            lightboxOpener = shot;
            showShot();
            lightbox.showModal();
        });
    });

    document.getElementById("lb-prev").addEventListener("click", () => stepShot(-1));
    document.getElementById("lb-next").addEventListener("click", () => stepShot(1));
    document.getElementById("lb-close").addEventListener("click", () => lightbox.close());

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.close();
    });

    lightbox.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") stepShot(-1);
        if (e.key === "ArrowRight") stepShot(1);
    });

    lightbox.addEventListener("close", () => {
        if (lightboxOpener) lightboxOpener.focus();
    });
}

//   Slider btn in Projects Page
document.getElementById("togBtn").addEventListener("change", function() {
    var isChecked = this.checked;
    
    // Show/hide desktop and mobile content based on toggle state
    if (isChecked) {
      document.querySelector(".desktop").style.display = "none";
      document.querySelector(".mobile").style.display = "block";
    } else {
      document.querySelector(".desktop").style.display = "block";
      document.querySelector(".mobile").style.display = "none";
    }
  });
  









