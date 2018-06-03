import { cube } from './main.js';
import _ from 'lodash';

if ( process.env.NODE_ENV !== 'production' ) {
  console.log( 'Looks like we are in development model' );
}

function component() {
  let element = document.createElement( 'pre' );  


  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube( 5 )
  ].join('\n\n');

  return element;
};

document.body.appendChild(component());

