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
            onModelContextChange: function () {
                debugger;
                let that = this;
                let context = this.getView().getBindingContext();
                context.requestProperty("IsActiveEntity").then(function (isActiveEntity) {
                    if (isActiveEntity !== undefined) {
                        var uiModel = that.getView().getModel("ui");
                        uiModel.setProperty("/isEditable", !isActiveEntity);
                    }
                });
            },
            onMassAcceptAction: async function () {
                debugger;
                const oTable = this.getView().byId("table");
                const aSelectedContexts = oTable.getSelectedContexts();
                const oNewStatus = "Accepted";

                for (const oContext of aSelectedContexts) {
                    debugger;
                    await this.getExtensionAPI().getEditFlow().editDocument(oContext);
                    oContext.setProperty("Status", oNewStatus);
                    await this.getExtensionAPI().getEditFlow().saveDocument(oContext);
                }
            },
            onActionAcceptSingles: async function (oEvent) {
                debugger;
                const oTable = this.getView().byId("table");
                const aSelectedContexts = oTable.getSelectedContexts();
                const oNewStatus = "Accepted";
                let _Status = oEvent.getSource().data("Status");
            }
        });
    }
);
