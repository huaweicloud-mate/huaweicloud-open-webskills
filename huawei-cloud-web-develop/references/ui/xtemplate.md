# XTemplate 使用与 API 指南

来源：`src/xtemplate/syntax-cn.md` 整理

XTemplate 是华为云门户 PEP/楼层模板使用的模板引擎语法，用于生成可参数化的页面模板。

## 1. 变量与输出 (Variables & Output)

### 1.1 变量访问

- **基本访问**: `{{ username }}`
- **属性访问**: `{{ user.name }}` 或 `{{ user["name"] }}`
- **安全性**: 引用 `undefined` 或 `null` 的变量或属性不会报错，也不会输出任何内容。
- **根数据访问**: 使用 `root.foo` 访问传递给 `render` 方法的根对象。

### 1.2 输出控制

- **转义输出**: `{{ foo }}`（默认 HTML 转义）
- **原始输出**: `{{{ foo }}}`（不转义 HTML）
- **字面量输出**: `{{% {{x}} %}}`（输出原始字符串 `{{x}}`）

### 1.3 空格控制

- **删除前缀空格**: `{{~`
- **删除后缀空格**: `~}}`
- 示例: `{{ x ~}} end` -> `1end`

### 1.4 注释

- `{{! 这是一条注释 }}`（渲染时会被忽略）

---

## 2. 逻辑与表达式 (Logic & Expressions)

### 2.1 运算符

- **算术**: `+`, `-`, `*`, `/`, `%`
- **比较**: `===`, `!==`, `>`, `>=`, `<`, `<=`
- **逻辑**: `||`, `&&`, `!`

### 2.2 条件表达式（三元运算）

- `{{ condition ? val1 : val2 }}`

### 2.3 函数调用

- 支持在模板中调用传入的 JavaScript 方法: `{{ foo(1, 2) }}`
- 支持变量原型方法: `{{ x.slice(1) }}`

---

## 3. 内置命令 (Built-in Commands)

### 3.1 条件判断 `if`

```handlebars
{{#if (condition)}}
  ...
{{elseif (condition2)}}
  ...
{{else}}
  ...
{{/if}}
```

### 3.2 循环迭代 `each`

- **数组迭代**:
  ```handlebars
  {{#each(array)}}
    {{xindex}} {{this.name}}
  {{/each}}
  ```
- **对象迭代**:
  ```handlebars
  {{#each(dictionary, "value", "key")}}
    {{key}}: {{value}}
  {{/each}}
  ```
- **作用域跳出**: 在 `each` 内部使用 `../foo` 访问外层作用域的变量。

### 3.3 作用域切换 `with`

```handlebars
{{#with(a)}}
  {{b}} {{! 相当于 a.b }}
{{/with}}
```

---

## 4. 内置函数 (Built-in Functions)

| 函数 | 说明 | 示例 |
| :--- | :--- | :--- |
| `range(start, end, [step])` | 生成数字集合（不含 end） | `{{#each(range(0,3))}}{{this}}{{/each}}` |
| `set(key=value, ...)` | 定义或修改变量 | `{{set(x=1, y=2)}}` |
| `void(expression)` | 执行表达式但不输出任何内容 | `{{void(x)}}` |

---

## 5. 模板复用 (Template Reuse)

### 5.1 包含与解析

- **`include(path, [params])`**: 引入子模板，共享当前上下文及额外参数。
- **`includeOnce(path)`**: 同 `include`，但在同一次渲染中仅生效一次。
- **`parse(path, [params])`**: 引入子模板，拥有**完全独立**的上下文。

### 5.2 继承 `extend` & `block`

- **父模板 (parent.xtpl)**:
  ```html
  <html>
    <body>{{{block("content")}}}</body>
  </html>
  ```
- **子模板 (child.xtpl)**:
  ```handlebars
  {{extend("./parent")}}
  {{#block("content")}}
    <h2>Hello World</h2>
  {{/block}}
  ```

---

## 6. 宏 (Macro)

宏允许定义可复用的代码片段（类似于函数）。

- **定义**:
  ```handlebars
  {{#macro("test", "param", default=1)}}
    param is {{param}} {{default}}
  {{/macro}}
  ```
- **调用**: `{{macro("test", "2", default=2)}}`
- **注意**: 宏内部**不能**访问外层作用域变量，但可以访问 `root`。

---

## 7. 保留关键词 (Keywords)

`debugger`, `each`, `extend`, `include`, `macro`, `parse`, `range`, `set`, `with`, `void`
