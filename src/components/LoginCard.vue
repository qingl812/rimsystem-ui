<template>
	<el-card class="LoginCard">
		<div slot="header" class="head">广州省惠州市道路信息管理系统</div>
		<el-form label-width="80px">
			<el-form-item label="用户名: ">
				<el-input
					type="text"
					auto-complete="username"
					placeholder="用户名"
					v-model="m_username"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="密码: ">
				<el-input
					type="password"
					auto-complete="password"
					placeholder="密码"
					v-model="m_password"
					clearable
					show-password
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="login">登 录</el-button>
			</el-form-item>
		</el-form>
		<div class="footer">
			<span class="left">copyright 2021</span>
			<span class="right">Login</span>
		</div>
	</el-card>
</template>

<script lang="ts">
import { Tools } from "@/typings/Tools";
import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginCard extends Vue {
	private m_username = "";
	private m_password = "";

	private login(): void {
		axios({
			method: "post",
			url: "/api/login",
			params: {
				username: this.m_username,
				password: this.m_password,
			},
		})
			.then((response: AxiosResponse) => {
				if (response.data.success == true) {
					Tools.token = response.data.data.authentication;
					Tools.status = "logged";
					Tools.success("登陆成功");
				} else {
					Tools.error("账号或密码错误");
				}
			})
			.catch(() => {
				Tools.error("网络连接错误");
			});
	}
}
</script>

<style scoped lang="scss">
.LoginCard {
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

	.head {
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
