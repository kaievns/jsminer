/**
 * this class presents the game options handling unit
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.extend({
  DEFAULT_WIDTH:  8,
  DEFAULT_HEIGHT: 8,
  DEFAULT_LEVEL:  'normal',
  DEFAULT_BLOCK_SIZE: 'normal',
  BLOCK_SIZES: ['big', 'small', 'normal'],
  LEVELS: { // levels cells on mine concentration
    'easy':   9,
    'normal': 6,
    'hard':   3
  } 
});

JSMiner.Options = new Class({
  // the game controller reference
  controller: null,
  
  // main elements references
  fieldElement: null,
  timerElement: null,
  scoreElement: null,
  smileElement: null,
  
  // the option elements references
  sizeOptionsElement: null,
  blockOptionsElement: null,
  levelOptionsElement: null,
  
  // the internal options (private), use set/get methods for access
  width: null,
  height: null,
  blockSize: null,
  level: null,
  
  /**
   * constructor
   *
   * @param JSMiner the controller reference
   * @param Object the user's options reference
   * @return void
   */
  initialize: function(controller, options) {
    var options = options || {};
    
    this.controller = controller;
    
    this.findPageElements(options);
    this.setDefaults(options);
    this.initOptionElements();
  },
  
  /**
   * sets the game-field size
   *
   * @param Integer width in cells
   * @param Integer height in cells
   * @return void
   */
  setSize: function(width, height) {
    var width = parseInt(width);
    var height = parseInt(height);
    
    this.width = (isNaN(width) || width < 1) ? (this.width || JSMiner.DEFAULT_WIDTH) : width;
    this.height = (isNaN(height) || height < 1) ? (this.height || JSMiner.DEFAULT_HEIGHT) : height;
    
    this.controller.game.setSize(this.width, this.height);
  },
  
  /**
   * returns the list of the game-field size
   *
   * @return Array [width, height]
   */
  getSize: function() {
    return [this.width, this.height];
  },
  
  /**
   * sets the hardness level for the game
   *
   * @param String level-name
   * @return void
   */
  setLevel: function(level) {
    this.level = JSMiner.LEVELS[level] ? level : (this.level || JSMiner.DEFAULT_LEVEL);
    
    this.controller.game.setLevel(JSMiner.LEVELS[this.level]);
  },
  
  /**
   * returns the current hardness level name
   *
   * @return String level-name
   */
  getLevel: function() {
    return this.level;
  },
  
  /**
   * sets the game-field block-size
   *
   * @param String block-size name
   * @return void
   */
  setBlockSize: function(size) {
    this.blockSize = JSMiner.BLOCK_SIZES.contains(size) ? size :
      (this.blockSize || JSMiner.DEFAULT_BLOCK_SIZE);
  },
  
  /**
   * returns the current game-field block-size name
   *
   * @return String block-size name
   */
  getBlockSize: function() {
    return this.blockSize;
  },

// protected
  /**
   * tries to find aviable page elements to work with
   *
   * @param Object user options
   * @return void
   */
  findPageElements: function(options) {
    var element = this.controller ? this.controller.element : new Element('div');
    
    ['field', 'timer', 'score', 'smile', 
     'size-options', 'block-options', 'level-options'
    ].each(function(id) {
      var name = id.camelCase();
      this[name+'Element'] = options[name] ? $(options[name]) : 
        (element.getElementById(id) || element.getFirst('#'+id));
    }, this);
  },
  
  /**
   * initalizes the object with defaults
   *
   * @param Object user options
   * @return void
   */
  setDefaults: function(options) {
    this.setSize(options['width'], options['height']);
    this.setBlockSize(options['blockSize']);
    this.setLevel(options['level']);
  },
  
  /**
   * tries to initialize all the aviable option elements
   *
   * @return void
   */
  initOptionElements: function() {
    if (this.sizeOptionsElement)  { this.initSizeOptions(); }
    if (this.blockOptionsElement) { this.initBlockOptions(); }
    if (this.levelOptionsElement) { this.initLevelOptions(); }
  },

  /**
   * initializes the game-size options switch
   *
   * @return void
   */
  initSizeOptions: function() {
    var size = this.getSize(), controller = this.controller;
    this.sizeOptionsElement.value = size[0] +'x'+ size[1];
    this.sizeOptionsElement.onchange = function() {
      var size = this.value.split('x');
      controller.setSize(size[0], size[1]);
      
      // reapplying the value, case controller might change nothing
      var size = controller.getSize();
      this.value = size[0] +'x'+ size[1]
    };
  },
  
  /**
   * initializes the block-size options switch
   *
   * @return void
   */
  initBlockOptions: function() {
    var controller = this.controller;
    this.blockOptionsElement.value = this.getBlockSize();
    this.blockOptionsElement.onchange = function() {
      controller.setBlockSize(this.value);
      
      // reapplying the value case the controller may change nothing
      this.value = controller.getBlockSize();
    };
  },
  
  /**
   * inits the severity level options switch element
   *
   * @returnv oid
   */
  initLevelOptions: function() {
    var controller = this.controller;
    this.levelOptionsElement.value = this.getLevel();
    this.levelOptionsElement.onchange = function() {
      controller.setLevel(this.value);
      
      // reapplying the value case the controller may change nothing
      this.value = controller.getLevel();
    };
  }
});