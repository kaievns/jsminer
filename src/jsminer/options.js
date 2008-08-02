/**
 * this class presents the game options handling unit
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.extend({
  DEFAULT_ROWS: 8,
  DEFAULT_COLS: 8,
  DEFAULT_MINES_CONCENTRATION: 6,  // cells on mine
  DEFAULT_BLOCK_SIZE: 'normal' // 'small' or 'tiny' 
});

JSMiner.Options = new Class({
  controller: null,
  
  fieldElement: null,
  timerElement: null,
  scoreElement: null,
  smileElement: null,
  
  sizeOptionsElement: null,
  blockOptionsElement: null,
  levelOptionsElement: null,
  
  /**
   * constructor
   *
   * @param JSMiner the controller reference
   * @param Object the user's options reference
   * @return void
   */
  initialize: function(controller, options) {
    this.controller = controller;
    
    var element = controller ? controller.element : new Element('div');
    var options = options || {};
    
    ['field', 'timer', 'score', 'smile', 
     'size-options', 'block-options', 'level-options'
    ].each(function(id) {
      var name = id.camelCase();
      this[name+'Element'] = options[name] ? $(options[name]) : 
        (element.getElementById(id) || element.getFirst('#'+id));
    }, this);
    
    if (this.sizeOptionsElement)  { this.initSizeOptions(); }
    if (this.blockOptionsElement) { this.initBlockOptions(); }
  },

// protected

  /**
   * initializes the game-size options switch
   *
   * @return void
   */
  initSizeOptions: function() {
    var size = this.controller.getSize(), $this = this;
    this.sizeOptionsElement.value = size[0] +'x'+ size[1];
    this.sizeOptionsElement.onchange = function() {
      var allowed = true;
      if ($this.controller.active()) {
        allowed = window.prompt("Resize will reset the current game\nProcess?");
      }
      if (allowed) {
        var size = this.value.split('x');
        $this.controller.setSize(parseInt(size[0]), parseInt(size[1]));
      }
    };
  },
  
  /**
   * initializes the block-size options switch
   *
   * @return void
   */
  initBlockOptions: function() {
    var $this = this;
    this.blockOptionsElement.value = this.controller.getBlockSize();
    this.blockOptionsElement.onchange = function() {
      $this.controller.setBlockSize(this.value);
    };
  }
});