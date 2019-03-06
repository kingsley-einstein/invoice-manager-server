import { TicketModel } from '..';

export const TicketQueryObject  = {
    bindToUser: (userId, parts, phone, client) => {
        return new Promise((resolve, reject) => {
            TicketModel.create({
                parts: parts,
                phone: phone,
                client: client,
                status: 'Under repair',
                user_id: userId
            }).then(t => resolve(t))
            .catch(err => reject(err));
        });
    },
    changeStatus: (id, status) => {
        return new Promise((resolve, reject) => {
            TicketModel.findById(id).then(t => {
                t.changeStatus(status).then(item => resolve(item));
            })
            .catch(err => reject(err));
        });
    },
    findAllByUser: (id, page) => {
        return new Promise((resolve, reject) => {
            TicketModel.findAll({
                where: {
                    user_id: id
                },
                offset: page * 12,
                limit: 12
            }).then(t => resolve(t))
            .catch(err => reject(err));
        });
    },
    findById: (id) => {
        return new Promise((resolve, reject) => {
            TicketModel.findById(id).then(t => {
                if (!t) reject({
                    message: 'Ticket not found',
                    code: 404
                });
                else resolve(t);
            });
        });
    }
};