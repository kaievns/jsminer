/**
 * this class presents a field-cell unit
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.Cell = new Class({
  element: null,
  
  mined: false,
  marked: false,
  nearMinesNum: 0,
  
  initialize: function() {
    this.element = new Element('div');
  },
  
  hit: function() {
  },
  
  mark: function() {
  }
});