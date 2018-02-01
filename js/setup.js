'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var MAGE_COUNT = 4;

var MIN_RANGE = 1;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var generateArray = function () {
  var wizardArr = [];
  for (var i = 0; i < MAGE_COUNT; i++) {
    wizardArr.push(generateWizzard());
  }
  return wizardArr;
};

var generateWizzard = function () {
  return {
    name: getName(),
    coatColor: getCoatColor(),
    eyesColor: getEyesColor()
  };
};

var drawWizzards = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var generateDocumentFragment = function (arr) {
  var fragment = document.createDocumentFragment();

  arr.forEach(function (wizardArr) {
    var renderWizard = drawWizzards(wizardArr);
    fragment.appendChild(renderWizard);
  });
  return fragment;
};

var getName = function () {
  var randomName = getRandomNumber(MIN_RANGE, NAMES.length - 1).toFixed();
  var randomSurname = getRandomNumber(MIN_RANGE, SURNAMES.length - 1).toFixed();
  return NAMES[randomName] + ' ' + SURNAMES[randomSurname];
};

var getCoatColor = function () {
  var randomCoat = getRandomNumber(MIN_RANGE, COAT_COLORS.length - 1).toFixed();
  return COAT_COLORS[randomCoat];
};

var getEyesColor = function () {
  var randomEyes = getRandomNumber(MIN_RANGE, EYES_COLORS.length - 1).toFixed();
  return EYES_COLORS[randomEyes];
};
var getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

similarListElement.appendChild(generateDocumentFragment(generateArray()));
