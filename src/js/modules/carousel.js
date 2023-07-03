export function carouselSwitcher() {
	$(".carousel__prev").click(function () {
		$(".carousel").carousel("prev");
	});

	$(".carousel__next").click(function () {
		$(".carousel").carousel("next");
	});
}