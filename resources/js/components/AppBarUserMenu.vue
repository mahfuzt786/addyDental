<template>
  <v-menu
  transition="slide-x-transition" 
  bottom 
  right
  >
  <template v-slot:activator="{ on, attrs }">
      <v-btn
      icon
      v-bind="attrs"
      v-on="on"
      >
      <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
  </template>

  <v-list dense>
      <v-list-item-group
      color="primary"
      >
      <v-list-item
          v-for="(item, i) in items"
          :key="i"
      >
          <v-list-item-icon>
          <v-icon v-text="item.icon" :color="item.color"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
      </v-list-item>
      </v-list-item-group>
  </v-list>

  </v-menu>
</template>
  

  <script>
  
    export default {
      name: 'app-bar-user-menu',
      data: () => ({
        items: [
          { text: 'Profil', icon: 'mdi-account', color: 'Primary' },
          { text: 'Ausloggen', icon: 'mdi-power', color: 'red' },
        ],
        // links: [
        //   'Datum',
        //   'Patient ID',
        //   'Labor',
        //   'Laborpreis',
        //   'Labor-KVA',
        //   'Status',
        //   'Aktionen'
        // ],
        // Logo,
      }),
    }
  </script>
  
  <style scoped>
    div {
      text-align: center;
    }
    span.newPlan {
    background: #080;
    padding: 5px 15px;
    border: 1px solid#080;
    border-radius: 15px;
    color: #FFF;
    }
    button.noShadow {
      border: none !important;
      /* background: white !important; */
      box-shadow: none !important;
    }
    div.v-toolbar__content {
      padding-left: 55px !important;
    }
  </style>
  