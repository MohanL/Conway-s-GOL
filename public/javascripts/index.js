(function (window, document, undefined) {

  // code that should be taken care of right away

  window.onload = init;

  function init() {

    var socket = io();
    let cells = [];
    let myColor;

    socket.on('updateCanvas', function (latestCells) {
      cells = latestCells;
      draw();
    });

    socket.on('yourColor', function (color) {
      myColor = color;
      console.log(myColor);
      document.getElementsByClassName('square')[0].style.backgroundColor = myColor;
    });

    var canvas = document.getElementById('c').getContext('2d');
    canvas.strokeStyle = '#e1e1e1';
    canvas.fillStyle = 'cadetblue';

    /**
     * Draw cells on canvas
     */
    function draw() {
      canvas.clearRect(0, 0, 1512, 512);
      cells.forEach(function (row, x) {
        row.forEach(function (cell, y) {
          canvas.beginPath();
          canvas.rect(x * 8, y * 8, 8, 8);
          if (cell) {
            canvas.fill();
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