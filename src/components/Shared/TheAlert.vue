<template id="alert">
	<v-ons-card>
		<div class="title">
		</div>
		<div class="content">
		</div>
	</v-ons-card>
</template>

<script>
	export default {
		name: 'the-alert',
		props: {
    	}
		},
		methods: {
			onClick() {
				this.$emit('alertButtonEvent')
			}
		}
	}
</script>

<style scoped>
</style>