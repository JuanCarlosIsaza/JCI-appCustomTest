const cds = require("@sap/cds");

class TravelService extends cds.ApplicationService {
  init() {
    const { Passenger } = this.entities;

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

    this.before('UPDATE', 'Passenger', async (req) => {
      debugger;
      const { CustomerID, ...updates } = req.data;
      const keys = { CustomerID };

      // Implementa la lógica de actualización aquí
      await cds.run(UPDATE(Passenger).set(updates).where(keys));

      return await cds.run(SELECT.one.from(Passenger).where(keys));
    });

    this.on('createDraft', async (req) => {
      const { CustomerID } = req.data;

      // Fetch the existing active entity
      const activeEntity = await cds.run(SELECT.one.from(Passenger).where({ CustomerID, IsActiveEntity: true }));
      if (!activeEntity) {
        return req.error(404, 'Active entity not found');
      }

      // Create a draft from the active entity
      const draftData = { ...activeEntity, IsActiveEntity: false };

      // Update the entity to set IsActiveEntity to false
      await cds.run(UPDATE(Passenger).set({ Status : 'Accept' }).where({ CustomerID, IsActiveEntity: true }));

      // Return the draft entity
      return await cds.run(SELECT.one.from(Passenger).where({ CustomerID, IsActiveEntity: true }));
    });

    return super.init();
  }
}
module.exports = { TravelService };
