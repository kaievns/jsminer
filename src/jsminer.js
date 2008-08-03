/**
 * this is the base game class
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
var JSMiner = new Class({
  // the basic element attribute
  element: null,
  
  // internal game modules
  opts: null, 
  game: null,
  ui: null,
  
  /**
   * constructor
   *
   * @param Element the base game element
   * @param Object options, optional pointers to the main 
   *        game containers. field, timer, score, smile
   * @return void
   */
  initialize: function(element, options) {
    this.element = $(element);
    
    this.game = new JSMiner.Game();    
    this.opts = new JSMiner.Options(this, options);
    this.ui = new JSMiner.UI(this);
    
    this.rebuild();
  },
  
  /**
   * sets the field size
   *
   * @param Integer width (cells)
   * @param Integer height (cells)
   * @return JSMiner self instance
   */
  setSize: function(width, height) {
    var allowed = true;
    if (this.game.isActive()) {
      var allowed = window.confirm("This will reset the current game\nProcess?");
    }
    if (allowed) {
      this.opts.setSize(width, height)
      this.rebuild();
    }
    
    return this;
  },
  
  /**
   * access to the game size 
   *
   * @return array [rows, cols]
   */
  getSize: function() {
    return this.opts.getSize();
  },
  
  /**
   * applies the given block size to the field
   *
   * @param String block-size name, see JSMiner.BLOCK_SIZES for aviable options
   * @return JSMiner self instance
   */
  setBlockSize: function(size) {
    this.opts.setBlockSize(size);
    this.ui.update();
    
    return this;
  },
  
  /**
   * returns the current block size name
   *
   * @return String block-size name
   */
  getBlockSize: function() {
    return this.opts.getBlockSize();
  },
  
  /**
   * sets the hardness level of the game
   *
   * @param String level name, see JSMiner.LEVELS object keys for aviable options
   * @return JSMiner self instance
   */
  setLevel: function(level) {
    var allowed = true;
    if (this.game.isActive()) {
      var allowed = window.confirm("This will reset the curren game\nProcess?");
    }
    if (allowed) {
      this.opts.setLevel(level);
      this.reset();
    }
    
    return this;
  },
  
  /**
   * returns the current hardness level name
   *
   * @return String level-name
   */
  getLevel: function() {
    return this.opts.getLevel();
  },
  
  /**
   * resets the state attributes
   *
   * @return JSMiner self instance
   */
  reset: function() {
    this.game.reset();
    this.ui.update();
    
    return this;
  },
  
  /**
   * rebuilds the game UI
   *
   * @return JSMiner self instance
   */
  rebuild: function() {
    this.game.reset();
    this.ui.build();
    
    return this;
  },
  
  /**
   * pauses the game
   *
   * @return
   */
  pause: function() {
    this.game.pause();
    this.ui.update();
  },
  
  /**
   * returns the check result if the game is paused
   *
   * @return boolean check result
   */
  paused: function() {
    return this.game.paused;
  },
  
  /**
   * checks if the game is active
   *
   * @return boolean check result
   */
  active: function() {
    return this.game.isActive();
  },
  
  /**
   * checks if the game is over with the bad result
   *
   * @return boolean check result
   */
  failed: function() {
    return this.game.isFailed();
  },
  
  /**
   * checks if the game over and the user won this one
   *
   * @return boolean check result
   */
  won: function() {
    return this.game.won;
  },

// package protected 
  /**
   * covers the game-map access
   *
   * @return Array the game map
   */
  getMinesMap: function() {
    return this.game.map;
  },
  
  /**
   * covers the game-mines num access
   *
   * @return Integer mines num
   */
  getMinesNum: function() {
    return this.game.mines;
  },
  
  /**
   * handles the cell hit event
   *
   * @param JSMiner.Cell cell
   * @return void
   */
  hitCell: function(cell) {
    this.game.hitCell(cell);
    this.ui.update(cell);
  },
  
  /**
   * handles the cell marking event
   * 
   * @param JSMiner.Cell cell
   * @return void
   */
  markCell: function(cell) {
    this.game.markCell(cell);
    this.ui.update(cell);
  }
});