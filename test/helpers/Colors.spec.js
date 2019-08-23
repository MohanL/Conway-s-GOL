const colorHelpers = require('../../helpers/Colors');
const chai = require('chai');


describe('colorhelper tests', () => {
  it('function randcolor test should return random color', () => {
    const ranDolor = colorHelpers.randcolor();
    chai.expect(ranDolor.length).to.equal(7);
    chai.expect(ranDolor[0]).to.equal('#');
  })

  it('should return rgb givn hex', () => {
    chai.expect(colorHelpers.hexToRgb("#0033ff")).to.deep.equal([0, 51, 255]);
  });

  it('should return hex given rgb', () => {
    chai.expect(colorHelpers.rgbToHex(0, 51, 255)).to.equal('#0033ff');
  });
});