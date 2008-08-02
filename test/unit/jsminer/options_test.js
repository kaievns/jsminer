/**
 * this class presents the options options unit test-case
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.OptionsTest = TestCase.create({
  name: 'JSMiner.OptionsTest',
  
  setup: function() {
    this.controller = {
      element: new Element('div'),
      
      active: function() { return false; },
      
      size: [8, 8],
      setSize: function(w,h) { this.size = [w, h]; },
      getSize: function() { return this.size }
    };
  },
  
  testElementsRecognition: function() {
    var element = this.controller.element
    
    var options = new JSMiner.Options(this.controller);
    this.assertNull(options.fieldElement);
    this.assertNull(options.scoreElement);
    this.assertNull(options.timerElement);
    this.assertNull(options.smileElement);
    this.assertNull(options.sizeOptionsElement);
    this.assertNull(options.blockOptionsElement);
    this.assertNull(options.levelOptionsElement);
    
    var field = new Element('div', {id: 'field'});
    var timer = new Element('div', {id: 'timer'});
    var score = new Element('div', {id: 'score'});
    var smile = new Element('div', {id: 'smile'});
    var resizer = new Element('select', {id: 'size-options'});
    var severity_changer = new Element('select', {id: 'level-options'});
    var block_resizer = new Element('select', {id: 'block-options'});
    
    var options = new JSMiner.Options(this.controller, {
      'field': field,
      'timer': timer,
      'score': score,
      'smile': smile,
      'sizeOptions': resizer,
      'levelOptions': severity_changer,
      'blockOptions': block_resizer
    });
    
    this.assertSame(field, options.fieldElement);
    this.assertSame(timer, options.timerElement);
    this.assertSame(score, options.scoreElement);
    this.assertSame(smile, options.smileElement);
    this.assertSame(resizer, options.sizeOptionsElement);
    this.assertSame(severity_changer, options.levelOptionsElement);
    this.assertSame(block_resizer, options.blockOptionsElement);
    
    element.appendChild(field);
    element.appendChild(timer);
    element.appendChild(score);
    element.appendChild(smile);
    
    var options = new JSMiner.Options(this.controller);
    this.assertSame(field, options.fieldElement);
    this.assertSame(timer, options.timerElement);
    this.assertSame(score, options.scoreElement);
    this.assertSame(smile, options.smileElement);
    
    // FIXME seems to be a moo-tools bug
    //this.assertSame(resizer, options.sizeOptionsElement);
    //this.assertSame(severity_changer, options.levelOptionsElement);
    //this.assertSame(block_resizer, options.blockOptionsElement);
  },
  
  testResizerInitialization: function() {
    var sizes = new Element('select', {
      'html': '<option value="4x4">2x2</option>'+
              '<option value="8x8">8x8</option>'+
              '<option value="16x16">16x16</option>'
    });
    var options = new JSMiner.Options(this.controller, {
      sizeOptions: sizes
    });
    
    this.assertEqual('8x8', sizes.value);
    
    this.assertCalled([[this.controller, 'active'], [this.controller, 'setSize']], function() {
      sizes.value = '16x16';
      sizes.onchange();
    }, this);
    
    this.assertEqual([16, 16], this.controller.getSize());
  }
});