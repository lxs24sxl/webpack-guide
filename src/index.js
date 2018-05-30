import _ from 'lodash';
import './style.css';
import Gif from './loading.gif';
import Data from './data.xml';

function component() {
  let element = document.createElement('div');

  // lodash, now imported by this script
  element.innerHTML = _.join(['Hello ', 'webpack4.10.1'], '' );
  element.classList.add('hello');

  // 将图像添加到我们现有的 div
  let myImg = new Image();
  myImg.src = Gif;

  element.appendChild( myImg );

  console.log( Data );

  return element;
};

document.body.appendChild(component());
