<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="author" content="www.frebsite.nl"/>
    <meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=yes"/>

    <title>CIVICGov GIS - New Fair View</title>

    <!--    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link type="text/css" rel="stylesheet" href="css/demo.css"/>
    <link type="text/css" rel="stylesheet" href="../dist/mmenu.css"/>

    <!-- IE 10 and 11 polyfills -->
    <script src="https://polyfill.io/v3/polyfill.min.js?flags=gated&features=Array.prototype.filter%2CArray.prototype.forEach%2CArray.prototype.map%2CElement.prototype.cloneNode%2Cdocument.querySelector"></script>


    <style>
        #viewDiv {
            height: 95vh;
            /*width: 100vw;*/
        }

        #topbar {
            background: #fff;
            padding: 10px;
        }

        .content {
            padding: 0px;
        }

        .mm-menu {
            --mm-listitem-size: 50px;
            --mm-navbar-size: 50px;
        }

        @media (min-width: 992px) {
            /*.header a {*/
            /*display: none;*/
            /*}*/
        }

        .mm-navbar_tabs span {
            display: inline-block;
            margin-left: 8px;
        }

        @media (max-width: 450px) {
            .mm-navbar_tabs span {
                display: none;
            }
        }

        /*html,*/
        /*body,*/
        /*#viewDiv {*/
        /*padding: 0;*/
        /*margin: 0;*/
        /*height: 100%;*/
        /*width: 100%;*/
        /*}*/
        /*#results {*/
        /*font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;*/
        /*border-collapse: collapse;*/
        /*width: 100%;*/
        /*}*/

        /*#results td, #customers th {*/
        /*border: 1px solid #ddd;*/
        /*padding: 8px;*/
        /*font-size: smaller;*/
        /*width:50%;*/
        /*}*/

        /*#results tr:nth-child(even){background-color: #f2f2f2;}*/

        /*#results tr:hover {background-color: #ddd;}*/

        /*#results th {*/
        /*padding-top: 12px;*/
        /*padding-bottom: 12px;*/
        /*text-align: left;*/
        /*background-color: #4CAF50;*/
        /*color: white;*/
        /*}*/
        /*#attributes {*/
        /*font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;*/
        /*border-collapse: collapse;*/
        /*width: 100%;*/
        /*}*/

        /*#attributes td, #customers th {*/
        /*border: 1px solid #ddd;*/
        /*padding: 8px;*/
        /*}*/

        /*#attributes tr:nth-child(even){background-color: #f2f2f2;}*/

        /*#attributes td:hover {background-color: #ddd;}*/

        /*#attributes th {*/
        /*padding-top: 12px;*/
        /*padding-bottom: 12px;*/
        /*text-align: left;*/
        /*background-color: #3b678e;*/
        /*color: white;*/
        /*}*/
        /*#topbar {*/
        /*background: #fff;*/
        /*padding: 10px;*/
        /*}*/
        /*.action-button {*/
        /*font-size: 16px;*/
        /*background-color: transparent;*/
        /*border: 1px solid #D3D3D3;*/
        /*color: #6e6e6e;*/
        /*height: 32px;*/
        /*width: 32px;*/
        /*text-align: center;*/
        /*box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);*/
        /*}*/

        /*.action-button:hover,*/
        /*.action-button:focus {*/
        /*background: #0079c1;*/
        /*color: #e4e4e4;*/
        /*}*/

        /*.active {*/
        /*background: #0079c1;*/
        /*color: #e4e4e4;*/
        /*}*/
    </style>

    <style>
        .card {
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 100%;
            border-radius: 5px;
            margin-bottom: 20px;
            background-color: white;
        }

        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }

        img {
            border-radius: 5px 5px 0 0;
        }

        .container {
            padding: 2px 16px;
        }
    </style>

    <style>
        table, td, th {
            border: 1px solid black;
            text-align: center;
        }

        #attributes > tbody > tr > td > a {
            color: blue;
            text-decoration: underline;
            font-weight: 20;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        .mm-iconbar{
            background-color: #333;
            color: rgba(255,255,255,0.4);
        }

    </style>


    <link rel="stylesheet" href="https://js.arcgis.com/4.10/esri/css/main.css">
    <script src="lib/jquery.2.1.0.js"></script>
    <script src="lib/jquery-ui.js"></script>
    <script src="lib/jquery.touchSwipe.min.js"></script>
    <script src="https://js.arcgis.com/4.10/"></script>
    <script src="scripts/map.js"></script>
    <script src="scripts/style.js"></script>
    <script src="scripts/config.js"></script>
    <script src="scripts/custom_map.js"></script>
    <script src="scripts/controls_config.js"></script>
    <script>
        var assetNumber = "<?php echo isset($_GET['asset_number']) ? $_GET['asset_number'] : ''; ?>";
        map_config.ASSET_NUMBER = assetNumber;
    </script>


</head>
<body>
<div id="page">
    <div class="header" style="background-color: #333;">
        <?php if(!isset($_REQUEST['flag'])) { ?>
            <a href="#menu"><span></span></a>
        <?php } ?>
        CIVICGov GIS - New Fair View
        <span onclick="toggleLayers()" style="    margin-right: -40px;cursor: pointer;float: right !important;"><i class="fas fa-layer-group"></i> Layers</span>
    </div>
    <div class="content">
        <div id="viewDiv"></div>
        <div id="divSearch" style="position:absolute;top:30%;left:0%;width:25%;display: none">
            <input id="txtDistance" name="btnAb" placeholder="In US Feet" onkeyup=""/>
            <input type="button" name="btnAb" id="btnAbutter" value="Abutter"/>
            <br/>
            <input type="button" id="btnExportJSON" value="Show Results" style="display:none;"/>
            <input type="button" id="btnClearResults" value="Clear Results"/>
            <br/>
            <div id="divResults" style="background-color:whitesmoke;overflow-y:scroll;">

            </div>
            <div id="divLegend" style="overflow-y:scroll;background-color:white;">
            </div>
            <!--            <div id="divResultsAll"-->
            <!--                 style="font-size:small; height:200px; width:100%; overflow-y:scroll;background-color:white;">-->
            <!---->
            <!--            </div>-->
        </div>
        <div id="topbar">
            <p>Measure</p>
            <button class="action-button esri-icon-polyline" id="distanceButton" type="button"
                    title="Measure distance between two or more points"></button>
            <button class="action-button esri-icon-polygon" id="areaButton" type="button"
                    title="Measure area"></button>
        </div>
    </div>
    <nav id="menu" style="display: none">
        <div id="panel-menu">
            <!--            PARCEL SEARCH-->
            <div class="mm-searchfield">
                <div class="mm-searchfield__input">
                    <input type="text" autocomplete="off" id="Parcel" placeholder="Search Parcel..." onkeyup="handleSearch(this);">
                    <a class="mm-btn mm-btn_close mm-searchfield__btn mm-hidden" href="#"></a>
                </div>
            </div>

            <div class="mm-searchfield search_abutter" style="display: none">
                <div class="mm-searchfield__input">
                    <input type="text" autocomplete="off" id="btnAb" placeholder="Search Abbuter [In US Feet]..." onkeyup="handleSearch(this);">
                    <a class="mm-btn mm-btn_close mm-searchfield__btn mm-hidden" href="#"></a>
                </div>
            </div>

            <div style="padding: 40px; display: none;" id="divResultsAll">
                <p style="text-align: center; padding-top: 30px;">There are no search results for the keyword specified.<br/></p>
            </div>
            <div style="padding: 10px;" class="customResults">
                <p style="text-align: center; padding-top: 30px;">There are no search results for the keyword specified.<br/></p>
            </div>
        </div>

        <div id="panel-account">
            <!--            ADDRESS SEARCH-->
            <div class="mm-searchfield">
                <div class="mm-searchfield__input">
                    <input type="text" autocomplete="off" placeholder="Search Address..." id="Address" onkeyup="handleSearch(this);">
                    <a class="mm-btn mm-btn_close mm-searchfield__btn mm-hidden" href="#"></a>
                </div>
            </div>

            <div class="mm-searchfield search_abutter" style="display: none">
                <div class="mm-searchfield__input">
                    <input type="text" autocomplete="off" id="btnAb" placeholder="Search Abbuter [In US Feet]..." onkeyup="handleSearch(this);">
                    <a class="mm-btn mm-btn_close mm-searchfield__btn mm-hidden" href="#"></a>
                </div>
            </div>


            <div style="padding: 10px;" class="customResults">
                <p style="text-align: center; padding-top: 30px;">There are no search results for the keyword specified.<br/></p>
            </div>
        </div>

        <div id="panel-cart">
            <!--            OWNER SEARCH-->
            <div class="mm-searchfield">
                <div class="mm-searchfield__input">
                    <input type="text" autocomplete="off" placeholder="Search Owner..." id="Owner" onkeyup="handleSearch(this);">
                    <a class="mm-btn mm-btn_close mm-searchfield__btn mm-hidden" href="#"></a>
                </div>
            </div>

            <div class="mm-searchfield search_abutter" style="display: none">
                <div class="mm-searchfield__input">
                    <input type="text" autocomplete="off" id="btnAb" placeholder="Search Abbuter [In US Feet]..." onkeyup="handleSearch(this);">
                    <a class="mm-btn mm-btn_close mm-searchfield__btn mm-hidden" href="#"></a>
                </div>
            </div>

            <div style="padding: 10px;" class="customResults">
                <p style="text-align: center; padding-top: 30px;">There are no search results for the keyword specified.<br/></p>
            </div>
        </div>
    </nav>

    <?php if(isset($_GET['flag']) && $_GET['flag'] == '1'){ ?>
        <button style="margin-right: 10px; margin-bottom: 5px; float: right; align-self: flex-end;" onclick="saveAdjacent()">Save Parcels</button>
    <?php } ?>


    <!-- mmenu scripts -->
    <script src="../dist/mmenu.js"></script>
    <script src="../src/mmenu.debugger.js"></script>

    <script>

        <?php if(!isset($_REQUEST['flag'])) { ?>
        new Mmenu(document.querySelector('#menu'), {
            // extensions	: [ 'theme-dark', 'shadow-page' ],
            extensions: ['shadow-page'],
//            setSelected: true,
            counters: true,
            // searchfield : {
            //     placeholder		: 'Search ...'
            // },
            iconbar: {
                add: true,
                top: ['<a href="#/"><span class="fa fa-search"></span></a>'],
//                bottom: ['<a href="#/"><span class="fa fa-twitter"></span></a>', '<a href="#/"><span class="fa fa-facebook"></span></a>', '<a href="#/"><span class="fa fa-youtube"></span></a>']
            }, sidebar: {
                collapsed: {
                    use: '(min-width: 450px)', hideNavbar: false
                }, expanded: {
                    use: '(min-width: 992px)'
                }
            }, navbars: [// {
                //     content		: [ '','',  ]
                // },
                {
                    type: 'tabs',
                    content: ['<a href="#panel-menu"><i class="fa fa-home"></i> <span>Map #</span></a>', '<a href="#panel-account"><i class="fa fa-address-book"></i> <span>Address</span></a>', '<a href="#panel-cart"><i class="fa fa-user"></i> <span>Owner</span></a>', 'close']
                }, {
                    content: ['prev', 'breadcrumbs'] //, 'close' ]
                }, {
                    position: 'bottom',
                    content: ['<a href="http://mmenu.frebsite.nl/wordpress-plugin" target="_blank">&copy; 2019 Wagsys LLC. All rights reserved.</a>']
                }]
        }, {
            searchfield: {
                clear: true
            }, navbars: {
                breadcrumbs: {
                    removeFirst: true
                }
            }
        });
        document.addEventListener('click', function(evnt) {
            var anchor = evnt.target.closest('a[href^="#/"]');
            // if ( anchor ) {
            //     alert('Thank you for clicking, but that\'s a demo link.');
            //     evnt.preventDefault();
            // }
        })
        ;

        <?php } ?>

        function handleSearch(el) {
//            console.log(el.value, el.id);
            $("input[name="+el.id+"]").val(el.value);
        }

        $("#Parcel,#Address,#Owner,#btnAb").keypress(function (e) {
            var key = e.which;
            if(key == 13)  { // the enter key code
                $(".customResults").html('<img style="display:block;margin:auto;" src="loading.gif"></img><h3 style="text-align: center; ">Please Wait ...</h3>');
                console.log($('input[name = ' + $(this).attr("id") + ']').val($(this).val()));
                $('input[name = ' + $(this).attr("id") + ']').val($(this).val()).click();
                return false;
            }
        });

    </script>


    <script>
        $('#divResultsAll').bind('contentchanged', function() {
            $(".customResults").html("");
            // do something after the div content has changed
            //To convert output to json
            var myTable = [];
            $('#attributes tr').each(function (i, tr) {
                var myTr = [];
                $('td', tr).each(function(j, td) {
                    myTr.push($(td).html());
                });
                myTable.push(myTr);
            });

            //Removing odd indexes
            tableData =  myTable.filter((value, index) => !(index%2));


            //Loop throught the tableData
            for(var i = 0; i < tableData.length; i++){
                data = tableData[i][0].split('<br>');
                datalen = data.length;
                data[datalen] = data[datalen-1].substr(data[datalen-1].indexOf("<div>"));
                data[datalen-1] = data[datalen-1].substr(0, data[datalen-1].indexOf("<div>"));
//                console.log(data);

                var div = '';

//                var parcel_id = '';

                for(var j = 0; j < data.length; j++){
                    if(data[j].indexOf("Parcel ID") > -1){
                        var parcel_id = "'" + data[j].substr(data[j].indexOf(":") + 1).trim() + "'";
                    }
                    div = div + '<b>'+data[j]+'</b></br>'


                    //TO REMOVE BLANK CARDS
                    if(data[j] == ">" || data[j] == "&gt;"){
                        div = ""
                    }

                }

                //CHECK FOR BLANK CARDS
                if(div !== ""){
                    $(".customResults").append('<div style="cursor: pointer" class="card" onclick="openParcel('+parcel_id+')"><div class="container" style="padding-top: 25px;">' +
                        div +
                        '</div></div>');
                }


            }

            if($(".customResults:first .card").length == 1){
                $(".search_abutter").show();
            }
            else {
                $(".search_abutter").hide();
            }

        });


        function openParcel(pid) {
            $("#Parcel").val(pid)
            setTimeout(function(){
                var e = $.Event( "keypress", { which: 13 } );
                $('#Parcel').trigger(e);
            },100)
        }

        function toggleLayers() {
            $("#viewDiv > div.esri-view-root > div.esri-ui > div.esri-ui-inner-container.esri-ui-corner-container > div.esri-ui-top-right.esri-ui-corner").toggle()
        }

        <?php if(isset($_REQUEST['flag']) && $_REQUEST['flag'] == '1') { ?>
        setTimeout(function () {
            toggleLayers();
        },2000)

        <?php } ?>





    </script>

    <script>
        function saveAdjacent() {
            var parcels_arr = JSON.parse($("#divResults").text());
            var filteredAry = parcels_arr.filter(function(e) { return e !== <?php echo "'".$_GET['asset_number']."'";?> });
            var parcels = filteredAry.join();
            if(parcels != undefined && parcels != ''){
                $.ajax({
                    url: window.parent.BICES.Options.baseurl + '/parcels/saveadjacent', dataType: 'text', type: 'POST',
                    data: { <?php  echo  isset($_GET['asset_number'])? "parcel_number :".$_GET['asset_number']." ,":"";?> parcels : parcels },
                    success: function(adjacents) {
                        window.parent.loadAdjacents();
                        alert('Parcels Adjacent Saved');
                        window.parent.$.fancybox.close();
                    },
                    error: function() {
                        $('#status_area').html('ERROR! Cannot Save for adjacent parcels. Please try again later ...');
                    }
                });
            }else{
                alert("Please ensure parcels have been selected using the drawing tools. Also ensure to double tap to commit your selection");
            }
        }
    </script>

</div>
</body>
</html>
