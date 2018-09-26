<template>
  <v-ons-card class="alertCard">
    <div class="title">
    
    </div>

    <div class="content">

      <v-ons-row>
          <h4 class="alertCard__countDown">{{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}</h4>
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
  export default {
    name: 'the-alert',
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
      endDate: {
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
    data () {
      return {
        startDate: '',
        interval: '',
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
      }
    },
    mounted () {
      this.startDate = new Date()
      // Actualizamos cada segundo
      this.timerCount(this.startDate, this.endDate)
      this.interval = setInterval(() => {
        this.timerCount(this.startDate, this.endDate)
      }, 1000)
    },
    methods: {
      onPhoneClick () {
        this.$emit('phonetButtonEvent')
      },
      onLinkClick () {
        this.$emit('linkButtonEvent')
      },
      timerCount (startDate, endDate) {
        let timeRemaining = Math.floor((this.endDate - this.starDate) / 1000)

        if (timeRemaining >= 0) {
          this.days = Math.floor(timeRemaining / 86400)
          this.hours = Math.floor(timeRemaining / 3600)
          this.minutes = Math.floor(timeRemaining / 60)
          this.seconds = Math.floor(timeRemaining)
        }
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