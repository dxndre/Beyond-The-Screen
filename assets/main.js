// Webpack Imports
import * as bootstrap from 'bootstrap';
import './main.scss';

(function () {
	'use strict';

	/* ------------------------------------
	   Bootstrap utilities
	   ------------------------------------ */

	[].forEach.call(document.querySelectorAll('.search-form'), (el) => {
		el.addEventListener('submit', function (e) {
			const search = el.querySelector('input');
			if (search.value.length < 1) {
				e.preventDefault();
				search.focus();
			}
		});
	});

	const popovers = [].slice
		.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
		.map(el => new bootstrap.Popover(el, { trigger: 'focus' }));
})();

/* ------------------------------------
   Header scroll state
   ------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {
	const header = document.getElementById('header');
	if (!header) return;

	const onScroll = () => {
		header.classList.toggle('scrolled', window.scrollY > 15);
	};

	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });
});

/* =====================================================
   VIEWPORT OBSERVER (fade-in sections – toggle on/off)
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('section');

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('viewport-active');
				} else {
					entry.target.classList.remove('viewport-active');
				}
			});
		},
		{
			threshold: 0.25, // 25% visible feels natural
			rootMargin: '0px 0px -10% 0px', // slight early exit
		}
	);

	sections.forEach(section => observer.observe(section));
});

/* =====================================================
   MOBILE INFINITE MARQUEES (Partners + Cards)
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
	const MARQUEE_SELECTOR = '.partners-gallery, .what-we-do .cards';
	const MOBILE_BREAKPOINT = 768;

	const initMarquees = () => {
		const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
		const marquees = document.querySelectorAll(MARQUEE_SELECTOR);

		marquees.forEach(marquee => {
			const existingClones = marquee.querySelectorAll('[data-marquee-clone]');

			if (isMobile) {
				// Prevent double-cloning
				if (existingClones.length) return;

				const items = Array.from(marquee.children);

				items.forEach(item => {
					const clone = item.cloneNode(true);
					clone.setAttribute('aria-hidden', 'true');
					clone.setAttribute('data-marquee-clone', 'true');
					marquee.appendChild(clone);
				});
			} else {
				// Desktop: remove clones entirely
				existingClones.forEach(clone => clone.remove());
			}
		});
	};

	// Run on load
	initMarquees();

	// Re-evaluate on resize (important)
	window.addEventListener('resize', () => {
		window.requestAnimationFrame(initMarquees);
	});
});