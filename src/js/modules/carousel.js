import Swiper, { Autoplay } from 'swiper';


Swiper.use([Autoplay]);


const swiper = new Swiper('.carousel--js', {
	loop: true,
	speed: 1000,
	autoplay: {
		delay: 3000, 
		disableOnInteraction: false, 
	},
});
