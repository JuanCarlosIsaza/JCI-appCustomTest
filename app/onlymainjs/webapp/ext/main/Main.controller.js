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
                const oEditFlow = this.getExtensionAPI().getEditFlow();
                const oRouting = this.getExtensionAPI().getRouting();
                const oModel = this.getView().getModel();
                debugger;
                const processContext = function (oContext) {
                    return oEditFlow.editDocument(oContext).then(function (oDraftContext) {
                        debugger;
                        if (oDraftContext && typeof oDraftContext.setProperty === "function") {
                            oDraftContext.setProperty("Status", oNewStatus);
                            return oDraftContext;
                        } else {
                            throw new Error("The draft context is invalid");
                        }
                    });
                };
                const processAllContexts = function (contexts) {
                    const aPromises = contexts.map(processContext);
                    return Promise.all(aPromises).then(function (aDraftContexts) {
                        aDraftContexts.forEach(function (oDraftContext) {
                            oModel.addBatchChangeOperations([oModel.createBatchOperation("/" + oDraftContext.getPath(), "PUT", oDraftContext.getObject())]);
                        });
                        return new Promise(function (resolve, reject) {
                            oModel.submitBatch(function (oData, oResponse) {
                                if (oResponse.statusCode >= 200 && oResponse.statusCode < 300) {
                                    resolve();
                                } else {
                                    reject(new Error("Batch update failed"));
                                }
                            });
                        });
                    });
                };
                processAllContexts(aSelectedContexts.slice()).then(function () {
                    sap.m.MessageToast.show("Mass update successfully completed");
                    oRouting.navigateToRoute("/");
                }).catch(function (error) {
                    sap.m.MessageToast.show("Error in bulk update: " + error.message);
                });
            },

            /**
             * Individual status update
             */
            onActionAcceptSingles: async function (oEvent) {
                debugger;
                let oButton = oEvent.getSource();
                let oContext = oButton.getBindingContext();
                const oNewStatus = "Accepted";
                let _Status = oEvent.getSource().data("Status");
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
                processContext(oContext).then(function () {
                    sap.m.MessageToast.show("Update successfully completed");
                    debugger;
                    oRouting.navigateToRoute("/");
                }).catch(function (error) {
                    sap.m.MessageToast.show("Error in update: " + error.message);
                    throw error;
                });
            },
            /**
             * SelectionChange Event
             */
            onSelectionChange: function (oEvent) {
                // debugger;
            }
        });
    }
);
