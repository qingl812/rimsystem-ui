# status 使用的 API

## <font color=#60c6bf>login</font>

- 获取用户信息，包括 用户所属单位，用户名称，用户类型

### 请求方式

- POST
- /api/login

### 参数

| 参数名   | 必选 | 参数   | 说明   |
| :------- | :--- | :----- | :----- |
| username | 是   | string | 用户名 |
| password | 是   | string | 密码   |

### 返回参数

| 参数名 | 必选 | 参数   | 说明                                          |
| :----- | :--- | :----- | :-------------------------------------------- |
| status | 是   | string | success(登陆成功), failed登陆失败)            |
| token  | 否   | string | 客户端会把 token 带在 header 里向后端发送请求 |

### 备注

- 返回 401 表示 token 无效
- 返回 403 表示 权限不够
- 当 token 需要刷新以续期的时候，直接在 response 的 header 里添加一个 new_token 字段存储新的token即可