sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'onlymainjs/test/integration/FirstJourney',
		'onlymainjs/test/integration/pages/PassengerMain'
    ],
    function(JourneyRunner, opaJourney, PassengerMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('onlymainjs') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePassengerMain: PassengerMain
                }
            },
            opaJourney.run
        );
    }
);