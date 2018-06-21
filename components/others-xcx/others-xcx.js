// components/others-xcx/others-xcx.js
const app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      othersXcx:{
          type:Array,
          value:''
      },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      toOthers(){
          console.log('我进小程序了项');
          app.bEnterXcx=true;
      },
      doNothing(e){

      }
  }
})
