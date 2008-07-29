/**
 * this is the basic JSMiner class test
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
var JSMinerTest = TestCase.create({
  name: "JSMinerTest",
  
  testClassExistance: function() {
    this.assert(typeof(JSMiner) != 'undefined');
    this.assertInstanceOf(Function, JSMiner);
  },
  
  testInstance: function() {
    var element = new Element('div');
    
    var game = new JSMiner(element);
    this.assertSame(element, game.element);
    this.assertNull(game.field);
    this.assertNull(game.score);
    this.assertNull(game.timer);
    this.assertNull(game.smile);
    
    var field = new Element('div', {id: 'field'});
    var timer = new Element('div', {id: 'timer'});
    var score = new Element('div', {id: 'score'});
    var smile = new Element('div', {id: 'smile'});
    
    var game = new JSMiner(element, {
      'field': field,
      'timer': timer,
      'score': score,
      'smile': smile
    });
    
    this.assertSame(element, game.element);
    this.assertSame(field, game.field);
    this.assertSame(timer, game.timer);
    this.assertSame(score, game.score);
    this.assertSame(smile, game.smile);
    
    element.appendChild(field);
    element.appendChild(timer);
    element.appendChild(score);
    element.appendChild(smile);
    
    var game = new JSMiner(element);
    this.assertSame(element, game.element);
    this.assertSame(field, game.field);
    this.assertSame(timer, game.timer);
    this.assertSame(score, game.score);
    this.assertSame(smile, game.smile); 
  },
  
  testSize: function() {
    var game = new JSMiner(new Element('div'));
    
    this.assertEqual(game.DEFAULT_ROWS, game.rows);
    this.assertEqual(game.DEFAULT_COLS, game.cols);
    
    var game = new JSMiner(new Element('div'), {
      rows: 12, cols: 22
    });
    
    this.assertEqual(12, game.rows);
    this.assertEqual(22, game.cols);
  },
  
  testStateAttributes: function() {
    var game = new JSMiner(new Element('div'));
    
    this.assertEqual(Math.floor(game.rows * game.cols / game.minesConcentration), game.mines);
    this.assertEqual(0, game.found);
    this.assertEqual(0, game.seconds);
  }
});