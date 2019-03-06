import { RoleModel } from '..';

export const RoleQueryObject = {
    invert: (userId) => {
        return new Promise((resolve, reject) => {
            RoleModel.findOne({
                where: {
                    user_id: userId
                }
            }).then(r => {
                r.invert().then(item => resolve(true));
            }).catch(err => reject(err));
        });
    }
};