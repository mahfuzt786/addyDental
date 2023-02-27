<template>
  <div class="upper-jaw d-flex justify-center py-3">
    <v-btn-toggle
      v-model="upper_toggle_exclusive"
      multiple
      :active-class="activeClass"
      background-color="transparent"
      @change="changedBtns($event)"
    >
      <v-btn :disabled="disabled" 
        v-for="(image, index) in toothImages" :key="index" icon class="ma-0 pa-0" 
        style="border-color: transparent !important;">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-img contain width="40" height="40" :src="image.image" v-on="on" v-bind="attrs"></v-img>
          </template>
          <span>{{image.toothNo}}</span>
        </v-tooltip>
        
      </v-btn>
    </v-btn-toggle>
    <v-dialog v-model="showInfo" width="300" @click:outside="checkOptionSelected">
      <v-card class="ma-0 pa-0">
        <v-radio-group v-model="selectedOption" @change="checkedOption(selectedOption)" class="ma-0" column dense>
          <v-radio
            class="font-weight-bold"
            v-for="(option, index) in optionsDisplay"
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
import ImportMixins from '../mixins/upper_jaw_imports.js'
export default {
  mixins: [
    ImportMixins
  ],
  props: [
    'resetBtns',
    'disabled',
    'manualUpperJaw',
    'upperJawRV',
    'apiCallSuccess',
    'statusImport'
  ],
  data: () => ({
    upper_toggle_exclusive: [],
    selectedBtns: [],
    showInfo: false,
    selectedOption: null,
    optionsDisplay: [],
    activeItem:'active-item',
    activeItemImport:'active-item-import',
    activeClass: 'active-item',
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
        text: 'i-',
        value: 'i-'
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
    ],
    optionsA: [
      {
        text: 'aw',
        value: 'aw'
      },
      {
        text: 'pw',
        value: 'pw'
      },
      {
        text: 'ww',
        value: 'ww'
      },
      {
        text: 'ur',
        value: 'ur'
      },
      {
        text: 'x',
        value: 'x'
      }
    ],
    optionsAb: [
      {
        text: 'abw',
        value: 'abw'
      }
    ],
    optionsE: [
      {
        text: 'ew',
        value: 'ew'
      }
    ],
    optionsI: [
      {
        text: 'ix',
        value: 'ix'
      },
      {
        text: 'sw',
        value: 'sw'
      },
    ],
    optionsK: [
      {
        text: 'kw',
        value: 'kw'
      },
      {
        text: 'ur',
        value: 'ur'
      },
      {
        text: 'x',
        value: 'x'
      },
    ],
    optionsPK: [
      {
        text: 'pw',
        value: 'pw'
      },
      {
        text: 'ur',
        value: 'ur'
      },
      {
        text: 'x',
        value: 'x'
      },
    ],
    optionsR: [
      {
        text: 'rw',
        value: 'rw'
      },
      {
        text: 'ur',
        value: 'ur'
      },
      {
        text: 'x',
        value: 'x'
      },
    ],
    optionsT: [
      {
        text: 'tw',
        value: 'tw'
      },
      {
        text: 'ur',
        value: 'ur'
      },
      {
        text: 'x',
        value: 'x'
      },
    ],
    optionsB: [
      {
        text: 'bw',
        value: 'bw'
      },
    ],
  }),
  watch: {
    resetBtns() {
      if(this.resetBtns) {
        Object.assign(this.$data, this.$options.data.apply(this))
        this.$emit('btn-selected', this.selectedBtns)
      }
    },
    manualUpperJaw() {
      if(this.manualUpperJaw.length>0) {
        this.manualUpperJaw.forEach(element => {
          this.upper_toggle_exclusive.push(element.index)
          this.checkedOption(element.value)
          // console.log(this.optionsDisplay)
          // console.log(this.upper_toggle_exclusive)
        })
      }
    },
    apiCallSuccess() {
      if(this.apiCallSuccess) {
        this.upperJawRV.forEach(element => {
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
        this.upper_toggle_exclusive = []
      }
    }
  },
  methods: {
    checkedOption(value) {
      this.selectedBtns.push( {
        index: this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1],
        value: value
      })
      if(value == 'b' || value == 'ab') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.b_ab_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'bw' || value == 'abw') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.bw_abw_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'e') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.e_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'ew') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.ew_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'i') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.i_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'k') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.k_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'kw') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.kw_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'a' || value == 'aw' || value == 'ur') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.a_aw_ur_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'pw') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.pw_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'r') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.r_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'rw') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.rw_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'sw') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.sw_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 't') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.t_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'tw') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.tw_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'ww') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.ww_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'x' || value == 'ix') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.x_ix_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'i-') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.i_m_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == ')(') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.gap_closure_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      } else if(value == 'f') {
        this.toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]] = this.f_toothImages[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]
      }
      this.showInfo = false
      this.$emit('btn-selected', this.selectedBtns)
    },
    changedBtns(event) {
      this.optionsDisplay = this.options

      var eventArray = [...new Set(event)]
      
      var jawArray = [...new Set(this.manualUpperJaw)]
      var newJawArray = []
      var newValueArray = []

      jawArray.forEach(element => {
        newValueArray.push(element.value);
        newJawArray.push(element.index);
      })

      if(newJawArray.indexOf(eventArray.at(-1))) {
        let index = newJawArray.indexOf(eventArray.at(-1));

        if(newValueArray[index] == 'a') {
          this.optionsDisplay = this.optionsA
        }
        else if(newValueArray[index] == 'ab') {
          this.optionsDisplay = this.optionsAb
        }
        else if(newValueArray[index] == 'e') {
          this.optionsDisplay = this.optionsE
        }
        else if(newValueArray[index] == 'i') {
          this.optionsDisplay = this.optionsI
        }
        else if(newValueArray[index] == 'k') {
          this.optionsDisplay = this.optionsK
        }
        else if(newValueArray[index] == 'pk') {
            this.optionsDisplay = this.optionsPK
        }
        else if(newValueArray[index] == 'r') {
          this.optionsDisplay = this.optionsR
        }
        else if(newValueArray[index] == 't') {
          this.optionsDisplay = this.optionsT
        }
        else if(newValueArray[index] == 'b') {
          this.optionsDisplay = this.optionsB
        }
        else {
          this.optionsDisplay = this.options
        }
      }

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
        this.upper_toggle_exclusive.pop()
      }
    }
  },
  mounted() {

  }
}
</script>
<style scoped>
.active-item {
  background-color: lightgreen;
  opacity: 0.5;
  border-radius: 10px !important;
}

.active-item-import {
  background-color: azure;
  opacity: 0.5;
  border-radius: 10px !important;
}

.v-btn::before {
  background-color: transparent !important;
}
</style>