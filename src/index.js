function component() {
  let element = document.createElement('div');

  // loadsh(目前通过一个script脚本引入)对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], '' );

  return element;
};

document.body.appendChild(component());