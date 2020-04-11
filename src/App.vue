<template>
	<div id="app" v-title data-title='血友智库'>
		<transition name="fade">
			<router-view />
		</transition>
	</div>
</template>

<script>
</script>
<style lang="scss">
	html,body{
		height: 100%;
		background-color: #e4f4fd;
		overflow: hidden;
	}
	#app {
		background-color: #e4f4fd;

		.middleContainer {
			position: absolute;
			width: 100%;
			height: calc(1206/750*100vw);
			left: 0;
			top: 50%;
			transform: translate(0%, -50%);

			img {
				display: block;
			}
		}
	}

	.bg {
		position: absolute;
		width: 100%;
		height: auto;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter,
	.fade-leave-to

	/* .fade-leave-active below version 2.1.8 */
		{
		opacity: 0;
	}
</style>
