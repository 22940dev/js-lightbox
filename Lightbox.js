// Based on
// https://www.w3schools.com/howto/howto_js_lightbox.asp

// JavaScript interface for a basic lightbox
function Lightbox(lightboxElement) {
  let scope = this;
  let closeButton, contentElement, captionContainer, backgroundElt;

  if (lightboxElement == null) {
    lightboxElement = document.createElement('div');
    lightboxElement.classList.add('modal');
    closeButton = document.createElement('span');
    closeButton.classList.add('close', 'cursor');
    closeButton.innerHTML = "&times;";
    lightboxElement.appendChild(closeButton);
    contentElement = document.createElement('div');
    contentElement.classList.add('modal-content');
    lightboxElement.appendChild(contentElement);
    captionContainer = document.createElement('div');
    captionContainer.classList.add('caption-container');
    contentElement.appendChild(captionContainer);
    backgroundElt = document.createElement('div');
    backgroundElt.classList.add('modal-background');
    lightboxElement.appendChild(backgroundElt);
    document.body.appendChild(lightboxElement);
  } else {
    closeButton = lightboxElement.querySelector(".close");
    contentElement = lightboxElement.querySelector(".modal-content");
    captionContainer = contentElement.querySelector(".caption-container");
    backgroundElt = lightboxElement.querySelector(".modal-background");
  }
  lightboxElement.style.display = "none";
  this.captionContainer = captionContainer;

  let preventClose = false;
  contentElement.onclick = backgroundElt.onclick = closeButton.onclick = function(event) {
    if (event.target == contentElement ||
      event.target == backgroundElt ||
      event.target == closeButton) {
        scope.closeLightbox();
    }
  }
  let onClose = null;
  let onBeforeClose = null;
  let setOptions = null;

  this.isOpen = function() {
    return lightboxElement.style.display != "none";
  }

  this.closeLightbox = function(force = false) {
    if (preventClose) {
      return;
    }
    let close = true;
    if (onBeforeClose) {
      close = onBeforeClose();
    }
    if (close !== false || force == true) {
      lightboxElement.style.opacity = "0";
      setTimeout(function() {
        // Close the Modal
        lightboxElement.style.display = "none";
        onClose ? onClose() : null;
      }, 200);
      window.removeEventListener('keydown', closeOnEsc, false);
    }
  }

  this.openLightbox = function(options) {
    let alreadyOpen = scope.isOpen();
    lightboxElement.style.display = "block";
    options = options || {};
    if (options.onclose) {
      console.warn("Lightbox onclose renamed to onClose");
      options.onClose = options.onclose;
    }
    if (typeof options == 'function') {
      options = {
        onClose: options
      };
    }
    initializeOptions(options);
    if (options.transition != false && !alreadyOpen) {
      lightboxElement.style.opacity = "0";
      lightboxElement.style.transition = "opacity 0.2s";
    }
    setTimeout(function() {
      lightboxElement.style.opacity = "1";
    }, 0);
    if (window.controls && controls.tooltip) {
      controls.tooltip.hide();
    }
    if (contentElement.clientHeight > lightboxElement.clientHeight) {
      this.noVerticalAlign();
    }
    setOptions = options;
    onClose = options.onClose;
    onBeforeClose = options.onBeforeClose;
    if (options.closeOnEsc) {
      window.addEventListener('keydown', closeOnEsc, false);
    }

    function initializeOptions(options) {
      if (options.closeOnEsc == null) {
        options.closeOnEsc = true;
      }
    }
  }

  function closeOnEsc(event) {
    // Escape Key
    if (event.keyCode == 27) {
      lightbox.closeLightbox();
    }
  }

  // Main method of setting the contents of the lightbox
  this.setCaption = function(html) {
    if (typeof html === "string") {
      captionContainer.innerHTML = html;
    } else {
      captionContainer.innerHTML = "";
      captionContainer.appendChild(html);
    }
  }

  // Full reset of lightbox
  this.clearLightbox = function() {
    this.setOpacity(0.85);
    this.setCaption("");
    this.noVerticalAlign();
    onClose = null;
    onBeforeClose = null;
    preventClose = false;
    setOptions = false;
  }

  // Set the background transparancy in CSS
  this.setOpacity = function(opacity) {
    if (backgroundElt) {
      backgroundElt.style.opacity = opacity;
    }
  }

  this.hideCloseButton = function() {
    closeButton.style.display = 'none';
  }

  this.showCloseButton = function() {
    closeButton.style.display = 'block';
  }

  // Toggles a boolean to prevent the lightbox from being closed by the user
  this.preventClose = function(bool = true) {
    preventClose = bool;
  }

  // Enables vertical alignment of objects in the lightbox
  this.verticalAlign = function() {
    contentElement.style.position = 'absolute';
    contentElement.style.top = '50%';
    contentElement.style.left = '50%';
    contentElement.style.transform = 'translate(-50%, -50%)';
  }

  // Disables vertical alignment of objects in the lightbox
  this.noVerticalAlign = function() {
    contentElement.style.position = null;
    contentElement.style.top = null;
    contentElement.style.left = null;
    contentElement.style.transform = null;
  }

  this.clearLightbox();
}

Object.assign(Lightbox.prototype, {
  constructor: Lightbox
});
