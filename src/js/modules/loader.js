const loadingOverlayClass = 'loading-overlay--js';

export function createLoadingOverlay(container) {
	const loadingOverlay = document.createElement('div');
	loadingOverlay.classList.add(loadingOverlayClass);
	container.appendChild(loadingOverlay);
	return loadingOverlay;
}

export function hideLoadingOverlay() {
	const loadingOverlay = document.querySelector(`.${loadingOverlayClass}`);
	removeLoadingOverlay(loadingOverlay);
}

function removeLoadingOverlay(loadingOverlay) {
	if (loadingOverlay) {
		loadingOverlay.remove();
	}
}

export { loadingOverlayClass };