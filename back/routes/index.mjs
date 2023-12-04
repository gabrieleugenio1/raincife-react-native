'use strict';
import GET from './GetRoute.mjs';
import POST from './PostRoute.mjs';

//Pegando todas as rotas
export default app => {
    app.use(
        GET, POST
    )
};