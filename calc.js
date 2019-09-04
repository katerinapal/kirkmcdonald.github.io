
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-66808523-1', 'auto');
  ga('send', 'pageview');

var attributes = document.getElementsByTagName('body');
for(var i = 0; i < attributes.length; i++) {
attributes[i].onload = function() {
	init();
}
}
document.getElementById('+').onclick = function() {
	plusHandler();
}
document.getElementById('totals_button').onclick = function() {
	clickTab('totals_tab');
}
document.getElementById('graph_button').onclick = function() {
	clickVisualize('graph_tab');
}
document.getElementById('settings_button').onclick = function() {
	clickTab('settings_tab');
}
document.getElementById('faq_button').onclick = function() {
	clickTab('faq_tab');
}
document.getElementById('about_button').onclick = function() {
	clickTab('about_tab');
}
document.getElementById('debug_button').onclick = function() {
	clickTab('debug_tab');
}
document.getElementById('CSV').onclick = function() {
	toggleVisible('csv_box');
}
var attributes = document.getElementsByTagName('span');
for(var i = 0; i < attributes.length; i++) {
attributes[i].onclick = function() {
	toggleVisualizerSettings();
}
}
document.getElementById('vis_sankey').onchange = function() {
	changeVisualizerType(event);
}
document.getElementById('vis_box').onchange = function() {
	changeVisualizerType(event);
}
document.getElementById('visdir_right').onchange = function() {
	changeVisualizerDirection(event);
}
document.getElementById('visdir_down').onchange = function() {
	changeVisualizerDirection(event);
}
document.getElementById('vis-node-breadth').onchange = function() {
	changeNodeBreadth(event);
}
document.getElementById('vis-link-length').onchange = function() {
	changeLinkLength(event);
}
document.getElementById('data_set').onchange = function() {
	changeMod();
}
document.getElementById('color_scheme').onchange = function() {
	changeColor(event);
}
document.getElementById('rprec').onchange = function() {
	changeRPrec(event);
}
document.getElementById('fprec').onchange = function() {
	changeFPrec(event);
}
document.getElementById('kovarex').onchange = function() {
	changeKovarex(event);
}
document.getElementById('pipe_length').onchange = function() {
	changePipeLength(event);
}
document.getElementById('mprod').onchange = function() {
	changeMprod();
}
document.getElementById('default_beacon_count').onchange = function() {
	changeDefaultBeaconCount(event);
}
document.getElementById('topo_order').onchange = function() {
	changeSortOrder(event);
}
document.getElementById('alpha_order').onchange = function() {
	changeSortOrder(event);
}
document.getElementById('decimal_format').onchange = function() {
	changeFormat(event);
}
document.getElementById('rational_format').onchange = function() {
	changeFormat(event);
}
document.getElementById('tooltip').onchange = function() {
	changeTooltip(event);
}
document.getElementById('render_debug').onchange = function() {
	toggleDebug(event);
}

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-66808523-1', 'auto');
  ga('send', 'pageview');

var attributes = document.getElementsByTagName('body');
for(var i = 0; i < attributes.length; i++) {
attributes[i].onload = function() {
	init();
}
}
document.getElementById('+').onclick = function() {
	plusHandler();
}
document.getElementById('totals_button').onclick = function() {
	clickTab('totals_tab');
}
document.getElementById('graph_button').onclick = function() {
	clickVisualize('graph_tab');
}
document.getElementById('settings_button').onclick = function() {
	clickTab('settings_tab');
}
document.getElementById('faq_button').onclick = function() {
	clickTab('faq_tab');
}
document.getElementById('about_button').onclick = function() {
	clickTab('about_tab');
}
document.getElementById('debug_button').onclick = function() {
	clickTab('debug_tab');
}
document.getElementById('CSV').onclick = function() {
	toggleVisible('csv_box');
}
var attributes = document.getElementsByTagName('span');
for(var i = 0; i < attributes.length; i++) {
attributes[i].onclick = function() {
	toggleVisualizerSettings();
}
}
document.getElementById('vis_sankey').onchange = function() {
	changeVisualizerType(event);
}
document.getElementById('vis_box').onchange = function() {
	changeVisualizerType(event);
}
document.getElementById('visdir_right').onchange = function() {
	changeVisualizerDirection(event);
}
document.getElementById('visdir_down').onchange = function() {
	changeVisualizerDirection(event);
}
document.getElementById('vis-node-breadth').onchange = function() {
	changeNodeBreadth(event);
}
document.getElementById('vis-link-length').onchange = function() {
	changeLinkLength(event);
}
document.getElementById('data_set').onchange = function() {
	changeMod();
}
document.getElementById('color_scheme').onchange = function() {
	changeColor(event);
}
document.getElementById('rprec').onchange = function() {
	changeRPrec(event);
}
document.getElementById('fprec').onchange = function() {
	changeFPrec(event);
}
document.getElementById('kovarex').onchange = function() {
	changeKovarex(event);
}
document.getElementById('pipe_length').onchange = function() {
	changePipeLength(event);
}
document.getElementById('mprod').onchange = function() {
	changeMprod();
}
document.getElementById('default_beacon_count').onchange = function() {
	changeDefaultBeaconCount(event);
}
document.getElementById('topo_order').onchange = function() {
	changeSortOrder(event);
}
document.getElementById('alpha_order').onchange = function() {
	changeSortOrder(event);
}
document.getElementById('decimal_format').onchange = function() {
	changeFormat(event);
}
document.getElementById('rational_format').onchange = function() {
	changeFormat(event);
}
document.getElementById('tooltip').onchange = function() {
	changeTooltip(event);
}
document.getElementById('render_debug').onchange = function() {
	toggleDebug(event);
}
