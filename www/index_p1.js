		// Parses URL parameters. Supported parameters are:
		// - lang=xy: Specifies the language of the user interface.
		// - touch=1: Enables a touch-style user interface.
		// - storage=local: Enables HTML5 local storage.
		// - chrome=0: Chromeless mode.
		var urlParams = (function(url)
		{
			var result = new Object();
			var idx = url.lastIndexOf('?');
	
			if (idx > 0)
			{
				var params = url.substring(idx + 1).split('&');
				
				for (var i = 0; i < params.length; i++)
				{
					idx = params[i].indexOf('=');
					
					if (idx > 0)
					{
						result[params[i].substring(0, idx)] = params[i].substring(idx + 1);
					}
				}
			}
			
			return result;
		})(window.location.href);
		mxBasePath = chrome.runtime.getURL("www")+'/resources/mx/';
		STYLE_PATH = chrome.runtime.getURL("www")+'/styles';
		RESOURCES_PATH = chrome.runtime.getURL("www")+'/resources';
		STENCIL_PATH = chrome.runtime.getURL("www")+'/stencils';
		// Default resources are included in grapheditor resources
		mxLoadResources = false;