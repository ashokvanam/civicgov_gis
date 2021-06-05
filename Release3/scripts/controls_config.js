var searchcontrols_config = {
	Asset:{enable:true, keyField:'PROP_ID',keyFieldType:"text", layer:'Parcel',name:'Parcel', operator:'='},
	Address:{enable:true, keyField:'SITUS_ADDR', keyFieldType:"text",layer:'Parcel', name:'Address', operator:'like'},
	Owner:{enable:true, keyField:'OWNER_NAME', keyFieldType:"text",layer:'Parcel', name:'Owner', operator:'like'}
};
var spatialsearch_config= {
	Parcel:{enable:true, keyField:'PROP_ID',keyFieldType:"text", layer:'Parcel',name:'Parcel', operator:'like'},
};
var selectable_layers_config = {
	layers:["Parcel"]
};