<template>
    <v-app>

      <v-app-bar
            color="white"
            density="compact"
            clipped-left fixed  app
          >

            <!-- <template v-slot:img="{ props }">
              <v-img
                width="60"
                height="60"
                :src="Logo"
                v-bind="props"
              ></v-img>
            </template> -->

            <Link :href="route('/')">
                  <application-logo style="height: 60; width: 60;" />
                </Link>

            <v-app-bar-title>ADDY.DENTAL</v-app-bar-title>

            <v-spacer></v-spacer>

            <!-- <Link v-if="$page.props.auth.user" :href="route('home')">
            <Link :href="route('home')">
              <v-btn text>Home</v-btn>
            </Link>
            <div v-else> -->
            <div>
              <Link :href="route('login')">
                <v-btn text>Login</v-btn>
              </Link>
              <!-- <Link :href="route('register')">
                <v-btn text>Register</v-btn>
              </Link> -->
            </div>

    </v-app-bar>

      <v-main>
        <slot> </slot>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import ApplicationLogo from '../components/ApplicationLogo.vue'

  export default {
    components: { 
      ApplicationLogo,
    },
    
  }
  </script>
  

  