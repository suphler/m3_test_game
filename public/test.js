arr = ["a", "b"];
var c = function() { console.log(this); }
arr.push( c );
c();  // ?