// vuex.d.ts
import { Store } from "vuex";
import { Road } from "@/typings/interfaces";

declare module "@vue/runtime-core" {
	// 声明自己的 store state
	interface State {
		token: string;
		page_status: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		datas: any;
		data_pagination: {
			total_size: number;
			page_size: number;
			current_page: number;
		};
		road_info: Road;
		branch_road_info: BranchRoad;
		reload_router: number;
	}

	// 为 `this.$store` 提供类型声明
	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
