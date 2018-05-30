import _ from 'lodash';
import printMe from './print.js';

function component() {
  let element = document.createElement('div');
  let btn = document.createElement( 'button' );

  // lodash, now imported by this script
  element.innerHTML = _.join(['Hello ', 'webpack4.10.1'], '' );

  btn.innerHTML = 'Click me and check the console！';
  btn.onclick = printMe;

  element.appendChild( btn );

  return element;
};

document.body.appendChild(component());
