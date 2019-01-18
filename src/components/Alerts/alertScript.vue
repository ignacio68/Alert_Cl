<template>
  <v-ons-card class="alertCard">
    <div class="title">
      <p class="title__text">{{ $t('lang.components.alertScript.pageTitle')}}</p>
    </div>

    <div class="content">
    	<v-ons-row>
        <v-ons-col width="21%">
          <img
            :src="userIcon"
            :alt="altIcon"
            class="alertCard__userIcon"
          >
        </v-ons-col>
        <v-ons-col>
          <h3 class="alertCard__userName">{{ userName }}</h3>
        </v-ons-col>
      </v-ons-row>
      <v-ons-list class="alertList">
        <v-ons-list-item class="alertList__item">
          <label for="alertTitle" class="alertList__item-label">{{ $t('lang.components.alertScript.title')}}</label>
          <input                
                class="alertList__item-title"
                name="alertTitle"
                type="text"
                id="alertTitle"
                v-model="alertTitle"
                >
        </v-ons-list-item>
        <v-ons-list-item class="alertList__item">
          <label for="alertTitle" class="alertList__item-label">{{ $t('lang.components.alertScript.text')}}</label>
          <textarea 
                class="alertList__item-text"
                name="alertName"
                type="text"
                id="alertText"
                v-model="alertText"
                rows="3"
                maxlength="256"
                required
                ></textarea>
        </v-ons-list-item>
        <v-ons-list-item class="alertList__item">
          <label for="alertTitle" class="alertList__item-label">{{ $t('lang.components.alertScript.end')}}</label>
          <input 
                class="alertList__item-endDate"
                name="endDate"
                type="date"
                id="endDate"
                v-model="endDate"
                required
                >
        </v-ons-list-item>
        <v-ons-list-item class="alertList__item">
          <label for="alertTitle" class="alertList__item-label">{{ $t('lang.components.alertScript.link')}}</label>
          <input 
                class="alertList__item-link"
                name="alertLink"
                type="url"
                id="alertLink"
                v-model="alertLink"
                >
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </v-ons-card>
</template>

<script>
  export default {
    name: 'alert-script',
    props: {
      userIcon: {
        type: String,
        required: true,
        default: ''
      },
      altIcon: {
        type: String,
        required: true,
        default: ''
      },
      userName: {
        type: String,
        required: true,
        default: ''
      },
      alertPhone: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        alertTitle: '',
        alertText: '',
        endDate: '',
        alertLink: ''
      }
    },
    computed: {
    	/**
    	* Comprueba si el formulario es válido
    	*/
       formIsValid () {
        // return this.alertText !== '' &&  this.endDate !== ''
        return this.alertText !== ''
      }
    },
    methods: {
    	/**
    	* Este método hay que llamarlo desde el padre,
    	* sirve para crear la alerta cuando se hace click en OK
    	* 
    	*/
    	onCreateAlert () {
    		if (!this.formIsValid) {
    		  return
    		}
    		console.log('Estoy en onCreateAlert')    		
    		// Almacenamos los datos de la alerta
    		const alertData = {
    			title: this.alertTitle,
    			text: this.alertText,
    			endDate: this.endDate,
    			link: this.alertLink
    	  }
    	  console.log(alertData)
        this.$store.dispatch('alerts/createAlert', alertData)
        // Reseteamos los campos de la alerta
        this.alertTitle = ""
        this.alertText = ""
        this.endDate = ""
        this.alertLink = ""
        // this.$router.push('/meetups')
        this.$emit('onCreateAlert')
    	}
    }
  }
</script>

<style scoped>
  .title__text {
    font-size: 20px;
    color: black;
  }
  .alertCard {
    border: 1px solid red;
  }
  .alertCard__userIcon {
    height: 50px;
    width: 50px;
    border: 1px solid blue;
  }
  .alertCard__userName {
    padding-left: 5px;
    text-align: left;
    font-weight: bold;
    color: black;
    border: 1px solid green;
  }
</style>