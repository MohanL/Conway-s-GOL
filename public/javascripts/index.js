(function (window, document, undefined) {

  // code that should be taken care of right away

  window.onload = init;

  function init() {

    var socket = io();
    let cells = [];
    let myColor;
    let others = {};

    socket.on('updateCanvas', function (updateCanvas) {
      cells = updateCanvas.data;
      others = updateCanvas.others;
      draw();
    });

    socket.on('yourColor', function (color) {
      myColor = color;
      document.getElementsByClassName('square')[0].style.backgroundColor = myColor;
    });

    var canvasElement = document.getElementById('c');
    var canvas = canvasElement.getContext('2d');
    canvas.strokeStyle = '#ddd';
    canvas.fillStyle = 'cadetblue';
    elemLeft = canvasElement.offsetLeft,
      elemTop = canvasElement.offsetTop,
      elements = [];

    //report the mouse position on click
    canvasElement.addEventListener("click", function (evt) {
      var mousePos = getMousePos(canvasElement, evt);

      const answer1 = { x: evt.offsetX || evt.layerX, y: evt.offsetY || evt.layerY };
      socket.emit('registerPoint', mousePos);
    }, false);

    //Get Mouse Position
    function getMousePos(canvasElement, evt) {
      var rect = canvasElement.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }

    /**
     * Draw cells on canvas
     */
    function draw() {
      canvas.clearRect(0, 0, 900, 600);

      cells.forEach(function (row, x) {
        row.forEach(function (cell, y) {
          canvas.beginPath();
          canvas.rect(x * 10, y * 10, 10, 10);
          if (cell) {
            if (cell == 1)
              canvas.fill();
            else {
              canvas.fillStyle = cell;
              canvas.fill();
              canvas.fillStyle = 'cadetblue';
            }
          } else {
            canvas.stroke();
          }
        });
      });
    }
  }

})(window, document, undefined);