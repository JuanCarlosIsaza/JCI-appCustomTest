sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/ComponentContainer"
],
    function (Controller, ComponentContainer) {
        "use strict";

        return Controller.extend("pagemain.pagemain.controller.pageMain", {
            onInit: function () {

            },

            onFilterSelect: function (oEvent) {
                debugger;
                var sKey = oEvent.getParameter("key");
                var oView = this.getView();
                var oContainer = oView.byId("contentContainer");

                // Limpia el contenedor antes de agregar la nueva vista
                oContainer.removeAllItems();

                // Carga la aplicación correspondiente según el ítem seleccionado
                if (sKey === "Ofr") {
                    var oComponentContainer = new ComponentContainer({
                        name: "maintainpassengers",
                        height: "100%",
                        width: "100%"
                    });
                    oContainer.addItem(oComponentContainer);
                } else if (sKey === "Sol") {
                    // Agrega lógica para cargar la vista de "Solicitudes"
                } else if (sKey === "Seg") {
                    // Agrega lógica para cargar la vista de "Seguimientos"
                }
            }
        });
    });
