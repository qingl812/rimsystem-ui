<template>
	<div class="login">
		<div class="loginControl">
			<div>
				<form action="http://localhost:8081/doLogin" method="post">
					<table>
						<tr>
							<td style="color: dodgerblue; font-size: 18px;">用户名：</td>
							<td><input type="text" name="username" placeholder="请输入用户名" style="font-size: 15px;"></td>
						</tr>
						<tr>
							<td style="color: dodgerblue; font-size: 18px;">密 码：</td>
							<td><input type="password" name="password" placeholder="请输入密码" style="font-size: 15px;" />
							</td>
						</tr>
						<tr>
							<td></td>
							<td><input type="submit" value="登 录" id="button" /></td>
						</tr>
					</table>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	// import axios from 'axios'
	// import $ from 'jquery'

	export default {
		name: 'Home',
		// components: {
		// 	axios
		// },
		// methods: {
		// 	checkRight: function() {
		// 		let val = {
		// 			name: $("input[name='username']").val(),
		// 			password: $("input[name='password']").val()
		// 		}
		// 		$.axios({
		// 			type: 'POST',
		// 			url: "http://localhost:8081/doLogin",
		// 			dataType: "json",
		// 			data: JSON.stringify(val),
		// 			contentType: "application/json;charset=utf-8",
		// 			async: false,
		// 			success: function(data) {
		// 				if (data == 0) {
		// 					alert("账号或密码不正确");
		// 				} else if (data == 1) {
		// 					window.location.href = "/homePage";
		// 				}
		// 			}
		// 		})
		// 	}
		// }
	}
</script>

<style scoped>
	.login {
		height: 100%;
		width: 100%;

		background: url("/static/img/login/background.png");
		background-size: 100% 100%;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loginControl {
		width: 540px;
		height: 320px;

		background: url("/static/img/login/loginPart.png");
		background-size: 100%;
		z-index: 9;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loginControl button {
		height: 25px;
	}

	.loginControl #button {
		border: 0;
		background: -webkit-radial-gradient(#60add6, #206f99);
		height: 30px;
		width: 100px;
		font-family: 华云彩文;
		font-size: 15px;
	}

	.loginControl #button:hover {
		background: -webkit-radial-gradient(#5e73b1, #314be0);
	}
</style>
