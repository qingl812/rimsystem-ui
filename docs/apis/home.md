# home 使用的 API

## <font color=#60c6bf>road_name_list</font>

- 通过名字、地区、所属单位，三个参数筛选道路，参数都为空时返回所有道路
- 为了避免后端一次传入过多结果到前端，使用 begin total 参数对返回的道路分页处理

### 请求方式

- GET
- /api/road_name_list

### 参数

| 参数名 | 必选 | 参数   | 说明                             |
| :----- | :--- | :----- | :------------------------------- |
| name   | 是   | string | 以名字进行筛选                   |
| area   | 是   | string | 以所属地区进行筛选               |
| unit   | 是   | string | 以所属单位进行筛选               |
| begin  | 是   | number | 从结果的第几个开始返回(从零开始) |
| total  | 是   | number | 返回道路的数量                   |

### 返回参数

| 参数名 | 参数          | 说明                                       |
| :----- | :------------ | :----------------------------------------- |
| roads  | Array<string> | 通过参数进行筛选后，当前页的道路名字的列表 |
| count  | number        | 筛选结果的道路总数                         |

## <font color=#60c6bf>get_unit_name</font>

- 获取所有道路所属单位名字的列表

### 请求方式

- GET
- /api/unit_name_list

### 参数

无

### 返回参数

| 参数名 | 参数          | 说明           |
| :----- | :------------ | :------------- |
| units  | Array<string> | 单位名字的列表 |

## <font color=#60c6bf>get_area_name</font>

- 获取所有道路所属地区名字的列表

### 请求方式

- GET
- /api/area_name_list

### 参数

无

### 返回参数

| 参数名 | 参数          | 说明           |
| :----- | :------------ | :------------- |
| areas  | Array<string> | 地区名字的列表 |