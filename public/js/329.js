"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[329],{329:(t,e,s)=>{s.r(e),s.d(e,{default:()=>o});var n=s(1113);const r={props:{status:String},components:{ApplicationLogo:n.Z},data:function(){return{showPassword:!1,isLoading:!1,form:this.$inertia.form({email:null})}},methods:{submit:function(){this.form.post("/forgot-password")}}};const o=(0,s(1900).Z)(r,(function(){var t=this,e=t._self._c;return e("v-app",[e("v-main",[e("v-container",{attrs:{fluid:""}},[e("v-row",{staticStyle:{height:"100vh"},attrs:{align:"center",justify:"center"}},[e("v-col",{attrs:{cols:"12",sm:"12",md:"10",lg:"4"}},[e("v-card",[e("v-card-title",{staticClass:"d-flex align-center justify-center"},[e("Link",{attrs:{href:t.route("/")}},[e("application-logo",{staticStyle:{height:"75"}})],1)],1),t._v(" "),t.status?e("v-card-text",[e("v-alert",{attrs:{type:"success"}},[t._v(t._s(t.status))])],1):t._e(),t._v(" "),e("v-card-text",[e("p",{staticClass:"mb-2"},[t._v("You forgot your password? Here you can easily retrieve a new password.")])]),t._v(" "),e("v-card-text",[e("v-form",{on:{submit:function(e){return e.preventDefault(),t.submit.apply(null,arguments)}}},[e("v-text-field",{attrs:{"prepend-inner-icon":"mdi-email",label:"Email",type:"email",outlined:"",dense:"","error-messages":t.form.errors.email},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),t._v(" "),e("v-btn",{staticClass:"mt-3",attrs:{loading:t.form.processing,type:"submit",block:"",color:"primary"}},[t._v("Request New Password")])],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null).exports},1113:(t,e,s)=>{s.d(e,{Z:()=>n});const n=(0,s(1900).Z)({},undefined,undefined,!1,null,null,null).exports},1900:(t,e,s)=>{function n(t,e,s,n,r,o,i,a){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=s,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId="data-v-"+o),i?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},c._ssrRegister=l):r&&(l=a?function(){r.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:r),l)if(c.functional){c._injectStyles=l;var u=c.render;c.render=function(t,e){return l.call(e),u(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:c}}s.d(e,{Z:()=>n})}}]);