var map_config = {
    WEB_MAP_ID: '9f8efc2922de49f7beb10aba5f725a96', //#1
   //WEB_MAP_ID:"6ff64a259999443181ca98e04eb4f631",
   // ASSET_ID: 'MBL',
   // FIELDS: ["MBL", "LOCATION",],
   // FIELD_ALIAS:["MBL#", "ADDRESS"],
    ASSET_NUMBER:'',
    ASSET_TYPE:'',
	search:{
        //url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Buildings/MapServer/0",		
        url:"https://newgis.nashuanh.gov/arcgisapp3/rest/services/WFS/Nashua_RoadCL/MapServer/0",
		keyField:"SEGMENT_ID", //This key link to the Parcel Layer
		keyFieldType:"number",
        FIELDS: ['SEGMENT_ID',"ROADNAME" ], //"STREETNAME","STREETTYPE"
        //FIELD_ALIAS:["Building ID","Building Name", "Address","Building Type", "Building Use"],
        FIELD_ALIAS:["Segment ID","Road Name"], //"Street", "Street Type"
        civicgovField: "SEGMENT_ID", civicgovFieldType:"number",
        parcelLinkField: "SEGMENT_ID", parcelLinkFieldType:"number",
        records:{
            0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?",params:[['asset_number','SEGMENT_ID']]},
            1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?",params:[['asset_number','SEGMENT_ID']]},
            2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?",params:[['asset_number','SEGMENT_ID']]},
            3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?",params:[['asset_number','SEGMENT_ID']]},
            4:{ disabled: false, name: "Project", add:"../../projects/edit/0?",params:[['asset_number','SEGMENT_ID']]},
            5:{ disabled: false, name: "License", add:"../../projects/edit/0?",params:[['asset_number','SEGMENT_ID']]}
        }
	},
    layers:{
        0:{
            name:"Parcels",            
            selectable:true, 					
            //keyField:"PID",
            keyField:"AssessProCopy.dbo.vwNashIMS.PID",
            keyFieldType:"text",    
            legendColor:'#FFEBAF',
            legendText:'Parcels',			 
           // Link_Field:"AssessProCopy.dbo.vwNashIMS.PID",
            //Link_Field_Type:"text",
            fields:["NashuaGISReplica.GISOWNER.Parcels_Poly.OBJECTID","NashuaGISReplica.GISOWNER.Parcels_Poly.PID","NashuaGISReplica.GISOWNER.Parcels_Poly.X","NashuaGISReplica.GISOWNER.Parcels_Poly.Y","NashuaGISReplica.GISOWNER.Parcels_Poly.PACCT","NashuaGISReplica.GISOWNER.Parcels_Poly.GlobalID","NashuaGISReplica.GISOWNER.Parcels_Poly.acres","NashuaGISReplica.GISOWNER.Parcels_Poly.Shape","Shape.STAre","Shape.STLengt","AssessProCopy.dbo.vwNashIMS.PACCT","AssessProCopy.dbo.vwNashIMS.PID","AssessProCopy.dbo.vwNashIMS.SHEET","AssessProCopy.dbo.vwNashIMS.LOT","AssessProCopy.dbo.vwNashIMS.LOCATION","AssessProCopy.dbo.vwNashIMS.HNUM","AssessProCopy.dbo.vwNashIMS.STREET","AssessProCopy.dbo.vwNashIMS.OWNER1","AssessProCopy.dbo.vwNashIMS.OWNER2","AssessProCopy.dbo.vwNashIMS.MADDRESS","AssessProCopy.dbo.vwNashIMS.CSZ","AssessProCopy.dbo.vwNashIMS.LVAL","AssessProCopy.dbo.vwNashIMS.BVAL","AssessProCopy.dbo.vwNashIMS.TVAL","AssessProCopy.dbo.vwNashIMS.B_AREA","AssessProCopy.dbo.vwNashIMS.L_SQFT","AssessProCopy.dbo.vwNashIMS.T_ACRES","AssessProCopy.dbo.vwNashIMS.DEED_DATE","AssessProCopy.dbo.vwNashIMS.BOOK_PAGE","AssessProCopy.dbo.vwNashIMS.USECODE","AssessProCopy.dbo.vwNashIMS.NUMOFUNITS","AssessProCopy.dbo.vwNashIMS.STYLE","AssessProCopy.dbo.vwNashIMS.MODEL","AssessProCopy.dbo.vwNashIMS.SALE_PR","AssessProCopy.dbo.vwNashIMS.QUALIFY","AssessProCopy.dbo.vwNashIMS.ANUM"],
            displayFieldNames:["OBJECTID","PID","X","Y","PACCT","GlobalID","acres","Shape","Shape.STAre","Shape.STLengt","PACCT","PID","SHEET","LOT","LOCATION","HNUM","STREET","OWNER1","OWNER2","MADDRESS","CSZ","LVAL","BVAL","TVAL","B_AREA","L_SQFT","T_ACRES","DEED_DATE","BOOK_PAGE","USECODE","NUMOFUNITS","STYLE","MODEL","SALE_PR","QUALIFY","ANUM"],
            records:{
                0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?",params:[['parcel_number','NashuaGISReplica.GISOWNER.Parcels_Poly.PACCT']]},
                1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?",params:[['parcel_number','NashuaGISReplica.GISOWNER.Parcels_Poly.PACCT']]},
                2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?",params:[['parcel_number','NashuaGISReplica.GISOWNER.Parcels_Poly.PACCT']]},
                3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?",params:[['parcel_number','NashuaGISReplica.GISOWNER.Parcels_Poly.PACCT']]},
                4:{ disabled: false, name: "Project", add:"../../projects/edit/0?",params:[['parcel_number','NashuaGISReplica.GISOWNER.Parcels_Poly.PACCT']]},
                5:{ disabled: false, name: "License", add:"../../projects/edit/0?",params:[['parcel_number','NashuaGISReplica.GISOWNER.Parcels_Poly.PACCT']]}

                // 0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?parcel_number={NashuaGISReplica.GISOWNER.Parcels_Poly.PID}"},
                // 1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?parcel_number={NashuaGISReplica.GISOWNER.Parcels_Poly.PID}"},
                // 2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?parcel_number={NashuaGISReplica.GISOWNER.Parcels_Poly.PID}"},
                // 3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?parcel_number={NashuaGISReplica.GISOWNER.Parcels_Poly.PID}"},
                // 4:{ disabled: false, name: "Project", add:"../../projects/edit/0?parcel_number={NashuaGISReplica.GISOWNER.Parcels_Poly.PID}"},
                // 5:{ disabled: false, name: "License", add:"../../licenses/edit/0?parcel_number={NashuaGISReplica.GISOWNER.Parcels_Poly.PID}"}
            },
            addRecord: true
        },
        1:{
            name:"Road",           
            selectable:true,
            keyField:"SEGMENT_ID",
            keyFieldType:"text", 
			legendColor:'#CD8966',
            legendText:'Road',
            fields:["OBJECTID","ROADNAME","TYPE","PREFIX","STREETNAME","STREETTYPE","SUFFIX","SEGMENT_ID","LOW_L","HIGH_L","LOW_R","HIGH_R","ONE_WAY","GlobalID","CODE","FCC","US_Route","ST_Route","City","State",],
            displayFieldNames:["OBJECTID","ROADNAME","TYPE","PREFIX","STREETNAME","STREETTYPE","SUFFIX","SEGMENT_ID","LOW_L","HIGH_L","LOW_R","HIGH_R","ONE_WAY","GlobalID","CODE","FCC","US_Route","ST_Route","City","State"],
            records:{
                0:{ disabled: false, name:"Permit", add:"../../permits/edit/0?",params:[['asset_number','SEGMENT_ID']]},
                1:{ disabled: false, name:"Complaint", add:"../../complaints/edit/0?",params:[['asset_number','SEGMENT_ID']]},
                2:{ disabled: false, name:"Inspection", add:"../../inspections/edit/0?",params:[['asset_number','SEGMENT_ID']]},
                3:{ disabled: false, name:"Violation", add:"../../violations/edit/0?",params:[['asset_number','SEGMENT_ID']]},
                4:{ disabled: false, name: "Project", add:"../../projects/edit/0?",params:[['asset_number','SEGMENT_ID']]},
                5:{ disabled: false, name: "License", add:"../../projects/edit/0?",params:[['asset_number','SEGMENT_ID']]}
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

