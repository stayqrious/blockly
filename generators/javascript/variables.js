/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.variables');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.variables_get = function() {
  // Variable getter.
  var code = Blockly.JavaScript.translateVarName(this.getTitleValue('VAR'));
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.variables_set = function() {
  // Variable setter.
  var argument0 =
    Blockly.JavaScript.valueToCode(
      this,
      'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT
    ) || '0';
  var varName = Blockly.JavaScript.translateVarName(this.getTitleValue('VAR'));
  return varName + ' = ' + argument0 + ';\n';
};

Blockly.JavaScript.parameters_get = Blockly.JavaScript.variables_get;
Blockly.JavaScript.parameters_set = Blockly.JavaScript.variables_set;
Blockly.JavaScript.sprite_variables_get = Blockly.JavaScript.variables_get;
Blockly.JavaScript.sprite_variables_set = Blockly.JavaScript.variables_set;
