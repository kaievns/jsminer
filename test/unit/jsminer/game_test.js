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
    
    this.assertInstanceOf(Array, game.map);
    this.assert(game.rows, game.map.length);
    this.assert(game.cols, game.map[0].length);
    this.assertInstanceOf(JSMiner.Cell, game.map[0][0]);        
  },
  
  testAreaCellsFinder: function() {
    var game = new JSMiner.Game();
    
    var cells = game.areaCells(0, 0);
    this.assertEqual(4, cells.length);
    this.assertSame(game.map[0][0], cells[0]);
    this.assertSame(game.map[0][1], cells[1]);
    this.assertSame(game.map[1][0], cells[2]);
    this.assertSame(game.map[1][1], cells[3]);
    
    var cells = game.areaCells(1, 1);
    this.assertEqual(9, cells.length);
    this.assertSame(game.map[0][0], cells[0]);
    this.assertSame(game.map[0][1], cells[1]);
    this.assertSame(game.map[0][2], cells[2]);
    this.assertSame(game.map[1][0], cells[3]);
    this.assertSame(game.map[1][1], cells[4]);
    this.assertSame(game.map[1][2], cells[5]);
    this.assertSame(game.map[2][0], cells[6]);
    this.assertSame(game.map[2][1], cells[7]);
    this.assertSame(game.map[2][2], cells[8]);
    
    var cells = game.areaCells(game.map.length-1, game.map[0].length-1);
    this.assertEqual(4, cells.length);
    this.assertSame(game.map[game.map.length-2][game.map[0].length-2], cells[0]);
    this.assertSame(game.map[game.map.length-2][game.map[0].length-1], cells[1]);
    this.assertSame(game.map[game.map.length-1][game.map[0].length-2], cells[2]);
    this.assertSame(game.map[game.map.length-1][game.map[0].length-1], cells[3]);
  },
  
  testMapFillingUp: function() {
    var game = new JSMiner.Game();
    game.fillMap();
    
    var mines_count = 0;
    var near_mines_count = 0;
    for (var i=0; i < game.rows; i++) {
      for (var j=0; j < game.cols; j++) {
        if (game.map[i][j].mined) {
          mines_count ++;
        } else {
          near_mines_count += game.map[i][j].nearMinesNum;
        }
      }
    }
    
    this.assertEqual(game.mines, mines_count);
    this.assert(near_mines_count >= game.mines);
  }
});