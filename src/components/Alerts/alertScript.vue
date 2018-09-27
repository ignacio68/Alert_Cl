<template>
  <v-ons-card class="alertCard">
    <div class="title">
      <!--v-ons-row>
        <v-ons-col width="21%">
          <img
              :src="userIcon"
              class="alertCard__userIcon"
          >
        </v-ons-col>
        <v-ons-col>
          <h3 class="alertCard__userName">{{ userName }}</h3>
        </v-ons-col>
      </v-ons-row-->
      <h1>MI ALERTA</h1>
    </div>

    <div class="content">
      <v-ons-list class="alertList">
        <v-ons-list-item class="alertList__item">
          <label for="alertTitle" class="alertList__item-label">Título</label>
          <input 
                class="alertList__item-title"
                type="text"
                id="alertTitle"
                v-model.text="alertTitle"
                >
        </v-ons-list-item>
        <v-ons-list-item class="alertList__item">
          <label for="alertTitle" class="alertList__item-label">Texto</label>
          <textarea 
                class="alertList__item-text"
                type="text"
                id="alertText"
                v-model.text="alertText"
                ></textarea>
        </v-ons-list-item>
        <v-ons-list-item class="alertList__item">
          <label for="alertTitle" class="alertList__item-label">Caducidad</label>
          <input 
                class="alertList__item-endDate"
                type="date"
                id="endDate"
                v-model.text="endDate"
                >
        </v-ons-list-item>
        <v-ons-list-item class="alertList__item">
          <label for="alertTitle" class="alertList__item-label">Link</label>
          <input 
                class="alertList__item-link"
                type="url"
                id="alertLink"
                v-model.text="alertLink"
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
        default: ''
      },
      userName: {
        type: String,
        default: ''
      },
      endDate: {
        type: String,
        default: ''
      },
      labelTitle: {
        type: String,
        default: ''
      },
      alertTitle: {
        type: String,
        default: ''
      },
      labelText: {
        type: String,
        default: ''
      },
      alertText: {
        type: String,
        default: ''
      },
      alertPhone: {
        type: String,
        default: ''
      },
      alertLink: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
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