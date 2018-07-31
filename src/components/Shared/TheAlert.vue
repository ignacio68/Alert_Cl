<template>
	<v-ons-card class="alertCard" modifier="material">
		<div class="title">
		</div>
		<div class="content">
			<v-col>
				<!--img 
					:src="userIcon"
					alt="user icon"
					class="alertCard__userIcon"
				/-->
			</v-col>
			<v-col>
				<v-row>
					<h3	class="alertCard__userName">{{ userName }}</h3>
					<h4 class="alertCard__countDown">{{ countDown }}</h4>
				</v-row>
				<v-row>
					<h2 class="alertCard__title">{{ alertTitle }}</h2>
				</v-row>
				<v-row>
					<p class="alertCard__text">{{ alertText }}</p>
				</v-row>
				<v-row>
					<v-ons-button 
						class="alertCard__button"
						ripple="true"
						@click.prevent="onPhoneClick()"
					>
						{{ phoneButton }}
					</v-ons-button>
					<v-ons-button 
						class="alertCard__button"
						ripple="true"
						@click.prevent="onLinkClick()"
					>
						{{ linkButton }}
					</v-ons-button>
					<v-ons-button ripple="true">
						<v-ons-icon icon="ion-share, material:md-share"/>
					</v-ons-button>
				</v-row>
			</v-col>
		
		</div>
	</v-ons-card>
</template>

<script>
	export default {
		name: 'the-alert',
		props: {
			userIcon: {
				type: String,
      	default: ''
			},
			userName: {
				type: String,
      	default: ''
			},
			countDown: {
				type: Number,
      	default: ''
			},
			alertTitle: {
				type: String,
      	default: ''
			},
			alertText: {
				type: String,
      	default: ''
			},
			phoneButton: {
				type: String,
      	default: ''
			},
			linkButton: {
				type: String,
      	default: ''
			}
    },
		methods: {
			onPhoneClick() {
				this.$emit('phonetButtonEvent')
			},
			onLinkClick() {
				this.$emit('linkButtonEvent')
			}
		}
	}
</script>

<style scoped>
</style>