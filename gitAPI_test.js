console.log( "This is a test. Hope all goes well!");

var sandBox = angular.module('sandbox', []);

sandBox.controller('sandBoxCntrl', ['$scope', '$http', function(scope, http){
    
    console.log("Loaded AngularJs");
    scope.userNotFount = false ; 
    scope.loaded       = false ;
       
    scope.myBool       = false ;
    scope.NOTmyBool    = !scope.myBool ;
    
    var reset = function() {
	scope.repos        = "" ;
	scope.reposFound   = "" ;
	scope.repoContent  = "" ;
	scope.repoSrc      = "" ;
    }
    
    reset();
    
    scope.toggle = function(){
	scope.myBool    = !scope.myBool ;
	scope.NOTmyBool = !scope.myBool ;
    };
    
    scope.test = function() {
	console.log("Button clicked.");
	http.get("https://api.github.com/users/" + scope.userName)
	    .success(function(data){
		scope.user   = data;
		reset();
		scope.loadContent();
		
	    }).error(function(){
		console.log("User " + scope.userName + " not found.");
	    });
    };

    scope.loadContent = function(){
	http.get("https://api.github.com/users/" + scope.userName + "/repos")
	    .success(function(data){
		scope.repos = data;
		scope.reposFound = data.length;
	    }).error(function(){
		console.log("Something went very wrong.");
	    });
    };

    scope.getRepo = function(repoName){
	console.log(repoName + " active.");
	console.log("https://api.github.com/users/" + scope.userName + "/" + repoName);
	http.get("https://api.github.com/repos/" + scope.userName + "/" + repoName +"/contents")
	    .success(function(data){
		scope.repoContent = data;
		scope.reposContentLength = data.length;
	    }).error(function(){
		console.log("Something went very wrong.");
	    });
    };

    scope.getFile = function( source ){
	console.log("Getting file: '" + source + "'");
	console.log( source );
	http.get(source)
	    .success(function(data){
		// ToDO: Add loading feature. 
		scope.repoSrc = atob(data.content);
		//scope.repoSrc = data.content.split("\n").map(atob).join("\n");
	    }).error(function(){
		console.log("Something went very wrong.");
	    });
    };
    
    
}]);


