import Mock from "mockjs";
import test from "../mock/test";

// home
Mock.mock("/api/road_name_list", "get", test.road_name_list);
Mock.mock("/api/area_name_list", "get", test.area_name_list);
Mock.mock("/api/unit_name_list", "get", test.unit_name_list);

// status
Mock.mock("/api/get_user_info", "get", test.get_user_info);
Mock.mock("/api/get_system_version", "get", test.get_system_version);

// road info
Mock.mock("/api/road_info_list", "get", test.road_info_list);
Mock.mock("/api/types_name_list", "get", test.types_name_list);
Mock.mock("/api/mlevels_name_list", "get", test.mlevels_name_list);

// doc manage
Mock.mock("/api/file_types_list", "get", test.file_types_list);
Mock.mock("/api/file_info_list", "get", test.file_info_list);
Mock.mock("/api/file_download", "get", test.file_download);
Mock.mock("/api/file_upload", "post", test.file_upload);

// login
Mock.mock("/api/login", "post", test.login);

// DataInformation
Mock.mock("/api/maintenance_levels_name_list", "get", test.maintenance_levels_name_list);
Mock.mock("/api/surface_types_name_list", "get", test.surface_types_name_list);
Mock.mock("/api/sidewalk_tile_types_name_list", "get", test.sidewalk_tile_types_name_list);
Mock.mock("/api/blind_road_tile_types_name_list", "get", test.blind_road_tile_types_name_list);
Mock.mock("/api/curb_types_name_list", "get", test.curb_types_name_list);
Mock.mock("/api/road_info", "get", test.road_info);

// DailyInspection
Mock.mock("/api/daily_inspection_info_list", "get", test.daily_inspection_info_list);
export default Mock;
