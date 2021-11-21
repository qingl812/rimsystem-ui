<template>
	<div id="docManage">
		<div id="left">
			<div id="leftTop">
				<img src="/static/img/docManage/selectTitle.png">
				<span style="padding-left: 5px;">请选择文档分类</span>
			</div>
			<div id="leftMain">
				<img src="/static/img/docManage/selectFolder.png">
				<span>沙下路</span>

				<p><img src="/static/img/docManage/selectFile.png">
					<span @click="ToType('contractFile')">合同文件</span>
				</p>
				<p><img src="/static/img/docManage/selectFile.png">
					<span @click="ToType('projectFile')">项目档案</span>
				</p>
				<p><img src="/static/img/docManage/selectFile.png">
					<span @click="ToType('implementationRecord')">实施记录</span>
				</p>
				<p><img src="/static/img/docManage/selectFile.png">
					<span @click="ToType('fundApplicationForm')">资金申请表</span>
				</p>
				<p><img src="/static/img/docManage/selectFile.png">
					<span @click="ToType('fundPaymentRecord')">资金支付记录</span>
				</p>
				<p><img src="/static/img/docManage/selectFile.png">
					<span @click="ToType('maintenanceInformation')">维护养护资料</span>
				</p>
			</div>
		</div>

		<div id="right">
			<div id="rightTop">
				<img src="/static/img/docManage/checkMaterial.png" style="margin-right: 2px;">
				<span>沙下路-全部资料</span>
			</div>
			<div id="rightTable">
				<table border="2px" cellpadding="0" cellspacing="0" bordercolor="#9cb4cc">
					<tr>
						<td class="table-checkBox"><input type="checkbox"></td>
						<td class="table-num">序号</td>
						<td class="table-name">名称</td>
						<td class="table-format">格式</td>
						<td class="table-time">时间</td>
						<td class="table-look">查看</td>
						<td class="table-download">下载</td>
					</tr>
				</table>
			</div>
			<div id="rightTurnPage">
				<div>
					<BlueButton context="<<" @click="FirstPage"></BlueButton>
					<BlueButton context=">" @click="PrePage"></BlueButton>
					<BlueButton context=">" @click="NextPage"></BlueButton>
					<BlueButton context=">>" @click="LastPage"></BlueButton>
					<span>第一页</span>
					<span>共一页</span>
					<span>|</span>
					<span>到</span>
					<input type="text" style="width: 40px;">
					<BlueButton context="go"></BlueButton>
				</div>
			</div>
			<div id="rightOption">
				<div>
					<BlueButton context="新增" @click.native="Create()"></BlueButton>
					<BlueButton context="查看" @click.native="Look()"></BlueButton>
					<BlueButton context="删除" @click.native="Delete()"></BlueButton>
					<BlueButton context="返回" @click.native="Back()"></BlueButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BlueButton from '../../components/BlueButton.vue'
	// import axios from 'axios'
	// import $ from 'jquery'
	// import Jump from '../../components/Jump.vue'

	export default {
		name: 'DocManage',
		components: {
			BlueButton,
			// Jump
		},
		mounted() {
			// 如果没有 type 参数，显示全部文件
			// typeof(this.$route.query.type) == 'undefined'
		},
		methods: {
			ToType(target) {
				if (this.$route.query.type != target)
					this.$router.push({
						path: this.$route.path,
						query: {
							...this.$route.query,
							type: target
						}
					})
			},
			Create() {
				this.$router.push({
					path: '/docManageCreate',
					query: {
						roadId: this.$route.query.roadId
					}
				})
			},
			Look() {
				let fileId = 0;
				
				this.$router.push({
					path: '/docManageLook',
					query: {
						roadId: this.$route.query.roadId,
						fileId: fileId
					}
				})
			},
			Delete() {

			},
			Back() {
				this.$router.push({
					path: '/home',
					query: {
						roadId: this.$route.query.roadId
					}
				})
			},
			FirstPage() {

			},
			PrePage() {

			},
			NextPage() {

			},
			LastPage() {

			}
		}
	}
</script>

<style scoped>
	#docManage {
		height: 100%;
		width: 100%;

		display: grid;
		grid-template-columns: 200px auto;
	}

	#docManage img {
		height: 20px;
		width: 20px;
	}

	#leftTop {
		height: 30px;
		background-color: #e6f4ff;
		padding-left: 10px;
		/* css3子元素垂直居中 */
		align-items: center;
		display: -webkit-flex;
	}

	#leftMain {
		height: 100%;
		background-color: #f5f8fd;
		padding-left: 10px;
		padding-top: 5px;
	}

	#leftMain p {
		margin: 0;
		padding-left: 25px;
	}

	#right {
		display: grid;
		grid-template-rows: 30px auto 30px 30px;
	}

	#rightTop {
		background-color: white;
		color: #FF7F50;
		padding-left: 10px;
		/* css3子元素垂直居中 */
		align-items: center;
		display: -webkit-flex;
	}

	#rightTable {
		height: 100%;
		width: 100%;
	}

	#rightOption {
		/* css3子元素水平，垂直居中 */
		justify-content: center;
		align-items: center;
		display: -webkit-flex;

		background-color: #d2e7fc;
	}

	#rightTurnPage {
		width: 100%;
		background-color: #e6f4ff;
	}

	#rightTurnPage>div {
		float: right;
	}

	#rightTable table {
		width: 100%;
	}

	#rightTable table td {
		vertical-align: middle;
		text-align: center;
	}
</style>
