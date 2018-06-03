# webpack guide 

- 敲一遍官网指南
- webpack^4.10.1
- webpack-cli^2.1.4

#### 1.起步

-基本安装
```cmd
  mkdir webpack-demo && cd webpack-demo
  npm init -y
  npm install webpack webpack-cli --save-dev
```

#### 2. 管理资源
- webpack将动态打包(dynamically bundle)所有依赖项

##### 2.1 加载css，需要配置 style-loader 和 css-loader
```javascript
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
```

##### 2.2 加载图片，需要配置 file-loader
- 处理背景和图标这些图片

```javascript
module: {
  rules: [
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }
  ]
}
```

#### 2.3 加载字体
- file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录

```javascript
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
```

style.css
```css
@font-face {
  font-family: 'MyFont';
  src: url('./my-font.woff2') format('woff2');
       url('./my-font.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}

.hello {
  font-family: 'MyFont';
}
```

#### 2.4 加载数据 
- Nodejs 中 json 支持实际上是内置的，实际中使用 `import Data from './data.json` 默认将正常运行。
- 要导入CSV、TSV 和 XML, 可以使用 csv-loader 和 xml-loader。

```javascript
  module: {
    rules: [
      {
        test: /.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
```

data.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Mary</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Call Cindy on Tuesday</body>
</note>
```


#### 3. 管理输出

##### 3.1 不同入口输出不同名字

```javascript
module.exports = {
  // entry: './scr/index.js'
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}

```

##### 3.2 利用 HtmlWebpackPlugin插件 重新构建一个 index.html
- 需要先 npm install --save-dev html-webpack-plugin
- 执行完代码后，就会看到 HtmlWebpackPlugin 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中。
- [html-webpack-plugin配置](https://www.cnblogs.com/wonyun/p/6030090.html)

```javascript
  const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

  module.exports = {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ]
  }
```

##### 3.3 清理 /dist 文件

- 由于过去的指南和代码示例遗留下来，导致我们的 /dist 文件夹相当杂乱。webpack 会生成文件，然后将这些文件放置在 /dist 文件夹中，但是 webpack 无法追踪到哪些文件是实际在项目中用到的。
- 所以官方推荐使用 clean-webpack-plugin 来管理文件

```javascript
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    plugins: [
      new CleanWebpackPlugin(['dist'])
    ]
  }
```


#### 4. 开发

##### 4.1. 使用 webpack-dev-server: 它为你提供了一个简单的web服务器，并且能够实时重新加载
·npm install --save-dev webpack-dev-server·

webpack.config.js
```javascript
  module.exports = {
    // 需要告诉服务器( dev-server )，在哪里查找文件
    devServer: {
      contentBase: './dist'
    }
  }
```

package.json
```json
{
  "scripts" : {
    "start": "webpack-dev-server --open"
  }
}
```

##### 4.2. 使用 webpack-dev-middleware。 它是一个容器( warpper),它可用把webpack 处理后的文件传递给一个服务器( server )

[使用webpack-dev-middleware 和 webpack-hot-middleware 配置一个dev-server](https://blog.csdn.net/xiaoxiao520c/article/details/77771217)


#### 5. tree-shaking

- 描述移除 javascript 上下文中未引用的代码。（依赖于 es2015 模块系统中的 静态结构特性 ），例如 import 和 export。

官网说道: 在一个纯粹的 ESM 模块世界中，识别出哪些文件有副作用很简单。然而，我们的项目无法达到这种纯度，所以，此时有必要向 webpack 的 compiler 提供提示哪些代码是“纯粹部分”。

package.json
```json
{
  "name": "wtf",
  // "sideEffects": false,
  "sideEffects": [
    "./src/main.js",
    "*.css"
  ]
}
```

- 压缩输出
  UglifyJsPlugin。 webpack4x 可用通过启用 mode: production 来开启压缩

#### 6. 生产环境搭建

- 生产环境 ( development ) 和开发环境 ( production ) 的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载 ( live reloading )或 热模块替换 ( hot module replacement )能力的 source map 和 localhost server。 而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的webpack配置
- npm install --save-dev webpack-merge

webpack.common.js
```javascript
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

webpack.dev.js
```javascript
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
+
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
});
```
webpack.prod.js
```javascript
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin()
  ]
});
```




##### 6.1 NPM Scripts
package.json
```json
{
  "scripts": {
    "start": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  }
}
```

##### 6.2 webpack 鼓励开发者在生产环境中启用 source map，因为它们对调试源码(debug)和运行基准测试(benchmark tests)很有帮助。

```javascript
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
});
```


#### 7. 代码分离

##### 7.1 在这里的话，官网有个坑

三种常用的代码分离方法:
- 入口起点: 使用 entry 配置手动地分离代码
- 防止重复: 使用 ~~CommonsChunkPlugin~~ **optimization** 去重和分离 chunk。
- 动态导入: 通过模块的内联函数调用来分离代码

##### 7.2 入口起点
```javascript
module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve( __dirname, 'dist' )
  }
}
```


##### 7.3 防止重复( prevent duplication )
- 官网的文档存在缺陷，CommonsChunkPlugin 已经被webpack4x移除了，但是官网还放着 CommonsChunkPlugin,其实应当是在 配置文件 里面配置 optimization， 告知webpack需要提取 要求规格的文件 存储于 指定位置。

- [medium上的有关移除CommonsChunkPlugin的文章]()
```javascript
module.exports = {
  optimization: {
    cacheGroups: {
      commons: {
        name: 'commons',
        priority: 10,
        chunk: 'initial',
        minChunks: 2
      },
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        minChunks: 2,
        enforce: true
      }
    }
  }
}
```


#### 8. 懒加载
- 懒加载或者是按需加载，是一种很好的优化网页或应用的方式。
```javascript
button.onclick = e => import(/* webpackChunkName: "print"*/ './print').then( module => {
  let print = module.default;
  print();
});
```
- Vue懒加载: [Lazy Load in Vue using Webpack's code splitting](https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/)


#### 9. 缓存
- 通过命中缓存，以减低网络流量，使网站加载速度更快，然而，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。

- 输出文件名管理，通过使用output.filename 进行文件名替换，可以确保浏览器获取到修改后的文件。[hash] 替换可以哟你咋文件名中包括一个构建相关( build-specific)的hash,但是更好的方式是使用 [ chunkhash ] 替换，在文件名中包括一个 chunk 相关( chunk-specific )的哈希

```javascript
module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve( __dirname, 'dist' )
  }
}
```