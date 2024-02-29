console.log("ASSIGNMENT NAME");

// // WRITE YOUR CODE HERE
// //warmup1  filter function 
// let preArray = ["a", "be", "sea", "D", "eeeeeeeeee", "yodelaheehoo", "heeeeeeeee"];

// function longWordsOnly(arr){
//     function longList(String){
//         return String.length>8;
//     }
//     return arr.filter(longList);
// }

// console.log(longWordsOnly(["a", "be", "sea", "D", "eeeeeeeeee", "yodelaheehoo", "heeeeeeeee"]));
// // ["eeeeeeeeee", "yodelaheehoo", "heeeeeeeee"]

// //warmup2 map
// function shout(array){
//     function convert(String){
//         String.toUpperCase();
//     }
//     return array.map(convert);
// }
// console.log(shout(["a", "be", "sea", "D", "eeeeeeeeee", "yodelaheehoo", "heeeeeeeee"]));
// // "A", "BE", "SEA", "D", "EEEEEEEEEE", "YODELAHEEHOO", "HEEEEEEEEE"]

// //warmup3 chaining

// function yodel(array){
//     return array.filter;
//     (string => string.length>8)
//     .map(string => string.toUpperCase());
// }
// console.log(yodel(["a", "be", "sea", "D", "eeeeeeeeee", "yodelaheehoo", "heeeeeeeee"]));
// // "EEEEEEEEEE", "YODELAHEEHOO", "HEEEEEEEEE"]

function removeEmpty(array){
    function findUndefined(string){
        return string!==undefined;
    }
    return array.filter(findUndefined);
}
console.log(removeEmpty([12, undefined, 37, 53, undefined, 0]));// [12, 37, 53, 0]

