$(document).ready(function(){
	var k = Karma ({
		svg: [{domId:"truck", name:"truck"}]
	});

	k.ready(function(){
		var TIMER_DELAY=1000, TOTAL_SECONDS=10;
        var boxInTruckA=0,boxInTruckB=0,level=1,num1=0,num2=0,numTime=TOTAL_SECONDS;
        var selectedOpt="#optA";
		var isRunning=false;
		var isFirstRun=true;
        var timer;

        var init = function() {
            $("#happyFace",k.svg.truck.root).hide();
            $("#sadFace",k.svg.truck.root).hide();
            $("#rightBox",k.svg.truck.root).text("");
            $(selectedOpt,k.svg.truck.root).animate({svgTransform: 'translate(0 -10)'},500);
            $("#box1",k.svg.truck.root).text("");
            $("#box2",k.svg.truck.root).text("");
        };

        var addBoxInTruck = function(truckName,num) {
            $("#"+truckName+"box"+num,k.svg.truck.root).show();
        };

		var timesOut =function(){
			numTime--;
			$("#tmrValue",k.svg.truck.root).text(numTime);
			if (numTime===0) {
                boxInTruckA++;
                addBoxInTruck("truckA",boxInTruckA);
                if (boxInTruckA===9) {
					$("#truckAtext",k.svg.truck.root).show();
                    $("#truckA",k.svg.truck.root).animate({svgTransform: 'translate(600)'}, 4000);
                    endGame();
                    return;
                }
                numTime=TOTAL_SECONDS;
                showQuestion();
			}
            timer = window.setTimeout(timesOut,TIMER_DELAY);
		};
        
        var showQuestion = function() {
            $("#rightBox",k.svg.truck.root).text(num1+" X "+num2+" = "+num1*num2);
            num1=Karma.rand(2+level,3+(level*3));
            num2=Karma.rand(2+level,num1);
            $("#box1",k.svg.truck.root).text(num1);
            $("#box2",k.svg.truck.root).text(num2);
        };

        var checkAnswer = function(event) {
            if(isRunning===true){
                $("#answerBox").css('background-color','white');
                if(event.keyCode===13) {
                    $("#happyFace",k.svg.truck.root).hide();
                    $("#sadFace",k.svg.truck.root).hide();
                    if($("#answerBox").val()==(num1*num2)) {
                        $("#happyFace",k.svg.truck.root).show();
                        numTime=TOTAL_SECONDS;
                        boxInTruckB++;
                        addBoxInTruck("truckB",boxInTruckB);
                        if (boxInTruckB===9) {
							$("#truckBtext",k.svg.truck.root).show();
                            $("#truckB",k.svg.truck.root).animate({svgTransform: 'translate(600 198)'}, 4000);
                            endGame();
                            return;
                        }
                        else {
                            showQuestion();
                        }
                    }
                    else {
                        $("#sadFace",k.svg.truck.root).show();
                        $("#answerBox").css('background-color','red');
                    }
                    $("#answerBox").val('');
                }
            }
        };

        var addEvent = function() {
            $("#answerBox").keydown(checkAnswer);
			$("#btnStart",k.svg.truck.root).click(startGame);
            $(".optBtns",k.svg.truck.root).click(function(){
				if(isFirstRun===true) {
					if (selectedOpt==="#"+this.id) {  //if same option clicked, do nothing
						return;
					}
					$(selectedOpt,k.svg.truck.root).animate({svgTransform: 'translate(0 0)'},500);
					$(this).animate({svgTransform: 'translate(0 -10)'},500);
					selectedOpt="#"+this.id;
					level = selectedOpt.charCodeAt(4) - 64;  //A=65, B=66, C=67
				}
            });
        };

        var endGame=function() {
			isRunning=false;
            clearTimeout(timer);
        };

		var startGame = function() {
			if(isFirstRun===true) {
				$(".box",k.svg.truck.root).hide();
				$(".truckText",k.svg.truck.root).hide();
				isRunning=true;
				isFirstRun=false;
				timesOut();
				showQuestion();
				$("#answerBox").val('').focus();
			}
		}

		addEvent();
        init();
	});
});
