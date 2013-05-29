$(function(){
	var $com = $('#main');
	var $sections = $com.children('section');
	
	
	
	var $sectionMisc = $( '#misc-section' );
		// work items
	var	$miscItems = $( '.misc-items > li' );
		// work panels
	var	$miscPanelsContainer = $( '#panel-misc-items' );
	var	$miscPanels = $miscPanelsContainer.children( 'div' ),
		totalMiscPanels = $miscPanels.length;
		// navigating the work panels
	var	$nextMiscItem = $miscPanelsContainer.find( '#nav > span.next-misc' ),
		// if currently navigating the work items
		isAnimating = false;
		// navigating the work panels
	var	$prevMiscItem = $miscPanelsContainer.find( '#nav > span.prev-misc' ),
		// if currently navigating the work items
		isAnimating = false;

		// close work panel trigger
	var	$closeMiscItem = $miscPanelsContainer.find( '#close > span.box-close' ),
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// transition end event name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support css transitions
		supportTransitions = Modernizr.csstransitions;
	
	
	
	
	
	
	
	$sections.each(function(){
		var $section = $(this);
		$section.on('click', function(){
			if(!$section.data('open')){// if the data is not yet there
				$section.data('open', true).addClass('box-expand box-expand-top');
				$com.addClass('box-expand-item');
			}
		} ).find( 'span.box-close' ).on( 'click', function() {
				
				// close the expanded section and scale up the others
				$section.data( 'open', false ).removeClass( 'box-expand' ).on( transEndEventName, function( event ) {
					if( !$( event.target ).is( 'section' ) ) return false;
					$( this ).off( transEndEventName ).removeClass( 'box-expand-top' );
				} );

				if( !supportTransitions ) {
					$section.removeClass( 'box-expand-top' );
				}

				$com.removeClass( 'box-expand-item' );
				
				return false;

			} );

	});
	
	
	
	// clicking on a work item: the current section scales down and the respective work panel slides up
		$miscItems.on( 'click', function( event ) {

			// scale down main section
			$sectionMisc.addClass( 'box-scale-down' );

			// show panel for this work item
			$miscPanelsContainer.addClass( 'box-panel-items-show' );

			var $panel = $miscPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			currentMiscPanel = $panel.index();
			$panel.addClass( 'show-misc' );

			return false;

		} );

		// navigating the work items: current work panel scales down and the next work panel slides up
		$nextMiscItem.on( 'click', function( event ) {
			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $miscPanels.eq( currentMiscPanel );
			currentMiscPanel = currentMiscPanel < totalMiscPanels - 1 ? currentMiscPanel + 1 : 0;
			var $nextPanel = $miscPanels.eq( currentMiscPanel );

			$currentPanel.removeClass( 'show-misc' ).addClass( 'box-hide-current-misc' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'box-hide-current-misc' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'box-hide-current-misc' );
				isAnimating = false;
			}
			
			$nextPanel.addClass( 'show-misc' );

			return false;

		} );
		
		// navigating the work items: current work panel scales down and the prev work panel slides up

		$prevMiscItem.on('click', function(event) {
			if( isAnimating ) {
				return false;	
			}
			isAnimating = true;
			
			var $currentPanel = $miscPanels.eq( currentMiscPanel );
			currentMiscPanel = currentMiscPanel < totalMiscPanels + 1 ? currentMiscPanel - 1 : 0;
			var $prevPanel = $miscPanels.eq( currentMiscPanel );

			$currentPanel.removeClass( 'show-misc' ).addClass( 'box-hide-current-misc' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'box-hide-current-misc' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'box-hide-current-misc' );
				isAnimating = false;
			}
			
			$prevPanel.addClass( 'show-misc' );

			return false;

		} );
		

		// clicking the work panels close button: the current work panel slides down and the section scales up again
		$closeMiscItem.on( 'click', function( event ) {

			// scale up main section
			$sectionMisc.removeClass( 'box-scale-down' );
			$miscPanelsContainer.removeClass( 'box-panel-items-show' );
			$miscPanels.eq( currentMiscPanel ).removeClass( 'show-misc' );
			
			return false;

		} );

	
		
});