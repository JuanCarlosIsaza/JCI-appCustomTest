using {sap.fe.cap.travel as my} from '../db/schema';

service TravelService @(path: '/processor') {

  entity Passenger as projection on my.Passenger
    actions {
      @cds.odata.bindingparameter.name: '_it'
      @Common.SideEffects             : {TargetProperties: ['_it/Status']}
      action AcceptTravels(  @(title:'{i18n>Note}')  @(UI.MultiLineText)  pNote : String);
    };
}
