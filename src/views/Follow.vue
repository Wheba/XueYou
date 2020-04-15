<template>
	<div class="follow">
	<!-- 	<img class="contentBg" :src="getImg('follow/bg2.png?v=003')"/> -->
		<img :src="getImg('excessive/leftTop.png?v=001')" class="leftTop" />
		<img :src="getImg('excessive/rightBottom.png?v=001')" class="rightBottom" />
		<img :src="getImg('follow/logo.png?v=001')" class="logo" />
		<div class="container">
			<img class="title" :src="getImg('follow/title'+this.step+'.png?v=001')" />
			<img class="titleLine" :src="getImg('follow/titleLine.png?v=002')" />
			<div class="stepBox1" v-show="step==1">
				<div class="box" style="margin-top: 19vw;">
					<img class="head" :class="{selectHead:user_group==1}" :src="getImg('follow/18down.png')" @click="changeGroup(1)" />
					<img class="headBox" :src="getImg('follow/Q.png')" v-show="user_group==1" />
					<img class="headSelect" :src="getImg('follow/select.png')" style="top: -4vw;right:-4vw;" v-show="user_group==1" />
				</div>
				<img class="headTxt" :src="getImg('follow/18downTxt0.png')" v-show="user_group!=1" />
				<img class="headTxt" :src="getImg('follow/18downTxt1.png')" v-show="user_group==1" />
				<div class="box" style="margin-top: 9vw;">
					<img class="head" :class="{selectHead:user_group==2}" :src="getImg('follow/18up.png')" @click="changeGroup(2)" />
					<img class="headBox" :src="getImg('follow/Q.png')" v-show="user_group==2" />
					<img class="headSelect" :src="getImg('follow/select.png')" style="top: -4vw;right:-4vw;" v-show="user_group==2" />
				</div>
				<img class="headTxt" :src="getImg('follow/18upTxt0.png')" v-show="user_group!=2" />
				<img class="headTxt" :src="getImg('follow/18upTxt1.png')" v-show="user_group==2" />
			</div>
			<div class="setpBox2" v-if="step==2">
				<div class="item" v-for="(item,index) in tagAList" :key="item.id" @click="selectTagA(index)">
					<div class="itemIconBox" :class="{select:checkTagA(item.taga_id)}">
						<img class="icon" :src="item.icon_imgoff" v-show="!checkTagA(item.taga_id)" />
						<img class="icon" :src="item.icon_imgon" v-show="checkTagA(item.taga_id)" />
						<img class="successIcon" :src="getImg('follow/select.png')" v-show="checkTagA(item.taga_id)" />
					</div>
					<p class="title" :class="{select:checkTagA(item.taga_id)}" v-text="item.taga_name"></p>
				</div>
			</div>
			<div class="setpBox3" v-if="step==3">
				<div class="item" :class="{select:checkTagB(item.tagb_id)}" v-for="(item,index) in tagBList" :key="item.id" @click="selectTagB(index)">
					<img class="successIcon" :src="getImg('follow/select.png')" v-show="checkTagB(item.tagb_id)" />
					<img class="icon" :src="item.icon_imgoff" v-show="!checkTagB(item.tagb_id)"/>
					<img class="icon" :src="item.icon_imgon" v-show="checkTagB(item.tagb_id)"/>
					<p v-text="item.tagb_name" :class="{select:checkTagB(item.tagb_id)}"></p>
				</div>
			</div>
			<div class="btnBox" v-if='step!=1'>
				<img class="tip" :src="getImg('follow/tip'+step+'.png')" v-if="step!=1" />
				<img class="btnNext" :src="getImg('follow/btnNext.png')" @click="next" />
				<img class="btnBack" :src="getImg('follow/btnBack.png')" v-if="step!=1" @click="back" />
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		Toast
	} from 'mint-ui';
	import { checkHandle } from "@/api/user";
	import qs from 'qs'
	export default {
		computed: {
			...mapState(['imgUrl', 'userInfo', "tagAList","tagBList"])
		},
		data() {
			return {
				step: 1, //1选择年龄段 2选择关注点 3选择话题
				user_group: 0, //1未满18岁 2已满18岁
				selectTagAList: [], //选中的标签1列表
				selectTagBList: [], //选中的标签2列表
				getTagBing: false,
				isSubmit:false,
			}
		},
		created() {
			if (!this.userInfo) {
				this.$router.replace('/')
			}
		},
		methods: {
			getImg(url) {
				return this.imgUrl + url
			},
			changeGroup(code) {
				this.user_group = code;
				this.$store.state.userInfo.user_group = code;
				this.step++;
			},
			/*选择标签一*/
			selectTagA(index) {
				var id = this.tagAList[index].taga_id;
				var sIndex = this.selectTagAList.indexOf(id);
				if (sIndex >= 0) {
					this.selectTagAList.splice(sIndex, 1);
				} else {
					if (this.selectTagAList.length < 3) {
						this.selectTagAList.push(id)
					} else {
						Toast('最多可选三个关注点');
					}
				}
			},
			checkTagA(id) {
				return this.selectTagAList.includes(id)
			},
			/*选择标签二*/
			selectTagB(index){
				var id = this.tagBList[index].tagb_id;
				var sIndex = this.selectTagBList.indexOf(id);
				if (sIndex >= 0) {
					this.selectTagBList.splice(sIndex, 1);
				} else {
					if (this.selectTagBList.length < 5) {
						this.selectTagBList.push(id)
					} else {
						Toast('最多可选五个话题');
					}
				}
			},
			checkTagB(id) {
				return this.selectTagBList.includes(id)
			},
			/*下一步*/
			next() {
				if (this.step == 1) {
					this.$store.state.userInfo.user_group = this.user_group;
					this.step++;
				}else if(this.step == 2) {
					if (this.getTagBing) {
						return
					}
					if (this.selectTagAList.length == 0) {
						Toast('最少需要一个关注点');
						return
					}
					var taga_list = this.selectTagAList.toString()
					this.getTagBing = true;
					this.$store.dispatch('getTagB', taga_list).then(res => {
						this.getTagBing = false;
						this.step++;
					}).catch(error => {
						this.getTagBing = false;
					})
				} else if(this.step == 3){
					if(this.isSubmit){
						return
					}
					if (this.selectTagBList.length == 0) {
						Toast('最少需要一个话题');
						return
					}
					this.isSubmit=true
					var taga_list = this.selectTagAList.toString()
					var tagb_list = this.selectTagBList.toString()
					var data={
						user_group:this.user_group,
						taga_list:taga_list,
						tagb_list:tagb_list
					}
					checkHandle(qs.stringify(data)).then(res=>{
						if(res.code==200){
							this.$router.replace('/main/home')
						}
						this.isSubmit=false
					}).catch(error=>{
						this.isSubmit=false
					})
				}
			},
			/*返回上一步*/
			back() {
				this.step--;
				if(this.step==2){
					this.selectTagBList=[]
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	img{
		display: block;
	}
	
	.follow {
		width: 100%;
		height: 100%;
		
		.contentBg{
			position: absolute;
			width: calc(646/750*100vw);
			left: 50%;
			bottom: 0%;
			transform: translate(-50%);
		}

		.leftTop {
			position: fixed;
			top: 0;
			left: 0;
			width: calc(283/750*100vw);
			height: auto;
		}

		.rightBottom {
			position: fixed;
			bottom: 0;
			right: 0;
			width: calc(173/750*100vw);
			height: auto;
		}

		.container {
			position: absolute;
			left: 0;
			width: 100%;
			height: calc(1106/750*100vw);
			top: 50%;
			transform: translateY(-50%);
			.title {
				height: calc(48/750*100vw);
				width: auto;
				margin: 17vw auto 0 auto;
			}

			.titleLine {
				height: calc(8/750*100vw);
				width: auto;
				margin: 2.7vw auto 0 auto;
			}

			.stepBox1 {
				padding-left: 4vw;

				.box {
					position: relative;
					width: calc(209/750*100vw);
					margin: 0 auto;

					.head {
						width: 100%;
						transition: transform .5s;
					}

					.selectHead {
						transform: scale(1.23);
					}

					.headBox {
						position: absolute;
						width: calc(368/750*100vw);
						height: auto;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}

					.headSelect {
						position: absolute;
						width: calc(49/750*100vw);
						height: auto;
					}
				}

				.headTxt {
					height: calc(42/750*100vw);
					margin: 8vw auto 0 auto;
				}
			}

			.setpBox2 {
				width: calc(670/750*100vw);
				height: 92vw;
				padding-top: 5vw;
				margin: 6vw auto 0 auto;
				display: flex;
				flex-wrap: wrap;
				align-content: flex-start;
				overflow: scroll;

				.item {
					width: 33%;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 6vw;

					.itemIconBox {
						position: relative;
						width: calc(126/750*100vw);
						height: calc(126/750*100vw);
						border-radius: 50%;
						background-color: #FFFFFF;
						box-shadow: 0px 0px 20px 1px rgba(0,147,217,0.2);

						.icon {
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
						.successIcon{
							position: absolute;
							width: calc(39/750*100vw);
							height: calc(38/750*100vw);
							top: 0vw;
							right: 0vw;
						}
					}

					.itemIconBox.select {
						background-color: #0087cb;
					}

					.title {
						margin: 0;
						padding: 0;
						margin-top: 1vw;
						width: 100%;
						color: #5e5f63;
						font-size: 4.2vw;
						text-align: center;
					}

					.title.select {
						color: #0487cf;
					}
				}
			}
			.setpBox3{
				width: calc(670/750*100vw);
				height: 92vw;
				padding-top: 5vw;
				margin: 6vw auto 0 auto;
				display: flex;
				flex-wrap: wrap;
				align-content: flex-start;
				justify-content: space-around;
				overflow: scroll;
				.item{
					position: relative;
					width: calc(259/750*100vw);
					height: calc(104/750*100vw);
					border-radius: 15vw;
					margin-bottom: calc(62/750*100vw);
					background-color: #ffffff;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-shadow: 0px 0px 20px 1px rgba(0,147,217,0.2);
					.icon{
						width: calc(55/750*100vw);
						height: calc(55/750*100vw);
						padding-left: calc(20/750*100vw);
					}
					p{
						width: 23vw;
						color: #646464;
						font-size: 3.9vw;
						padding-right: 2vw;
						box-sizing: border-box;
					}
					p.select{
						color: #ffffff;
					}
					.successIcon{
						position: absolute;
						width: calc(39/750*100vw);
						height: calc(38/750*100vw);
						top: -1vw;
						right: 2vw;
					}
				}
				.item.select{
					background-color: #0087cb;
				}
			}

			.btnBox {
				position: absolute;
				width: 100%;
				height: 14vw;
				bottom: 0;
				left: 0;

				.tip {
					padding-left: 7vw;
					margin: 0 auto;
					height: calc(20/750*100vw);
				}

				.btnNext {
					position: absolute;
					bottom: 0vw;
					left: calc(255/750*100vw);
					width: calc(282/750*100vw);
				}

				.btnBack {
					position: absolute;
					height: calc(70/750*100vw);
					bottom: 0;
					left: 7.5vw;
				}
			}
		}
	}

	.logo {
		position: absolute;
		width: calc(173/750*100vw);
		height: auto;
		right: calc(22/750*100vw);
		top: calc(20/750*100vw);
		animation: logoIn .8s ease-out 1 both;
		-webkit-animation: logoIn .8s ease-out 1 both;
		/* Safari 和 Chrome */
	}

	@keyframes logoIn {
		from {
			transform: translateX(20vw);
		}

		to {
			transform: translateX(0vw);
		}
	}

	@-webkit-keyframes logoIn

	/*Safari and Chrome*/
		{
		from {
			transform: translateX(20vw);
		}

		to {
			transform: translateX(0vw);
		}
	}
</style>
