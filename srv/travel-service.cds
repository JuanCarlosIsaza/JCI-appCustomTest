using {sap.fe.cap.travel as my} from '../db/schema';

service TravelService @(path: '/processor') {

  entity Passenger as projection on my.Passenger {
      key CustomerID,
          FirstName,
          LastName,
          Title,
          Street,
          PostalCode,
          City,
          CountryCode,
          PhoneNumber,
          EMailAddress,
          Status,
          Note,
          disabled,
          birthdate,
          case
            when
              (
                disabled = '1'
              )
            then
              'Sí'
            else
              'No'
          end as disability : String(2),
          FlightDateTime
    }
    actions {
      @cds.odata.bindingparameter.name: '_it'
      @Common.SideEffects             : {TargetProperties: [
        '_it/Status',
        '_it/Note'
      ]}
      action AcceptTravels(  @(title:'{i18n>Note}')  @(UI.MultiLineText)  pNote : String);
      @cds.odata.bindingparameter.name: '_it'
      @Common.SideEffects             : {TargetProperties: [
        '_it/Status',
        '_it/Note'
      ]}
      action RejectTravels(  @(title:'{i18n>Note}')  @(UI.MultiLineText)  pNote : String);
      @cds.odata.bindingparameter.name: '_it'
      @Common.SideEffects             : {TargetProperties: [
        '_it/Status',
        '_it/Note'
      ]}
      action CancelTravels(  @(title:'{i18n>Note}')  @(UI.MultiLineText)  pNote : String);
    };
}
