sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("pagemain.pagemain.controller.pageMain", {
        onInit: function () {
            // Inicialización del controlador
        },

        onAfterRendering: function () {
            // Asegúrate de que esta lógica no cree múltiples instancias
            if (!this._bComponentLoaded) {
                this._bComponentLoaded = true;
                var oComponentContainer = this.byId("_IDGenComponentContainer2");
                oComponentContainer.setComponent(new sap.ui.core.ComponentContainer({
                    name: "onlymainjs",
                    manifest: true
                }));
            }
        }
    });
});
