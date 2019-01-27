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
      startDate: {
        type: Number,
        default: 0
      },
      endDate: {
        type: Number,
        default: 0
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
        wordString: {}
      }
    },
    created () {
      this.wordString = this.trans
    },
    mounted () {
      // this.startTime = new Date()
      // Actualizamos cada segundo
      console.log('La hora de comienzo es: ' + this.startTime)
      this.timerCount(this.startTime, this.endTime)
      this.interval = setInterval(() => {
        this.timerCount(this.startTime, this.endTime)
      }, 1000)
    },
    methods: {
      timerCount (startDate, endDate) {
        const timeRemaining = Math.floor((this.endTime - this.starTime) / 1000)

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

</style>
