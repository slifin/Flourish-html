function Calc(){
	var that = {},
	getBetween = function(min,max){
		var num = Math.random()*max + min; 
		num *= (Math.random()*2) % 2 ? 1 : -1; 
		return num;
	};
	that.getBetween = getBetween;
	return that;
}