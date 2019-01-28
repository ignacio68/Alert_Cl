<template>
  <v-ons-card class="alertCard">
    <div class="title">
    
    </div>

    <div class="content">
      <v-ons-row>
        <p class="alertCard__emissionAlert">{{ startDate }}</p>
      </v-ons-row>
      <v-ons-row>
          <!-- h4 class="alertCard__countDown">{{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}</h4 -->
          <countdown class="alertCard__countDown"
            :endDate="alertEndTime"
            :trans="leyendas"
          ></countdown>
      </v-ons-row>

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

      <v-ons-row>
        <h2 class="alertCard__title">{{ alertTitle }}</h2>
      </v-ons-row>

      <v-ons-row> 
        <p class="alertCard__text">{{ alertText }}</p>
      </v-ons-row>
        
      <v-ons-row>
        <div class="alertCard-buttons">
          
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
          <v-ons-button
            class="alertCard__button" 
            ripple="true"
          >
            <v-ons-icon icon="ion-share, material:md-share"/>
          </v-ons-button>
        </div>
      </v-ons-row>
      
    </div>
  </v-ons-card>
</template>

<script>
  import countdown from './countdown'
  export default {
    name: 'alert-message',
    components: {
      countdown
    },
    props: {
      userIcon: {
        type: String,
        default: ''
      },
      altIcon: {
        type: String,
        default: ''
      },
      userName: {
        type: String,
        default: ''
      },
      startDate: {
        type: String || Date
      },
      endDate: {
        type: String || Number
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
    data () {
      return {
        interval: '',
        leyendas: {
          day: 'D',
          hours: 'H',
          minutes: 'M',
          seconds: 'S'
        }

      }
    },
    mounted () {
      console.log('montado alertMessage.vue')
    },
    computed: {
      alertEndTime () {
        const intEndDate = parseInt(this.endDate, 10)
        console.log('Estoy en alertEndTime y numberEndDate es: ' + intEndDate)
        return intEndDate
      }
    },
    methods: {
      onPhoneClick () {
        this.$emit('phonetButtonEvent')
      },
      onLinkClick () {
        this.$emit('linkButtonEvent')
      }
    }
  }
</script>

<style scoped>
  .alertCard {
    border: 1px solid red;
  }
  .alertCard__countDown {
    text-align: right;
    font-size: 1em;
    color: red;
    border: 1px solid blue;
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
  .alertCard-buttons {
    float: right;
    right: 0px;
    border: 1px solid green;
  }
  .alertCard__button{
    margin-left: 5px;
  }
</style>