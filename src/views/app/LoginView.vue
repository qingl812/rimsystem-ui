<template>
	<div class="top"></div>
	<div class="bottom"></div>
	<el-card class="login-card">
		<template #header>
			<div class="header">广州省惠州市道路信息管理系统</div>
		</template>

		<el-form label-width="80px">
			<el-form-item label="用户名: ">
				<el-input
					type="text"
					auto-complete="username"
					placeholder="用户名"
					v-model="username"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="密码: ">
				<el-input
					type="password"
					auto-complete="password"
					placeholder="密码"
					v-model="password"
					clearable
					show-password
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleLogin">登 录</el-button>
			</el-form-item>
		</el-form>

		<div class="footer">
			<span class="left">copyright 2021</span>
			<span class="right">Login</span>
		</div>
	</el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios, { AxiosResponse } from "axios";
import tools from "@/typings/Tools";

export default defineComponent({
	name: "LoginView",
	data() {
		return {
			username: "",
			password: "",
		};
	},
	methods: {
		handleLogin() {
			axios({
				method: "post",
				url: "/api/login",
				params: {
					username: this.username,
					password: this.password,
				},
			})
				.then((response: AxiosResponse) => {
					if (response.data.success == true) {
						this.$store.commit(
							"set_token",
							response.data.data.authentication
						);
						this.$store.commit("set_page_status", "logged");
						tools.success("登陆成功");
					} else {
						tools.error("账号或密码错误");
					}
				})
				.catch(() => {
					tools.error("网络连接错误");
				});
		},
	},
});
</script>

<style scoped lang="scss">
.top {
	position: absolute;
	height: 50%;
	width: 100%;
	background: linear-gradient(#bfddff, white);
}

.bottom {
	position: absolute;
	top: 50%;
	height: 50%;
	width: 100%;
	background: linear-gradient(#0260c1, #429bff);
}

.login-card {
	height: 360px;
	width: 500px;

	position: absolute;
	margin-top: calc(50vh - 360px / 2);
	margin-left: calc(50vw - 500px / 2);

	// 要倒影的元素
	-webkit-box-reflect: below 0px -webkit-linear-gradient(bottom, rgba(
					255,
					255,
					255,
					0.3
				)
				0%, transparent 40%, transparent 100%);

	.header {
		font-size: 32px;
	}

	.footer {
		position: absolute;
		bottom: 0px;
		width: 100%;
		height: 40px;

		.left {
			position: absolute;
			left: 0px;
		}
		.right {
			position: absolute;
			right: 10px;
			width: 80px;
		}
	}
}
</style>
