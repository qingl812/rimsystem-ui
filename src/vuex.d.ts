// vuex.d.ts
import { Store } from "vuex";

declare module "@vue/runtime-core" {
	// 声明自己的 store state
	interface State {
		token: string;
		page_status: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		datas: any;
	}

	// 为 `this.$store` 提供类型声明
	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
