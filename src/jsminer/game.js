/**
 * class presents the game logic
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.extend({
  DEFAULT_ROWS: 8,
  DEFAULT_COLS: 8,
  DEFAULT_MINES_CONCENTRATION: 6  // cells on mine 
});

JSMiner.Game = new Class({
  // the field size 
  rows: null,
  cols: null,
  
  // how much cells on a mine 
  minesConcentration: null,
  
  // the game state attributes 
  mines: null,
  found: null,
  timer: null,
  
  initialize: function() {
    this.minesConcentration = JSMiner.DEFAULT_MINES_CONCENTRATION;
    this.setSize(JSMiner.DEFAULT_ROWS, JSMiner.DEFAULT_COLS);
  },
  
  /**
   * sets the field size
   *
   * @param Integer rows num
   * @param Integer cols num
   * @return void
   */
  setSize: function(rows, cols) {
    this.rows = typeof(rows) == 'number' ? rows : this.rows || JSMiner.DEFAULT_ROWS;
    this.cols = typeof(cols) == 'number' ? cols : this.cols || JSMiner.DEFAULT_COLS;
    
    this.reset();
  },
  
  /**
   * resets the game state
   *
   * @return void
   */
  reset: function() {
    this.mines = Math.floor(this.rows * this.cols / this.minesConcentration);
    this.found = 0;
    this.timer = 0;
  }
});