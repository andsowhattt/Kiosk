import Swiper, { Navigation, Autoplay } from 'swiper';

Swiper.use([Navigation, Autoplay]);

const swiper = new Swiper('.carousel--js', {
	loop: true,
	speed: 1000,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay: {
		delay: 3000, 
		disableOnInteraction: false, 
	},
});
