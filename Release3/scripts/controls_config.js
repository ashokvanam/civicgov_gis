var searchcontrols_config = {
	Asset:{enable:true, keyField:'PINFormat',keyFieldType:"text", layer:'Parcel',name:'Parcel', operator:'like'},
	Address:{enable:true, keyField:'LOCN', keyFieldType:"text",layer:'Parcel', name:'Address', operator:'like'},
	Owner:{enable:true, keyField:'OWNER', keyFieldType:"text",layer:'Parcel', name:'Owner', operator:'like'}
};
var spatialsearch_config= {
	Parcel:{enable:true, keyField:'RECID',keyFieldType:"number", layer:'Parcel',name:'Parcel', operator:'like'},
};
var selectable_layers_config = {
	layers:["Parcel"]
};