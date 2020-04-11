<template>
	<div class="home">
		<swiper ref="mySwiper" :options="swiperOptions">
			<swiper-slide v-for="item in sliderList" :key="item.id">
				<div style="position: relative;width: 100%;height: 100%;" @click="onSlider(item)">
						<img class="slideImg" :src="item.slider_img"/>
						<p class="slideTitle" v-text="item.slider_name"></p>
				</div>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<hot-tag-list></hot-tag-list>
		<div ref='container' class="container" @scroll='scrollContent'>
			<div ref='content' style="width: 100%;overflow: hidden;">
				<div class="itemBox" v-for="item in articleList" :key="item.id">
					<img class="thumbnail" :src="item.article_img" @click="showArticle(item)"/>
					<p class="title" v-text="item.article_name" @click="showArticle(item)"></p>
					<div class="collectionBox" :class="{selected:item.store_state==2}" @click="collection(item)">
						<img :src="getImg('user/type1-0.png')" v-show="item.store_state==1"/>
						<img :src="getImg('user/type1-1.png')" v-show="item.store_state==2"/>
					</div>
					<img class="btn btnMore" :src="getImg('home/btnMore.png')" @click="showMore(item)"/>
				</div>
			</div>
		</div>
		<div ref="scrollBox" class="scrollBox" v-if="showScroll">
			<div ref="scrollTop" class="scrollTop" :style="{transform: 'translateY('+scrollTop+'vw)'}"></div>
		</div>
	</div>
</template>

<script>
	import { storeArticle,readHandle,getTagbDetail,getArticleRecommend } from "@/api/user";
	import {
		mapState
	} from 'vuex'
	import {
		Swiper,
		SwiperSlide,
		directive
	} from 'vue-awesome-swiper'
	import 'swiper/css/swiper.css'
	import hotTagList from './hotTagList.vue'
	import {
		Toast
	} from 'mint-ui';
	export default {
		components: {
			Swiper,
			SwiperSlide,
			hotTagList
		},
		directives: {
			swiper: directive
		},
		computed: {
			...mapState(['imgUrl','sliderList'])
		},
		data() {
			return {
				swiperOptions: {
					autoplay:{
						disableOnInteraction:false
					},
					pagination: {
						el: '.swiper-pagination'
					},
					// Some Swiper option/callback...
				},
				articleList:[],
				showScroll:true,
				scrollContainerH:0,
				scrollContentH:0,
				scrollBoxH:0,
				scrollTopH:0,
				dowinW:0,
				scrollTop:0
			}
		},
		created() {
			if(this.sliderList.length==0){
				this.$store.dispatch('getSliderList')
			}
			this.getArticleRecommend();
			this.dowinW=document.body.clientWidth;
		},
		mounted() {
			var that=this;
			setTimeout(function(){
				that.scrollContainerH=that.$refs.container.clientHeight
				that.scrollContentH=that.$refs.content.clientHeight
				that.scrollBoxH=that.$refs.scrollBox.clientHeight
				that.scrollTopH=that.$refs.scrollTop.clientHeight
				if(that.scrollContentH>that.scrollContainerH){
					that.showScroll=true
				}else{
					that.showScroll=false
				}
			},300)
		},
		methods:{
			scrollContent(){
				if(this.showScroll){
					var scrollTop=this.$refs.container.scrollTop;
					var delH=this.scrollContentH-this.scrollContainerH;
					this.scrollTop=(this.scrollBoxH-this.scrollTopH)*scrollTop/delH/this.dowinW*100
				}
			},
			/*获取推荐文章*/
			getArticleRecommend(){
				getArticleRecommend().then(res=>{
					if(res.code==200){
						this.articleList=res.data;
					}
				})
			},
			getImg(url){
				return this.imgUrl+url
			},
			onSlider(data){
				if(data.article_id){
					readHandle({article_id:data.article_id})
				}
				window.open(data.slider_link)
			},
			showArticle(item){
				readHandle({article_id:item.article_id})
				window.open(item.article_url)
			},
			/*显示更多*/
			showMore(item){
				getTagbDetail({tagb_id:item.tagb_id}).then(res=>{
					if(res.code==200){
						this.$store.state.tagItem=res.data;
						this.$router.replace({
							path:'/main/more',
							query:{
								id:item.tagb_id,
								type:2
							}
						})
					}
				})
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

<style lang="scss">
	.home {
		height: 100%;

		.swiper-container {
			height: calc(384/750*100vw);
			.slideImg{
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			.slideTitle{
				position: absolute;
				text-align: center;
				color: #ffffff;
				width: 100%;
				top: 60%;
				transform: translateY(-60%);
				left: 0;
				font-size: 7vw;
				font-weight: 600;
			}
		}
	}
</style>
<style lang="scss" scoped="scoped">
	.container{
			position: relative;
			width: calc(647/750*100vw);
			height: calc(100% - 384/750*100vw - 188/750*100vw);
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
					color: #0067b6;
					font-size: 4vw;
					font-weight: 600;
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
				.btn{
					position: absolute;
					display: block;
					width: auto;
					bottom: 1vw;
				}
				.btnMore{
					height: calc(33/750*100vw);
					right: 14vw;
				}
			}
		}
		.container::-webkit-scrollbar {
			display: none; /* Chrome Safari */
		}
		.scrollBox{
			position: absolute;
			width: calc(4/750*100vw);
			height: calc(100% - 384/750*100vw - 188/750*100vw);
			right: calc(10/750*100vw);
			bottom: 0;
			background-color: #a2d9f5;
			.scrollTop{
				position: relative;
				width: 100%;
				height: calc(145/750*100vw);
				background-color: #38bdee;
			}
		}
</style>
