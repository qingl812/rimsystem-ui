import { createStore } from "vuex";

export default createStore({
	state: {
		token: "",
		page_status: "",
	},
	getters: {},
	mutations: {
		set_token(state, token) {
			if (token == null) {
				localStorage.removeItem("authentication");
				state.token = "";
			} else {
				state.token = token;
				localStorage.setItem("token", token);
			}
		},
		set_page_status(
			state,
			status:
				| "init"
				| "logged"
				| "unlogged"
				| "not_found"
				| "not_permission"
		) {
			if (status == state.page_status) return;

			switch (status) {
				case "init": {
					const token = localStorage.getItem("token");
					state.token = token == null ? "" : token;

					if (token == null) {
						state.page_status = "unlogged";
					} else {
						state.page_status = "logged";
					}
					break;
				}

				case "logged": {
					state.page_status = "logged";
					break;
				}

				case "unlogged": {
					state.page_status = "unlogged";
					this.set_token(state, null);
					break;
				}

				case "not_found": {
					state.page_status = "not_found";
					break;
				}

				case "not_permission": {
					state.page_status = "not_permission";
					break;
				}
			}
		},
	},
	actions: {},
	modules: {},
});
