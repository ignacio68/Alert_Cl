<template>
  <v-ons-page>
    <div class="container">

    	<div class="picture">
    		<div class="picture__frame">
    			<img src="../../assets/user_icon.png" alt="user icon" class="picture__frame-photo"/>
    		</div>
    	</div>

    	<form>
    		<v-ons-list class="profileList">
    			<v-ons-list-item :modifier="md ? 'nodivider' : ''" class="profileList__item">
    				<div class="left">
    					<label for="textImput">{{ $t('lang.pages.profile.main.list.input.name') }}</label>
    				</div>
    				<div class="center">
    					<v-ons-input
								id="name"
              	type="name"

              	float
              	modifier="transparent"
              	v-model="name"
              	required
            	/>
    				</div>
					</v-ons-list-item>
					<v-ons-list-item :modifier="md ? 'nodivider' : ''" class="profileList__item">
						<div class="left">
    					<label for="textImput">{{ $t('lang.pages.profile.main.list.input.email') }}</label>
    				</div>
    				<div class="center">
    					<v-ons-input
            		id="email"
              	type="email"
              	:placeholder="email"
              	float
              	modifier="transparent"
              	disabled
            	/>
    				</div>
 	  			</v-ons-list-item>
 	  			<v-ons-list-item :modifier="md ? 'nodivider' : ''" class="profileList__item">
						<div class="left">
    					<label for="textImput">{{ $t('lang.pages.profile.main.list.input.location') }}</label>
    				</div>
    				<div class="center">
    					<v-ons-input
            		id="location"
              	type="text"

              	float
              	modifier="transparent"
              	v-model="location"
            	/>
    				</div>
 	  			</v-ons-list-item>
 	  			<v-ons-list-header class="profileList__header">
						{{ $t('lang.pages.profile.main.list.header1') }}
 	  			</v-ons-list-header>
				</v-ons-list>
    	</form>
    	
       <v-ons-button
        name="onClick"
        class="profileButton"
        modifier="large"
        :disabled="false"
        ripple="true"
        @click.prevent="onSave"
      >
        {{ $t('lang.pages.profile.main.button')}}
      </v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
  export default {
    name: 'profile',
    data() {
    	return {
    		name: '',
    		email: '',
    		location: ''
    	}
    },
    computed: {
    	userEmail() {
    		this.email = this.$store.getters['user/user.email']
    	}
    },
    methods: {
    	onSave() {
        // this.$store.commit('navigator/push', HomePage)
        console.log('Guardo los cambios')
      }
    }
  }
</script>
<style scoped>
.picture {
	position: relative;
	height: 150px;
	width: 100%;
	background-color: orange;
}
.picture__frame {
	position: absolute;
	width: 90px;
	height: 90px;
	border-radius: 50%;
	border: 2px solid white;
  background-color: yellow;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.picture__frame-photo {
	width:90px;
	height: 90px;
}
.profileButton {
	width: 90%;
	margin-left: 5%;
	margin-right: 5%;
}

</style>
