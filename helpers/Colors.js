
// --color helpes

module.exports.randcolor = function () {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

module.exports.componentToHex = componentToHex;

// rgbToHex(0, 51, 255) => #0033ff
module.exports.rgbToHex = function (r, g, b) {
  const hexColor = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  return hexColor;
}

// hexToRgb("#0033ff").g => 51
// hexToRgb("#03f").g => 51
module.exports.hexToRgb = function (hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}
