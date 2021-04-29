var searchcontrols_config = {
	Asset:{enable:true, keyField:'PARCEL_ID',keyFieldType:"text",layer:'Parcel',name:'Parcel', operator:'='},
	Address:{enable:true, keyField:'SITUSADDRESS',keyFieldType:"text",layer:'Parcel', name:'Address', operator:'like'},
	Owner:{enable:true, keyField:'NAME1',keyFieldType:"text",layer:'Parcel', name:'Owner', operator:'like'}
};
var spatialsearch_config= {
	Parcel:{enable:true, keyField:'PARCEL_ID',keyFieldType:"text", layer:'Parcel',name:'Parcel', operator:'like'},
};
var selectable_layers_config = {
	layers:["Parcel"]
};









		