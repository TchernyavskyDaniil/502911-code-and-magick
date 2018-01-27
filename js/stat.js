'use strict';

window.renderStatistics = function (ctx, names, times) {
  var barWidth;
  var textY = 270;
  var maxTime;
  /**
   * Parameters cloud
   * @type {{POINT_X: number, POINT_Y: number, WIDTH: number, HEIGHT: number}}
   */
  var cloudParams = {
    POINT_X: 100,
    POINT_Y: 10,
    WIDTH: 420,
    HEIGHT: 270
  };
  /**
   * Parameters histogram
   * @type {{HEIGHT: number, WIDTH: number, LINE_HEIGHT: number, GAP: number, TEXT_WIDTH: number, BAR_HEIGHT: number}}
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
   * Parameters header text
   * @type {{TEXT: string, MARGIN_LEFT: number, MARGIN_TOP: number, LINE_HEIGHT: number, TEXT_WIDTH: number}}
   */
  var headerParams = {
    TEXT: 'Ура, вы победили! Список результатов:',
    MARGIN_LEFT: 150,
    MARGIN_TOP: 40,
    LINE_HEIGHT: 20,
    TEXT_WIDTH: 200
  };
  barWidth = (cloudParams.WIDTH - histogramParams.GAP * 2 - histogramParams.TEXT_WIDTH) / 2;
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
  /**
   * Render multiline text
   * @param {Object} context - Canvas Context
   * @param {String} text - Text to draw
   * @param {Number} textWidth - Width text to draw
   * @param {Number} lineHeight - Height text to draw
   * @param {Number} marginLeft - Margin left text to draw
   * @param {Number} marginTop - Margin top text to draw
   */
  function wrapText(context, text, textWidth, lineHeight, marginLeft, marginTop) {
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
  }
  wrapText(ctx, headerParams.TEXT, headerParams.TEXT_WIDTH, headerParams.LINE_HEIGHT, headerParams.MARGIN_LEFT, headerParams.MARGIN_TOP);
  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };
  maxTime = getMaxElement(times);
  /**
   * Render histogram with score and name players
   */
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(times[i].toFixed(), cloudParams.POINT_Y + headerParams.MARGIN_LEFT + (histogramParams.GAP + histogramParams.BAR_HEIGHT) * i, textY + (-1 * (barWidth * times[i]) / maxTime) - (0.5 * (histogramParams.LINE_HEIGHT)));
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')';
    ctx.fillRect(cloudParams.POINT_Y + headerParams.MARGIN_LEFT + (histogramParams.GAP + histogramParams.BAR_HEIGHT) * i, textY - headerParams.LINE_HEIGHT, histogramParams.BAR_HEIGHT, -1 * (barWidth * times[i]) / maxTime);
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], cloudParams.POINT_Y + headerParams.MARGIN_LEFT + (histogramParams.GAP + histogramParams.BAR_HEIGHT) * i, textY);
  }
};
