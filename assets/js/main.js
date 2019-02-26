/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

				// Fix.
					if (browser.name == 'ie'
					||	browser.mobile)
						$this
							.css('max-height', '10em')
							.css('overflow-y', 'auto');

			});

	// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					if (href == '#menu')
						return;

					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);

      var dataField1; /* Thinkspeak data: Temperature DHT */
      var dataField2; /* Thinkspeak data: Humidity DHT */
      var dataField3; /* Thinkspeak data: Luminosity - LDR (0% -Dark ==> 100% Full clear) */
      var dataField4; /* Thinkspeak data: Soil Humidity */
      var dataField5; /* Thinkspeak data: Echo from Device 1 commanded by Field 7 */
      var dataField6; /* Thinkspeak data: Echo from Device 2 commanded by Field 8 */
      var dataField7; /* Thinkspeak data: Command to device 1*/
      var dataField8; /* Thinkspeak data: Command to device 2*/
         var channelID = 622900;
      var readKey = "ZBHS3SWDRSROL3IU"; 
      var writeKey = "L1FF82EJCT9ZX4G0"; 

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
      title: 'Température',
       min: 0,
        max: 39,
        symbol: ' °C',
        pointer: false,
        gaugeWidthScale: 0.6,
        customSectors: [{
        color : "blue",
        lo : 0,
        hi : 15
      },{
        color : "red",
        lo : 15,
        hi : 30
      }],
        counter: true
    });

    var gg2 = new JustGage({
      id: 'gg2',
      value: getDataField2(),
      title: 'Humidité ambiante',
      min: 0,
        max: 100,
        decimals: 1,
        symbol: ' %',
        pointer: false,
        gaugeWidthScale: 0.6,
        customSectors: [{
        color : "grey",
        lo : 0,
        hi : 50
      },{
        color : "orange",
        lo : 50,
        hi : 100
      }],
      counter: true
      });

    var gg3 = new JustGage({
      id: 'gg3',
      value: getDataField3(),
      title: 'Humidité de la terre',
      min: 0,
        max: 100,
        decimals: 1,
        symbol: ' %',
        pointer: false,
        gaugeWidthScale: 0.6,
        customSectors: [{
        color : "red",
        lo : 0,
        hi : 50
      },{
        color : "blue",
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
        max: 100,
        decimals: 1,
        symbol: ' cl',
        pointer: false,
        gaugeWidthScale: 0.6,
        customSectors: [{
        color : "red",
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
      title: 'Activité Pompe',
      min: 0,
        max: 1,
        symbol: ' ',
        pointer: true,
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

    var gg6 = new JustGage({
      id: 'gg6',
      value: getDataField6(),
      title: 'Activité LED',
      min: 0,
        max: 1,
        symbol: ' ',
        pointer: true,
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
      }, 5000);

  });

        function getAllChannelDataTS(){
        getDataField1();
        getDataField2();
        getDataField3();
        getDataField4();
        getDataField5();
        getDataField6();
        getDataField7();

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
function initElement()
{
  var p = document.getElementById("foo");
  p.onclick = showAlert;
};

function showAlert()
{
  alert("Evènement de click détecté");

};

$(document).ready(function () {
    $(".popup").hide();
    $(".openpop").click(function (e) {
        e.preventDefault();
        $("iframe").attr("src", $(this).attr('href'));
        $(".gg1").fadeOut('slow');
        $(".popup").fadeIn('slow');
    });

    $(".close").click(function () {
        $(this).parent().fadeOut("slow");
        $(".links").fadeIn("slow");
    });
    
});
