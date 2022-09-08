<template>
  <!-- <v-app id="inspire">
      <v-app-bar
        app
        color="white"
        flat
      >
        <v-container class="py-0 fill-height">
          <v-avatar
            class="mr-10"
            color="grey darken-1"
            size="32"
          ></v-avatar>
  
          <v-btn
            v-for="link in links"
            :key="link"
            text
          >
            {{ link }}
          </v-btn>
  
          <v-spacer></v-spacer>
  
          <v-responsive max-width="260">
            <v-text-field
              dense
              flat
              hide-details
              rounded
              solo-inverted
            ></v-text-field>
          </v-responsive>
        </v-container>
      </v-app-bar>
  
      <v-main class="grey lighten-3">
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-sheet rounded="lg">
                <v-list color="transparent">
                  <v-list-item
                    v-for="n in 5"
                    :key="n"
                    link
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        List Item {{ n }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
  
                  <v-divider class="my-2"></v-divider>
  
                  <v-list-item
                    link
                    color="grey lighten-4"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        Refresh
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>
  
            <v-col>
              <v-sheet
                min-height="70vh"
                rounded="lg"
              >
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app> -->
    
    <v-card 
      class="mx-auto" 
      flat
      min-height="400px"
      tile
    >
        <v-layout>
          <v-app-bar
            color="white"
            density="compact"
          >

            <template v-slot:prepend>
              <v-img
                width="100"
                height="50"
                src="./assets/addy_logo.png"
              ></v-img>
            </template>

            <v-app-bar-title>ADDY.DENTAL</v-app-bar-title>

            <v-spacer></v-spacer>

            <v-btn>
              <span class="newPlan"> + Neue ZE-Planung </span>
            </v-btn>

            <v-btn>
              <span class="doctorName"> Dr. Ingmar Kappel</span>
            </v-btn>

            <v-menu
              transition="slide-x-transition"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  dark
                  icon
                  v-bind="props"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list density="compact">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :value="item"
                  active-color="Primary"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon" :color="item.color"></v-icon>
                  </template>

                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

          </v-app-bar>

          <v-main>
            <v-container fluid>
              <v-app-bar
                app
                color="white"
                flat
              >
                <v-container class="py-10 fill-height">
                  <v-btn
                    v-for="link in links"
                    :key="link"
                    text
                  >
                    {{ link }}
                  </v-btn>
                  <v-spacer></v-spacer>

                </v-container>

              </v-app-bar>

              
            </v-container>
          </v-main>

  </v-layout>
</v-card>
</template>

<!-- <script setup>
  const title = "Laravel title using vue"
</script> -->

<script>

  export default {
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

</style>
