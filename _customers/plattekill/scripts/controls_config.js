var searchcontrols_config = {
	Asset:{enable:true, keyField:'PRINTKEY',keyFieldType:"text", layer:'Parcel',name:'Parcel', operator:'='},
	Address:{enable:true, keyField:'PARCEL_ADDRESS', keyFieldType:"text",layer:'Parcel', name:'Address', operator:'like'},
	Owner:{enable:true, keyField:'OWNER', keyFieldType:"text",layer:'Parcel', name:'Owner', operator:'like'}
};
var spatialsearch_config= {
	Parcel:{enable:true, keyField:'PRINTKEY',keyFieldType:"text", layer:'Parcel',name:'Parcel', operator:'like'},
};
var selectable_layers_config = {
	layers:["Parcel"]
};