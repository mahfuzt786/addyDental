<template>
  <admin-layout>
    <Head title="Dashboad" />

    <v-banner class="mb-4">
      <div class="d-flex flex-wrap justify-space-between">
        <h5 class="text-h5 font-weight-bold">Home</h5>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
      </div>
    </v-banner>
    
    <v-card
            elevation="2"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-card-actions>
              <v-btn
              color="deep-purple lighten-2"
                    v-for="link in links"
                    :key="link"
                    text
                  >
                    {{ link }}
                  </v-btn>
                  <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>

  </admin-layout>
</template>

<script>
import AdminLayout from "../Layouts/AdminLayout.vue";
import { Head } from "@inertiajs/inertia-vue";

export default {
  components: { AdminLayout },
  data() {
    return {
      breadcrumbs: [
        {
          text: "App",
          disabled: false,
          href: "/home",
        },
        {
          text: "Home",
          disabled: true,
          href: "/home",
        },
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
    }
  }
};
</script>
