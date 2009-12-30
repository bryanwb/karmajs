$(document).ready (function(){
	var k = Karma ({
        image: [{name:"football", file:"football.png"}] 
    });
	k.ready(function() {
        var ELEVEN=["30","40","50","60","70","80"]; //coordinates of each answer
        var TWELVE=["32","33","34","35","36","37"];
        var THIRTEEN=["32","42","52","62","72","82","92","102"];
        var FOURTEEN=["39","49","59","69","79","89","99","109"];
        var FIFTEEN=["38","48","58","68","78","88","98"];
        var SIXTEEN=["47","56","65","74","83","92","101"];
        var SEVENTEEN=["210","29","28","27","26","25","24","23"];
        var EIGHTEEN=["03","04","05","06","07","08","09","010"];
        var NINETEEN=["10","11","12","13","14","15","16","17"];
        var TWENTY=["103","104","105","106","107","108"];
        var ANS=["eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];
        var ARR=[ELEVEN,TWELVE,THIRTEEN,FOURTEEN,FIFTEEN,SIXTEEN,SEVENTEEN,EIGHTEEN,NINETEEN,TWENTY]; //list of all coordinates
		var opt="ONRELEVENCOTIXRAJSFTMNCNNTHIRTEENEEEWTLGEERTITEEGRFTATWGETLRMXWCAEHENVEIAQPFNTNEESOTETMTERVFIFTEENYEAEFOURTEENNTSCNCNETON"; 
		var question=[0,1,2,3,4,5,6,7,8,9]; //this array will be shuffled and the variable key will be used to generate random questions
		var COLOR=["green","purple","orange","brown","pink"]; //some colors to display correct list on right in random color
        var counter=0,key;
        var paper,set;
        var totalQuest = 10; //total number of questions before gameover is displayed
		var isActive=false;

        var shuffle = function (choices) {
            for(var i=0;i<choices.length;i++) {
                var num = k.rand(0,choices.length-1);
                var temp = choices[i];
                choices[i]=choices[num];
                choices[num]=temp;
            }
        };
        
        var updateQuestion = function (){
            set.remove();
            set = paper.set();
            var xx=0,yy=0;
            for(var i = 0;i<=key+11;i++){
                set.push(paper.image(k.image.football.src,xx,yy,25,25));
                xx+=25;
                if(i===10) {
                    yy+=25;
					xx=0;
                }
            }
        }
        
        var showList = function () { //shows the list on right like One (1)
            $("#"+ANS[key]).show().css({"color":COLOR[k.rand(0,COLOR.length-1)]});
        };

        var congrats = function() {
            $("#over").show();
			isActive=false;
        };

        var init = function () { //lesson initialization stuffs
            shuffle(question); //shuffling to generate random questions
            key = question[counter]; //the random question to show
            paper = Raphael("question",250,50);
            set = paper.set();
            paper.rect(0,0,250,50);
            $("#right > div").hide();
			$("#over").hide();
			var str="";
            for(var i=0;i<11;i++) {
                str+="<tr>";
                for(var j=0;j<11;j++) {
                    str+="<td class='cell' id='"+String(j)+String(i)+"'>"+opt.charAt((i*11)+j)+"</td>";
                }
                    str+="</tr>";
            }
            $('table').append(str); //table with id and class as cell
            for(var k=0;k<ARR.length;k++){
                ARR[k].forEach(function(elem){
                    $("#"+elem).removeClass('cell').addClass(ANS[k]); //if the cell holds correct answer, do the steps
                });
            }
			isActive=true;
        }

        var addEvent = function() {
            $('td[className!="cell"]').hover(function(evt){$('.'+evt.target.className.split(' ')[0]).addClass('highlight')}
            ,function(evt){$('.'+evt.target.className.split(' ')[0]).removeClass('highlight')}).bind('click',function(evt) {
				if(isActive===true){
					clickedAns = (evt.target.className).split(' ')[0];
					if(clickedAns===ANS[key]) {
						$('.'+clickedAns).removeClass('highlight').removeClass('clickedAns').addClass('done');
						showList();
						counter++;
						if (counter === totalQuest) {
							congrats();
							return;
						}
						key = question[counter];
						updateQuestion();
					}
					else {
						console.log('no');
					}
				}
            });
        };

        init();
        addEvent();
        updateQuestion();
    });
});
