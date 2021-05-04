/**
 * Visual Blocks Editor
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
 * @fileoverview Image-only dropdown input field.
 */
'use strict';

goog.provide('Blockly.FieldImageDropdown');
goog.require('Blockly.Field');
goog.require('Blockly.FieldRectangularDropdown');
goog.require('Blockly.ImageDimensionCache');

/**
 * Class for a rectangular image dropdown field.
 * By default, will auto-size SVG block preview and HTML dropdown previews to image dimensions,
 * specifying a width / height will make the images scale to auto-fill
 * @param {(!Array.<string>|!Function)} menuGenerator An array of options
 *     for a dropdown list, where each choice is a tuple of [image path, value],
 *     or a function which generates these options
 * @extends {Blockly.FieldRectangularDropdown}
 * @constructor
 * @param width force the dropdown to use a given width
 * @param height force the dropdown to use a given height
 * @param {[Object]} buttons An array of object representing the text and
 *     actions associated with buttons to be displayed at the bottom of the
 *     dropdown list
 */
Blockly.FieldImageDropdown = function(menuGenerator, width, height, buttons) {
  this.width_ = width;
  this.height_ = height;
  this.menuGenerator_ = menuGenerator;
  Blockly.FieldImageDropdown.superClass_.constructor.call(
    this,
    menuGenerator,
    buttons
  );
  if (this.hasForcedDimensions_()) {
    this.updateDimensions_(this.width_, this.height_);
  }
};
goog.inherits(Blockly.FieldImageDropdown, Blockly.FieldRectangularDropdown);

Blockly.FieldImageDropdown.prototype.hasForcedDimensions_ = function() {
  return !!this.width_;
};

Blockly.FieldImageDropdown.prototype.addPreviewElementTo_ = function(
  parentElement
) {
  this.previewElement_ = Blockly.createSvgElement(
    'image',
    {
      height: Blockly.FieldImage.IMAGE_LOADING_HEIGHT + 'px',
      width: Blockly.FieldImage.IMAGE_LOADING_WIDTH + 'px',
      y: Blockly.FieldImage.IMAGE_OFFSET_Y
    },
    parentElement
  );
};

Blockly.FieldImageDropdown.prototype.updatePreviewData_ = function(
  previewData
) {
  this.previewElement_.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    previewData
  );
  if (this.hasForcedDimensions_()) {
    return;
  }

  this.getUpdatedDimensions_(previewData);
};

Blockly.FieldImageDropdown.prototype.createDropdownPreviewElement_ = function(
  imagePath
) {
  if (this.hasForcedDimensions_()) {
    return this.createAutoSizedDropdownPreviewElement_(
      imagePath,
      this.width_,
      this.height_
    );
  }
  return this.createImageDropdownPreviewElement_(imagePath);
};

/**
 * Creates an automatically-sized dropdown preview element for display within a goog.ui.MenuItem,
 * auto-filling a div of size width x height, with the image centered as the background.
 *
 * This is meant to match up with the canvas preview element's style preserveAspectRatio: "xMidYMid slice"
 * @param imagePath
 * @returns {HTMLElement} div with image in the background, centered and filling the background
 * @private
 */
Blockly.FieldImageDropdown.prototype.createAutoSizedDropdownPreviewElement_ = function(
  imagePath,
  width,
  height
) {
  var dropdownPreviewElement = document.createElement('div');
  dropdownPreviewElement.style.backgroundImage = "url('" + imagePath + "')";
  dropdownPreviewElement.style.backgroundSize = 'contain';
  dropdownPreviewElement.style.backgroundRepeat = 'no-repeat';
  dropdownPreviewElement.style.backgroundPosition = '50% 50%';
  dropdownPreviewElement.style.width = width + 'px';
  dropdownPreviewElement.style.height = height + 'px';
  return dropdownPreviewElement;
};

/**
 * Creates a simple preview image for display within a goog.ui.MenuItem dropdown element
 * @param imagePath
 * @returns {HTMLElement}
 * @private
 */
Blockly.FieldImageDropdown.prototype.createImageDropdownPreviewElement_ = function(
  imagePath
) {
  var dropdownPreviewElement = document.createElement('img');
  dropdownPreviewElement.setAttribute('crossOrigin', 'anonymous');
  dropdownPreviewElement.setAttribute('src', imagePath);
  return dropdownPreviewElement;
};

Blockly.FieldImageDropdown.prototype.getUpdatedDimensions_ = function(src) {
  // Update the preview dimensions now (if cached) or use a default + update later (if not yet loaded)
  var self = this;
  var dimensions = Blockly.ImageDimensionCache.getCachedDimensionsOrDefaultAndUpdate(
    src,
    function(width, height) {
      self.updateDimensions_(width, height);
    }
  );
  this.updateDimensions_(dimensions.width, dimensions.height);
};

Blockly.FieldImageDropdown.prototype.updatePreviewDimensions_ = function(
  previewWidth,
  previewHeight
) {
  this.previewElement_.setAttribute('width', previewWidth + 'px');
  this.previewElement_.setAttribute('height', previewHeight + 'px');
};
