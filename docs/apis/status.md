# status 使用的 API

## <font color=#60c6bf>get_user_info</font>

- 获取用户信息，包括 用户所属单位，用户名称，用户类型

### 请求方式

- GET
- /api/get_user_info

### 参数

### 返回参数

| 参数名 | 参数   | 说明         |
| :----- | :----- | :----------- |
| name   | string | 用户名字     |
| type   | string | 用户类型     |
| unit   | string | 用户所属单位 |

## <font color=#60c6bf>get_system_version</font>

- 获取版本信息

### 请求方式

- GET
- /api/get_system_version

### 返回参数

| 参数名  | 参数   | 说明 |
| :------ | :----- | :--- |
| version | string | v1.0 |