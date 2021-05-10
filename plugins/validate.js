import { extend, ValidationProvider, ValidationObserver } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'
import Vue from 'vue'

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule], // eslint-disable-line
    message: messages[rule],
  })
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
