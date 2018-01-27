'use strict';

window.renderStatistics = function (ctx, names, times) {
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
  var headerParams = {
    TEXT: 'Ура, вы победили! Список результатов:',
    MARGIN_LEFT: 120,
    MARGIN_TOP: 40,
    LINE_HEIGHT: 25,
    TEXT_WIDTH: 200
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
  
};
