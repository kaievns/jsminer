/**
 * this class presents a field-cell unit
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.Cell = new Class({
  mined: null,
  boomed: null,
  marked: null,
  markedWrong: null,
  nearMinesNum: null,
  
  top: null,
  left: null,
  
  explored: null,
  
  /**
   * constructor
   *
   * @param Integer top position
   * @param Integer left position
   * @return void
   */
  initialize: function(top, left) {
    this.top = top;
    this.left = left;
    
    this.reset();
  },
  
  /**
   * resets the cell state
   *
   * @return void
   */
  reset: function() {
    this.mined = false;
    this.boomed = false;
    this.marked = false;
    this.markedWrong = false;
    this.nearMinesNum = 0;
    
    this.explored = false;
  }
});