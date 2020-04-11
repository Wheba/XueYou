<template>
	<div class="morePage">
		<div class="headContainer">
			<img class="head" :src="getImg('user/head.jpg?v=001')"/>
			<div class="iconBox" :style="{padding:type==1?0:1.5+'vw'}">
				<img :src='iconUrl' />
			</div>
			<div class="iconTitle" v-text="title"></div>
		</div>
		<hot-tag-list></hot-tag-list>
		<div class="container">
			<div class="itemBox" v-for="item in list" :key="item.id">
				<img class="thumbnail" :src="item.article_img" @click="showArticle(item)"/>
				<p class="title" v-text="item.article_name" @click="showArticle(item)"></p>
				<div class="collectionBox" :class="{selected:item.store_state==2}" @click="collection(item)">
					<img :src="getImg('user/type1-0.png')" v-show="item.store_state==1"/>
					<img :src="getImg('user/type1-1.png')" v-show="item.store_state==2"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import hotTagList from './hotTagList.vue'
	import { getTagArticleList,readHandle,storeArticle } from "@/api/user";
	import {
		Toast
	} from 'mint-ui';
	export default{
		components: {
			hotTagList
		},
		computed:{
			...mapState(['imgUrl'])
		},
		data(){
			return{
				iconUrl:'',
				title:'',
				id:'',
				type:'',
				list:[],
			}
		},
		watch:{
		  $route(to,from){
				this.getData()
		  }
		},
		created() {
			this.getData()
		},
		methods:{
			getData(){
				this.id=this.$route.query.id
				this.type=this.$route.query.type
				this.iconUrl=this.$store.state.tagItem.icon_imgon
				this.title=this.type==1?this.$store.state.tagItem.taga_name:this.$store.state.tagItem.tagb_name
				this.getList()
			},
			getImg(url){
				return this.imgUrl+url
			},
			getList(){
				this.list=[]
				var params={
					list_type:1,
					item_type:this.type,
					taga_id:this.type==1?this.id:null,
					tagb_id:this.type==2?this.id:null
				}
				getTagArticleList(params).then(res=>{
					if(res.code==200){
						this.list=res.data
					}
				})
			},
			showArticle(item){
				readHandle({article_id:item.article_id})
				window.open(item.article_url)
			},
			/*收藏文章*/
			collection(item){
				var data={
					article_id:item.article_id,
					item_state:item.store_state==1?2:1
				}
				storeArticle(data).then(res=>{
					if(res.code==200){
						if(data.item_state==2){
							Toast('文章收藏成功')
						}else{
							Toast('文章已取消收藏')
						}
						item.store_state=data.item_state
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.morePage{
		width: 100%;
		height: 100%;
		.headContainer{
			width: 100%;
			height: calc(383/750*100vw);
			overflow: hidden;
			.head{
				width: 100%;
				height: auto;
			}
			.iconBox{
				position: absolute;
				width: calc(84/750*100vw);
				height: calc(84/750*100vw);
				border: 0.5vw #ffffff solid;
				box-sizing: border-box;
				border-radius: 50%;
				padding: 1.5vw;
				top: 13vw;
				right: 33.5vw;
				img{
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}
			.iconTitle{
				position: absolute;
				color: #FFFFFF;
				font-size: 10vw;
				top: 25vw;
				text-align: center;
				right: 0;
				width: 78vw;
			}
		}
	}
	.container{
		width: calc(647/750*100vw);
		height: calc(100% - 383/750*100vw - 188/750*100vw);
		margin: 0 auto;
		overflow: scroll;
		.itemBox{
			position: relative;
			width: 100%;
			height: calc(145/750*100vw);
			background-color: #ffffff;
			margin-top: calc(35/750*100vw);
			.thumbnail{
				position: absolute;
				left: 0;
				top: 0;
				width: calc(246/750*100vw);
				height: 100%;
				object-fit: cover;
			}
			.title{
				position: absolute;
				left: 37vw;
				top: 1vw;
				color: #b3b3b3;
				font-size: 3vw;
				font-weight: 500;
			}
			.collectionBox{
				position: absolute;
				width: calc(78/750*100vw);
				height: calc(32/750*100vw);
				border-radius: 4vw;
				background-color: transparent;
				bottom: 1vw;
				right: 2vw;
				box-sizing: border-box;
				border: 1px #cccccc solid;
				display: flex;
				justify-content: center;
				align-items: center;
				img{
					width: calc(42/750*100vw);
					height: auto;
					display: block;
				}
			}
			.collectionBox.selected{
				background-color: #0087cb;
				border: 1px #0087cb solid;
			}
		}
	}
	.container::-webkit-scrollbar {
		display: none; /* Chrome Safari */
	}
</style>
