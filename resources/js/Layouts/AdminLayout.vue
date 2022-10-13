<template>
        <v-app>
          <v-app-bar
            color="white"
            density="compact"
            clipped-left fixed  app
          >

            <!-- <template v-slot:prepend> -->
            <!-- <template v-slot:img="{ props }">
              <v-img
                width="60"
                height="60"
                :src="Logo"
                v-bind="props"
              ></v-img>
            </template> -->

            <Link :href="route('home')">
                  <application-logo style="height: 75" />
                </Link>

            <v-app-bar-title>ADDY.DENTAL</v-app-bar-title>

            <v-spacer></v-spacer>

          <Link :href="route('calculation')">
            <v-btn class="noShadow">
              <span class="newPlan"> + Neue ZE-Planung </span>
            </v-btn>
          </Link>

            <v-btn class="noShadow">
              <span class="doctorName"> Dr. Ingmar Kappel</span>
            </v-btn>

          <app-bar-user-menu></app-bar-user-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

  </v-app>
      
</template>

<script>
  import ApplicationLogo from '../components/ApplicationLogo.vue'
  import AppBarUserMenu from '../components/AppBarUserMenu.vue';

  export default {
    components: { 
      ApplicationLogo,
      AppBarUserMenu,    
    },
    data: () => ({
      items: [
        { text: 'Profil', icon: 'mdi-account', color: 'Primary' },
        { text: 'Ausloggen', icon: 'mdi-power', color: 'red' },
      ],
      links: [
        'Datum',
        'Patient ID',
        'Labor',
        'Laborpreis',
        'Labor-KVA',
        'Status',
        'Aktionen'
      ],
      Logo: '',
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
    background: white !important;
    box-shadow: none !important;
  }
  div.v-toolbar__content {
    padding-left: 55px !important;
  }
</style>


