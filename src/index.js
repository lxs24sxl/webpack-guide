import _ from 'lodash';
import printMe from './print.js';
import './styles.css';

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

// let element = component();
// document.body.appendChild(element);
document.body.appendChild(component());

console.log(module.hot);
if ( module.hot ) {
  module.hot.accept('./print.js', function () {
    console.log( 'Accepting the updated printMe module!' );
    printMe();
  //   document.body.removeChild( element );
  //   element = component();    // 重新渲染页面后，component 更新 click 事件处理
  //   document.body.appendChild( element );
  });
}