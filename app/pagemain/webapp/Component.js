/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "pagemain/pagemain/model/models"
],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("pagemain.pagemain.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // Configuración del loader
                sap.ui.loader.config({
                    paths: {
                        "onlymainjs": "./",
                        "sap/ui/core": "https://sapui5.hana.ondemand.com/1.128.1/resources/sap/ui/core",
                        "sap/ui/generic/app": "https://sapui5.hana.ondemand.com/1.128.1/resources/sap/ui/generic/app"
                    }
                });

                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // // register child applications
                // jQuery.sap.registerModulePath("maintainpassengers", "../maintainpassengers");
                // jQuery.sap.registerModulePath("onlymainjs", "../onlymainjs");
            }
        });
    }
);
