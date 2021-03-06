// Generated by CoffeeScript 1.6.1
(function() {
  var Intentware, defered_elements;

  Intentware = require('../../../../general/intentware/core');

  if (typeof window !== "undefined" && window !== null) {
    window.exports = Intentware.Ui;
  } else {
    return;
  }

  defered_elements = [];

  exports.bindElements = function() {
    var attribute, attribute_name_part, ijax_attribute, index, item, options_root, _i, _j, _k, _len, _len1, _ref, _ref1, _ref2, _results;
    _ref = $$('[ijax-ui-type]');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      options_root = {};
      _ref1 = item.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attribute = _ref1[_j];
        attribute_name_part = attribute.name.split('-');
        if (attribute_name_part[0] === 'ijax') {
          ijax_attribute = options_root;
          for (index = _k = 1, _ref2 = attribute_name_part.length; 1 <= _ref2 ? _k < _ref2 : _k > _ref2; index = 1 <= _ref2 ? ++_k : --_k) {
            ijax_attribute = ijax_attribute[attribute_name_part[index]] = index === attribute_name_part.length - 1 ? attribute.value : {};
          }
        }
      }
      _results.push(item.ijax = new Intentware.Ui[options_root.ui.type.replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
      })](item, options_root));
    }
    return _results;
  };

}).call(this);
