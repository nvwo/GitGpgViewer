		// Extends EditorUi to update I/O action states based on availability of backend
		var mile_ui = null;
		(function()
		{
			var editorUiInit = EditorUi.prototype.init;
			
			EditorUi.prototype.init = function()
			{
				editorUiInit.apply(this, arguments);
				this.actions.get('export').setEnabled(false);

				// Updates action states which require a backend
				if (!Editor.useLocalStorage)
				{
					mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function(req)
					{
						var enabled = req.getStatus() != 404;
						this.actions.get('open').setEnabled(enabled || Graph.fileSupport);
						this.actions.get('import').setEnabled(enabled || Graph.fileSupport);
						this.actions.get('save').setEnabled(enabled);
						this.actions.get('saveAs').setEnabled(enabled);
						this.actions.get('export').setEnabled(enabled);
					}));
				}
			};
			
			// Adds required resources (disables loading of fallback properties, this can only
			// be used if we know that all keys are defined in the language specific file)
			mxResources.loadDefaultBundle = false;
			var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||
				mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);

			// Fixes possible asynchronous requests
			mxUtils.getAll([bundle, STYLE_PATH + '/default.xml'], function(xhr)
			{
				// Adds bundle text to resources
				mxResources.parse(xhr[0].getText());
				
				// Configures the default graph theme
				var themes = new Object();
				themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement(); 
				
				// Main
				mile_ui = new EditorUi(new Editor(true, themes));
				if(urlParams["url"]!=null){
					var tar = decodeURIComponent(urlParams["url"]);
					fetch(tar).then((response) => response.text())
						.then(function(text){
							doDecrypt(text).then(function(text){
								if(text.indexOf('mxGraphModel')!=-1){
									updateDraw(text);
								}else{
									updateDraw("<mxGraphModel dx=\"1426\" dy=\"810\" grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageScale=\"1\" pageWidth=\"827\" pageHeight=\"1169\">  <root>    <mxCell id=\"0\"/>    <mxCell id=\"1\" parent=\"0\"/>    <mxCell id=\"2\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\">      <mxGeometry x=\"140\" y=\"280\" width=\"120\" height=\"60\" as=\"geometry\"/>    </mxCell>    <mxCell id=\"3\" value=\"Text\" style=\"text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;\" vertex=\"1\" parent=\"1\">      <mxGeometry x=\"180\" y=\"300\" width=\"40\" height=\"20\" as=\"geometry\"/>    </mxCell>  </root></mxGraphModel>");
								}
							});
						});
				}

			}, function()
			{
				document.body.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
			});
		})();
		
function updateDraw(xml) {
	mile_ui.editor.graph.model.beginUpdate();
	try {
		var doc = mxUtils.parseXml(xml);
		mile_ui.editor.graph.resizeContainer = true;
		mile_ui.editor.setGraphXml(doc.documentElement);
		mile_ui.editor.graph.centerZoom = false;
		mile_ui.editor.graph.setTooltips(false);
		mile_ui.editor.graph.setEnabled(false);
		mile_ui.editor.graph.resizeContainer = false;
	} catch (e) {
		console.error(e);
	} finally {
		mile_ui.editor.graph.model.endUpdate();
		document.getElementsByClassName('geDiagramContainer')[0].style.removeProperty('width');
		document.getElementsByClassName('geDiagramContainer')[0].style.removeProperty('height');
	}
}