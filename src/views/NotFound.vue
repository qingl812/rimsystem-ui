<template>
	<div></div>
</template>

<script lang="ts">
import { Tools } from "@/typings/Tools";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {
	constructor() {
		super();
		Tools.status = "not_found";
	}
}
</script>
