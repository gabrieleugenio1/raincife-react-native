'use strict';

export default class GetController {

    static async logout (req, res)  {
        req.session.destroy((err) => {
            if (err) {
              console.error('Erro ao destruir a sessão:', err);
            } else {
              return res.status(200).redirect('/')
            };
        });
    };

};