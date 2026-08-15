// =========================================================
// ShahrMan - Main JavaScript
// =========================================================

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       Elements
    ===================================================== */

    const taxiButtons = document.querySelectorAll("[data-taxi]");
    const downloadButton = document.querySelector("[data-download]");
    const navLinks = document.querySelectorAll('a[href^="#"]');


    /* =====================================================
       Toast Notification
    ===================================================== */

    function showToast(message, type = "info") {

        let toast = document.querySelector(".shahrman-toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.className = "shahrman-toast";

            document.body.appendChild(toast);
        }

        toast.textContent = message;

        toast.dataset.type = type;

        toast.classList.add("show");

        clearTimeout(toast.hideTimer);

        toast.hideTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);
    }


    /* =====================================================
       Taxi Request
    ===================================================== */

    taxiButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const originalText = button.textContent;

            button.disabled = true;

            button.textContent = "در حال آماده‌سازی...";

            setTimeout(() => {

                showToast(
                    "برای درخواست تاکسی، اپلیکیشن شهر من را باز کنید.",
                    "info"
                );

                button.disabled = false;

                button.textContent = originalText;

            }, 500);

        });

    });


    /* =====================================================
       Download App
    ===================================================== */

    if (downloadButton) {

        downloadButton.addEventListener("click", event => {

            event.preventDefault();

            showToast(
                "اپلیکیشن شهر من به‌زودی در دسترس خواهد بود.",
                "info"
            );

        });

    }


    /* =====================================================
       Smooth Navigation
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       Scroll Reveal
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".card, .hero-card, .section-title, .section-description"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }


    /* =====================================================
       Prevent Double Click
    ===================================================== */

    document.querySelectorAll("button").forEach(button => {

        button.addEventListener("dblclick", event => {

            event.preventDefault();

        });

    });

});
