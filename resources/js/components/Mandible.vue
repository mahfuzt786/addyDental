<template>
  <div class="lower-jaw d-flex justify-center py-3">
    <v-btn-toggle
      v-model="mandible_toggle_exclusive"
      multiple
      active-class="active-item"
      background-color="transparent"
      @change="changedBtns($event)"
    >
      <v-btn :disabled="disabled" v-for="(image, index) in toothImages" :key="index" icon class="ma-0 pa-0" style="border-color: transparent !important;">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-img contain width="40" height="40" :class="/sw/.test(image.image)?'rotate-180':''" :src="image.image" v-on="on" v-bind="attrs"></v-img>
          </template>
          <span>{{image.toothNo}}</span>
        </v-tooltip>
      </v-btn>
    </v-btn-toggle>
    <v-dialog v-model="showInfo" @click:outside="checkOptionSelected" width="300">
      <v-card class="ma-0 pa-0">
        <v-radio-group v-model="selectedOption" @change="checkedOption(selectedOption)" class="ma-0" column dense>
          <v-radio
            class="font-weight-bold"
            v-for="(option, index) in options"
            :key="index"
            :label="option.text"
            :value="option.value"
          ></v-radio>
        </v-radio-group>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ImportMixins from '../mixins/mandible_imports.js'
export default {
  mixins: [
    ImportMixins
  ],
  props: [
    'resetBtns',
    'disabled',
    'manualMandible',
    'MandibleRV',
    'apiCallSuccess'
  ],
  data: () => ({
    mandible_toggle_exclusive: [],
    selectedBtns: [],
    showInfo: false,
    selectedOption: null,
    options: [
      {
        text: 'a',
        value: 'a'
      },
      {
        text: 'ab',
        value: 'ab'
      },
      {
        text: 'aw',
        value: 'aw'
      },
      {
        text: 'abw',
        value: 'abw'
      },
      {
        text: 'b',
        value: 'b'
      },
      {
        text: 'e',
        value: 'e'
      },
      {
        text: 'ew',
        value: 'ew'
      },
      {
        text: 'f',
        value: 'f'
      },
      {
        text: 'i',
        value: 'i'
      },
      {
        text: 'ix',
        value: 'ix'
      },
      {
        text: 'k',
        value: 'k'
      },
      {
        text: 'kw',
        value: 'kw'
      },
      {
        text: 'pw',
        value: 'pw'
      },
      {
        text: 'r',
        value: 'r'
      },
      {
        text: 'rw',
        value: 'rw'
      },
      {
        text: 'sw',
        value: 'sw'
      },
      {
        text: 't',
        value: 't'
      },
      {
        text: 'tw',
        value: 'tw'
      },
      {
        text: 'ur',
        value: 'ur'
      },
      {
        text: 'ww',
        value: 'ww'
      },
      {
        text: 'x',
        value: 'x'
      },
      {
        text: ')(',
        value: ')('
      }
    ]
  }),
  // computed: {
  //   disabledBtns: {
  //     get: function() {
  //       return this.disabled
  //     },
  //     set: function(value) {
  //       this.disabled = value
  //     }
  //   }
  // },
  watch: {
    resetBtns() {
      if(this.resetBtns) {
        Object.assign(this.$data, this.$options.data.apply(this))
        this.$emit('btn-selected', this.selectedBtns)
      }
    },
    manualMandible() {
      if(this.manualMandible.length>0) {
        this.manualMandible.forEach(element => {
          this.mandible_toggle_exclusive.push(element.index)
          this.checkedOption(element.value)
        });
      }
    },
    apiCallSuccess() {
      if(this.apiCallSuccess) {
        this.MandibleRV.forEach(element => {
          if(element.value == ' KV') {
            this.toothImages[element.index] = this.kv_toothImages[element.index]
          } else if(element.value == ' K') {
            this.toothImages[element.index] = this.K_toothImages[element.index]
          } else if(element.value == ' KM') {
            this.toothImages[element.index] = this.km_toothImages[element.index]
          } else if(element.value == ' B' || element.value == ' AB') {
            this.toothImages[element.index] = this.B_AB_toothImages[element.index]
          } else if(element.value == ' BM' || element.value == ' ABM') {
            this.toothImages[element.index] = this.bm_abm_toothImages[element.index]
          } else if(element.value == ' BV' || element.value == ' ABV') {
            this.toothImages[element.index] = this.bv_abv_toothImages[element.index]
          } else if(element.value == ' PK') {
            this.toothImages[element.index] = this.pk_toothImages[element.index]
          } else if(element.value == ' PKM') {
            this.toothImages[element.index] = this.pkm_toothImages[element.index]
          } else if(element.value == ' PKV') {
            this.toothImages[element.index] = this.pkv_toothImages[element.index]
          } else if(element.value == ' SK') {
            this.toothImages[element.index] = this.sk_toothImages[element.index]
          } else if(element.value == ' SKM') {
            this.toothImages[element.index] = this.skm_toothImages[element.index]
          } else if(element.value == ' SKV') {
            this.toothImages[element.index] = this.skv_toothImages[element.index]
          } else if(element.value == ' E') {
            this.toothImages[element.index] = this.e_toothImages[element.index]
          } else if(element.value == ' R') {
            this.toothImages[element.index] = this.r_toothImages[element.index]
          } else if(element.value == ' O') {
            this.toothImages[element.index] = this.O_toothImages[element.index]
          } else if(element.value == ' V') {
            this.toothImages[element.index] = this.V_toothImages[element.index]
          } else if(element.value == ' TV') {
            this.toothImages[element.index] = this.TV_toothImages[element.index]
          } else {
            this.toothImages[element.index] = this.toothImages[element.index]
          }
        })
        this.mandible_toggle_exclusive = []
      }
    }
  },
  methods: {
    checkedOption(value) {
      this.selectedBtns.push( {
        index: this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1],
        value: value
      })
      if(value == 'b' || value == 'ab') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.b_ab_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'bw' || value == 'abw') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.bw_abw_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'e') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.e_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'ew') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.ew_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'i') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.i_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'k') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.k_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'kw') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.kw_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'a' || value == 'aw' || value == 'ur') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.a_aw_ur_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'pw') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.pw_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'r') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.r_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'rw') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.rw_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'sw') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.sw_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 't') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.t_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'tw') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.tw_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'ww') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.ww_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'x' || value == 'ix') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.x_ix_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == ')(') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.gap_closure_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      } else if(value == 'f') {
        this.toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]] = this.f_toothImages[this.mandible_toggle_exclusive[this.mandible_toggle_exclusive.length-1]]
      }
      this.showInfo = false
      this.$emit('btn-selected', this.selectedBtns)
    },
    changedBtns(event) {
      this.selectedOption = ''
      if(event.length > this.selectedBtns.length) {
        this.showInfo = true
      }
      if(event.length < 1) {
        this.toothImages = this.$options.data(this.toothImages).toothImages
      }
      if(event.length != this.selectedBtns.length) {
        this.selectedBtns = this.selectedBtns.filter((value) => {
          let unselectedBtns = []
          for(let i=0; i<event.length; i++) {
            if (value.index == event[i]){
              return value
            } else {
              unselectedBtns.push(value.index)
            }
          }
          for(let btn of unselectedBtns) {
            this.toothImages[btn] = this.$options.data(this.toothImages).toothImages[btn]
          }
        })
      }
      this.$emit('btn-selected', this.selectedBtns)
    },
    checkOptionSelected() {
      if(!this.selectedOption) {
        this.mandible_toggle_exclusive.pop()
      }
    }
  }
}
</script>
<style scoped>
.active-item {
  background-color: lightgreen;
  opacity: 0.5;
  border-radius: 10px !important;
}
.rotate-180 {
  transform: rotate(180deg);
}
</style>