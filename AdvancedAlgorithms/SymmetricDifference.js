function sym(args) {
	
	// console.log(args.indexOf(1));
	args = removeDublicated(args);

    for (var i = 1, length1 = arguments.length; i < length1; i++) {
    	var temp = removeDublicated(arguments[i]);
    	args = temp.reduce(function(total, next){
    		if(total.indexOf(next) === -1) {
    			return total.concat(next);
    		}else{
    			return total.filter(function(val){
    				if(val == next) {
    					return false;
    				}
    				return true;
    			});
    		}
    	}, args);
    }
    return args;
}

function removeDublicated(args) {
	args = args.reduce(function(total, next){
		if(total.indexOf(next) === -1){
			return total.concat(next);
		}
		return total;
	},[]);

	return args;
}
console.log(sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]));
/*
Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays.
Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the mathematical term "symmetric difference" of two sets is the set of elements which are in either of the two sets, but not in both (A △ B = C = {1, 4}). For every additional symmetric difference you take (say on a set D = {2, 3}), you should get the set with elements which are in either of the two the sets but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).
*/