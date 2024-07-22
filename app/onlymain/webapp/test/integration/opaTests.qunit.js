sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/test/onlymain/test/integration/FirstJourney',
		'com/test/onlymain/test/integration/pages/PassengerMain'
    ],
    function(JourneyRunner, opaJourney, PassengerMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/test/onlymain') + '/index.html'
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