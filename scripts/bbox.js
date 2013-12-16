
"use strict";
/*jslint browser: true, nomen: true*/

function BBox(top, right, bottom, left) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
}

/**
 * Determines if two bboxes are equal.
 */
BBox.prototype.equal = function (b) {
    if (b === null || b === undefined) {
        return false;
    }
    return this.top === b.top
        && this.right === b.right
        && this.bottom === b.bottom
        && this.left === b.left;
};

/**
 * The smallest bounding box containing this bounding box and another.
 */
BBox.prototype.union = function (b) {
    var top, right, bottom, left;

    if (b === null) {
        return this;
    }

    if (this.top === undefined) {
        top = b.top;
    } else if (b.top === undefined) {
        top = this.top;
    } else {
        top    = Math.min(this.top, b.top);
    }

    if (this.right === undefined) {
        right = b.right;
    } else if (b.right === undefined) {
        right = this.right;
    } else {
        right  = Math.max(this.right, b.right);
    }

    if (this.bottom === undefined) {
        bottom = b.bottom;
    } else if (b.bottom === undefined) {
        bottom = this.bottom;
    } else {
        bottom = Math.max(this.bottom, b.bottom);
    }

    if (this.left === undefined) {
        left = b.left;
    } else if (b.left === undefined) {
        left = this.left;
    } else {
        left   = Math.min(this.left, b.left);
    }

    return new BBox(top, right, bottom, left);
};

module.exports = BBox;
