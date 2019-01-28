<template>
  <div class="countdown">
    <v-ons-row>
      <div class="countdown__day">
        <span class="number">{{ days }}</span>
        <div class="format">{{ wordString.day }}</div>
      </div>
      <div class="countdown__hour">
        <span class="number">{{ hours }}</span>
        <div class="format">{{ wordString.hours }}</div>
      </div>
      <div class="countdown__min">
        <span class="number">{{ minutes }}</span>
        <div class="format">{{ wordString.minutes }}</div>
      </div>
      <div class="countdown__sec">
        <span class="number">{{ seconds }}</span>
        <div class="format">{{ wordString.seconds }}</div>
      </div>
    </v-ons-row>
    <div class="countdown__status" :class="statusType">{{ statusText }}</div>
  </div>
</template>
<script>
  export default {
    name: 'countdown',
    props: {
      /* startDate: {
        type: Number
      }, */
      endDate: {
        type: Number
      },
      trans: ''
    },
    data () {
      return {
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
        statusText: '',
        statusType: '',
        wordString: {},
        startTimer: '',
        endTimer: '',
        interval: ''
      }
    },
    mounted () {
      console.log('montado countdown.vue')
      // Actualizamos cada segundo
      this.startTimer = Date.now()
      this.endTimer = this.startTimer + this.endDate
      console.log('mounted.startTimer es: ' + this.startTimer)
      console.log('mounted.endTimer es: ' + this.endTimer)
      this.timerCount(this.startTimer, this.endTimer)
      this.interval = setInterval(() => {
        this.timerCount(this.startTimer, this.endTimer)
      }, 1000)
    },
    methods: {
      timerCount (start, end) {
        console.log('timerCount.start es: ' + start)
        console.log('timerCount.end es: ' + end)
        let now = Date.now()
        let timeRemaining = Math.floor((end - now) / 1000)
        console.log('timeRemaining es: ' + timeRemaining)
        if (timeRemaining >= 0) {
          this.calcTime(timeRemaining)
        } else {
          // cambiar el style del mensaje y terminar el cálculo
          return
        }
      },
      calcTime (dist) {
        // this.days = Math.floor(dist / 86400)
        this.hours = Math.floor(dist / 3600)
        this.minutes = Math.floor(dist / 60)
        this.seconds = Math.floor(dist)
      }
    }
  }
</script>
<style scoped>

</style>
