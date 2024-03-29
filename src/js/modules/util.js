var currentColor = {
  r: 0xff,
  g: 0xff,
  b: 0xff
};

/**
 * equivalant to Math.abs();
 */
var fastAbs = function (value) {
  return (value ^ (value >> 31)) - (value >> 31);
};

var threshold = function (value) {
  return (value > 0x15) ? value : 0;
};

var aboveThreshold = function (value) {
  return (value > 0x15) ? false : true;
};

var cycleColor = function () {

  var color = {
    r: currentColor.r + (Math.random() * 10 - 5),
    b: currentColor.b + (Math.random() * 10 - 5),
    g: currentColor.g + (Math.random() * 10 - 5)
  };
  
  color.r = (color.r >= 0xff ? 0xff : (color.r <= 0 ? 0 : color.r));
  color.g = (color.g >= 0xff ? 0xff : (color.g <= 0 ? 0 : color.g));
  color.b = (color.b >= 0xff ? 0xff : (color.b <= 0 ? 0 : color.b));

  currentColor = color;

  return color;
};

var difference = function (target, data1, data2, lastBlend) {

  var i, len, avarage1, average2, diff, randomColor;

  if (data1.length !== data2.length) {
    return null;
  }

  randomColor = cycleColor();

  i = 0;
  len = data1.length * 0.25;
  while (i < len) {

    avarage1 = (data1[4 * i] + data1[4 * i + 1] + data1[4 * i + 2]) / 3;
    avarage2 = (data2[4 * i] + data2[4 * i + 1] + data2[4 * i + 2]) / 3;

    diff = aboveThreshold(fastAbs(avarage1 - avarage2));

    target[4 * i] = 0xff;
    target[4 * i + 1] = 0xff;
    target[4 * i + 2] = 0xff;
    target[4 * i + 3] = threshold(fastAbs(avarage1 - avarage2));

    if (lastBlend[4 * i + 3] !== 0) {
      target[4 * i] = randomColor.r;
      target[4 * i + 1] = randomColor.g;
      target[4 * i + 2] = randomColor.b;
      target[4 * i + 3] = Math.floor(lastBlend[4 * i + 3] * 0.9999);
    }

    ++i;
  }

};

module.exports = {
  threshold: threshold,
  aboveThreshold: aboveThreshold,
  difference: difference
};
