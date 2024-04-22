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

        <div class="table-container my-3 sticky" v-if="calculated">
          <v-simple-table outlined>
            <template v-slot:default>
            <tbody>
              <tr>
                <td class="backColorTable"> Honorar BEMA </td>
                <td class="totalAmountBema" style="width: 110px !important;"> {{ totalBemaDisp }} <span v-html="euro"></span> </td>

                <td class="backColorTable"> Labor gewerblich </td>
                <td style="width: 110px !important;"> {{ totalGewerblichDisp }} € </td>

                <td class="backColorTable"> Festzuschüsse </td>
                <!-- <td v-if="apiCallSuccess"> {{totalAmount}} <span v-html="euro"></span> </td> -->
                <td style="width: 110px !important;"> {{ totalAmountFDisp }} <span v-html="euro"></span> </td>
              </tr>

              <tr>
                <td class="backColorTable"> Honorar GOZ / GOÄ </td>
                <td class="totalAmountGoz" style="width: 110px !important;"> {{ totalGavDisp }} <span v-html="euro"></span> </td>

                <td class="backColorTable"> Eigenlabor </td>
                <td style="width: 110px !important;"> {{ totalEigenlaborDisp }} <span v-html="euro"></span> </td>

                <td class="backColorTable"> Behandlungskosten </td>
                <td style="width: 110px !important;"> {{ totalSumCalcDisp }} <span v-html="euro"></span> </td>

                <td class="backColorTable" style="font-weight: bold;"> Eigenanteil </td>
                <td style="font-weight: bold; width: 110px !important;"> {{ (totalSumCalcDisp - totalAmountFDisp).toFixed(2) }} <span v-html="euro"></span> </td>
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
                          
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            @click=displayPlanen(index)
                            fab
                            dark
                            x-small
                            color="#004d81"
                            v-if=" showCasePencil.indexOf(index) == -1"
                            :id="'btnCasePencil'+index"
                            :disabled=false
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
                            :id="'btnCasePencilSec'+index"
                            :disabled=false
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
                            :id="'btnCaseTrash'+index"
                            :disabled=false
                          >
                            <v-icon dark>
                              mdi-trash-can-outline
                            </v-icon>
                          </v-btn>

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
                <v-simple-table id="bemaRVsRow" v-if="dataRV_GAV_AAV['RV#']" outlined class="my-2">
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
                        <td class="bemaRVsRowBema"> {{indexRV}}</td>
                        <!-- <td> {{datasRV}} </td> -->
                        <td>
                          <input type="hidden" class="bemaRVsRowName" 
                            :value="dataRV_GAV_AAV['RV Solution BEMA name'][indexRV]">
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
                        <td class="bemaRVsRowRegion"> {{datasRV}} </td>
                        <td class="bemaRVsRowQuan"> {{dataRV_GAV_AAV['RV Solution BEMA Quantity'][indexRV]}} </td>
                        <td class="clsBemaAmount bemaRVsRowAmt"> {{dataRV_GAV_AAV['RV Solution BEMA amount'][indexRV]}} </td>
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
                                  <td class="optGozRVsRowBema"> {{ optGozGAVval[bemaRegion] }} </td>
                                  <td>
                                    <input type="hidden" class="optGozRVsRowName" 
                                      :value="optGozNameGAV[bemaRegion]">

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
                                  <td class="optGozRVsRowRegion"> {{ region }} </td>
                                  <td class="optGozRVsRowQuan"> 1 </td>
                                  <td style="width: 150px;">
                                    <v-slider
                                      :value="idGozSliderArr[optGozGAVval[bemaRegion]+region+'RV']"
                                      :tick-labels="ticksLabels"
                                      :max="2"
                                      step="1"
                                      ticks="always"
                                      tick-size="4"
                                      :thumb-size="36"
                                      :vertical="false"
                                      v-on:change="displayFak(optGozGAVval[bemaRegion]+region+'RV', optGozPriceGAV[bemaRegion], 'RVAuf', dialogRow)"
                                      :id="'RVAufSlider'+optGozGAVval[bemaRegion]+region+'RV'"
                                    >
                                    </v-slider>
                                    <input type="hidden" class="optGozRVsRowFactor" 
                                      :value="optGozGAVval[bemaRegion]+region+'RV'">
                                  </td>
                                  <td class="clsGoaAmountNo optGozRVsRowAmt" :id="'RVAufAmount'+optGozGAVval[bemaRegion]+region+'RV'"> 
                                    {{ gozAmount(optGozPriceGAV[bemaRegion], ticksLabels[idGozSliderArr[optGozGAVval[bemaRegion]+region+'RV']]) }} 
                                  </td>
                                  
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
                                  <!-- <td class="optGozRVsRowBema_"> {{ optGozGAVval[bemaRegion] }} </td> -->
                                  <td class="optGozRVsRowBema_"> {{ optGozGAVval_[bemaRegion] }} </td>
                                  <td>
                                    <input type="hidden" class="optGozRVsRowName_" 
                                      :value="optGozNameGAV_[bemaRegion]">

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
                                  <td class="optGozRVsRowRegion_"> {{ region }} </td>
                                  <td class="optGozRVsRowQuan_"> 1 </td>
                                  <td style="width: 150px;">
                                    <v-slider
                                      :value="idGozSliderArr[optGozGAVval_[bemaRegion]+region+'RV_']"
                                      :tick-labels="ticksLabels"
                                      :max="2"
                                      step="1"
                                      ticks="always"
                                      tick-size="4"
                                      :thumb-size="36"
                                      :vertical="false"
                                      v-on:change="displayFak(optGozGAVval_[bemaRegion]+region+'RV_', optGozPriceGAV_[bemaRegion], 'RVAdh', dialogRow)"
                                      :id="'RVAdhSlider'+optGozGAVval_[bemaRegion]+region+'RV_'"
                                    >
                                    </v-slider>
                                    <input type="hidden" class="optGozRVsRowFactor_" 
                                      :value="optGozGAVval_[bemaRegion]+region+'RV_'">
                                    
                                  </td>
                                  <td class="clsGoaAmountNo optGozRVsRowAmt_" :id="'RVAdhAmount'+optGozGAVval_[bemaRegion]+region+'RV_'"> 
                                    {{ gozAmount(optGozPriceGAV_[bemaRegion], ticksLabels[idGozSliderArr[optGozGAVval_[bemaRegion]+region+'RV_']]) }} 
                                  </td>
                                  
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
                              <td class="stiftRVsRowBema"> {{ optBemaGozRV[bemaRegion] }} </td>
                              <td>
                                <input type="hidden" class="stiftRVsRowName" 
                                      :value="optBemaNameRV[bemaRegion]">

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
                              <td class="stiftRVsRowRegion"> {{ bemaRegion }} </td>
                              <td class="stiftRVsRowQuan"> 1 </td>
                              <td class="clsBemaAmountNo stiftRVsRowAmt" :id="'RVstiftAmountB'+optBemaGozRV[bemaRegion]+bemaRegion+'RV'"> 
                                {{ optBemaPriceRV[bemaRegion] }}
                              </td>
                              
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
                              <td class="stiftGozRVsRowBema"> {{ optBemaGozRV[bemaRegion][index] }} </td>
                              <td>
                                <input type="hidden" class="stiftGozRVsRowName" 
                                      :value="optBemaNameRV[bemaRegion][index]">

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
                              <td class="stiftGozRVsRowRegion"> {{ bemaRegion }} </td>
                              <td class="stiftGozRVsRowQuan"> 1 </td>
                              <td style="width: 150px;">
                                <v-slider
                                  :value="idGozSliderArr[optBemaGozRV[bemaRegion][index]+bemaRegion+'RVstift']"
                                  :tick-labels="ticksLabels"
                                  :max="2"
                                  step="1"
                                  ticks="always"
                                  tick-size="4"
                                  :thumb-size="36"
                                  :vertical="false"
                                  v-on:change="displayFak(optBemaGozRV[bemaRegion][index]+bemaRegion+'RVstift', optBemaPriceRV[bemaRegion][index], 'RVstift', dialogRow)"
                                  :id="'RVstiftSlider'+optBemaGozRV[bemaRegion][index]+bemaRegion+'RVstift'"
                                >
                                </v-slider>
                                <input type="hidden" class="stiftGozRVsRowFactor" 
                                      :value="optBemaGozRV[bemaRegion][index]+bemaRegion+'RVstift'">
                                
                              </td>
                              <td class="clsGoaAmountNo stiftGozRVsRowAmt" :id="'RVstiftAmount'+optBemaGozRV[bemaRegion][index]+bemaRegion+'RVstift'"> 
                                {{ gozAmount(optBemaPriceRV[bemaRegion][index], ticksLabels[idGozSliderArr[optBemaGozRV[bemaRegion][index]+bemaRegion+'RVstift']]) }} 
                              </td>
                              
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
                        <td class="bemaGAVsRowBema"> {{indexGAV}}</td>
                        <td>
                          <input type="hidden" class="bemaGAVsRowName" 
                            :value="dataRV_GAV_AAV['GAV Solution BEMA name'][indexGAV]">
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
                        <td class="bemaGAVsRowRegion"> {{datasGAV}} </td>
                        <td class="bemaGAVsRowQuan"> {{dataRV_GAV_AAV['GAV Solution BEMA Quantity'][indexGAV]}} </td>
                        <td class="clsBemaAmount bemaGAVsRowAmt"> {{dataRV_GAV_AAV['GAV Solution BEMA amount'][indexGAV]}} </td>
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
                      <tr v-for="(datasGAV, indexGAV) in dataRV_GAV_AAV['GAV Solution GOZ Region']" :key="datasGAV">
                        <td class="gozGAVsRowBema"> {{indexGAV}}</td>
                        <td>
                          <input type="hidden" class="gozGAVsRowName" 
                            :value="dataRV_GAV_AAV['GAV Solution GOZ name'][indexGAV]">
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
                        <td class="gozGAVsRowRegion"> {{datasGAV}}</td>
                        <td class="gozGAVsRowQuan"> {{dataRV_GAV_AAV['GAV Solution GOZ Quantity'][indexGAV]}}</td>
                        <td style="width: 150px;">
                          <v-slider
                            :value="idGozSliderArr[dataRV_GAV_AAV['GAV#'] +datasGAV+dialogRow+'GAV']"
                            :tick-labels="ticksLabels"
                            :max="2"
                            step="1"
                            ticks="always"
                            tick-size="4"
                            :thumb-size="36"
                            :vertical="false"
                            v-on:change="displayFak(dataRV_GAV_AAV['GAV#'] +datasGAV+dialogRow+'GAV', dataRV_GAV_AAV['GAV Solution GOZ amount'][indexGAV], 'GAVGOZ', dialogRow)"
                            :id="'GAVSliderGoz'+ dataRV_GAV_AAV['GAV#'] +datasGAV+dialogRow+'GAV'"
                          >
                          </v-slider>
                          <input type="hidden" class="gozGAVsRowFactor" 
                                      :value="dataRV_GAV_AAV['GAV#'] +datasGAV+dialogRow+'GAV'">
                          
                        </td>
                        <td class="clsGozAmount gozGAVsRowAmt" :id="'GAVGOZAmount'+ dataRV_GAV_AAV['GAV#'] +datasGAV+dialogRow+'GAV'"> 
                          {{ gozAmount(dataRV_GAV_AAV['GAV Solution GOZ amount'][indexGAV], ticksLabels[idGozSliderArr[dataRV_GAV_AAV['GAV#'] +datasGAV+dialogRow+'GAV']]) }}
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
                                  <td class="optGozGAVsRowBema"> {{ optGozGAVval[bemaRegion] }} </td>
                                  <td>
                                    <input type="hidden" class="optGozGAVsRowName" 
                                      :value="optGozNameGAV[bemaRegion]">

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
                                  <td class="optGozGAVsRowRegion"> {{ region }} </td>
                                  <td class="optGozGAVsRowQuan"> 1 </td>
                                  <td style="width: 150px;">
                                    <v-slider
                                      :value="idGozSliderArr[optGozGAVval[bemaRegion]+region+'GAV']"
                                      :tick-labels="ticksLabels"
                                      :max="2"
                                      step="1"
                                      ticks="always"
                                      tick-size="4"
                                      :thumb-size="36"
                                      :vertical="false"
                                      v-on:change="displayFak(optGozGAVval[bemaRegion]+region+'GAV', optGozPriceGAV[bemaRegion], 'GAVAuf', dialogRow)"
                                      :id="'GAVAufSlider'+optGozGAVval[bemaRegion]+region+'GAV'"
                                    >
                                    </v-slider>
                                    <input type="hidden" class="optGozGAVsRowFactor" 
                                      :value="optGozGAVval[bemaRegion]+region+'GAV'">
                                    
                                  </td>
                                  <td class="clsGoaAmountNo optGozGAVsRowAmt" :id="'GAVAufAmount'+optGozGAVval[bemaRegion]+region+'GAV'"> 
                                    {{ gozAmount(optGozPriceGAV[bemaRegion], ticksLabels[idGozSliderArr[optGozGAVval[bemaRegion]+region+'GAV']]) }}
                                  </td>
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
                                  <td class="optGozGAVsRowBema_"> {{ optGozGAVval_[bemaRegion] }} </td>
                                  <td>
                                    <input type="hidden" class="optGozGAVsRowName_" 
                                      :value="optGozNameGAV_[bemaRegion]">

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
                                  <td class="optGozGAVsRowRegion_"> {{ region }} </td>
                                  <td class="optGozGAVsRowQuan_"> 1 </td>
                                  <td style="width: 150px;">
                                    <v-slider
                                      :value="idGozSliderArr[optGozGAVval_[bemaRegion]+region+'GAV_']"
                                      :tick-labels="ticksLabels"
                                      :max="2"
                                      step="1"
                                      ticks="always"
                                      tick-size="4"
                                      :thumb-size="36"
                                      :vertical="false"
                                      v-on:change="displayFak(optGozGAVval_[bemaRegion]+region+'GAV_', optGozPriceGAV_[bemaRegion], 'GAVAdh', dialogRow)"
                                      :id="'GAVAdhSlider'+optGozGAVval_[bemaRegion]+region+'GAV_'"
                                    >
                                    </v-slider>
                                    <input type="hidden" class="optGozGAVsRowFactor_" 
                                      :value="optGozGAVval_[bemaRegion]+region+'GAV_'">
                                    
                                  </td>
                                  <td class="clsGoaAmountNo optGozGAVsRowAmt_" :id="'GAVAdhAmount'+optGozGAVval_[bemaRegion]+region+'GAV_'"> 
                                    {{ gozAmount(optGozPriceGAV_[bemaRegion], ticksLabels[idGozSliderArr[optGozGAVval_[bemaRegion]+region+'GAV_']]) }} 
                                  </td>
                                  
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
                              <td class="stiftGAVsRowBema"> {{ optBemaGozRV[bemaRegion] }} </td>
                              <td>
                                <input type="hidden" class="stiftGAVsRowName" 
                                      :value="optBemaNameRV[bemaRegion]">

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
                              <td class="stiftGAVsRowRegion"> {{ bemaRegion }} </td>
                              <td class="stiftGAVsRowQuan"> 1 </td>
                              <td class="clsBemaAmountNo stiftGAVsRowAmt" :id="'GAVstiftAmountB'+optBemaGozRV[bemaRegion]+bemaRegion+'GAV'"> 
                                {{ optBemaPriceRV[bemaRegion] }}
                              </td>
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
                              <td class="stiftGozGAVsRowBema"> {{ optBemaGozRV[bemaRegion][index] }} </td>
                              <td>
                                <input type="hidden" class="stiftGozGAVsRowName" 
                                      :value="optBemaNameRV[bemaRegion][index]">

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
                              <td class="stiftGozGAVsRowRegion"> {{ bemaRegion }} </td>
                              <td class="stiftGozGAVsRowQuan"> 1 </td>
                              <td style="width: 150px;">
                                <v-slider
                                  :value="idGozSliderArr[optBemaGozRV[bemaRegion][index]+bemaRegion+'GAVstift']"
                                  :tick-labels="ticksLabels"
                                  :max="2"
                                  step="1"
                                  ticks="always"
                                  tick-size="4"
                                  :thumb-size="36"
                                  :vertical="false"
                                  v-on:change="displayFak(optBemaGozRV[bemaRegion][index]+bemaRegion+'GAVstift', optBemaPriceRV[bemaRegion][index], 'GAVstift', dialogRow)"
                                  :id="'GAVstiftSlider'+optBemaGozRV[bemaRegion][index]+bemaRegion+'GAVstift'"
                                >
                                </v-slider>
                                <input type="hidden" class="stiftGozGAVsRowFactor" 
                                      :value="optBemaGozRV[bemaRegion][index]+bemaRegion+'GAVstift'">
                              </td>
                              <td class="clsGoaAmountNo stiftGozGAVsRowAmt" :id="'GAVstiftAmount'+optBemaGozRV[bemaRegion][index]+bemaRegion+'GAVstift'"> 
                                {{ gozAmount(optBemaPriceRV[bemaRegion][index], ticksLabels[idGozSliderArr[optBemaGozRV[bemaRegion][index]+bemaRegion+'GAVstift']]) }} 
                              </td>
                              
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>

                  </div>

                <div v-if="dataRV_GAV_AAV['GAV#']">
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
                      <tr v-for="(datasAAV, indexAAV) in dataRV_GAV_AAV['AAV Solution GOZ Region']" :key="indexAAV+datasAAV">
                        <td class="gozAAVsRowBema" v-if="datasAAV"> {{indexAAV}}</td>
                        <!-- <td v-if="datasAAV"> {{datasAAV}}</td>
                        <td v-if="datasAAV"> {{dataRV_GAV_AAV['AAV Solution GOZ Region'][indexAAV]}}</td> -->
                        <td v-if="datasAAV">
                          <input type="hidden" class="gozAAVsRowName" 
                            :value="dataRV_GAV_AAV['AAV Solution GOZ name'][indexAAV]">
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
                        <td class="gozAAVsRowRegion" v-if="datasAAV"> {{datasAAV}}</td>
                        <td class="gozAAVsRowQuan" v-if="datasAAV"> {{dataRV_GAV_AAV['AAV Solution GOZ Quantity'][indexAAV]}}</td>
                        <td v-if="datasAAV" style="width: 150px;">
                          <v-slider
                            :value="idGozSliderArr[dataRV_GAV_AAV['AAV#'] +indexAAV+dialogRow+'AAV']"
                            :tick-labels="ticksLabels"
                            :max="2"
                            step="1"
                            ticks="always"
                            tick-size="4"
                            :thumb-size="36"
                            :vertical="false"
                            v-on:change="displayFak(dataRV_GAV_AAV['AAV#'] +indexAAV+dialogRow+'AAV', dataRV_GAV_AAV['AAV Solution GOZ amount'][indexAAV], 'AAVGOZ', dialogRow)"
                            :id="'AAVGOZSlider'+ dataRV_GAV_AAV['AAV#'] +indexAAV+dialogRow+'AAV'"
                              v-if="indexAAV !== '0500' && indexAAV !== '0510' && indexAAV !== '0520' && indexAAV !== '0530'"
                          >
                          </v-slider>
                          <input type="hidden" class="gozAAVsRowFactor" 
                                      :value="dataRV_GAV_AAV['AAV#'] +indexAAV+dialogRow+'AAV'">

                        </td>
                        <td  class="clsGozAmount gozAAVsRowAmt" :id="'AAVGOZAmount'+ dataRV_GAV_AAV['AAV#'] +indexAAV+dialogRow+'AAV'">
                          {{ idGozSliderAmountArr[dataRV_GAV_AAV['AAV#'] +indexAAV+dialogRow+'AAV'] }}
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
                              v-on:change="displayFak(dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId, dataRV_GAV_AAV['AAV Solution GOZ amount Opt'][indexAAV], 'oAAV', dialogRow)"
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

                        <!-- Aufbaufüllung / Freilegung (AAV) -->
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
                                  <td class="optGozAAVsRowBema"> {{ optGozGAVval[bemaRegion] }} </td>
                                  <td>
                                    <input type="hidden" class="optGozAAVsRowName" 
                                      :value="optGozNameGAV[bemaRegion]">

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
                                  <td class="optGozAAVsRowRegion"> {{ region }} </td>
                                  <td class="optGozAAVsRowQuan"> 1 </td>
                                  <td style="width: 150px;">
                                    <v-slider
                                      :value="idGozSliderArr[optGozGAVval[bemaRegion]+region+'AAV']"
                                      :tick-labels="ticksLabels"
                                      :max="2"
                                      step="1"
                                      ticks="always"
                                      tick-size="4"
                                      :thumb-size="36"
                                      :vertical="false"
                                      v-on:change="displayFak(optGozGAVval[bemaRegion]+region+'AAV', optGozPriceGAV[bemaRegion], 'AAVAuf', dialogRow)"
                                      :id="'AAVAufSlider'+optGozGAVval[bemaRegion]+region+'AAV'"
                                    >
                                    </v-slider>
                                    <input type="hidden" class="optGozAAVsRowFactor" 
                                      :value="optGozGAVval[bemaRegion]+region+'AAV'">

                                  </td>
                                  <td class="clsGoaAmountNo optGozAAVsRowAmt" :id="'AAVAufAmount'+optGozGAVval[bemaRegion]+region+'AAV'"> 
                                    {{ gozAmount(optGozPriceGAV[bemaRegion], ticksLabels[idGozSliderArr[optGozGAVval[bemaRegion]+region+'AAV']]) }} 
                                  </td>
                                  
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
                                  <td class="optGozAAVsRowBema_"> {{ optGozGAVval_[bemaRegion] }} </td>
                                  <td>
                                    <input type="hidden" class="optGozAAVsRowName_" 
                                      :value="optGozNameGAV_[bemaRegion]">

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
                                  <td class="optGozAAVsRowRegion_"> {{ region }} </td>
                                  <td class="optGozAAVsRowQuan_"> 1 </td>
                                  <td style="width: 150px;">
                                    <v-slider
                                      :value="idGozSliderArr[optGozGAVval_[bemaRegion]+region+'AAV_']"
                                      :tick-labels="ticksLabels"
                                      :max="2"
                                      step="1"
                                      ticks="always"
                                      tick-size="4"
                                      :thumb-size="36"
                                      :vertical="false"
                                      v-on:change="displayFak(optGozGAVval_[bemaRegion]+region+'AAV_', optGozPriceGAV_[bemaRegion], 'AAVAdh', dialogRow)"
                                      :id="'AAVAdhSlider'+optGozGAVval_[bemaRegion]+region+'AAV_'"
                                    >
                                    </v-slider>
                                    <input type="hidden" class="optGozAAVsRowFactor_" 
                                      :value="optGozGAVval_[bemaRegion]+region+'AAV_'">
                                    
                                  </td>
                                  <td class="clsGoaAmountNo optGozAAVsRowAmt_" :id="'AAVAdhAmount'+optGozGAVval_[bemaRegion]+region+'AAV_'"> 
                                    {{ gozAmount(optGozPriceGAV_[bemaRegion], ticksLabels[idGozSliderArr[optGozGAVval_[bemaRegion]+region+'AAV_']]) }} 
                                  </td>
                                  
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
                            v-on:change="displayFak(dataRV_GAV_AAV['AAV#'] +indexAAV+selectedCaseId, dataRV_GAV_AAV['AAV Solution GOZ amount'][indexAAV], 'AAV', dialogRow)"
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
                              <td class="stiftAAVsRowBema"> {{ optBemaGozRV[bemaRegion] }} </td>
                              <td>
                                <input type="hidden" class="stiftAAVsRowName" 
                                      :value="optBemaNameRV[bemaRegion]">
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
                              <td class="stiftAAVsRowRegion"> {{ bemaRegion }} </td>
                              <td class="stiftAAVsRowQuan"> 1 </td>
                              <td class="clsBemaAmountNo stiftAAVsRowAmt" :id="'AAVstiftAmountB'+optBemaGozRV[bemaRegion]+bemaRegion+'AAV'"> 
                                {{ optBemaPriceRV[bemaRegion] }}
                              </td>
                              
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
                              <td class="stiftGozAAVsRowBema"> {{ optBemaGozRV[bemaRegion][index] }} </td>
                              <td>
                                <input type="hidden" class="stiftGozAAVsRowName" 
                                      :value="optBemaNameRV[bemaRegion][index]">

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
                              <td class="stiftGozAAVsRowRegion"> {{ bemaRegion }} </td>
                              <td class="stiftGozAAVsRowQuan"> 1 </td>
                              <td style="width: 150px;">
                                <v-slider
                                  :value="idGozSliderArr[optBemaGozRV[bemaRegion][index]+bemaRegion+'AAVstift']"
                                  :tick-labels="ticksLabels"
                                  :max="2"
                                  step="1"
                                  ticks="always"
                                  tick-size="4"
                                  :thumb-size="36"
                                  :vertical="false"
                                  v-on:change="displayFak(optBemaGozRV[bemaRegion][index]+bemaRegion+'AAVstift', optBemaPriceRV[bemaRegion][index], 'AAVstift', dialogRow)"
                                  :id="'AAVstiftSlider'+optBemaGozRV[bemaRegion][index]+bemaRegion+'AAVstift'"
                                >
                                </v-slider>
                                <input type="hidden" class="stiftGozAAVsRowFactor" 
                                      :value="optBemaGozRV[bemaRegion][index]+bemaRegion+'AAVstift'">
                                
                              </td>
                              <td class="clsGoaAmountNo stiftGozAAVsRowAmt" :id="'AAVstiftAmount'+optBemaGozRV[bemaRegion][index]+bemaRegion+'AAVstift'"> 
                                {{ gozAmount(optBemaPriceRV[bemaRegion][index], ticksLabels[idGozSliderArr[optBemaGozRV[bemaRegion][index]+bemaRegion+'AAVstift']]) }} 
                              </td>
                              
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>

                  </div>

                </div>

                <div v-if="dataRV_GAV_AAV['AAV#']">
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
          <v-btn @click="weiterCall" 
                id="btnWeiterAct" 
                elevation="0" 
                color="#BBDEFB"
                :disabled=false
          >
            Weiter
          </v-btn>
        </div>

        <div v-if="weiterActivate" style="border: 1px solid; padding: 10px; margin: 30px 0;">
          
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <v-checkbox
                v-model="chkBoxGQ89"
                label="Beseitigung grober Artikulations- und Okklusionsstörungen vor Eingliederung von Prothesen und Brücken"
                value="89"
                class="lblStrong"
                v-on:change="showGeneralOpt_89()"
                :disabled="chkBoxGQ89_"
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-simple-table v-if="displayWeiter89" outlined class="my-2">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">BEMA-Nr.</th>
                  <th class="text-left">Leistungsbeschreibung</th>
                  <th class="text-left">Anzahl</th>
                  <th class="text-left">Betrag (€)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center weiter89RowBema"> 89 </td>
                  <td class="text-center">
                    <input type="hidden" class="weiter89RowName" 
                                      :value="caseBemaOpt[0]['89_Name']">

                    <v-tooltip top color="success">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          v-bind="attrs"
                          v-on="on"
                          style="text-transform: none !important; height: 0px !important;"
                        >
                          {{ caseBemaOpt[0]['89_Name']|truncate(25) }}
                        </v-btn>
                      </template>
                      <span> {{ caseBemaOpt[0]['89_Name'] }} </span>
                    </v-tooltip>
                  </td>
                  <td class="text-center weiter89RowQuan"> 1 </td>
                  <td class="clsBemaAmountNo weiter89RowAmt" id="Weiter89_bema">
                    {{ caseBemaOpt[0]['89_Price'] }}
                  </td>
                </tr>
              </tbody>

            </template>
          </v-simple-table>

          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <v-checkbox
                v-model="chkBoxGQ7b"
                :label="caseBemaOpt[0]['7b_Name']"
                value="7b"
                class="lblStrong"
                v-on:change="showGeneralOpt_7b()"
                :disabled="chkBoxGQ7b_"
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-simple-table v-if="displayWeiter7b" outlined class="my-2">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">BEMA-Nr.</th>
                  <th class="text-left">Leistungsbeschreibung</th>
                  <th class="text-left">Anzahl</th>
                  <th class="text-left">Betrag (€)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center weiter7bRowBema"> 7b </td>
                  <td class="text-center">
                    <input type="hidden" class="weiter7bRowName" 
                                      :value="caseBemaOpt[0]['7b_Name']">

                    <v-tooltip top color="success">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          v-bind="attrs"
                          v-on="on"
                          style="text-transform: none !important; height: 0px !important;"
                        >
                          {{ caseBemaOpt[0]['7b_Name']|truncate(25) }}
                        </v-btn>
                      </template>
                      <span> {{ caseBemaOpt[0]['7b_Name'] }} </span>
                    </v-tooltip>
                  </td>
                  <td class="text-center weiter7bRowQuan"> 1 </td>
                  <td class="clsBemaAmountNo weiter7bRowAmt" id="Weiter7b_bema">
                    {{ caseBemaOpt[0]['7b_Price'] }}
                  </td>
                </tr>
              </tbody>

            </template>
          </v-simple-table>

          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <v-checkbox
                v-model="chkBoxGQ8010"
                label="Arbiträre Scharnierachsenbestimmung und Zentrikregistrat"
                value="8010_20"
                class="lblStrong"
                v-on:change="showGeneralOpt_80()"
                :disabled="chkBoxGQ8010_"
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-simple-table v-if="displayWeiter8010" outlined class="my-2">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">GOZ-Nr.</th>
                  <th class="text-left">Leistungsbeschreibung</th>
                  <th class="text-left">Anzahl</th>
                  <th class="text-left">Faktor</th>
                  <th class="text-left">Betrag (€)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center weiter8010RowBema"> 8010 </td>
                  <td class="text-center">
                    <input type="hidden" class="weiter89RowName" 
                                      :value="caseBemaOpt[0]['8010_Name']">

                    <v-tooltip top color="success">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          v-bind="attrs"
                          v-on="on"
                          style="text-transform: none !important; height: 0px !important;"
                        >
                          {{ caseBemaOpt[0]['8010_Name']|truncate(25) }}
                        </v-btn>
                      </template>
                      <span> {{ caseBemaOpt[0]['8010_Name'] }} </span>
                    </v-tooltip>
                  </td>
                  <td class="text-center weiter8010RowQuan"> 1 </td>
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
                      v-on:change="displayFak('weiter8010Slider', caseBemaOpt[0]['8010_Price'], 'weiter8010', 1)"
                      :id="'weiter8010Slider'"
                    >
                    </v-slider>
                  </td>
                  <td class="clsGoaAmountNo weiter8010RowAmt" id="weiter8010Amount">
                    {{ gozAmount(caseBemaOpt[0]['8010_Price'], '2.3') }}
                  </td>
                </tr>

                <tr>
                  <td class="text-center weiter8020RowBema"> 8020 </td>
                  <td class="text-center">
                    <input type="hidden" class="weiter89RowName" 
                                      :value="caseBemaOpt[0]['8020_Name']">

                    <v-tooltip top color="success">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          v-bind="attrs"
                          v-on="on"
                          style="text-transform: none !important; height: 0px !important;"
                        >
                          {{ caseBemaOpt[0]['8020_Name']|truncate(25) }}
                        </v-btn>
                      </template>
                      <span> {{ caseBemaOpt[0]['8020_Name'] }} </span>
                    </v-tooltip>
                  </td>
                  <td class="text-center weiter8020RowQuan"> 1 </td>
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
                      v-on:change="displayFak('weiter8020Slider', caseBemaOpt[0]['8020_Price'], 'weiter8020', 1)"
                      :id="'weiter8020Slider'"
                    >
                    </v-slider>
                  </td>
                  <td class="clsGoaAmountNo weiter8020RowAmt" id="weiter8020Amount">
                    {{ gozAmount(caseBemaOpt[0]['8020_Price'], '2.3') }}
                  </td>
                </tr>

              </tbody>

            </template>
          </v-simple-table>


          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <v-checkbox
                v-model="chkBoxGQAbf"
                label="Abformung"
                value="Abformung"
                class="lblStrong"
                v-on:change="showGeneralOpt()"
                :disabled="chkBoxGQAbf_"
              ></v-checkbox>
            </v-col>
          </v-row>

          <div v-if="displayWeiterAbf">
            <v-radio-group
              v-model="optWeiterAbfFirst"
              row
              v-on:change="showGeneralOptRadio()"
            >
              <template v-slot:label>
                <!-- <h4> {{ bemaRegion }} </h4> -->
              </template>
              <v-radio
                label="Optisch"
                value="Optisch"
                name="optWeiterAbfFirst"
              ></v-radio>
              <v-radio
                label="Plastisch"
                value="Plastisch"
                name="optWeiterAbfFirst"
              ></v-radio>
            </v-radio-group>

            <!-- For Plastisch -->
            <v-radio-group
              v-model="optWeiterAbfSecond"
              row
              v-if="optWeiterAbfFirst == 'Plastisch'"
              v-on:change="showGeneralOptRadioPlas()"
            >
              <v-radio
                label="konfektionierter Abformlöffel"
                value="weiterOptAbfKon"
              ></v-radio>
              <v-radio
                label="individueller Abformlöffel"
                value="weiterOptAbfInd"
              ></v-radio>
            </v-radio-group>

            <div v-if="displayWeiterAbf98a">
              <v-simple-table outlined class="my-2">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">BEMA-Nr.</th>
                      <th class="text-left">Leistungsbeschreibung</th>
                      <th class="text-left">Anzahl</th>
                      <th class="text-left">Betrag (€)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center weiter98aRowBema"> 98a </td>
                      <td class="text-center">
                        <input type="hidden" class="weiter89RowName" 
                                      :value="caseBemaOpt[0]['98a_Name']">

                        <v-tooltip top color="success">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              text
                              v-bind="attrs"
                              v-on="on"
                              style="text-transform: none !important; height: 0px !important;"
                            >
                              {{ caseBemaOpt[0]['98a_Name']|truncate(25) }}
                            </v-btn>
                          </template>
                          <span> {{ caseBemaOpt[0]['98a_Name'] }} </span>
                        </v-tooltip>
                      </td>
                      <td class="text-center weiter98aRowQuan"> 1 </td>
                      <td class="clsBemaAmountNo weiter98aRowAmt" id="Weiter98a_bema">
                        {{ caseBemaOpt[0]['98a_Price'] }}
                      </td>
                    </tr>

                  </tbody>

                </template>
              </v-simple-table>
            </div>

            <div v-if="displayWeiterAbf65">
              <v-simple-table outlined class="my-2">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">GOZ-Nr.</th>
                      <th class="text-left">Leistungsbeschreibung</th>
                      <th class="text-left">Anzahl</th>
                      <th class="text-left">Faktor</th>
                      <th class="text-left">Betrag (€)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center weiter0065RowBema"> 0065 </td>
                      <td class="text-center">
                        <input type="hidden" class="weiter89RowName" 
                                      :value="caseBemaOpt[0]['0065_Name']">

                        <v-tooltip top color="success">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              text
                              v-bind="attrs"
                              v-on="on"
                              style="text-transform: none !important; height: 0px !important;"
                            >
                              {{ caseBemaOpt[0]['0065_Name']|truncate(25) }}
                            </v-btn>
                          </template>
                          <span> {{ caseBemaOpt[0]['0065_Name'] }} </span>
                        </v-tooltip>
                      </td>
                      <td class="text-center weiter0065RowQuan"> 4 </td>
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
                          v-on:change="displayFak('weiter0065Slider', caseBemaOpt[0]['0065_Price'], 'weiter0065', 1)"
                          :id="'weiter0065Slider'"
                        >
                        </v-slider>
                      </td>
                      <td class="clsGoaAmountNo weiter0065RowAmt" id="weiter0065Amount">
                        {{ gozAmount(caseBemaOpt[0]['0065_Price'], '2.3') }}
                      </td>
                    </tr>

                  </tbody>

                </template>
              </v-simple-table>
            </div>

          </div>

        </div>

        <div v-if="weiterActivate" class="d-flex col-2 pa-0 festzuschüsse-berechnen">
          <v-btn @click="weiterCallElab"
                id="btnWeiterElab" 
                elevation="0" 
                color="#BBDEFB"
                :disabled=false
          >
            Weiter
          </v-btn>
        </div>

        <div v-if="weiterActivateElab" style="border: 1px solid; padding: 10px; margin: 30px 0;">

          <h3>Eigenlabor</h3>
          <v-simple-table outlined class="my-2">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Material Group</th>
                  <th class="text-left">Material Description</th>
                  <th class="text-left">Anzahl</th>
                  <th class="text-left">Preis (€)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="Eigenlabor_Arr_7b_B.length > 0">
                  <td class="text-center"> {{ Eigenlabor_Gr_7b_B }} </td>
                  <td class="text-center">                  
                    <v-select
                      :items="Eigenlabor_Desc_7b_B"
                      v-model="Eigenlabor_Desc_7b_B[0]"
                      label="Produkt"
                      outlined
                      style="margin-top: 30px; width: 450px;"
                    ></v-select>                  
                  </td>
                  <td class="text-center"> 1</td>
                  <td class="text-center" id="eigen7b_amt"> {{ Eigenlabor_Amt_7b_B[0] }} </td>
                </tr>

                <tr v-if="Eigenlabor_Arr_18a_B.length > 0">
                  <td class="text-center"> {{ Eigenlabor_Gr_18a_B }} </td>
                  <td class="text-center">
                    <v-select
                      :items="Eigenlabor_Desc_18a_B"
                      v-model="Eigenlabor_Desc_18a_B_sel"
                      label="Produkt"
                      outlined
                      style="margin-top: 30px; width: 450px;"
                      v-on:change="eigenOpChange('18a')"
                    ></v-select>
                  </td>
                  <td class="text-center"> {{ Eigenlabor_Arr_18a_B.length }} </td>
                  <td class="text-center" id="eigen18a_amt"> {{ (parseFloat(Eigenlabor_Arr_18a_B.length) * parseFloat(Eigenlabor_Amt_18a_B[0])).toFixed(2) }} </td>
                </tr>
                <tr v-if="Eigenlabor_Arr_19_B.length > 0">
                  <td class="text-center"> {{ Eigenlabor_Gr_19_B }} </td>
                  <td class="text-center">
                    <v-select
                      :items="Eigenlabor_Desc_19_B"
                      v-model="Eigenlabor_Desc_19_B[0]"
                      label="Produkt"
                      outlined
                      style="margin-top: 30px; width: 450px;"
                    ></v-select>
                  </td>
                  <td class="text-center"> {{ Eigenlabor_Arr_19_B_Q }} </td>
                  <td class="text-center" id="eigen19b_amt"> {{ (parseFloat(Eigenlabor_Arr_19_B_Q) * parseFloat(Eigenlabor_Amt_19_B[0])).toFixed(2) }} </td>
                </tr>
                <tr v-if="Eigenlabor_Arr_2195_G.length > 0">
                  <td class="text-center"> {{ Eigenlabor_Gr_2195_G }} </td>
                  <td class="text-center">
                    <v-select
                      :items="Eigenlabor_Desc_2195_G"
                      v-model="Eigenlabor_Desc_2195_G_sel"
                      label="Produkt"
                      outlined
                      style="margin-top: 30px; width: 450px;"
                      v-on:change="eigenOpChange('2195')"
                    ></v-select>
                  </td>
                  <td class="text-center"> {{ Eigenlabor_Arr_2195_G.length }}</td>
                  <td class="text-center" id="eigen2195_amt"> {{ (parseFloat(Eigenlabor_Arr_2195_G.length) * parseFloat(Eigenlabor_Amt_2195_G[0])).toFixed(2) }} </td>
                </tr>

                <tr v-if="Eigenlabor_Arr_9010_G1.length > 0">
                  <td class="text-center"> {{ Eigenlabor_Gr_9010_G1 }} </td>
                  <td class="text-center">
                    <v-select
                      :items="Eigenlabor_Desc_9010_G1"
                      v-model="Eigenlabor_Desc_9010_G1[0]"
                      label="Produkt"
                      outlined
                      style="margin-top: 30px; width: 450px;"
                    ></v-select>
                  </td>
                  <td class="text-center"> {{ Eigenlabor_Arr_9010_G_Q }} </td>
                  <td class="text-center" id="eigen9010_1_amt"> {{ (parseFloat(Eigenlabor_Arr_9010_G_Q) * parseFloat(Eigenlabor_Amt_9010_G1[0])).toFixed(2) }} </td>
                </tr>
                <tr v-if="Eigenlabor_Arr_9010_G1.length > 0">
                  <td class="text-center"> {{ Eigenlabor_Gr_9010_G2 }} </td>
                  <td class="text-center">
                    <v-select
                      :items="Eigenlabor_Desc_9010_G2"
                      v-model="Eigenlabor_Desc_9010_G2[0]"
                      label="Produkt"
                      outlined
                      style="margin-top: 30px; width: 450px;"
                    ></v-select>
                  </td>
                  <td class="text-center"> 1</td>
                  <td class="text-center" id="eigen9010_2_amt"> {{ Eigenlabor_Amt_9010_G2[0] }} </td>
                </tr>
                <tr v-if="Eigenlabor_Arr_9010_G1.length > 0">
                  <td class="text-center"> {{ Eigenlabor_Gr_9010_G3 }} </td>
                  <td class="text-center">
                    <v-select
                      :items="Eigenlabor_Desc_9010_G3"
                      v-model="Eigenlabor_Desc_9010_G3[0]"
                      label="Produkt"
                      outlined
                      style="margin-top: 30px; width: 450px;"
                    ></v-select>
                  </td>
                  <td class="text-center"> {{ Eigenlabor_Arr_9010_G_Q }}</td>
                  <td class="text-center" id="eigen9010_3_amt"> {{ (parseFloat(Eigenlabor_Arr_9010_G_Q) * parseFloat(Eigenlabor_Amt_9010_G3[0])).toFixed(2) }} </td>
                </tr>

              </tbody>

            </template>
          </v-simple-table>

        </div>

        <div v-if="weiterActivateElab" class="d-flex col-2 pa-0 festzuschüsse-berechnen">
          <v-btn @click="weiterCallElabCalc"
                id="btnWeiterElabCalc" 
                elevation="0" 
                color="#BBDEFB"
                :disabled=false
          >
            Weiter
          </v-btn>
        </div>

        <div v-if="weiterActivateFlab" style="margin: 30px 0;">
          <div class="d-flex col-4 pa-0 festzuschüsse-berechnen">
            <v-text-field 
              clearable 
              label="Labor gewerblich"
              outlined
              prefix="€"
              id="txtLaborGewerblich"
              value="0.00"
              :readonly="txtLaborGewerblich"
              ></v-text-field>
          </div>

          <div class="d-flex col-2 pa-0 festzuschüsse-berechnen">
            <v-btn @click="weiterCallFlabCalc"
                id="btnWeiterFlabCalc" 
                elevation="0" 
                color="#BBDEFB"
                :disabled=false
            >
              Weiter
            </v-btn>
          </div>
        </div>

        <div v-if="weiterActivateFinal" style="margin: 30px 0;">
          <h3> Zusammenfassung </h3>
          <h4> Final </h4>
          <v-simple-table outlined class="my-2" style="margin-bottom: 20px;">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Subsidy</th>
                  <th class="text-left">Zahn/ Gebiet</th>
                  <th class="text-left">Anzahl</th>
                  <th class="text-left">Betrag (€)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(dataFinal, indexFinal) in tableDataFinal" :key="indexFinal">
                  <td> 
                    {{dataFinal['subsidy']}}
                  </td>
                  <td>
                    {{dataFinal['region']}} 
                  </td>
                  <td>
                    {{dataFinal['quantity']}} 
                  </td>
                  <td>
                    {{dataFinal['price']}} 
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>


          <h4> BEMA </h4>
          <v-simple-table v-if="totalBemaDispZusa" outlined class="my-2" style="margin-bottom: 20px;">
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
                <tr v-for="(datasRV, indexRV) in totalBemaDispZusa" :key="indexRV">
                  <td> {{datasRV['value']}}</td>
                  <td>
                    <v-tooltip top color="success">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          v-bind="attrs"
                          v-on="on"
                          style="text-transform: none !important; height: 0px !important;"
                        >
                          {{ datasRV['name']|truncate(25) }}
                        </v-btn>
                      </template>
                      <span> {{datasRV['name']}} </span>
                    </v-tooltip>
                  </td>
                  <td> {{datasRV['region']}} </td>
                  <td> {{datasRV['quantity']}} </td>
                  <td> {{datasRV['amount']}} </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <h4> GOZ </h4>
          <v-simple-table v-if="totalGavDispZusa" outlined class="my-2">
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
                <tr v-for="(datasRV, indexRV) in totalGavDispZusa" :key="indexRV">
                  <td> {{datasRV['value']}}</td>
                  <td>
                    <v-tooltip top color="success">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          v-bind="attrs"
                          v-on="on"
                          style="text-transform: none !important; height: 0px !important;"
                        >
                          {{ datasRV['name']|truncate(25) }}
                        </v-btn>
                      </template>
                      <span> {{datasRV['name']}} </span>
                    </v-tooltip>
                  </td>
                  <td> {{datasRV['region']}} </td>
                  <td> {{datasRV['quantity']}} </td>
                  <td> {{datasRV['factor']}} </td>
                  <td> {{datasRV['amount']}} </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

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
      tableDataFinal: [],
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
      idGozSliderArr: [],
      idGozSliderAmountArr: [],
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
      totalEigenlaborArr   : [],

      totalBemaDisp     : '0.00',
      totalAmountFDisp  : '0.00',
      totalGavDisp      : '0.00',
      totalSumCalcDisp  : '0.00',
      totalEigenlaborDisp : '0.00',
      totalGewerblichDisp : '0.00',

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

      caseBemaOpt: [{  //For GOZ price:  (punc * point value in cent)/100
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
                    '89_Name': 'Beseitigung grober Artikulations- und Okklusionsstörungen vor Eingliederung von Prothesen und Brücken',
                    '89_Price': '17.5',
                    '7b_Name': 'Vorbereitende Maßnahmen: Abformung, Bissnahme für das Erstellen von Modellen des Ober- und Unterkiefers zur diagnostischen Auswertung und Planung sowie schriftliche Niederlegung',
                    '7b_Price': '20.78',

                    '8010_Name': 'Registrieren der gelenkbezüglichen Zentrallage des Unterkiefers, auch Stützstiftregistrierung, je Registrat',
                    '8010_Price': '10.12',
                    '8020_Name': 'Arbiträre Scharnierachsenbestimmung (eingeschlossen sind die arbiträre Scharnierachsenbestimmung, das Anlegen eines Übertragungsbogens, Koordinieren eines Übertragungsbogens mit einem Artikulator)',
                    '8020_Price': '16.87',

                    '98a_Name': 'Abformung mit individuellem oder individualisiertem Löffel, je Kiefer',
                    '98a_Price': '31.71',
                    '0065_Name': 'Optisch-elektronische Abformung einschließlich vorbereitender Maßnahmen, einfache digitale Bissregistrierung und Archivierung, je Kieferhälfte oder Frontzahnbereich',
                    '0065_Price': '4.50',

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

      weiterActivate: false,
      displayWeiter89: false,
      displayWeiter7b: false,
      displayWeiter8010: false,
      displayWeiterAbf: false,
      displayWeiterAbf65: false,
      displayWeiterAbf98a: false,
      displayWeiter98a: false,
      displayWeiter0065: false,
      chkBoxGQ89: [],
      chkBoxGQ89_: false,
      chkBoxGQ7b: [],
      chkBoxGQ7b_: false,
      chkBoxGQ8010: [],
      chkBoxGQ8010_: false,
      chkBoxGQAbf: [],
      chkBoxGQAbf_: false,
      chkBoxGQ98a: [],
      chkBoxGQ0065: [],
      optWeiterAbfFirst: [],
      optWeiterAbfSecond: [],
      sliderWeiter0065: '',
      sliderWeiter8010: '',
      sliderWeiter8020: '',

      weiterActivateElab: false,
      Eigenlabor_Desc_7b_B:    ["Abformung (Alginat), Bissregistrat und Herstellung von Diagnostik-/Planungsmodellen des Ober- und Unterkiefers (BELII)"],
      Eigenlabor_Desc_18a_B:   ["Radix Anker Standard Edelstahl (Dentsply)",
                                "Radix Anker Titan (Dentsply)"],
      Eigenlabor_Desc_19_B:    ["Protemp 4 (3M)"],
      Eigenlabor_Desc_2195_G:  ["DT Light Post (VDW)",
                                "RelyX™ Fiber Post Stifte (3M)",
                                "EnaPost Glasfaser-Wurzelstift 2% (Medicom)"],
      Eigenlabor_Desc_9010_G1:  ["Straumann Bonelevel Tapered (Straumann)"],
      Eigenlabor_Desc_9010_G2:  ["PH-Seide 4/0 FS2 0,45m (Johnson & Johnson)"],
      Eigenlabor_Desc_9010_G3:  ["Sterile RC Verschlussschraube - Höhe 0.5 mm - Ti (Straumann)"],

      Eigenlabor_Gr_7b_B:     'Diagnostik-/Planungsmodelle',
      Eigenlabor_Gr_18a_B:    'Metallischer Stift- oder Schraubenaufbau',
      Eigenlabor_Gr_19_B:     'Provisorium',
      Eigenlabor_Gr_2195_G:   'Glasfaserstift',
      Eigenlabor_Gr_9010_G1:  'Implantat',
      Eigenlabor_Gr_9010_G2:  'Nahtmaterial',
      Eigenlabor_Gr_9010_G3:  'Verschlussschraube',

      Eigenlabor_Arr_7b_B:     [],
      Eigenlabor_Arr_18a_B:    [],
      Eigenlabor_Arr_19_B:     [],
      Eigenlabor_Arr_19_B_Q:   [],
      Eigenlabor_Arr_2195_G:   [],
      Eigenlabor_Arr_9010_G1:  [],
      Eigenlabor_Arr_9010_G_Q:  [],
      // Eigenlabor_Arr_9010_G2:  [],
      // Eigenlabor_Arr_9010_G3:  [],

      Eigenlabor_Amt_7b_B:     ['50.00'],
      Eigenlabor_Amt_18a_B:    ['10.00', '15.00'],
      Eigenlabor_Amt_19_B:     ['0.00'],
      Eigenlabor_Amt_2195_G:   ['30.00', '35.00', '40.00'],
      Eigenlabor_Amt_9010_G1:  ['223.00'],
      Eigenlabor_Amt_9010_G2:  ['10.00'],
      Eigenlabor_Amt_9010_G3:  ['10.00'],

      Eigenlabor_Desc_18a_B_sel: 'Radix Anker Standard Edelstahl (Dentsply)',
      Eigenlabor_Desc_2195_G_sel: 'DT Light Post (VDW)',

      weiterActivateFlab: false,
      weiterActivateFinal: false,
      txtLaborGewerblich: false,

      totalBemaDispZusa       : [],
      totalAmountFDispZusa    : [],
      totalGavDispZusa        : [],
      totalSumCalcDispZusa    : [],
      totalEigenlaborDispZusa : [],
      totalGewerblichDispZusa : [],
      totalGavSliderZusaArr   : [],



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
        this.tableDataFinal  = responseData['Final']
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
            this.Eigenlabor_Arr_19_B_Q = dataValues['RV Solution BEMA Quantity']['19'] // As 19 always has the original region values either than AAV
          }
        }

        if(label == 'lblGAV') {
          this.planLabel = label+ids
          this.RVShortcut = dataValues['RV Solution shortcuts'];
          if(dataValues['GAV Solution BEMA Region']['19']) {
            this.case_region_ = dataValues['GAV Solution BEMA Region']['19'] // As 19 always has the original region values either than AAV
            this.Eigenlabor_Arr_19_B_Q = dataValues['GAV Solution BEMA Quantity']['19'] // As 19 always has the original region values either than AAV
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

          this.Eigenlabor_Arr_9010_G1 = dataValues['AAV Solution GOZ Region']['9010']
          this.Eigenlabor_Arr_9010_G_Q = dataValues['AAV Solution GOZ Quantity']['9010']

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
        this.Eigenlabor_Arr_19_B = this.case_region_ //  For eigen calc
        

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

          // For opt GOZ RV
          if(this.optGozValuesGAV.length>0) {
            this.optGAVGozArr     = [0, 1]
            this.optGozGAVval     = ['2180', '2197']
            this.optGozNameGAV    = [this.caseBemaOpt[0]['2180_Name'], this.caseBemaOpt[0]['2197_Name']]
            this.optGozPriceGAV   = [this.caseBemaOpt[0]['2180_Price'], this.caseBemaOpt[0]['2197_Price']]
          
            // SET Auf Slider default
            for(var gv=0; gv<this.optGozValuesGAV.length; gv++) {
              var toCheck_2180 = '2180'+this.optGozValuesGAV[gv]+'RV'
              var toCheck_2197 = '2197'+this.optGozValuesGAV[gv]+'RV'

              if(this.idGozSliderArr[toCheck_2180] == undefined
              ) {
                this.idGozSliderArr[toCheck_2180] = '1';
              }

              if(this.idGozSliderArr[toCheck_2197] == undefined
              ) {
                this.idGozSliderArr[toCheck_2197] = '1';
              }
            }

          }

          if(this.optGozValuesGAV_.length>0) {
            this.optGAVGozArr_     = [0]
            this.optGozGAVval_     = ['2197']
            this.optGozNameGAV_    = [this.caseBemaOpt[0]['2197_Name']]
            this.optGozPriceGAV_   = [this.caseBemaOpt[0]['2197_Price']]
          }

          // SET Adh Slider default
          for(var gv=0; gv<this.optGozValuesGAV_.length; gv++) {
            var toCheck_2197 = '2197'+this.optGozValuesGAV_[gv]+'RV_'

            if(this.idGozSliderArr[toCheck_2197] == undefined
            ) {
              this.idGozSliderArr[toCheck_2197] = '1';
            }
          }

        }

        if(label == 'lblGAV') {
          // // FOR GOZ SLIDER issue
          for(var gr=0; gr<Object.values(dataValues['GAV Solution GOZ Region']).length; gr++) {
            var toCheck = (dataValues['GAV#']+Object.values(dataValues['GAV Solution GOZ Region'])[gr]+caseId+'GAV')

            if(this.idGozSliderArr[toCheck] == undefined
            ) {
              this.idGozSliderArr[toCheck] = '1';
            }
          }

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

            // SET Auf Slider default
            for(var gv=0; gv<this.optGozValuesGAV.length; gv++) {
              var toCheck_2180 = '2180'+this.optGozValuesGAV[gv]+'GAV'
              var toCheck_2197 = '2197'+this.optGozValuesGAV[gv]+'GAV'

              if(this.idGozSliderArr[toCheck_2180] == undefined
              ) {
                this.idGozSliderArr[toCheck_2180] = '1';
              }

              if(this.idGozSliderArr[toCheck_2197] == undefined
              ) {
                this.idGozSliderArr[toCheck_2197] = '1';
              }
            }
          }

          if(this.optGozValuesGAV_.length>0) {
            this.optGAVGozArr_     = [0]
            this.optGozGAVval_     = ['2197']
            this.optGozNameGAV_    = [this.caseBemaOpt[0]['2197_Name']]
            this.optGozPriceGAV_   = [this.caseBemaOpt[0]['2197_Price']]


            // SET Adh Slider default
            for(var gv=0; gv<this.optGozValuesGAV_.length; gv++) {
              var toCheck_2197 = '2197'+this.optGozValuesGAV_[gv]+'GAV_'

              if(this.idGozSliderArr[toCheck_2197] == undefined
              ) {
                this.idGozSliderArr[toCheck_2197] = '1';
              }
            }
          }

        }

        if(label == 'lblAAV') {
          // // FOR GOZ SLIDER issue
          for(var gr=0; gr<Object.values(dataValues['AAV Solution GOZ Region']).length; gr++) {
            var toCheck = (dataValues['AAV#']+Object.keys(dataValues['AAV Solution GOZ Region'])[gr]+caseId+'AAV')
            // console.log(toCheck)

            if(this.idGozSliderArr[toCheck] == undefined
            ) {
              this.idGozSliderArr[toCheck] = '1';
            }

            // REcalculate the Amount based on slider values
            var newGozAmountAAV = Object.values(dataValues['AAV Solution GOZ amount'])[gr]
            var AmountAAVCalc = this.gozAmount(newGozAmountAAV, this.ticksLabels[this.idGozSliderArr[toCheck]] )

            this.idGozSliderAmountArr[toCheck] = AmountAAVCalc;

          }

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

            // SET Auf Slider default
            for(var gv=0; gv<this.optGozValuesGAV.length; gv++) {
              var toCheck_0080 = '0080'+this.optGozValuesGAV[gv]+'AAV'
              var toCheck_0090 = '0090'+this.optGozValuesGAV[gv]+'AAV'
              var toCheck_9040 = '9040'+this.optGozValuesGAV[gv]+'AAV'

              if(this.idGozSliderArr[toCheck_0080] == undefined
              ) {
                this.idGozSliderArr[toCheck_0080] = '1';
              }

              if(this.idGozSliderArr[toCheck_0090] == undefined
              ) {
                this.idGozSliderArr[toCheck_0090] = '1';
              }

              if(this.idGozSliderArr[toCheck_9040] == undefined
              ) {
                this.idGozSliderArr[toCheck_9040] = '1';
              }
            }
          }

          if(this.optGozValuesGAV_.length>0) {
            this.optGAVGozArr_     = [0]
            this.optGozGAVval_     = ['2197']
            this.optGozNameGAV_    = [this.caseBemaOpt[0]['2197_Name']]
            this.optGozPriceGAV_   = [this.caseBemaOpt[0]['2197_Price']]

            // SET Adh Slider default
            for(var gv=0; gv<this.optGozValuesGAV_.length; gv++) {
              var toCheck_2197 = '2197'+this.optGozValuesGAV_[gv]+'AAV_'

              if(this.idGozSliderArr[toCheck_2197] == undefined
              ) {
                this.idGozSliderArr[toCheck_2197] = '1';
              }
            }
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
      displayFak(faktors, amountGoz, solutionT, dialogRow) {
        // console.log(document.getElementById('GAVSlider'+faktors).value)

        var newGozAmount = 0;

        if(solutionT == 'GAVGOZ') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('GAVSliderGoz'+faktors).value])
          document.getElementById('GAVGOZAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'GAVGOZAmount'+faktors
          this.idGozSliderArr[faktors] = document.getElementById('GAVSliderGoz'+faktors).value

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('GAVSliderGoz'+faktors).value]
        }

        if(solutionT == 'AAVGOZ') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('AAVGOZSlider'+faktors).value])
          document.getElementById('AAVGOZAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'AAVGOZAmount'+faktors
          this.idGozSliderArr[faktors] = document.getElementById('AAVGOZSlider'+faktors).value
          this.idGozSliderAmountArr[faktors] = newGozAmount

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('AAVGOZSlider'+faktors).value]
        }

        if(solutionT == 'RVstift') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('RVstiftSlider'+faktors).value])
          document.getElementById('RVstiftAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'RVstiftAmount'+faktors
          this.idGozSliderArr[faktors] = document.getElementById('RVstiftSlider'+faktors).value

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('RVstiftSlider'+faktors).value]
        }

        if(solutionT == 'RVAuf') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('RVAufSlider'+faktors).value])
          document.getElementById('RVAufAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'RVAufAmount'+faktors
          this.idGozSliderArr[faktors] = document.getElementById('RVAufSlider'+faktors).value
          
          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('RVAufSlider'+faktors).value]
        }

        if(solutionT == 'RVAdh') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('RVAdhSlider'+faktors).value])
          document.getElementById('RVAdhAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'RVAdhAmount'+faktors
          this.idGozSliderArr[faktors] = document.getElementById('RVAdhSlider'+faktors).value

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('RVAdhSlider'+faktors).value]
        }


        if(solutionT == 'GAVstift') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('GAVstiftSlider'+faktors).value])
          document.getElementById('GAVstiftAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'GAVstiftAmount'+faktors
          this.idGozSliderArr[faktors] = document.getElementById('GAVstiftSlider'+faktors).value

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('GAVstiftSlider'+faktors).value]
        }

        if(solutionT == 'GAVAuf') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('GAVAufSlider'+faktors).value])
          document.getElementById('GAVAufAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'GAVAufAmount'+faktors
          this.idGozSliderArr[faktors] = document.getElementById('GAVAufSlider'+faktors).value

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('GAVAufSlider'+faktors).value]
        }

        if(solutionT == 'GAVAdh') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('GAVAdhSlider'+faktors).value])
          document.getElementById('GAVAdhAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'GAVAdhAmount'+faktors
          this.idGozSliderArr[faktors] = document.getElementById('GAVAdhSlider'+faktors).value

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('GAVAdhSlider'+faktors).value]
        }


        if(solutionT == 'AAVstift') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('AAVstiftSlider'+faktors).value])
          document.getElementById('AAVstiftAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'AAVstiftAmount'+faktors
          this.idGozSliderArr[faktors] = document.getElementById('AAVstiftSlider'+faktors).value

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('AAVstiftSlider'+faktors).value]
        }

        if(solutionT == 'AAVAuf') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('AAVAufSlider'+faktors).value])
          document.getElementById('AAVAufAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'AAVAufAmount'+faktors
          this.idGozSliderArr[faktors] = document.getElementById('AAVAufSlider'+faktors).value

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('AAVAufSlider'+faktors).value]
        }

        if(solutionT == 'AAVAdh') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('AAVAdhSlider'+faktors).value])
          document.getElementById('AAVAdhAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'AAVAdhAmount'+faktors
          this.idGozSliderArr[faktors] = document.getElementById('AAVAdhSlider'+faktors).value

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('AAVAdhSlider'+faktors).value]
        }

        if(solutionT == 'oAAV') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('oAAVSlider'+faktors).value])
          document.getElementById('oAAVAmount'+faktors).innerHTML = newGozAmount
          this.idGozSlider = 'oAAVAmount'+faktors
        }


        if(solutionT == 'weiter8010') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('weiter8010Slider').value])
          document.getElementById('weiter8010Amount').innerHTML = newGozAmount
          this.idGozSlider = 'weiter8010Amount'
          this.idGozSliderArr[faktors] = document.getElementById('weiter8010Slider').value

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('weiter8010Slider').value]
        }

        if(solutionT == 'weiter8020') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('weiter8020Slider').value])
          document.getElementById('weiter8020Amount').innerHTML = newGozAmount
          this.idGozSlider = 'weiter8020Amount'
          this.idGozSliderArr[faktors] = document.getElementById('weiter8020Slider').value

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('weiter8020Slider').value]
        }

        if(solutionT == 'weiter0065') {
          newGozAmount = this.gozAmount(amountGoz, this.ticksLabels[document.getElementById('weiter0065Slider').value])
          document.getElementById('weiter0065Amount').innerHTML = newGozAmount
          this.idGozSlider = 'weiter0065Amount'
          this.idGozSliderArr[faktors] = document.getElementById('weiter0065Slider').value

          this.totalGavSliderZusaArr[faktors] = this.ticksLabels[document.getElementById('weiter0065Slider').value]
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

        this.checkWeiterBtn() // Reset Go to General questions

      },
      totalTableCalc() { // Final calc before display in the table
        var tempBemaArr     = 0.00
        var tempAmountFArr  = 0.00
        var tempGavArr      = 0.00
        var tempSumCalcArr  = 0.00
        var tempEigenArr    = 0.00

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

        for(var si=0; si<this.totalEigenlaborArr.length; si++) {
          if(this.totalEigenlaborArr[si]
          ) {
            tempEigenArr += parseFloat(this.totalEigenlaborArr[si])
          }
        }

        this.totalBemaDisp      = parseFloat(tempBemaArr).toFixed(2)
        this.totalAmountFDisp   = parseFloat(tempAmountFArr).toFixed(2)
        this.totalGavDisp       = parseFloat(tempGavArr).toFixed(2)
        this.totalEigenlaborDisp  = parseFloat(tempEigenArr).toFixed(2)
        this.totalSumCalcDisp   = parseFloat(tempSumCalcArr).toFixed(2)

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
            // console.log(value);
            // console.log(region);

            if(value &&
              this.OptGozGAVselected_RV[dialogRowIndex]
            ) {
              if(document.getElementById('RVAufAmount2180'+region+'RV') !== null
              ) {
                var elementOpt = document.getElementById('RVAufAmount2180'+region+'RV');
                elementOpt.classList.add("clsGozAmount");
                elementOpt.classList.remove("clsGoaAmountNo");
              }

              if(document.getElementById('RVAufAmount2197'+region+'RV') !== null
              ) {
                var elementOpt2 = document.getElementById('RVAufAmount2197'+region+'RV');
                elementOpt2.classList.add("clsGozAmount");
                elementOpt2.classList.remove("clsGoaAmountNo");
              }
            }
        });
        this.showOptGozGAVTable_GAV.filter((value, region) => {
            if(value &&
              this.OptGozGAVselected_GAV[dialogRowIndex]
            ) {
              if(document.getElementById('GAVAufAmount2180'+region+'GAV') !== null
              ) {
                var elementOpt = document.getElementById('GAVAufAmount2180'+region+'GAV');
                elementOpt.classList.add("clsGozAmount");
                elementOpt.classList.remove("clsGoaAmountNo");
              }

              if(document.getElementById('GAVAufAmount2197'+region+'GAV') !== null
              ) {
                var elementOpt2 = document.getElementById('GAVAufAmount2197'+region+'GAV');
                elementOpt2.classList.add("clsGozAmount");
                elementOpt2.classList.remove("clsGoaAmountNo");
              }
            }
        });
        this.showOptGozGAVTable_AAV.filter((value, region) => {
            if(value &&
              this.OptGozGAVselected_AAV[dialogRowIndex]
            ) {

              if(document.getElementById('AAVAufAmount0080'+region+'AAV') !== null
              ) {
                var elementOpt = document.getElementById('AAVAufAmount0080'+region+'AAV');
                elementOpt.classList.add("clsGozAmount");
                elementOpt.classList.remove("clsGoaAmountNo");
              }

              if(document.getElementById('AAVAufAmount0090'+region+'AAV') !== null
              ) {
                var elementOpt2 = document.getElementById('AAVAufAmount0090'+region+'AAV');
                elementOpt2.classList.add("clsGozAmount");
                elementOpt2.classList.remove("clsGoaAmountNo");
              }

              if(document.getElementById('AAVAufAmount9040'+region+'AAV') !== null
              ) {
                var elementOpt3 = document.getElementById('AAVAufAmount9040'+region+'AAV');
                elementOpt3.classList.add("clsGozAmount");
                elementOpt3.classList.remove("clsGoaAmountNo");
              }
            }
        });
        // "Aufbaufüllung" END

        // "Adhäsive"
        this.showOptGozGAV_Table_RV.filter((value, region) => {
            if(value &&
              this.OptGozGAVselected_RV_[dialogRowIndex]
            ) {
              if(document.getElementById('RVAdhAmount2197'+region+'RV_') !== null
              ) {
                var elementOpt = document.getElementById('RVAdhAmount2197'+region+'RV_');
                elementOpt.classList.add("clsGozAmount");
                elementOpt.classList.remove("clsGoaAmountNo");
              }
            }
        });
        this.showOptGozGAV_Table_GAV.filter((value, region) => {
            if(value &&
              this.OptGozGAVselected_GAV_[dialogRowIndex]
            ) {
              if(document.getElementById('GAVAdhAmount2197'+region+'GAV_') !== null
              ) {
                var elementOpt = document.getElementById('GAVAdhAmount2197'+region+'GAV_');
                elementOpt.classList.add("clsGozAmount");
                elementOpt.classList.remove("clsGoaAmountNo");
              }
            }
        });
        this.showOptGozGAV_Table_AAV.filter((value, region) => {
            if(value &&
              this.OptGozGAVselected_AAV_[dialogRowIndex]
            ) {
              if(document.getElementById('AAVAdhAmount2197'+region+'AAV_') !== null
              ) {
                var elementOpt = document.getElementById('AAVAdhAmount2197'+region+'AAV_');
                elementOpt.classList.add("clsGozAmount");
                elementOpt.classList.remove("clsGoaAmountNo");
              }
            }
        });
        // "Adhäsive" END

        //Stift
        // GOZ
        this.optGozRVShow.filter((value, region) => {
          var toCheck_2195R = '2195'+region+'RVstift'
          var toCheck_2197R = '2197'+region+'RVstift'

          var toCheck_2195G = '2195'+region+'GAVstift'
          var toCheck_2197G = '2197'+region+'GAVstift'

          var toCheck_2195A = '2195'+region+'AAVstift'
          var toCheck_2197A = '2197'+region+'AAVstift'

          if(value &&
            this.optGozRVShow[region]
          ) {
            if(document.getElementById('RVstiftAmount'+toCheck_2195R) !== null) {
              var elementOpt = document.getElementById('RVstiftAmount'+toCheck_2195R);
              elementOpt.classList.add("clsGozAmount");
              elementOpt.classList.remove("clsGoaAmountNo");
            }

            if(document.getElementById('RVstiftAmount'+toCheck_2197R) !== null
            ) {
              var elementOpt2 = document.getElementById('RVstiftAmount'+toCheck_2197R);
              elementOpt2.classList.add("clsGozAmount");
              elementOpt2.classList.remove("clsGoaAmountNo");
            }


            if(document.getElementById('GAVstiftAmount'+toCheck_2195G) !== null) {
              var elementOpt = document.getElementById('GAVstiftAmount'+toCheck_2195G);
              elementOpt.classList.add("clsGozAmount");
              elementOpt.classList.remove("clsGoaAmountNo");
            }

            if(document.getElementById('GAVstiftAmount'+toCheck_2197G) !== null
            ) {
              var elementOpt2 = document.getElementById('GAVstiftAmount'+toCheck_2197G);
              elementOpt2.classList.add("clsGozAmount");
              elementOpt2.classList.remove("clsGoaAmountNo");
            }



            if(document.getElementById('AAVstiftAmount'+toCheck_2195A) !== null) {
              var elementOpt = document.getElementById('RVstiftAmount'+toCheck_2195R);
              elementOpt.classList.add("clsGozAmount");
              elementOpt.classList.remove("clsGoaAmountNo");
            }

            if(document.getElementById('AAVstiftAmount'+toCheck_2197A) !== null
            ) {
              var elementOpt2 = document.getElementById('AAVstiftAmount'+toCheck_2197A);
              elementOpt2.classList.add("clsGozAmount");
              elementOpt2.classList.remove("clsGoaAmountNo");
            }
          }
        });

        // BEMA
        this.optBemaRVShow.filter((value, region) => {          

          var toCheck_18aR = '18a'+region+'RV'
          var toCheck_18bR = '18b'+region+'RV'

          var toCheck_18aG = '18a'+region+'GAV'
          var toCheck_18bG = '18b'+region+'GAV'

          var toCheck_18aA = '18a'+region+'AAV'
          var toCheck_18bA = '18b'+region+'AAV'

          if(value &&
            this.optBemaRVShow[region]
          ) {
            if(document.getElementById('RVstiftAmountB'+toCheck_18aR) !== null) {
              var elementOpt = document.getElementById('RVstiftAmountB'+toCheck_18aR);
              elementOpt.classList.add("clsBemaAmount");
              elementOpt.classList.remove("clsBemaAmountNo");
            }

            if(document.getElementById('RVstiftAmountB'+toCheck_18bR) !== null
            ) {
              var elementOpt2 = document.getElementById('RVstiftAmountB'+toCheck_18bR);
              elementOpt2.classList.add("clsBemaAmount");
              elementOpt2.classList.remove("clsBemaAmountNo");
            }


            if(document.getElementById('GAVstiftAmountB'+toCheck_18aG) !== null) {
              var elementOpt = document.getElementById('GAVstiftAmountB'+toCheck_18aG);
              elementOpt.classList.add("clsBemaAmount");
              elementOpt.classList.remove("clsBemaAmountNo");
            }

            if(document.getElementById('GAVstiftAmountB'+toCheck_18bG) !== null
            ) {
              var elementOpt2 = document.getElementById('GAVstiftAmountB'+toCheck_18bG);
              elementOpt2.classList.add("clsBemaAmount");
              elementOpt2.classList.remove("clsBemaAmountNo");
            }



            if(document.getElementById('AAVstiftAmountB'+toCheck_18aA) !== null) {
              var elementOpt = document.getElementById('RVstiftAmountB'+toCheck_18aA);
              elementOpt.classList.add("clsBemaAmount");
              elementOpt.classList.remove("clsBemaAmountNo");
            }

            if(document.getElementById('AAVstiftAmountB'+toCheck_18bA) !== null
            ) {
              var elementOpt2 = document.getElementById('AAVstiftAmountB'+toCheck_18bA);
              elementOpt2.classList.add("clsBemaAmount");
              elementOpt2.classList.remove("clsBemaAmountNo");
            }
          }

        });
        //Stift END

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
        // RESET SLIDER GOZ AMOUNT END

        // FINAL TABLE ZUS...

        // RV BEMA
        var bemaRVsRowBema    = document.getElementsByClassName('bemaRVsRowBema')
        var bemaRVsRowName    = document.getElementsByClassName('bemaRVsRowName')
        var bemaRVsRowRegion  = document.getElementsByClassName('bemaRVsRowRegion')
        var bemaRVsRowQuan    = document.getElementsByClassName('bemaRVsRowQuan')
        var bemaRVsRowAmt     = document.getElementsByClassName('bemaRVsRowAmt')

        for(var bemaI=0; bemaI<bemaRVsRowBema.length; bemaI++) {
          this.totalBemaDispZusa.push({
            "value" : bemaRVsRowBema[bemaI].innerHTML.trim(),
            "name" : bemaRVsRowName[bemaI].value.trim(),
            "region" : bemaRVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : bemaRVsRowQuan[bemaI].innerHTML.trim(),
            "amount" : parseFloat(bemaRVsRowAmt[bemaI].innerHTML.trim())
          })
        }

        // RV Aufbaufüllung
        var optGozRVsRowBema    = document.getElementsByClassName('optGozRVsRowBema')
        var optGozRVsRowName    = document.getElementsByClassName('optGozRVsRowName')
        var optGozRVsRowRegion  = document.getElementsByClassName('optGozRVsRowRegion')
        var optGozRVsRowQuan    = document.getElementsByClassName('optGozRVsRowQuan')
        var optGozRVsRowFactor  = document.getElementsByClassName('optGozRVsRowFactor')
        var optGozRVsRowAmt     = document.getElementsByClassName('optGozRVsRowAmt')

        console.log('optGozRVsRowFactor')
        console.log(this.totalGavSliderZusaArr)

        for(var bemaI=0; bemaI<optGozRVsRowBema.length; bemaI++) {
          var fakVal = '2.3'
          if(this.totalGavSliderZusaArr[optGozRVsRowFactor[bemaI].value] !== undefined
          ) {
            fakVal = this.totalGavSliderZusaArr[optGozRVsRowFactor[bemaI].value]
          }

          this.totalGavDispZusa.push({
            "value" : optGozRVsRowBema[bemaI].innerHTML.trim(),
            "name" : optGozRVsRowName[bemaI].value.trim(),
            "region" : optGozRVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : optGozRVsRowQuan[bemaI].innerHTML.trim(),
            "factor" : fakVal,
            "amount" : parseFloat(optGozRVsRowAmt[bemaI].innerHTML.trim())
          })
        }

        // RV Adhäsive
        var optGozRVsRowBema_    = document.getElementsByClassName('optGozRVsRowBema_')
        var optGozRVsRowName_    = document.getElementsByClassName('optGozRVsRowName_')
        var optGozRVsRowRegion_  = document.getElementsByClassName('optGozRVsRowRegion_')
        var optGozRVsRowQuan_    = document.getElementsByClassName('optGozRVsRowQuan_')
        var optGozRVsRowFactor_  = document.getElementsByClassName('optGozRVsRowFactor_')
        var optGozRVsRowAmt_     = document.getElementsByClassName('optGozRVsRowAmt_')

        for(var bemaI=0; bemaI<optGozRVsRowBema_.length; bemaI++) {
          var fakVal = '2.3'
          if(this.totalGavSliderZusaArr[optGozRVsRowFactor_[bemaI].value] !== undefined
          ) {
            fakVal = this.totalGavSliderZusaArr[optGozRVsRowFactor_[bemaI].value]
          }

          this.totalGavDispZusa.push({
            "value" : optGozRVsRowBema_[bemaI].innerHTML.trim(),
            "name" : optGozRVsRowName_[bemaI].value.trim(),
            "region" : optGozRVsRowRegion_[bemaI].innerHTML.trim(),
            "quantity" : optGozRVsRowQuan_[bemaI].innerHTML.trim(),
            "factor" : fakVal,
            "amount" : parseFloat(optGozRVsRowAmt_[bemaI].innerHTML.trim())
          })
        }

        // RV stift BEMA
        var stiftRVsRowBema    = document.getElementsByClassName('stiftRVsRowBema')
        var stiftRVsRowName    = document.getElementsByClassName('stiftRVsRowName')
        var stiftRVsRowRegion  = document.getElementsByClassName('stiftRVsRowRegion')
        var stiftRVsRowQuan    = document.getElementsByClassName('stiftRVsRowQuan')
        var stiftRVsRowAmt     = document.getElementsByClassName('stiftRVsRowAmt')

        for(var bemaI=0; bemaI<stiftRVsRowBema.length; bemaI++) {
          this.totalBemaDispZusa.push({
            "value" : stiftRVsRowBema[bemaI].innerHTML.trim(),
            "name" : stiftRVsRowName[bemaI].value.trim(),
            "region" : stiftRVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : stiftRVsRowQuan[bemaI].innerHTML.trim(),
            "amount" : parseFloat(stiftRVsRowAmt[bemaI].innerHTML.trim())
          })
        }

        // RV stift GOZ
        var stiftGozRVsRowBema    = document.getElementsByClassName('stiftGozRVsRowBema')
        var stiftGozRVsRowName    = document.getElementsByClassName('stiftGozRVsRowName')
        var stiftGozRVsRowRegion  = document.getElementsByClassName('stiftGozRVsRowRegion')
        var stiftGozRVsRowQuan    = document.getElementsByClassName('stiftGozRVsRowQuan')
        var stiftGozRVsRowFactor  = document.getElementsByClassName('stiftGozRVsRowFactor')
        var stiftGozRVsRowAmt     = document.getElementsByClassName('stiftGozRVsRowAmt')

        for(var bemaI=0; bemaI<stiftGozRVsRowBema.length; bemaI++) {
          var fakVal = '2.3'
          if(this.totalGavSliderZusaArr[stiftGozRVsRowFactor[bemaI].value] !== undefined
          ) {
            fakVal = this.totalGavSliderZusaArr[stiftGozRVsRowFactor[bemaI].value]
          }

          this.totalGavDispZusa.push({
            "value" : stiftGozRVsRowBema[bemaI].innerHTML.trim(),
            "name" : stiftGozRVsRowName[bemaI].value.trim(),
            "region" : stiftGozRVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : stiftGozRVsRowQuan[bemaI].innerHTML.trim(),
            "factor" : fakVal,
            "amount" : parseFloat(stiftGozRVsRowAmt[bemaI].innerHTML.trim())
          })
        }


        // GAV BEMA
        var bemaGAVsRowBema    = document.getElementsByClassName('bemaGAVsRowBema')
        var bemaGAVsRowName    = document.getElementsByClassName('bemaGAVsRowName')
        var bemaGAVsRowRegion  = document.getElementsByClassName('bemaGAVsRowRegion')
        var bemaGAVsRowQuan    = document.getElementsByClassName('bemaGAVsRowQuan')
        var bemaGAVsRowAmt     = document.getElementsByClassName('bemaGAVsRowAmt')

        for(var bemaI=0; bemaI<bemaGAVsRowBema.length; bemaI++) {
          this.totalBemaDispZusa.push({
            "value" : bemaGAVsRowBema[bemaI].innerHTML.trim(),
            "name" : bemaGAVsRowName[bemaI].value.trim(),
            "region" : bemaGAVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : bemaGAVsRowQuan[bemaI].innerHTML.trim(),
            "amount" : parseFloat(bemaGAVsRowAmt[bemaI].innerHTML.trim())
          })
        }

        // GAV GOZ
        var gozGAVsRowBema    = document.getElementsByClassName('gozGAVsRowBema')
        var gozGAVsRowName    = document.getElementsByClassName('gozGAVsRowName')
        var gozGAVsRowRegion  = document.getElementsByClassName('gozGAVsRowRegion')
        var gozGAVsRowQuan    = document.getElementsByClassName('gozGAVsRowQuan')
        var gozGAVsRowFactor  = document.getElementsByClassName('gozGAVsRowFactor')
        var gozGAVsRowAmt     = document.getElementsByClassName('gozGAVsRowAmt')

        for(var bemaI=0; bemaI<gozGAVsRowBema.length; bemaI++) {
          var fakVal = '2.3'
          if(this.totalGavSliderZusaArr[gozGAVsRowFactor[bemaI].value] !== undefined
          ) {
            fakVal = this.totalGavSliderZusaArr[gozGAVsRowFactor[bemaI].value]
          }

          this.totalGavDispZusa.push({
            "value" : gozGAVsRowBema[bemaI].innerHTML.trim(),
            "name" : gozGAVsRowName[bemaI].value.trim(),
            "region" : gozGAVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : gozGAVsRowQuan[bemaI].innerHTML.trim(),
            "factor" : fakVal,
            "amount" : parseFloat(gozGAVsRowAmt[bemaI].innerHTML.trim())
          })
        }

        // GAV Aufbaufüllung
        var optGozGAVsRowBema    = document.getElementsByClassName('optGozGAVsRowBema')
        var optGozGAVsRowName    = document.getElementsByClassName('optGozGAVsRowName')
        var optGozGAVsRowRegion  = document.getElementsByClassName('optGozGAVsRowRegion')
        var optGozGAVsRowQuan    = document.getElementsByClassName('optGozGAVsRowQuan')
        var optGozGAVsRowFactor  = document.getElementsByClassName('optGozGAVsRowFactor')
        var optGozGAVsRowAmt     = document.getElementsByClassName('optGozGAVsRowAmt')

        
        for(var bemaI=0; bemaI<optGozGAVsRowBema.length; bemaI++) {
          var fakVal = '2.3'
          if(this.totalGavSliderZusaArr[optGozGAVsRowFactor[bemaI].value] !== undefined
          ) {
            fakVal = this.totalGavSliderZusaArr[optGozGAVsRowFactor[bemaI].value]
          }

          this.totalGavDispZusa.push({
            "value" : optGozGAVsRowBema[bemaI].innerHTML.trim(),
            "name" : optGozGAVsRowName[bemaI].value.trim(),
            "region" : optGozGAVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : optGozGAVsRowQuan[bemaI].innerHTML.trim(),
            "factor" : fakVal,
            "amount" : parseFloat(optGozGAVsRowAmt[bemaI].innerHTML.trim())
          })
        }

        // GAV Adhäsive
        var optGozGAVsRowBema_    = document.getElementsByClassName('optGozGAVsRowBema_')
        var optGozGAVsRowName_    = document.getElementsByClassName('optGozGAVsRowName_')
        var optGozGAVsRowRegion_  = document.getElementsByClassName('optGozGAVsRowRegion_')
        var optGozGAVsRowQuan_    = document.getElementsByClassName('optGozGAVsRowQuan_')
        var optGozGAVsRowFactor_  = document.getElementsByClassName('optGozGAVsRowFactor_')
        var optGozGAVsRowAmt_     = document.getElementsByClassName('optGozGAVsRowAmt_')

        console.log(optGozGAVsRowBema_)
        console.log(optGozGAVsRowName_)
        console.log(optGozGAVsRowRegion_)
        console.log(optGozGAVsRowQuan_)
        console.log(optGozGAVsRowAmt_)

        for(var bemaI=0; bemaI<optGozGAVsRowBema_.length; bemaI++) {
          var fakVal = '2.3'
          if(this.totalGavSliderZusaArr[optGozGAVsRowFactor_[bemaI].value] !== undefined
          ) {
            fakVal = this.totalGavSliderZusaArr[optGozGAVsRowFactor_[bemaI].value]
          }

          this.totalGavDispZusa.push({
            "value" : optGozGAVsRowBema_[bemaI].innerHTML.trim(),
            "name" : optGozGAVsRowName_[bemaI].value.trim(),
            "region" : optGozGAVsRowRegion_[bemaI].innerHTML.trim(),
            "quantity" : optGozGAVsRowQuan_[bemaI].innerHTML.trim(),
            "factor" : fakVal,
            "amount" : parseFloat(optGozGAVsRowAmt_[bemaI].innerHTML.trim())
          })
        }

        // GAV stift BEMA
        var stiftGAVsRowBema    = document.getElementsByClassName('stiftGAVsRowBema')
        var stiftGAVsRowName    = document.getElementsByClassName('stiftGAVsRowName')
        var stiftGAVsRowRegion  = document.getElementsByClassName('stiftGAVsRowRegion')
        var stiftGAVsRowQuan    = document.getElementsByClassName('stiftGAVsRowQuan')
        var stiftGAVsRowAmt     = document.getElementsByClassName('stiftGAVsRowAmt')

        for(var bemaI=0; bemaI<stiftGAVsRowBema.length; bemaI++) {
          this.totalBemaDispZusa.push({
            "value" : stiftGAVsRowBema[bemaI].innerHTML.trim(),
            "name" : stiftGAVsRowName[bemaI].value.trim(),
            "region" : stiftGAVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : stiftGAVsRowQuan[bemaI].innerHTML.trim(),
            "amount" : parseFloat(stiftGAVsRowAmt[bemaI].innerHTML.trim())
          })
        }

        // GAV stift GOZ
        var stiftGozGAVsRowBema    = document.getElementsByClassName('stiftGozGAVsRowBema')
        var stiftGozGAVsRowName    = document.getElementsByClassName('stiftGozGAVsRowName')
        var stiftGozGAVsRowRegion  = document.getElementsByClassName('stiftGozGAVsRowRegion')
        var stiftGozGAVsRowQuan    = document.getElementsByClassName('stiftGozGAVsRowQuan')
        var stiftGozGAVsRowFactor  = document.getElementsByClassName('stiftGozGAVsRowFactor')
        var stiftGozGAVsRowAmt     = document.getElementsByClassName('stiftGozGAVsRowAmt')

        for(var bemaI=0; bemaI<stiftGozGAVsRowBema.length; bemaI++) {
          var fakVal = '2.3'
          if(this.totalGavSliderZusaArr[stiftGozGAVsRowFactor[bemaI].value] !== undefined
          ) {
            fakVal = this.totalGavSliderZusaArr[stiftGozGAVsRowFactor[bemaI].value]
          }

          this.totalGavDispZusa.push({
            "value" : stiftGozGAVsRowBema[bemaI].innerHTML.trim(),
            "name" : stiftGozGAVsRowName[bemaI].value.trim(),
            "region" : stiftGozGAVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : stiftGozGAVsRowQuan[bemaI].innerHTML.trim(),
            "factor" : fakVal,
            "amount" : parseFloat(stiftGozGAVsRowAmt[bemaI].innerHTML.trim())
          })
        }


        // AAV BEMA
        var bemaAAVsRowBema    = document.getElementsByClassName('bemaAAVsRowBema')
        var bemaAAVsRowName    = document.getElementsByClassName('bemaAAVsRowName')
        var bemaAAVsRowRegion  = document.getElementsByClassName('bemaAAVsRowRegion')
        var bemaAAVsRowQuan    = document.getElementsByClassName('bemaAAVsRowQuan')
        var bemaAAVsRowAmt     = document.getElementsByClassName('bemaAAVsRowAmt')

        for(var bemaI=0; bemaI<bemaAAVsRowBema.length; bemaI++) {
          this.totalBemaDispZusa.push({
            "value" : bemaAAVsRowBema[bemaI].innerHTML.trim(),
            "name" : bemaAAVsRowName[bemaI].value.trim(),
            "region" : bemaAAVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : bemaAAVsRowQuan[bemaI].innerHTML.trim(),
            "amount" : parseFloat(bemaAAVsRowAmt[bemaI].innerHTML.trim())
          })
        }

        // AAV GOZ
        var gozAAVsRowBema    = document.getElementsByClassName('gozAAVsRowBema')
        var gozAAVsRowName    = document.getElementsByClassName('gozAAVsRowName')
        var gozAAVsRowRegion  = document.getElementsByClassName('gozAAVsRowRegion')
        var gozAAVsRowQuan    = document.getElementsByClassName('gozAAVsRowQuan')
        var gozAAVsRowFactor  = document.getElementsByClassName('gozAAVsRowFactor')
        var gozAAVsRowAmt     = document.getElementsByClassName('gozAAVsRowAmt')

        for(var bemaI=0; bemaI<gozAAVsRowBema.length; bemaI++) {
          var fakVal = '2.3'
          if(this.totalGavSliderZusaArr[gozAAVsRowFactor[bemaI].value] !== undefined
          ) {
            fakVal = this.totalGavSliderZusaArr[gozAAVsRowFactor[bemaI].value]
          }

          this.totalGavDispZusa.push({
            "value" : gozAAVsRowBema[bemaI].innerHTML.trim(),
            "name" : gozAAVsRowName[bemaI].value.trim(),
            "region" : gozAAVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : gozAAVsRowQuan[bemaI].innerHTML.trim(),
            "factor" : fakVal,
            "amount" : parseFloat(gozAAVsRowAmt[bemaI].innerHTML.trim())
          })
        }

        // AAV Aufbaufüllung
        var optGozAAVsRowBema    = document.getElementsByClassName('optGozAAVsRowBema')
        var optGozAAVsRowName    = document.getElementsByClassName('optGozAAVsRowName')
        var optGozAAVsRowRegion  = document.getElementsByClassName('optGozAAVsRowRegion')
        var optGozAAVsRowQuan    = document.getElementsByClassName('optGozAAVsRowQuan')
        var optGozAAVsRowFactor  = document.getElementsByClassName('optGozAAVsRowFactor')
        var optGozAAVsRowAmt     = document.getElementsByClassName('optGozAAVsRowAmt')

        for(var bemaI=0; bemaI<optGozAAVsRowBema.length; bemaI++) {
          var fakVal = '2.3'
          if(this.totalGavSliderZusaArr[optGozAAVsRowFactor[bemaI].value] !== undefined
          ) {
            fakVal = this.totalGavSliderZusaArr[optGozAAVsRowFactor[bemaI].value]
          }

          this.totalGavDispZusa.push({
            "value" : optGozAAVsRowBema[bemaI].innerHTML.trim(),
            "name" : optGozAAVsRowName[bemaI].value.trim(),
            "region" : optGozAAVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : optGozAAVsRowQuan[bemaI].innerHTML.trim(),
            "factor" : fakVal,
            "amount" : parseFloat(optGozAAVsRowAmt[bemaI].innerHTML.trim())
          })
        }

        // AAV Adhäsive
        var optGozAAVsRowBema_    = document.getElementsByClassName('optGozAAVsRowBema_')
        var optGozAAVsRowName_    = document.getElementsByClassName('optGozAAVsRowName_')
        var optGozAAVsRowRegion_  = document.getElementsByClassName('optGozAAVsRowRegion_')
        var optGozAAVsRowQuan_    = document.getElementsByClassName('optGozAAVsRowQuan_')
        var optGozAAVsRowFactor_  = document.getElementsByClassName('optGozAAVsRowFactor_')
        var optGozAAVsRowAmt_     = document.getElementsByClassName('optGozAAVsRowAmt_')

        for(var bemaI=0; bemaI<optGozAAVsRowBema_.length; bemaI++) {
          var fakVal = '2.3'
          if(this.totalGavSliderZusaArr[optGozAAVsRowFactor_[bemaI].value] !== undefined
          ) {
            fakVal = this.totalGavSliderZusaArr[optGozAAVsRowFactor_[bemaI].value]
          }

          this.totalGavDispZusa.push({
            "value" : optGozAAVsRowBema_[bemaI].innerHTML.trim(),
            "name" : optGozAAVsRowName_[bemaI].value.trim(),
            "region" : optGozAAVsRowRegion_[bemaI].innerHTML.trim(),
            "quantity" : optGozAAVsRowQuan_[bemaI].innerHTML.trim(),
            "factor" : fakVal,
            "amount" : parseFloat(optGozAAVsRowAmt_[bemaI].innerHTML.trim())
          })
        }

        // AAV stift BEMA
        var stiftAAVsRowBema    = document.getElementsByClassName('stiftAAVsRowBema')
        var stiftAAVsRowName    = document.getElementsByClassName('stiftAAVsRowName')
        var stiftAAVsRowRegion  = document.getElementsByClassName('stiftAAVsRowRegion')
        var stiftAAVsRowQuan    = document.getElementsByClassName('stiftAAVsRowQuan')
        var stiftAAVsRowAmt     = document.getElementsByClassName('stiftAAVsRowAmt')

        for(var bemaI=0; bemaI<stiftAAVsRowBema.length; bemaI++) {
          this.totalBemaDispZusa.push({
            "value" : stiftAAVsRowBema[bemaI].innerHTML.trim(),
            "name" : stiftAAVsRowName[bemaI].value.trim(),
            "region" : stiftAAVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : stiftAAVsRowQuan[bemaI].innerHTML.trim(),
            "amount" : parseFloat(stiftAAVsRowAmt[bemaI].innerHTML.trim())
          })
        }

        // AAV stift GOZ
        var stiftGozAAVsRowBema    = document.getElementsByClassName('stiftGozAAVsRowBema')
        var stiftGozAAVsRowName    = document.getElementsByClassName('stiftGozAAVsRowName')
        var stiftGozAAVsRowRegion  = document.getElementsByClassName('stiftGozAAVsRowRegion')
        var stiftGozAAVsRowQuan    = document.getElementsByClassName('stiftGozAAVsRowQuan')
        var stiftGozAAVsRowFactor  = document.getElementsByClassName('stiftGozAAVsRowFactor')
        var stiftGozAAVsRowAmt     = document.getElementsByClassName('stiftGozAAVsRowAmt')

        for(var bemaI=0; bemaI<stiftGozAAVsRowBema.length; bemaI++) {
          var fakVal = '2.3'
          if(this.totalGavSliderZusaArr[stiftGozAAVsRowFactor[bemaI].value] !== undefined
          ) {
            fakVal = this.totalGavSliderZusaArr[stiftGozAAVsRowFactor[bemaI].value]
          }

          this.totalGavDispZusa.push({
            "value" : stiftGozAAVsRowBema[bemaI].innerHTML.trim(),
            "name" : stiftGozAAVsRowName[bemaI].value.trim(),
            "region" : stiftGozAAVsRowRegion[bemaI].innerHTML.trim(),
            "quantity" : stiftGozAAVsRowQuan[bemaI].innerHTML.trim(),
            "factor" : fakVal,
            "amount" : parseFloat(stiftGozAAVsRowAmt[bemaI].innerHTML.trim())
          })
        }

        // GO TO GENERAL QUESTION
        this.checkWeiterBtn()
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
        //FOR stift slider
        var toCheck_2195R = '2195'+region+'RVstift'
        var toCheck_2197R = '2197'+region+'RVstift'

        var toCheck_2195G = '2195'+region+'GAVstift'
        var toCheck_2197G = '2197'+region+'GAVstift'

        var toCheck_2195A = '2195'+region+'AAVstift'
        var toCheck_2197A = '2197'+region+'AAVstift'


        if(this.optBemaRVJa2[region] == 'stift') {
          this.optBemaGozRV[region]     = '18a'
          this.optBemaNameRV[region]    = this.caseBemaOpt[0]['18a_Name']
          this.optBemaPriceRV[region]   = this.caseBemaOpt[0]['18a_Price']

          this.optBemaRVShow[region]    = true
          this.optGozRVShow[region]     = false

          this.Eigenlabor_Arr_18a_B.push(region);
          this.Eigenlabor_Arr_2195_G = this.Eigenlabor_Arr_2195_G.filter(e => e !== region)
        }
        else {
          this.optBemaGozArr[region]    = [0, 1]
          this.optBemaGozRV[region]     = ['2195', '2197']
          this.optBemaNameRV[region]    = [this.caseBemaOpt[0]['2195_Name'], this.caseBemaOpt[0]['2197_Name']]
          this.optBemaPriceRV[region]   = [this.caseBemaOpt[0]['2195_Price'], this.caseBemaOpt[0]['2197_Price']]

          this.optBemaRVShow[region]    = false
          this.optGozRVShow[region]     = true

          this.Eigenlabor_Arr_18a_B = this.Eigenlabor_Arr_18a_B.filter(e => e !== region)
          this.Eigenlabor_Arr_2195_G.push(region);

          //FOR stift slider RV
          if(this.idGozSliderArr[toCheck_2195R] == undefined
          ) {
            this.idGozSliderArr[toCheck_2195R] = '1';
          }
          if(this.idGozSliderArr[toCheck_2197R] == undefined
          ) {
            this.idGozSliderArr[toCheck_2197R] = '1';
          }

          //FOR stift slider GAV
          if(this.idGozSliderArr[toCheck_2195G] == undefined
          ) {
            this.idGozSliderArr[toCheck_2195G] = '1';
          }
          if(this.idGozSliderArr[toCheck_2197G] == undefined
          ) {
            this.idGozSliderArr[toCheck_2197G] = '1';
          }

          //FOR stift slider AAV
          if(this.idGozSliderArr[toCheck_2195A] == undefined
          ) {
            this.idGozSliderArr[toCheck_2195A] = '1';
          }
          if(this.idGozSliderArr[toCheck_2197A] == undefined
          ) {
            this.idGozSliderArr[toCheck_2197A] = '1';
          }
        }
      },
      checkWeiterBtn() {
        // GO TO GENERAL QUESTION
        if(Number(this.totalSumCalcDisp) > 0 ) {
          this.isPlannen = true
        }
        else {
          this.isPlannen = false
        }
      },
      weiterCall() {
        for(var tc=0; tc<this.Total_case; tc++) {
          if(document.getElementById('btnCasePencil'+tc) !== null) {
            document.getElementById('btnCasePencil'+tc).disabled = true
            document.getElementById('btnCasePencil'+tc).style = 'background-color: #5e5e5e'
          }

          if(document.getElementById('btnCasePencilSec'+tc) !== null) {
            document.getElementById('btnCasePencilSec'+tc).disabled = true
            document.getElementById('btnCasePencilSec'+tc).style = 'background-color: #5e5e5e'
          }

          if(document.getElementById('btnCaseTrash'+tc) !== null) {
            document.getElementById('btnCaseTrash'+tc).disabled = true
            document.getElementById('btnCaseTrash'+tc).style = 'background-color: #700'
          }
        }

        if(document.getElementById('btnWeiterAct') !== null) {
          document.getElementById('btnWeiterAct').disabled = true
          document.getElementById('btnWeiterAct').style = 'background-color: #eeeeee'
        }

        this.weiterActivate = true
      },
      showGeneralOpt_89() {
        if(this.chkBoxGQ89[0] == '89') {
          this.displayWeiter89 = true

          this.totalBemaArr.push(this.caseBemaOpt[0]['89_Price'])
          this.totalSumCalcArr.push(this.caseBemaOpt[0]['89_Price'])

          this.totalBemaDispZusa.push(
            {"value" : "BEMA 89", 
              "AMOUNT" : this.caseBemaOpt[0]['89_Price'], 
              "Desc" : 'General Questions',
              "Factor" : ''
            })

          this.totalTableCalc()
        }
        else {
          this.displayWeiter89 = false

          this.totalBemaArr.filter((value, index) => {
            if(value == this.caseBemaOpt[0]['89_Price']
            ) {
              this.totalBemaArr[index] = 0
            }
          });

          this.totalSumCalcArr.filter((value, index) => {
            if(value == this.caseBemaOpt[0]['89_Price']
            ) {
              this.totalSumCalcArr[index] = 0
            }
          });

          this.totalBemaDispZusa.filter((value, index) => {
            if(value.AMOUNT == this.caseBemaOpt[0]['89_Price']
            ) {
              this.totalBemaDispZusa[index] = 0
            }
          });

          this.totalTableCalc()
        }
      },
      showGeneralOpt_7b() {
        if(this.chkBoxGQ7b[0] == '7b') {
          this.displayWeiter7b = true

          this.totalBemaArr.push(this.caseBemaOpt[0]['7b_Price'])
          this.totalSumCalcArr.push(this.caseBemaOpt[0]['7b_Price'])
          this.Eigenlabor_Arr_7b_B.push('7b')

          this.totalBemaDispZusa.push(
            {"value" : "BEMA 7b", 
              "AMOUNT" : this.caseBemaOpt[0]['7b_Price'], 
              "Desc" : 'General Questions',
              "Factor" : ''
            })

          this.totalTableCalc()
        }
        else {
          this.displayWeiter7b = false

          // Remove 7b price
          this.totalBemaArr.filter((value, index) => {
            if(value == this.caseBemaOpt[0]['7b_Price']
            ) {
              this.totalBemaArr[index] = 0
            }
          });

          this.totalSumCalcArr.filter((value, index) => {
            if(value == this.caseBemaOpt[0]['7b_Price']
            ) {
              this.totalSumCalcArr[index] = 0
            }
          });

          this.totalBemaDispZusa.filter((value, index) => {
            if(value.AMOUNT == this.caseBemaOpt[0]['7b_Price']
            ) {
              this.totalBemaDispZusa[index] = 0
            }
          });

          this.Eigenlabor_Arr_7b_B = this.Eigenlabor_Arr_7b_B.filter(e => e !== '7b')

          // this.Eigenlabor_Arr_7b_B.filter((value, index) => {
          //   if(value == '7b'
          //   ) {
          //     this.Eigenlabor_Arr_7b_B[index] = null
          //   }
          // });

          this.totalTableCalc()
        }

      },
      showGeneralOpt_80() {
        var elementOptPrice_10 = this.gozAmount(this.caseBemaOpt[0]['8010_Price'], '2.3')
        var elementOptPrice_20 = this.gozAmount(this.caseBemaOpt[0]['8020_Price'], '2.3')

        if(this.chkBoxGQ8010[0] == '8010_20') {
          this.displayWeiter8010 = true

          {
            if(this.totalGavArr.indexOf(elementOptPrice_10) == -1)
            {
              this.totalGavArr.push(elementOptPrice_10)
              this.totalSumCalcArr.push(elementOptPrice_10)
            }

            if(this.totalGavArr.indexOf(elementOptPrice_20) == -1)
            {
              this.totalGavArr.push(elementOptPrice_20)
              this.totalSumCalcArr.push(elementOptPrice_20)
            }

            this.totalTableCalc()

          }
        }
        else {
          this.displayWeiter8010 = false

          {
            this.totalGavArr.filter((value, index) => {
              if(value == elementOptPrice_10
              ) {
                this.totalGavArr[index] = 0
                this.totalSumCalcArr[index] = 0
              }

              if(value == elementOptPrice_20
              ) {
                this.totalGavArr[index] = 0
                this.totalSumCalcArr[index] = 0
              }
            });

            this.totalTableCalc()
          }

        }
      },
      showGeneralOpt() {
        if(this.chkBoxGQAbf[0] == 'Abformung') {
          this.displayWeiterAbf = true
        }
        else {
          this.displayWeiterAbf = false

          //Remove the Plast.. bema values
          {
            this.totalBemaArr.filter((value, index) => {
              if(value == this.caseBemaOpt[0]['98a_Price']
              ) {
                this.totalBemaArr[index] = 0
                this.totalSumCalcArr[index] = 0
              }
            });

            this.totalBemaDispZusa.filter((value, index) => {
              if(value.AMOUNT == this.caseBemaOpt[0]['98a_Price']
              ) {
                this.totalBemaDispZusa[index] = 0
              }
            });

            this.totalTableCalc()
          }

          //Remove the Optisch GOZ values
          {
            var elementOptPrice = this.gozAmount(this.caseBemaOpt[0]['0065_Price'], '2.3')

            this.totalGavArr.filter((value, index) => {
              if(value == elementOptPrice
              ) {
                this.totalGavArr[index] = 0
                this.totalSumCalcArr[index] = 0
              }
            });

            this.totalTableCalc()
          }
        }

      },
      showGeneralOptRadio() {
        var elementOptPrice = this.gozAmount(this.caseBemaOpt[0]['0065_Price'], '2.3')
        this.sliderWeiter0065 = '2.3'

        if(this.optWeiterAbfFirst == 'Optisch') {
          this.displayWeiterAbf65 = true
          this.displayWeiterAbf98a = false

          //Remove the Plast.. bema values
          {
            this.totalBemaArr.filter((value, index) => {
              if(value == this.caseBemaOpt[0]['98a_Price']
              ) {
                this.totalBemaArr[index] = 0
                this.totalSumCalcArr[index] = 0
              }
            });

            this.totalBemaDispZusa.filter((value, index) => {
              if(value.AMOUNT == this.caseBemaOpt[0]['98a_Price']
              ) {
                this.totalBemaDispZusa[index] = 0
              }
            });

            this.totalTableCalc()
          }

          //calc 0065 GOZ
          {
            if(this.totalGavArr.indexOf(elementOptPrice) == -1)
            {
              this.totalGavArr.push(elementOptPrice)
              this.totalSumCalcArr.push(elementOptPrice)
              this.totalTableCalc()
            }
          }
        }
        else {
          this.displayWeiterAbf65 = false

          //Remove the Optisch GOZ values
          {
            this.totalGavArr.filter((value, index) => {
              if(value == elementOptPrice
              ) {
                this.totalGavArr[index] = 0
                this.totalSumCalcArr[index] = 0
              }
            });

            this.totalTableCalc()
          }
        }

      },
      showGeneralOptRadioPlas() {
        if(this.optWeiterAbfSecond == 'weiterOptAbfKon'
          || this.optWeiterAbfSecond == 'weiterOptAbfInd'
        ) {
          this.displayWeiterAbf98a = true
          this.displayWeiterAbf65 = false
        }
        else {
          this.displayWeiterAbf98a = false
        }

        if(this.displayWeiterAbf98a) {
          if(this.totalBemaArr.indexOf(this.caseBemaOpt[0]['98a_Price']) == -1)
          {
            this.totalBemaArr.push(this.caseBemaOpt[0]['98a_Price'])
            this.totalSumCalcArr.push(this.caseBemaOpt[0]['98a_Price'])

            this.totalBemaDispZusa.push(
            {"value" : "BEMA 98a", 
              "AMOUNT" : this.caseBemaOpt[0]['98a_Price'], 
              "Desc" : 'General Questions',
              "Factor" : ''
            })

            this.totalTableCalc()
          }
        }
        else {
          this.totalBemaArr.filter((value, index) => {
            if(value == this.caseBemaOpt[0]['98a_Price']
            ) {
              this.totalBemaArr[index] = 0
              this.totalSumCalcArr[index] = 0
            }
          });

          this.totalBemaDispZusa.filter((value, index) => {
            if(value.AMOUNT == this.caseBemaOpt[0]['98a_Price']
            ) {
              this.totalBemaDispZusa[index] = 0
            }
          });

          this.totalTableCalc()
        }
      },
      weiterCallElab() {
        this.weiterActivateElab = true

        // make the general question checkboxes disable 
        // and the pevious weiter btn
        this.chkBoxGQ89_    = true
        this.chkBoxGQ7b_    = true
        this.chkBoxGQ8010_  = true
        this.chkBoxGQAbf_   = true

        if(document.getElementById('btnWeiterElab') !== null) {
          document.getElementById('btnWeiterElab').disabled = true
          document.getElementById('btnWeiterElab').style = 'background-color: #eeeeee'
        }

      },
      eigenOpChange(eigenVal) {
        if(eigenVal == '18a') {
          var _18a_sel = '0'
          if(this.Eigenlabor_Desc_18a_B.indexOf(this.Eigenlabor_Desc_18a_B_sel) !== -1) {
            _18a_sel = this.Eigenlabor_Desc_18a_B.indexOf(this.Eigenlabor_Desc_18a_B_sel)
            document.getElementById('eigen18a_amt').innerHTML = (parseFloat(this.Eigenlabor_Arr_19_B_Q) * parseFloat(this.Eigenlabor_Amt_18a_B[_18a_sel])).toFixed(2)
          }
        }

        if(eigenVal == '2195') {
          var _2195_sel = '0'
          if(this.Eigenlabor_Desc_2195_G.indexOf(this.Eigenlabor_Desc_2195_G_sel) !== -1) {
            _2195_sel = this.Eigenlabor_Desc_2195_G.indexOf(this.Eigenlabor_Desc_2195_G_sel)
            document.getElementById('eigen2195_amt').innerHTML = (parseFloat(this.Eigenlabor_Arr_2195_G.length) * parseFloat(this.Eigenlabor_Amt_2195_G[_2195_sel])).toFixed(2)
          }
        }
      },
      weiterCallElabCalc() {

        var eigen7b_amt = ''
        var eigen18a_amt = ''
        var eigen19b_amt = ''
        var eigen2195_amt = ''
        var eigen9010_1_amt = ''
        var eigen9010_2_amt = ''
        var eigen9010_3_amt = ''

        if(this.Eigenlabor_Arr_7b_B.length > 0) {
          eigen7b_amt = document.getElementById('eigen7b_amt').innerHTML

          this.totalEigenlaborArr.push(eigen7b_amt)
          this.totalSumCalcArr.push(eigen7b_amt)
          this.totalEigenlaborDispZusa.push(
            {"value" : "BEMA 7b", 
              "AMOUNT" : eigen7b_amt, 
              "Desc" : this.Eigenlabor_Gr_7b_B
            })

          this.totalTableCalc()
        }
        if(this.Eigenlabor_Arr_7b_B.length == 0) {
          // Remove 7b price
          this.totalEigenlaborArr.filter((value, index) => {
            if(value == eigen7b_amt
            ) {
              this.totalEigenlaborArr[index] = 0
            }
          });

          this.totalSumCalcArr.filter((value, index) => {
            if(value == eigen7b_amt
            ) {
              this.totalSumCalcArr[index] = 0
            }
          });

          this.totalTableCalc()
        }

        if(this.Eigenlabor_Arr_18a_B.length > 0) {
          eigen18a_amt = document.getElementById('eigen18a_amt').innerHTML

          this.totalEigenlaborArr.push(eigen18a_amt)
          this.totalSumCalcArr.push(eigen18a_amt)
          this.totalEigenlaborDispZusa.push({
            "value" : "BEMA 18a", 
            "AMOUNT" : eigen18a_amt,
            "Desc" : this.Eigenlabor_Gr_18a_B
          })


          this.totalTableCalc()
        }
        if(this.Eigenlabor_Arr_18a_B.length == 0) {
          // Remove 18a price
          this.totalEigenlaborArr.filter((value, index) => {
            if(value == eigen18a_amt
            ) {
              this.totalEigenlaborArr[index] = 0
            }
          });

          this.totalSumCalcArr.filter((value, index) => {
            if(value == eigen18a_amt
            ) {
              this.totalSumCalcArr[index] = 0
            }
          });

          this.totalTableCalc()
        }

        if(this.Eigenlabor_Arr_19_B.length > 0) {
          eigen19b_amt = document.getElementById('eigen19b_amt').innerHTML

          this.totalEigenlaborArr.push(eigen19b_amt)
          this.totalSumCalcArr.push(eigen19b_amt)
          this.totalEigenlaborDispZusa.push({
            "value" : "BEMA 19b", 
            "AMOUNT" : eigen19b_amt,
            "Desc" : this.Eigenlabor_Gr_19_B
          })


          this.totalTableCalc()
        }
        if(this.Eigenlabor_Arr_19_B.length == 0) {
          // Remove 19b price
          this.totalEigenlaborArr.filter((value, index) => {
            if(value == eigen19b_amt
            ) {
              this.totalEigenlaborArr[index] = 0
            }
          });

          this.totalSumCalcArr.filter((value, index) => {
            if(value == eigen19b_amt
            ) {
              this.totalSumCalcArr[index] = 0
            }
          });

          this.totalTableCalc()
        }

        if(this.Eigenlabor_Arr_2195_G.length > 0) {
          eigen2195_amt = document.getElementById('eigen2195_amt').innerHTML

          this.totalEigenlaborArr.push(eigen2195_amt)
          this.totalSumCalcArr.push(eigen2195_amt)
          this.totalEigenlaborDispZusa.push({
            "value" : "GOZ 2195", 
            "AMOUNT" : eigen2195_amt,
            "Desc" : this.Eigenlabor_Gr_2195_G
          })


          this.totalTableCalc()
        }
        if(this.Eigenlabor_Arr_2195_G.length == 0) {
          // Remove 2195 price
          this.totalEigenlaborArr.filter((value, index) => {
            if(value == eigen2195_amt
            ) {
              this.totalEigenlaborArr[index] = 0
            }
          });

          this.totalSumCalcArr.filter((value, index) => {
            if(value == eigen2195_amt
            ) {
              this.totalSumCalcArr[index] = 0
            }
          });

          this.totalTableCalc()
        }

        if(this.Eigenlabor_Arr_9010_G1.length > 0) {
          eigen9010_1_amt = document.getElementById('eigen9010_1_amt').innerHTML
          eigen9010_2_amt = document.getElementById('eigen9010_2_amt').innerHTML
          eigen9010_3_amt = document.getElementById('eigen9010_3_amt').innerHTML

          this.totalEigenlaborArr.push(eigen9010_1_amt)
          this.totalSumCalcArr.push(eigen9010_1_amt)

          this.totalEigenlaborArr.push(eigen9010_2_amt)
          this.totalSumCalcArr.push(eigen9010_2_amt)

          this.totalEigenlaborArr.push(eigen9010_3_amt)
          this.totalSumCalcArr.push(eigen9010_3_amt)

          this.totalEigenlaborDispZusa.push({
            "value" : "GOZ 9010", 
            "AMOUNT" : parseFloat(eigen9010_1_amt) + parseFloat(eigen9010_2_amt) + parseFloat(eigen9010_3_amt),
            "Desc" : this.Eigenlabor_Gr_9010_G1 + ', ' + this.Eigenlabor_Gr_9010_G2 + ', ' + this.Eigenlabor_Gr_9010_G3,
          })

          this.totalTableCalc()
        }
        if(this.Eigenlabor_Arr_9010_G1.length == 0) {
          // Remove 9010 price
          this.totalEigenlaborArr.filter((value, index) => {
            if(value == eigen9010_1_amt
            ) {
              this.totalEigenlaborArr[index] = 0
            }
          });

          this.totalSumCalcArr.filter((value, index) => {
            if(value == eigen9010_1_amt
            ) {
              this.totalSumCalcArr[index] = 0
            }
          });

          this.totalEigenlaborArr.filter((value, index) => {
            if(value == eigen9010_2_amt
            ) {
              this.totalEigenlaborArr[index] = 0
            }
          });

          this.totalSumCalcArr.filter((value, index) => {
            if(value == eigen9010_2_amt
            ) {
              this.totalSumCalcArr[index] = 0
            }
          });

          this.totalEigenlaborArr.filter((value, index) => {
            if(value == eigen9010_3_amt
            ) {
              this.totalEigenlaborArr[index] = 0
            }
          });

          this.totalSumCalcArr.filter((value, index) => {
            if(value == eigen9010_3_amt
            ) {
              this.totalSumCalcArr[index] = 0
            }
          });

          this.totalTableCalc()
        }

        // Show Flab
        this.weiterActivateFlab = true
        if(document.getElementById('btnWeiterElabCalc') !== null) {
          document.getElementById('btnWeiterElabCalc').disabled = true
          document.getElementById('btnWeiterElabCalc').style = 'background-color: #eeeeee'
        }

      },
      weiterCallFlabCalc() {
        var gewerblichAmt = (parseFloat(document.getElementById('txtLaborGewerblich').value).toFixed(2))
        this.totalGewerblichDisp = gewerblichAmt

        this.totalSumCalcArr.push(gewerblichAmt)
        this.totalTableCalc()

        console.log(this.totalBemaDispZusa)
        console.log(this.totalGavDispZusa)

        this.weiterActivateFinal = true
        this.txtLaborGewerblich = true

        // BEMA Final Table refinement
        var totalBemaDispZusaArr = []
        var totalBemaDispZusaTemp = []
        this.totalBemaDispZusa.forEach((values) => {
          totalBemaDispZusaArr[values.value] = []
        })

        this.totalBemaDispZusa.forEach((values) => {
          totalBemaDispZusaArr[values.value]['value'] = values.value

          totalBemaDispZusaArr[values.value]['name'] = values.name

          totalBemaDispZusaArr[values.value]['region'] = ((typeof totalBemaDispZusaArr[values.value]['region'] !== 'undefined' && totalBemaDispZusaArr[values.value]['region'] != null) 
                // && (totalBemaDispZusaArr[values.value]['region'] !== values.region)
              ) 
                ? totalBemaDispZusaArr[values.value]['region'] +', '+ values.region : values.region
          
          totalBemaDispZusaArr[values.value]['quantity'] = ((typeof totalBemaDispZusaArr[values.value]['region'] !== 'undefined' && totalBemaDispZusaArr[values.value]['region'] != null) 
                && (totalBemaDispZusaArr[values.value]['region'] !== values.region)) 
                ? parseInt(totalBemaDispZusaArr[values.value]['quantity']) + parseInt(values.quantity) : parseInt(values.quantity)
          
          totalBemaDispZusaArr[values.value]['amount'] = ((typeof totalBemaDispZusaArr[values.value]['region'] !== 'undefined' && totalBemaDispZusaArr[values.value]['region'] != null) 
                && (totalBemaDispZusaArr[values.value]['region'] !== values.region)) 
                ? parseFloat(totalBemaDispZusaArr[values.value]['amount']) + parseFloat(values.amount) : parseFloat(values.amount)

          totalBemaDispZusaTemp.push(totalBemaDispZusaArr[values.value])
        })

        this.totalBemaDispZusa = [... new Set(totalBemaDispZusaTemp)]


        // GOZ Final Table refinement
        var totalGozDispZusaArr = []
        var totalGozDispZusaTemp = []
        this.totalGavDispZusa.forEach((values) => {
          totalGozDispZusaArr[values.value] = []
        })

        this.totalGavDispZusa.forEach((values) => {
          totalGozDispZusaArr[values.value]['value'] = values.value

          totalGozDispZusaArr[values.value]['name'] = values.name

          totalGozDispZusaArr[values.value]['region'] = ((typeof totalGozDispZusaArr[values.value]['region'] !== 'undefined' && totalGozDispZusaArr[values.value]['region'] != null) 
                // && (totalGozDispZusaArr[values.value]['region'] !== values.region)
              ) 
                ? totalGozDispZusaArr[values.value]['region'] +', '+ values.region : values.region
          
          totalGozDispZusaArr[values.value]['quantity'] = ((typeof totalGozDispZusaArr[values.value]['region'] !== 'undefined' && totalGozDispZusaArr[values.value]['region'] != null) 
                && (totalGozDispZusaArr[values.value]['region'] !== values.region)) 
                ? parseInt(totalGozDispZusaArr[values.value]['quantity']) + parseInt(values.quantity) : parseInt(values.quantity)

          totalGozDispZusaArr[values.value]['factor'] = ((typeof totalGozDispZusaArr[values.value]['region'] !== 'undefined' && totalGozDispZusaArr[values.value]['region'] != null) 
                && (totalGozDispZusaArr[values.value]['region'] !== values.region)) 
                ? totalGozDispZusaArr[values.value]['factor'] +', '+ values.factor : values.factor
          
          totalGozDispZusaArr[values.value]['amount'] = ((typeof totalGozDispZusaArr[values.value]['region'] !== 'undefined' && totalGozDispZusaArr[values.value]['region'] != null) 
                && (totalGozDispZusaArr[values.value]['region'] !== values.region)) 
                ? parseFloat(totalGozDispZusaArr[values.value]['amount']) + parseFloat(values.amount) : parseFloat(values.amount)

          totalGozDispZusaTemp.push(totalGozDispZusaArr[values.value])
        })

        this.totalGavDispZusa = [... new Set(totalGozDispZusaTemp)]

      },

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
.sticky { 
    position: sticky; 
    top: 0;
    z-index: 99;
    /* background-color: rgb(32, 165, 20);  */
    /* color: white;  */
    /* padding: 10px;  */
}


</style>
