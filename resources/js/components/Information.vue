<template>
  <v-container fluid class="information-page pa-0">
    <v-simple-table dense>
      <template v-slot:default>
        <tbody>
          <tr v-for="(info, index) in information" :key="index">
            <td class="font-weight-bold">{{info.symbol}}</td>
            <td>{{info.text}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>  
</template>
<script>
export default {
  data: () => ({
    information: [
      {
        symbol: 'a',
        text: 'Adhäsivbrücke (Anker)'
      },
      {
        symbol: 'ab',
        text: 'Adhäsivbrücke (Brückenglied)'
      },
      {
        symbol: 'aw',
        text: 'erneuerungsbedürftige Adhäsivbrücke (Anker)'
      },
      {
        symbol: 'abw',
        text: 'erneuerungsbedürftige Adhäsivbrücke (Brückenglied)'
      },
      {
        symbol: 'b',
        text: 'vorhandenes Brückenglied'
      },
      {
        symbol: 'e',
        text: 'bereits ersetzter Zahn'
      },
      {
        symbol: 'ew',
        text: 'ersetzter, aber erneuerungsbedürftiger Zahn'
      },
      {
        symbol: 'f',
        text: 'fehlender Zahn'
      },
      {
        symbol: 'i',
        text: 'vorhandenes Implantat mit intakter Suprakonstruktion'
      },
      {
        symbol: 'ix',
        text: 'zu entfernendes Implantat'
      },
      {
        symbol: 'k',
        text: 'vorhandene klinisch intakte Krone'
      },
      {
        symbol: 'kw',
        text: 'erneuerungsbedürftige Krone'
      },
      {
        symbol: 'pw',
        text: 'erhaltungswürdiger Zahn mit partiellen Substanzdefekten'
      },
      {
        symbol: 'r',
        text: 'vorhandene Wurzelstiftkappe'
      },
      {
        symbol: 'rw',
        text: 'erneuerungsbedürftige Wurzelstiftkappe'
      },
      {
        symbol: 'sw',
        text: 'erneuerungsbedürftige Suprakonstruktion'
      },
      {
        symbol: 't',
        text: 'vorhandenes Teleskop'
      },
      {
        symbol: 'tw',
        text: 'erneuerungsbedürftiges Teleskop'
      },
      {
        symbol: 'ur',
        text: 'unzureichende Retention'
      },
      {
        symbol: 'ww',
        text: 'erhaltungswürdiger Zahn mit weitgehender Zerstörung'
      },
      {
        symbol: 'x',
        text: 'nicht erhaltungswürdiger Zahn'
      },
      {
        symbol: ')(',
        text: 'Lückenschluss'
      }
    ]
  })
}
</script>
<style scoped>

</style>