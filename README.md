# js-lightbox
Basic Lightbox based on w3schools

## Usage
* Include `Lightbox.js` in your web application or website
* (Optional) Include Lightbox.html in your html file. If you do not include it, the JavaScript will create the necessary HTML DOM elements.
* Call `const lightbox = new Lightbox();`

## Methods
* `isOpen()` returns whether the lightbox is open.
* `closeLightbox()` closes the lightbox.
* `openLightbox(options)` opens the lightbox. The `options` object allows you to specify a `onClose` callback.
E.g `lightbox.openLightbox({onClose: function(){} })`
* `setOpacity(number)` sets the background opacity.
* `setCaption(HTMLElement|String)` sets the contents of the lightbox.
* `clearLightbox()` resets the lightbox contents, opacity, and callbacks.
