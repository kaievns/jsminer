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
        var cell = map[i][j];
        
        if (cell.mined) {
          cell.element.innerHTML = 'M';
        } else {
          cell.element.innerHTML = cell.nearMinesNum == 0 ? ' ' : cell.nearMinesNum;
          cell.element.addClass('near-mines-'+cell.nearMinesNum);
        }
        
        row.appendChild(cell.element);
      }
      element.appendChild(row);
    }
    
    element.addClass('jsminer-field');
  }
});