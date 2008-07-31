/**
 * this is the user-interface building object
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
JSMiner.UI = new Class({
  /**
   * builds up the ui
   *
   * @param JSMiner controller
   * @return void
   */
  build: function(manager) {
    if (manager.field) { manager.game.fillMap(4, 4);
      this.buildField(manager.field, manager.game.map);
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
  },
  
  
  buildCell: function(cell) {
    cell.element = new Element('div', {
      'class': 'cell'
    });
    
    if (cell.mined) {
      cell.element.innerHTML = ' ';
      cell.element.addClass('mined');
    } else {
      var mines_num = cell.nearMinesNum;
      cell.element.innerHTML = mines_num == 0 ? ' ' : mines_num;
      cell.element.addClass('near-mines-'+mines_num);
    }
        
    return cell.element;
  }
});