var searchcontrols_config = {
	Asset:{enable:true, keyField:'SEGMENT_ID',keyFieldType:"number", layer:'Road',name:'Segment', operator:'='},
	Address:{enable:true, keyField:'ROADNAME', keyFieldType:"text",layer:'Road', name:'Address', operator:'like'},
	Parcel:{enable:true, keyField:'NashuaGISReplica.GISOWNER.Parcels_Poly.PACCT', keyFieldType:"number",layer:'Parcels', name:'Parcels', operator:'='}
};
var spatialsearch_config= {
	Parcel:{enable:true, keyField:'NashuaGISReplica.GISOWNER.Parcels_Poly.PACCT',keyFieldType:"number", layer:'Parcels',name:'Parcels', operator:'='},
	Road:{enable:true, keyField:'SEGMENT_ID',keyFieldType:"number", layer:'Road',name:'Segment', operator:'='},
};
var selectable_layers_config = {
	layers:["Segment"]
};