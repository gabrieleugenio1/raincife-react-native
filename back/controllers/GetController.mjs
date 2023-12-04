'use strict';

import User from "../models/User.mjs";

export default class GetController {

    static async index (req, res) {
        return res.status(200).render("telaIndex", { title: "Raincife", success: req.flash("success"), erros: req.flash("erros")});     
    };

    static async cadastro (req, res) {
        return res.status(200).render("telaCadastro", { title: "Raincife - Cadastro", success: req.flash("success"), erros: req.flash("erros")});     
    };
    
    static async login (req, res) {
        return res.status(200).render("telaLogin", { title: "Raincife - Login", success: req.flash("success"), erros: req.flash("erros")});     
    };

    static async home (req, res) {
        return res.status(200).render("telaHome", { title: "Raincife - Home", user: req.session.user});     
    };

    static async esqueceuSenha (req, res) {
        const codigo = req.query['codigo'];
        const email = req.query['email'];
        return res.status(200).render("telaEsqueciSenha", { title: "Raincife - Esqueceu a senha?", codigo: codigo, email: email, success: req.flash("success"), erros: req.flash("erros")});     
    };

    static async admin (req, res) {
        const users = await User.findAll();
        return res.status(200).render("telaAdmin", { title: "Raincife - Admin", users:users, user: req.session.user, success: req.flash("success"), erros: req.flash("erros")});     
    };
    
    static async alterarUser (req,res) {
        const id = req.params.id;
        if (id === undefined || id === null) return res.status(400).redirect("/admin");
        const user = await User.findByPk(id);
        return res.status(200).render("telaModificar", { title: "Raincife - Admin", alterarUser:user, user: req.session.user, success: req.flash("success"), erros: req.flash("erros")})
    };

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