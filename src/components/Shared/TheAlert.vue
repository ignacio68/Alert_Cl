<template>
  <v-ons-card class="alertCard" modifier="material">
    <div class="title">
    
    </div>

    <div class="content">

      <v-ons-row>
        <v-ons-col width="15%">
          <img
            :src="userIcon"
            :alt="altIcon"
            class="alertCard__userIcon"
          >
        </v-ons-col>
        <v-ons-col width="65%">
          <h3 class="alertCard__userName">{{ userName }}</h3>
        </v-ons-col>
        <v-ons-col>
          <h4 class="alertCard__countDown">{{ countDown }}</h4>
        </v-ons-col>
      </v-ons-row>

      <v-ons-row>
        <h2 class="alertCard__title">{{ alertTitle }}</h2>
      </v-ons-row>

      <v-ons-row> 
        <p class="alertCard__text">{{ alertText }}</p>
      </v-ons-row>
        
      <v-ons-row>
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
.alertCard__userIcon {
  height: 50px;
  width: 50px;
}
.alertCard__userName {
  padding-left: 5px;
  text-align: left;
  font-weight: bold;
  border: 1px solid red;
  color: black;
}
.alertCard__countDown {
  text-align: right;
  font-size: 1em;
  color: red;
  border: 1px solid red;
}
</style>