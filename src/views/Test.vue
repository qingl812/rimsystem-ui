<template>
	<div class="test">
		<button @click="click">按下发送</button>
		{{ info }}
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Test extends Vue {
	private info = "";

	click(): void {
		axios
			.post("/api/road_name_list", {
				page: 1,
				name: "",
				area: "",
				unit: "",
			})
			.then((response) => (this.info = response.data));
	}
}
</script>

<style scoped lang="scss"></style>
