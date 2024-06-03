


import '@angular/localize/init';
import 'zone.js';
import 'classlist.js';
import 'web-animations-js';


if (typeof SVGElement.prototype.contains === 'undefined') {
  SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
}
