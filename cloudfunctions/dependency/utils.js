const _enum = {
  view_ad_over_limit: 1,
  sql_query_error: 2,
  had_no_food: 3,
  no_sign_award: 4,
  config_error: 5,
}
class Map {
  constructor() {
    class map {
      constructor(key, value) {
        this.key = key;
        this.value = value;
      }
    }
    var put = function (key, value) {
      this.arr[this.arr.length] = new map(key, value);
    };
    var remove = function (key) {
      for (var i = 0; i < this.arr.length; i++) {
        var temp = this.arr.pop();
        if (this.arr[i].key === key) {

          return this.arr[i].value;
        }
        this.arr.push(temp);
      }
      return null;
    };
    var getKey = function (value) {
      for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i].value === value)
          return this.arr[i].key;
      }
      return null;
    };
    var getValue = function (key) {
      for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i].key === key)
          return this.arr[i].value;
      }
      return null;
    };
    var getSize = function () {
      return this.arr.length;
    };

    var show = function () {
      var string = "";
      for (var i = 0; i < this.arr.length; i++) {
        string += (this.arr[i].key + ":" + this.arr[i].value + "\n");
      }
      alert(string);
    };
    this.arr = new Array();
    this.remove = remove;
    this.put = put;
    this.show = show;
    this.getKey = getKey;
    this.getValue = getValue;
    this.getSize = getSize;
  }
}
function add_item(bag, item_list) {
  var flag = false
  for (add_item in item_list) {
    for (item in bag) {
      if (add_item.id == item.id) {
        flag = true
        item.number += add_item.number
      }
    }
    if (!flag) {
      flag = false
      bag.push(add_item)
    }
  }
}
const _item = {

}