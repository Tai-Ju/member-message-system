// 載入模組 import "路徑"
//import "./lib.js";
//載入模組，取得模組的預設輸出
//import 變數名稱 from "模組路徑"
/*
import test from "./lib.js";
console.log(test.add(5,4));
console.log(test.multiply(4,5));
*/

//載入模組，取得模組非預設的輸出
//import {變數名稱,...} from "模組路徑"
import {multiply} from "./lib.js";
console.log(multiply(3,4));