/**
  * Check which cells are still alive.
  */
var app = require('../app');

var colorHelpers = require('./Colors');
let hexToRgb = colorHelpers.hexToRgb;
let rgbToHex = colorHelpers.rgbToHex;

module.exports = function () {

  // npc color 95, 158, 160
  const R2 = Math.pow(95, 2);
  const G2 = Math.pow(158, 2);
  const B2 = Math.pow(160, 2);

  let colorRSum;
  let colorGSum;
  let colorBSum;

  let result = [];
  let cells = app.pattern;
  /**
   * Return amount of alive neighbours for a cell
   */
  function _countNeighbours(x, y) {
    let amount = 0;
    colorRSum = 0;
    colorGSum = 0;
    colorBSum = 0;

    function _isFilled(x, y) {
      return cells[x] && cells[x][y];
    }

    if (_isFilled(x - 1, y - 1)) {
      if (cells[x - 1][y - 1] === 1) {
        colorRSum += R2;
        colorGSum += G2;
        colorBSum += B2;
      } else {
        let cellR, cellG, cellB;
        [cellR, cellG, cellB] = hexToRgb(cells[x - 1][y - 1]);
        colorRSum += Math.pow(cellR, 2);
        colorGSum += Math.pow(cellG, 2);
        colorBSum += Math.pow(cellB, 2);
      }
      amount++;
    }
    if (_isFilled(x, y - 1)) {
      if (cells[x][y - 1] === 1) {
        colorRSum += R2;
        colorGSum += G2;
        colorBSum += B2;
      } else {
        let cellR, cellG, cellB;
        [cellR, cellG, cellB] = hexToRgb(cells[x][y - 1]);
        colorRSum += Math.pow(cellR, 2);
        colorGSum += Math.pow(cellG, 2);
        colorBSum += Math.pow(cellB, 2);
      }
      amount++;
    }
    if (_isFilled(x + 1, y - 1)) {
      if (cells[x + 1][y - 1] === 1) {
        colorRSum += R2;
        colorGSum += G2;
        colorBSum += B2;
      } else {
        let cellR, cellG, cellB;
        [cellR, cellG, cellB] = hexToRgb(cells[x + 1][y - 1]);
        colorRSum += Math.pow(cellR, 2);
        colorGSum += Math.pow(cellG, 2);
        colorBSum += Math.pow(cellB, 2);
      }
      amount++;
    }
    if (_isFilled(x - 1, y)) {
      if (cells[x - 1][y] === 1) {
        colorRSum += R2;
        colorGSum += G2;
        colorBSum += B2;
      } else {
        let cellR, cellG, cellB;
        [cellR, cellG, cellB] = hexToRgb(cells[x - 1][y]);
        colorRSum += Math.pow(cellR, 2);
        colorGSum += Math.pow(cellG, 2);
        colorBSum += Math.pow(cellB, 2);
      }
      amount++;
    }
    if (_isFilled(x + 1, y)) {
      if (cells[x + 1][y] === 1) {
        colorRSum += R2;
        colorGSum += G2;
        colorBSum += B2;
      } else {
        let cellR, cellG, cellB;
        [cellR, cellG, cellB] = hexToRgb(cells[x + 1][y]);
        colorRSum += Math.pow(cellR, 2);
        colorGSum += Math.pow(cellG, 2);
        colorBSum += Math.pow(cellB, 2);
      }
      amount++;
    }
    if (_isFilled(x - 1, y + 1)) {
      if (cells[x - 1][y + 1] === 1) {
        colorRSum += R2;
        colorGSum += G2;
        colorBSum += B2;
      } else {
        let cellR, cellG, cellB;
        [cellR, cellG, cellB] = hexToRgb(cells[x - 1][y + 1]);
        colorRSum += Math.pow(cellR, 2);
        colorGSum += Math.pow(cellG, 2);
        colorBSum += Math.pow(cellB, 2);
      }
      amount++;
    }
    if (_isFilled(x, y + 1)) {
      if (cells[x][y + 1] === 1) {
        colorRSum += R2;
        colorGSum += G2;
        colorBSum += B2;
      } else {
        let cellR, cellG, cellB;
        [cellR, cellG, cellB] = hexToRgb(cells[x][y + 1]);
        colorRSum += Math.pow(cellR, 2);
        colorGSum += Math.pow(cellG, 2);
        colorBSum += Math.pow(cellB, 2);
      }
      amount++;
    }
    if (_isFilled(x + 1, y + 1)) {
      if (cells[x + 1][y + 1] === 1) {
        colorRSum += R2;
        colorGSum += G2;
        colorBSum += B2;
      } else {
        let cellR, cellG, cellB;
        [cellR, cellG, cellB] = hexToRgb(cells[x + 1][y + 1]);
        colorRSum += Math.pow(cellR, 2);
        colorGSum += Math.pow(cellG, 2);
        colorBSum += Math.pow(cellB, 2);
      }
      amount++;
    }

    return amount;
  }

  cells.forEach(function (row, x) {
    result[x] = [];
    row.forEach(function (cell, y) {
      var alive = 0,
        count = _countNeighbours(x, y);

      if (cell) {
        alive = count === 2 || count === 3 ? 1 : 0;
      } else {
        alive = count === 3 ? 1 : 0;
      }
      if (alive) {
        if (cell) {
          result[x][y] = cell;
        } else {
          const newCol = rgbToHex(parseInt(Math.sqrt(colorRSum / count)), parseInt(Math.sqrt(colorGSum / count)), parseInt(Math.sqrt(colorBSum / count)));
          result[x][y] = newCol;
        }
      }
      else
        result[x][y] = 0;
    });
  });

  app.pattern = result;
}