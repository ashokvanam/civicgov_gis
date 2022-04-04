var map_config = {
    WEB_MAP_ID: '5bd8eaea533a4bb2bcd608e4ec93aa6a', //#1
   //WEB_MAP_ID:"6ff64a259999443181ca98e04eb4f631",
   // ASSET_ID: 'MBL',
   // FIELDS: ["MBL", "LOCATION",],
   // FIELD_ALIAS:["MBL#", "ADDRESS"],
    ASSET_NUMBER:'',
	search:{
        //url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Buildings/MapServer/0",		
        url:"https://www.webgis.net/arcgis/rest/services/VA/CulpeperWebGIS/MapServer/205",
		keyField:"RECID", //This key link to the Parcel Layer
		keyFieldType:"text",
        FIELDS: ["OBJECTID","PINFormat","PID","RECID","MAP","OWNER","COOWNER","ADD1","ADD2","ADD3","CITY","STATE","ZIP","ACRE","ZONING","MAGCD","OCCUP","LUSE","DESCRIPTIO","USE_CODE","YRBLT","DBOOK","DPAGE","SALEDATE","SALEPRICE","LOCN","CITY_PA","STATE_PA","ZIP_PA","Shape_Length","Shape_Area","WebLINK","MAP_","INSERT_","SUBD","BLOCK","LOT","SUBLOT","Name","AgDistrict","ConservationEasements","TechnologyZone","AC","BR","Alt_Approv"],
        //FIELD_ALIAS:["Building ID","Building Name", "Address","Building Type", "Building Use"],
        FIELD_ALIAS:["OBJECTID","PINFormat","PID","RECID","MAP","OWNER","COOWNER","ADD1","ADD2","ADD3","CITY","STATE","ZIP","ACRE","ZONING","MAGCD","OCCUP","LUSE","DESCRIPTIO","USE_CODE","YRBLT","DBOOK","DPAGE","SALEDATE","SALEPRICE","LOCN","CITY_PA","STATE_PA","ZIP_PA","Shape_Length","Shape_Area","WebLINK","MAP_","INSERT_","SUBD","BLOCK","LOT","SUBLOT","Name","AgDistrict","ConservationEasements","TechnologyZone","AC","BR","Alt_Approv"],
        civicgovField: "RECID", civicgovFieldType:"text",
        parcelLinkField: "RECID", parcelLinkFieldType:"text",
        records:{
            0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?",params:[['parcel_number','PINFormat']]},
            1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?",params:[['parcel_number','PINFormat']]},
            2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?",params:[['parcel_number','PINFormat']]},
            3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?",params:[['parcel_number','PINFormat']]},
            4:{ disabled: false, name: "Project", add:"../../projects/edit/0?",params:[['parcel_number','PINFormat']]},
            5:{ disabled: false, name: "License", add:"../../projects/edit/0?",params:[['parcel_number','PINFormat']]}
        }
	},
    layers:{
        0:{
            name:"Parcel",            
            selectable:true, 
            //keyField:"STATE_ID",
            keyField:"RECID",
            keyFieldType:"text",    
            legendColor:'#FFEBAF',
            legendText:'Parcel',			
            Link_Layer:"Building",
            Link_Field:"RECID",
            Link_Field_Type:"NUMBER",
            fields:["OBJECTID","PINFormat","PID","RECID","MAP","OWNER","COOWNER","ADD1","ADD2","ADD3","CITY","STATE","ZIP","ACRE","ZONING","MAGCD","OCCUP","LUSE","DESCRIPTIO","USE_CODE","YRBLT","DBOOK","DPAGE","SALEDATE","SALEPRICE","LOCN","CITY_PA","STATE_PA","ZIP_PA","Shape_Length","Shape_Area","WebLINK","MAP_","INSERT_","SUBD","BLOCK","LOT","SUBLOT","Name","AgDistrict","ConservationEasements","TechnologyZone","AC","BR","Alt_Approv"],
            displayFieldNames:["OBJECTID","PINFormat","PID","RECID","MAP","OWNER","COOWNER","ADD1","ADD2","ADD3","CITY","STATE","ZIP","ACRE","ZONING","MAGCD","OCCUP","LUSE","DESCRIPTIO","USE_CODE","YRBLT","DBOOK","DPAGE","SALEDATE","SALEPRICE","LOCN","CITY_PA","STATE_PA","ZIP_PA","Shape_Length","Shape_Area","WebLINK","MAP_","INSERT_","SUBD","BLOCK","LOT","SUBLOT","Name","AgDistrict","ConservationEasements","TechnologyZone","AC","BR","Alt_Approv"],
            records:{
                0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?parcel_number={PINFormat}"},
                1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?parcel_number={PINFormat}"},
                2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?parcel_number={PINFormat}"},
                3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?parcel_number={PINFormat}"},
                4:{ disabled: false, name: "Project", add:"../../projects/edit/0?parcel_number={PINFormat}"},
                5:{ disabled: false, name: "License", add:"../../licenses/edit/0?parcel_number={PINFormat}"}
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

