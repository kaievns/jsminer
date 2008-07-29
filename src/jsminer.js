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
  
  // field size attributes
  rows: null,
  cols: null,
  
  DEFAULT_ROWS: 8,
  DEFAULT_COLS: 8,
  
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
        var child = this.element.getFirst('div#'+name);
        if (child) {
          this[name] = child;
        }
      }
    }, this);
    
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
    this.rows = typeof(rows) == 'number' ? rows : this.rows || this.DEFAULT_ROWS;
    this.cols = typeof(cols) == 'number' ? cols : this.cols || this.DEFAULT_COLS;
  }
});