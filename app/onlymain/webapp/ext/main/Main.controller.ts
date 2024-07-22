import Controller from "sap/fe/core/PageController";
import Table from "sap/fe/macros/table/TableAPI";
import Wizard from "sap/m/Wizard";
import WizardStep from "sap/m/WizardStep";
import Event from "sap/ui/base/Event";
import Core from "sap/ui/core/Core";
import JSONModel from "sap/ui/model/json/JSONModel";
import Context from "sap/ui/model/odata/v4/Context";
import ODataModel from "sap/ui/model/odata/v4/ODataModel"; 

/**
 * @namespace com.test.onlymain.ext.main
 */
export default class Main extends Controller {

  /**
   * Called when a controller is instantiated and its View controls (if available) are already created.
   * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
   * @memberOf com.test.onlymain.ext.main.Main
   */
  // public onInit(): void {
  //
  //}

  /**
   * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
   * (NOT before the first rendering! onInit() is used for that one!).
   * @memberOf com.test.onlymain.ext.main.Main
   */
  // public  onBeforeRendering(): void {
  //
  //  }

  /**
   * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   * @memberOf com.test.onlymain.ext.main.Main
   */
  // public  onAfterRendering(): void {
  //
  //  }

  /**
   * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
   * @memberOf com.test.onlymain.ext.main.Main
   */
  // public onExit(): void {
  //
  //  }

  async onModelContextChange(): Promise<void> {
    // debugger;
    // const context = this.getView()?.getBindingContext() as Context;
    // const isActiveEntity = await context?.requestProperty("IsActiveEntity");

    // if (isActiveEntity !== undefined) {
    //   const uiModel = this.getView()?.getModel("ui") as JSONModel;
    //   uiModel.setProperty("/isEditable", !isActiveEntity);
    // }
  }

  async onCreatePress(): Promise<void> {
    await this.getExtensionAPI()
      .getEditFlow()
      .createDocument("/Passenger", { creationMode: "NewPage" });

    const table = this.byId("table") as Table;
    table.refresh();
  }

  private resetWizard(): void {
    const wizard = this.byId("wizard") as Wizard;
    const firstStep = this.byId("wizardStep1") as WizardStep;
    wizard.setCurrentStep(firstStep);
  }

  private refreshTable(): void {
    const table = Core.byId(
      "maintainpassengers::PassengerMain--table",
    ) as Table;
    table?.refresh();
  }

  async onChange(): Promise<void> {
    debugger;
    // // const context = this.getView()?.getBindingContext() as Context;
    // const table = Core.byId(
    //   "com.test.onlymain::PassengerMain--table",
    // ) as Table;
    // const context = table.getSelectedContexts();
    // let oNewFirstName = "Juan";
    // for (let i in context) {
    //   let lineObject = context[i].getObject();
    //                 lineObject.FirstName = oNewFirstName;
      
    // }
    // // context.setProperty("FirstName", "Juan");
    // await this.getExtensionAPI().getEditFlow().saveDocument(context);


    // let oModel = new ODataModel({serviceUrl : "/processor/", synchronizationMode : "None"}),
    //     oContextBinding = oModel.bindContext("/Passenger(CustomerID='000001')", /*oContext*/ undefined, {$$updateGroupId : "$auto"}), 
    //     oPropertyBinding = oModel.bindProperty("FirstName", oContextBinding.getBoundContext());

    

    this.resetWizard();
    this.refreshTable();
  }

  

}