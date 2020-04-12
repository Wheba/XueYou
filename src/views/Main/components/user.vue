<template>
	<div class="userPage">
	<!-- 	<img :src="getImg('user/bg.jpg')" style="width: 100%;position: fixed;"/> -->
		<div class="headContainer">
			<img class="head" :src="getImg('user/head.jpg?v=001')"/>
			<div class="headBox">
				<img :src='userInfo.headimgurl' />
			</div>
			<div class="nickName" v-text="userInfo.user_name"></div>
			<img class="edit" :src="getImg('user/edit.png')" @click="showEdit"/>
		</div>
		<div class="typeBox">
			<div class="typeItem" :class="{selected:type==1}" @click="changeType(1)">
				<img :src="getImg('user/type1-0.png')" v-show="type!=1"/>
				<img :src="getImg('user/type1-1.png')" v-show="type==1"/>
			</div>
			<div class="typeItem" :class="{selected:type==2}" @click="changeType(2)">
				<img :src="getImg('user/type2-0.png')" v-show="type!=2"/>
				<img :src="getImg('user/type2-1.png')" v-show="type==2"/>
			</div>
		</div>
		<div ref="container" class="container" @scroll='scrollContent'>
			<div ref="storeContent" style="overflow: hidden;" v-show="type==1">
				<div class="itemBox" v-for="item in storeList" :key="item.id">
					<img class="thumbnail" :src="item.article_img" @click="showArticle(item)"/>
					<div class="titleBox">
						<p class="title" v-text="item.article_name" @click="showArticle(item)"></p>
					</div>
				</div>
			</div>
			<div ref="readContent" style="overflow: hidden;" v-show="type==2">
				<div class="itemBox" v-for="item in readList" :key="item.id">
					<img class="thumbnail" :src="item.article_img" @click="showArticle(item)"/>
					<div class="titleBox">
						<p class="title" v-text="item.article_name" @click="showArticle(item)"></p>
					</div>
				</div>
			</div>
		</div>
		<div class="mask" v-if="visible" @click="hiddenChangeEdit">
			<div class="content" @click.stop>
				<img class="head" :src="editUserInfo.headimgurl"/>
				<p class="title" style="margin-top: 8vw;">头像</p>
				<p class="title">昵称</p>
				<!-- <p class="title">生日</p>
				<p class="title">所在地</p>
				<p class="title">邮箱</p> -->
				<img class="icon" :src="getImg('user/icon1.png')" style="height: calc(24/750*100vw);top: 27vw;"/>
			<!-- 	<img class="icon" :src="getImg('user/icon2.png')" style="height: calc(28/750*100vw);top: 52.6vw;right: 5.5vw;"/> -->
				<input style="top: 26vw;"  v-model="editUserInfo.user_name"/>
	<!-- 			<input style="top: 39.4vw;"  v-model="editUserInfo.user_birth"/>
				<input style="top: 52vw;"  v-model="editUserInfo.user_addr"/>
				<input style="top: 65.5vw;"  v-model="editUserInfo.user_email"/> -->
				<button class="submit" @click="submitUserInfo">提交</button>
			</div>
		</div>
	</div>
</template>

<script>
	import qs from 'qs'
	import { mapState } from 'vuex'
	import { deepClone } from '@/utils'
	import {
		Toast
	} from 'mint-ui';
	import { changeUserInfo,getStoreArticleList,getReadList,readHandle } from "@/api/user";
	export default{
		data(){
			return{
				visible:false,
				type:1,//1收藏记录 2浏览记录
				editUserInfo:null,
				isSubmitUserInfo:false,
				storeForm:{
					list_type:2,
					page:1,
					range:10
				},
				storeList:[],//收藏文章列表
				isGetStoreing:false,
				isGetStoreEnd:false,
				readForm:{
					list_type:2,
					page:1,
					range:10
				},
				readList:[],//文章浏览列表
				isGetReading:false,
				isGetReadEnd:false,
				containerHeight:0,
			}
		},
		computed:{
			...mapState(['imgUrl','userInfo'])
		},
		created() {
			this.getStoreArticleList()
			this.getReadList()
		},
		mounted() {
			this.containerHeight=this.$refs.container.clientHeight
		},
		methods:{
			getImg(url){
				return this.imgUrl+url
			},
			changeType(type){
				if(this.type!=type){
					this.type=type;
				}
			},
			/*获取收藏文章列表*/
			getStoreArticleList(){
				if(this.isGetStoreing){
					return
				}
				this.isGetStoreing=true;
				getStoreArticleList(this.storeForm).then(res=>{
					if(res.code==200){
						if(res.data.length<this.storeForm.range){
							this.isGetStoreEnd=true
						}
						var list=deepClone(this.storeList);
						for(var i=0;i<res.data.length;i++){
							list.push(res.data[i])
						}
						this.storeList=list
					}
					this.isGetStoreing=false;
					console.log(res)
				}).catch(Error=>{
					this.isGetStoreing=false;
				})
			},
			/*获取文章浏览记录*/
			getReadList(){
				if(this.isGetReading){
					return
				}
				this.isGetReading=true;
				getReadList(this.readForm).then(res=>{
					if(res.code==200){
						if(res.data.length<this.readForm.range){
							this.isGetReadEnd=true
						}
						var list=deepClone(this.readList);
						for(var i=0;i<res.data.length;i++){
							list.push(res.data[i])
						}
						this.readList=list
					}
					this.isGetReading=false;
				}).catch(Error=>{
					this.isGetReading=false;
				})
			},
			showArticle(item){
				readHandle({article_id:item.article_id})
				window.open(item.article_url)
			},
			/*内容滚动*/
			scrollContent(e){
				var top=this.$refs.container.scrollTop;
				var contentHeight=0;
				if(this.type==1){//收藏
					contentHeight=this.$refs.storeContent.clientHeight;
					if(top+this.containerHeight>contentHeight-10&&!this.isGetStoreing&&!this.isGetStoreEnd){
						this.storeForm.page++;
						this.getStoreArticleList()
					}
				}else{//浏览
					contentHeight=this.$refs.readContent.clientHeight;
					if(top+this.containerHeight>contentHeight-10&&!this.isGetReading&&!this.isGetReadEnd){
						this.readForm.page++;
						this.getReadList()
					}
				}
			},
			showEdit(){
				this.editUserInfo=deepClone(this.userInfo)
				this.visible=true;
			},
			hiddenChangeEdit(){
				this.visible=false;
			},
			submitUserInfo(){
				if(this.isSubmitUserInfo){
					return
				}
				if(!this.editUserInfo.user_name){
					Toast('请先填写昵称')
					return
				}
				// if(!this.editUserInfo.user_birth){
				// 	Toast('请先填写生日')
				// 	return
				// }
				// if(!this.editUserInfo.user_addr){
				// 	Toast('请先填写地址')
				// 	return
				// }
				// if(!this.editUserInfo.user_email){
				// 	Toast('请先填写邮箱')
				// 	return
				// }
				this.isSubmitUserInfo=true
				changeUserInfo(qs.stringify(this.editUserInfo)).then(res=>{
					if(res.code==200){
						Toast('信息修改成功')
						this.visible=false;
						this.$store.dispatch('getUserInfo')
					}
					this.isSubmitUserInfo=false
				}).catch(error =>{
					this.isSubmitUserInfo=false
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.userPage{
		width: 100%;
		height: 100%;
	}
	.headContainer{
		width: 100%;
		height: calc(343/750*100vw);
		overflow: hidden;
		.head{
			width: 100%;
			height: auto;
		}
		.headBox{
			position: absolute;
			width: calc(181/750*100vw);
			height: calc(181/750*100vw);
			background-color: #00489b;
			border: calc(5/750*100vw) solid #e4f4fd;
			box-sizing: border-box;
			border-radius: 50%;
			top: calc(103/750*100vw);
			right: calc(71/750*100vw);
			overflow: hidden;
			img{
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
			}
		}
		.nickName{
			position: absolute;
			max-width: 36vw;
			height: calc(55/750*100vw);
			line-height: calc(55/750*100vw);
			left: calc(222/750*100vw);
			top:calc(152/750*100vw);
			color: #ffffff;
			font-size: calc(55/750*100vw);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.edit{
			position: absolute;
			width: calc(32/750*100vw);
			height: auto;
			left: 30vw;
			top: 28vw;
		}
	}
	.typeBox{
		width: 100%;
		height: calc(77/750*100vw);
		background-color: #c2e6fa;
		display: flex;
		.typeItem{
			width: 50%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			img{
				display: block;
				height: calc(43/750*100vw);
				width: auto;
			}
		}
		.typeItem.selected{
			background-color: #abce23;
		}
	}
	.container{
		width: calc(647/750*100vw);
		height: calc(100% - 343/750*100vw - 77/750*100vw);
		margin: 0 auto;
		overflow: scroll;
		.itemBox{
			position: relative;
			width: 100%;
			height: calc(145/750*100vw);
			border-bottom: 1px rgba(0,147,217,0.3) solid;
			margin-top: calc(35/750*100vw);
			.thumbnail{
				position: absolute;
				left: 0;
				top: 0;
				width: calc(246/750*100vw);
				height: 100%;
				object-fit: cover;
				display: block;
			}
			.titleBox{
				position: absolute;
				height: 100%;
				left: 37vw;
				right: 0;
				display: flex;
				align-items: center;
				.title{
					color: #0087cb;
					font-size: 3.5vw;
					font-weight: 600;
				}
			}
		}
	}
	.container::-webkit-scrollbar {
		display: none; /* Chrome Safari */
	}
	.mask{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0,0,0,0.7);
		.content{
			position: relative;
			width: calc(567/750*100vw);
			height: calc(388/750*100vw);
			background-color: #FFFFFF;
			box-shadow: 0px 0px 20px 1px rgba(0,147,217,0.8);
			.head{
				position: absolute;
				top: 7.7vw;
				right: 6.6vw;
				border-radius: 50%;
				width: calc(90/750*100vw);
				height: calc(90/750*100vw);
			}
			.title{
				padding-left: 5.5vw;
				color: #0087cb;
				font-size: 4.7vw;
				font-weight: 600;
				line-height: 13.3vw;
			}
			.icon{
				position: absolute;
				right: 6vw;
			}
			.submit{
				position: absolute;
				font-size: 4.4vw;
				font-weight: 700;
				border: 0.5vw #0087cb solid;
				color: #0087cb;
				background: transparent;
				box-sizing: border-box;
				width: calc(115/750*100vw);
				height: calc(69/750*100vw);
				border-radius: 3vw;
				bottom: 4.3vw;
				right: 5.8vw;
				outline: none;
			}
			input{
				position: absolute;
				right: 9vw;
				width: 46vw;
				color: #b3b3b3;
				font-size: 4vw;
				text-align: right;
				outline: none;
				border: none;
			}
			input:focus{   
				border:none;
			}
		}
	}
</style>
