define([
  'knockout',
  'underscore',
  'storage',
  'constants',
  'localization',
  'jquery'
], function (ko, _, storage, constants, localization, $) {
  'use strict';

  ko.bindingHandlers.number = {
    init: function (el, valueAccessor, allBindingsAccessor, viewModel) {
      var source = ko.unwrap(valueAccessor());
      if (!source) {
        return;
      }

      var value = Number(source);
      el.textContent = isNaN(value) ? source : value.toFixed(2);
    }
  };

  ko.bindingHandlers.hidden = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      var value = ko.unwrap(valueAccessor());
      if (value.length > 0) {
        value = _.reduce(value, function (memo, val) { return memo || ko.unwrap(val); }, false);
      }

      ko.bindingHandlers.visible.update(element, function () { return !value; });
    }
  };
});