<template>
	<div id="docManageLook">
		<table>
			<tr style="background-color: rgb(102, 169, 222);">
				<td colspan="4" style="text-align: center;">查看文件</td>
			</tr>
			<tr>
				<td style="width: 200px;">下载</td>
				<td colspan="3">
					<img @click="Download()" src="/static/img/docManage/fileDownload.png" width="20px" height="20px">
				</td>
			</tr>
			<tr>
				<td>文件名</td>
				<td><input type="text" name="fileName" /></td>
				<td>文件分类</td>
				<td>
					<select name="fileType">
						<option>合同文件</option>
						<option>项目档案</option>
						<option>实施记录</option>
						<option>资金申请表</option>
						<option>资金支付记录</option>
						<option>维护养护资料</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>归档单位</td>
				<td>
					<select>
						<option>单位</option>
					</select>
				</td>
				<td>归档号</td>
				<td>
					<input type="text" />
				</td>
			</tr>
			<tr>
				<td>份号</td>
				<td>
					<input type="text" />
				</td>
				<td>贡献</td>
				<td>
					<input type="text" />
				</td>
			</tr>
			<tr>
				<td>备注</td>
				<td colspan="3">
					<textarea rows="3" style="width: 400px;"></textarea>
				</td>
			</tr>
			<tr style="background-color: rgb(207, 230, 253);">
				<td colspan="4" style="text-align: center;">
					<BlueButton context="保存" @click.native="Save()"></BlueButton>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
	import BlueButton from '../../components/BlueButton.vue'

	export default {
		name: 'DocManageLook',
		components: {
			BlueButton
		},
		methods: {
			Save() {
				this.$router.replace({
					path: '/docManage',
					query: {
						roadId: this.$route.query.roadId
					}
				})
			},
			Download(){
				
			}
		}
	}
</script>

<style scoped>
	#mainTable td {
		width: 100%;
		border: #cad5da 2px solid;
	}

	table {
		background-color: rgb(237, 247, 255);
		width: 100%;
		float: left;
		border-spacing: 0;
	}

	td {
		border: 1px solid #9BCCFD;
	}

	td,
	td+td+td {
		text-align: right;
	}

	td+td,
	td+td+td+td {
		text-align: left;
	}

	/* 防止input超出单元格 */
	input {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	input,
	select {
		width: 100%;
	}
</style>
