// import _ from 'lodash';
// import printMe from './print.js';
// import './styles.css';
import { cube } from './main.js';

function component() {
  // let element = document.createElement('div');
  let element = document.createElement( 'pre' );  

  // lodash, now imported by this script
  // element.innerHTML = _.join(['Hello ', 'webpack4.10.1'], '' );

  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube( 5 )
  ].join('\n\n');

  return element;
};

// let element = component();
// document.body.appendChild(element);
document.body.appendChild(component());

// console.log(module.hot);
// if ( module.hot ) {
//   module.hot.accept('./print.js', function () {
//     console.log( 'Accepting the updated printMe module!' );
//     printMe();
//   //   document.body.removeChild( element );
//   //   element = component();    // 重新渲染页面后，component 更新 click 事件处理
//   //   document.body.appendChild( element );
//   });
// }