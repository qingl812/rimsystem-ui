<template>
	<LoginView v-if="$store.state.page_status == 'unlogged'"></LoginView>
	<MainView v-else-if="$store.state.page_status == 'logged'"></MainView>
	<NotFound v-else-if="$store.state.page_status == 'not_found'"></NotFound>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginView from "@/views/app/LoginView.vue";
import MainView from "./views/app/MainView.vue";
import NotFound from "./views/app/NotFound.vue";

export default defineComponent({
	name: "App",
	components: {
		LoginView,
		MainView,
		NotFound,
	},
	beforeCreate() {
		this.$store.commit("set_page_status", "init");
	},
});
</script>
