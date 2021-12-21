# home 使用的 API

## <font color=#60c6bf>road_name_list</font>

- 通过名字、地区、所属单位，三个参数筛选道路，参数都为空时返回所有道路
- 为了避免后端一次传入过多结果到前端，使用 begin total 参数对返回的道路分页处理

### 请求方式

- GET
- /api/road_name_list

### 参数

| 参数名 | 必选 | 参数   | 说明                 |
| :----- | :--- | :----- | :------------------- |
| count  | 是   | number | 单页能显示的道路数量 |
| page   | 是   | number | 显示第几页           |
| name   | 否   | string | 以名字进行筛选       |
| area   | 否   | string | 以所属地区进行筛选   |
| unit   | 否   | string | 以所属单位进行筛选   |

### 返回参数

| 参数名 | 必选 | 参数          | 说明                   |
| :----- | :--- | :------------ | :--------------------- |
| roads  | 是   | Array<string> | 当前页的道路名字的列表 |
| total  | 是   | number        | 筛选结果的道路总数     |

## <font color=#60c6bf>get_unit_name</font>

- 获取所有道路所属单位名字的列表

### 请求方式

- GET
- /api/unit_name_list

### 参数

无

### 返回参数

| 参数名 | 必选 | 参数          | 说明           |
| :----- | :--- | :------------ | :------------- |
| units  | 是   | Array<string> | 单位名字的列表 |

## <font color=#60c6bf>get_area_name</font>

- 获取所有道路所属地区名字的列表

### 请求方式

- GET
- /api/area_name_list

### 参数

无

### 返回参数

| 参数名 | 必选 | 参数          | 说明           |
| :----- | :--- | :------------ | :------------- |
| areas  | 是   | Array<string> | 地区名字的列表 |