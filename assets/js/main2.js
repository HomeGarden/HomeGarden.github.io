        var channelID = 622900;
      var readKey = "ZBHS3SWDRSROL3IU"; 
      var writeKey = "L1FF82EJCT9ZX4G0"; 
      var cityName = "Lille";

      var dataField1; /* Thinkspeak data: Temperature DHT */
      var dataField2; /* Thinkspeak data: Humidity DHT */
      var dataField3; /* Thinkspeak data: Luminosity - LDR (0% -Dark ==> 100% Full clear) */
      var dataField4; /* Thinkspeak data: Soil Humidity */
      var dataField5; /* Thinkspeak data: Echo from Device 1 commanded by Field 7 */
      var dataField6; /* Thinkspeak data: Echo from Device 2 commanded by Field 8 */
      var dataField7; /* Thinkspeak data: Command to device 1*/
      var dataField8; /* Thinkspeak data: Command to device 2*/

      var localDate;
      var localTemp;
      var generalCond;
      var localHum;
      var localPress;
      var localWindSpeed;
      var localWindTemp; 
      google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);


      function getCityData() {
         cityName = document.getElementById('cityNameInput').value;
         getLocalWeatherData(cityName); 

        var localCityName = document.getElementById("cityNameInput").value;
        getLocalWeatherData(localCityName);
        cityName = localCityName;
     }

      
   /* Functions to change data at ThingSpeak fields */      
      
      function changeField7(data) {
        $(document).ready(function(){
            $.post("https://api.thingspeak.com/update?",
            {
              api_key: "L1FF82EJCT9ZX4G0",
              field7: data
            },
            function(){
          });
        alert ("Sent: "+data+" to field 7");
        });
      }

      function changeField8(data) {
        $(document).ready(function(){
            $.post("https://api.thingspeak.com/update.json",
            {
              api_key: "L1FF82EJCT9ZX4G0",
              field8: data
            },
            function(){
          });
        alert ("Sent: "+data+" to field 8");
        });
      }


    /* Functions to change color of Digital sensors */      
      
      function displayDigInfo1(msg){
          x=document.getElementById("act1");
          if (msg == 1) {x.className="on";}
          else {x.className="off";}
      }
      
      function displayDigInfo2(msg){
          x=document.getElementById("echoAct1");
          if (msg == 1) {x.className="on";}
          else {x.className="off";}
      }
      
      function displayDigInfo3(msg){
          x=document.getElementById("act2");
          if (msg == 1) {x.className="on";}
          else {x.className="off";}
      }

      function displayDigInfo4(msg){
          x=document.getElementById("echoAct2");
          if (msg == 1) {x.className="on";}
          else {x.className="off";}
      }
    /* Function to get data from Yahoo Wether Channel */
     function getLocalWeatherData(cityName) {
      $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast ' +
            'where woeid in (select woeid from geo.places(1) where text="'+cityName+'")&format=json', function (data) {
          console.log(data);
          localDate = (data.query.results.channel.item.condition.date);
          generalCond = (data.query.results.channel.item.condition.text);
          localTemp   = (data.query.results.channel.item.condition.temp-32.00)/1.80;
            localTemp = Math.round(localTemp);
          
          var wind = data.query.results.channel.wind;
            localWindSpeed = wind.speed*1.609344;
            localWindSpeed = Math.round(localWindSpeed);
            localWindDir = wind.direction;
            localWindDir = Math.round(localWindDir);
            localWindTemp = (wind.chill-32.00)/1.80;
            localWindTemp = Math.round(localWindTemp);
          
          
          var atmosphere = data.query.results.channel.atmosphere;
            localHum = atmosphere.humidity;
            localPress = (atmosphere.pressure);
            localPress = Math.round(localPress);
                
          //document.getElementById('local_weather').innerHTML = "Local City: " + cityName;
          document.getElementById('local_weather1').innerHTML = "At " +localDate+ " Weather is: " + generalCond;
          document.getElementById('local_weather2').innerHTML = "Temperature: " +localTemp + " oC.       Humidity: " + localHum + " %.       Pressure: " + localPress + " milibars.";            
          document.getElementById('local_weather3').innerHTML = "Wind Speed: " +localWindSpeed+ " Km/h. Wind Dir: " +localWindDir+ "o. Wind Temp: " +localWindTemp+ "oC";            
        
          x=document.getElementById("localWeather");
          if (generalCond == "Cloudy" || generalCond == "Partially Cloudy") {x.className="cloudy";}
          else if (generalCond == "Clear") {x.className="clear";}
          else if (generalCond == "Showers") {x.className="showers";}
          else {x.className="general";}
          

        });
      }

    /* Functions to get data from ThingSpeak fields */
      
      function getAllChannelDataTS(){
        getDataField1();
        getDataField2();
        getDataField3();
        getDataField4();
        getDataField5();
        getDataField6();
        getDataField7();
        getDataField8();
      }

      function getDataField1() {           
            $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/1/last.json?apikey='+readKey+'&callback=?', function(data) {          
                dataField1 = data.field1;
                if (dataField1) {
                    dataField1 = (dataField1/1);
                }          
            });
            return dataField1;
      }

      function getDataField2() {
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/2/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField2 = data.field2;
            if (dataField2) {
                dataField2 = (dataField2/1);
            }          
        });
        return dataField2;
      }

      function getDataField3() {
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/3/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField3 = data.field3;
            if (dataField3) {
                dataField3 = (dataField3/1);
            }          
        });
        return dataField3;
      }

      function getDataField4() {        
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/4/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField4 = (data.field4);
            if (dataField4) {
                dataField4 = (dataField4/1);
            }          
        });
        return dataField4;
      }

      function getDataField5() {  
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/5/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField5 = data.field5;
            if (dataField5) {
                ddataField5 = (dataField5/1);
            }          
        });
        return dataField5;
      }

      function getDataField6() {        
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/6/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField6 = data.field6;
            if (dataField6) {
                ddataField6 = (dataField6/1);
            }          
        });
        return dataField6;
      }

      function getDataField7() {      
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/7/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField7 = data.field7;
            if (dataField7) {
                ddataField7 = (dataField7/1);
            }          
        });
        return dataField7;
      }

      function getDataField8() {       
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/8/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField8 = data.field8;
            if (dataField8) {
                ddataField8 = (dataField8/1);
            }          
        });
        return dataField8;
      }


        google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Temperature', 80],
          ['Humidity', 55],
          ['Network', 68]
        ]);

        var options = {
          width: 400, height: 120,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

        chart.draw(data, options);

        setInterval(function() {
          data.setValue(0, 1, getDataField1());
          chart.draw(data, options);
        }, 13000);
        setInterval(function() {
          data.setValue(1, 1, getDataField2());
          chart.draw(data, options);
        }, 5000);
        setInterval(function() {
          data.setValue(2, 1, 35);
          chart.draw(data, options);
        }, 26000);
      }


      <script>
    var myConfig = {
      backgroundColor: "#fff",
      globals: {
        color: "#666"
      },
      graphset: [{
        type: "gauge",
        x: 0,
        y: 0,
        width: "31.5%",
        height: "50%",
        "media-rules": [{
          "max-width": 650,
          "x": 0,
          "y": "2%",
          "width": '100%',
          "height": "20%",
        }, {
          "min-width": 651,
          x: 0,
          y: 0,
          width: "31.5%",
          height: "50%",
        }],
        title: {
          text: "Energy Output",
          "media-rules": [{
            "max-width": 650,
            "visible": false
          }]
        },
        scaleR: {
          aperture: 130,
          values: "0:40:10",
          guide: {
            backgroundColor: "#E3DEDA",
            alpha: 1
          },
          ring: {
            backgroundColor: "#E3DEDA",
            "media-rules": [{
              "max-width": 650,
              "visible": false
            }]
          },
          center: {
            size: 20,
            borderWidth: 2,
            borderColor: "#23211E",
            "media-rules": [{
              "max-width": 650,
              "size": 10
            }]
          },
          item: {
            offsetR: 0
          },
          tick: {
            visible: false
          },
          markers: [{
            type: "area",
            range: [0, 35],
            backgroundColor: "#00AE4D",
            alpha: .95,
          }]
        },
        plotarea: {
          marginTop: "35%"
        },
        plot: {
          csize: "3%",
          size: "100%"
        },
        scale: {
          sizeFactor: 1.2,
          "media-rules": [{
            "max-width": 650,
            sizeFactor: 1.6,
          }]
        },
        tooltip: {
          visible: false
        },
        series: [{
          values: [35],
          backgroundColor: "#23211E",
          valueBox: {
            text: "%v",
            placement: "center",
            fontColor: "#00AE4D",
            fontSize: 14,
            "media-rules": [{
              "max-width": 650,
              "fontSize": 10
            }]
          }
        }]
      }, {
        type: "gauge",
        x: "34.5%",
        y: 0,
        width: "31.5%",
        height: "50%",
        "media-rules": [{
          "max-width": 650,
          "x": 0,
          "y": "20%",
          "width": '100%',
          "height": "20%",
        }, {
          "min-width": 651,
          x: "34.5%",
          y: 0,
          width: "31.5%",
          height: "50%",
        }],
        title: {
          text: "Energy Recycled",
          "media-rules": [{
            "max-width": 650,
            "visible": false
          }]
        },
        scaleR: {
          aperture: 130,
          values: "0:20:5",
          guide: {
            backgroundColor: "#E3DEDA",
            alpha: 1
          },
          ring: {
            backgroundColor: "#E3DEDA",
            "media-rules": [{
              "max-width": 650,
              "visible": false
            }]
          },
          center: {
            size: 20,
            borderWidth: 2,
            borderColor: "#23211E",
            "media-rules": [{
              "max-width": 650,
              "size": 10
            }]
          },
          item: {
            offsetR: 0
          },
          tick: {
            visible: false
          },
          markers: [{
            type: "area",
            range: [0, 11],
            backgroundColor: "#E2D51A",
            alpha: .95,
          }]
        },
        plotarea: {
          marginTop: "35%"
        },
        plot: {
          csize: "3%",
          size: "100%"
        },
        scale: {
          sizeFactor: 1.2,
          "media-rules": [{
            "max-width": 650,
            sizeFactor: 1.6,
          }]
        },
        tooltip: {
          visible: false
        },
        series: [{
          values: [11],
          backgroundColor: "#23211E",
          valueBox: {
            text: "%v",
            placement: "center",
            fontColor: "#E2D51A",
            fontSize: 14,
            "media-rules": [{
              "max-width": 650,
              "fontSize": 10
            }]
          }
        }]
      }, {
        type: "gauge",
        x: "69%",
        y: 0,
        width: "31.5%",
        height: "50%",
        "media-rules": [{
          "max-width": 650,
          "x": 0,
          "y": "40%",
          "width": '100%',
          "height": "20%",
        }, {
          "min-width": 651,
          "x": "69%",
          "y": 0,
          "width": "31.5%",
          "height": "50%",
        }],
        title: {
          text: "Energy Consumed",
          "media-rules": [{
            "max-width": 650,
            "visible": false
          }]
        },
        scaleR: {
          aperture: 130,
          values: "0:100:25",
          guide: {
            backgroundColor: "#E3DEDA",
            alpha: 1
          },
          ring: {
            backgroundColor: "#E3DEDA",
            "media-rules": [{
              "max-width": 650,
              "visible": false
            }]
          },
          center: {
            size: 20,
            borderWidth: 2,
            borderColor: "#23211E",
            "media-rules": [{
              "max-width": 650,
              "size": 10
            }]
          },
          item: {
            offsetR: 0
          },
          tick: {
            visible: false
          },
          markers: [{
            type: "area",
            range: [0, 28],
            backgroundColor: "#FB301E",
            alpha: .95,
          }]
        },
        plotarea: {
          marginTop: "35%"
        },
        plot: {
          csize: "3%",
          size: "100%"
        },
        scale: {
          sizeFactor: 1.2,
          "media-rules": [{
            "max-width": 650,
            sizeFactor: 1.6,
          }]
        },
        tooltip: {
          visible: false
        },
        series: [{
          values: [28],
          backgroundColor: "#23211E",
          valueBox: {
            text: "%v",
            placement: "center",
            fontColor: "#FB301E",
            fontSize: 14,
            "media-rules": [{
              "max-width": 650,
              "fontSize": 10
            }]
          }
        }]
      }, {
        type: "line",
        title: {
          text: "Meter History",
          adjustLayout: true,
          "media-rules": [{
            "max-width": 650,
            "fontSize": 14
          }]
        },
        x: 0,
        y: "45%",
        width: "100%",
        height: "55%",
        "media-rules": [{
          "max-width": 650,
          "x": 0,
          "y": "60%",
          "width": '100%',
          "height": "40%%",
        }],
        scaleX: {
          minValue: 1373045400000,
          step: 3000,
          transform: {
            type: "date",
            all: "%D<br>%H:%i:%s"
          }
        },
        "scale-y": {
          values: "0:100:25",
          placement: "default",
          lineColor: "#FB301E",
          tick: {
            lineColor: "#FB301E"
          },
          item: {
            fontColor: "#FB301E",
            bold: true
          }
        },
        "scale-y-2": {
          values: "0:20:5",
          placement: "default",
          lineColor: "#E2D51A",
          tick: {
            lineColor: "#E2D51A"
          },
          item: {
            fontColor: "#E2D51A",
            bold: true
          }
        },
        "scale-y-3": {
          values: "0:40:10",
          placement: "default",
          lineColor: "#00AE4D",
          tick: {
            lineColor: "#00AE4D",
          },
          item: {
            fontColor: "#00AE4D",
            bold: true
          }
        },
        plotarea: {
          margin: "dynamic",
          marginRight: "4%"
        },
        crosshairX: {
          lineColor: "#23211E",
          scaleLabel: {
            backgroundColor: "#E3DEDA",
            fontColor: "#414042"
          },
          plotLabel: {
            backgroundColor: "#f0ece8",
            fontColor: "#414042",
            borderWidth: 1,
            borderColor: "#000"
          }
        },
        tooltip: {
          visible: false
        },
        series: [{
          values: [35, 38, 40, 35, 38, 40, 35, 38, 40],
          lineColor: "#00AE4D",
          text: "Energy Output",
          scales: "scale-x, scale-y-3",
          marker: {
            borderWidth: 2,
            borderColor: "#00AE4D",
            backgroundColor: "#fff",
            type: "circle"
          }
        }, {
          values: [11, 15, 19, 11, 15, 19, 11, 15, 19],
          lineColor: "#E2D51A",
          text: "Energy Recycled",
          scales: "scale-x, scale-y-2",
          marker: {
            borderWidth: 2,
            borderColor: "#E2D51A",
            backgroundColor: "#fff",
            type: "triangle",
            size: 5
          }
        }, {
          values: [28, 21, 30, 28, 21, 30, 28, 21, 30],
          lineColor: "#FB301E",
          text: "Energy Consumed",
          scales: "scale-x, scale-y",
          marker: {
            borderWidth: 2,
            borderColor: "#FB301E",
            backgroundColor: "#fff",
            type: "square"
          }
        }]
      }]
    };

    zingchart.render({
      id: 'myChart',
      data: myConfig,
      height: "100%",
      width: '100%'
    });

    /*
     * SetInterval is used to simulate live input. We also have
     * a feed attribute that takes in http requests, websockets,
     * and return value from a JS function.
     */
    setInterval(function() {
      var colors = ['#00AE4D', '#E2D51A', '#FB301E'];
      var Marker = function(bgColor, ceiling) {
        return {
          type: "area",
          range: [0, ceiling],
          backgroundColor: bgColor,
          alpha: .95,
        }
      };
      var randomOffset0 = [-5, 5, 3, -3, 2, -2];
      var randomOffset1 = [10, -10, -5, 5, 3, -3, 2, -2, 7, -7];
      var output0 = Math.ceil(33 + randomOffset0[Math.floor(Math.random() * 6)]);
      var output1 = Math.ceil(11 + randomOffset0[Math.floor(Math.random() * 6)]);
      var output2 = Math.ceil(22 + randomOffset1[Math.floor(Math.random() * 9)]);

      // 1) update gauge values
      zingchart.exec('myChart', 'appendseriesdata', {
        graphid: 0,
        plotindex: 0,
        update: false,
        data: {
          values: [output0]
        }
      });
      zingchart.exec('myChart', 'appendseriesdata', {
        graphid: 1,
        plotindex: 0,
        update: false,
        data: {
          values: [output1]
        }
      });
      zingchart.exec('myChart', 'appendseriesdata', {
        graphid: 2,
        plotindex: 0,
        update: false,
        data: {
          values: [output2]
        }
      });

      // 2) update guage markers
      zingchart.exec('myChart', 'modify', {
        graphid: 0,
        update: false,
        data: {
          scaleR: {
            markers: [
              Marker(colors[0], output0)
            ]
          }
        }
      });
      zingchart.exec('myChart', 'modify', {
        graphid: 1,
        update: false,
        data: {
          scaleR: {
            markers: [
              Marker(colors[1], output1)
            ]
          }
        }
      });
      zingchart.exec('myChart', 'modify', {
        graphid: 2,
        update: false,
        data: {
          scaleR: {
            markers: [
              Marker(colors[2], output2)
            ]
          }
        }
      });

      // 3) update line graph
      zingchart.exec('myChart', 'appendseriesvalues', {
        graphid: 3,
        update: false,
        values: [
          [output0],
          [output1],
          [output2]
        ]
      });

      // batch update all chart modifications
      zingchart.exec('myChart', 'update');

    }, 1500);
  
