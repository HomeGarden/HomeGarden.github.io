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

      var field8;

      var localDate;
      var localTemp;
      var generalCond;
      var localHum;
      var localPress;
      var localWindSpeed;
      var localWindTemp; 

 


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
          document.getElementById('local_weather1').innerHTML = "Le " +localDate+ " Le temps est : " + generalCond;
          document.getElementById('local_weather2').innerHTML = "Temperature: " +localTemp + " °C.       Humidité de l'air: " + localHum + " %.       Pression: " + localPress + " milibars.";            
          document.getElementById('local_weather3').innerHTML = "Vitesse du Vent: " +localWindSpeed+ " Km/h. Wind Dir: " +localWindDir+ "°. Wind Temp: " +localWindTemp+ "°C";            
        
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
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/7/last.json?apikey='+readKey+'&callback=?', function(data) {          
            field8= data.entry_id;
            if (dataField8) {
                ddataField8 = (dataField8/1);
            }          
        });
        return field8;
      }




      document.getElementById("pp").innerHTML = getDataField8();


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


  document.addEventListener("DOMContentLoaded", function(event) {

    var dflt = {
      min: 0,
      max: 200,
      donut: true,
      gaugeWidthScale: 0.6,
      counter: true,
      hideInnerShadow: true
    }

    var gg1 = new JustGage({
      id: 'gg1',
      value: getDataField1(),
      title: 'Temperature',
       min: 0,
        max: 60,
        symbol: ' °C',
        pointer: true,
        pointerOptions: {
          toplength: -15,
          bottomlength: 10,
          bottomwidth: 12,
          color: 'orange',
          stroke: 'white',
          stroke_width: 3,
          stroke_linecap: 'round'
        },
        gaugeWidthScale: 0.6,
        customSectors: [{
        color : "orange",
        lo : 0,
        hi : 50
      },{
        color : "orange",
        lo : 50,
        hi : 100
      }],
        counter: true
    });

    var gg2 = new JustGage({
      id: 'gg2',
      value: getDataField2(),
      title: 'Humidity',
      min: 0,
        max: 100,
        symbol: ' %',
        pointer: true,
        pointerOptions: {
          toplength: -15,
          bottomlength: 10,
          bottomwidth: 12,
          color: 'blue',
          stroke: 'white',
          stroke_width: 3,
          stroke_linecap: 'round'
        },
        gaugeWidthScale: 0.6,
        customSectors: [{
        color : "blue",
        lo : 0,
        hi : 50
      },{
        color : "blue",
        lo : 50,
        hi : 100
      }],
      counter: true
      });

    var gg3 = new JustGage({
      id: 'gg3',
      value: getDataField3(),
      title: 'Luminosité',
      min: 0,
        max: 700,
        symbol: ' %',
        pointer: true,
        pointerOptions: {
          toplength: -15,
          bottomlength: 10,
          bottomwidth: 12,
          color: '#8e8e93',
          stroke: '#ffffff',
          stroke_width: 3,
          stroke_linecap: 'round'
        },
        gaugeWidthScale: 0.6,
        customSectors: [{
        color : "yellow",
        lo : 0,
        hi : 50
      },{
        color : "yellow",
        lo : 50,
        hi : 100
      }],
      counter: true
      });

    var gg4 = new JustGage({
      id: 'gg4',
      value: getDataField4(),
      title: 'Niveau d eau',
      min: 0,
        max: 15000,
        symbol: ' %',
        pointer: true,
        pointerOptions: {
          toplength: -15,
          bottomlength: 10,
          bottomwidth: 12,
          color: '#8e8e93',
          stroke: '#ffffff',
          stroke_width: 3,
          stroke_linecap: 'round'
        },
        gaugeWidthScale: 0.6,
        customSectors: [{
        color : "blue",
        lo : 0,
        hi : 50
      },{
        color : "blue",
        lo : 50,
        hi : 100
      }],
      counter: true
      });
    var gg5 = new JustGage({
      id: 'gg5',
      value: getDataField5(),
      title: 'Niveau d eau',
      min: 0,
        max: 150000,
        symbol: ' %',
        pointer: true,
        pointerOptions: {
          toplength: -15,
          bottomlength: 10,
          bottomwidth: 12,
          color: '#8e8e93',
          stroke: '#ffffff',
          stroke_width: 3,
          stroke_linecap: 'round'
        },
        gaugeWidthScale: 0.6,
        customSectors: [{
        color : "#00ff00",
        lo : 0,
        hi : 50
      },{
        color : "#ff0000",
        lo : 50,
        hi : 100
      }],
      counter: true
      });

    var gg6 = new JustGage({
      id: 'gg6',
      value: getDataField6(),
      title: 'Niveau d eau',
      min: 0,
        max: 7000,
        symbol: ' %',
        pointer: true,
        pointerOptions: {
          toplength: -15,
          bottomlength: 10,
          bottomwidth: 12,
          color: '#8e8e93',
          stroke: '#ffffff',
          stroke_width: 3,
          stroke_linecap: 'round'
        },
        gaugeWidthScale: 0.6,
        customSectors: [{
        color : "#00ff00",
        lo : 0,
        hi : 50
      },{
        color : "#ff0000",
        lo : 50,
        hi : 100
      }],
      counter: true
      });

    var gg7 = new JustGage({
      id: 'gg7',
      value: getDataField7(),
      title: 'Activation pompe',
      min: 0,
        max: 1,
        symbol: ' ',
        pointer: true,
        pointerOptions: {
          toplength: -15,
          bottomlength: 10,
          bottomwidth: 12,
          color: '#8e8e93',
          stroke: '#ffffff',
          stroke_width: 3,
          stroke_linecap: 'round'
        },
        gaugeWidthScale: 0.6,
        customSectors: [{
        color : "#FF2D00  ",
        lo : 0,
        hi : 0
      },{
        color : "#00FF1B",
        lo : 1,
        hi : 1
      }],
      counter: true
      });
    

    setInterval(function() {
        gg1.refresh(getDataField1());
        gg2.refresh(getDataField2());
        gg3.refresh(getDataField3());
        gg4.refresh(getDataField4());
         gg5.refresh(getDataField5());
          gg6.refresh(getDataField6());
          gg7.refresh(getDataField7());
          getDataField8();
      }, 5000);

  });


