<template>
	<div class="alert">
		<v-ons-alert-dialog
			class="AlertDialog_text" 
			modifier="rowfooter"
		>
			{{ alertText }}
		</v-ons-alert-dialog>
		<v-ons-alert-dialog-button
			class="alertDialog_button"
			ripple="true"
			@click.prevent="onClick()">
			{{ alertButtonText}}
		</v-ons-alert-dialog-button>
	</div>
</template>

<script>
	export default {
		name: 'the-alert',
		props: {
			alertText: {
      type: String,
      default: ''
    	},
    	alertButtonText: {
    		type: String,
    		default: 'OK'
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