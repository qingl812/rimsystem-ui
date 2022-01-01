# home 使用的 API

## <font color=#60c6bf>road_info_list</font>

-   通过道路名称、道路类型、道路养护等级，三个参数筛选道路，参数都为空时返回所有道路

### 请求方式

-   GET
-   /api/road_info_list

### 参数

| 参数名    | 必选 | 参数   | 说明                   |
| :-------- | :--- | :----- | :--------------------- |
| page_size | 是   | number | 单页能显示的道路数量   |
| page      | 是   | number | 显示第几页             |
| name      | 否   | string | 以名字进行筛选         |
| type      | 否   | string | 以道路类型进行筛选     |
| mlevel    | 否   | string | 以道路养护等级进行筛选 |

### 返回参数

| 参数名       | 必选 | 参数           | 说明               |
| :----------- | :--- | :------------- | :----------------- |
| total        | 是   | number         | 筛选结果的道路总数 |
| roads        | 是   | Array<unknown> | 当前页的道路列表   |
| roads.id     | 是   | Array<string>  | 道路编号           |
| roads.name   | 是   | Array<string>  | 道路名称           |
| roads.type   | 是   | Array<string>  | 道路类型           |
| roads.mlevel | 是   | Array<string>  | 道路养护等级       |
| roads.unit   | 是   | Array<string>  | 管理单位           |

## <font color=#60c6bf>types_name_list</font>

-   获取所有道路类型的列表

### 请求方式

-   GET
-   /api/types_name_list

### 返回参数

| 参数名 | 必选 | 参数          | 说明         |
| :----- | :--- | :------------ | :----------- |
| types  | 是   | Array<string> | 道路类型列表 |

## <font color=#60c6bf>mlevels_name_list</font>

-   获取所有道路养护等级的列表

### 请求方式

-   GET
-   /api/mlevels_name_list

### 返回参数

| 参数名  | 必选 | 参数          | 说明               |
| :------ | :--- | :------------ | :----------------- |
| mlevels | 是   | Array<string> | 道路养护等级的列表 |
