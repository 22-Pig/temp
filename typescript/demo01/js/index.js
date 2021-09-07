"use strict";
// let str: string = "你好ts";
// let str1: string = "你好typescript";
// 布尔类型（boolean） true false
var flag = true;
flag = false;
// 数字类型（number）
var a = 123;
console.log(a);
// a = "string"; // 错误写法
// a = false; // 错误写法
a = 1.23;
console.log(a);
// 字符串类型（string）
var str = "this is ts";
console.log(str);
str = "hello ts";
console.log(str);
// 数组类型（array）ts中定义数组有两种方式
// es5 var arr = [1, "23", false];
// 1.第一种定义数组的方式
var arr1 = [1, 2, 3, 4, 5];
console.log(arr1);
var arr2 = ["java", "c", "javascript"];
console.log(arr2);
// 2.第二种定义数组的方式
// let arr: Array<number> = [11, 23, 34];
// console.log(arr);
var arr3 = ["python", "c", "java"];
console.log(arr3);
// 元组类型（tuple）属于数组的一种
var arr4 = ["ts", 3.14, true];
console.log(arr4);
// 枚举类型
var Flag;
(function (Flag) {
    Flag[Flag["success"] = 1] = "success";
    Flag[Flag["error"] = 0] = "error";
})(Flag || (Flag = {}));
var f = Flag.success;
console.log(f);
console.log(Flag.error);
// 默认没有赋值即是索引值
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 5] = "green";
    Color[Color["blue"] = 6] = "blue";
})(Color || (Color = {}));
var c = Color.blue;
console.log(c); // 输出：6
