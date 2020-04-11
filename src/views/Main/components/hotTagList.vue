<template>
	<div id="hotTageList">
		<img class="line" :src="getImg('home/line.png')"/>
		<div class="tagBox">
			<div class="item" v-for="item in hotTagList" :key='item.id'>
				<div class="iconBox" @click="changeTag(item)">
					<img class="bg" :src="getImg('home/typeBg.png')"/>
					<img class="icon" :src="item.icon_imgon"/>
				</div>
				<p v-text="item.tagb_name"></p>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		computed: {
			...mapState(['imgUrl','hotTagList'])
		},
		created() {
			if(this.hotTagList.length==0){
				this.$store.dispatch('getHotTagList')
			}
		},
		methods:{
			getImg(url) {
				return this.imgUrl + url
			},
			changeTag(data){
				this.$store.state.tagItem=data;
				this.$router.replace({
					path:'/main/more',
					query:{
						id:data.tagb_id,
						type:2
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#hotTageList{
		position: relative;
		width: 100%;
		height: calc(188/750*100vw);
		background-color: #c2e6fa;
		.line{
			display: block;
			width: 100%;
		}
		.tagBox{
			position: absolute;
			width: 100%;
			height: calc(178/750*100vw);
			bottom: 0;
			left: 0;
			display: flex;
			justify-content: space-around;
			.item{
				position: relative;
				width: calc(154/750*100vw);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.iconBox{
					position: relative;
					width: calc(86/750*100vw);
					height: calc(86/750*100vw);
					border-radius: 50%;
					margin-bottom: 1vw;
					.bg{
						position: absolute;
						width: 100%;
						height: 100%;
					}
					.icon{
						position: absolute;
						width: 60%;
						height: 60%;
						left: 50%;
						top: 50%;
						transform: translate(-50%,-50%);
					}
				}
				p{
					color: #0087cb;
					font-size: 4vw;
				}
			}
		}
	}
</style>
