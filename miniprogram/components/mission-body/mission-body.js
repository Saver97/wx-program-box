// components/mission-body/mission-body.js
Component({
  properties: {

  },
  data: {
     missions:[
         {bDis:false,title:'邀请好友获得收益',reward:'$100',introduceMsg:'好友通过你的链接进入福利和，完善个人资料后你讲获得100金币的收益，好友通过去赚钱做任务，可以增加你的收益'},
         {}
     ]
  },
  methods: {
     _toggle(e){
       //console.log();
       this.data.missions[e.target.dataset.index].bDis=!this.data.missions[e.target.dataset.index].bDis;
       let updateMission=this.data.missions;
       this.setData({
           missions:updateMission
       })
     }
  }
})
