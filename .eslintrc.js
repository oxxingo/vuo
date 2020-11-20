/*
  让项目基于此配置文件进行规范检查与格式化，.eslintrc.js 配置文件将会覆盖 vscode 的 settings.json 关于 eslint 的配置
  需要安装 npm i eslint eslint-plugin-vue babel-eslint -D，vscode右下角eslint图标点击选择any where开启eslint校验
  settings.json 添加如下配置
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  }
  settings.json 不要有下面配置
  "eslint.autoFixOnSave": true

  eslint
  "off"   ->  0    关闭规则，不满足规则也不会提醒或者抛出异常
  "warn"  ->  1    开启警告规则，若不满足规则不会影响代码
  "error" ->  2    开启错误规则，若不满足规则会退出代码
*/
/* eslint-disable */            // eslint 禁用命令：ESLint 在校验的时候就会跳过后面的代码
/* eslint-disable no-new*/      // eslint 禁用命令，加入详细规则 no-new，这样就能避开指定的校验规则了

module.exports = {
  root: true,                                                                       // 当前配置为根配置，将不再从上级文件夹查找配置

  parserOptions: {
    parser: 'babel-eslint',                                                         // 采用 babel-eslint 作为语法解析器
    sourceType: 'module',                                                           // 指定来源的类型，有两种script 或 module
    ecmaVersion: 6                                                                  // 指定 ECMAScript支持的版本，6为ES6
  },

  env: {
    browser: true,                                                                  // 设置所检查的代码是在浏览器环境运行的
    node: true,                                                                     // 设置所检查的代码是在浏览器环境运行的
    jquery: true,
    es6: true                                                                       // 设置所检查的代码为 es6 语法书写
  },

  extends: ['plugin:vue/recommended', 'eslint:recommended'],                        // 扩展使用 vue 规则、eslint规则
  plugins: [],                                                                      // 配置插件，插件名称省略了eslint-plugin-，用来规范html的例如：eslint-plugin-html, plugins: ['html']
  settings: {},                                                                     // 添加参数，会提供给每一个规则，但是规则使不使用，看规则的设置


  /* 
    xxx / aaa: 这种格式的规则，表示 xxx 插件自定义的规则，省略了[eslint-plugin]前缀，例如：eslint-plugin-import 自定义规则
    'import/extension': ['error', 'always', { js: 'never', vue: 'never' }]
  */
  rules: {
    "strict": 0,                                                                    // 可以使用严格模式
    'linebreak-style': ['off', 'windows'],                                          // 
    // 'no-multi-spaces': 2,                                                        // 禁止在逻辑表达式，条件表达式，声明，数组元素，对象属性，序列和函数参数周围使用多个空格 （为了让注释能对齐，先注释掉）
    'no-multiple-empty-lines': [2, { max: 1 }],                                     // 最多一个空行
    'no-trailing-spaces': 2,                                                        // 不允许在行尾添加空白
    'quotes': [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],    // 双引号格式化为单引号    属性一：允许字符串使用单引号或双引号   属性二： 允许字符串使用反引号
    'semi': [2, 'never'],                                                           // 语句尾部不使用分号，semi semi-spacing 二选一配置
    'semi-spacing': [2, { before: false, after: true }],                            // 分号前后是否空格，  semi semi-spacing 二选一配置
    'arrow-spacing': [2, { before: true, after: true }],                            // =>箭头前后是否空格
    'accessor-pairs': 2,                                                            // 在对象中使用 getter/setter
    "no-constant-condition": 2,                                                     // 禁止在条件判断中使用常量表达式，例如 if(true) if(1)
    'brace-style': [2, '1tbs', { allowSingleLine: true }],                          // 大括号{}允许一行编写
    'camelcase': [0, { properties: 'always' }],                                     // 属性强制驼峰命名法
    'no-unused-vars': [2, { vars: 'all', args: 'none' }],                           // 消除未使用的变量，函数和函数的参数 // vars: 'all' 检查所有变量的使用情况，包括全局范围内的变量。这是默认设置。 args: ''none'不检查最后一个，after-used' 只有最后一个参数必须使用。例如，这允许您为函数使用两个命名参数，并且只要您使用第二个参数，ESLint 就不会警告您第一个参数。这是默认设置。
    'comma-dangle': [2, 'never'],                                                   // 是否允许对象中出现结尾逗号 var obj = {a: 'a',}
    'comma-spacing': [2, { before: false, after: true }],                           // 逗号前后是否空格
    'comma-style': [2, 'last'],                                                     // 换行时逗号在行首还是行尾
    'constructor-super': 2,                                                         // 非派生类不能调用super，派生类必须调用super
    // "consistent-this": [2, "that"],                                                 // 强制this别名为that
    'curly': [2, 'multi-line'],                                                     // 当一个块只包含一条语句时，是否允许省略花括号 all 不允许  multi-line 允许
    'dot-location': [2, 'property'],                                                // 对象访问符.的位置，换行时在行首还是行尾，property 位于同一行
    'eol-last': 2,                                                                  // 强制文件以换行符结束（LF）
    'eqeqeq': ['error', 'always', { null: 'ignore' }],                              // 强制使用全等、全不等
    'generator-star-spacing': [2, { before: true, after: true }],                   // 生成器中'*'两侧都要有间距 function * generator-star-spacing {}
    'global-require': 0,                                                            // 所有调用require()都位于模块的顶层，需关闭，因为函数体中也有需求调用require()实现懒加载
    'indent': [2, 2, { SwitchCase: 1 }],                                            // 缩进风格
    'key-spacing': [2, { beforeColon: false, afterColon: true }],                   // 对象中属性后冒号的前后空格
    'keyword-spacing': [2, { before: true, after: true }],                          // 关键字前后空格 如if、function
    'new-cap': [2, { newIsCap: true, capIsNew: false }],                            // 函数名大写必须使用new方式调用，小写必须用不带new方式调用
    'new-parens': 2,                                                                // new时必须加小括号
    'no-array-constructor': 1,                                                      // 不允许使用Array构造函数。除非要指定生成数组的长度
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',          // 只有开发环境才可以使用console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',         // 只有开发环境才可以使用debugger
    'no-class-assign': 2,                                                           // 禁止给类赋值
    'no-const-assign': 2,                                                           // 禁止修改const声明的变量
    'no-control-regex': 2,                                                          // 禁止在正则表达式中使用控制字符
    'no-delete-var': 2,                                                             // 不能对var声明的变量使用delete操作符
    'no-dupe-args': 2,                                                              // 函数参数不能重复
    'no-dupe-class-members': 2,                                                     // 对象中不允许重复的成员名，防止下面覆盖上面的情况
    'no-dupe-keys': 2,                                                              // 在创建对象字面量时不允许键重复 let obj = { a:1, a:1 }
    'no-duplicate-case': 2,                                                         // 不允许case一样的值
    'no-empty-character-class': 2,                                                  // 正则表达式中不允许出现空的字符组
    'no-eval': 2,                                                                   // 不允许使用eval
    'no-ex-assign': 2,                                                              // 禁止给catch语句中的异常参数赋值
    'no-extend-native': 2,                                                          // 不允许修改内建对象的原型 Array.propotype.xxx = () => {}
    'no-extra-boolean-cast': 2,                                                     // 禁止不必要的布尔转换
    'no-extra-parens': [2, 'functions'],                                            // 禁止非必要的括号
    'no-fallthrough': 2,                                                            // 禁止switch穿透
    'no-floating-decimal': 2,                                                       // 不允许浮点数缺失数字 0 .5 3.
    'no-func-assign': 2,                                                            // 禁止重复的函数声明
    'no-implied-eval': 2,                                                           // 禁止使用隐式eval
    'no-inner-declarations': [2, 'functions'],                                      // 不允许在嵌套代码块里声明函数，变量
    'no-invalid-regexp': 2,                                                         // 不允许在RegExp构造函数里出现无效的正则表达式
    'no-irregular-whitespace': 2,                                                   // 不能有不规则的空格，捕获无效的空格
    'no-iterator': 2,                                                               // 不允许使用__iterator__属性
    'no-label-var': 2,                                                              // label名不能与var声明的变量名相同
    'no-labels': [2, { allowLoop: false, allowSwitch: false }],                     // 禁止 js 中使用带标签的语句，label
    'no-lone-blocks': 2,                                                            // 禁止不必要的嵌套块
    'no-mixed-spaces-and-tabs': 2,                                                  // 禁止混用tab和空格进行缩进
    'no-multi-str': 2,                                                              // 不允许用\来让字符串换行
    'no-native-reassign': 2,                                                        // 不能重写native对象
    'no-new-object': 2,                                                             // 禁止使用new Object()
    'no-new-require': 2,                                                            // 禁止使用new require()
    'no-new-symbol': 2,                                                             // 禁止使用new symbol()
    'no-new-wrappers': 2,                                                           // 禁止使用new创建包装实例，new String new Boolean new Number
    'no-obj-calls': 2,                                                              // 不能调用内置的全局对象，比如Math() JSON()
    'no-octal': 2,                                                                  // 禁止使用八进制数字
    'no-octal-escape': 2,                                                           // 禁止使用八进制转义序列
    'no-path-concat': 2,                                                            // node中不能使用__dirname 或 _filename做路径拼接
    'no-redeclare': 2,                                                              // 不允许变量重复声明
    'no-regex-spaces': 2,                                                           // 正则表达式中不允许出现多个连续空格
    'no-return-assign': [2, 'except-parens'],                                       // return 语句中不能有赋值表达式
    'no-self-compare': 2,                                                           // 禁止比较自身
    'no-sequences': 2,                                                              // 禁止使用逗号运算符
    'no-sparse-arrays': 2,                                                          // 禁止稀疏数组， [1, ,2]
    'no-this-before-super': 2,                                                      // 在调用super()之前不能使用this或super
    'no-throw-literal': 2,                                                          // 禁止抛出字面量错误 throw "error";
    'no-useless-escape': 0,                                                         // 是否禁用不必要的转义字符
    'no-undef': 2,                                                                  // 不能有未定义的变量
    'no-undef-init': 2,                                                             // 变量初始化时不能直接给它赋值为undefined
    'no-unexpected-multiline': 2,                                                   // 避免多行表达式
    'no-unmodified-loop-condition': 2,                                              // 查找循环条件内的引用，然后检查这些引用的变量是否在循环中被修改
    'no-unneeded-ternary': [2, { defaultAssignment: false }],                       // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false
    'no-unreachable': 2,                                                            // 不能有无法执行的代码 return，throw，continue，和break语句后面还有语句
    'no-unsafe-finally': 2,                                                         // 不允许return，throw，break，和continue里面的语句有finally块
    'no-useless-call': 2,                                                           // 禁止不必要的call和apply
    'no-with': 2,                                                                   // 禁用 with
    'no-var': 2,                                                                    // 禁用 var
    'one-var': 0,                                                                   // 强制变量声明放在一起
    'operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' }}], // 换行时运算符在行尾还是行首
    'padded-blocks': [2, 'never'],                                                  // 块语句内，行首行尾是否要空行
    
    'space-before-blocks': [2, 'always'],                                           // 块{，前是否有空格
    'space-before-function-paren': ['error', {                                      // 函数定义时括号前面要不要有空格
      anonymous: 'always',                                                          // default: function () {}
      named: 'never',                                                               // vue 组件name属性值
      asyncArrow: 'always'
    }], 
    'space-in-parens': [2, 'never'],                                                // 小括号里面要不要有空格
    'space-infix-ops': 2,                                                           // 强制二元运算符左右各有一个空格
    'space-unary-ops': [2, { words: true, nonwords: false }],                       // words: true 如：new，delete，typeof，void，yield 左右必须有空格 // nonwords: false 一元运算符，如：-，+，--，++，!，!!左右不能有空格
    'spaced-comment': [                                                             // 注释要不要有空格
      2,
      'always',
      {
        markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }
    ], 
    'use-isnan': 2,                                                                 // 禁止比较时使用NaN，只能用isNaN()
    'valid-typeof': 2,                                                              // 必须使用合法的typeof的值
    'wrap-iife': [2, 'any'],                                                        // 立即执行函数表达式的小括号风格
    'yield-star-spacing': [2, 'both'],                                              // 强制执行*周围 yield*表达式的间距，两侧都必须有空格
    'yoda': [2, 'never'],                                                           // 禁止尤达条件
    'prefer-const': 2,                                                              // 使用let关键字声明的变量，但在初始分配后从未重新分配变量，应改为const声明
    'object-curly-spacing': [2, 'always', { objectsInObjects: true }],              // 大括号内是否允许不必要的空格
    'array-bracket-spacing': [2, 'never'],                                          // 是否允许非空数组里面有多余的空格

    /* eslint-plugin-vue */
    'vue/require-default-prop': 0,                                                  // 不检查默认属性 props
    'vue/require-prop-types': 0,                                                    // 不检查默认类型
    'vue/no-v-html': 'off',                                                         // 不使用v-html
    'vue/no-use-v-if-with-v-for': ['error', 
      { allowUsingIterationVar: false }
    ],
    'vue/return-in-computed-property': ['error', 
      { treatUndefinedAsUnspecified: false }
    ],
    'vue/no-unused-components': ['error', 
      { ignoreWhenBindingPresent: true }
    ],
    'vue/attribute-hyphenation': ['error', 'always',
      { ignore: [] }
    ],
    'vue/component-name-in-template-casing': ['error', 'kebab-case',
      { ignores: [] }
    ],
    'vue/singleline-html-element-content-newline': 'off',                           // 单行html元素内容在新的一行
    'vue/html-closing-bracket-newline': [                                           // html右括号在新的一行
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'vue/multiline-html-element-content-newline': [                                 // 多行html元素内容在新的一行
      'error',
      {
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea']
      }
    ],
    'vue/max-attributes-per-line': [                                                // 每行最大属性数量
      'error',
      {
        singleline: 30,
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ],
    
    'vue/html-closing-bracket-spacing': ['error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always'
      }
    ],
    'vue/html-indent': ['error', 2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/html-quotes': ['error', 'double'],
    'vue/html-self-closing': ['error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/name-property-casing': ['error', 'PascalCase'], // PascalCase | kebab-case
    'vue/no-multi-spaces': ['error',
      { ignoreProperties: false }
    ],
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    'vue/no-template-shadow': ['error'],
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/require-default-prop': ['error'],
    'vue/v-bind-style': ['error', 'shorthand'],
    'vue/v-on-style': ['error', 'shorthand'],
    'vue/attributes-order': ['error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ]
      }
    ],
    'vue/order-in-components': ['error',
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError'
        ]
      }
    ],
    'vue/this-in-template': ['error', 'never']
  }
}
