import Swiper, { Navigation } from 'swiper';

Swiper.use([Navigation]);

const swiper = new Swiper('.slider--js', {
	loop: true,
	speed: 1000,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});