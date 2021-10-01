var searchcontrols_config = {
	Asset:{enable:true, keyField:'SEGMENT_ID',keyFieldType:"number", layer:'Parcel',name:'Segment', operator:'='},
	Address:{enable:true, keyField:'ROADNAME', keyFieldType:"text",layer:'Parcel', name:'Road Name', operator:'like'},
	Owner:{enable:true, keyField:'STREETNAME', keyFieldType:"text",layer:'Parcel', name:'Street Name', operator:'like'}
};
var spatialsearch_config= {
	Parcel:{enable:true, keyField:'SEGMENT_ID',keyFieldType:"number", layer:'Parcel',name:'Segment', operator:'like'},
};
var selectable_layers_config = {
	layers:["Road"]
};