<template>
	<div id="home">
		<div id="left">
			<div id="leftOne">请选择查询条件</div>
			<div id="leftTwo">
				<div id="leftTwoOne">
					<label><input type="radio" name="classification" value="1" checked onclick="">区属</label>
					<label><input type="radio" name="classification" value="2">管理单位</label>
					<label><input type="radio" name="classification" value="3">名称</label>
				</div>
				<div id="leftTwoTwo">
					<select id="roadResp">
						<option>-----------------道路-----------------</option>
					</select>
					<select id="classificationResp">
						<option>-----------------市区-----------------</option>
					</select>
				</div>
			</div>
			<div id="leftThree">
				<div>
					<img src="/static/img/home/search.png">
					搜索
				</div>
			</div>
			<div id="leftFour">
				<div id="list">
					<router-link :to="{path: '/home', query: {roadId: 1 }}">沙下路</router-link>
				</div>

				<div id="leftTurnPage">共四页 上页 下页 1/1</div>
			</div>
		</div>

		<div id="right"
			v-bind:style="{ 'grid-template-rows': (typeof(this.$route.query.roadId)!='undefined')?'auto 30px':'auto 0px' }">
			<baidu-map :center="center" :zoom="zoom" @ready="handler" class="homePageMap"></baidu-map>
			<div id="rightStatus">
				<div>
					<router-link :to="{path: '/docManage', query: {roadId: 1 }}">文档管理</router-link>
				</div>
				<div>
					<router-link :to="{path: '/home', query: {roadId: 1 }}">数据信息</router-link>
				</div>
				<div>
					<router-link :to="{path: '/home', query: {roadId: 1 }}">数据删除</router-link>
				</div>
				<div>
					<router-link :to="{path: '/home', query: {roadId: 1 }}">日常巡查</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Home',
		data() {
			return {
				center: {
					lng: 0,
					lat: 0
				},
				zoom: 3
			}
		},
		methods: {
			handler({
				BMap,
				map
			}) {
				console.log(BMap, map)
				this.center.lng = 116.404
				this.center.lat = 39.915
				this.zoom = 15
			}
		}
	}
</script>

<style scoped>
	#home {
		width: 100%;
		height: 100%;

		display: grid;
		grid-template-columns: 250px auto;
	}

	#right {
		display: grid;
		/* grid-template-rows: auto 30px; */
		/* grid-template-rows: auto 0px; */
	}

	#rightStatus {
		background-color: rgb(222, 239, 249);
		display: flex;
	}

	#rightStatus a {
		text-decoration: none;
		color: black;
	}

	#rightStatus>div {
		height: 100%;
		width: 100px;
		border-right: 2px solid rgb(161, 188, 216);
		/* css3子元素水平，垂直居中 */
		justify-content: center;
		align-items: center;
		display: -webkit-flex;

		background-color: rgb(182, 229, 250);
	}

	#left {
		background-color: rgb(218, 239, 250);
		border: 2px solid rgb(161, 188, 216);

		display: grid;
		grid-template-rows: 30px 65px 30px auto;
	}

	#leftOne {
		border-bottom: 2px solid rgb(161, 188, 216);
		/* css3子元素水平，垂直居中 */
		justify-content: center;
		align-items: center;
		display: -webkit-flex;
	}

	#leftTwoOne {
		display: grid;
		grid-template-columns: auto auto auto;
		margin-left: 10px;
	}

	#leftTwoTwo>select {
		width: 200px;
		margin-left: 25px;
		margin-right: 25px;
	}

	#leftThree {
		margin-top: 5px;
	}

	#leftThree>div {
		float: right;
		background-color: rgb(189, 227, 241);
		border: 1px solid rgb(70, 163, 189);
		border-radius: 8px;
		margin-right: 10px;
		padding-left: 5px;
		padding-right: 5px;
	}

	#leftThree img {
		height: 1em;
	}

	#leftFour {
		border: 1px solid rgb(70, 163, 189);
		background-color: rgb(238, 248, 255);
		/* 上边 | 右边 | 下边 | 左边 */
		margin: 10px 20px 40px 20px;
		
		display: grid;
		grid-template-rows: auto 40px;
	}

	#list {
		/* 上边 | 右边 | 下边 | 左边 */
		margin: 10px 20px 0px 20px;
		padding: 10px 0px 0px 20px;
	}

	#leftTurnPage {
		/* css3子元素水平，垂直居中 */
		justify-content: center;
		align-items: center;
		display: -webkit-flex;
	}
</style>
