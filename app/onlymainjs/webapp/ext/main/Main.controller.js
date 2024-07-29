sap.ui.define(
    [
        'sap/fe/core/PageController',
        'sap/m/MessageToast'
    ],
    function (PageController, MessageToast) {
        'use strict';

        return PageController.extend('onlymainjs.ext.main.Main', {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf onlymainjs.ext.main.Main
             */
            //  onInit: function () {
            //
            //  },

            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf onlymainjs.ext.main.Main
             */
            //  onBeforeRendering: function() {
            //
            //  },

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf onlymainjs.ext.main.Main
             */
            //  onAfterRendering: function() {
            //
            //  },

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf onlymainjs.ext.main.Main
             */
            //  onExit: function() {
            //
            //  }

            /**
             * Mass status update
             */
            onMassAcceptAction: function () {
                const oTable = this.getView().byId("table");
                const aSelectedContexts = oTable.getSelectedContexts();
                const oNewStatus = "Accepted";
                debugger;
                const oEditFlow = this.getExtensionAPI().getEditFlow();
                const oRouting = this.getExtensionAPI().getRouting();

                const processContext = function (oContext) {
                    return oEditFlow.editDocument(oContext).then(function (oDraftContext) {
                        debugger;
                        console.log(oDraftContext);
                        if (oDraftContext && typeof oDraftContext.setProperty === "function") {
                            oDraftContext.setProperty("Status", oNewStatus);
                            return oEditFlow.saveDocument(oDraftContext);
                        } else {
                            throw new Error("The draft context is invalid");
                        }
                    });
                };

                const processAllContexts = function (contexts) {
                    if (contexts.length === 0) {
                        sap.m.MessageToast.show("Mass update successfully completed");
                        debugger;
                        oRouting.navigateToRoute("/");
                        return Promise.resolve();
                    }
                    const oContext = contexts.shift();
                    return processContext(oContext).then(function () {
                        return processAllContexts(contexts);
                    }).catch(function (error) {
                        sap.m.MessageToast.show("Error in bulk update: " + error.message);
                        throw error;
                    });
                };
                processAllContexts(aSelectedContexts.slice());
            },

            /**
             * Individual status update
             */
            onActionAcceptSingles: async function (oEvent) {
                debugger;
                const oTable = this.getView().byId("table");
                const aSelectedContexts = oTable.getSelectedContexts();
                const oNewStatus = "Accepted";
                let _Status = oEvent.getSource().data("Status");
            },
            onSelectionChange: function (oEvent) {
                // debugger;
            }
        });
    }
);
