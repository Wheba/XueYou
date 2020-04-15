<template>
	<div class="excessive">
		<!-- <img :src="getImg('excessive/bg.jpg?v=001')" class="bg"/> -->
		<img :src="getImg('excessive/leftTop.png?v=001')" class="leftTop"/>
		<img :src="getImg('excessive/rightBottom.png?v=001')" class="rightBottom"/>
		<div class="middleContainer">
			<img :src="getImg('excessive/logo.png?v=001')" class="logo" :class="{logoMove:showBtn}"/>
			<img :src="getImg('excessive/txt.png?v=001')" class="txt" :class="{texMove:showBtn}"/>
			<div class="BtnBox" v-show="showBtn">
				<img :src="getImg('excessive/btn.png?v=001')" class="btn" @click="toFollow"/>
				<img :src="getImg('excessive/skip.png')" class="skip" @click="toHome"/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Excessive',
	data(){
		return{
			showBtn:false
		}
	},
	computed:{
		...mapState(['imgUrl'])
	},
	mounted() {
		this.getUserInfo();
	},
	methods:{
		getImg(url){
			return this.imgUrl+url
		},
		getUserInfo(){
			this.$store.dispatch('getUserInfo').then(res=>{
				if(res.code==200){
					if(res.user_info.user_group){//老用户
						this.showBtn=true;
						this.$store.dispatch('getTagB',res.user_info.taga_list);
					}else{//新用户
						setTimeout(this.toFollow,1000);
					}
				}
			})
			this.$store.dispatch('getTagA');
		},
		toFollow(){
			this.$router.replace('/follow')
		},
		toHome(){
			this.$router.replace('/main/home')
		}
	}
}
</script>
<style lang="scss" scoped="scoped">
	@import "~@/styles/animation.scss";
	.excessive{
		width: 100%;
		height: 100%;
		.leftTop{
			position: fixed;
			top: 0;
			left: 0;
			width: calc(283/750*100vw);
			height: auto;
		}
		.rightBottom{
			position: fixed;
			bottom: 0;
			right: 0;
			width: calc(173/750*100vw);
			height: auto;
		}
	}
	.middleContainer{
		.logo{
			position: relative;
			width: calc(483/750*100vw);
			margin: 41vw auto 0 auto;
			height: auto;
		}
		.logoMove{
			animation:logoMove .8s ease-out 1 both;
			-webkit-animation:logoMove .8s ease-out 1 both;
		}
		@keyframes logoMove
		{
		from {transform: translateY(0vw);}
		to {transform: translateY(-8vw);}
		}
		
		@-webkit-keyframes logoMove /*Safari and Chrome*/
		{
		from {transform: translateY(0vw);}
		to {transform: translateY(-8vw);}
		}
		.txt{
			position: relative;
			width: calc(462/750*100vw);
			margin: 37vw auto 0 auto;
			height: auto;
		}
		.texMove{
			animation:texMove .8s ease-out 1 both;
			-webkit-animation:texMove .8s ease-out 1 both;
		}
		@keyframes texMove
		{
		from {transform: translateY(0vw);}
		to {transform: translateY(-27vw);}
		}
		
		@-webkit-keyframes texMove /*Safari and Chrome*/
		{
		from {transform: translateY(0vw);}
		to {transform: translateY(-27vw);}
		}
		.BtnBox{
			position: relative;
			width: calc(276/750*100vw);
			margin: -3vw auto 0 auto;
			animation:fadeIn 1s ease-out .5s 1 both;
			-webkit-animation:fadeIn 1s ease-out .5s 1 both;
			.btn{
				width: 100%;
			}
			.skip{
				width: calc(73/750*100vw);
				margin: 2.5vw auto 0 auto;
			}
		}
	}
</style>
