import express from 'express';
import { syncDB, UserModel } from './db';
import { useGQL } from './graphql/config/graphql';
import morgan from 'morgan';
import { environment } from './environment';
import { UserQueryObject } from './db/queries';
import { createIOServer } from './socket';

const app = express();

app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    if (req.method.toUpperCase() == 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    next();
});
useGQL(app);
createIOServer(app);

syncDB().then(v => {
    app.listen(process.env.PORT || 11789, () => {
        UserModel.find({
            where: {
                email: environment.adminUser
            }
        }).then(r => {
            if (!r) UserQueryObject.create(
                'Khaled', 
                environment.adminUser,
                '98876',
                '7, Somewhere in France',
                environment.adminPass
                ).then(u => console.log('Admin created', u));
            else console.log('Server running', v)
        })
    });
});