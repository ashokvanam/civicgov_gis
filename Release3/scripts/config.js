var map_config = {
    WEB_MAP_ID: '14316193020e48e5ac85d0fede65cb2a', //#1
   //WEB_MAP_ID:"6ff64a259999443181ca98e04eb4f631",
   // ASSET_ID: 'MBL',
   // FIELDS: ["MBL", "LOCATION",],
   // FIELD_ALIAS:["MBL#", "ADDRESS"],
    ASSET_NUMBER:'',
	search:{
		url: "https://utility.arcgis.com/usrsvcs/servers/f2d2dc348ead48469efb26f9101b9c9e/rest/services/Public/Marshall_Assessor_Data/MapServer/10",
	    keyField:"PARCEL_ID", //This key link to the Parcel Layer
		keyFieldType:"text",
        FIELDS: ["PARCEL_ID","NAME1","SITUSADDRESS"],
		//FIELD_ALIAS:["parcelID","owner","Address"],
        FIELD_ALIAS:["PARCEL_ID","Owner Name","Address"],	
        civicgovField: "PARCEL_ID", 
		civicgovFieldType:"text",
        parcelLinkField: "PARCEL_ID", 
		parcelLinkFieldType:"text",
        records:{
            0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?",params:[['parcel_number','PARCEL_ID']]},
            1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?",params:[['parcel_number','PARCEL_ID']]},
            2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?",params:[['parcel_number','PARCEL_ID']]},
            3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?",params:[['parcel_number','PARCEL_ID']]},
            4:{ disabled: false, name: "Project", add:"../../projects/edit/0?",params:[['parcel_number','PARCEL_ID']]},
            5:{ disabled: false, name: "License", add:"../../projects/edit/0?",params:[['parcel_number','PARCEL_ID']]}
        }
	},
    layers:{
        0:{
            name:"Parcel",            
            selectable:true, 					
            //keyField:"PID",
            keyField:"PARCEL_ID",
            keyFieldType:"text",    
            legendColor:'#FFEBAF',
            legendText:'Parcel',			 
            Link_Field:"PARCEL_ID",
            Link_Field_Type:"text",
            fields:['OBJECTID','PID','PARCEL_ID','PROPERTY_NUMBER','NAME1','SITUSADDRESS','SITUS_CITY','SITUS_STATE','SITE_ZIP','MAILTO_NAME_ID','MAILTO_NAME','MAILTO_ADDRESS1','MAILTO_ADDRESS2','MAILTO_CITY','MAILTO_STATE','MAILTO_ZIP','TAX_CODE','TOWNSHIP','TOWNSHIP_NAME','GROSS_ACRES','RURAL_TOWN_FLAG','TAX_STATUS','LOT_DIMENSION','OWNER1_ID','DOCUMENT_NO1','DEEDDATE1','DEEDBOOK1','PAGENO1','CONAME1_ADDRESS','ADDRESS1','CITY1','STATE1','ZIP1','LEGAL_DESCRIPTION','AG_LAND_VALUE','AG_BLDG_VALUE','COM_LAND_VALUE','COM_BLDG_VALUE','RES_LAND_VALUE','RES_BLDG_VALUE','APP_AG_LAND_VALUE','APP_AG_BLDG_VALUE','APP_COM_LAND_VALUE','APP_COM_BLDG_VALUE','APP_RES_LAND_VALUE','APP_RES_BLDG_VALUE','TOTAL_APP_VALUE','TOTAL_VALUE','AG1_ACRES','AG2_ACRES','AG3_ACRES','AG4_ACRES','AG5_ACRES','AG6_ACRES','AG7_ACRES','AG8_ACRES','RES_ACRES','COM_ACRES','TAX_BILLED','AMBULANCE_CODE','AMBULANCE_NAME','AMBULANCE_AMT','COUNTY_CODE','COUNTY_NAME','COUNTY_AMT','CITY_MUNICIPALITY_CODE','CITY_MUNICIPALITY_NAME','CITY_MUNICIPALITY_AMT','FIRE_CODE','FIRE_NAME','FIRE_AMT','LIBRARY_CODE','LIBRARY_NAME','LIBRARY_AMT','OTHER_DISTRICT_CODE','OTHER_DISTRICT_NAME','OTHER_DISTRICT_AMT','ROAD_CODE','ROAD_NAME','ROAD_AMT','SCHOOL_CODE','SCHOOL_NAME','SCHOOL_AMT','STATE_CODE','STATE_NAME','STATE_AMT','COUNTY_RB_CODE','COUNTY_RB_NAME','COUNTY_RB_AMT','DRAINAGE_CODE','DRAINAGE_NAME','DRAINAGE_AMT','HEALTH_CENTER_CODE','HEALTH_CENTER_NAME','HEALTH_CENTER_AMT','NONCOLLECTABLE_CODE','NONCOLLECTABLE_NAME','NONCOLLECTABLE_AMT','NURSING_HOME_CODE','NURSING_HOME_NAME','NURSING_HOME_AMT','SENIOR_CENTER_CODE','SENIOR_CENTER_NAME','SENIOR_CENTER_AMT','SPECIAL_DISTRICT_CODE','SPECIAL_DISTRICT_NAME','SPECIAL_DISTRICT_AMT','SURTAX_CODE','SURTAX_NAME','SURTAX_AMT','SHELTERED_WKSHOP_CODE','SHELTERED_WKSHOP_NAME','SHELTERED_WKSHOP_AMT','TIF_DISTRICT_CODE','TIF_DISTRICT_NAME','TIF_DISTRICT_AMT','WATERSHED_CODE','WATERSHED_NAME','WATERSHED_AMT','YEAR_BUILT','BASE_AREA','MAIN_BASE_AREA','land_use','asr_neighborhood_code'],
            displayFieldNames:['OBJECTID','PID','PARCEL_ID','PROPERTY_NUMBER','NAME1','SITUSADDRESS','SITUS_CITY','SITUS_STATE','SITE_ZIP','MAILTO_NAME_ID','MAILTO_NAME','MAILTO_ADDRESS1','MAILTO_ADDRESS2','MAILTO_CITY','MAILTO_STATE','MAILTO_ZIP','TAX_CODE','TOWNSHIP','TOWNSHIP_NAME','GROSS_ACRES','RURAL_TOWN_FLAG','TAX_STATUS','LOT_DIMENSION','OWNER1_ID','DOCUMENT_NO1','DEEDDATE1','DEEDBOOK1','PAGENO1','CONAME1_ADDRESS','ADDRESS1','CITY1','STATE1','ZIP1','LEGAL_DESCRIPTION','AG_LAND_VALUE','AG_BLDG_VALUE','COM_LAND_VALUE','COM_BLDG_VALUE','RES_LAND_VALUE','RES_BLDG_VALUE','APP_AG_LAND_VALUE','APP_AG_BLDG_VALUE','APP_COM_LAND_VALUE','APP_COM_BLDG_VALUE','APP_RES_LAND_VALUE','APP_RES_BLDG_VALUE','TOTAL_APP_VALUE','TOTAL_VALUE','AG1_ACRES','AG2_ACRES','AG3_ACRES','AG4_ACRES','AG5_ACRES','AG6_ACRES','AG7_ACRES','AG8_ACRES','RES_ACRES','COM_ACRES','TAX_BILLED','AMBULANCE_CODE','AMBULANCE_NAME','AMBULANCE_AMT','COUNTY_CODE','COUNTY_NAME','COUNTY_AMT','CITY_MUNICIPALITY_CODE','CITY_MUNICIPALITY_NAME','CITY_MUNICIPALITY_AMT','FIRE_CODE','FIRE_NAME','FIRE_AMT','LIBRARY_CODE','LIBRARY_NAME','LIBRARY_AMT','OTHER_DISTRICT_CODE','OTHER_DISTRICT_NAME','OTHER_DISTRICT_AMT','ROAD_CODE','ROAD_NAME','ROAD_AMT','SCHOOL_CODE','SCHOOL_NAME','SCHOOL_AMT','STATE_CODE','STATE_NAME','STATE_AMT','COUNTY_RB_CODE','COUNTY_RB_NAME','COUNTY_RB_AMT','DRAINAGE_CODE','DRAINAGE_NAME','DRAINAGE_AMT','HEALTH_CENTER_CODE','HEALTH_CENTER_NAME','HEALTH_CENTER_AMT','NONCOLLECTABLE_CODE','NONCOLLECTABLE_NAME','NONCOLLECTABLE_AMT','NURSING_HOME_CODE','NURSING_HOME_NAME','NURSING_HOME_AMT','SENIOR_CENTER_CODE','SENIOR_CENTER_NAME','SENIOR_CENTER_AMT','SPECIAL_DISTRICT_CODE','SPECIAL_DISTRICT_NAME','SPECIAL_DISTRICT_AMT','SURTAX_CODE','SURTAX_NAME','SURTAX_AMT','SHELTERED_WKSHOP_CODE','SHELTERED_WKSHOP_NAME','SHELTERED_WKSHOP_AMT','TIF_DISTRICT_CODE','TIF_DISTRICT_NAME','TIF_DISTRICT_AMT','WATERSHED_CODE','WATERSHED_NAME','WATERSHED_AMT','YEAR_BUILT','BASE_AREA','MAIN_BASE_AREA','land_use','asr_neighborhood_code'],
            records:{
                0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?parcel_number={PARCEL_ID}"},
                1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?parcel_number={PARCEL_ID}"},
                2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?parcel_number={PARCEL_ID}"},
                3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?parcel_number={PARCEL_ID}"},
                4:{ disabled: false, name: "Project", add:"../../projects/edit/0?parcel_number={PARCEL_ID}"},
                5:{ disabled: false, name: "License", add:"../../licenses/edit/0?parcel_number={PARCEL_ID}"}
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

