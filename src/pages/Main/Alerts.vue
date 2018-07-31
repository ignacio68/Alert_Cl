<template>
  <v-ons-page>
    <div class="container">
      <h1>{{ $t('lang.pages.alerts.main.text')}}</h1>
      <v-ons-list class="alertsList">
        <v-ons-list-item
          :modifier="md ? 'nodivider' : ''"
          class="socialButtonsList__item"
          v-for="(alert, index) in alerts" :key="alert.userName" tappable>
          <the-alert
            :userIcon="alert.userIcon"
            :userName="alert.userName"
            :countDown="alert.countDown"
            :alertTitle="alert.alertTitle"
            :alertText="alert.alertText"
            :phoneButton="$t('lang.components.alerts.phoneButton')"
            :linkButton="$t('lang.components.alerts.linkButton')"
            >
          </the-alert>
        </v-ons-list-item>
      </v-ons-list>
      <v-ons-fab
      	position="bottom right"
      	ripple="true"
      >
      <v-ons-icon icon="ion-edit, material:zmdi-email-open"></v-ons-icon>
    </v-ons-fab>
    </div>
  </v-ons-page>
</template>

<script>
  import TheAlert from '../../components/Shared/TheAlert'
  export default {
    name: 'alerts',
    components: {
      TheAlert
    },
    data () {
      return {
        alerts: {
          RealMadrid: {
            userIcon:"../../assets/Real-Madrid-logo-256",
            userName:"Real Madrid",
            countDown:2563698,
            alertTitle:"Asientos partido Real Madrid-Barcelona",
            alertText:"Todavía quedan algunos asientos libres para el Clásico de esta tarde"
          },
          AtleticoMadrid: {
            userIcon:"../../assets/Atletico-Madrid-logo-256",
            userName:"Atlético de Madrid",
            countDown:4589752,
            alertTitle:"Palco VIP partido Atlético-Celta",
            alertText:"Tenemos un palco Vip en el primer anfiteatro para el partido de esta tarde. 1.000€"
          },
        }
      }
    }
  }
</script>

<style scoped>

</style>
