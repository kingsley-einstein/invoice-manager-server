import { InvoiceModel, TicketModel } from '..';

export const InvoiceQueryObject = {
    generate: (ticketId) => {
        return new Promise((resolve, reject) => {
            InvoiceModel.create({
                ticket_id: ticketId
            }).then(i => resolve(i))
            .catch(err => reject(err));
        });
    },
    findById: (id) => {
        return new Promise((resolve, reject) => {
            InvoiceModel.findById(id, {
                include: [{
                    model: TicketModel,
                    as: 'ticket'
                }]
            }).then(i => resolve(i))
            .catch(err => reject(err));
        });
    },
    findUnvalidated: (page) => {
        return new Promise((resolve, reject) => {
            InvoiceModel.findAll({
                where: {
                    validated: false
                },
                offset: page * 12,
                limit: 12
            }).then(i => resolve(i))
            .catch(err => reject(err));
        });
    },
    validate: (id) => {
        return new Promise((resolve, reject) => {
            InvoiceModel.findById(id, {
                include: [TicketModel]
            }).then(i => {
                i.makeValid().then(item => resolve(item));
            })
            .catch(err => reject(err));
        });
    },
    findValidated: (page) => {
        return new Promise((resolve, reject) => {
            InvoiceModel.findAll({
                where: {
                    validated: true
                },
                offset: page * 12,
                limit: 12
            }).then(i => resolve(i))
            .catch(err => reject(err));
        });
    },
    countByStatus: (status) => {
        return new Promise((resolve, reject) => {
            InvoiceModel.count({
                where: {
                    validated: status
                }
            }).then(r => resolve(r))
            .catch(err => reject(err));
        });
    }
};