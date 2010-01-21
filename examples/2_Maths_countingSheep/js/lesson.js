$(document).ready(function(){
	var k = Karma({
		image: [
			{'name':'sheep1','file':'sheep1.png'},
			{'name':'sheep2','file':'sheep2.png'},
			{'name':'sheep3','file':'sheep3.png'},
			{'name':'rubbish','file':'rubbish.png'},
			{'name':'rubbish_open','file':'rubbish_open.png'}
		]
	});

	
	k.ready(function(){

		var originalObjects = [
			{id: "option0", count: 1},
			{id: "option1", count: 2},
			{id: "option2", count: 3}
		];
		
		// add all listeners
		init_game();
		
		// start the game
		game_start(); 
		
		function init_game(){
			// add listeners for drag and drop
			
			// make sure all the original objects can be dragged and cloned
			for ( var i=0; i < originalObjects.length; i++ ){
				$( "#" + originalObjects[i].id ).draggable({
					helper: function(){
						var c = $(this).clone();
						c.attr('originalId', $(this).attr('id') );
						return c;
					},
					//containment: '#gameArea',
					appendTo: '#clonedObjects',
					distance: 10,
					start: function(){
						bring_to_front(this);
					},
					stop:
						function(ev, ui) {
							// on drop, need to make a persistant clone of the helper
							// unless we dropped on the rubbish bin of course
							if (ui.helper.is(":visible")){
								var helper = ui.helper.clone().draggable({
									//containment: '#gameArea',
									start: function(){
										bring_to_front(this);
									}
								});
								helper.appendTo('#clonedObjects');
							}
						}
				});
			}
			
			// add handler to update score whenever items are moved
			$("#gameArea").droppable({
				activate: function(event, ui) {
					update_score();
				},
				drop: function(event, ui) {
					update_score();
				}
			});
			
			// and to remove items when dropped in the rubbish bin
			$("#discardTarget").droppable({
				tolerance: 'intersect',
				over: function(event, ui) {
					ui.helper.hide();
					$("#discardTarget").attr('src', Karma.image['rubbish_open'].media.src);
				},
				out: function(event, ui) {
					ui.helper.show();
					$("#discardTarget").attr('src', Karma.image['rubbish'].media.src);
				},
				drop: function(event, ui) {
					// delete the helper from the DOM, after removing all listeners
					ui.helper.unbind();
					ui.helper.remove();
					$("#discardTarget").attr('src', Karma.image['rubbish'].media.src);
				}
			});
			
			// show the help text
			$("#helpIcon").hover(
				function(){ $("#helpText").show(); },
				function(){ $("#helpText").hide(); }
			);
		}
		
		function game_start(){
			// restart the game
			
			// remove all cloned objects
			$("#clonedObjects").children().each(function(){
				$(this).unbind();
				$(this).remove();
			});
			
			update_score();
		}

		function update_score(){
			var total = 0;
			
			// sum the number of sheep that are over the dropTarget
			$('#clonedObjects').children().each(function(){
				if ( bounds_within($(this), $("#dropTarget")) ){
					var oId = $(this).attr('originalId');
					for ( var i=0; i < originalObjects.length; i++ ){
						if ( originalObjects[i].id == oId ){
							total += originalObjects[i].count;
							break;
						}
					}
				}
			});
		
			$("#total").html( Karma.convertNumToLocale(total, 'ne') );
		}

		
		// helper functions
		
		function bring_to_front( el ){
			// ensure that the zIndex of the passed element / selector is on top of all siblings
			var zmax = 0;
			$(el).siblings().each(function() {
				var cur = parseInt( $(this).css('zIndex') );
				zmax = cur > zmax ? cur : zmax;
			});
			$(el).css( 'zIndex', (zmax+1) );
		}
		
		function bounds_within( el1, el2 ){
			if ( el1.offset().left > el2.offset().left && 
				el1.offset().top > el2.offset().top &&
				(el1.offset().left + el1.width()) < (el2.offset().left + el2.width()) &&
				(el1.offset().top + el1.height()) < (el2.offset().top + el2.height()) ){
			
				return true;
			}
			return false;
		}

	});	    
});