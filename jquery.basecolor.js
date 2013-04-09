/*! 
 * jQuery Plugin Plugin
 * Version: 0.1.0
 * URL: https://github.com/bryanstedman/jqueryBaseColor
 * Description: A jQuery plugin that paints an image to canvas and calulates a base color
 * Requires: jQuery & quantize.js
 * Author: Bryan Stedman, http://bryanstedman.com
 * Copyright: Copyright 2013 Bryan Stedman
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */

;(function($, document, window, undefined) {
  "use strict";

  // Default options for the plugin as a simple object
  var defaults = {
    canvasID: 'baseColorCanvas',
    hideCanvas: true,
    canvasWidth: '200px',
    canvasHeight: '200px'
  };

  function colorMap(canvas, sx, sy, w, h, nc) {
    var index, indexBase, pdata, pixels, x, y, _i, _j, _ref, _ref1;
    if (nc === null) {
      nc = 8;
    }
    pdata = canvas.getContext("2d").getImageData(sx, sy, w, h).data;
    pixels = [];
    for (y = _i = sy, _ref = sy + h; _i < _ref; y = _i += 1) {
      indexBase = y * w * 4;
      for (x = _j = sx, _ref1 = sx + w; _j < _ref1; x = _j += 1) {
        index = indexBase + (x * 4);
        pixels.push([pdata[index], pdata[index + 1], pdata[index + 2]]);
      }
    }
    return (new MMCQ).quantize(pixels, nc);
  }

  function findColor (image, canvas) {
    var imgBaseColor = "";
      var bgColor, bgColorMap, bgPalette, color, rgbToCssString, _i, _j;
      image.height = Math.round(image.height * (200 / image.width));
      image.width = 200;
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
      bgColorMap = colorMap(canvas, 0, 0, image.width * 0.5, image.height, 4);
      bgPalette = bgColorMap.cboxes.map(function(cbox) {
        return {
          count: cbox.cbox.count(),
          rgb: cbox.color
        };
      });
      bgPalette.sort(function(a, b) {
        return b.count - a.count;
      });
      bgColor = bgPalette[0].rgb;

      rgbToCssString = function(color) {
        return "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
      };

      imgBaseColor = rgbToCssString(bgColor);

      return imgBaseColor;
    }


  $.fn.baseColor = function(options) {
    var canvas, newCanvas, image;
    this.options = $.extend({}, defaults, options);
    if ($('#'+this.options.canvasID).length == 0) {
      newCanvas = $('<canvas/>',{'id': this.options.canvasID}).width(200).height(200);
      $('body').append(newCanvas);
    }
    canvas = $('#'+this.options.canvasID)[0];
    $(canvas).css({
      'height': this.options.canvasHeight,
      'width': this.options.canvasWidth
    });
    if (this.options.hideCanvas) {
      $(canvas).hide();
    }
    image = new Image();
    image.src = $(this).attr('src');

    return findColor(image, canvas);

  };

})(jQuery, document, window);