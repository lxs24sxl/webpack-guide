import { cube } from './main.js';
// import _ from 'lodash';

if ('serviceWorker' in navigator ) {
  window.addEventListener('load', (e) => {
    navigator.serviceWorker.register('/service-worker.js').then( registration => {
      console.log('SW register: ', registration );
    }).catch( registrationError => {
      console.log('SW registration failed: ', registrationError );
    });
  });
}

if ( process.env.NODE_ENV !== 'production' ) {
  console.log( 'Looks like we are in development model' );
}

function component() {
  let element = document.createElement( 'div' );  

  let pre = document.createElement( 'pre' );  
  let button = document.createElement( 'button' );
  let br = document.createElement( 'br' );
  button.innerHTML = 'Click me and look at the console!';
  pre.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube( 5 )
  ].join('\n\n') + join(['\n\nTest','shimming'], ' ');

  element.appendChild(pre);
  element.appendChild(br);
  element.appendChild(button);

  button.onclick = e => import(/* webpackChunkName: 'print'*/ './print').then( module => {
    let print = module.default;
    print();
  });
  return element;
};

document.body.appendChild(component());

