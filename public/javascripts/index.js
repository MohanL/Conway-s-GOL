(function (window, document, undefined) {

  // code that should be taken care of right away

  window.onload = init;

  function init() {

    var socket = io();
    let cells = [];
    let myColor;
    let others = {};

    socket.on('updateCanvas', function (updateCanvas) {
      console.log('client receive updateCanvas');
      cells = updateCanvas.data;
      others = updateCanvas.others;
      draw();
    });

    socket.on('yourColor', function (color) {
      console.log('client receive yourColor');
      myColor = color;
      console.log(myColor);
      document.getElementsByClassName('square')[0].style.backgroundColor = myColor;
    });

    var canvasElement = document.getElementById('c');
    var canvas = canvasElement.getContext('2d');
    canvas.strokeStyle = '#ddd';
    canvas.fillStyle = 'cadetblue';
    elemLeft = canvasElement.offsetLeft,
      elemTop = canvasElement.offsetTop,
      elements = [];

    // Add event listener for `click` events.
    // canvasElement.onclick = function (event) {
    //   console.dir(event);
    // fill in color
    // based on previous value, push to backend
    //
    // }

    //report the mouse position on click
    canvasElement.addEventListener("click", function (evt) {
      var mousePos = getMousePos(canvasElement, evt);

      const answer1 = { x: evt.offsetX || evt.layerX, y: evt.offsetY || evt.layerY };
      console.dir(answer1.x + ', ' + answer1.y);
      console.log(mousePos.x + ',' + mousePos.y);
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

    // // Add element.
    // elements.push({
    //   colour: '#05EFFF',
    //   width: 150,
    //   height: 100,
    //   top: 20,
    //   left: 15
    // });

    // // Render elements.
    // elements.forEach(function (element) {
    //   canvas.fillStyle = element.colour;
    //   canvas.fillRect(element.left, element.top, element.width, element.height);
    // });​

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
              canvas.fillStyle = others[cell];
              canvas.fill();
              canvas.fillStyle = 'cadetblue';
            }
          } else {
            canvas.stroke();
          }
        });
      });

      // setTimeout(function () { update(); }, 70);
      //window.requestAnimationFrame(update); // Too fast!
    }
  }

})(window, document, undefined);