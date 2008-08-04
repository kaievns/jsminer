/**
 * this class presents the options options unit test-case
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.OptionsTest = TestCase.create({
  name: 'JSMiner.OptionsTest',
  
  beforeAll: function() {
    this.mock(Cookie, 'read', function() { return null; });
    this.mock(Cookie, 'write', function() {});
    this.mock(Cookie, 'dispose', function() {});
  },
  
  afterAll: function() {
    this.undoMock(Cookie, 'read');
    this.undoMock(Cookie, 'write');
    this.undoMock(Cookie, 'dispose');
  },
  
  setup: function() {
    this.controller = {
      element: new Element('div'),
      
      active: function() { return false; },
      
      size: [8, 8],
      setSize: function(w,h) { this.size = [w, h]; },
      getSize: function() { return this.size },
      
      blockSize: 'normal',
      setBlockSize: function(size) { this.blockSize = size; },
      getBlockSize: function() { return this.blockSize; },
      
      level: 'normal',
      setLevel: function(l) { this.level = l; },
      getLevel: function() { return this.level; },
      
      game: {
        setSize: function() {},
        setLevel: function() {}
      }
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
  
  testResizerInitialization: function() { if (this.util.Browser.IE) { return false; }
    var sizes = new Element('select', {
      'html': '<option value="4x4">2x2</option>'+
              '<option value="8x8">8x8</option>'+
              '<option value="16x16">16x16</option>'
    });
    var options = new JSMiner.Options(this.controller, {sizeOptions: sizes});
    
    this.assertEqual('8x8', sizes.value);
    
    this.assertCalled(this.controller, 'setSize', function() {
      sizes.value = '16x16';
      sizes.onchange();
    }, this);
    
    this.assertEqual(['16', '16'], this.controller.getSize());
  },
  
  testBlockResizer: function() { if (this.util.Browser.IE) { return false; }
    var sizes = new Element('select', {
      'html': '<option value="tiny">Tiny</option>'+
              '<option value="small">Small</option>'+
              '<option value="normal">Normal</option>'
    });
    
    var options = new JSMiner.Options(this.controller, {blockOptions: sizes});
    
    this.assertEqual('normal', sizes.value);
    
    this.assertCalled(this.controller, 'setBlockSize', function() {
      sizes.value = 'small';
      sizes.onchange();
    });
    
    this.assertEqual('small', this.controller.getBlockSize());
  },
  
  testLevelChanger: function() { if (this.util.Browser.IE) { return false; }
    var levels = new Element('select', {
      'html': '<option value="easy">Easy</option>'+
              '<option value="normal">Normal</option>'+
              '<option value="hard">Hard</option>'+
              '<option value="unknown">Unknown</option>'
    });
    var options = new JSMiner.Options(this.controller, {levelOptions: levels});
    
    this.assertEqual('normal', levels.value);
    
    this.assertCalled(this.controller, 'setLevel', function() {
      levels.value = 'easy';
      levels.onchange();
    }, this);
    
    this.assertEqual('easy', this.controller.getLevel());
  },
  
  testSetSize: function() {
    var options = new JSMiner.Options(this.controller);
    
    this.assertEqual([JSMiner.DEFAULT_WIDTH, JSMiner.DEFAULT_HEIGHT], options.getSize());
    
    this.assertCalled(this.controller.game, 'setSize', function() {
      options.setSize(12, '14');
    });
    
    this.assertEqual([12, 14], options.getSize());
    
    // testing wrong size set
    options.setSize('notanum', -123);
    this.assertEqual([12, 14], options.getSize());
    
    // testing initial size set
    var options = new JSMiner.Options(this.controller, {
      width: 16, height: 4
    });
    this.assertEqual([16, 4], options.getSize());
  },
  
  testSetBlockSize: function() {
    var options = new JSMiner.Options(this.controller);
    
    this.assertEqual(JSMiner.DEFAULT_BLOCK_SIZE, options.getBlockSize());
    
    options.setBlockSize('big');
    this.assertEqual('big', options.getBlockSize());
    
    // testing unsupported block size
    options.setBlockSize('unsupported strange size');
    this.assertEqual('big', options.getBlockSize());
    
    // testing initial block-size set
    var options = new JSMiner.Options(this.controller, {
      blockSize: 'small'
    });
    this.assertEqual('small', options.getBlockSize());
  },
  
  testSetLevel: function() {
    var options = new JSMiner.Options(this.controller);
    
    this.assertEqual(JSMiner.DEFAULT_LEVEL, options.getLevel());
    
    this.assertCalled(this.controller.game, 'setLevel', function() {
      options.setLevel('hard');
    });
    
    this.assertEqual('hard', options.getLevel());
    
    // testing unsupported level set
    options.setLevel('unsupported level');
    this.assertEqual('hard', options.getLevel());
    
    // testing initial level set
    var options = new JSMiner.Options(this.controller, {
      'level': 'easy'
    });
    this.assertEqual('easy', options.getLevel());
  }
});