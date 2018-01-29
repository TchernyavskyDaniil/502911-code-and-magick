'use strict';

window.renderStatistics = function (ctx, names, times) {
  var maxTime;
  var colorMainPlayer = 'rgba(255, 0, 0, 1)';
  var minRange = 0.2;
  var maxRange = 1;

  /**
   * Parameters for cloud
   * @enum {number} cloudParams
   */
  var cloudParams = {
    POINT_X: 100,
    POINT_Y: 10,
    WIDTH: 420,
    HEIGHT: 270
  };

  /**
   * Parameters for histogram
   * @enum {number} histogramParams
   */
  var histogramParams = {
    HEIGHT: 150,
    WIDTH: 40,
    LINE_HEIGHT: 50,
    GAP: 40,
    TEXT_WIDTH: 50,
    BAR_HEIGHT: 40
  };

  /**
   * Parameters for header text
   * @enum {number, string} headerParams
   */
  var headerParams = {
    TEXT: 'Ура, вы победили! Список результатов:',
    MARGIN_LEFT: 150,
    MARGIN_TOP: 40,
    LINE_HEIGHT: 20,
    TEXT_WIDTH: 200
  };

  var barWidth = (cloudParams.WIDTH - histogramParams.GAP * 2 - histogramParams.TEXT_WIDTH) / 2;

  /**
   * Render multiline text
   * @param {object} context - Canvas Context
   * @param {string} text - Text to draw
   * @param {number} textWidth - Width text to draw
   * @param {number} lineHeight - Height text to draw
   * @param {number} marginLeft - Margin left text to draw
   * @param {number} marginTop - Margin top text to draw
   */
  var wrapText = function (context, text, textWidth, lineHeight, marginLeft, marginTop) {
    context.fillStyle = 'black';
    context.font = '16px PT Mono';

    var words = text.split(' ');
    var countWords = words.length;
    var line = '';

    for (var n = 0; n < countWords; n++) {
      var testLine = line + words[n] + ' ';
      var testWidth = context.measureText(testLine).width;
      if (testWidth > textWidth) {
        context.fillText(line, marginLeft, marginTop);
        line = words[n] + ' ';
        marginTop += lineHeight;
      } else {
        line = testLine;
      }
    }

    context.fillText(line, marginLeft, marginTop);
  };

  /**
   * Return random number between the interval min - max (max not inclusive)
   * @param {number} min - number opacity
   * @param {number} max - number opacity
   * @return {number} - random number
   */
  var getRandomNumber = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  /**
   * Drawing a histogram for our players
   * @param {number} time - how much time do you need to win
   * @param {string} name - player name
   * @param {number} i - number player
   */
  var drawHistogram = function (time, name, i) {
    ctx.fillText(time.toFixed(), cloudParams.POINT_Y + headerParams.MARGIN_LEFT + (histogramParams.GAP + histogramParams.BAR_HEIGHT) * i, cloudParams.HEIGHT + (-1 * (barWidth * time) / maxTime) - (0.5 * (histogramParams.LINE_HEIGHT)));
    ctx.fillStyle = (name === 'Вы') ? colorMainPlayer : 'rgba(0, 0, 255, ' + getRandomNumber(minRange, maxRange) + ')';
    ctx.fillRect(cloudParams.POINT_Y + headerParams.MARGIN_LEFT + (histogramParams.GAP + histogramParams.BAR_HEIGHT) * i, cloudParams.HEIGHT - headerParams.LINE_HEIGHT, histogramParams.BAR_HEIGHT, -1 * (barWidth * time) / maxTime);
    ctx.fillStyle = 'black';
    ctx.fillText(name, cloudParams.POINT_Y + headerParams.MARGIN_LEFT + (histogramParams.GAP + histogramParams.BAR_HEIGHT) * i, cloudParams.HEIGHT);
  };

  /**
   * Init shadow for cloud
   */
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(cloudParams.POINT_X + 10, cloudParams.POINT_Y + 10, cloudParams.WIDTH, cloudParams.HEIGHT);

  /**
   * Init background for cloud
   */
  ctx.fillStyle = '#fff';
  ctx.fillRect(cloudParams.POINT_X, cloudParams.POINT_Y, cloudParams.WIDTH, cloudParams.HEIGHT);

  wrapText(ctx, headerParams.TEXT, headerParams.TEXT_WIDTH, headerParams.LINE_HEIGHT, headerParams.MARGIN_LEFT, headerParams.MARGIN_TOP);

  maxTime = Math.max.apply(null, times);

  times.forEach(function (time, timeIndex) {
    drawHistogram(time, names[timeIndex], timeIndex);
  });
};
