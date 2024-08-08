<template>
  <div class="upper-jaw d-flex justify-center py-3">
    <!-- <v-btn-toggle
      v-model="upper_toggle_exclusive"
      multiple
      :active-class="activeClass"
      background-color="transparent"
      @change="changedBtns($event)"
    > 
      <v-btn :disabled="disabled" 
        v-for="(image, index) in toothImages" :key="index" :value="index"
        icon class="ma-0 pa-0"
        style="border-color: transparent !important;">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-img contain width="40" height="40" :src="image.image" v-on="on" v-bind="attrs"></v-img>
          </template>
          <span>{{image.toothNo}}</span>
        </v-tooltip>
        
      </v-btn>
    </v-btn-toggle> -->

    <div>
      <div class="btn-group">
        <v-btn :disabled="disabled"
          v-model="upper_toggle_exclusive"
          background-color="transparent"
          v-for="(image, index) in toothImages" :key="index"
          @click="changedBtns(index)"
          icon class="ma-0 pa-0"
          style="border-color: transparent !important;"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-img contain width="40" height="40" :src="image.image" v-on="on" v-bind="attrs"></v-img>
            </template>
            <span>{{image.toothNo}}</span>
          </v-tooltip>

        </v-btn>
      </div>
    </div>

    <v-dialog v-model="showInfo" width="300" 
      @click:outside="checkOptionSelected" 
      scrollable
    >
      <v-card class="ma-0 pa-0">
        <v-card-title style="padding: 0 !important;">
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="showInfo = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-radio-group v-model="selectedOption" @change="checkedOption(selectedOption)" class="ma-0" column dense>
            <v-radio
              class="font-weight-bold"
              v-for="(option, index) in optionsDisplay"
              :key="index"
              :label="option.text"
              :value="option.value"
            >
              <!-- <template v-if="option.value == 'löschen'" v-slot:label
              >
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="removeImportStatus(upper_toggle_exclusive)"

                >
                  löschen
                </v-btn> 
              </template> -->
          
            </v-radio>
          </v-radio-group>
        </v-card-text>

        <v-card-actions v-if="isImportMenu">
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="removeImportStatus(upper_toggle_exclusive)"
          >
            löschen
          </v-btn> 
        </v-card-actions>

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
    isImportMenu: false,
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
        text: 'aw : erneuerungsbedürftige Adhäsivbrücke (Anker)',
        value: 'aw'
      },
      {
        text: 'pw : erhaltungswürdiger Zahn mit partiellen Substanzdefekten',
        value: 'pw'
      },
      {
        text: 'ww : erhaltungswürdiger Zahn mit weitgehender Zerstörung',
        value: 'ww'
      },
      {
        text: 'ur : unzureichende Retention',
        value: 'ur'
      },
      {
        text: 'x : nicht erhaltungswürdiger Zahn',
        value: 'x'
      },
    ],
    optionsAb: [
      {
        text: 'abw : erneuerungsbedürftige Adhäsivbrücke (Brückenglied)',
        value: 'abw'
      }
    ],
    optionsE: [
      {
        text: 'ew : ersetzter, aber erneuerungsbedürftiger Zahn',
        value: 'ew'
      }
    ],
    optionsI: [
      {
        text: 'ix : zu entfernendes Implantat',
        value: 'ix'
      },
      {
        text: 'sw : erneuerungsbedürftige Suprakonstruktion',
        value: 'sw'
      },
    ],
    optionsK: [
      {
        text: 'kw : erneuerungsbedürftige Krone',
        value: 'kw'
      },
      {
        text: 'ur : unzureichende Retention',
        value: 'ur'
      },
      {
        text: 'x : nicht erhaltungswürdiger Zahn',
        value: 'x'
      },
    ],
    optionsPK: [
      {
        text: 'pw : erhaltungswürdiger Zahn mit partiellen Substanzdefekten',
        value: 'pw'
      },
      {
        text: 'ur : unzureichende Retention',
        value: 'ur'
      },
      {
        text: 'x : nicht erhaltungswürdiger Zahn',
        value: 'x'
      },
    ],
    optionsR: [
      {
        text: 'rw : erneuerungsbedürftige Wurzelstiftkappe',
        value: 'rw'
      },
      {
        text: 'ur : unzureichende Retention',
        value: 'ur'
      },
      {
        text: 'x : nicht erhaltungswürdiger Zahn',
        value: 'x'
      },
    ],
    optionsT: [
      {
        text: 'tw : erneuerungsbedürftiges Teleskop',
        value: 'tw'
      },
      {
        text: 'ur : unzureichende Retention',
        value: 'ur'
      },
      {
        text: 'x : nicht erhaltungswürdiger Zahn',
        value: 'x'
      },
    ],
    optionsB: [
      {
        text: 'bw : erneuerungsbedürfiges Brückenglied',
        value: 'bw'
      },
    ],
    upperJawTeeth: [
        {
          index: 0,
          toothNo: 18,
          value: '',
        },
        {
          index: 1,
          toothNo: 17,
          value: '',
        },
        {
          index: 2,
          toothNo: 16,
          value: '',
        },
        {
          index: 3,
          toothNo: 15,
          value: '',
        },
        {
          index: 4,
          toothNo: 14,
          value: '',
        },
        {
          index: 5,
          toothNo: 13,
          value: '',
        },
        {
          index: 6,
          toothNo: 12,
          value: '',
        },
        {
          index: 7,
          toothNo: 11,
          value: '',
        },
        {
          index: 8,
          toothNo: 21,
          value: '',
        },
        {
          index: 9,
          toothNo: 22,
          value: '',
        },
        {
          index: 10,
          toothNo: 23,
          value: '',
        },
        {
          index: 11,
          toothNo: 24,
          value: '',
        },
        {
          index: 12,
          toothNo: 25,
          value: '',
        },
        {
          index: 13,
          toothNo: 26,
          value: '',
        },
        {
          index: 14,
          toothNo: 27,
          value: '',
        },
        {
          index: 15,
          toothNo: 28,
          value: '',
        },
    ],
    array_diff: [],
    tooth_No: null,
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
      // this.selectedBtns.push( {
      //   index: this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1],
      //   value: value
      // })

      // add value into upper jaw array
      // this.upperJawTeeth[this.upper_toggle_exclusive[this.upper_toggle_exclusive.length-1]]['value'] = value
      
      var selectedJawArray_ = []
      var selectedValueArray_ = []
      this.selectedBtns.forEach(element => {
        selectedValueArray_.push(element.value);
        selectedJawArray_.push(element.index);
      })

      let arr_dif = this.arr_diff(selectedJawArray_, this.upper_toggle_exclusive)      

      // if(arr_dif.length < 1) 
      if(this.tooth_No == null)
      {
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
      }
      else {
        // let index_ = arr_dif[0]
        let index_ = this.tooth_No
    
        this.selectedBtns.push( {
          index: index_,
          value: value
        })

        if(value == 'b' || value == 'ab') {
          this.toothImages[index_] = this.b_ab_toothImages[index_]
        } else if(value == 'bw' || value == 'abw') {
          this.toothImages[index_] = this.bw_abw_toothImages[index_]
        } else if(value == 'e') {
          this.toothImages[index_] = this.e_toothImages[index_]
        } else if(value == 'ew') {
          this.toothImages[index_] = this.ew_toothImages[index_]
        } else if(value == 'i') {
          this.toothImages[index_] = this.i_toothImages[index_]
        } else if(value == 'k') {
          this.toothImages[index_] = this.k_toothImages[index_]
        } else if(value == 'kw') {
          this.toothImages[index_] = this.kw_toothImages[index_]
        } else if(value == 'a' || value == 'aw' || value == 'ur') {
          this.toothImages[index_] = this.a_aw_ur_toothImages[index_]
        } else if(value == 'pw') {
          this.toothImages[index_] = this.pw_toothImages[index_]
        } else if(value == 'r') {
          this.toothImages[index_] = this.r_toothImages[index_]
        } else if(value == 'rw') {
          this.toothImages[index_] = this.rw_toothImages[index_]
        } else if(value == 'sw') {
          this.toothImages[index_] = this.sw_toothImages[index_]
        } else if(value == 't') {
          this.toothImages[index_] = this.t_toothImages[index_]
        } else if(value == 'tw') {
          this.toothImages[index_] = this.tw_toothImages[index_]
        } else if(value == 'ww') {
          this.toothImages[index_] = this.ww_toothImages[index_]
        } else if(value == 'x' || value == 'ix') {
          this.toothImages[index_] = this.x_ix_toothImages[index_]
        } else if(value == 'i-') {
          this.toothImages[index_] = this.i_m_toothImages[index_]
        } else if(value == ')(') {
          this.toothImages[index_] = this.gap_closure_toothImages[index_]
        } else if(value == 'f') {
          this.toothImages[index_] = this.f_toothImages[index_]
        }
      }

      this.showInfo = false
      this.$emit('btn-selected', this.selectedBtns)
    },
    arr_diff(a1, a2){
      var a = [], diff = [];
      for (var i = 0; i < a1.length; i++) {
          a[a1[i]] = true;
      }

      for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
      }

      for (var k in a) {
          diff.push(k);
      }

      return diff;
    },
    changedBtns(event) {
      this.optionsDisplay = this.options
      this.isImportMenu = false
      this.tooth_No = event

      // var eventArray = [...new Set(event)]
      
      var jawArray = [...new Set(this.manualUpperJaw)]
      var newJawArray = []
      var newValueArray = []

      // var selectedArray = [...new Set(this.selectedBtns)]
      var selectedArray = this.selectedBtns
      var selectedJawArray = []
      var selectedValueArray = []


      // jawArray.forEach(element => {
      selectedArray.forEach(element => {
        // newValueArray.push(element.value);
        newValueArray[element.index] = element.value
        newJawArray.push(element.index);
      })

      selectedArray.forEach(element => {
        selectedValueArray.push(element.value);
        selectedJawArray.push(element.index);
      })

      // let index = this.arr_diff(selectedJawArray, this.upper_toggle_exclusive)[0]
      let index = event

      newJawArray = [...new Set(newJawArray)]

      if(newJawArray.indexOf(index)) {
      // if(newJawArray.indexOf(eventArray.at(-1))) {
        // let index = newJawArray.indexOf(eventArray.at(-1));

        if(newValueArray[index] == 'a') {
          this.optionsDisplay = this.optionsA
          this.isImportMenu = true
        }
        else if(newValueArray[index] == 'ab') {
          this.optionsDisplay = this.optionsAb
          this.isImportMenu = true
        }
        else if(newValueArray[index] == 'e') {
          this.optionsDisplay = this.optionsE
          this.isImportMenu = true
        }
        else if(newValueArray[index] == 'i') {
          this.optionsDisplay = this.optionsI
          this.isImportMenu = true
        }
        else if(newValueArray[index] == 'k') {
          this.optionsDisplay = this.optionsK
          this.isImportMenu = true
        }
        else if(newValueArray[index] == 'pk') {
          this.optionsDisplay = this.optionsPK
          this.isImportMenu = true
        }
        else if(newValueArray[index] == 'r') {
          this.optionsDisplay = this.optionsR
          this.isImportMenu = true
        }
        else if(newValueArray[index] == 't') {
          this.optionsDisplay = this.optionsT
          this.isImportMenu = true
        }
        else if(newValueArray[index] == 'b') {
          this.optionsDisplay = this.optionsB
          this.isImportMenu = true
        }
        else {
          this.optionsDisplay = this.options
          this.isImportMenu = false
        }
      }

      this.selectedOption = ''
      this.showInfo = true

      /*if(event.length > this.selectedBtns.length) {
        this.showInfo = true
      }*/

      // if(event.length < 1) 
      if(this.upper_toggle_exclusive.length < 1) 
      {
        this.toothImages = this.$options.data(this.toothImages).toothImages
      }

      /*if(event.length != this.selectedBtns.length) {
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
      }*/
     
      this.$emit('btn-selected', this.selectedBtns)
    },
    removeImportStatus(value) {
      console.log('value')
      
      console.log(this.tooth_No)
      console.log(value)

      // var eventArray = [...new Set(value)]
      // this.$delete(this.manualUpperJaw, eventArray.at(-1))
      console.log(this.selectedBtns)

      // this.$delete(this.selectedBtns, this.tooth_No)
      // this.$emit('btn-selected', this.selectedBtns)

      console.log(this.manualUpperJaw)
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

  .btn-group {
    display: flex;
  }

  .btn-group .v-btn {
    margin: 0 5px;
    height: 48px !important;
    width: 48px !important;
  }

  .btn-group .v-btn.active-btn {
    background-color: #1976d2; /* Primary color */
    color: white;
  }

</style>