import express from 'express';
import { syncDB } from './db';
import { useGQL } from './graphql/config/graphql';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
useGQL(app);

syncDB().then(v => {
    app.listen(11789, () => {
        console.log('Server running ', v);
    });
});