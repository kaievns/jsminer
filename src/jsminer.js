/**
 * this is the base game class
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
var JSMiner = new Class({
  // the basic element attribute
  element: null,
  
  // main elements attributes
  field: null,
  timer: null,
  score: null,
  smile: null,
  
  // the game-logic object 
  game: null,
  
  // the user-interface builder object
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
    var options = options || {};
    
    this.element = $(element);
    
    if (!this.element) { throw "Element is not found"; }
    
    // checking the basic elements location 
    ['field', 'timer', 'score', 'smile'].each(function(name) {
      if (options[name]) {
        this[name] = $(options[name]);
      } else {
        var child =  this.element.getElementById(name) || this.element.getFirst("#"+name);
        if (child) {
          this[name] = child;
        }
      }
    }, this);
    
    this.game = new JSMiner.Game();
    this.ui = new JSMiner.UI(this);
    
    this.setSize(options['rows'], options['cols']);
  },
  
  /**
   * sets the field size
   *
   * @param Integer rows number
   * @param Integer cols number
   * @return JSMiner self instance
   */
  setSize: function(rows, cols) {
    this.game.setSize(rows, cols)
    this.rebuild();
    
    return this;
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
    return !this.game.paused && !this.game.over && this.game.filledUp;
  },
  
  /**
   * checks if the game is over with the bad result
   *
   * @return boolean check result
   */
  failed: function() {
    return this.game.over && !this.game.won;
  },
  
  /**
   * checks if the game over and the user won this one
   *
   * @return boolean check result
   */
  won: function() {
    return this.game.won;
  },
  
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
    this.ui.update();
  },
  
  /**
   * handles the cell marking event
   * 
   * @param JSMiner.Cell cell
   * @return void
   */
  markCell: function(cell) {
    this.game.markCell(cell);
    this.ui.update();
  }
});