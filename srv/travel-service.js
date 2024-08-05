const debug = require('debug')('TravelService');
const cds = require("@sap/cds");
debug("service");
class TravelService extends cds.ApplicationService {
  init() {
    // module.exports = cds.service.impl(async function (service) {
    const { Passenger } = this.entities;

    this.after("READ", Passenger, (data, req) => {

      console.log("Usuario: ", req.user.id, "Roles: ", req.user.roles);

      const passengers = Array.isArray(data) ? data : [data];

      passengers.forEach((passenger) => {
        if (passenger.disabled === 'true') {
          passenger.disability = 'Yes';
        } else if (passenger.disabled === 'false') {
          passenger.disability = 'No';
        } else {
          passenger.disability = 'N/A';
        }
      });
    });

    this.before("CREATE", "Passenger.drafts", async (req) => {
      const activeResults = await SELECT`CustomerID`.from(Passenger);
      const draftResults = await SELECT`CustomerID`.from(Passenger.drafts);
      let maxID = 0;
      for (const result of [...activeResults, ...draftResults]) {
        if (Number(result.CustomerID) > maxID)
          maxID = Number(result.CustomerID);
      }
      req.data.CustomerID = String(maxID + 1).padStart(6, 0);
    });

    this.on("AcceptTravels", Passenger, async (req) => {
      debug("AcceptTravels called");
      await UPDATE(Passenger)
        .set({ Status: "Accepted" })
        .where({ CustomerID: req.params[0].CustomerID });
    });

    return super.init();
  }
}
module.exports = { TravelService };
// });