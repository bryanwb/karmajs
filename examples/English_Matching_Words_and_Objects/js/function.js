
function startTimer(){
				s=checkTime(s);					
				m=checkTime(m);
				h=checkTime(h);
				clickCounter = checkTime(clickCounter);
				document.getElementById('clickBox').innerHTML=clickCounter;
				document.getElementById('timerBox1').innerHTML=s;
				document.getElementById('timerBox2').innerHTML=m;
				document.getElementById('timerBox3').innerHTML=h;
				
}
	
	function increaseTime(){
	    if(play == 1){
			if(restart == 1){
			s = 0;
			m = 0;
			h = 0;
			}
					s++;
					if(s>60){
						m++;
						m=checkTime(m);
						document.getElementById('timerBox2').innerHTML=m;
						s = 0;
					}
					if(m>60){
						h++; 
							h=checkTime(h);
						document.getElementById('timerBox3').innerHTML=h;
					
						m=0;
						
					}				
					s=checkTime(s);					
					
					document.getElementById('timerBox1').innerHTML=s;
					t=setTimeout('increaseTime()',1000);
				}
					}
					function checkTime(timePara){
						if (timePara<10 )
						  {
						  timePara="0" + timePara;
						  }
						return timePara;
	 }