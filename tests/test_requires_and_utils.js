'use strict';

goog.provide('Blockly.Test');

goog.require('Blockly');

/**
 * in full compilation mode, these get built out into separate packages
 * (e.g., blocks_compressed.js / javascript_compressed.js)
 * for the test and playground no-build-required scenario,
 * require all example blocks
 */
goog.require('Blockly.Blocks.colour');
goog.require('Blockly.Blocks.functionalExamples');
goog.require('Blockly.Blocks.functionalParameters');
goog.require('Blockly.Blocks.functionalProcedures');
goog.require('Blockly.Blocks.lists');
goog.require('Blockly.Blocks.logic');
goog.require('Blockly.Blocks.loops');
goog.require('Blockly.Blocks.math');
goog.require('Blockly.Blocks.procedures');
goog.require('Blockly.Blocks.text');
goog.require('Blockly.Blocks.variables');
goog.require('Blockly.JavaScript');
goog.require('Blockly.JavaScript.colour');
goog.require('Blockly.JavaScript.functionalExamples');
goog.require('Blockly.JavaScript.functionalParameters');
goog.require('Blockly.JavaScript.functionalProcedures');
goog.require('Blockly.JavaScript.lists');
goog.require('Blockly.JavaScript.logic');
goog.require('Blockly.JavaScript.loops');
goog.require('Blockly.JavaScript.math');
goog.require('Blockly.JavaScript.procedures');
goog.require('Blockly.JavaScript.text');
goog.require('Blockly.JavaScript.variables');

/**
 * @returns {Element}
 */
Blockly.Test.initializeBlockSpaceEditor = function (opt_options) {
  var container = document.createElement('div');
  document.body.appendChild(container);
  container.style.width = 500 + 'px';
  container.style.height = 500 + 'px';
  Blockly.assetUrl = function(){return ''};
  Blockly.Css.inject(container);
  Blockly.hasVerticalScrollbars = true;
  Blockly.mainBlockSpaceEditor = new Blockly.BlockSpaceEditor(container, opt_options);
  Blockly.mainBlockSpace = Blockly.mainBlockSpaceEditor.blockSpace;
  return container;
};

Blockly.Test.testWithReadOnlyBlockSpaceEditor = function (callback) {
  var container = document.createElement('div');
  document.body.appendChild(container);
  container.style.width = 500 + 'px';
  container.style.height = 500 + 'px';
  var blockSpaceEditor = new Blockly.BlockSpaceEditor(container, {
    readOnly: true
  });
  callback(blockSpaceEditor);
  goog.dom.removeNode(container);
};

/**
 * Drag the given block to the target destination using mouse events.
 * @param block {Blockly.Block}
 * @param destination {Blockly.Connection|Object}
 */
Blockly.Test.simulateDrag = function (block, destination = {dx: 100, dy: 100}) {
  let {dx, dy} = destination;
  if (destination instanceof Blockly.Connection) {
    dx = destination.x_ - block.outputConnection.x_;
    dy = destination.y_ - block.outputConnection.y_;
  }

  block.getSvgRoot().dispatchEvent(new MouseEvent('mousedown'));
  document.dispatchEvent(new MouseEvent('mousemove', {clientX: dx, clientY: dy}));
  document.dispatchEvent(new MouseEvent('mouseup'));
};
