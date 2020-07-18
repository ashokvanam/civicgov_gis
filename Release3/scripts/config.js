var map_config = {
    WEB_MAP_ID: '5853b7358790483ab683340c1f883880', //#1
   //WEB_MAP_ID:"6ff64a259999443181ca98e04eb4f631",
   // ASSET_ID: 'MBL',
   // FIELDS: ["MBL", "LOCATION",],
   // FIELD_ALIAS:["MBL#", "ADDRESS"],
    ASSET_NUMBER:'',
	search:{
        //url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Buildings/MapServer/0",		
        url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Fire_Integration_Layers/MapServer/2",
		keyField:"PROPERTYID", //This key link to the Parcel Layer
		keyFieldType:"text",
        FIELDS: ['PROPERTYID',"STATE_ID", "RNO","OWNER1","SITEADDR"],
        //FIELD_ALIAS:["Building ID","Building Name", "Address","Building Type", "Building Use"],
        FIELD_ALIAS:["Property ID","State ID","RNO", "Owner 1","Address"],
        civicgovField: "PROPERTYID", civicgovFieldType:"text",
        parcelLinkField: "PROPERTYID", parcelLinkFieldType:"text",
        records:{
            0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?",params:[['parcel_number','PROPERTYID']]},
            1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?",params:[['parcel_number','PROPERTYID']]},
            2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?",params:[['parcel_number','PROPERTYID']]},
            3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?",params:[['parcel_number','PROPERTYID']]},
            4:{ disabled: false, name: "Project", add:"../../projects/edit/0?",params:[['parcel_number','PROPERTYID']]},
            5:{ disabled: false, name: "License", add:"../../projects/edit/0?",params:[['parcel_number','PROPERTYID']]}
        }
	},
    layers:{
        0:{
            name:"Parcel",            
            selectable:true, 
            //keyField:"STATE_ID",
            keyField:"PROPERTYID",
            keyFieldType:"text",    
            legendColor:'#FFEBAF',
            legendText:'Parcel',			
            Link_Layer:"Building",
            Link_Field:"PROPERTYID",
            Link_Field_Type:"text",
            fields:['PROPERTYID',"STATE_ID", "RNO","OWNER1","SITEADDR"],
            displayFieldNames:["Property ID","State ID","RNO", "Owner 1","Address"],
            records:{
                0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?parcel_number={PROPERTYID}"},
                1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?parcel_number={PROPERTYID}"},
                2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?parcel_number={PROPERTYID}"},
                3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?parcel_number={PROPERTYID}"},
                4:{ disabled: false, name: "Project", add:"../../projects/edit/0?parcel_number={PROPERTYID}"},
                5:{ disabled: false, name: "License", add:"../../licenses/edit/0?parcel_number={PROPERTYID}"}
            },
            addRecord: true
        },
        1:{
            name:"Building",           
            selectable:true,
            keyField:"BLDG_ID",
            keyFieldType:"text", 
			legendColor:'#EECFFC',
            legendText:'Building',
            fields:["BLDG_ID", "PROPERTY_ID","PRIMARY_ADDRESS","ASSESSOR_PROPERTY_DESCRIPTION"],
            displayFieldNames:["Building ID","Property ID", "Address","Assessor"],
            records:{
                0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?parcel_number={PROPERTY_ID}&unit_id={BLDG_ID}"},
                1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?parcel_number={PROPERTY_ID}&unit_id={BLDG_ID}"},
                2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?parcel_number={PROPERTY_ID}&unit_id={BLDG_ID}"},
                3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?parcel_number={PROPERTY_ID}&unit_id={BLDG_ID}"},
                4:{ disabled: false, name: "Project", add:"../../projects/edit/0?parcel_number={PROPERTY_ID}&unit_id={BLDG_ID}"},
                5:{ disabled: false, name: "License", add:"../../projects/edit/0?parcel_number={PROPERTY_ID}&unit_id={BLDG_ID}"}
            },
            addRecord: true
        }
    },
    cg_layers:{
        1:{
            name:"Violation",
			url:"../../map/index/?gis_ajax_call=1&format=csv&item_type=Violation",
            selectable:true,             
            keyField:"item_type",
            keyFieldType:"text",            
            fields:["marker_data","url"],
            displayFieldNames:["Info","Link"],
            latitude:"latitude",
            longitude:"longitude",
            style:violationSymbol,
            addRecord: false
        },
        2:{
            name:"Permit",
			url:"../../map/index/?gis_ajax_call=1&format=csv&item_type=Permit",
            selectable:true,             
            keyField:"item_type",
            keyFieldType:"text",            
            fields:["marker_data","url"],
            displayFieldNames:["Info","Link"],
            latitude:"latitude",
            longitude:"longitude",
            style:permitSymbol,
            addRecord: false
        },
        3:{
            name:"Complaint",
			url:"../../map/index/?gis_ajax_call=1&format=csv&item_type=Complaint",
            selectable:true,             
            keyField:"item_type",
            keyFieldType:"text",            
            fields:["marker_data","url"],
            displayFieldNames:["Info","Link"],
            latitude:"latitude",
            longitude:"longitude",
            style:complaintSymbol,
            addRecord: false
        },
        4:{
            name:"Inspection",
			url:"../../map/index/?gis_ajax_call=1&format=csv&item_type=Inspection",
            selectable:true,             
            keyField:"item_type",
            keyFieldType:"text",            
            fields:["marker_data","url"],
            displayFieldNames:["Info","Link"],
            latitude:"latitude",
            longitude:"longitude",
            style:inspectionSymbol,
            addRecord: false
        },
        5:{
            name:"Project",
            url:"../../map/index/?gis_ajax_call=1&format=csv&item_type=Project",            
            selectable:true,             
            keyField:"item_type",
            keyFieldType:"text",            
            fields:["marker_data","url"],
            displayFieldNames:["Info","Link"],
            latitude:"latitude",
            longitude:"longitude",
            style:projectSymbol,
            addRecord: false
        },
        6:{
            name:"License",
			url:"../../map/index/?gis_ajax_call=1&format=csv&item_type=License",
            selectable:true,             
            keyField:"item_type",
            keyFieldType:"text",            
            fields:["marker_data","url"],
            displayFieldNames:["Info","Link"],
            latitude:"latitude",
            longitude:"longitude",
            style:licenseSymbol,
            addRecord: false
        }


    }
}

