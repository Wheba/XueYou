<template>
	<div id="main">
		<div id="appMain" @click="typeInit">
			<router-view/>
		</div>
		<div class="navigationContainer">
			<div class="itemBox">
				<img class="icon" :src="getImg('main/list1.png')" v-if="type==1" @click="toList"/>
				<img class="icon" :src="getImg('main/list0.png')" v-else @click="toList"/>
				<div class="tagListBox" v-show="visible1">
					<img :src="getImg('home/line2.png?v=001')" style="width: 100%;display: block;"/>
					<div class="item" :class="{selected:checkTaging(item.taga_id,1)}" v-for="item in tagAList" :key='item.id' v-text="item.taga_name" @click="showMore(item,1,1)"></div>
				</div>
			</div>
			<div class="itemBox">
				<img class="icon" :src="getImg('main/home1.png')" v-if="type==2" @click="toHome"/>
				<img class="icon" :src="getImg('main/home0.png')" v-else @click="toHome"/>
			</div>
			<div class="itemBox">
				<img class="icon" :src="getImg('main/search1.png')" v-if="type==3" @click="toSearch"/>
				<img class="icon" :src="getImg('main/search0.png')" v-else @click="toSearch"/>
				<div class="tagListBox" v-show="visible3">
					<img :src="getImg('home/line2.png?v=01')" style="width: 100%;display: block;"/>
					<div class="item" :class="{selected:checkTaging(item.tagb_id,2)}" v-for="item in tagBList" :key='item.id' v-text="item.tagb_name" @click="showMore(item,2,3)"></div>
				</div>
			</div>
			<div class="itemBox">
				<img class="icon" :src="getImg('main/user1.png')" v-if="type==4"/>
				<img class="icon" :src="getImg('main/user0.png')" v-else @click="toUser"/>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		data(){
			return{
				type:2,//1目录 2主页 3搜索 4用户
				visible1:false,
				visible3:false,
			}
		},
		computed:{
			...mapState(['imgUrl','userInfo','tagBList','tagAList'])
		},
		created() {
			if(!this.userInfo){
				this.$router.replace('/')
			}
		},
		mounted() {
			var path=this.$route.path;
			if(path=='/main/home'){
				this.type=2
			}
			if(path=='/main/user'){
				this.type=4
			}
		},
		methods:{
			typeInit(){
				this.visible1=false;
				this.visible3=false;
			},
			getImg(url){
				return this.imgUrl+url
			},
			toList(){
				this.visible3=false;
				this.visible1=!this.visible1;
			},
			toSearch(){
				this.visible1=false;
				this.visible3=!this.visible3;
			},
			toHome(){
				this.typeInit()
				if(this.$route.path=='/main/home'){
					return
				}
				this.type=2;
				this.$router.replace('/main/home')
			},
			toUser(){
				this.typeInit()
				this.type=4;
				if(this.$route.path=='/main/user'){
					return
				}
				this.$router.replace('/main/user')
			},
			showMore(item,type,type2){
				this.$store.state.tagItem=item;
				this.$router.replace({
					path:'/main/more',
					query:{
						id:type==1?item.taga_id:item.tagb_id,
						type:type
					}
				})
				this.type=type2
				this.typeInit()
			},
			checkTaging(id,type){
				var tagItem=this.$store.state.tagItem
				if(!tagItem){
					return false
				}
				if(type==1){//检测一级标签
					return id==tagItem.taga_id
				}else{//检测二级标签
					return id==tagItem.tagb_id
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#main{
		position: fixed;
		width: 100%;
		height: 100%;
		#appMain{
			position: relative;
			width: 100%;
			height: calc(100vh - 86/750*100vw);
		}
		.navigationContainer{
			position: fixed;
			width: 100%;
			left: 0;
			bottom: 0;
			height: calc(86/750*100vw);
			background-color: #0067b6;
			display: flex;
			.itemBox{
				position: relative;
				width: 25%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				.icon{
					width: calc(55/750*100vw);
					height: auto;
				}
				.tagListBox{
					position: absolute;
					bottom: 100%;
					left: 35%;
					width: calc(207/750*100vw);
					background-color: #FFFFFF;
					box-shadow: 0px 0px 20px 1px rgba(0,147,217,0.8);
					.item{
						text-align: center;
						color: #0087cb;
						background-color: #ffffff;
						width: 100%;
						height: calc(60/750*100vw);
						line-height: calc(58/750*100vw);
						font-size: 3vw;
						border-top: 1px rgba(0,0,0,0.1) solid;
					}
					.item.selected{
						color: #ffffff;
						background-color: #0087cb;
					}
				}
			}
		}
	}
</style>
