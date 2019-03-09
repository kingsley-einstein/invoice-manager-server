import { UserModel, RoleModel, TicketModel } from '..';
import { sign } from 'jsonwebtoken';
import { environment } from '../../environment';
import { compare, genSalt, hash, genSaltSync, hashSync } from 'bcryptjs';

export const UserQueryObject = {
    create: (name, email, phone, address, password) => {
        return new Promise((resolve, reject) => {
            const user = new UserModel({
                name: name,
                email: email,
                phone: phone,
                address: address,
                password: hashSync(password, genSaltSync(8)),
                token: sign({
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    password: password
                }, environment.jwtSecret),
                dateJoined: new Date().toString()
            });

            user.save()
            .then(u => {
                RoleModel.create({
                    user_id: u.id,
                    value: u.email == environment.adminUser ? 'admin' : 'user'
                })
                .then(r => resolve(u))
                .catch(err => reject(err));
            })
            .catch(err => reject(err));
        });
    },
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({
                where: {
                    email: email
                },
                include: [RoleModel]
            }).then(u => {
                if (!u) reject({
                    message: 'User not found',
                    code: 404
                });
                else {
                    compare(password, u.password).then(v => {
                        if (!v) reject({
                            message: 'Incorrect password',
                            code: 500
                        });
                        else resolve(u);
                    }).catch(err => reject(err));
                }
            }).catch(err => reject(err));
        });
    },
    loginByToken: (token) => {
        return new Promise((resolve, reject) => {
            UserModel.findByToken(token, [RoleModel]).then(u => {
                if (!u) reject(JSON.stringify({
                    message: 'User with specified token not found',
                    code: 404
                }));
                else resolve(u);
            })
            .catch(err => reject(err));
        });
    },
    findById: (id) => {
        return new Promise((resolve, reject) => {
            UserModel.findById(id, {
                include: [{
                    model: TicketModel
                },
            {
                model: RoleModel
            }]
            }).then(u => resolve(u))
            .catch(err => reject(err));
        });
    },
    findByToken: (token) => {
        return new Promise((resolve, reject) => {
            UserModel.findByToken(token, [{
                model: RoleModel
            }, {
                model: TicketModel
            }]).then(u => {
                if (!u) reject({
                    message: 'User with specified token not found',
                    code: 404
                });
                else resolve(u);
            }).catch(err => reject(err));
        });
    },
    modify: (id, name, email, phone, address, password) => {
        return new Promise((resolve, reject) => {
            UserModel.findById(id, {
                include: [RoleModel]
            }).then(u => {
                if (password.trim().length > 0) genSalt(8, (err1, salt) => {
                    hash(password, salt, (err2, hashed) => {
                        u.password = hashed;
                    });
                });
                u.name = name;
                u.email = email;
                u.phone = phone;
                u.address = address;

                u.save().then(item => resolve(item));
            })
            .catch(err => reject(err));
        });
    },
    findAll: (page) => {
        return new Promise((resolve, reject) => {
            UserModel.findAll({
                offset: page * 12,
                limit: 12,
                include: [RoleModel]
            }).then(u => resolve(u))
            .catch(err => reject(err));
        });
    },
    count: () => {
        return new Promise((resolve, reject) => {
            UserModel.count().then(r => resolve(r))
            .catch(err => reject(err));
        });
    }
};