
"use strict";
/*jslint browser: true, nomen: true*/

var BBox = require('./bbox'),
    Layout = require('./layout');

function Tsld() {
}

Tsld.prototype.BBox = BBox;

Tsld.prototype.bbox = function (top, right, bottom, left) {
    return new BBox(top, right, bottom, left);
};

Tsld.prototype.Layout = Layout;


module.exports = Tsld;

Tsld.VERSION = Tsld.prototype.VERSION = '0.1.0';

