<template>
  <admin-layout>
    <div class="home-page mx-8 my-4">
      <div class="d-flex align-center justify-space-between ma-0 pa-0">
        <!-- <v-img :src="Logo" max-width="50" max-height="50" contain></v-img> -->
        <!-- <span class="text-h5 font-weight-bold">Festzuschuss.Online</span>
        <v-btn @click="reset" class="logout-btn" elevation="0" color="#BBDEFB">log-out</v-btn> -->
      </div>
      <div class="ma-auto" style="max-width: min-content">
        <div class="d-flex mt-12 mb-5 pa-0">
          <span class="pr-1">Befundeingabe <a @click="showInfo=true">info</a></span>
        </div>
        <div class="reset-btn">
          <!-- <v-btn @click="resetLoad" class="" elevation="0" color="#BBDEFB">Löschen</v-btn> -->
        </div>
        <div class="my-3">

          <div v-show="calculated" :class="calculated?'d-flex':''" class="align-center">
            <span class="px-3">TP</span>
            <div class="d-flex justify-center">
              <v-btn-toggle tile background-color="transparent">
                <v-btn 
                  text
                  disabled
                  class="ma-0 pa-0"
                  style="border-color: transparent !important; color: black !important;"
                  v-for="btn in upperJawTP"
                  :key="btn.index"
                >
                  {{btn.value}}
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>

          <div v-show="calculated" :class="calculated?'d-flex':''" class="align-center">
            <span class="px-3">RV</span>
            <div class="d-flex justify-center">
              <v-btn-toggle tile background-color="transparent">
                <v-btn 
                  text
                  disabled
                  class="ma-0 pa-0"
                  style="border-color: transparent !important; color: black !important;"
                  v-for="btn in upperJawRV"
                  :key="btn.index"
                >
                  {{btn.value}}
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>
          

          <div class="button-container">
            <div class="d-flex align-center">
              <span class="px-3">B</span>
              <div class="d-flex justify-center">
                <v-btn-toggle tile background-color="transparent">
                  <v-btn 
                    text
                    disabled
                    class="ma-0 pa-0 text-lowercase"
                    style="border-color: transparent !important; color: black !important;"
                    v-for="btn in upperJawSelected"
                    :key="btn.index"
                  >
                    {{btn.value}}
                  </v-btn>
                </v-btn-toggle>
              </div>
              <span class="px-3">
                <span class="mdi mdi-application-import" style="cursor: pointer" @click="importDialog=true"></span>
                <span class="mdi mdi-trash-can-outline" style="cursor: pointer; color: darkred; font-size: 24px;" @click="resetLoad"></span>
              </span>
            </div>

            <div class="px-8 py-2">
              <UpperJaw
                @btn-selected="upperJawSelectedBtn($event)"
                :resetBtns="resetBtns"
                :disabled="disabled"
                :manualUpperJaw="manualUpperJaw"
                :upperJawRV="isTP ? upperJawTP : upperJawRV"
                :apiCallSuccess="apiCallSuccess"
                :statusImport="statusImport"
              ></UpperJaw>
              <TeethNumbers></TeethNumbers>
              <Mandible
                @btn-selected="MandibleSelectedBtn($event)"
                :resetBtns="resetBtns"
                :disabled="disabled"
                :manualMandible="manualMandible"
                :MandibleRV="isTP ? MandibleTP : MandibleRV"
                :apiCallSuccess="apiCallSuccess"
                :statusImport="statusImport"
              ></Mandible>
            </div>
            <div class="d-flex align-center">
              <span class="px-3">B</span>
              <div class="d-flex justify-center">
                <v-btn-toggle tile background-color="transparent">
                  <v-btn 
                    text
                    disabled
                    class="ma-0 pa-0 text-lowercase"
                    style="border-color: transparent !important; color: black !important;"
                    v-for="btn in MandibleSelected"
                    :key="btn.index"
                  >
                    {{btn.value}}
                  </v-btn>
                </v-btn-toggle>
              </div>
            </div>
          </div>

          <div v-show="calculated" :class="calculated?'d-flex':''" class="align-center">
            <span class="px-3">RV</span>
            <div class="d-flex justify-center">
              <v-btn-toggle tile background-color="transparent">
                <v-btn 
                  text
                  disabled
                  class="ma-0 pa-0"
                  style="border-color: transparent !important; color: black !important;"
                  v-for="btn in MandibleRV"
                  :key="btn.index"
                >
                  {{btn.value}}
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>

          <div v-show="calculated" :class="calculated?'d-flex':''" class="align-center">
            <span class="px-3">TP</span>
            <div class="d-flex justify-center">
              <v-btn-toggle tile background-color="transparent">
                <v-btn 
                  text
                  disabled
                  class="ma-0 pa-0"
                  style="border-color: transparent !important; color: black !important;"
                  v-for="btn in MandibleTP"
                  :key="btn.index"
                >
                  {{btn.value}}
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>

        </div>

        <div class="table-container my-3" v-if="calculated">
          <v-simple-table outlined>
            <template v-slot:default>
            <tbody>
              <tr>
                <td class="backColorTable"> Honorar BEMA </td>
                <td class="totalAmountBema"> {{ totalBema }} <span v-html="euro"></span> </td>
              </tr>

              <tr>
                <td class="backColorTable"> Honorar GOZ / GOA </td>
                <td class="totalAmountGoz"> {{totalGav}} <span v-html="euro"></span> </td>
              </tr>

              <tr>
                <td class="backColorTable"> Labor gewerblich </td>
                <td> 0.00 € </td>
              </tr>

              <tr>
                <td class="backColorTable"> Eigenlabor </td>
                <td> 0.00 <span v-html="euro"></span> </td>
              </tr>

              <tr>
                <td class="backColorTable"> Summe </td>
                <td> {{totalSumCalc}} <span v-html="euro"></span> </td>
              </tr>

              <tr>
                <td class="backColorTable"> Festzuschusse </td>
                <td v-if="apiCallSuccess"> {{totalAmount}} <span v-html="euro"></span> </td>
                <td v-if="!apiCallSuccess"> XXX,XX </td>
              </tr>

              <tr>
                <td class="backColorTable"> Eigenanteil Patient </td>
                <td> 0.00 <span v-html="euro"></span> </td>
              </tr>

              </tbody>

              </template>

          </v-simple-table>
        </div>

        <div v-if="calculated" class="my-4">
          <div>Bonus: <span class="font-weight-black">{{bonus}}%</span></div>

          <v-simple-table outlined class="my-2">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center text-subtitle-1 font-weight-black">Case</th>
                  <th class="text-center text-subtitle-1 font-weight-black">Zahn/Gebiet</th>
                  <th class="text-center text-subtitle-1 font-weight-black">Versorgung</th>
                </tr>
              </thead>
              <tbody>
              <!-- <template v-for="(data, index) in tableData" > -->

                <tr v-for="(data, index) in tableData" :key="index">
                  <td class="text-center" v-if="index !== 'Final'">{{data["Case Name"]}}</td>
                  <td class="text-center" v-if="index !== 'Final'">{{ data["Case Region"] }}</td>
                  <td class="text-center" v-if="index !== 'Final'"> 
                          <!-- <v-btn
                            block
                            :id="'planen'+index" @click=displayPlanen(index) style="color:blue;"> planen 
                          </v-btn> -->

                    <v-dialog
                      transition="dialog-top-transition"
                      max-width="750"
                      persistent
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                          :id="'planen'+index" @click=displayPlanen(index)
                        >planen</v-btn>
                      </template>
                      <template v-slot:default="dialogPlan">
                        <v-card>
                          <v-card-title class="text-h5">
                            {{data["Case Name"]}}, {{ data["Case Region"] }}
                          </v-card-title>

                          <v-card-text>
                      
                            <v-simple-table outlined class="my-2" v-if="index !== 'Final'">
                              <template v-slot:default>
                                <tbody>
                                  <tr>
                                    <th class="text-center text-subtitle-1 font-weight-black">Regelversorgung</th>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div v-for="(dataRV, indexRV) in data['RV Details']" :key="indexRV" style="margin-bottom: 15px; margin-top: 5px;">
                                          <input type="radio" :value="indexRV" name="RV_GAV_AAV" v-on:change="displayRVs('lblRV', 'RV' + index + indexRV, ''+index +indexRV); dialogPlan.value = false" />
                                          <label :for="indexRV" :id="'lblRV' + index + indexRV"> {{ dataRV['RV Solution Name']}}</label>
                                          <textarea style="display:none;" :id="'RV' + index + indexRV" > {{dataRV}} </textarea>

                                          <v-divider></v-divider>
                                        </div>
                                    </td>
                                  </tr>

                                  <tr>
                                    <th class="text-center text-subtitle-1 font-weight-black">Gleichartiger Zahnersatz</th>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div v-for="(dataGAV, indexGAV) in data['GAV Details']" :key="indexGAV" style="margin-bottom: 15px; margin-top: 5px;">
                                          <input type="radio" :value="indexGAV" name="RV_GAV_AAV" v-on:change="displayRVs('lblGAV', 'GAV' + index + indexGAV, ''+index + indexGAV); dialogPlan.value = false" />
                                          <label :for="indexGAV" :id="'lblGAV' + index + indexGAV"> {{ dataGAV['GAV Solution Name'] }}</label>
                                          <textarea style="display:none;" :id="'GAV' + index + indexGAV" > {{dataGAV}} </textarea>

                                          <v-divider></v-divider>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr>
                                    <th class="text-center text-subtitle-1 font-weight-black">Andersartiger Zahnersatz</th>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div v-for="(dataAAV, indexAAV) in data['AAV Details']" :key="indexAAV" style="margin-bottom: 15px; margin-top: 5px;">
                                          <input type="radio" :value="indexAAV" name="RV_GAV_AAV" v-on:change="displayRVs('lblAAV', 'AAV' + index + indexAAV, ''+index + indexAAV); dialogPlan.value = false" />
                                          <label :for="indexAAV" :id="'lblAAV' + index + indexAAV"> {{ dataAAV['AAV Solution Name'] }}</label>
                                          <textarea style="display:none;" :id="'AAV' + index + indexAAV" > {{dataAAV}} </textarea>

                                          <v-divider></v-divider>
                                        </div>
                                    </td>                          
                                  </tr>

                                </tbody>
                              </template>
                            </v-simple-table>

                          </v-card-text>

                          <v-card-actions class="justify-end">
                            <v-spacer></v-spacer>
                            <v-btn
                              color="red darken-1"
                              text
                              @click="dialogPlan.value = false"
                            >
                              abbrechen
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </td>

                  <!-- <v-dialog
                    v-model="dialogSolution[index]"
                    max-width="750"
                    persistent
                  >
                  <v-card>
                    <v-card-title class="text-h5">
                      {{data["Case Name"]}}, {{ data["Case Region"] }}
                    </v-card-title>

                    <v-card-text>
                      
                      <v-simple-table outlined class="my-2" v-show="displaySecond === index" v-if="index !== 'Final'">
                        <template v-slot:default>
                          
                          <tbody>
                            <tr>
                              <th class="text-center text-subtitle-1 font-weight-black">Regelversorgung</th>
                            </tr>
                            <tr>
                              <td>
                                <div v-for="(dataRV, indexRV) in data['RV Details']" :key="indexRV" style="margin-bottom: 15px; margin-top: 5px;">
                                    <input type="radio" :value="indexRV" name="RV_GAV_AAV" v-on:change="displayRVs('lblRV', 'RV' + index + indexRV, ''+index +indexRV)" />
                                    <label :for="indexRV" :id="'lblRV' + index + indexRV"> {{ dataRV['RV Solution Name']}}</label>
                                    <textarea style="display:none;" :id="'RV' + index + indexRV" > {{dataRV}} </textarea>

                                    <v-divider></v-divider>
                                  </div>
                              </td>
                            </tr>

                            <tr>
                              <th class="text-center text-subtitle-1 font-weight-black">Gleichartiger Zahnersatz</th>
                            </tr>
                            <tr>
                              <td>
                                <div v-for="(dataGAV, indexGAV) in data['GAV Details']" :key="indexGAV" style="margin-bottom: 15px; margin-top: 5px;">
                                    <input type="radio" :value="indexGAV" name="RV_GAV_AAV" v-on:change="displayRVs('lblGAV', 'GAV' + index + indexGAV, ''+index + indexGAV)" />
                                    <label :for="indexGAV" :id="'lblGAV' + index + indexGAV"> {{ dataGAV['GAV Solution Name'] }}</label>
                                    <textarea style="display:none;" :id="'GAV' + index + indexGAV" > {{dataGAV}} </textarea>

                                    <v-divider></v-divider>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <th class="text-center text-subtitle-1 font-weight-black">Andersartiger Zahnersatz</th>
                            </tr>
                            <tr>
                              <td>
                                <div v-for="(dataAAV, indexAAV) in data['AAV Details']" :key="indexAAV" style="margin-bottom: 15px; margin-top: 5px;">
                                    <input type="radio" :value="indexAAV" name="RV_GAV_AAV" v-on:change="displayRVs('lblAAV', 'AAV' + index + indexAAV, ''+index + indexAAV)" />
                                    <label :for="indexAAV" :id="'lblAAV' + index + indexAAV"> {{ dataAAV['AAV Solution Name'] }}</label>
                                    <textarea style="display:none;" :id="'AAV' + index + indexAAV" > {{dataAAV}} </textarea>

                                    <v-divider></v-divider>
                                  </div>
                              </td>                          
                            </tr>

                          </tbody>
                        </template>
                      </v-simple-table>

                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <!- - <v-btn
                        color="red darken-1"
                        text
                        @click="dialogSolution[index] = false"
                      >
                        abbrechen
                      </v-btn>  - ->

                      <v-btn
                        color="red darken-1"
                        text
                        @click="closePlannen(index)"
                      >
                        abbrechen
                      </v-btn> 
                    </v-card-actions>
                  </v-card>
                  </v-dialog> -->

                </tr>
              </tbody>

            </template>
          </v-simple-table>


          <v-dialog
            v-model="dialogCalc"
            max-width="750"
            persistent
          >
            <v-card>
              <v-card-title class="text-h5">
                
              </v-card-title>

              <v-card-text>

                <h3 v-if="dataRV_GAV_AAV['RV#']">BEMA-Positionen</h3>
                <v-simple-table v-if="dataRV_GAV_AAV['RV#']" outlined class="my-2">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">BEMA-Nr.</th>
                        <th class="text-left">Leistungsbeschreibung</th>
                        <th class="text-left">Zahn/ Gebiet</th>
                        <th class="text-left">Anzahl</th>
                        <th class="text-left">Betrag (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(datasRV, indexRV) in dataRV_GAV_AAV['RV Solution BEMA name']" :key="indexRV">
                        <td> {{indexRV}}</td>
                        <td> {{datasRV}} </td>
                        <td> {{dataRV_GAV_AAV['RV Solution BEMA Region'][indexRV]}} </td>
                        <td> {{dataRV_GAV_AAV['RV Solution BEMA Quantity'][indexRV]}} </td>
                        <td class="clsBemaAmount"> {{dataRV_GAV_AAV['RV Solution BEMA amount'][indexRV]}} </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

                <h3 v-if="dataRV_GAV_AAV['GAV#']">BEMA-Positionen</h3>
                <v-simple-table v-if="dataRV_GAV_AAV['GAV#']" outlined class="my-2">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">BEMA-Nr.</th>
                        <th class="text-left">Leistungsbeschreibung</th>
                        <th class="text-left">Zahn/ Gebiet</th>
                        <th class="text-left">Anzahl</th>
                        <th class="text-left">Betrag (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(datasGAV, indexGAV) in dataRV_GAV_AAV['GAV Solution BEMA name']" :key="indexGAV">
                        <td> {{indexGAV}}</td>
                        <td> {{datasGAV}} </td>
                        <td> {{dataRV_GAV_AAV['GAV Solution BEMA Region'][indexGAV]}} </td>
                        <td> {{dataRV_GAV_AAV['GAV Solution BEMA Quantity'][indexGAV]}} </td>
                        <td class="clsBemaAmount"> {{dataRV_GAV_AAV['GAV Solution BEMA amount'][indexGAV]}} </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

                <h3 v-if="dataRV_GAV_AAV['GAV#']">GOZ-Positionen</h3>
                <v-simple-table v-if="dataRV_GAV_AAV['GAV#']" outlined class="my-2">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">GOZ-Nr.</th>
                        <th class="text-left">Leistungsbeschreibung</th>
                        <th class="text-left">Zahn/ Gebiet</th>
                        <th class="text-left">Anzahl</th>
                        <th class="text-left" style="width: 150px;">Faktor</th>
                        <th class="text-left">Betrag (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(datasGAV, indexGAV) in dataRV_GAV_AAV['GAV Solution GOZ name']" :key="indexGAV">
                        <td> {{indexGAV}}</td>
                        <td> {{datasGAV}}</td>
                        <td> {{dataRV_GAV_AAV['GAV Solution GOZ Region'][indexGAV]}}</td>
                        <td> {{dataRV_GAV_AAV['GAV Solution GOZ Quantity'][indexGAV]}}</td>
                        <td style="width: 150px;">
                          <v-slider
                            value="1"
                            v-model="sliderValue"
                            :tick-labels="ticksLabels"
                            :max="2"
                            step="1"
                            ticks="always"
                            tick-size="4"
                            :thumb-size="36"
                            :vertical="false"
                            v-on:change="displayFak(dataRV_GAV_AAV['GAV#'] +dataRV_GAV_AAV['GAV Solution GOZ Region'][indexGAV]+selectedCaseId, dataRV_GAV_AAV['GAV Solution GOZ amount'][indexGAV], 'GAV')"
                            :id="'GAVSlider'+ dataRV_GAV_AAV['GAV#'] +dataRV_GAV_AAV['GAV Solution GOZ Region'][indexGAV]+selectedCaseId"
                          >
                          </v-slider>
                          
                        </td>
                        <td class="clsGozAmount" :id="'GAVAmount'+ dataRV_GAV_AAV['GAV#'] +dataRV_GAV_AAV['GAV Solution GOZ Region'][indexGAV]+selectedCaseId"> {{ gozAmount(dataRV_GAV_AAV['GAV Solution GOZ amount'][indexGAV], '2.3') }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

                <h3 v-if="dataRV_GAV_AAV['AAV#']">GOZ-Positionen</h3>
                <v-simple-table v-if="dataRV_GAV_AAV['AAV#']" outlined class="my-2">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">GOZ-Nr.</th>
                        <th class="text-left">Leistungsbeschreibung</th>
                        <th class="text-left">Zahn/ Gebiet</th>
                        <th class="text-left">Anzahl</th>
                        <th class="text-left" style="width: 150px;">Faktor</th>
                        <th class="text-left">Betrag (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(datasAAV, indexAAV) in dataRV_GAV_AAV['AAV Solution GOZ name']" :key="indexAAV">
                        <td v-if="datasAAV"> {{indexAAV}}</td>
                        <td v-if="datasAAV"> {{datasAAV}}</td>
                        <td v-if="datasAAV"> {{dataRV_GAV_AAV['AAV Solution GOZ Region'][indexAAV]}}</td>
                        <td v-if="datasAAV"> {{dataRV_GAV_AAV['AAV Solution GOZ Quantity'][indexAAV]}}</td>
                        <td v-if="datasAAV" style="width: 150px;">
                          <v-slider
                            value="1"
                            :tick-labels="ticksLabels"
                            :max="2"
                            step="1"
                            ticks="always"
                            tick-size="4"
                            :thumb-size="36"
                            :vertical="false"
                            v-on:change="displayFak(dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId, dataRV_GAV_AAV['AAV Solution GOZ amount'][indexAAV], 'AAV')"
                            :id="'AAVSlider'+ dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId"
                          >
                          </v-slider>

                          <!-- <input type="range" min="1" max="3" step="1" v-model="faktors"> -->
                          <!-- {{gozTotalCalc(dataRV_GAV_AAV['GAV Solution GOZ amount'])}} -->
                        </td>
                        <td v-if="datasAAV" class="clsGozAmount" :id="'AAVAmount'+ dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId"> {{ gozAmount(dataRV_GAV_AAV['AAV Solution GOZ amount'][indexAAV], '2.3') }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

                <h3 v-if="dataRV_GAV_AAV['AAV#']">
                  Optionale GOZ-Positionen
                </h3>
                <v-simple-table v-if="dataRV_GAV_AAV['AAV#']" outlined class="my-2">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">GOZ-Nr.</th>
                        <th class="text-left">Leistungsbeschreibung</th>
                        <th class="text-left">Zahn/ Gebiet</th>
                        <th class="text-left">Anzahl</th>
                        <th class="text-left" style="width: 150px;">Faktor</th>
                        <th class="text-left">Betrag (€)</th>
                        <th class="text-left">Active / Not Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(datasAAV, indexAAV) in dataRV_GAV_AAV['AAV Solution GOZ name Opt']" :key="indexAAV">
                        <td v-if="datasAAV"> {{indexAAV}}</td>
                        <td v-if="datasAAV"> {{datasAAV}}</td>
                        <td v-if="datasAAV"> {{dataRV_GAV_AAV['AAV Solution GOZ Region Opt'][indexAAV]}}</td>
                        <td v-if="datasAAV"> {{dataRV_GAV_AAV['AAV Solution GOZ Quantity Opt'][indexAAV]}}</td>
                        <td v-if="datasAAV" style="width: 150px;">
                          <v-slider
                            value="1"
                            :tick-labels="ticksLabels"
                            :max="2"
                            step="1"
                            ticks="always"
                            tick-size="4"
                            :thumb-size="36"
                            :vertical="false"
                            v-on:change="displayFak(dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId, dataRV_GAV_AAV['AAV Solution GOZ amount Opt'][indexAAV], 'oAAV')"
                            :id="'oAAVSlider'+ dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId"
                          >
                          </v-slider>
                        </td>
                        <td v-if="datasAAV" class="clsGozAmountNo" :id="'oAAVAmount'+ dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId"> {{ gozAmount(dataRV_GAV_AAV['AAV Solution GOZ amount Opt'][indexAAV], '2.3') }}
                        </td>
                        <td v-if="datasAAV">
                          <v-switch
                            v-model="optGoz"
                            color="success"
                            :value="'oAAVAmount'+ indexAAV"
                            hide-details
                            @change="optGozActivate"
                          ></v-switch>
                        </td>

                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="green darken-1"
                  text
                  @click="calcTable(dialogRow)"
                >
                  speichern
                </v-btn>

                <v-btn
                  color="red darken-1"
                  text
                  @click="closeCalc(); dialogCalc = false"
                >
                  abbrechen
                </v-btn> 
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-overlay :value="overlay">
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-overlay>
        </div>
        
        <div v-if="!calculated" class="d-flex ubernehmen">
          <v-text-field
            label="Befundeingabe"
            v-model="findingsEntries"
            :rules="errorMsg?[errorMsg]:[rules.validEntry]"
            dense
            outlined
            class="mr-4"
            :readonly="disabled"
          ></v-text-field>
          <!-- <span v-if="!$v.findingsEntries.validEntry && $v.findingsEntries.$dirty" class="red--text">Invalid</span> -->
          <v-btn @click="calculateFindingsEntries" class="" elevation="0" color="#BBDEFB">Übernehmen</v-btn>
        </div>
        
        <div v-if="!calculated" class="d-flex col-2 pa-0 bonus">
          <v-select
            label="Bonus"
            v-model="bonus"
            :items="bonusOptions"
            item-text="text"
            item-value="value"
            dense
            outlined
          ></v-select>
        </div>
        <div v-if="!calculated" class="d-flex col-2 pa-0 festzuschüsse-berechnen">
          <v-btn @click="apiCall" class="" elevation="0" color="#BBDEFB">Zahnersatz planen</v-btn>
        </div>
      </div>
      <v-dialog v-model="showInfo" width="500">
        <Information></Information>
      </v-dialog>

      <v-dialog v-model="importDialog" width="500">
        <v-card>
          <v-card-title class="text-h5">
            Import Status
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="findingsEntriesImport"
              dense
              outlined
              class="mr-4"
              :readonly="disabled"
            ></v-text-field>

          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="calculateFindingsImport"
            >
              speichern
            </v-btn>

            <v-btn
              color="red darken-1"
              text
              @click="importDialog = false"
            >
              abbrechen
            </v-btn> 
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </admin-layout>
</template>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>
<script>
  import Information from '../components/Information'
  import UpperJaw from '../components/UpperJaw'
  import Mandible from '../components/Mandible'
  import TeethNumbers from '../components/TeethNumbers'
  // import Logo from '@/assets/addy_logo.png'
  import { mapActions, mapGetters } from 'vuex'
  import AdminLayout from "../Layouts/AdminLayout.vue";

  
  const options = ["a", "ab", "aw", "abw", "b", "e", "ew", "f", "i", "ix", "i-", "k", "kw", "pw", "r", "rw", "sw", "t", "tw", "ur", "ww", "x", "\\)\\("]
  const validEntry = (value) => {
    let findingsArray = / /.test(value)? value.split(' '): value.split(',')
    return findingsArray.every((ex) => {
      return options.some((status) => {
        let regex = `(\\d{2}-\\d{2}${status}?)|(\\d{2}${status}?)`
        return new RegExp(regex).test(ex)
      })
    })
  }

  export default {
    name: 'Home',

    components: {
      AdminLayout,
      Information,
      UpperJaw,
      Mandible,
      TeethNumbers
    },
    data: () => ({
      showInfo: false,
      importDialog: false,
      upperJawSelected: [
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
      upperJawRV: [
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
      upperJawTP: [
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
      MandibleSelected: [
        {
          index: 0,
          toothNo: 48,
          value: '',
        },
        {
          index: 1,
          toothNo: 47,
          value: '',
        },
        {
          index: 2,
          toothNo: 46,
          value: '',
        },
        {
          index: 3,
          toothNo: 45,
          value: '',
        },
        {
          index: 4,
          toothNo: 44,
          value: '',
        },
        {
          index: 5,
          toothNo: 43,
          value: '',
        },
        {
          index: 6,
          toothNo: 42,
          value: '',
        },
        {
          index: 7,
          toothNo: 41,
          value: '',
        },
        {
          index: 8,
          toothNo: 31,
          value: '',
        },
        {
          index: 9,
          toothNo: 32,
          value: '',
        },
        {
          index: 10,
          toothNo: 33,
          value: '',
        },
        {
          index: 11,
          toothNo: 34,
          value: '',
        },
        {
          index: 12,
          toothNo: 35,
          value: '',
        },
        {
          index: 13,
          toothNo: 36,
          value: '',
        },
        {
          index: 14,
          toothNo: 37,
          value: '',
        },
        {
          index: 15,
          toothNo: 38,
          value: '',
        },
      ],
      MandibleRV: [
        {
          index: 0,
          toothNo: 48,
          value: '',
        },
        {
          index: 1,
          toothNo: 47,
          value: '',
        },
        {
          index: 2,
          toothNo: 46,
          value: '',
        },
        {
          index: 3,
          toothNo: 45,
          value: '',
        },
        {
          index: 4,
          toothNo: 44,
          value: '',
        },
        {
          index: 5,
          toothNo: 43,
          value: '',
        },
        {
          index: 6,
          toothNo: 42,
          value: '',
        },
        {
          index: 7,
          toothNo: 41,
          value: '',
        },
        {
          index: 8,
          toothNo: 31,
          value: '',
        },
        {
          index: 9,
          toothNo: 32,
          value: '',
        },
        {
          index: 10,
          toothNo: 33,
          value: '',
        },
        {
          index: 11,
          toothNo: 34,
          value: '',
        },
        {
          index: 12,
          toothNo: 35,
          value: '',
        },
        {
          index: 13,
          toothNo: 36,
          value: '',
        },
        {
          index: 14,
          toothNo: 37,
          value: '',
        },
        {
          index: 15,
          toothNo: 38,
          value: '',
        },
      ],
      MandibleTP: [
        {
          index: 0,
          toothNo: 48,
          value: '',
        },
        {
          index: 1,
          toothNo: 47,
          value: '',
        },
        {
          index: 2,
          toothNo: 46,
          value: '',
        },
        {
          index: 3,
          toothNo: 45,
          value: '',
        },
        {
          index: 4,
          toothNo: 44,
          value: '',
        },
        {
          index: 5,
          toothNo: 43,
          value: '',
        },
        {
          index: 6,
          toothNo: 42,
          value: '',
        },
        {
          index: 7,
          toothNo: 41,
          value: '',
        },
        {
          index: 8,
          toothNo: 31,
          value: '',
        },
        {
          index: 9,
          toothNo: 32,
          value: '',
        },
        {
          index: 10,
          toothNo: 33,
          value: '',
        },
        {
          index: 11,
          toothNo: 34,
          value: '',
        },
        {
          index: 12,
          toothNo: 35,
          value: '',
        },
        {
          index: 13,
          toothNo: 36,
          value: '',
        },
        {
          index: 14,
          toothNo: 37,
          value: '',
        },
        {
          index: 15,
          toothNo: 38,
          value: '',
        },
      ],
      // Logo,
      bonus: 60,
      bonusOptions: [
        {
          text: '60%',
          value: 60
        },
        {
          text: '70%',
          value: 70
        },
        {
          text: '75%',
          value: 75
        },
        {
          text: '100%',
          value: 100
        },
      ],
      calculated: false,
      statusImport: false,
      findingsEntries: '',
      findingsEntriesImport: '',
      disabled: false,
      resetBtns: false,
      dialogCalc: false,
      // dialogSolution: [], // issues
      displaySecond: false,
      dataRV_GAV_AAV: [],
      manualUpperJaw: [],
      manualMandible: [],
      tableData: [],
      rules: {
        validEntry: value => validEntry(value) || 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
      },
      toothNumberISO: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
      apiCallSuccess: false,
      errorMsg: '',
      errorImport: '',
      decryptedId: '',
      allowedStatus: ["a", "ab", "aw", "abw", "b", "e", "ew", "f", "i", "ix", "i-", "k", "kw", "pw", "r", "rw", "sw", "t", "tw", "ur", "ww", "x", ")(", "\\)\\("],
      importStatus: ["", "a", "ab", "e", "j", "i", "i-", "k", "pk", "r", "t", "b", "f", ")(", " "],
      case_name : {
                      '1.1' : 'Krone',
                      '1.2' : 'Teilkrone',
                      '2.1' : 'zahnbegrenzte Lücke',
                      '2.2' : 'zahnbegrenzte Lücke',
                      '2.3' : 'zahnbegrenzte Lücke',
                      '2.4' : 'zahnbegrenzte Lücke',
                      '2.5' : 'zahnbegrenzte Lücken',
                      '3.1' : 'Restzahngebiss',
                      '3.2' : 'Restzahngebiss',
                      '4.1' : '1-3 Restzähne',
                      '4.2' : 'zahnloser Oberkiefer',
                      '4.3' : '1-3 Restzähne',
                      '4.4' : 'zahnloser Unterkiefer',
                      '7.1' : 'erneuerungsbedürftige Suprakonstruktion',
                      '7.2' : 'erneuerungsbedürftige Suprakonstruktion',
                  },
      // faktors: 1,
      sliderValue: 1,
      resetGozAmount: 1,
      idGozSlider: '',
      ticksLabels: [
        '1',
        '2.3',
        '3.5',
      ],
      totalGav: '0.00',
      totalBema: '0.00',
      totalSumCalc: '0.00',
      euro: '&euro;',
      overlay: false,
      dialogRow: 0,
      checkbox: true,
      planLabel: '',
      dataCaseName: '',
      selectedTableData: '',
      optGoz: [],
      RVShortcut: '',
      TPShortcut: '',
      isTP: false,
      selectedCaseId:'',
    }),
    watch: {
      
    },
    mounted() {
      // var data = sessionStorage.getItem("testData");

      // this.decryptedId = CryptoJS.AES.decrypt(window.sessionStorage["testData"].toString(), 'secret key')
      // this.decryptedId = this.decryptedId.toString(CryptoJS.enc.Utf8);

      // if(data == '')
      // {
      //   this.$router.push("/");
      // }


      // this.getStatusImport().then((response) => {
      //   // console.log(response.data)
      //   this.findingsEntriesImport = response.data
      // })
    },
    computed: {
      // ...mapGetters(["isLoggedIn"]),
      totalAmount() {

        if(this.tableData['Final'] && 
          this.tableData['Final'].length > 0
        ) {
          return (this.tableData['Final'].map(i=>i.price).reduce((a,b)=>Number(a)+Number(b),0)).toFixed(2)
        } else {
          return 'XXX,XX'
        }
      },
      invalidEntries() {
        return this.upperJawSelected.every(item => item.value=='') && this.MandibleSelected.every(item => item.value=='')
      }
    },
    methods: {
      ...mapActions([
        'calculateValuesApi',
        // 'getStatusImport'
      ]),
      upperJawSelectedBtn(events) {
        this.upperJawSelected = this.$options.data(this.upperJawSelected).upperJawSelected
        if(events.length > 0) {
          this.upperJawSelected = this.upperJawSelected.map((value)=> {
            for(let i=0; i<events.length; i++) {
              if(value.index == events[i].index) {
                value.value = events[i].value
              }
            }
            return value
          })
        } else {
          this.upperJawSelected = this.upperJawSelected.map((value)=> {
              value.value = ''
              return value
            })
        }
        // this.resetBtns = false
      },
      MandibleSelectedBtn(events) {
        this.MandibleSelected = this.$options.data(this.MandibleSelected).MandibleSelected
        if(events.length > 0) {
          this.MandibleSelected = this.MandibleSelected.map((value)=> {
            for(let i=0; i<events.length; i++) {
              if(value.index == events[i].index) {
                value.value = events[i].value
              }
            }
            return value
          })
        } else {
          this.MandibleSelected = this.MandibleSelected.map((value)=> {
              value.value = ''
              return value
            })
        }
        this.resetBtns = false
      },
      apiCall() {
        if((this.rules.validEntry(this.findingsEntries) || this.errorMsg) && (this.findingsEntries || !this.invalidEntries)) {
          this.calculated = true
          this.disabled = true
          this.apiCallSuccess = false
          let upperInput = []
          let mandibleInput = []
          upperInput = this.upperJawSelected.map((value) => {
            let obj = {}
            obj[value.toothNo] = value.value
            return obj
          })
          mandibleInput = this.MandibleSelected.map((value) => {
            let obj = {}
            obj[value.toothNo] = value.value
            return obj
          })
          let input = upperInput.concat(mandibleInput.reverse())
          input.push({"00": this.bonus})

          this.overlay = true

          this.calculateValuesApi(input).then((response) => {
            // console.log(input)
            // console.log(JSON.stringify(input[0][18]))
            // console.log(JSON.stringify(input[1][17]))
            console.log(response.data[1])
            console.log(response.data[0])

            if(response.data.length>1) {
              let title = '';
              let text = '';
              let condition = ['"f"', '"x"', '"ew"', '"bw"', '"kx"','"swfb"'];
              if(response.data[1][0]['Case Region'] == 'OK')
              {
                // title = 'Versorgung an [17+/27] erforderlich?';
                title = '';
                if(condition.includes(JSON.stringify(input[0][18])) // == '"f"'
                    && condition.includes(JSON.stringify(input[1][17])) // == '"f"'
                ) {
                  title = 'Versorgung an [17] erforderlich?';
                }

                if(condition.includes(JSON.stringify(input[14][28])) // == '"f"'
                    && condition.includes(JSON.stringify(input[15][27])) // == '"f"'
                ) {
                  title = 'Versorgung an [27] erforderlich?';
                }
                text = 'Answer "Ja / Nein"';
              }
              if(response.data[1][0]['Case Region'] == 'UK')
              {
                // title = 'Versorgung an [37+/47] erforderlich?';
                title = '';

                if(condition.includes(JSON.stringify(input[16][38])) // == '"f"'
                    && condition.includes(JSON.stringify(input[17][37])) // == '"f"'
                ) {
                  title = 'Versorgung an [37] erforderlich?';
                }

                if(condition.includes(JSON.stringify(input[31][48])) // == '"f"'
                    && condition.includes(JSON.stringify(input[30][47])) // == '"f"'
                ) {
                  title = 'Versorgung an [47] erforderlich?';
                }
                text = 'Answer "Ja / Nein"';
              }
              if(response.data[1][0]['Case Region'] == 'OK,UK')
              {
                title = 'Versorgung an [17+/27] erforderlich? <br/> Versorgung an [37+/47] erforderlich?';
                text = 'Answer "Ja / Nein"';
              }

              this.$fire({
                text: text,
                title: title,
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#A55',
                confirmButtonText: 'Ja',
                cancelButtonText: 'Nein'
              }).then((result) => {

                if (result.value) { //3.1 [0]
                  this.displayData(response.data[1])
                }
                else { // [1] 2.xers
                  this.displayData(response.data[0])
                }
              })
            }
            // if(response.data.length>1) {
            else {
              this.displayData(response.data)
            }
            // this.apiCallSuccess = true
          })

        } else {
          console.log('invalid')
        }
      },
      displayData(responseData) {
        // console.log(responseData)

        // responseData[''].pop().forEach(element => {
        // var rvData = "16 : K, 15 : BV, 14 : KV".split(",");
        //   // console.log(rvData)
        //   rvData.forEach(element => {
        //   let splitedElement = element.split(':')
        //   // console.log(splitedElement)
        //   if(Number(splitedElement[0])<30) {
        //     this.upperJawRV = this.upperJawRV.map((value) => {
        //       if(value.toothNo == Number(splitedElement[0])) {
        //         value.value = splitedElement[1]
        //       }
        //       return value
        //     })
        //   } else {
        //     this.MandibleRV = this.MandibleRV.map((value) => {
        //       if(value.toothNo == Number(splitedElement[0])) {
        //         value.value = splitedElement[1]
        //       }
        //       return value
        //     })
        //   }
        // });

        this.tableData = responseData
        // this.apiCallSuccess = true //to change teeth images
        this.dataRV_GAV_AAV = []
        this.overlay = false
      },
      displayRVs(label, idValue, ids) {
        let dataValues = JSON.parse(document.getElementById(idValue).value)

        // console.log(dataValues)
        // console.log(dataValues['GAV Solution shortcuts'])

        /** Reset Images **/
        this.apiCallSuccess = false
        /*this.upperJawRV = this.upperJawRV.map((teethAll) => {
            teethAll.value = ''
          return teethAll
        })

        this.MandibleRV = this.MandibleRV.map((teethAll) => {
            teethAll.value = ''
          return teethAll
        })

        this.upperJawTP = this.upperJawTP.map((teethAll) => {
            teethAll.value = ''
          return teethAll
        })

        this.MandibleTP = this.MandibleTP.map((teethAll) => {
            teethAll.value = ''
          return teethAll
        })*/

        // this.resetBtns = true
        // this.RVShortcut = ''
        // this.TPShortcut = ''

        if(label == 'lblRV') {
          this.planLabel = label+ids
          this.RVShortcut = dataValues['RV Solution shortcuts'];
        }

        if(label == 'lblGAV') {
          this.planLabel = label+ids
          this.RVShortcut = dataValues['RV Solution shortcuts'];
          // this.TPShortcut = dataValues['GAV Solution shortcuts'];
          // this.TPShortcut = dataValues['TP Solution shortcuts'];

          let newKM = '';
          for(let tp in dataValues['TP Solution shortcuts']) {
            var kms = []
            
            if(tp == 'BM') {
              kms = dataValues['TP Solution shortcuts'][tp].trim().slice(0, -1).split(",");
            }
            if(tp == 'KM' || tp == 'PKM') {
              kms = dataValues['TP Solution shortcuts'][tp].trim().split(",");
            }

            for(let k=0; k<kms.length; k++) {
              newKM += kms[k] + ' : ' + tp + ', '
            }
          }

          this.TPShortcut = String(newKM);
        }

        if(label == 'lblAAV') {
          this.planLabel = label+ids
          this.RVShortcut = dataValues['RV Solution shortcuts'];
          // this.TPShortcut = dataValues['AAV Solution shortcuts'];
          // this.TPShortcut = dataValues['TP Solution shortcuts'];

          let newKM = '';
          for(let tp in dataValues['TP Solution shortcuts']) {
            var kms = []
            
            if(tp == 'SKM') {
              kms = dataValues['TP Solution shortcuts'][tp].trim().slice(0, -1).split(",");
            }
            if(tp == 'KM') {
              kms = dataValues['TP Solution shortcuts'][tp].trim().split(",");
            }

            for(let k=0; k<kms.length; k++) {
              newKM += kms[k] + ' : ' + tp + ', '
            }
          }

          this.TPShortcut = String(newKM);
        }

        this.dataRV_GAV_AAV = dataValues
        this.optGoz = []
        this.dialogCalc = true
        this.selectedCaseId = idValue
        // console.log(this.dataRV_GAV_AAV)

      },
      gozAmount(amountGoz, factorValue) {

        return (parseFloat(factorValue) * parseFloat(amountGoz)).toFixed(2);
      },
      reset() {
        // Object.assign(this.$data, this.$options.data.apply(this))
        // this.resetBtns = true
        
        // localStorage.setItem("apiData", '');
        sessionStorage.setItem("testData", '');
        location.reload()
        
        // this.$v.$reset()
      },
      resetLoad() {
        location.reload()
      },
      findStatus(array) {
        let char = null
        array.forEach((value) => {
          if(/-/.test(value)) {
            if(/[a-z]/.test(value.split("-")[1])) {
              char = value.split("-")[1].match(/[a-z]/g).join('')
              return
            }
          } else {
            if(/[a-z]/.test(value)) {
              char = value.match(/[a-z]/g).join('')
              return
            }
          }
        })
        return char
      },
      calculateFindingsImport() {
        let findingsArrayImportIni = null
        let findingsArrayImport = []
        let findingsArrayTeeth = [18, 17, 16, 15, 14, 13, 12, 11,
                                  21, 22, 23, 24, 25, 26, 27, 28,
                                  38, 37, 36, 35, 34, 33, 32, 31,
                                  41, 42, 43, 44, 45, 46, 47, 48,
                                ]
        

        if(!this.findingsEntriesImport.split(',')) {
          console.log('ERROR')
        }

        // findingsArrayImportIni = this.findingsEntriesImport.split(',')[1].split("") //into array by each char
        findingsArrayImportIni = this.findingsEntriesImport.split(',')[1].split(/(..)/g).filter(s => s); //into array of 2 char

        if(!findingsArrayImportIni) {
          console.log('ERROR')
        }

        for(let i=0; i<findingsArrayImportIni.length; i++) {

          //Add teeth nos to the status array
          if(findingsArrayImportIni[i] == 'j ')
          {
            findingsArrayImportIni[i] = findingsArrayTeeth[i]+'i'
          }
          else if(findingsArrayImportIni[i] == 'i ')
          {
            findingsArrayImportIni[i] = findingsArrayTeeth[i]+'i*' //using * in place of - in i- as - is ambigious
          }
          // else if(findingsArrayImportIni[i] == ')')
          // {
          //   findingsArrayImportIni[i] = findingsArrayTeeth[i]+')('
          // }
          // else if(findingsArrayImportIni[i] == '(')
          // {
          //   findingsArrayImportIni[i] = findingsArrayTeeth[i]+' '
          // }
          else if(findingsArrayImportIni[i] == '  ')
          {
            findingsArrayImportIni[i] = findingsArrayTeeth[i]+''
          }
          else {
            findingsArrayImportIni[i] = findingsArrayTeeth[i]+findingsArrayImportIni[i].trim()
          }

        }

        // resultStatus = resultStatus.substr(0, resultStatus.length-1);

        // console.log(findingsArrayImportIni)
        
        for(let i=0; i<findingsArrayImportIni.length; i++) {
          //Add teeth nos to the status array
          let char = undefined
          char = findingsArrayImportIni[i].match(/[a-z)(\-]/g)
          // console.log(char)

          if( char !== null
          )
          {
            findingsArrayImport.push(findingsArrayImportIni[i]);
          }
        }
        // console.log(findingsArrayImport)

        for(let i=0; i<findingsArrayImport.length; i++) {
          if(/-/.test(findingsArrayImport[i])) {
            let start_num = Number(findingsArrayImport[i].split("-")[0])
            let end_num = Number(findingsArrayImport[i].split("-")[1].match(/[0-9]/g).join(''))
            let char = undefined
            char = findingsArrayImport[i].split("-")[1].match(/[a-z)(\-]/g)

            if(!char) {
              char = this.findStatus(findingsArrayImport.slice(i,findingsArrayImport.length))
            } else {
              char = char.join('')
            }

            // check valid numbers in status
            let isValidNum = this.toothNumberISO.find(value => value==start_num) && this.toothNumberISO.find(value => value==end_num)
            if(isValidNum == undefined) {
              this.errorMsg = 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
              return
            } else {
              this.errorMsg = ''
            }

            // check valid charecters in status
            let isValidChar = this.importStatus.find(value => value==char)
            if(isValidChar == undefined) {
              this.errorMsg = 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
              return
            } else {
              this.errorMsg = ''
            }

            let start_num_index = this.toothNumberISO.indexOf(start_num)
            let end_num_index = this.toothNumberISO.indexOf(end_num)
            if(start_num_index<=15 && end_num_index>15) {
              this.errorMsg = 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
              return
            } else if(start_num_index>=16 && end_num_index<16) {
              this.errorMsg = 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
              return
            } else {
              this.errorMsg = ''
            }
            if(start_num_index>end_num_index) {
              let temp = start_num_index
              start_num_index = end_num_index
              end_num_index = temp
            }
            for(let i=start_num_index;i<=end_num_index;i++) {
              if(start_num<30) {
                let filteredUpperJawSelected = this.upperJawSelected.find((value) => {
                  if(value.index == i) {
                    return value
                  }
                })
                if(filteredUpperJawSelected) {
                  filteredUpperJawSelected.value = char
                  this.manualUpperJaw.push(filteredUpperJawSelected)
                }
              } else {
                let filteredMandibleSelected = this.MandibleSelected.find((value) => {
                  if(value.index == i%16) {
                    return value
                  }
                })
                if(filteredMandibleSelected) {
                  filteredMandibleSelected.value = char
                  this.manualMandible.push(filteredMandibleSelected)
                }
              }
            }
          } else {
            let numbs = findingsArrayImport[i].match(/[0-9]/g).join('')
            let char = undefined
            char = findingsArrayImport[i].match(/[a-z)(*]/g) //using * in place of - in i- as - is ambigious
            // console.log(char)

            if(!char) {
              char = this.findStatus(findingsArrayImport.slice(i,findingsArrayImport.length))
            } else {
              char = char.join('')
              if(char == 'i*') {
                char = 'i-'; //change i* to i-
              }
            }

            // check valid numbers in status
            let isValidNum = this.toothNumberISO.find(value => value==numbs)
            if(isValidNum == undefined) {
              this.errorMsg = 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
              return
            } else {
              this.errorMsg = ''
            }
            
            // check valid charecters in status
            let isValidChar = this.importStatus.find(value => value==char)
            if(isValidChar == undefined) {
              this.errorMsg = 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
              return
            } else {
              this.errorMsg = ''
            }

            if(numbs && char) {
              if(Number(numbs)<30) {
                let filteredUpperJawSelected = this.upperJawSelected.find((value) => {
                  if(value.toothNo == Number(numbs)) {
                    return value
                  }
                })
                filteredUpperJawSelected.value = char
                this.manualUpperJaw.push(filteredUpperJawSelected)
              } else {
                let filteredMandibleSelected = this.MandibleSelected.find((value) => {
                  if(value.toothNo == Number(numbs)) {
                    return value
                  }
                })
                filteredMandibleSelected.value = char
                this.manualMandible.push(filteredMandibleSelected)
              }
            }
          }
        }

        // For the status import popup Start
        this.importDialog = false
        this.statusImport = true
        
        const importBoxes = document.getElementsByClassName("ma-0 pa-0 v-btn--icon");
        
        for(let b=0; b<importBoxes.length; b++) {
          importBoxes[b].style.backgroundColor = "transparent";
        }
      },
      calculateFindingsEntries() {
        let findingsArray = null

        if(/ /.test(this.findingsEntries)) {
          findingsArray = this.findingsEntries.split(' ')
        } else {
          findingsArray = this.findingsEntries.split(',')
        }
            // console.log(findingsArray)

        for(let i=0; i<findingsArray.length; i++) {
          if(/-/.test(findingsArray[i])) {
            let start_num = Number(findingsArray[i].split("-")[0])
            let end_num = Number(findingsArray[i].split("-")[1].match(/[0-9]/g).join(''))
            let char = undefined
            char = findingsArray[i].split("-")[1].match(/[a-z)(]/g)

            if(!char) {
              char = this.findStatus(findingsArray.slice(i,findingsArray.length))
            } else {
              char = char.join('')
            }

            // check valid numbers in status
            let isValidNum = this.toothNumberISO.find(value => value==start_num) && this.toothNumberISO.find(value => value==end_num)
            if(isValidNum == undefined) {
              this.errorMsg = 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
              return
            } else {
              this.errorMsg = ''
            }

            // check valid charecters in status
            let isValidChar = this.allowedStatus.find(value => value==char)
            if(isValidChar == undefined) {
              this.errorMsg = 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
              return
            } else {
              this.errorMsg = ''
            }

            let start_num_index = this.toothNumberISO.indexOf(start_num)
            let end_num_index = this.toothNumberISO.indexOf(end_num)
            if(start_num_index<=15 && end_num_index>15) {
              this.errorMsg = 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
              return
            } else if(start_num_index>=16 && end_num_index<16) {
              this.errorMsg = 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
              return
            } else {
              this.errorMsg = ''
            }
            if(start_num_index>end_num_index) {
              let temp = start_num_index
              start_num_index = end_num_index
              end_num_index = temp
            }
            for(let i=start_num_index;i<=end_num_index;i++) {
              if(start_num<30) {
                let filteredUpperJawSelected = this.upperJawSelected.find((value) => {
                  if(value.index == i) {
                    return value
                  }
                })
                if(filteredUpperJawSelected) {
                  filteredUpperJawSelected.value = char
                  this.manualUpperJaw.push(filteredUpperJawSelected)
                }
              } else {
                let filteredMandibleSelected = this.MandibleSelected.find((value) => {
                  if(value.index == i%16) {
                    return value
                  }
                })
                if(filteredMandibleSelected) {
                  filteredMandibleSelected.value = char
                  this.manualMandible.push(filteredMandibleSelected)
                }
              }
            }
          } else {
            let numbs = findingsArray[i].match(/[0-9]/g).join('')
            let char = undefined
            char = findingsArray[i].match(/[a-z)(]/g)
            console.log(char)

            if(!char) {
              char = this.findStatus(findingsArray.slice(i,findingsArray.length))
            } else {
              char = char.join('')
            }

            // check valid numbers in status
            let isValidNum = this.toothNumberISO.find(value => value==numbs)
            if(isValidNum == undefined) {
              this.errorMsg = 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
              return
            } else {
              this.errorMsg = ''
            }
            
            // check valid charecters in status
            let isValidChar = this.allowedStatus.find(value => value==char)
            if(isValidChar == undefined) {
              this.errorMsg = 'Falsche Befundeingabe: Bitte korrigieren Sie den eingegebenen Befund!'
              return
            } else {
              this.errorMsg = ''
            }

            if(numbs && char) {
              if(Number(numbs)<30) {
                let filteredUpperJawSelected = this.upperJawSelected.find((value) => {
                  if(value.toothNo == Number(numbs)) {
                    return value
                  }
                })
                filteredUpperJawSelected.value = char
                this.manualUpperJaw.push(filteredUpperJawSelected)
              } else {
                let filteredMandibleSelected = this.MandibleSelected.find((value) => {
                  if(value.toothNo == Number(numbs)) {
                    return value
                  }
                })
                filteredMandibleSelected.value = char
                this.manualMandible.push(filteredMandibleSelected)
              }
            }
          }
        }
        if(this.findingsEntries) {
          this.disabled = true
        }
      },
      displayFak(faktors, amountGoz, solutionT) {
        // console.log(document.getElementById('GAVSlider'+faktors).value)
        // console.log(faktors)

        var newGozAmount = 0;

        if(solutionT == 'GAV') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('GAVSlider'+faktors).value])
          document.getElementById('GAVAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'GAVAmount'+faktors
        }

        if(solutionT == 'AAV') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('AAVSlider'+faktors).value])
          document.getElementById('AAVAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'AAVAmount'+faktors
        }

        if(solutionT == 'oAAV') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('oAAVSlider'+faktors).value])
          document.getElementById('oAAVAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'oAAVAmount'+faktors
        }

        this.resetGozAmount = amountGoz
        // console.log(document.getElementById('GAVSlider'+faktors).value)

      },
      optGozActivate() {
        console.log(this.optGoz)
        
      },
      displayPlanen(rowIndex) {
        console.log(rowIndex)
        // this.dialogSolution[rowIndex] = true;  // issue recheck
        this.dialogRow = rowIndex;
        this.displaySecond = rowIndex;
      },
      // closePlannen(rowIndex) {
      //   console.log(rowIndex)
      //   this.dialogSolution[rowIndex] = false;
      //   this.dialogSolution = [];
      // },
      closeCalc() {
        //reset the radio btn selected
        var ele = document.getElementsByName("RV_GAV_AAV");

        for(var el=0; el<ele.length; el++)
        {
          ele[el].checked = false;
        }
      },
      calcTable(dialogRowIndex) {
        // this.dialogSolution[dialogRowIndex] = false; // issue recheck

        /** Add Toggle Selected Values */
        for(var op=0; op<this.optGoz.length; op++) {
          var elementOpt = document.getElementById(this.optGoz[op]);
          elementOpt.classList.remove("clsGozAmountNo");
          elementOpt.classList.add("clsGozAmount");
        }

        const collectionGoz = document.getElementsByClassName("clsGozAmount");
        const collectionBema = document.getElementsByClassName("clsBemaAmount");

        let clsGozAmount = 0;
        let clsBemaAmount = 0;

        for(var gozI=0; gozI<collectionGoz.length; gozI++) {
          clsGozAmount += parseFloat(collectionGoz[gozI].innerText)
        }
        this.totalGav = parseFloat(parseFloat(this.totalGav) + parseFloat(clsGozAmount)).toFixed(2)

        for(var bemaI=0; bemaI<collectionBema.length; bemaI++) {
          clsBemaAmount += parseFloat(collectionBema[bemaI].innerText)
        }
        this.totalBema = parseFloat(parseFloat(this.totalBema) + parseFloat(clsBemaAmount)).toFixed(2)

        this.totalSumCalc = parseFloat(parseFloat(this.totalGav) + parseFloat(this.totalBema)).toFixed(2)

        document.getElementById("planen"+dialogRowIndex).innerHTML = document.getElementById(this.planLabel).innerHTML
        // document.getElementById("planen"+dialogRowIndex).setAttribute("disabled", "disabled");

        console.log(dialogRowIndex)

        /** DISPLAY TEETH IMAGES */
        var dataRVs = this.RVShortcut.trim().slice(0, -1).split(",");
        dataRVs.forEach(element => {
          let splitedElement = element.split(':')
          if(Number(splitedElement[0])<30) {
            this.upperJawRV = this.upperJawRV.map((teethAll) => {
              if(teethAll.toothNo == Number(splitedElement[0])) {
                teethAll.value = splitedElement[1]
              }
              return teethAll
            })
          } else {
            this.MandibleRV = this.MandibleRV.map((teethAll) => {
              if(teethAll.toothNo == Number(splitedElement[0])) {
                teethAll.value = splitedElement[1]
              }
              return teethAll
            })
          }
        });

        var dataTPs = this.TPShortcut.trim().slice(0, -1).split(",");
        if(dataTPs[0] == '') {
          this.isTP = false
        }
        else {
          this.isTP = true
        }
        dataTPs.forEach(element => {
          let splitedElement = element.split(':')
          if(Number(splitedElement[0])<30) {
            this.upperJawTP = this.upperJawTP.map((teethAll) => {
              if(teethAll.toothNo == Number(splitedElement[0])) {
                teethAll.value = splitedElement[1]
              }
              return teethAll
            })
          } else {
            this.MandibleTP = this.MandibleTP.map((teethAll) => {
              if(teethAll.toothNo == Number(splitedElement[0])) {
                teethAll.value = splitedElement[1]
              }
              return teethAll
            })
          }
        });

        this.apiCallSuccess = true
        /** DISPLAY TEETH IMAGES END */

        this.displaySecond = false;
        this.dialogCalc = false

        // RESET SLIDER GOZ AMOUNT
        this.sliderValue = 1
        var oldGozAmount = this.gozAmount(this.resetGozAmount, this.ticksLabels[1])
        if(this.idGozSlider !== '')
        {
          document.getElementById(this.idGozSlider).innerHTML = oldGozAmount
        }
        // RESET SLIDER GOZ AMOUNT END


      },
      filteredData(item) {
        return this.expandedDataSet.filter(f => f.caseId == item.caseId);
      },
      filteredHistoryData(item) {
        return this.secondExpandedDataSet.filter(f => f.RVId == item.RVId);
      }
    }
  }
</script>
<style scoped>
.button-container {
  background-color: #eeeeee;
  width: fit-content;
  padding: 10px;
}
.table-container {
  background-color: white;
  width: 275px !important;
  margin-right: 25px !important;
  /* margin-left: -300px; NOT REQ as table is shifted to bottom center, earlier parallel to tooth and left.
  float: left;
  height: 325px; */
}
.table-container .backColorTable {
  background-color: rgba(255, 209, 220, 0.3) !important;
}
.ubernehmen {
  width: 80%;
}
.ubernehmen button, .festzuschüsse-berechnen button, .logout-btn, .reset-btn button {
  border: thin solid black !important;
}
td, th {
  border: 1px solid black;
  text-align: left;
  padding: 8px;
}
th {
  background-color: #ddecdd !important;
}

table {
  table-layout: fixed;
}
.v-data-table__expanded__content td {
  padding-right: 0px !important;
  padding-left: 0px !important;
}
.v-data-table__expanded {
  box-shadow: none !important;
}
.v-data-table__expanded__content {
  background-color: rgba(255, 209, 220, 0.2) !important;
}
.v-data-table__expanded__content .expanded-datatable {
  background-color: white !important;
}
.expanded-datatable {
  border-radius: 0px !important;
  background-color: white !important;
}
thead {
  background-color: #ddecdd !important;
}
.v-progress-circular {
  margin: 1rem !important;
}

.v-btn::before {
  background-color: transparent !important;
}

</style>
