<template>
    <v-app>

      <!-- <v-app-bar
            color="white"
            density="compact"
            clipped-left fixed  app
          >

            <! -- <template v-slot:img="{ props }">
              <v-img
                width="60"
                height="60"
                :src="Logo"
                v-bind="props"
              ></v-img>
            </template> -- >

            <v-app-bar-title>ADDY.DENTAL</v-app-bar-title>

            <v-spacer></v-spacer>

            <v-btn class="noShadow">
              <span class="newPlan"> Login </span>
            </v-btn>

            <v-btn class="noShadow">
              <span class="doctorName"> Register </span>
            </v-btn>

    </v-app-bar> -->

      <v-main>
        <slot> </slot>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    
  }
  </script>
  

  