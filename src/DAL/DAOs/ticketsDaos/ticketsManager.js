import { ticketsModel } from "../../MongoDB/models/tickets.model.js";

export default class TicketsManager {
  async createTicket(ticketData) {
    try {
      const ticket = new ticketsModel(ticketData);
      return await ticket.save();
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear el ticket");
    }
  }
}
