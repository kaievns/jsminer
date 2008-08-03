/**
 * the JSMiner.UI class test
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.UITest = TestCase.create({
  name: "JSMiner.UITest",
  
  beforeAll: function() {
    this.fakeController = {
      opts: {
        fieldElement: new Element('div')
      },
      minesMap: [
        [new JSMiner.Cell(0,0),new JSMiner.Cell(0,1)],
        [new JSMiner.Cell(1,0),new JSMiner.Cell(1,1)]
      ],
      getMinesMap: function() {
        return this.minesMap;
      },
      hitCell: function(cell) {},
      markCell: function(cell) {}
    };
  },
  
  setup: function() {
    this.ui = new JSMiner.UI(this.fakeController);
  },
  
  testInstance: function() {
    this.assertSame(this.fakeController, this.ui.controller);
  },
  
  testBuildField: function() {
    this.assertCalled(this.fakeController, 'getMinesMap', function() {
      this.ui.build();
    }, this);
    
    var field = this.fakeController.opts.fieldElement;
    this.assertHasChild(field, "div.row");
    this.assertHasChild(field, "div.row > div.cell");
    
    this.fakeController.getMinesMap().flatten().each(function(cell) {
      this.assertNotNull(cell.element);
    }, this);
  },
  
  testCellEventsWiring: function() {
    this.ui.build();
    
    this.fakeController.getMinesMap().flatten().each(function(cell) {
      this.assertCalled(this.fakeController, 'hitCell', function() {
        this.fireClick(cell.element);
      }, this);
    }, this);
    
    this.fakeController.getMinesMap().flatten().each(function(cell) {
      this.assertCalled(this.fakeController, 'markCell', function() {
        this.fireClick(cell.element, {shiftKey: true});
      }, this);
    }, this);
  },
  
  testCellMarking: function() {
    this.ui.build();
    var cell = this.fakeController.minesMap[0][0];
    
    this.assertHasNoClassName(cell.element, 'marked');
    
    cell.marked = true;
    
    this.ui.update();
    this.assertHasClassName(cell.element, 'marked');
    
    cell.marked = false;
    
    this.ui.update();
    this.assertHasNoClassName(cell.element, 'marked');
  },
  
  testBoomedCellUpdating: function() {
    this.ui.build();
    var cell = this.fakeController.minesMap[0][0];
    
    this.assertHasNoClassName(cell.element, 'boomed');
    
    cell.explored = true;
    cell.boomed = true;
    cell.mined = true;
    
    this.ui.update();
    this.assertHasClassName(cell.element, 'boomed');
    this.assertHasNoClassName(cell.element, 'mined');
    this.assertHasNoClassName(cell.element, 'marked');
    this.assertHasNoClassName(cell.element, 'marked-wrong');
  },
  
  testMinedCellUpdating: function() {
    this.ui.build();
    var cell = this.fakeController.minesMap[0][0];
    
    this.assertHasNoClassName(cell.element, 'boomed');
    
    cell.explored = true;
    cell.boomed = false;
    cell.mined = true;
    
    this.ui.update();
    this.assertHasClassName(cell.element, 'mined');
    this.assertHasNoClassName(cell.element, 'boomed');
    this.assertHasNoClassName(cell.element, 'marked');
    this.assertHasNoClassName(cell.element, 'marked-wrong');
  },
  
  testMinedCellUpdating: function() {
    this.ui.build();
    var cell = this.fakeController.minesMap[0][0];
    
    this.assertHasNoClassName(cell.element, 'marked-wrong');
    
    cell.explored = true;
    cell.boomed = false;
    cell.mined = false;
    cell.markedWrong = true;
    
    this.ui.update();
    this.assertHasClassName(cell.element, 'marked-wrong');
    this.assertHasNoClassName(cell.element, 'mined');
    this.assertHasNoClassName(cell.element, 'boomed');
    this.assertHasNoClassName(cell.element, 'marked');
  },
  
  testCellsWithNearbyMinesUpdating: function() {
    this.ui.build();
    var cell = this.fakeController.minesMap[0][0];
    
    cell.explored = true;
    cell.boomed = false;
    cell.mined = false;
    cell.marked = false;
    cell.markedWrong = false;
    
    for (var i=0; i < 9; i++) {
      cell.nearMinesNum = i;
      this.ui.update();
      
      this.assertHasClassName(cell.element, 'near-mines-'+i);
      this.assertEqual( i==0 ? ' ' : ''+i, cell.element.innerHTML);
    }
  }
});