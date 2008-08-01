/**
 * Presents the JSMiner.Cell class unit-test
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.CellTest = TestCase.create({
  name: "JSMiner.CellTest",
  
  testInstance: function() {
    var cell = new JSMiner.Cell(1,2);
    
    this.assertEqual(1, cell.top);
    this.assertEqual(2, cell.left);
    this.assertEqual(0, cell.nearMinesNum);
    
    this.assertFalse(cell.mined);
    this.assertFalse(cell.boomed);
    this.assertFalse(cell.marked);
    this.assertFalse(cell.markedWrong);
    this.assertFalse(cell.explored);
  },
  
  testReset: function() {
    var cell = new JSMiner.Cell(1,2);
    
    // changing all the fields manually
    cell.explored = true;
    cell.marked = true;
    cell.mined = true;
    cell.nearMinesNum = 0;
    cell.markedWrong = true;
    cell.boomed = true;
    
    cell.reset();
    this.assertEqual(new JSMiner.Cell(1,2), cell);
  }
});