var searchcontrols_config = {
	Asset:{enable:true, keyField:'SEGMENT_ID',keyFieldType:"number", layer:'Road',name:'Segment', operator:'='},
	Address:{enable:true, keyField:'ROADNAME', keyFieldType:"text",layer:'Road', name:'Address', operator:'like'},
	// Owner:{enable:true, keyField:'STREETNAME', keyFieldType:"text",layer:'Road', name:'Owner', operator:'like'}
};
var spatialsearch_config= {
	Parcel:{enable:true, keyField:'SEGMENT_ID',keyFieldType:"number", layer:'Road',name:'Segment', operator:'='},
};
var selectable_layers_config = {
	layers:["Segment"]
};