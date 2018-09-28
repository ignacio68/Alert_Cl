
<template>
  <v-ons-page>
    <div class="container">
      <h1>{{ $t('lang.pages.alerts.main.text')}}</h1>
      <v-ons-list class="alertsList">
        <v-ons-list-item
          :modifier="md ? 'nodivider' : ''"
          class="alertsList__item"
          v-for="(alert, index) in alerts" :key="alert.userName">
          <the-alert
            :userIcon="alert.userIcon"
            :altIcon="alert.altIcon"
            :userName="alert.userName"
            :endDate="alert.endDate"
            :alertTitle="alert.alertTitle"
            :alertText="alert.alertText"
            :phoneButton="$t('lang.components.alerts.phoneButton')"
            :linkButton="$t('lang.components.alerts.linkButton')"
            @linkButtonEvent="toLink(alert.alertLink)"
            >
          </the-alert>
        </v-ons-list-item>
      </v-ons-list>
      
      <v-ons-alert-dialog 
        modifier="rowfooter"
        :visible.sync="isAlertVisible"
        >
        <span slot="title">ALERTA</span>
          <p>Aquí va la alerta</p>
        <template slot="footer">
          <v-ons-alert-dialog-button @click.prevent="isAlertVisible = false">Cancel</v-ons-alert-dialog-button>
          <v-ons-alert-dialog-button @click.prevent="isAlertVisible = false">Ok</v-ons-alert-dialog-button>
        </template>
      </v-ons-alert-dialog>
    </div>
    <v-ons-fab
        class="alertScript"
        position="bottom right"
        ripple="true"
        @click.prevent="isAlertVisible = true"
      >
        <v-ons-icon
          class="alertScript__icon"
          icon="ion-edit, material:zmdi-email-open"
        >
        </v-ons-icon>
      </v-ons-fab>
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
            userIcon: 'src/assets/Real-Madrid-logo-256.png',
            altIcon: 'Real Madrid logo',
            userName: 'Real Madrid',
            endDate: 2563698,
            alertTitle: 'Asientos partido Real Madrid-Barcelona',
            alertText: 'Todavía quedan algunos asientos libres para el Clásico de esta tarde',
            alertLink: 'https://www.realmadrid.com/entradas'
          },
          AtleticoMadrid: {
            userIcon: 'src/assets/Atletico-Madrid-logo-256.png',
            altIcon: 'Atletico de Madrid logo',
            userName: 'Atlético de Madrid',
            endDate: 4589752,
            alertTitle: 'Palco VIP partido Atlético-Celta',
            alertText: 'Tenemos un palco Vip en el primer anfiteatro para el partido de esta noche. 1.000€',
            alertLink: 'https://www.atleticodemadrid.com/entradas'
          }
        },
        isAlertVisible: false
      }
    },
    methods: {
      toLink (link) {
        console.log('link to:' + link)
        window.location.href = link
      }
    }
  }
</script>

<style scoped>
  .alertScript {
    background-color: dodgerblue;
  }
  .alertScript__icon {
    color: white;
  }
</style>