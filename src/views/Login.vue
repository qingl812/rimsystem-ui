<template>
	<div class="login">
		<div id="up_part"></div>
		<div id="down_part"></div>

		<el-card id="login_container">
			<div slot="header" class="card_head">
				广州省惠州市道路信息管理系统
			</div>
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
			<div class="card_footer">
				<span class="left">copyright 2021</span>
				<span class="right">Login</span>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

@Component
export default class Login extends Vue {
	private m_username = "";
	private m_password = "";

	login(): void {
		axios({
			method: "post",
			url: "/api/login",
			data: {
				username: this.m_username,
				password: this.m_password,
			},
		})
			.then((response: AxiosResponse) => {
				// token 存储到 localStorage
				localStorage.setItem("token", response.data.token);
				this.$router.push("/home");
			})
			.catch(() => {
				// TODO:服务端遇到账号密码不匹配应如何处理？
				alert("账号或密码错误");
			});
	}
}
</script>

<style scoped lang="scss">
#up_part {
	position: absolute;
	height: 50%;
	width: 100%;
	background: linear-gradient(#bfddff, white);
}

#down_part {
	position: absolute;
	top: 50%;
	height: 50%;
	width: 100%;
	background: linear-gradient(#0260c1, #429bff);
}

#login_container {
	height: 360px;
	width: 500px;

	position: absolute;
	margin-top: calc(50vh - 360px / 2);
	margin-left: calc(50vw - 500px / 2);

	/*Flex布局 垂直居中*/
	// display: flex;
	// align-items: center;

	// 要倒影的元素

	-webkit-box-reflect: below 0px -webkit-linear-gradient(bottom, rgba(
					255,
					255,
					255,
					0.3
				)
				0%, transparent 40%, transparent 100%);
}

.card_head {
	font-size: 32px;
}

.card_footer {
	position: absolute;
	bottom: 0px;
	width: 100%;
	height: 40px;
}

.card_footer .left {
	position: absolute;
	left: 0px;
}

.card_footer .right {
	position: absolute;
	right: 10px;
	width: 80px;
}
</style>
