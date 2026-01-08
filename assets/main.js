// Webpack Imports
import * as bootstrap from 'bootstrap';
import './main.scss';

(function () {
	'use strict';

	// Focus input if Searchform is empty
	[].forEach.call(document.querySelectorAll('.search-form'), (el) => {
		el.addEventListener('submit', function (e) {
			var search = el.querySelector('input');
			if (search.value.length < 1) {
				e.preventDefault();
				search.focus();
			}
		});
	});

	// Initialize Popovers: https://getbootstrap.com/docs/5.0/components/popovers
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl, {
			trigger: 'focus',
		});
	});
})();


// Adding 'scrolled' class to navbar on scroll

document.addEventListener('DOMContentLoaded', () => {
	const header = document.getElementById('header');
	if (!header) return;

	const SCROLL_THRESHOLD = 15;

	const onScroll = () => {
		if (window.scrollY > SCROLL_THRESHOLD) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	};

	// Run once on load (important for refresh mid-page)
	onScroll();

	window.addEventListener('scroll', onScroll, { passive: true });
});