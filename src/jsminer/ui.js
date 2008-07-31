/**
 * this is the user-interface building object
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.UI = new Class({
  controller: null,
  
  /**
   * constructor
   *
   * @param JSMiner the game controller reference
   * @return void
   */
  initialize: function(controller) {
    this.controller = controller;
  },
  
  /**
   * builds up the ui
   *
   * @return void
   */
  build: function() {
    if (this.controller.field) {
      this.buildField(this.controller.field, this.controller.getMinesMap());
    }
  },
  
  /**
   * updates the elements states
   *
   * @return void
   */
  update: function() {
    if (this.controller.field) {
      this.updateField(this.controller.getMinesMap());
    }
  },
  
  updateField: function(map) {
    for (var i=0; i < map.length; i++) {
      for (var j=0; j < map[i].length; j++) {
        this.updateCell(map[i][j]);
      }
    }
  },
  
  updateCell: function(cell) {
    if (cell.marked) {
      cell.element.addClass('marked');
    } else {
      cell.element.removeClass('marked');
    }
    
    if (cell.explored) {
      if (cell.boomed) {
        cell.element.addClass('boomed');
      } else if (cell.mined) {
        cell.element.addClass('mined');
      } else if (cell.markedWrong) {
        cell.element.addClass('marked-wrong');
      } else {
        cell.element.innerHTML = cell.nearMinesNum == 0 ? ' ' : cell.nearMinesNum;
        cell.element.addClass('near-mines-'+cell.nearMinesNum);
      }
    }
  },
  
  /**
   * builds up the mines field area
   *
   * @param Element element
   * @param Array mines map
   * @return void
   */
  buildField: function(element, map) {
    element.innerHTML = '';
    
    for (var i=0; i < map.length; i++) {
      var row = new Element('div', { 'class': 'row' });
      for (var j=0; j < map[i].length; j++) {
        row.appendChild(this.buildCell(map[i][j]));
      }
      element.appendChild(row);
    }
    
    element.addClass('jsminer-field');
    
    if (row.offsetHeight) {
      var row_width = (row.getFirst('div.cell').offsetWidth * map[0].length) + 'px';
      element.getChildren('div.row').each(function(row) {
        row.style.width = row_width;
      });
    }
  },
  
  /**
   * builds the field cell element
   *
   * @param JSMiner.Cell cell reference
   * @return Element the cell element
   */
  buildCell: function(cell) {
    cell.element = new Element('div', {
      'class': 'cell',
      'events': {
        'click':       this.handleCellClick.bindWithEvent(this,[cell]),
        'contextmenu': this.handleCellClick.bindWithEvent(this,[cell])
      }
    });
        
    return cell.element;
  },
  
  /**
   * the cell clicks common handler
   *
   * @param Event event (mootools event)
   * @param JSMiner.Cell cell
   * @return void
   */
  handleCellClick: function(event, cell) {
    event.stop();
    var button = event.event['which'] ? event.event.which : event.event.button;
    if (event.shift || event.control || event.meta || button != 1) {
      this.controller.markCell(cell);
    } else {
      this.controller.hitCell(cell);
    }
  }
});