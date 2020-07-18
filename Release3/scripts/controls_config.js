var searchcontrols_config = {
	Asset:{enable:true, keyField:'PROPERTYID',keyFieldType:"text", layer:'Parcel',name:'Parcel', operator:'='},
	Address:{enable:true, keyField:'SITEADDR', keyFieldType:"text",layer:'Parcel', name:'Address', operator:'like'},
	Owner:{enable:true, keyField:'OWNER1', keyFieldType:"text",layer:'Parcel', name:'Owner', operator:'like'}
};
var spatialsearch_config= {
	Parcel:{enable:true, keyField:'PROPERTYID',keyFieldType:"text", layer:'Parcel',name:'Parcel', operator:'like'},
};
var selectable_layers_config = {
	layers:["Parcel"]
};