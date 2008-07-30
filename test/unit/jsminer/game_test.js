/**
 * presents the game logic unit test
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.GameTest = TestCase.create({
  name: 'JSMiner.GameTest',
  
  testInstance: function() {
    var game = new JSMiner.Game();
    
    this.assertEqual(JSMiner.DEFAULT_ROWS, game.rows);
    this.assertEqual(JSMiner.DEFAULT_COLS, game.cols);
    this.assertEqual(JSMiner.DEFAULT_MINES_CONCENTRATION, game.minesConcentration);
    
    this.assertEqual(
      Math.floor(JSMiner.DEFAULT_ROWS*JSMiner.DEFAULT_COLS/JSMiner.DEFAULT_MINES_CONCENTRATION),
      game.mines
    );
    
    this.assertEqual(0, game.found);
    this.assertEqual(0, game.timer);        
  }
});