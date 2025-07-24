
/**
 * Component that mounts images with display: none, so that the browser can already load them for later.
 * @param {string[]} props.urls - Array of the URLs of the images.
 */
function preloadImages(urls: string[]): void {
    // Create an invisible container div:
    const container = document.createElement('div');
    container.style.display = 'none';

    urls.forEach((url) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = '';
        container.appendChild(img);
    });

    // Append the container to the body
    document.body.appendChild(container);
}

export default preloadImages;