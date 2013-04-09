jQuery Base Color
A jQuery plugin that calulates a dominant base color of an image by painting it to canvas. It depends on jQuery and quantize.js.

## Usage
Basic usage is a simple as passing jquery an image and then calling baseColor() on it.
`$(img).baseColor();`

### Options
You can pass several options to baseColor. The defaults are:
canvasID: 'baseColorCanvas',  
hideCanvas: true,  
canvasWidth: '200px',  
canvasHeight: '200px'  

**canvasID** - this lets you specify the id of the canvas tag in which to paint your image. If it exists on the page the plugin will use it, if not it will create it.

**hideCanvas** - if you don't want to see the image painted to the canvas you can set this to true and the magic will happen invisibly 

**canvasWidth** - you can specify the width of the canvas tag

**canvasHeight** - similar to canvasWidth, you are free to set the dimensions of the canvas that holds the image

An example usage with options might look like:
`$('.container img').baseColor({
  canvasID: 'my-canvas',
  hideCanvas: false,
  canvasWidth: '100px',
  canvasHeight: '100px'
});`