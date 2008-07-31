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
  },
  
  testInitialHit: function() {
    var game = new JSMiner.Game();
    game.hitCell(game.map[0][0]);
    
    this.assert(game.filledUp);
    
    this.assert(game.map[0][0].explored);
    this.assertEqual(0, game.map[0][0].nearMinesNum);
  },
  
  // some helper
  smallUnexploredGame: function() {
    var game = new JSMiner.Game();
    game.setSize(4,4);
    game.fillMap();
    
    // manuall cells prepare
    game.flatCells().each(function(cell) {
      cell.nearMinesNum = 1;
      cell.explored = false;
      cell.mined = false;
    });
    
    return game;
  },
  
  testCellsMarking: function() {
    var game = this.smallUnexploredGame();
    
    var cell = game.map[0][0];
    
    this.assertFalse(cell.explored);
    this.assertFalse(cell.marked);
    
    game.markCell(cell);
    this.assert(cell.marked);
    this.assertFalse(cell.explored);
    
    game.hitCell(cell);
    this.assert(cell.marked);
    this.assertFalse(cell.explored);
    
    game.markCell(cell);
    this.assertFalse(cell.explored);
    this.assertFalse(cell.marked);
    
    game.hitCell(cell);
    this.assert(cell.explored);
    this.assertFalse(cell.marked);
  },
  
  testCellsExploration: function() {
    var game = this.smallUnexploredGame();
    
    var cell = game.map[0][0]; // a cell with some near mines
    
    game.hitCell(cell);
    this.assert(cell.explored);
    
    game.areaCells(cell).each(function(a_cell) {
      if (a_cell != cell) {
        this.assertFalse(a_cell.explored, "Check if the cell "+a_cell.top+":"+a_cell.left+" is not explored");
      }
    }, this);
    
    var cell = game.map[1][1];
    var area_cells = game.areaCells(cell);
    cell.nearMinesNum = 0;  // making an empty cell
    game.hitCell(cell);
    
    // checking that the nearby cells have been explored
    area_cells.each(function(cell) {
      this.assert(cell.explored, "Check if the cell "+cell.top+":"+cell.left+" has been explored");
    }, this);
    
    // checking that the cells out of the area still unexplored
    game.flatCells().each(function(cell) {
      if (!area_cells.contains(cell)) {
        this.assertFalse(cell.explored, "Check if the cell "+cell.top+":"+cell.left+" is not explored");
      }
    }, this);
  },
  
  testMinedCellsExploration: function() {
    var game = this.smallUnexploredGame();
    var cell = game.map[0][0];
    cell.mined = true;
    
    game.hitCell(cell);
    this.assert(game.over);
    
    game.flatCells().each(function(cell) {
      this.assert(cell.explored, "check if the cell "+cell.top+":"+cell.left+" autoexplored on game-over");
    }, this);
  },
  
  testSuccessfullGameFinish: function() {
    var game = this.smallUnexploredGame();
    
    game.flatCells().each(function(cell) {
      game.hitCell(cell);
    });
    
    // keep one cell unexplored
    game.map[0][0].reset();
    game.over = false;
    game.won = false;
    
    game.hitCell(game.map[0][0]);

    this.assert(game.over);
    this.assert(game.won);    
  }
});