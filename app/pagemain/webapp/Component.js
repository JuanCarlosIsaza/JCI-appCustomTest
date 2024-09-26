/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "pagemain/pagemain/model/models"
], function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("pagemain.pagemain.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // Configuración del loader
            sap.ui.loader.config({
                paths: {
                    "onlymainjs": "./",
                    "sap/ui/core": "https://sapui5.hana.ondemand.com/1.128.1/resources/sap/ui/core",
                    "sap/ui/generic/app": "https://sapui5.hana.ondemand.com/1.128.1/resources/sap/ui/generic/app"
                }
            });

            // Llamar a la función init del padre
            UIComponent.prototype.init.apply(this, arguments);

            // Habilitar la navegación
            this.getRouter().initialize();

            // Configurar el modelo de dispositivo
            this.setModel(models.createDeviceModel(), "device");

            // Configurar el modelo de internacionalización
            var i18nModel = new sap.ui.model.resource.ResourceModel({
                bundleName: "pagemain.pagemain.i18n.i18n"
            });
            this.setModel(i18nModel, "i18n");
        }
    });
});

