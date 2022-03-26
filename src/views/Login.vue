<template>
	<div id="login">
		<div class="top"></div>
		<div class="bottom"></div>

		<el-card>
			<div slot="header" class="head">广州省惠州市道路信息管理系统</div>
			<!-- 登录提示 -->
			<span class="tip">{{ m_msg }}</span>
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
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";

@Component
export default class Login extends Vue {
	private m_username = "";
	private m_password = "";
	private m_msg = "";

	login(): void {
		MyAxios.login(this.m_username, this.m_password, (data) => {
			this.m_msg = data;
			this.$router.push({ path: "/home" });
		});
	}
}
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

#login > .el-card {
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

	.tip {
		margin-left: 100px;
		font-size: 10px;
		color: red;
	}
}
</style>
