/**
 * this is the basic JSMiner class test
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
 */
var JSMinerTest = TestCase.create({
  name: "JSMinerTest",
  
  testInstance: function() {
    var element = new Element('div');
    
    var miner = new JSMiner(element); /*
    this.assertSame(element, miner.element);
    this.assertNotNull(miner.options);
    this.assertNotNull(miner.game);
    this.assertNotNull(miner.ui);
  },
  
  testSize: function() {
    var miner = new JSMiner();
    
    this.assertCalled(miner.options, 'setSize', function() {
      miner.setSize(16, 8);
    });
    
    this.assertEqual([16, 8], miner.getSize()); */
  }
});