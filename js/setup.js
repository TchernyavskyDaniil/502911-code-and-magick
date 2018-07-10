'use strict';
(function () {
  /**
   * Minimum value
   * @const {number} MIN_RANGE
   */
  var MIN_RANGE = 0;

  /**
   * How much wizards in list
   * @const {number} MAGE_COUNT
   */
  var MAGE_COUNT = 4;

  /**
   * Properties of wizards
   * @type {object}
   */
  var wizardParams = {
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
  };

  var userDialog = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  /**
   * Fill array of wizards
   * @param {number} length
   * @return {Array}
   */
  var generateWizardsArray = function (length) {
    var newArr = [];
    for (var i = 1; i <= length; i++) {
      newArr.push(generateWizard());
    }

    return newArr;
  };

  /**
   * Create wizard object
   * @return {Object}
   */
  var generateWizard = function () {
    return {
      name: wizardParams.NAMES[getRandomNumber(MIN_RANGE, wizardParams.NAMES.length - 1).toFixed()] + ' ' + wizardParams.SURNAMES[getRandomNumber(MIN_RANGE, wizardParams.SURNAMES.length - 1).toFixed()],
      coatColor: wizardParams.COAT_COLORS[getRandomNumber(MIN_RANGE, wizardParams.COAT_COLORS.length - 1).toFixed()],
      eyesColor: wizardParams.EYES_COLORS[getRandomNumber(MIN_RANGE, wizardParams.EYES_COLORS.length - 1).toFixed()]
    };
  };

  /**
   * Render random wizard
   * @param {Object} wizard
   * @return {Node}
   */
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  /**
   * Create array of wizards
   * @param {Array} wizardArr
   * @return {DocumentFragment}
   */
  var createWizard = function (wizardArr) {
    var fragment = document.createDocumentFragment();

    wizardArr.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });

    return fragment;
  };

  /**
   * Return random number between the interval min (inclusive) - max (inclusive)
   * @param {number} min - number opacity
   * @param {number} max - number opacity
   * @return {number} - random number
   */
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  userDialog.classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
  similarListElement.appendChild(createWizard(generateWizardsArray(MAGE_COUNT)));
})();
