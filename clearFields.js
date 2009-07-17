$(document).ready(function(){
	/**
	 * Clear Fields
	 * (make the bogeyman go away!)
	 * 
	 * When element is clicked, clear the fields in the element specified.
	 * 
	 * @example
	 * <... clear="shipping_address">
	 * 
	 */
// Needs jquery.js, jquery.livequery.js, and this console log function.
	
	/**
	 * Console Log
	 */
	var debug = false; // set to false to disable logging for production
	var log = function() {
		if (!debug)
			return false;
		try {
			if (window.console && window.console.firebug || typeof firebug === 'object')
	  			console.log.apply(this, arguments);
	  	} catch(err) {
			alert(err.description+'\nmake sure firebug light\nis included in the header before\nautomator.js');
		}
	}
	log('Starting Error Log...');
	var clearFieldsSelector = "[clear]";
	var clearFieldsTag = "clear";
	 
	$(clearFieldsSelector).livequery(function(){
		$(this).bind('click change',function(){
			try {
				var targets = $(this).attr(clearFieldsTag).split(" ");
				log(targets);
				for (var t in targets) {
					//log('clear selector::#'+target+' input,#'+target+' select,#'+target+':input');
					log("clear target="+targets[t]);
					$('#'+targets[t]+' input,#'+targets[t]+' select,#'+targets[t]+':input').each(function(){
						var type = this.type;
						var tag = this.tagName.toLowerCase(); // normalize case
						// it's ok to reset the value attr of text inputs,
						// password inputs, and textareas
						if (type == 'text' || type == 'password' || tag == 'textarea')
						   this.value = "";
						// checkboxes and radios need to have their checked state cleared
						// but should *not* have their 'value' changed
						else if (type == 'checkbox' || type == 'radio')
						    this.checked = false;
						// select elements need to have their 'selectedIndex' property set to -1
						// (this works for both single and multiple select elements)
						else if (tag == 'select')
							this.selectedIndex = 0;
						//finally, clear out hidden fields as well
						else if (type == 'hidden')
							this.value = "";
					});
				}
			} catch(err) {
				log(err);
				log('Thrown in Clear Fields (clear=) trying to clear:'+target);
			}
		});
	});
});