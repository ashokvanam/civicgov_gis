var map_config = {
    WEB_MAP_ID: '793680bcdb704112bde9d06d95a5076f', //#1
   //WEB_MAP_ID:"6ff64a259999443181ca98e04eb4f631",
   // ASSET_ID: 'MBL',
   // FIELDS: ["MBL", "LOCATION",],
   // FIELD_ALIAS:["MBL#", "ADDRESS"],
    ASSET_NUMBER:'',
	search:{
        url:"https://gis.ulstercountyny.gov/arcgis/rest/services/Tax_Parcels/Tax_Parcel_Data/MapServer/0",
		keyField:"PRINTKEY", //This key link to the Parcel Layer
		keyFieldType:"text",
        FIELDS: ['PRINTKEY','PARCEL_ADDRESS','OWNER'],
        //FIELD_ALIAS:["Building ID","Building Name", "Address","Building Type", "Building Use"],
        FIELD_ALIAS:['PRINTKEY','PARCEL_ADDRESS','OWNER'],
        civicgovField: "PRINTKEY", civicgovFieldType:"text",
        parcelLinkField: "PRINTKEY", parcelLinkFieldType:"text",
        records:{
            0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?",params:[['parcel_number','PRINTKEY']]},
            1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?",params:[['parcel_number','PRINTKEY']]},
            2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?",params:[['parcel_number','PRINTKEY']]},
            3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?",params:[['parcel_number','PRINTKEY']]},
            4:{ disabled: false, name: "Project", add:"../../projects/edit/0?",params:[['parcel_number','PRINTKEY']]},
            5:{ disabled: false, name: "License", add:"../../projects/edit/0?",params:[['parcel_number','PRINTKEY']]}
        }
	},
    layers:{
        0:{
            name:"Parcel",            
            selectable:true, 
            //keyField:"STATE_ID",
            keyField:"PRINTKEY",
            keyFieldType:"text",    
            legendColor:'#FFEBAF',
            legendText:'Parcel',			
            // Link_Layer:"Building",
            // Link_Field:"PRINTKEY",
            // Link_Field_Type:"text",
            fields:['PRINTKEY','PARCEL_ADDRESS','PARCEL_CITY','OWNER','OWNER2','MAILING_ADDRESS','MAILING_ADDRESS_1','MAILING_ADDRESS_2','MAILING_CITY','MAILING_ZIP','ACRES','PROP_CLASS','FRONT','DEPTH','SWIS_CODE','DEED_BOOK','DEED_PAGE','PRINTKEY'
        ],
            displayFieldNames:['PRINTKEY','PARCEL_ADDRESS','PARCEL_CITY','OWNER','OWNER2','MAILING_ADDRESS','MAILING_ADDRESS_1','MAILING_ADDRESS_2','MAILING_CITY','MAILING_ZIP','ACRES','PROP_CLASS','FRONT','DEPTH','SWIS_CODE','DEED_BOOK','DEED_PAGE','PRINTKEY'
        ],
            records:{
                0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?parcel_number={PRINTKEY}"},
                1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?parcel_number={PRINTKEY}"},
                2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?parcel_number={PRINTKEY}"},
                3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?parcel_number={PRINTKEY}"},
                4:{ disabled: false, name: "Project", add:"../../projects/edit/0?parcel_number={PRINTKEY}"},
                5:{ disabled: false, name: "License", add:"../../licenses/edit/0?parcel_number={PRINTKEY}"}
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

