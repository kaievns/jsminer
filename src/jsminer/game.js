/**
 * class presents the game logic
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.extend({
  DEFAULT_ROWS: 8,
  DEFAULT_COLS: 8,
  DEFAULT_MINES_CONCENTRATION: 6  // cells on mine 
});

JSMiner.Game = new Class({
  // the field size 
  rows: null,
  cols: null,
  
  // how much cells on a mine 
  minesConcentration: null,
  
  // the game state attributes 
  mines: null,
  timer: null,
  
  // the field map
  map: null,
  
  // a flag if the game is paused
  paused: null,
  
  filledUp: null,
  
  over: null,
  won: null,
  
  initialize: function() {
    this.minesConcentration = JSMiner.DEFAULT_MINES_CONCENTRATION;
    this.setSize(JSMiner.DEFAULT_ROWS, JSMiner.DEFAULT_COLS);
  },
  
  /**
   * sets the field size
   *
   * @param Integer rows num
   * @param Integer cols num
   * @return void
   */
  setSize: function(rows, cols) {
    this.rows = typeof(rows) == 'number' && rows >= 1 ? rows : this.rows || JSMiner.DEFAULT_ROWS;
    this.cols = typeof(cols) == 'number' && cols >= 1 ? cols : this.cols || JSMiner.DEFAULT_COLS;
    
    this.map = null;
    this.reset();
  },
  
  /**
   * resets the game state
   *
   * @return void
   */
  reset: function() {
    this.mines = Math.floor(this.rows * this.cols / this.minesConcentration);
    this.timer = 0;
    this.filledUp = false;
    this.over = false;
    this.won = false;
    
    if (this.map) {
      this.resetMap();
    } else {
      this.buildMap();
    }
  },
  
  /**
   * runs the game
   *
   * @return void
   */
  run: function(top, left) {
    var top = top || Math.rand(this.rows);
    var left = left || Math.rand(this.cols);
    
    this.updateTimer.periodical(1000, this);
    this.paused = false;
  },
  
  /**
   * pauses the game
   *
   * @return void
   */
  pause: function() {
    this.paused = true;
  },
  
  /**
   * handles the cell hit
   *
   * @param JSMiner.Cell cell
   * @return void
   */
  hitCell: function(cell) {
    if (this.over) { return false; }
    
    if (!this.filledUp) {
      this.fillMap(cell.top, cell.left);
    }
    
    if (!cell.marked) {
      if (cell.explored) {
        this.trySiblingsAutoExplore(cell);
      } else {
        cell.explored = true;
        
        if (cell.mined) {
          cell.boomed = true;
          return this.gameOver();
        } else if (cell.nearMinesNum == 0) {
          this.trySiblingsAutoExplore(cell);
        }
        
        this.checkForWin();
      }
    }
  },
  
  /**
   * handles the cell marking/unmarking as mined
   *
   * @param JSMiner.Cell cell
   * @return void
   */
  markCell: function(cell) {
    if (this.over) { return false; }
    
    cell.marked = cell.explored ? false : !cell.marked;
    this.checkForWin();
  },
  
  /**
   * returns a flat list of all the map cells
   *
   * @return Array flat list
   */
  flatCells: function() {
    return this.map.flatten();
  },

// protected

  /**
   * updates the internal timer
   *
   * @return void
   */
  updateTimer: function() {
    if (!this.paused) {
      this.timer ++;
    }
  },
  
  /**
   * returns the list of cells around and include the coordinates
   *
   * @param Integer top position
   * @param Integer left position
   * @return Array
   */
  areaCells: function(top, left) {
    if (top instanceof JSMiner.Cell) {
      var left = top.left;
      var top = top.top;
    }
    var cells = [];
    
    var start_x = top > 0 ? top-1 : 0;
    var start_y = left > 0 ? left-1 : 0;
    var end_x = top < this.rows-1 ? top+2 : this.rows;
    var end_y = left < this.cols-1 ? left+2 : this.cols;
    
    for (var x=start_x; x < end_x; x++) {
      for (var y=start_y; y < end_y; y++) {
        cells.push(this.map[x][y]);
      }
    }
    
    return cells;
  },
  
  /**
   * resets the map states
   *
   * @return void
   */
  resetMap: function() {
    for (var i=0; i < this.rows; i++) {
      for (var j=0; j < this.cols; j++) {
        this.map[i][j].reset();
      }
    }
  },
  
  /**
   * builds the cells map
   *
   * @return void
   */
  buildMap: function() {
    this.map = [];
    for (var i=0; i < this.rows; i++) {
      this.map[i] = [];
      for (var j=0; j < this.cols; j++) {
        this.map[i][j] = new JSMiner.Cell(i, j);
      }
    }
    this.filledUp = false;
  },
  
  /**
   * fills up the map with mines
   *
   * @param Integer initial hit top position
   * @param Integer initial hit left position
   * @return void
   */
  fillMap: function(top, left) {
    // collecting cells around the given position
    var exclude = (arguments.length == 2 ? this.areaCells(top, left) : []).map(function(cell) {
      return cell.top +"-"+ cell.left;
    });
    
    // collecting aviable minning places
    var aviable_cells = [];
    for (var i=0; i < this.rows; i++) {
      for (var j=0; j < this.cols; j++) {
        if (!exclude.contains(i+"-"+j)) {
          aviable_cells.push([i, j]);
        }
      }
    }
    
    this.mineMap(aviable_cells);
    this.calculateNearMinesNums();
    
    this.filledUp = true;
  },
  
  /**
   * checks if the given cell's sibling cells can be harmless autoexplored
   * and if so call 'hit' on 'em
   *
   * @param JSMiner.Cell
   * @return void
   */
  trySiblingsAutoExplore: function(cell) {
    var siblings = this.areaCells(cell).erase(cell);
    
    // checking if autoexplration is possible
    var autoexplorable = true;
    siblings.each(function(cell) {
      if ((cell.mined && !cell.marked) || (cell.marked && !cell.mined)) {
        autoexplorable = false;
      }
    });
    
    if (autoexplorable) {
      siblings.each(function(cell) {
        if (!(cell.explored || cell.mined || cell.marked)) {
          this.hitCell(cell);
        }
      }, this);
    }
  },
  
  /**
   * checks if the game has been won
   *
   * @return void
   */ 
  checkForWin: function() {
    var finished = true;
    
    this.flatCells().each(function(cell) {
      if (!(cell.explored || cell.marked) || (cell.marked && !cell.mined)) {
        finished = false;
      }
    }, this);
    
    if (finished) {
      this.over = true;
      this.won = true;
    }
  },
  
  gameOver: function() {
    this.over = true;
    this.won = false;
    
    // exploring all the cells and mark wrong marked 
    this.flatCells().each(function(cell) {
       cell.explored = true;
       if (cell.marked && !cell.mined) {
         cell.markedWrong = true;
       }
    });
  },
  
// private
  /**
   * puts the mines on the map
   *
   * @param Array the list of aviable positions
   * @return void
   */
  mineMap: function(aviable_cells) {
    for (var i=0; i < this.mines; i++) {
      var pos = aviable_cells.getRandom();
      
      if (pos) { // for cases when there are no more places for mines 
        this.map[pos[0]][pos[1]].mined = true;
        
        aviable_cells.erase(pos);
      }
    }
  },
  
  /**
   * calculates the near-mines count markers of the cells
   *
   * @return void
   */
  calculateNearMinesNums: function() {
    for (var i=0; i < this.rows; i++) {
      for (var j=0; j < this.cols; j++) {
        if (!this.map[i][j].mined) {
          this.map[i][j].nearMinesNum = 0;
          
          var area_cells = this.areaCells(i, j);
          for (var k=0; k < area_cells.length; k++) {
            if (area_cells[k].mined) {
              this.map[i][j].nearMinesNum ++;
            }
          }
        }
      }
    }
  }
});