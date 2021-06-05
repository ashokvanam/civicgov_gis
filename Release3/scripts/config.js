var map_config = {
    WEB_MAP_ID: '8d6cfb69e70146f68af35167e407cd0b', //#1
   //WEB_MAP_ID:"8d6cfb69e70146f68af35167e407cd0b",
   // ASSET_ID: 'MBL',
   // FIELDS: ["MBL", "LOCATION",],
   // FIELD_ALIAS:["MBL#", "ADDRESS"],
    ASSET_NUMBER:'',
	search:{
        //url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Buildings/MapServer/0",		
        url:"https://services9.arcgis.com/37pqcAYwowkkAZyP/ArcGIS/rest/services/Parcel/FeatureServer/0",
		keyField:"PROP_ID", //This key link to the Parcel Layer
		keyFieldType:"text",
        FIELDS: ["PROP_ID","OWNER_NAME","SITUS_ADDR"],
        //FIELD_ALIAS:["ParcelNumeber","Ownername","Address"],
        FIELD_ALIAS:["Property ID","Owner","Address"],
        civicgovField: "PROP_ID", civicgovFieldType:"text",
        parcelLinkField: "PROP_ID", parcelLinkFieldType:"text",
        records:{
            0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?",params:[['parcel_number','PROP_ID']]},
            1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?",params:[['parcel_number','PROP_ID']]},
            2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?",params:[['parcel_number','PROP_ID']]},
            3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?",params:[['parcel_number','PROP_ID']]},
            4:{ disabled: false, name: "Project", add:"../../projects/edit/0?",params:[['parcel_number','PROP_ID']]},
            5:{ disabled: false, name: "License", add:"../../projects/edit/0?",params:[['parcel_number','PROP_ID']]}
        }
	},
    layers:{
        0:{
            name:"Parcel",            
            selectable:true, 
            //keyField:"PROP_ID",
            keyField:"PROP_ID",
            keyFieldType:"text",    
            legendColor:'#FFEBAF',
            legendText:'Parcel',	      
            fields:["PROP_ID","OWNER_NAME","SITUS_ADDR"],
            displayFieldNames:["Property ID","Owner","Address"],
            records:{
                0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?parcel_number={PROP_ID}"},
                1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?parcel_number={PROP_ID}"},
                2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?parcel_number={PROP_ID}"},
                3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?parcel_number={PROP_ID}"},
                4:{ disabled: false, name: "Project", add:"../../projects/edit/0?parcel_number={PROP_ID}"},
                5:{ disabled: false, name: "License", add:"../../licenses/edit/0?parcel_number={PROP_ID}"}
            },
            addRecord: true
        },
        
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

