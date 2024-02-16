<template>
  <admin-layout>
    <div class="home-page mx-8 my-4">
      <div class="d-flex align-center justify-space-between ma-0 pa-0">
        <!-- <v-img :src="Logo" max-width="50" max-height="50" contain></v-img> -->
        <!-- <span class="text-h5 font-weight-bold">Festzuschuss.Online</span>
        <v-btn @click="reset" class="logout-btn" elevation="0" color="#BBDEFB">log-out</v-btn> -->
      </div>
      <div class="ma-auto" style="max-width: min-content">
        <div class="d-flex mt-12 mb-5 pa-0" style="margin-top: 5px !important;">
          <span class="pr-1">Befundeingabe <a @click="showInfo=true">info</a></span>
        </div>
        <div class="reset-btn">
          <!-- <v-btn @click="resetLoad" class="" elevation="0" color="#BBDEFB">Löschen</v-btn> -->
        </div>
        <div class="my-3">

          <div v-show="calculated" :class="calculated?'d-flex':''" class="align-center" style="background-color: #eee;">
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

          <!-- DON'T DELETE. MAY REQUIRE AGAIN -->
          <!-- <div v-show="calculated" :class="calculated?'d-flex':''" class="align-center">
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
           -->

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

          <!-- DON'T DELETE. MAY REQUIRE AGAIN -->
          <!-- <div v-show="calculated" :class="calculated?'d-flex':''" class="align-center">
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
          </div> -->

          <div v-show="calculated" :class="calculated?'d-flex':''" class="align-center" style="background-color: #eee;">
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
                <td class="totalAmountBema" style="width: 110px !important;"> {{ totalBemaDisp }} <span v-html="euro"></span> </td>

                <td class="backColorTable"> Labor gewerblich </td>
                <td style="width: 110px !important;"> 0.00 € </td>

                <td class="backColorTable"> Festzuschüsse </td>
                <!-- <td v-if="apiCallSuccess"> {{totalAmount}} <span v-html="euro"></span> </td> -->
                <td style="width: 110px !important;"> {{ totalAmountFDisp }} <span v-html="euro"></span> </td>
              </tr>

              <tr>
                <td class="backColorTable"> Honorar GOZ / GOÄ </td>
                <td class="totalAmountGoz" style="width: 110px !important;"> {{ totalGavDisp }} <span v-html="euro"></span> </td>

                <td class="backColorTable"> Eigenlabor </td>
                <td style="width: 110px !important;"> 0.00 <span v-html="euro"></span> </td>

                <td class="backColorTable"> Behandlungskosten </td>
                <td style="width: 110px !important;"> {{ totalSumCalcDisp }} <span v-html="euro"></span> </td>

                <td class="backColorTable" style="font-weight: bold;"> Eigenanteil </td>
                <td style="font-weight: bold; width: 110px !important;"> 0.00 <span v-html="euro"></span> </td>
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
                  <th class="text-center text-subtitle-1 font-weight-black" style="width: 105px !important;">Aktion</th> 
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in tableData" :key="index">
                  <td class="text-center" v-if="index !== 'Final' && index !== 'Total_case' ">{{data["Case Name"]}}</td>
                  <td class="text-center" v-if="index !== 'Final' && index !== 'Total_case' " :id="'case_region_'+index">{{ data["Case Region"] }}</td>
                  <td class="text-center" v-if="index !== 'Final' && index !== 'Total_case' "
                      :id="'planen'+index"
                  >
                  </td>
                  <td class="text-center" v-if="index !== 'Final' && index !== 'Total_case' " style="width: 105px !important;">

                    <v-dialog
                      transition="dialog-top-transition"
                      max-width="750"
                      persistent
                    >

                      <!-- Main solution display table with radio -->
                      <template v-slot:default="dialogPlan">
                      <!-- <template v-slot:activator="{ dialogPlan, on, attrs }"> -->
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
                                          <input type="radio" :value="indexRV" name="RV_GAV_AAV" v-on:change="displayRVs('lblRV', 'RV' + index + indexRV, ''+index +indexRV, index); dialogPlan.value = false" />
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
                                          <input type="radio" :value="indexGAV" name="RV_GAV_AAV" v-on:change="displayRVs('lblGAV', 'GAV' + index + indexGAV, ''+index + indexGAV, index); dialogPlan.value = false" />
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
                                          <input type="radio" :value="indexAAV" name="RV_GAV_AAV" v-on:change="displayRVs('lblAAV', 'AAV' + index + indexAAV, ''+index + indexAAV, index); dialogPlan.value = false" />
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
                      <!-- END Main solution display table with radio -->

                      <!-- Action Buttons -->
                      <template v-slot:activator="{ on, attrs }">
                        <div class="d-flex justify-space-around">
                          <!-- <v-btn
                            v-bind="attrs"
                            v-on="on"
                            @click=displayPlanen(index)
                            fab
                            dark
                            x-small
                            color="#004d81"
                            v-if="!showCasePencil[index]"
                          >
                            <v-icon dark>
                              mdi-pencil
                            </v-icon>
                          </v-btn> -->
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            @click=displayPlanen(index)
                            fab
                            dark
                            x-small
                            color="#004d81"
                            v-if=" showCasePencil.indexOf(index) == -1"
                          >
                            <v-icon dark>
                              mdi-pencil
                            </v-icon>
                          </v-btn>

                          <v-btn
                            @click="displayRVs(reOpenLabel[index], reOpenidValue[index], reOpenids[index], reOpenCaseid[index])"
                            fab
                            dark
                            x-small
                            color="#004d81"
                            v-if=" showCasePencil.indexOf(index) !== -1"
                          >
                            <v-icon dark>
                              mdi-pencil
                            </v-icon>
                          </v-btn>

                          <v-spacer></v-spacer>                          

                          <v-btn
                            @click=cancelPlanen(index)
                            fab
                            dark
                            x-small
                            color="#b51700"
                            v-if="Total_case > 1 && showCaseTrash"
                          >
                            <v-icon dark>
                              mdi-trash-can-outline
                            </v-icon>
                          </v-btn>

                          <!-- <v-btn
                            @click=cancelPlanen(index)
                            fab
                            dark
                            x-small
                            color="#b51700"
                            v-if="Total_case > 1 && showCaseTrash.indexOf(index) !== -1"
                          >
                            <v-icon dark>
                              mdi-trash-can-outline
                            </v-icon>
                          </v-btn> -->

                        </div>
                      </template>
                      <!-- END Action Buttons -->

                    </v-dialog>
                  </td>

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
                <!-- Start RV -->
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
                      <tr v-for="(datasRV, indexRV) in dataRV_GAV_AAV['RV Solution BEMA Region']" :key="indexRV">
                        <td> {{indexRV}}</td>
                        <!-- <td> {{datasRV}} </td> -->
                        <td>
                          <v-tooltip top color="success">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                text
                                v-bind="attrs"
                                v-on="on"
                                style="text-transform: none !important; height: 0px !important;"
                              >
                                {{ dataRV_GAV_AAV['RV Solution BEMA name'][indexRV]|truncate(25) }}
                              </v-btn>
                            </template>
                            <span> {{dataRV_GAV_AAV['RV Solution BEMA name'][indexRV]}} </span>
                          </v-tooltip>
                        </td>
                        <!-- <td> {{dataRV_GAV_AAV['RV Solution BEMA Region'][indexRV]}} </td> -->
                        <td> {{datasRV}} </td>
                        <td> {{dataRV_GAV_AAV['RV Solution BEMA Quantity'][indexRV]}} </td>
                        <td class="clsBemaAmount"> {{dataRV_GAV_AAV['RV Solution BEMA amount'][indexRV]}} </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

                <!-- DON'T DELETE. MAY REQUIRE AGAIN -->
                <!-- <h3 v-if="dataRV_GAV_AAV['RV#']">Optionale BEMA-Positionen</h3>
                <v-simple-table v-if="dataRV_GAV_AAV['RV#']" outlined class="my-2">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Active / Not Active</th>
                        <th class="text-left">BEMA-Nr.</th>
                        <th class="text-left">Leistungsbeschreibung</th>
                        <th class="text-left">Zahn/ Gebiet</th>
                        <th class="text-left">Anzahl</th>
                        <th class="text-left">Betrag (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(datasRV, indexRV) in dataRV_GAV_AAV['RV Solution BEMA Opt Region']" :key="indexRV">
                        <td>
                          <v-switch
                            v-model="optBema"
                            color="success"
                            :value="'oBEMAAmount'+ dataRV_GAV_AAV['RV#'] +indexRV+selectedCaseId"
                            hide-details
                            @change="optRVBemaActivate"
                          ></v-switch>
                        </td>
                        <td> {{indexRV}}</td>
                        <td> {{dataRV_GAV_AAV['RV Solution BEMA Opt name'][indexRV]}} </td>
                        <td> {{datasRV}} </td>
                        <td> {{dataRV_GAV_AAV['RV Solution BEMA Opt Quantity'][indexRV]}} </td>
                        <td class="oclsBemaAmountNo" :id="'oBEMAAmount'+ dataRV_GAV_AAV['RV#'] +indexRV+selectedCaseId"> {{dataRV_GAV_AAV['RV Solution BEMA Opt amount'][indexRV]}} </td>
                        
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table> -->               

                <div v-if="dataRV_GAV_AAV['RV#']">
                  <h3 v-if="dataRV_GAV_AAV['RV#']">Behandlungsoptionen</h3>
                  <hr/>

                  <v-row v-if="dataRV_GAV_AAV['RV#']">
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <v-checkbox
                        v-model="OptGozGAVselected_RV[dialogRow]"
                        label="Aufbaufüllung(en)?"
                        :value="'Aufbaufüllung_RV' + dialogRow"
                        :name="'Aufbaufüllung_RV' + dialogRow"
                        :id="'Aufbaufüllung_RV' + dialogRow"
                        v-on:change="optGozGavCall(dialogRow)"
                        class="lblStrong"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <div v-if="displayOptGozGavs_RV[dialogRow]">
                    <div v-for="region in optGozValuesGAV" :key="region">
                        
                        <v-checkbox
                          v-model="OptGozGAVselectedReg_RV[region]"
                          :label="region"
                          :value="region"
                          v-on:change="optGozGavCallReg(dialogRow, region)"
                        ></v-checkbox>

                        <!-- Aufbaufüllung -->
                        <div v-if="showOptGozGAVTable_RV[region]">
                          <v-simple-table outlined class="my-2">
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">GOZ-Nr.</th>
                                  <th class="text-left">Leistungsbeschreibung</th>
                                  <th class="text-left">Zahn/ Gebiet</th>
                                  <th class="text-left">Anzahl</th>
                                  <th class="text-left">Faktor</th>
                                  <th class="text-left">Betrag (€)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="bemaRegion in optGAVGozArr" :key="bemaRegion">
                                  <td> {{ optGozGAVval[bemaRegion] }} </td>
                                  <td>
                                    <v-tooltip top color="success">
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                          text
                                          v-bind="attrs"
                                          v-on="on"
                                          style="text-transform: none !important; height: 0px !important;"
                                        >
                                          {{ optGozNameGAV[bemaRegion]|truncate(25) }}
                                        </v-btn>
                                      </template>
                                      <span> {{ optGozNameGAV[bemaRegion] }} </span>
                                    </v-tooltip>
                                  </td>
                                  <td> {{ region }} </td>
                                  <td> 1 </td>
                                  <td style="width: 150px;">
                                    <v-slider
                                      value="1"
                                      :tick-labels="ticksLabels"
                                      :max="2"
                                      step="1"
                                      ticks="always"
                                      tick-size="4"
                                      :thumb-size="36"
                                      :vertical="false"
                                      v-on:change="displayFak(optGozGAVval[bemaRegion]+region+'RV', optGozPriceGAV[bemaRegion], 'RVAuf')"
                                      :id="'RVAufSlider'+optGozGAVval[bemaRegion]+region+'RV'"
                                    >
                                    </v-slider>
                                  </td>
                                  <td class="clsGoaAmountNo" :id="'RVAufAmount'+optGozGAVval[bemaRegion]+region+'RV'"> {{ gozAmount(optGozPriceGAV[bemaRegion], '2.3') }} </td>
                                  
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </div>

                    </div>
                  </div>

                  <v-row v-if="dataRV_GAV_AAV['RV#']">
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <v-checkbox
                        v-model="OptGozGAVselected_RV_[dialogRow]"
                        label="Adhäsive Kronenbefestigung(en)?"
                        :value="'Adhäsive_RV' + dialogRow"
                        :name="'Adhäsive_RV' + dialogRow"
                        :id="'Adhäsive_RV' + dialogRow"
                        v-on:change="optGozGavCall_(dialogRow)"
                        class="lblStrong"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <div v-if="displayOptGozGavs_RV_[dialogRow]">
                    <div v-for="region in optGozValuesGAV_" :key="region">
                        <v-checkbox
                          v-model="OptGozGAVselectedReg_RV_[region]"
                          :label="region"
                          :value="region"
                          v-on:change="optGozGavCallReg(dialogRow, region)"
                        ></v-checkbox>

                        <!-- Adhäsive -->
                        <div v-if="showOptGozGAV_Table_RV[region]">
                          <v-simple-table outlined class="my-2">
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">GOZ-Nr.</th>
                                  <th class="text-left">Leistungsbeschreibung</th>
                                  <th class="text-left">Zahn/ Gebiet</th>
                                  <th class="text-left">Anzahl</th>
                                  <th class="text-left">Faktor</th>
                                  <th class="text-left">Betrag (€)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="bemaRegion in optGAVGozArr_" :key="bemaRegion">
                                  <td> {{ optGozGAVval_[bemaRegion] }} </td>
                                  <td>
                                    <v-tooltip top color="success">
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                          text
                                          v-bind="attrs"
                                          v-on="on"
                                          style="text-transform: none !important; height: 0px !important;"
                                        >
                                          {{ optGozNameGAV_[bemaRegion]|truncate(25) }}
                                        </v-btn>
                                      </template>
                                      <span> {{ optGozNameGAV_[bemaRegion] }} </span>
                                    </v-tooltip>
                                  </td>
                                  <td> {{ region }} </td>
                                  <td> 1 </td>
                                  <td style="width: 150px;">
                                    <v-slider
                                      value="1"
                                      :tick-labels="ticksLabels"
                                      :max="2"
                                      step="1"
                                      ticks="always"
                                      tick-size="4"
                                      :thumb-size="36"
                                      :vertical="false"
                                      v-on:change="displayFak(optGozGAVval_[bemaRegion]+region+'RV', optGozPriceGAV_[bemaRegion], 'RVAdh')"
                                      :id="'RVAdhSlider'+optGozGAVval_[bemaRegion]+region+'RV'"
                                    >
                                    </v-slider>
                                    
                                  </td>
                                  <td class="clsGoaAmountNo" :id="'RVAdhAmount'+optGozGAVval_[bemaRegion]+region+'RV'"> {{ gozAmount(optGozPriceGAV_[bemaRegion], '2.3') }} </td>
                                  
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </div>

                    </div>
                  </div>
                </div>

                <div v-if="showCaseQuesRV">
                  <v-row v-if="dataRV_GAV_AAV['RV#']">
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <v-checkbox
                        v-model="optBemaRV[dialogRow]"
                        label="Stift(e)?"
                        value="yes"
                        v-on:change="displayOptsBemaRV(dialogRow)"
                        class="lblStrong"
                      ></v-checkbox>
                    </v-col>
                  </v-row>

                  <div v-for="bemaRegion in optBemaValuesRV" :key="bemaRegion">
                    <v-radio-group
                      v-model="optBemaRVJa[bemaRegion]"
                      row
                      v-if="optBemaRVSecond[dialogRow]"
                      v-on:change="dispoptBemaRVSecond(bemaRegion)"
                    >
                      <template v-slot:label>
                        <h4> {{ bemaRegion }} </h4>
                      </template>
                      <v-radio
                        label="gegossen"
                        value="gegossen"
                        :name="bemaRegion"
                      ></v-radio>
                      <v-radio
                        label="konfektioniert"
                        value="konfektioniert"
                        :name="bemaRegion"
                      ></v-radio>
                    </v-radio-group>

                    <!-- For konfektioniert -->
                    <v-radio-group
                      v-model="optBemaRVJa2[bemaRegion]"
                      row
                      v-if="optBemaRVSecond2[bemaRegion]"
                      v-on:change="dispoptBemaRVSecond2(bemaRegion)"
                    >
                      <v-radio
                        label="Metallischer Stift- oder Schraubenaufbau"
                        value="stift"
                      ></v-radio>
                      <v-radio
                        label="Glasfaser"
                        value="glasfaser"
                      ></v-radio>
                    </v-radio-group>

                    <div v-if="optBemaRVShow[bemaRegion]">
                      <v-simple-table outlined class="my-2">
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
                            <tr>
                              <td> {{ optBemaGozRV[bemaRegion] }} </td>
                              <td>
                                <v-tooltip top color="success">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      text
                                      v-bind="attrs"
                                      v-on="on"
                                      style="text-transform: none !important; height: 0px !important;"
                                    >
                                      {{ optBemaNameRV[bemaRegion]|truncate(25) }}
                                    </v-btn>
                                  </template>
                                  <span> {{ optBemaNameRV[bemaRegion] }} </span>
                                </v-tooltip>
                              </td>
                              <td> {{ bemaRegion }} </td>
                              <td> 1 </td>
                              <td> {{ optBemaPriceRV[bemaRegion] }} </td>
                              
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>

                    <div v-if="optGozRVShow[bemaRegion]">
                      <v-simple-table outlined class="my-2">
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">GOZ-Nr.</th>
                              <th class="text-left">Leistungsbeschreibung</th>
                              <th class="text-left">Zahn/ Gebiet</th>
                              <th class="text-left">Anzahl</th>
                              <th class="text-left">Faktor</th>
                              <th class="text-left">Betrag (€)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="index in optBemaGozArr[bemaRegion]" :key="index">
                              <td> {{ optBemaGozRV[bemaRegion][index] }} </td>
                              <td>
                                <v-tooltip top color="success">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      text
                                      v-bind="attrs"
                                      v-on="on"
                                      style="text-transform: none !important; height: 0px !important;"
                                    >
                                      {{ optBemaNameRV[bemaRegion][index]|truncate(25) }}
                                    </v-btn>
                                  </template>
                                  <span> {{ optBemaNameRV[bemaRegion][index] }} </span>
                                </v-tooltip>
                              </td>
                              <td> {{ bemaRegion }} </td>
                              <td> 1 </td>
                              <td style="width: 150px;">
                                <v-slider
                                  value="1"
                                  :tick-labels="ticksLabels"
                                  :max="2"
                                  step="1"
                                  ticks="always"
                                  tick-size="4"
                                  :thumb-size="36"
                                  :vertical="false"
                                  v-on:change="displayFak(optBemaGozRV[bemaRegion][index]+bemaRegion+'RV', optBemaPriceRV[bemaRegion][index], 'RVstift')"
                                  :id="'RVstiftSlider'+optBemaGozRV[bemaRegion][index]+bemaRegion+'RV'"
                                >
                                </v-slider>
                                
                              </td>
                              <td class="clsGoaAmountNo" :id="'RVstiftAmount'+optBemaGozRV[bemaRegion][index]+bemaRegion+'RV'"> {{ gozAmount(optBemaPriceRV[bemaRegion][index], '2.3') }} </td>
                              
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>

                  </div>
                </div>

                <!-- End RV -->

                <!-- Start GAV -->
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
                      <tr v-for="(datasGAV, indexGAV) in dataRV_GAV_AAV['GAV Solution BEMA Region']" :key="indexGAV">
                        <td> {{indexGAV}}</td>
                        <td>
                          <v-tooltip top color="success">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                text
                                v-bind="attrs"
                                v-on="on"
                                style="text-transform: none !important; height: 0px !important;"
                              >
                                {{ dataRV_GAV_AAV['GAV Solution BEMA name'][indexGAV]|truncate(25) }}
                              </v-btn>
                            </template>
                            <span> {{dataRV_GAV_AAV['GAV Solution BEMA name'][indexGAV]}} </span>
                          </v-tooltip>
                        </td>
                        <td> {{datasGAV}} </td>
                        <td> {{dataRV_GAV_AAV['GAV Solution BEMA Quantity'][indexGAV]}} </td>
                        <td class="clsBemaAmount"> {{dataRV_GAV_AAV['GAV Solution BEMA amount'][indexGAV]}} </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

                <!-- DON'T DELETE. MAY REQUIRE AGAIN -->
                <!-- <h3 v-if="dataRV_GAV_AAV['GAV#']">Optionale BEMA-Positionen</h3>
                <v-simple-table v-if="dataRV_GAV_AAV['GAV#']" outlined class="my-2">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Active / Not Active</th>
                        <th class="text-left">BEMA-Nr.</th>
                        <th class="text-left">Leistungsbeschreibung</th>
                        <th class="text-left">Zahn/ Gebiet</th>
                        <th class="text-left">Anzahl</th>
                        <th class="text-left">Betrag (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(datasGAV, indexGAV) in dataRV_GAV_AAV['GAV Solution BEMA Opt Region']" :key="indexGAV">
                        <td>
                          <v-switch
                            v-model="optBemaGav"
                            color="success"
                            :value="'oBEMAAmountGav'+ dataRV_GAV_AAV['GAV#'] +indexGAV+selectedCaseId"
                            hide-details
                          ></v-switch>
                        </td>
                        <td> {{indexGAV}}</td>
                        <td> {{dataRV_GAV_AAV['GAV Solution BEMA Opt name'][indexGAV]}} </td>
                        <td> {{datasGAV}} </td>
                        <td> {{dataRV_GAV_AAV['GAV Solution BEMA Opt Quantity'][indexGAV]}} </td>
                        <td class="oclsBemaAmountGavNo" :id="'oBEMAAmountGav'+ dataRV_GAV_AAV['GAV#'] +indexGAV+selectedCaseId"> 
                          {{dataRV_GAV_AAV['GAV Solution BEMA Opt amount'][indexGAV]}} </td>
                        
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table> -->

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
                      <tr v-for="(datasGAV, indexGAV) in dataRV_GAV_AAV['GAV Solution GOZ Region']" :key="indexGAV">
                        <td> {{indexGAV}}</td>
                        <td>
                          <v-tooltip top color="success">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                text
                                v-bind="attrs"
                                v-on="on"
                                style="text-transform: none !important; height: 0px !important;"
                              >
                                {{ dataRV_GAV_AAV['GAV Solution GOZ name'][indexGAV]|truncate(25) }}
                              </v-btn>
                            </template>
                            <span> {{dataRV_GAV_AAV['GAV Solution GOZ name'][indexGAV]}} </span>
                          </v-tooltip>
                        </td>
                        <td> {{datasGAV}}</td>
                        <td> {{dataRV_GAV_AAV['GAV Solution GOZ Quantity'][indexGAV]}}</td>
                        <td style="width: 150px;">
                          <v-slider
                            value="1"
                            :tick-labels="ticksLabels"
                            :max="2"
                            step="1"
                            ticks="always"
                            tick-size="4"
                            :thumb-size="36"
                            :vertical="false"
                            v-on:change="displayFak(dataRV_GAV_AAV['GAV#'] +indexGAV+selectedCaseId, dataRV_GAV_AAV['GAV Solution GOZ amount'][indexGAV], 'GAVGOZ')"
                            :id="'GAVSliderGoz'+ dataRV_GAV_AAV['GAV#'] +indexGAV+selectedCaseId"
                          >
                          </v-slider>
                          
                        </td>
                        <td class="clsGozAmount" :id="'GAVGOZAmount'+ dataRV_GAV_AAV['GAV#'] +indexGAV+selectedCaseId"> {{ gozAmount(dataRV_GAV_AAV['GAV Solution GOZ amount'][indexGAV], '2.3') }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

                <!-- DON'T DELETE. MAY REQUIRE AGAIN -->
                <!-- <h3 v-if="dataRV_GAV_AAV['GAV#']">Optionale GOZ-Positionen</h3>
                <v-simple-table v-if="dataRV_GAV_AAV['GAV#']" outlined class="my-2">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Active / Not Active</th>
                        <th class="text-left">Makro-Name</th>
                        <th class="text-left">GOZ-Nr.</th>
                        <th class="text-left">Leistungsbeschreibung</th>
                        <th class="text-left">Zahn/ Gebiet</th>
                        <th class="text-left">Anzahl</th>
                        <th class="text-left" style="width: 150px;">Faktor</th>
                        <th class="text-left">Betrag (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(datasGAV, indexGAV) in dataRV_GAV_AAV['GAV Solution GOZ Region Opt']" :key="indexGAV">
                        <td v-if="datasGAV">
                          <v-switch
                            v-model="optGoz"
                            color="success"
                            :value="'oGAVGozAmount'+ dataRV_GAV_AAV['GAV#'] +indexGAV+selectedCaseId"
                            hide-details
                            @change="optGozActivate"
                          ></v-switch>
                        </td>
                        <td v-if="datasGAV"> {{indexGAV}}</td>
                        <td v-if="datasGAV"> 
                            <tr v-for="(datasGAVGoz, indexGAVGoz) in dataRV_GAV_AAV['GAV Solution GOZ Opt'][indexGAV]" :key="indexGAVGoz" style="height: 36px !important;">
                              <td v-if="datasGAVGoz" class="insideTable"> {{dataRV_GAV_AAV['GAV Solution GOZ Opt'][indexGAV][indexGAVGoz]}}</td>
                            </tr>
                        </td>
                        <td v-if="datasGAV"> 
                            <tr v-for="(datasGAVGozN, indexGAVGozN) in dataRV_GAV_AAV['GAV Solution GOZ name Opt'][indexGAV]" :key="indexGAVGozN">
                              <td v-if="datasGAVGozN" class="insideTable">
                                <v-tooltip top color="success">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      text
                                      v-bind="attrs"
                                      v-on="on"
                                      style="text-transform: none !important; height: 0px !important;"
                                    >
                                      {{ dataRV_GAV_AAV['GAV Solution GOZ name Opt'][indexGAV][indexGAVGozN]|truncate(25) }}
                                    </v-btn>
                                  </template>
                                  <span> {{dataRV_GAV_AAV['GAV Solution GOZ name Opt'][indexGAV][indexGAVGozN]}} </span>
                                </v-tooltip>
                              </td>
                            </tr>
                        </td>
                        <td v-if="datasGAV"> 
                            <tr v-for="(datasGAVGozR, indexGAVGozR) in datasGAV" :key="indexGAVGozR" style="height: 36px !important;">
                              <td v-if="datasGAVGozR" class="insideTable"> {{datasGAV[indexGAVGozR]}}</td>
                            </tr>
                        </td>
                        <td v-if="datasGAV">
                            <tr v-for="(datasGAVGozQ, indexGAVGozQ) in dataRV_GAV_AAV['GAV Solution GOZ Quantity Opt'][indexGAV]" :key="indexGAVGozQ" style="height: 36px !important;">
                              <td v-if="datasGAVGozQ" class="insideTable"> {{dataRV_GAV_AAV['GAV Solution GOZ Quantity Opt'][indexGAV][indexGAVGozQ]}}</td>
                            </tr>
                        </td>
                        <td v-if="datasGAV" style="width: 150px;">
                          <v-slider
                            value="1"
                            :tick-labels="ticksLabels"
                            :max="2"
                            step="1"
                            ticks="always"
                            tick-size="4"
                            :thumb-size="36"
                            :vertical="true"
                            v-on:change="displayFak(dataRV_GAV_AAV['GAV#'] +indexGAV+selectedCaseId, dataRV_GAV_AAV['GAV Solution GOZ amount Opt'][indexGAV], 'oAAV')"
                            :id="'oAAVSlider'+ dataRV_GAV_AAV['GAV#'] +indexGAV+selectedCaseId"
                          >
                          </v-slider>
                        </td>
                        <td v-if="datasGAV" class="clsGozOptAmountNo" :id="'oGAVGozAmount'+ dataRV_GAV_AAV['GAV#'] +indexGAV+selectedCaseId"> 
                          {{ gozAmount(dataRV_GAV_AAV['GAV Solution GOZ amount Opt'][indexGAV], '2.3') }}
                        </td>

                      </tr>
                    </tbody>
                  </template>
                </v-simple-table> -->

                <div v-if="dataRV_GAV_AAV['GAV#']">
                  <h3 v-if="dataRV_GAV_AAV['GAV#']">Behandlungsoptionen</h3>
                  <hr/>

                  <v-row v-if="dataRV_GAV_AAV['GAV#']">
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <v-checkbox
                        v-model="OptGozGAVselected_GAV[dialogRow]"
                        label="Aufbaufüllung(en)?"
                        :value="'Aufbaufüllung_GAV' + dialogRow"
                        :name="'Aufbaufüllung_GAV' + dialogRow"
                        :id="'Aufbaufüllung_GAV' + dialogRow"
                        v-on:change="optGozGavCall(dialogRow)"
                        class="lblStrong"
                      ></v-checkbox>

                    </v-col>
                  </v-row>

                  <div v-if="displayOptGozGavs_GAV[dialogRow]">
                    <div v-for="region in optGozValuesGAV" :key="region">
                        
                        <v-checkbox
                          v-model="OptGozGAVselectedReg_GAV[region]"
                          :label="region"
                          :value="region"
                          v-on:change="optGozGavCallReg(dialogRow, region)"
                        ></v-checkbox>

                        <!-- Aufbaufüllung -->
                        <div v-if="showOptGozGAVTable_GAV[region]">
                          <v-simple-table outlined class="my-2">
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">GOZ-Nr.</th>
                                  <th class="text-left">Leistungsbeschreibung</th>
                                  <th class="text-left">Zahn/ Gebiet</th>
                                  <th class="text-left">Anzahl</th>
                                  <th class="text-left">Faktor</th>
                                  <th class="text-left">Betrag (€)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="bemaRegion in optGAVGozArr" :key="bemaRegion">
                                  <td> {{ optGozGAVval[bemaRegion] }} </td>
                                  <td>
                                    <v-tooltip top color="success">
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                          text
                                          v-bind="attrs"
                                          v-on="on"
                                          style="text-transform: none !important; height: 0px !important;"
                                        >
                                          {{ optGozNameGAV[bemaRegion]|truncate(25) }}
                                        </v-btn>
                                      </template>
                                      <span> {{ optGozNameGAV[bemaRegion] }} </span>
                                    </v-tooltip>
                                  </td>
                                  <td> {{ region }} </td>
                                  <td> 1 </td>
                                  <td style="width: 150px;">
                                    <v-slider
                                      value="1"
                                      :tick-labels="ticksLabels"
                                      :max="2"
                                      step="1"
                                      ticks="always"
                                      tick-size="4"
                                      :thumb-size="36"
                                      :vertical="false"
                                      v-on:change="displayFak(optGozGAVval[bemaRegion]+region+'GAV', optGozPriceGAV[bemaRegion], 'GAVAuf')"
                                      :id="'GAVAufSlider'+optGozGAVval[bemaRegion]+region+'GAV'"
                                    >
                                    </v-slider>
                                    
                                  </td>
                                  <td class="clsGoaAmountNo" :id="'GAVAufAmount'+optGozGAVval[bemaRegion]+region+'GAV'"> {{ gozAmount(optGozPriceGAV[bemaRegion], '2.3') }} </td>
                                  
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </div>

                    </div>
                  </div>

                  <v-row v-if="dataRV_GAV_AAV['GAV#']">
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                    <v-checkbox
                      v-model="OptGozGAVselected_GAV_[dialogRow]"
                      label="Adhäsive Kronenbefestigung(en)?"
                      :value="'Adhäsive_GAV' + dialogRow"
                      :name="'Adhäsive_GAV' + dialogRow"
                      :id="'Adhäsive_GAV' + dialogRow"
                      v-on:change="optGozGavCall_(dialogRow)"
                      class="lblStrong"
                    ></v-checkbox>

                    </v-col>
                  </v-row>
                  <div v-if="displayOptGozGavs_GAV_[dialogRow]">
                    <div v-for="region in optGozValuesGAV_" :key="region">
                        
                        <v-checkbox
                          v-model="OptGozGAVselectedReg_GAV_[region]"
                          :label="region"
                          :value="region"
                          v-on:change="optGozGavCallReg(dialogRow, region)"
                        ></v-checkbox>

                        <!-- Adhäsive -->
                        <div v-if="showOptGozGAV_Table_GAV[region]">
                          <v-simple-table outlined class="my-2">
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">GOZ-Nr.</th>
                                  <th class="text-left">Leistungsbeschreibung</th>
                                  <th class="text-left">Zahn/ Gebiet</th>
                                  <th class="text-left">Anzahl</th>
                                  <th class="text-left">Faktor</th>
                                  <th class="text-left">Betrag (€)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="bemaRegion in optGAVGozArr_" :key="bemaRegion">
                                  <td> {{ optGozGAVval_[bemaRegion] }} </td>
                                  <td>
                                    <v-tooltip top color="success">
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                          text
                                          v-bind="attrs"
                                          v-on="on"
                                          style="text-transform: none !important; height: 0px !important;"
                                        >
                                          {{ optGozNameGAV_[bemaRegion]|truncate(25) }}
                                        </v-btn>
                                      </template>
                                      <span> {{ optGozNameGAV_[bemaRegion] }} </span>
                                    </v-tooltip>
                                  </td>
                                  <td> {{ region }} </td>
                                  <td> 1 </td>
                                  <td style="width: 150px;">
                                    <v-slider
                                      value="1"
                                      :tick-labels="ticksLabels"
                                      :max="2"
                                      step="1"
                                      ticks="always"
                                      tick-size="4"
                                      :thumb-size="36"
                                      :vertical="false"
                                      v-on:change="displayFak(optGozGAVval_[bemaRegion]+region+'GAV', optGozPriceGAV_[bemaRegion], 'GAVAdh')"
                                      :id="'GAVAdhSlider'+optGozGAVval_[bemaRegion]+region+'GAV'"
                                    >
                                    </v-slider>
                                    
                                  </td>
                                  <td class="clsGoaAmountNo" :id="'GAVAdhAmount'+optGozGAVval_[bemaRegion]+region+'GAV'"> {{ gozAmount(optGozPriceGAV_[bemaRegion], '2.3') }} </td>
                                  
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </div>

                    </div>
                  </div>
                </div>
                
                <div v-if="showCaseQuesGAV">
                  <v-row v-if="dataRV_GAV_AAV['GAV#']">
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <v-checkbox
                        v-model="optBemaRV[dialogRow]"
                        label="Stift(e)?"
                        value="yes"
                        v-on:change="displayOptsBemaRV(dialogRow)"
                        class="lblStrong"
                      ></v-checkbox>
                    </v-col>
                  </v-row>

                  <div v-for="bemaRegion in optBemaValuesRV" :key="bemaRegion">
                    <v-radio-group
                      v-model="optBemaRVJa[bemaRegion]"
                      row
                      v-if="optBemaRVSecond[dialogRow]"
                      v-on:change="dispoptBemaRVSecond(bemaRegion)"
                    >
                      <template v-slot:label>
                        <h4> {{ bemaRegion }} </h4>
                      </template>
                      <v-radio
                        label="gegossen"
                        value="gegossen"
                        :name="bemaRegion"
                      ></v-radio>
                      <v-radio
                        label="konfektioniert"
                        value="konfektioniert"
                        :name="bemaRegion"
                      ></v-radio>
                    </v-radio-group>

                    <!-- For konfektioniert -->
                    <v-radio-group
                      v-model="optBemaRVJa2[bemaRegion]"
                      row
                      v-if="optBemaRVSecond2[bemaRegion]"
                      v-on:change="dispoptBemaRVSecond2(bemaRegion)"
                    >
                      <v-radio
                        label="Metallischer Stift- oder Schraubenaufbau"
                        value="stift"
                      ></v-radio>
                      <v-radio
                        label="Glasfaser"
                        value="glasfaser"
                      ></v-radio>
                    </v-radio-group>

                    <div v-if="optBemaRVShow[bemaRegion]">
                      <v-simple-table outlined class="my-2">
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
                            <tr>
                              <td> {{ optBemaGozRV[bemaRegion] }} </td>
                              <td>
                                <v-tooltip top color="success">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      text
                                      v-bind="attrs"
                                      v-on="on"
                                      style="text-transform: none !important; height: 0px !important;"
                                    >
                                      {{ optBemaNameRV[bemaRegion]|truncate(25) }}
                                    </v-btn>
                                  </template>
                                  <span> {{ optBemaNameRV[bemaRegion] }} </span>
                                </v-tooltip>
                              </td>
                              <td> {{ bemaRegion }} </td>
                              <td> 1 </td>
                              <td> {{ optBemaPriceRV[bemaRegion] }} </td>
                              
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>

                    <div v-if="optGozRVShow[bemaRegion]">
                      <v-simple-table outlined class="my-2">
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">GOZ-Nr.</th>
                              <th class="text-left">Leistungsbeschreibung</th>
                              <th class="text-left">Zahn/ Gebiet</th>
                              <th class="text-left">Anzahl</th>
                              <th class="text-left">Faktor</th>
                              <th class="text-left">Betrag (€)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="index in optBemaGozArr[bemaRegion]" :key="index">
                              <td> {{ optBemaGozRV[bemaRegion][index] }} </td>
                              <td>
                                <v-tooltip top color="success">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      text
                                      v-bind="attrs"
                                      v-on="on"
                                      style="text-transform: none !important; height: 0px !important;"
                                    >
                                      {{ optBemaNameRV[bemaRegion][index]|truncate(25) }}
                                    </v-btn>
                                  </template>
                                  <span> {{ optBemaNameRV[bemaRegion][index] }} </span>
                                </v-tooltip>
                              </td>
                              <td> {{ bemaRegion }} </td>
                              <td> 1 </td>
                              <td style="width: 150px;">
                                <v-slider
                                  value="1"
                                  :tick-labels="ticksLabels"
                                  :max="2"
                                  step="1"
                                  ticks="always"
                                  tick-size="4"
                                  :thumb-size="36"
                                  :vertical="false"
                                  v-on:change="displayFak(optBemaGozRV[bemaRegion][index]+bemaRegion+'GAV', optBemaPriceRV[bemaRegion][index], 'GAVstift')"
                                  :id="'GAVstiftSlider'+optBemaGozRV[bemaRegion][index]+bemaRegion+'GAV'"
                                >
                                </v-slider>
                              </td>
                              <td class="clsGoaAmountNo" :id="'GAVstiftAmount'+optBemaGozRV[bemaRegion][index]+bemaRegion+'GAV'"> {{ gozAmount(optBemaPriceRV[bemaRegion][index], '2.3') }} </td>
                              
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>

                  </div>

                  <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                  >
                    <v-select
                      :items="itemsMaterial"
                      label="Material"
                      outlined
                    ></v-select>
                  </v-col>
                  
                </div>

                <!-- End GAV -->

                <!-- Start AAV -->
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
                      <tr v-for="(datasAAV, indexAAV) in dataRV_GAV_AAV['AAV Solution GOZ Region']" :key="indexAAV">
                        <td v-if="datasAAV"> {{indexAAV}}</td>
                        <!-- <td v-if="datasAAV"> {{datasAAV}}</td>
                        <td v-if="datasAAV"> {{dataRV_GAV_AAV['AAV Solution GOZ Region'][indexAAV]}}</td> -->
                        <td v-if="datasAAV">
                          <v-tooltip top color="success">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                text
                                v-bind="attrs"
                                v-on="on"
                                style="text-transform: none !important; height: 0px !important;"
                              >
                                {{ dataRV_GAV_AAV['AAV Solution GOZ name'][indexAAV]|truncate(25) }}
                              </v-btn>
                            </template>
                            <span> {{ dataRV_GAV_AAV['AAV Solution GOZ name'][indexAAV] }} </span>
                          </v-tooltip>
                        </td>
                        <td v-if="datasAAV"> {{datasAAV}}</td>
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
                            v-on:change="displayFak(dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId, dataRV_GAV_AAV['AAV Solution GOZ amount'][indexAAV], 'AAVGOZ')"
                            :id="'AAVGOZSlider'+ dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId"
                            v-if="indexAAV !== '0500' && indexAAV !== '0510' && indexAAV !== '0520' && indexAAV !== '0530'"
                          >
                          </v-slider>
                        </td>
                        <td  class="clsGozAmount" :id="'AAVGOZAmount'+ dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId"> 
                          {{ gozAmount(dataRV_GAV_AAV['AAV Solution GOZ amount'][indexAAV], '2.3') }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

                <div v-if="dataRV_GAV_AAV['AAV#']">
                  <h3 v-if="dataRV_GAV_AAV['AAV#']">Behandlungsoptionen</h3>

                  <!-- DON'T DELETE. MAY REQUIRE AGAIN -->
                  <!-- <v-simple-table v-if="dataRV_GAV_AAV['AAV#']" outlined class="my-2">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Active / Not Active</th>
                          <th class="text-left">Makro-Name</th>
                          <th class="text-left">GOZ-Nr.</th>
                          <th class="text-left">Leistungsbeschreibung</th>
                          <th class="text-left">Zahn/ Gebiet</th>
                          <th class="text-left">Anzahl</th>
                          <th class="text-left" style="width: 150px;">Faktor</th>
                          <th class="text-left">Betrag (€)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(datasAAV, indexAAV) in dataRV_GAV_AAV['AAV Solution GOZ Region Opt']" :key="indexAAV">
                          <td v-if="datasAAV">
                            <v-switch
                              v-model="optGoz"
                              color="success"
                              :value="'oAAVAmount'+ indexAAV"
                              hide-details
                              @change="optGozActivate"
                            ></v-switch>
                          </td>
                          <td v-if="datasAAV"> {{indexAAV}}</td>
                          <td v-if="datasAAV"> 
                              <tr v-for="(datasAAVGoz, indexAAVGoz) in dataRV_GAV_AAV['AAV Solution GOZ Opt'][indexAAV]" :key="indexAAVGoz" style="height: 36px !important;">
                                <td v-if="datasAAVGoz" class="insideTable"> {{dataRV_GAV_AAV['AAV Solution GOZ Opt'][indexAAV][indexAAVGoz]}}</td>
                              </tr>
                          </td>
                          <td v-if="datasAAV"> 

                              <tr v-for="(datasAAVGozN, indexAAVGozN) in dataRV_GAV_AAV['AAV Solution GOZ name Opt'][indexAAV]" :key="indexAAVGozN">
                                <td v-if="datasAAVGozN" class="insideTable">
                                  <v-tooltip top color="success">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        text
                                        v-bind="attrs"
                                        v-on="on"
                                        style="text-transform: none !important; height: 0px !important;"
                                      >
                                        {{ dataRV_GAV_AAV['AAV Solution GOZ name Opt'][indexAAV][indexAAVGozN]|truncate(25) }}
                                      </v-btn>
                                    </template>
                                    <span> {{ dataRV_GAV_AAV['AAV Solution GOZ name Opt'][indexAAV][indexAAVGozN] }} </span>
                                  </v-tooltip>
                                </td>
                              </tr>
                          </td>
                          <td v-if="datasAAV"> 

                              <tr v-for="(datasAAVGozR, indexAAVGozR) in datasAAV" :key="indexAAVGozR" style="height: 36px !important;">
                                <td v-if="datasAAVGozR" class="insideTable"> {{datasAAV[indexAAVGozR]}}</td>
                              </tr>
                          </td>
                          <td v-if="datasAAV">

                              <tr v-for="(datasAAVGozQ, indexAAVGozQ) in dataRV_GAV_AAV['AAV Solution GOZ Quantity Opt'][indexAAV]" :key="indexAAVGozQ" style="height: 36px !important;">
                                <td v-if="datasAAVGozQ" class="insideTable"> {{dataRV_GAV_AAV['AAV Solution GOZ Quantity Opt'][indexAAV][indexAAVGozQ]}}</td>
                              </tr>
                          </td>
                          <td v-if="datasAAV" style="width: 150px;">
                            <v-slider
                              value="1"
                              :tick-labels="ticksLabels"
                              :max="2"
                              step="1"
                              ticks="always"
                              tick-size="4"
                              :thumb-size="36"
                              :vertical="true"
                              v-on:change="displayFak(dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId, dataRV_GAV_AAV['AAV Solution GOZ amount Opt'][indexAAV], 'oAAV')"
                              :id="'oAAVSlider'+ dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId"
                            >
                            </v-slider>
                          </td>
                          <td v-if="datasAAV" class="clsGozAmountNo" :id="'oAAVAmount'+ dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId"> 
                            {{ gozAmount(dataRV_GAV_AAV['AAV Solution GOZ amount Opt'][indexAAV], '2.3') }}
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table> -->

                  <v-row v-if="dataRV_GAV_AAV['AAV#']">
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <v-checkbox
                        v-model="OptGozGAVselected_AAV[dialogRow]"
                        label="Freilegung(en)?"
                        :value="'Aufbaufüllung_AAV' + dialogRow"
                        :name="'Aufbaufüllung_AAV' + dialogRow"
                        :id="'Aufbaufüllung_AAV' + dialogRow"
                        v-on:change="optGozGavCall(dialogRow)"
                        class="lblStrong"
                      ></v-checkbox>
                    </v-col>
                  </v-row>

                  <div v-if="displayOptGozGavs_AAV[dialogRow]">
                    <div v-for="region in optGozValuesGAV" :key="region">
                        
                        <v-checkbox
                          v-model="OptGozGAVselectedReg_AAV[region]"
                          :label="region"
                          :value="region"
                          v-on:change="optGozGavCallReg(dialogRow, region)"
                        ></v-checkbox>

                        <!-- Aufbaufüllung/ Freilegung (AAV) -->
                        <div v-if="showOptGozGAVTable_AAV[region]">
                          <v-simple-table outlined class="my-2">
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">GOZ-Nr.</th>
                                  <th class="text-left">Leistungsbeschreibung</th>
                                  <th class="text-left">Zahn/ Gebiet</th>
                                  <th class="text-left">Anzahl</th>
                                  <th class="text-left">Faktor</th>
                                  <th class="text-left">Betrag (€)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="bemaRegion in optGAVGozArr" :key="bemaRegion">
                                  <td> {{ optGozGAVval[bemaRegion] }} </td>
                                  <td>
                                    <v-tooltip top color="success">
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                          text
                                          v-bind="attrs"
                                          v-on="on"
                                          style="text-transform: none !important; height: 0px !important;"
                                        >
                                          {{ optGozNameGAV[bemaRegion]|truncate(25) }}
                                        </v-btn>
                                      </template>
                                      <span> {{ optGozNameGAV[bemaRegion] }} </span>
                                    </v-tooltip>
                                  </td>
                                  <td> {{ region }} </td>
                                  <td> 1 </td>
                                  <td style="width: 150px;">
                                    <v-slider
                                      value="1"
                                      :tick-labels="ticksLabels"
                                      :max="2"
                                      step="1"
                                      ticks="always"
                                      tick-size="4"
                                      :thumb-size="36"
                                      :vertical="false"
                                      v-on:change="displayFak(optGozGAVval[bemaRegion]+region+'AAV', optGozPriceGAV[bemaRegion], 'AAVAuf')"
                                      :id="'AAVAufSlider'+optGozGAVval[bemaRegion]+region+'AAV'"
                                    >
                                    </v-slider>
                                  </td>
                                  <td class="clsGoaAmountNo" :id="'AAVAufAmount'+optGozGAVval[bemaRegion]+region+'AAV'"> {{ gozAmount(optGozPriceGAV[bemaRegion], '2.3') }} </td>
                                  
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </div>

                    </div>
                  </div>

                  <v-row v-if="dataRV_GAV_AAV['AAV#']">
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <v-checkbox
                        v-model="OptGozGAVselected_AAV_[dialogRow]"
                        label="Adhäsive Kronenbefestigung(en)?"
                        :value="'Adhäsive_AAV' + dialogRow"
                        :name="'Adhäsive_AAV' + dialogRow"
                        :id="'Adhäsive_AAV' + dialogRow"
                        v-on:change="optGozGavCall_(dialogRow)"
                        class="lblStrong"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <div v-if="displayOptGozGavs_AAV_[dialogRow]">
                    <div v-for="region in optGozValuesGAV_" :key="region">
                        
                        <v-checkbox
                          v-model="OptGozGAVselectedReg_AAV_[region]"
                          :label="region"
                          :value="region"
                          v-on:change="optGozGavCallReg(dialogRow, region)"
                        ></v-checkbox>

                        <!-- Adhäsive -->
                        <div v-if="showOptGozGAV_Table_AAV[region]">
                          <v-simple-table outlined class="my-2">
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">GOZ-Nr.</th>
                                  <th class="text-left">Leistungsbeschreibung</th>
                                  <th class="text-left">Zahn/ Gebiet</th>
                                  <th class="text-left">Anzahl</th>
                                  <th class="text-left">Faktor</th>
                                  <th class="text-left">Betrag (€)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="bemaRegion in optGAVGozArr_" :key="bemaRegion">
                                  <td> {{ optGozGAVval_[bemaRegion] }} </td>
                                  <td>
                                    <v-tooltip top color="success">
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                          text
                                          v-bind="attrs"
                                          v-on="on"
                                          style="text-transform: none !important; height: 0px !important;"
                                        >
                                          {{ optGozNameGAV_[bemaRegion]|truncate(25) }}
                                        </v-btn>
                                      </template>
                                      <span> {{ optGozNameGAV_[bemaRegion] }} </span>
                                    </v-tooltip>
                                  </td>
                                  <td> {{ region }} </td>
                                  <td> 1 </td>
                                  <td style="width: 150px;">
                                    <v-slider
                                      value="1"
                                      :tick-labels="ticksLabels"
                                      :max="2"
                                      step="1"
                                      ticks="always"
                                      tick-size="4"
                                      :thumb-size="36"
                                      :vertical="false"
                                      v-on:change="displayFak(optGozGAVval_[bemaRegion]+region+'AAV', optGozPriceGAV_[bemaRegion], 'AAVAdh')"
                                      :id="'AAVAdhSlider'+optGozGAVval_[bemaRegion]+region+'AAV'"
                                    >
                                    </v-slider>
                                    
                                  </td>
                                  <td class="clsGoaAmountNo" :id="'AAVAdhAmount'+optGozGAVval_[bemaRegion]+region+'AAV'"> {{ gozAmount(optGozPriceGAV_[bemaRegion], '2.3') }} </td>
                                  
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </div>

                    </div>
                  </div>
                </div>

                <!-- DON'T DELETE. MAY REQUIRE AGAIN -->
                <!-- <h3 v-if="dataRV_GAV_AAV['AAV#']">GOÄ-Positionen</h3>
                <v-simple-table v-if="dataRV_GAV_AAV['AAV#']" outlined class="my-2">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">GOÄ-Nr.</th>
                        <th class="text-left">Leistungsbeschreibung</th>
                        <th class="text-left">Zahn/ Gebiet</th>
                        <th class="text-left">Anzahl</th>
                        <th class="text-left" style="width: 150px;">Faktor</th>
                        <th class="text-left">Betrag (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(datasAAV, indexAAV) in dataRV_GAV_AAV['AAV Solution GOA Region']" :key="indexAAV">
                        <td v-if="datasAAV"> {{indexAAV}}</td>
                        <td v-if="datasAAV"> {{dataRV_GAV_AAV['AAV Solution GOA name'][indexAAV]}}</td>
                        <td v-if="datasAAV"> {{datasAAV}}</td>
                        <td v-if="datasAAV"> {{dataRV_GAV_AAV['AAV Solution GOA Region'][indexAAV]}}</td>
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
                            :id="'AAVSliderGoa'+ dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId"
                          >
                          </v-slider>
                        </td>
                        <td v-if="datasAAV" class="clsGoaAmount" :id="'AAVAmountGoa'+ dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId"> {{ gozAmount(dataRV_GAV_AAV['AAV Solution GOA amount'][indexAAV], '2.3') }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table> -->
                
                <div v-if="showCaseQuesAAV">
                  <v-row v-if="dataRV_GAV_AAV['AAV#']">
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <v-checkbox
                        v-model="optBemaRV[dialogRow]"
                        label="Stift(e)?"
                        value="yes"
                        v-on:change="displayOptsBemaRV(dialogRow)"
                        class="lblStrong"
                      ></v-checkbox>
                    </v-col>
                  </v-row>

                  <div v-for="bemaRegion in optBemaValuesRV" :key="bemaRegion">
                    <v-radio-group
                      v-model="optBemaRVJa[bemaRegion]"
                      row
                      v-if="optBemaRVSecond[dialogRow]"
                      v-on:change="dispoptBemaRVSecond(bemaRegion)"
                    >
                      <template v-slot:label>
                        <h4> {{ bemaRegion }} </h4>
                      </template>
                      <v-radio
                        label="gegossen"
                        value="gegossen"
                        :name="bemaRegion"
                      ></v-radio>
                      <v-radio
                        label="konfektioniert"
                        value="konfektioniert"
                        :name="bemaRegion"
                      ></v-radio>
                    </v-radio-group>

                    <!-- For konfektioniert -->
                    <v-radio-group
                      v-model="optBemaRVJa2[bemaRegion]"
                      row
                      v-if="optBemaRVSecond2[bemaRegion]"
                      v-on:change="dispoptBemaRVSecond2(bemaRegion)"
                    >
                      <v-radio
                        label="Metallischer Stift- oder Schraubenaufbau"
                        value="stift"
                      ></v-radio>
                      <v-radio
                        label="Glasfaser"
                        value="glasfaser"
                      ></v-radio>
                    </v-radio-group>

                    <div v-if="optBemaRVShow[bemaRegion]">
                      <v-simple-table outlined class="my-2">
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
                            <tr>
                              <td> {{ optBemaGozRV[bemaRegion] }} </td>
                              <td>
                                <v-tooltip top color="success">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      text
                                      v-bind="attrs"
                                      v-on="on"
                                      style="text-transform: none !important; height: 0px !important;"
                                    >
                                      {{ optBemaNameRV[bemaRegion]|truncate(25) }}
                                    </v-btn>
                                  </template>
                                  <span> {{ optBemaNameRV[bemaRegion] }} </span>
                                </v-tooltip>
                              </td>
                              <td> {{ bemaRegion }} </td>
                              <td> 1 </td>
                              <td> {{ optBemaPriceRV[bemaRegion] }} </td>
                              
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>

                    <div v-if="optGozRVShow[bemaRegion]">
                      <v-simple-table outlined class="my-2">
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">GOZ-Nr.</th>
                              <th class="text-left">Leistungsbeschreibung</th>
                              <th class="text-left">Zahn/ Gebiet</th>
                              <th class="text-left">Anzahl</th>
                              <th class="text-left">Faktor</th>
                              <th class="text-left">Betrag (€)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="index in optBemaGozArr[bemaRegion]" :key="index">
                              <td> {{ optBemaGozRV[bemaRegion][index] }} </td>
                              <td>
                                <v-tooltip top color="success">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      text
                                      v-bind="attrs"
                                      v-on="on"
                                      style="text-transform: none !important; height: 0px !important;"
                                    >
                                      {{ optBemaNameRV[bemaRegion][index]|truncate(25) }}
                                    </v-btn>
                                  </template>
                                  <span> {{ optBemaNameRV[bemaRegion][index] }} </span>
                                </v-tooltip>
                              </td>
                              <td> {{ bemaRegion }} </td>
                              <td> 1 </td>
                              <td style="width: 150px;">
                                <v-slider
                                  value="1"
                                  :tick-labels="ticksLabels"
                                  :max="2"
                                  step="1"
                                  ticks="always"
                                  tick-size="4"
                                  :thumb-size="36"
                                  :vertical="false"
                                  v-on:change="displayFak(optBemaGozRV[bemaRegion][index]+bemaRegion+'AAV', optBemaPriceRV[bemaRegion][index], 'AAVstift')"
                                  :id="'AAVstiftSlider'+optBemaGozRV[bemaRegion][index]+bemaRegion+'AAV'"
                                >
                                </v-slider>
                                
                              </td>
                              <td class="clsGoaAmountNo" :id="'AAVstiftAmount'+optBemaGozRV[bemaRegion][index]+bemaRegion+'AAV'"> {{ gozAmount(optBemaPriceRV[bemaRegion][index], '2.3') }} </td>
                              
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>

                  </div>
                  
                  <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                  >
                    <v-select
                      :items="itemsMaterial"
                      label="Material"
                      outlined
                    ></v-select>
                  </v-col>

                </div>
                
                <!-- End AAV -->

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

        <div v-if="isPlannen" class="d-flex col-2 pa-0 festzuschüsse-berechnen">
          <v-btn @click="weiterCall" class="" elevation="0" color="#BBDEFB">Weiter</v-btn>
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
      totalGav          : '0.00',
      totalBema         : '0.00',
      totalSumCalc      : '0.00',
      totalAmountF      : '0.00',
      euro              : '&euro;',
      
      totalBemaArr      : [],
      totalAmountFArr   : [],
      totalGavArr       : [],
      totalSumCalcArr   : [],

      totalBemaDisp     : '0.00',
      totalAmountFDisp  : '0.00',
      totalGavDisp      : '0.00',
      totalSumCalcDisp  : '0.00',

      overlay: false,
      dialogRow: 0,
      checkbox: true,
      planLabel: '',
      dataCaseName: '',
      selectedTableData: '',
      optGoz: [],
      optBema: [],
      optBemaGav: [],
      RVShortcut: '',
      TPShortcut: '',
      isTP: false,
      selectedCaseId:'',
      case_region_: '',
      
      showCaseQuesRV: false,
      showCaseQuesGAV: false,
      showCaseQuesAAV: false,

      showOptGozGAV: false,
      showOptGozGAV_: false,

      // optBemaRV: null,
      optBemaRV: [],
      optBemaValuesRV: [],
      optGozValuesGAV: [],
      optGozValuesGAV_: [],

      optBemaRVJa: [],
      optBemaRVJa2: [],

      // optBemaRVSecond: false,
      optBemaRVSecond: [],
      optBemaRVSecond2: [],

      optBemaRVShow: [],
      optGozRVShow: [],

      optBemaGozArr: [],
      optGAVGozArr: [],
      optGAVGozArr_: [],

      optBemaGozRV: [],
      optBemaNameRV: [],
      optBemaPriceRV: [],

      optGozGAVval: [],
      optGozNameGAV: [],
      optGozPriceGAV: [],
      optGozGAVval_: [],
      optGozNameGAV_: [],
      optGozPriceGAV_: [],

      optGozSelected: [],
      isPlannen: false,
      Total_case: 0,

      caseBemaOpt: [{
                    '18a_Name': 'Vorbereiten eines endodontisch behandelten Zahnes zur Aufnahme einer Krone, mit Verankerung im Wurzelkanal durch einen konfektionierten Stift- oder Schraubenaufbau, einzeitig',
                    '18a_Price': '54.68',
                    '18b_Name': 'Vorbereiten eines endodontisch behandelten Zahnes zur Aufnahme einer Krone, mit Verankerung im Wurzelkanal durch einen gegossenen Stiftaufbau, zweizeitig',
                    '18b_Price': '87.49',
                    '2195_Name': 'Vorbereitung eines zerstörten Zahnes durch einen Schraubenaufbau oder Glasfaserstift o. Ä. zur Aufnahme einer Krone',
                    '2195_Price': '16.88',
                    '2197_Name': 'Adhäsive Befestigung (plastischer Aufbau, Stift, Inlay, Krone, Teilkrone, Veneer etc.)',
                    '2197_Price': '7.32',
                    '2180_Name': 'Vorbereitung eines zerstörten Zahnes mit plastischem Aufbaumaterial zur Aufnahme einer Krone',
                    '2180_Price': '8.44',
                    '0080_Name': 'Intraorale Oberflächenanästhesie, je Kieferhälfte oder Frontzahnbereich',
                    '0080_Price': '1.69',
                    '0090_Name': 'Intraorale Infiltrationsanästhesie',
                    '0090_Price': '3.374',
                    '9040_Name': 'Freilegen eines Implantats, und Einfügen eines oder mehrerer Aufbauelemente (z. B. eines Gingivaformers) bei einem zweiphasigen Implantatsystem',
                    '9040_Price': '35.21',
                  }],
      itemsMaterial: ["Zirkon monolithisch einfach",
                      "Zirkon monolithisch multilayer",
                      "Zirkon monolithisch multilayer bemalt",
                      "Zirkon vollverblendet",
                      "Emax",
                      "NEM vollverblendet",
                      "Gold vollverblendet"],

      OptGozGAVselected: [], // opt GOZ GAV op 1
      OptGozGAVselected_: [],  // opt GOZ GAV op 2
      displayOptGozGavs: false,
      displayOptGozGavs_: false,
      showOptGozGAVTable: [],  // opt GOZ GAV op 1
      showOptGozGAV_Table: [],  // opt GOZ GAV op 2
      OptGozGAVselectedReg: [],
      OptGozGAVselectedReg_: [],

      OptGozGAVselected_RV: [],
      displayOptGozGavs_RV: [],
      OptGozGAVselected_RV_: [],
      displayOptGozGavs_RV_: [],
      OptGozGAVselectedReg_RV: [],
      OptGozGAVselectedReg_RV_: [],
      showOptGozGAVTable_RV: [],  // opt GOZ GAV op 1
      showOptGozGAV_Table_RV: [],  // opt GOZ GAV op 2

      OptGozGAVselected_GAV: [],
      displayOptGozGavs_GAV: [],
      OptGozGAVselected_GAV_: [],
      displayOptGozGavs_GAV_: [],
      OptGozGAVselectedReg_GAV: [],
      OptGozGAVselectedReg_GAV_: [],
      showOptGozGAVTable_GAV: [],  // opt GOZ GAV op 1
      showOptGozGAV_Table_GAV: [],  // opt GOZ GAV op 2

      OptGozGAVselected_AAV: [],
      displayOptGozGavs_AAV: [],
      OptGozGAVselected_AAV_: [],
      displayOptGozGavs_AAV_: [],
      OptGozGAVselectedReg_AAV: [],
      OptGozGAVselectedReg_AAV_: [],
      showOptGozGAVTable_AAV: [],  // opt GOZ GAV op 1
      showOptGozGAV_Table_AAV: [],  // opt GOZ GAV op 2

      showCaseTrash: false,
      // showCaseTrash: [],
      showCasePencil: [],
      reOpenLabel:[],
      reOpenidValue:[],
      reOpenids:[],
      reOpenCaseid: [],

    }),
    watch: {
      
    },
    filters: {
        truncate: function(value) {
            if (value && value.length > 25) {
                value = value.substring(0, 22) + '...';
            }
            return value
        }
    },
    mounted() {
      
    },
    computed: {
      // ...mapGetters(["isLoggedIn"]),
      totalAmount() {
        console.log(this.tableData);
        var amountArray = []

        if(this.tableData['Final'] && 
          this.tableData['Final'].length > 0
        ) {
          return ((this.tableData['Final'].map(i=>i.price).reduce((a,b)=>Number(a)+Number(b),0))/this.tableData['Total_case']).toFixed(2)
          // for(var cal=0; cal< this.tableData['Final'].length; cal++) {
          //   amountArray[cal] = this.tableData['Final'][cal]['price']
          // }

          // return amountArray
        } 
        else {
          return '0.00'
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
            console.log(response.data)

            if(response.data.length>1) {
              let title = '';
              let text = '';

              let title_UK = '';
              let text_UK = '';

              let condition = ['"f"', '"x"', '"ew"', '"bw"', '"kx"','"swfb"'];
              // if(response.data[1][0]['Case Region'] == 'OK')
              if(response.data[1]['Final'][0]['region'] == 'OK')
              {
                // title = 'Versorgung an [17+/27] erforderlich?';
                title = '';
                if(condition.includes(JSON.stringify(input[0][18])) // == '"f"'
                    && condition.includes(JSON.stringify(input[1][17])) // == '"f"'
                ) {
                  title = 'Versorgung an 17 erforderlich?';
                }

                if(condition.includes(JSON.stringify(input[15][28])) // == '"f"'
                    && condition.includes(JSON.stringify(input[14][27])) // == '"f"'
                ) {
                  title = 'Versorgung an 27 erforderlich?';
                }

                if(condition.includes(JSON.stringify(input[0][18]))
                    && condition.includes(JSON.stringify(input[1][17]))
                    && condition.includes(JSON.stringify(input[15][28]))
                    && condition.includes(JSON.stringify(input[14][27]))
                ) {
                  title = 'Versorgung an 17 und 27 erforderlich?';
                }

                text = 'Answer "Ja / Nein"';

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

              if(response.data[1]['Final'][0]['region'] == 'UK')
              {
                // title = 'Versorgung an [37+/47] erforderlich?';
                title = '';

                if(condition.includes(JSON.stringify(input[16][38])) // == '"f"'
                    && condition.includes(JSON.stringify(input[17][37])) // == '"f"'
                ) {
                  title = 'Versorgung an 37 erforderlich?';
                }

                if(condition.includes(JSON.stringify(input[31][48])) // == '"f"'
                    && condition.includes(JSON.stringify(input[30][47])) // == '"f"'
                ) {
                  title = 'Versorgung an 47 erforderlich?';
                }

                if(condition.includes(JSON.stringify(input[16][38]))
                    && condition.includes(JSON.stringify(input[17][37]))
                    && condition.includes(JSON.stringify(input[31][48]))
                    && condition.includes(JSON.stringify(input[30][47]))
                ) {
                  title = 'Versorgung an 37 und 47 erforderlich?';
                }

                text = 'Answer "Ja / Nein"';

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
              
              if(response.data[1]['Final'][0]['region'] == 'OK,UK')
              {
                // title = 'Versorgung an [17+/27] erforderlich? <br/> Versorgung an [37+/47] erforderlich?';
                // text = 'Answer "Ja / Nein"';

                title = '';
                if(condition.includes(JSON.stringify(input[0][18])) // == '"f"'
                    && condition.includes(JSON.stringify(input[1][17])) // == '"f"'
                ) {
                  title = 'Versorgung an 17 erforderlich?';
                }

                if(condition.includes(JSON.stringify(input[15][28])) // == '"f"'
                    && condition.includes(JSON.stringify(input[14][27])) // == '"f"'
                ) {
                  title = 'Versorgung an 27 erforderlich?';
                }

                if(condition.includes(JSON.stringify(input[0][18]))
                    && condition.includes(JSON.stringify(input[1][17]))
                    && condition.includes(JSON.stringify(input[15][28]))
                    && condition.includes(JSON.stringify(input[14][27]))
                ) {
                  title = 'Versorgung an 17 und 27 erforderlich?';
                }

                text = 'Answer "Ja / Nein"';

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
                    // this.displayData(response.data[1])

                    //UK
                    title_UK = '';

                    if(condition.includes(JSON.stringify(input[16][38])) // == '"f"'
                        && condition.includes(JSON.stringify(input[17][37])) // == '"f"'
                    ) {
                      title_UK = 'Versorgung an 37 erforderlich?';
                    }

                    if(condition.includes(JSON.stringify(input[31][48])) // == '"f"'
                        && condition.includes(JSON.stringify(input[30][47])) // == '"f"'
                    ) {
                      title_UK = 'Versorgung an 47 erforderlich?';
                    }

                    if(condition.includes(JSON.stringify(input[16][38]))
                        && condition.includes(JSON.stringify(input[17][37]))
                        && condition.includes(JSON.stringify(input[31][48]))
                        && condition.includes(JSON.stringify(input[30][47]))
                    ) {
                      title_UK = 'Versorgung an 37 und 47 erforderlich?';
                    }

                    text_UK = 'Answer "Ja / Nein"';

                    this.$fire({
                      text: text_UK,
                      title: title_UK,
                      type: 'question',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#A55',
                      confirmButtonText: 'Ja',
                      cancelButtonText: 'Nein'
                    }).then((result_UK) => {

                      if (result_UK.value) { //3.1 [0]
                        this.displayData(response.data[1])
                      }
                      else { // [1] 2.xers
                        this.displayData(response.data[0])
                      }
                    })

                  }
                  else { // [1] 2.xers
                    // this.displayData(response.data[0])

                    //UK
                    title_UK = '';

                    if(condition.includes(JSON.stringify(input[16][38])) // == '"f"'
                        && condition.includes(JSON.stringify(input[17][37])) // == '"f"'
                    ) {
                      title_UK = 'Versorgung an 37 erforderlich?';
                    }

                    if(condition.includes(JSON.stringify(input[31][48])) // == '"f"'
                        && condition.includes(JSON.stringify(input[30][47])) // == '"f"'
                    ) {
                      title_UK = 'Versorgung an 47 erforderlich?';
                    }

                    if(condition.includes(JSON.stringify(input[16][38]))
                        && condition.includes(JSON.stringify(input[17][37]))
                        && condition.includes(JSON.stringify(input[31][48]))
                        && condition.includes(JSON.stringify(input[30][47]))
                    ) {
                      title_UK = 'Versorgung an 37 und 47 erforderlich?';
                    }

                    text_UK = 'Answer "Ja / Nein"';

                    this.$fire({
                      text: text_UK,
                      title: title_UK,
                      type: 'question',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#A55',
                      confirmButtonText: 'Ja',
                      cancelButtonText: 'Nein'
                    }).then((result_UK) => {

                      if (result_UK.value) { //3.1 [0]
                        // this.displayData(response.data[1])
                        console.log(response.data[1][1])
                      }
                      else { // [1] 2.xers
                        // this.displayData(response.data[0])
                        console.log(response.data[0])
                      }
                    })

                  }
                })

                // //UK
                // title_UK = '';

                // if(condition.includes(JSON.stringify(input[16][38])) // == '"f"'
                //     && condition.includes(JSON.stringify(input[17][37])) // == '"f"'
                // ) {
                //   title_UK = 'Versorgung an 37 erforderlich?';
                // }

                // if(condition.includes(JSON.stringify(input[31][48])) // == '"f"'
                //     && condition.includes(JSON.stringify(input[30][47])) // == '"f"'
                // ) {
                //   title_UK = 'Versorgung an 47 erforderlich?';
                // }

                // if(condition.includes(JSON.stringify(input[16][38]))
                //     && condition.includes(JSON.stringify(input[17][37]))
                //     && condition.includes(JSON.stringify(input[31][48]))
                //     && condition.includes(JSON.stringify(input[30][47]))
                // ) {
                //   title_UK = 'Versorgung an 37 und 47 erforderlich?';
                // }

                // text_UK = 'Answer "Ja / Nein"';

                // this.$fire({
                //   text: text_UK,
                //   title: title_UK,
                //   type: 'question',
                //   showCancelButton: true,
                //   confirmButtonColor: '#3085d6',
                //   cancelButtonColor: '#A55',
                //   confirmButtonText: 'Ja',
                //   cancelButtonText: 'Nein'
                // }).then((result_UK) => {

                //   if (result_UK.value) { //3.1 [0]
                //     // this.displayData(response.data[1])
                //     console.log(response.data[1][1])
                //   }
                //   else { // [1] 2.xers
                //     // this.displayData(response.data[0])
                //     console.log(response.data[0])
                //   }
                // })

              }

              // this.$fire({
              //   text: text,
              //   title: title,
              //   type: 'question',
              //   showCancelButton: true,
              //   confirmButtonColor: '#3085d6',
              //   cancelButtonColor: '#A55',
              //   confirmButtonText: 'Ja',
              //   cancelButtonText: 'Nein'
              // }).then((result) => {

              //   if (result.value) { //3.1 [0]
              //     this.displayData(response.data[1])
              //   }
              //   else { // [1] 2.xers
              //     this.displayData(response.data[0])
              //   }
              // })
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

        this.tableData  = responseData
        this.Total_case = responseData['Total_case'] // get for Next button
        // this.apiCallSuccess = true //to change teeth images
        this.dataRV_GAV_AAV = []
        this.overlay = false

        //('Aufbaufüllung_RV') reset
        for(var case_=0; case_<this.Total_case; case_++) {
          this.OptGozGAVselected_RV[case_] = null
          this.OptGozGAVselected_RV_[case_] = null

          this.OptGozGAVselected_GAV[case_] = null
          this.OptGozGAVselected_GAV_[case_] = null

          this.OptGozGAVselected_AAV[case_] = null
          this.OptGozGAVselected_AAV_[case_] = null
        }
      },
      displayRVs(label, idValue, ids, caseId) {
        let dataValues = JSON.parse(document.getElementById(idValue).value)

        this.reOpenLabel[caseId]   = label
        this.reOpenidValue[caseId] = idValue
        this.reOpenids[caseId]     = ids
        this.reOpenCaseid[caseId]  = caseId

        this.dialogRow = caseId;

        /** Reset Images **/
        this.apiCallSuccess = false

        if(label == 'lblRV') {
          this.planLabel = label+ids
          this.RVShortcut = dataValues['RV Solution shortcuts'];
          if(dataValues['RV Solution BEMA Region']['19']) {
            this.case_region_ = dataValues['RV Solution BEMA Region']['19'] // As 19 always has the original region values either than AAV
          }
        }

        if(label == 'lblGAV') {
          this.planLabel = label+ids
          this.RVShortcut = dataValues['RV Solution shortcuts'];
          if(dataValues['GAV Solution BEMA Region']['19']) {
            this.case_region_ = dataValues['GAV Solution BEMA Region']['19'] // As 19 always has the original region values either than AAV
          }

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
        this.optBema= []
        this.optBemaGav= []
        this.dialogCalc = true // show the individual solution
        this.selectedCaseId = idValue
        

        // FOR Case questions
        // console.log(this.dataRV_GAV_AAV)
        this.optBemaValuesRV = []
        // this.showOptGozGAV = false // make opt GOZ GAV false for all

        // reset and display different in RV, GAV, AAV for opt GOZ
        this.optGozValuesGAV = []
        this.optGozValuesGAV_ = []
        this.OptGozGAVselected = []
        this.displayOptGozGavs = false
        this.displayOptGozGavs_ = false
        this.showOptGozGAVTable = []
        this.showOptGozGAV_Table = []
        this.OptGozGAVselectedReg = []
        this.OptGozGAVselectedReg_ = []
        
        if(label == 'lblRV') {
          if(dataValues['RV Solution BEMA Opt Region'] !== '') {
            if( dataValues['RV Solution BEMA Region']['20a'] !== undefined
            ) {
                var textOpt = dataValues['RV Solution BEMA Region']['20a'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '20a' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['RV Solution BEMA Region']['20b'] !== undefined
            ) {
                var textOpt = dataValues['RV Solution BEMA Region']['20b'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '20b' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['RV Solution BEMA Region']['20c'] !== undefined
            ) {
                var textOpt = dataValues['RV Solution BEMA Region']['20c'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '20c' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['RV Solution BEMA Region']['91a'] !== undefined
            ) {
                var textOpt = dataValues['RV Solution BEMA Region']['91a'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91a' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['RV Solution BEMA Region']['91b'] !== undefined
            ) {
                var textOpt = dataValues['RV Solution BEMA Region']['91b'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91b' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['RV Solution BEMA Region']['91d'] !== undefined
            ) {
                var textOpt = dataValues['RV Solution BEMA Region']['91d'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91d' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

          }

          if(this.optBemaValuesRV.length>0) {
            this.showCaseQuesRV = true

            this.showCaseQuesGAV = false
            this.showCaseQuesAAV = false
          }

          // For opt GOZ GAV

          if(this.optGozValuesGAV.length>0) {
            this.optGAVGozArr     = [0, 1]
            this.optGozGAVval     = ['2180', '2197']
            this.optGozNameGAV    = [this.caseBemaOpt[0]['2180_Name'], this.caseBemaOpt[0]['2197_Name']]
            this.optGozPriceGAV   = [this.caseBemaOpt[0]['2180_Price'], this.caseBemaOpt[0]['2197_Price']]
          }

          if(this.optGozValuesGAV_.length>0) {
            this.optGAVGozArr_     = [0]
            this.optGozGAVval_     = ['2197']
            this.optGozNameGAV_    = [this.caseBemaOpt[0]['2197_Name']]
            this.optGozPriceGAV_   = [this.caseBemaOpt[0]['2197_Price']]
          }

        }

        if(label == 'lblGAV') {
          if(dataValues['GAV Solution BEMA Opt Region'] !== '') {
            if( dataValues['GAV Solution BEMA Region']['20a'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution BEMA Region']['20a'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '20a' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution BEMA Region']['20b'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution BEMA Region']['20b'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '20b' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution BEMA Region']['20c'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution BEMA Region']['20c'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '20c' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution BEMA Region']['91a'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution BEMA Region']['91a'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91a' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution BEMA Region']['91b'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution BEMA Region']['91b'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91b' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution BEMA Region']['91d'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution BEMA Region']['91d'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91d' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }
          }

          if( dataValues['GAV Solution GOZ Region'] !== ''
          ) {
            if( dataValues['GAV Solution GOZ Region']['2210'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution GOZ Region']['2210'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91d' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution GOZ Region']['2220'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution GOZ Region']['2220'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91d' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution GOZ Region']['5010'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution GOZ Region']['5010'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91d' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution GOZ Region']['5040'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution GOZ Region']['5040'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91d' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                }
            }

          }

          if(this.optBemaValuesRV.length>0) {
            this.showCaseQuesGAV = true

            this.showCaseQuesRV = false
            this.showCaseQuesAAV = false
          }

          // For opt GOZ GAV
          if(dataValues['GAV Solution GOZ Region Opt'] !== '') {

            if( dataValues['GAV Solution GOZ Region']['2210'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution GOZ Region']['2210'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution GOZ Region']['2220'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution GOZ Region']['2220'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution GOZ Region']['5010'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution GOZ Region']['5010'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution GOZ Region']['5040'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution GOZ Region']['5040'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution GOZ Region']['2200'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution GOZ Region']['2200'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['GAV Solution GOZ Region']['5000'] !== undefined
            ) {
                var textOpt = dataValues['GAV Solution GOZ Region']['5000'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

          }

          if(this.optGozValuesGAV.length>0) {
            this.optGAVGozArr     = [0, 1]
            this.optGozGAVval     = ['2180', '2197']
            this.optGozNameGAV    = [this.caseBemaOpt[0]['2180_Name'], this.caseBemaOpt[0]['2197_Name']]
            this.optGozPriceGAV   = [this.caseBemaOpt[0]['2180_Price'], this.caseBemaOpt[0]['2197_Price']]
          }

          if(this.optGozValuesGAV_.length>0) {
            this.optGAVGozArr_     = [0]
            this.optGozGAVval_     = ['2197']
            this.optGozNameGAV_    = [this.caseBemaOpt[0]['2197_Name']]
            this.optGozPriceGAV_   = [this.caseBemaOpt[0]['2197_Price']]
          }

        }

        if(label == 'lblAAV') {
          if( dataValues['AAV Solution GOZ Region'] !== ''
          ) {
            if( dataValues['AAV Solution GOZ Region']['2210'] !== undefined
            ) {
                var textOpt = dataValues['AAV Solution GOZ Region']['2210'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91d' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                }
            }

            if( dataValues['AAV Solution GOZ Region']['2220'] !== undefined
            ) {
                var textOpt = dataValues['AAV Solution GOZ Region']['2220'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91d' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                }
            }

            if( dataValues['AAV Solution GOZ Region']['5010'] !== undefined
            ) {
                var textOpt = dataValues['AAV Solution GOZ Region']['5010'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91d' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                }
            }

            if( dataValues['AAV Solution GOZ Region']['5040'] !== undefined
            ) {
                var textOpt = dataValues['AAV Solution GOZ Region']['5040'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optBemaValuesRV.push({ '91d' : textOpt[to].trim() })
                  this.optBemaValuesRV.push( textOpt[to].trim() )
                }
            }

          }

          if(this.optBemaValuesRV.length>0) {
            this.showCaseQuesAAV = true

            this.showCaseQuesRV = false
            this.showCaseQuesGAV = false
          }

          // For opt GOZ AAV
          if(dataValues['AAV Solution GOZ Region Opt'] !== '') {

            if( dataValues['AAV Solution GOZ Region Opt']['Freilegung'] !== undefined
            ) {
                var textOpt = dataValues['AAV Solution GOZ Region Opt']['Freilegung']['0080'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  this.optGozValuesGAV.push( textOpt[to].trim() )
                }
            }

            if( dataValues['AAV Solution GOZ Region']['2210'] !== undefined
            ) {
                var textOpt = dataValues['AAV Solution GOZ Region']['2210'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['AAV Solution GOZ Region']['2220'] !== undefined
            ) {
                var textOpt = dataValues['AAV Solution GOZ Region']['2220'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['AAV Solution GOZ Region']['5010'] !== undefined
            ) {
                var textOpt = dataValues['AAV Solution GOZ Region']['5010'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['AAV Solution GOZ Region']['5040'] !== undefined
            ) {
                var textOpt = dataValues['AAV Solution GOZ Region']['5040'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['AAV Solution GOZ Region']['2200'] !== undefined
            ) {
                var textOpt = dataValues['AAV Solution GOZ Region']['2200'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

            if( dataValues['AAV Solution GOZ Region']['5000'] !== undefined
            ) {
                var textOpt = dataValues['AAV Solution GOZ Region']['5000'].split(",");

                for(var to=0; to<textOpt.length; to++) {
                  // this.optGozValuesGAV.push( textOpt[to].trim() )
                  this.optGozValuesGAV_.push( textOpt[to].trim() )
                }
            }

          }

          if(this.optGozValuesGAV.length>0) {
          this.optGAVGozArr     = [0, 1, 2]
          this.optGozGAVval     = ['0080', '0090', '9040']
          this.optGozNameGAV    = [this.caseBemaOpt[0]['0080_Name'], this.caseBemaOpt[0]['0090_Name'], this.caseBemaOpt[0]['9040_Name']]
          this.optGozPriceGAV   = [this.caseBemaOpt[0]['0080_Price'], this.caseBemaOpt[0]['0090_Price'], this.caseBemaOpt[0]['9040_Price']]
          }

          if(this.optGozValuesGAV_.length>0) {
          this.optGAVGozArr_     = [0]
          this.optGozGAVval_     = ['2197']
          this.optGozNameGAV_    = [this.caseBemaOpt[0]['2197_Name']]
          this.optGozPriceGAV_   = [this.caseBemaOpt[0]['2197_Price']]
          }
        }

      },
      optGozGavCall(solNo) {
        // console.log(solNo)
        console.log('solNo')
        console.log(this.OptGozGAVselected_RV)
        console.log(this.OptGozGAVselectedReg_RV)
        console.log('solNo__')

        if(this.OptGozGAVselected_RV[solNo] == "Aufbaufüllung_RV"+solNo
        ) {
          this.displayOptGozGavs_RV[solNo] = true
        }
        else {
          this.displayOptGozGavs_RV[solNo] = false
        }
        

        if(this.OptGozGAVselected_GAV[solNo] == "Aufbaufüllung_GAV"+solNo
        ) {
          this.displayOptGozGavs_GAV[solNo] = true
        }
        else {
          this.displayOptGozGavs_GAV[solNo] = false
        }


        if(this.OptGozGAVselected_AAV[solNo] == "Aufbaufüllung_AAV"+solNo
        ) {
          this.displayOptGozGavs_AAV[solNo] = true
        }
        else {
          this.displayOptGozGavs_AAV[solNo] = false
        }
      },
      optGozGavCall_(solNo) {
        console.log(solNo)
        console.log(this.OptGozGAVselected_RV_)
        

        if(this.OptGozGAVselected_RV_.indexOf("Adhäsive_RV"+solNo) !== -1) {
          this.displayOptGozGavs_RV_[solNo] = true
        }
        if(this.OptGozGAVselected_RV_.indexOf("Adhäsive_RV"+solNo) == -1
        ) {
          this.displayOptGozGavs_RV_[solNo] = false
        }


        if(this.OptGozGAVselected_GAV_.indexOf("Adhäsive_GAV"+solNo) !== -1) {
          this.displayOptGozGavs_GAV_[solNo] = true
        }
        if(this.OptGozGAVselected_GAV_.indexOf("Adhäsive_GAV"+solNo) == -1
        ) {
          this.displayOptGozGavs_GAV_[solNo] = false
        }

        if(this.OptGozGAVselected_AAV_.indexOf("Adhäsive_AAV"+solNo) !== -1) {
          this.displayOptGozGavs_AAV_[solNo] = true
        }
        if(this.OptGozGAVselected_AAV_.indexOf("Adhäsive_AAV"+solNo) == -1
        ) {
          this.displayOptGozGavs_AAV_[solNo] = false
        }
      },
      optGozGavCallReg(dialogRow, region) {
        if(this.OptGozGAVselectedReg_RV_.indexOf(region) !== -1) {
          this.showOptGozGAV_Table_RV[region] = true
        }
        if(this.OptGozGAVselectedReg_RV_.indexOf(region) == -1) {
          this.showOptGozGAV_Table_RV[region] = false
        }

  
        if(this.OptGozGAVselectedReg_RV.indexOf(region) !== -1) {
          this.showOptGozGAVTable_RV[region] = true
        }
        if(this.OptGozGAVselectedReg_RV.indexOf(region) == -1) {
          this.showOptGozGAVTable_RV[region] = false
        }


        if(this.OptGozGAVselectedReg_GAV_.indexOf(region) !== -1) {
          this.showOptGozGAV_Table_GAV[region] = true
        }
        if(this.OptGozGAVselectedReg_GAV_.indexOf(region) == -1) {
          this.showOptGozGAV_Table_GAV[region] = false
        }

        if(this.OptGozGAVselectedReg_GAV.indexOf(region) !== -1) {
          this.showOptGozGAVTable_GAV[region] = true
        }
        if(this.OptGozGAVselectedReg_GAV.indexOf(region) == -1) {
          this.showOptGozGAVTable_GAV[region] = false
        }


        if(this.OptGozGAVselectedReg_AAV_.indexOf(region) !== -1) {
          this.showOptGozGAV_Table_AAV[region] = true
        }
        if(this.OptGozGAVselectedReg_AAV_.indexOf(region) == -1) {
          this.showOptGozGAV_Table_AAV[region] = false
        }

        if(this.OptGozGAVselectedReg_AAV.indexOf(region) !== -1) {
          this.showOptGozGAVTable_AAV[region] = true
        }
        if(this.OptGozGAVselectedReg_AAV.indexOf(region) == -1) {
          this.showOptGozGAVTable_AAV[region] = false
        }
        
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

        
        for(let i=0; i<findingsArrayImportIni.length; i++) {
          //Add teeth nos to the status array
          let char = undefined
          char = findingsArrayImportIni[i].match(/[a-z)(\-]/g)

          if( char !== null
          )
          {
            findingsArrayImport.push(findingsArrayImportIni[i]);
          }
        }

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

        var newGozAmount = 0;

        if(solutionT == 'GAVGOZ') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('GAVSliderGoz'+faktors).value])
          document.getElementById('GAVGOZAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'GAVGOZAmount'+faktors
        }

        if(solutionT == 'AAVGOZ') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('AAVGOZSlider'+faktors).value])
          document.getElementById('AAVGOZAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'AAVGOZAmount'+faktors
        }

        if(solutionT == 'RVstift') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('RVstiftSlider'+faktors).value])
          document.getElementById('RVstiftAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'RVstiftAmount'+faktors
        }

        if(solutionT == 'RVAuf') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('RVAufSlider'+faktors).value])
          document.getElementById('RVAufAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'RVAufAmount'+faktors
        }

        if(solutionT == 'RVAdh') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('RVAdhSlider'+faktors).value])
          document.getElementById('RVAdhAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'RVAdhAmount'+faktors
        }


        if(solutionT == 'GAVstift') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('GAVstiftSlider'+faktors).value])
          document.getElementById('GAVstiftAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'GAVstiftAmount'+faktors
        }

        if(solutionT == 'GAVAuf') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('GAVAufSlider'+faktors).value])
          document.getElementById('GAVAufAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'GAVAufAmount'+faktors
        }

        if(solutionT == 'GAVAdh') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('GAVAdhSlider'+faktors).value])
          document.getElementById('GAVAdhAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'GAVAdhAmount'+faktors
        }


        if(solutionT == 'AAVstift') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('AAVstiftSlider'+faktors).value])
          document.getElementById('AAVstiftAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'AAVstiftAmount'+faktors
        }

        if(solutionT == 'AAVAuf') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('AAVAufSlider'+faktors).value])
          document.getElementById('AAVAufAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'AAVAufAmount'+faktors
        }

        if(solutionT == 'AAVAdh') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('AAVAdhSlider'+faktors).value])
          document.getElementById('AAVAdhAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'AAVAdhAmount'+faktors
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
      optRVBemaActivate() {
        console.log(this.optBema)
      },
      displayPlanen(rowIndex) {
        console.log(rowIndex)
        // this.dialogSolution[rowIndex] = true;  // issue recheck
        this.dialogRow = rowIndex;
        this.displaySecond = rowIndex;
      },
      cancelPlanen(rowIndex) {
        var index_ = this.showCasePencil.indexOf(rowIndex);
        if (index_ > -1) {
          this.showCasePencil.splice(index_, 1)
        }

        document.getElementById("planen"+rowIndex).innerHTML = 'Keine Planung'

        this.totalBemaArr[rowIndex]     = '0.00'
        this.totalAmountFArr[rowIndex]  = '0.00'
        this.totalGavArr[rowIndex]      = '0.00'
        this.totalSumCalcArr[rowIndex]  = '0.00'
        
        this.totalTableCalc()

        // reset opt checkboxes
        this.displayOptGozGavs_RV[rowIndex]     = []
        this.displayOptGozGavs_RV_[rowIndex]    = []
        this.OptGozGAVselectedReg_RV[rowIndex]  = []
        this.OptGozGAVselectedReg_RV_[rowIndex] = []
        this.showOptGozGAVTable_RV[rowIndex]    = []  // opt GOZ GAV op 1
        this.showOptGozGAV_Table_RV[rowIndex]   = []  // opt GOZ GAV op 2

        this.displayOptGozGavs_GAV[rowIndex]      = []
        this.displayOptGozGavs_GAV_[rowIndex]     = []
        this.OptGozGAVselectedReg_GAV[rowIndex]   = []
        this.OptGozGAVselectedReg_GAV_[rowIndex]  = []
        this.showOptGozGAVTable_GAV[rowIndex]     = []  // opt GOZ GAV op 1
        this.showOptGozGAV_Table_GAV[rowIndex]    = []  // opt GOZ GAV op 2

        this.displayOptGozGavs_AAV[rowIndex]      = []
        this.displayOptGozGavs_AAV_[rowIndex]     = []
        this.OptGozGAVselectedReg_AAV[rowIndex]   = []
        this.OptGozGAVselectedReg_AAV_[rowIndex]  = []
        this.showOptGozGAVTable_AAV[rowIndex]     = []  // opt GOZ GAV op 1
        this.showOptGozGAV_Table_AAV[rowIndex]    = []  // opt GOZ GAV op 2

        //('Aufbaufüllung_RV') reset
        this.OptGozGAVselected_RV[rowIndex] = null
        this.OptGozGAVselected_RV_[rowIndex] = null

        this.OptGozGAVselected_GAV[rowIndex] = null
        this.OptGozGAVselected_GAV_[rowIndex] = null

        this.OptGozGAVselected_AAV[rowIndex] = null
        this.OptGozGAVselected_AAV_[rowIndex] = null

        this.optGozGavCall(rowIndex)
        this.optGozGavCall_(rowIndex)

        // stift reset
        this.optBemaRV[rowIndex] = []
        this.optBemaRVShow = []
        this.optGozRVShow = []
        this.optBemaRVJa = []
        this.optBemaRVJa2= []
        this.optBemaRVSecond= []
        this.optBemaRVSecond2= []
        this.displayOptsBemaRV(rowIndex)

        this.closeCalc() // reset the main solution display radio buttons

      },
      totalTableCalc() { // Final calc before display in the table
        var tempBemaArr     = 0.00
        var tempAmountFArr  = 0.00
        var tempGavArr      = 0.00
        var tempSumCalcArr  = 0.00

        for(var si=0; si<this.totalBemaArr.length; si++) {
          if(this.totalBemaArr[si]
          ) {
            tempBemaArr += parseFloat(this.totalBemaArr[si])
          }
        }

        for(var si=0; si<this.totalAmountFArr.length; si++) {
          if(this.totalAmountFArr[si]
          ) {
            tempAmountFArr += parseFloat(this.totalAmountFArr[si])
          }
        }

        for(var si=0; si<this.totalGavArr.length; si++) {
          if(this.totalGavArr[si]
          ) {
            tempGavArr += parseFloat(this.totalGavArr[si])
          }
        }

        for(var si=0; si<this.totalSumCalcArr.length; si++) {
          if(this.totalSumCalcArr[si]
          ) {
            tempSumCalcArr += parseFloat(this.totalSumCalcArr[si])
          }
        }

        this.totalBemaDisp      = parseFloat(tempBemaArr).toFixed(2)
        this.totalAmountFDisp   = parseFloat(tempAmountFArr).toFixed(2)
        this.totalGavDisp       = parseFloat(tempGavArr).toFixed(2)
        this.totalSumCalcDisp   = parseFloat(tempSumCalcArr).toFixed(2)

        // console.log(tempAmountFArr)

      },
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
          elementOpt.classList.add("clsGozAmount");
          elementOpt.classList.remove("clsGozAmountNo");
        }

        if(this.optBema.length > 0
        ) {  
          for(var opb=0; opb<this.optBema.length; opb++) {
            var elementOptB = document.getElementById(this.optBema[opb]);
            elementOptB.classList.add("clsBemaAmount");
            elementOptB.classList.remove("oclsBemaAmountNo");
          }
        }

        if(this.optBemaGav.length > 0
        ) {  
          for(var opb=0; opb<this.optBemaGav.length; opb++) {
            var elementOptB = document.getElementById(this.optBemaGav[opb]);
            elementOptB.classList.add("clsGozAmount");
            elementOptB.classList.remove("oclsBemaAmountGavNo");
          }
        }
        
        // "Aufbaufüllung"
        this.showOptGozGAVTable_RV.filter((value, region) => {
            console.log(value);
            console.log(region);

            if(value &&
              this.OptGozGAVselected_RV[dialogRowIndex]
            ) {
              var elementOpt = document.getElementById('RVAufAmount2180'+region+'RV');
              elementOpt.classList.add("clsGozAmount");
              elementOpt.classList.remove("clsGoaAmountNo");

              var elementOpt2 = document.getElementById('RVAufAmount2197'+region+'RV');
              elementOpt2.classList.add("clsGozAmount");
              elementOpt2.classList.remove("clsGoaAmountNo");
            }
        });
        this.showOptGozGAVTable_GAV.filter((value, region) => {
            if(value &&
              this.OptGozGAVselected_GAV[dialogRowIndex]
            ) {
              var elementOpt = document.getElementById('GAVAufAmount2180'+region+'GAV');
              elementOpt.classList.add("clsGozAmount");
              elementOpt.classList.remove("clsGoaAmountNo");

              var elementOpt2 = document.getElementById('GAVAufAmount2197'+region+'GAV');
              elementOpt2.classList.add("clsGozAmount");
              elementOpt2.classList.remove("clsGoaAmountNo");
            }
        });
        this.showOptGozGAVTable_AAV.filter((value, region) => {
            if(value &&
              this.OptGozGAVselected_AAV[dialogRowIndex]
            ) {
              var elementOpt = document.getElementById('AAVAufAmount2180'+region+'AAV');
              elementOpt.classList.add("clsGozAmount");
              elementOpt.classList.remove("clsGoaAmountNo");

              var elementOpt2 = document.getElementById('AAVAufAmount2197'+region+'AAV');
              elementOpt2.classList.add("clsGozAmount");
              elementOpt2.classList.remove("clsGoaAmountNo");
            }
        });
        // "Aufbaufüllung" END

        // "Adhäsive"
        this.showOptGozGAV_Table_RV.filter((value, region) => {
            if(value &&
              this.OptGozGAVselected_RV_[dialogRowIndex]
            ) {
              var elementOpt = document.getElementById('RVAdhAmount2197'+region+'RV');
              elementOpt.classList.add("clsGozAmount");
              elementOpt.classList.remove("clsGoaAmountNo");              
            }
        });
        this.showOptGozGAV_Table_GAV.filter((value, region) => {
            if(value &&
              this.OptGozGAVselected_GAV_[dialogRowIndex]
            ) {
              var elementOpt = document.getElementById('GAVAdhAmount2197'+region+'GAV');
              elementOpt.classList.add("clsGozAmount");
              elementOpt.classList.remove("clsGoaAmountNo");              
            }
        });
        this.showOptGozGAV_Table_AAV.filter((value, region) => {
            if(value &&
              this.OptGozGAVselected_AAV_[dialogRowIndex]
            ) {
              var elementOpt = document.getElementById('AAVAdhAmount2197'+region+'AAV');
              elementOpt.classList.add("clsGozAmount");
              elementOpt.classList.remove("clsGoaAmountNo");              
            }
        });
        // "Adhäsive" END
        

        const collectionGoz = document.getElementsByClassName("clsGozAmount");
        const collectionBema = document.getElementsByClassName("clsBemaAmount");

        let clsGozAmount = 0;
        let clsBemaAmount = 0;

        // FOR DELETE
        this.totalBema      = 0
        this.totalAmountF   = 0
        this.totalGav       = 0
        this.totalSumCalc   = 0

        // END FOR DELETE

        for(var gozI=0; gozI<collectionGoz.length; gozI++) {
          clsGozAmount += parseFloat(collectionGoz[gozI].innerText)
        }
        this.totalGav = parseFloat(parseFloat(this.totalGav) + parseFloat(clsGozAmount)).toFixed(2)

        for(var bemaI=0; bemaI<collectionBema.length; bemaI++) {
          clsBemaAmount += parseFloat(collectionBema[bemaI].innerText)
        }
        this.totalBema = parseFloat(parseFloat(this.totalBema) + parseFloat(clsBemaAmount)).toFixed(2)

        this.totalSumCalc = parseFloat(parseFloat(this.totalGav) + parseFloat(this.totalBema)).toFixed(2)
        this.totalAmountF = this.totalAmount

        // Einanteil is gesamkosten minus subsidies = festzuschuss

        this.totalBemaArr[dialogRowIndex]     = this.totalBema
        // this.totalAmountFArr[dialogRowIndex]  = this.totalAmountF[dialogRowIndex] // RECHECK
        this.totalAmountFArr[dialogRowIndex]  = this.totalAmountF // RECHECK
        this.totalGavArr[dialogRowIndex]      = this.totalGav
        this.totalSumCalcArr[dialogRowIndex]  = this.totalSumCalc

        this.totalTableCalc()

        document.getElementById("planen"+dialogRowIndex).innerHTML = document.getElementById(this.planLabel).innerHTML
        if(this.case_region_ !== '') {
          document.getElementById("case_region_"+dialogRowIndex).innerHTML = this.case_region_
        }

        this.showCaseTrash = true
        // this.showCaseTrash.push(dialogRowIndex)
        this.showCasePencil.push(dialogRowIndex)

        // remove duplicates from the showCase Trash, showCasePencil array
        // this.showCaseTrash = [...new Set(this.showCaseTrash)]

        var filteredArray = [...new Set(this.showCasePencil)]
        this.showCasePencil = filteredArray

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
        // this.sliderValue = 0.5
        var oldGozAmount = this.gozAmount(this.resetGozAmount, this.ticksLabels[1])
        if(this.idGozSlider !== '')
        {
          document.getElementById(this.idGozSlider).innerHTML = oldGozAmount
        }
        // RESET SLIDER GOZ AMOUNT END

        this.isPlannen = true

      },
      filteredData(item) {
        return this.expandedDataSet.filter(f => f.caseId == item.caseId);
      },
      filteredHistoryData(item) {
        return this.secondExpandedDataSet.filter(f => f.RVId == item.RVId);
      },
      displayOptsBemaRV(rowIndex) {
        if(this.optBemaRV[rowIndex] == 'yes') {
          this.optBemaRVSecond[rowIndex] = true
        }
        else {
          this.optBemaRVSecond[rowIndex] = false

          // reset stift
          this.optBemaRVShow    = []
          this.optGozRVShow     = []
          this.optBemaRVJa      = []
          this.optBemaRVJa2     = []
          this.optBemaRVSecond  = []
          this.optBemaRVSecond2 = []

        }
      },
      dispoptBemaRVSecond(region) {
        if(this.optBemaRVJa[region] == 'gegossen') {
          this.optBemaGozRV[region]     = '18b'
          this.optBemaNameRV[region]    = this.caseBemaOpt[0]['18b_Name']
          this.optBemaPriceRV[region]   = this.caseBemaOpt[0]['18b_Price']

          this.optBemaRVSecond2[region] = false
          
          this.optBemaRVShow[region]    = true
          this.optGozRVShow[region]     = false
        }
        else {
          this.optBemaRVSecond2[region] = true

          this.optBemaRVShow[region]    = false
          this.optGozRVShow[region]     = false
        }
      },
      dispoptBemaRVSecond2(region) {
        if(this.optBemaRVJa2[region] == 'stift') {
          this.optBemaGozRV[region]     = '18a'
          this.optBemaNameRV[region]    = this.caseBemaOpt[0]['18a_Name']
          this.optBemaPriceRV[region]   = this.caseBemaOpt[0]['18a_Price']

          this.optBemaRVShow[region]    = true
          this.optGozRVShow[region]     = false
        }
        else {
          this.optBemaGozArr[region]    = [0, 1]
          this.optBemaGozRV[region]     = ['2195', '2197']
          this.optBemaNameRV[region]    = [this.caseBemaOpt[0]['2195_Name'], this.caseBemaOpt[0]['2197_Name']]
          this.optBemaPriceRV[region]   = [this.caseBemaOpt[0]['2195_Price'], this.caseBemaOpt[0]['2197_Price']]

          this.optBemaRVShow[region]    = false
          this.optGozRVShow[region]     = true
        }

      },
      weiterCall() {
        
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
  
}
.table-container .backColorTable {
  background-color: #cfe2f3;
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

td.insideTable {
  border: none;
  margin-bottom: 5px;
}
.lblStrong {
  font-weight: bold;
}


</style>
