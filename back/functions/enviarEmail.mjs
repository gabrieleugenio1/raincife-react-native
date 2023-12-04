import nodemailer from 'nodemailer';

export default async(link, email, protocol) => {


    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure:process.env.EMAIL_SECURE,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD,
        },
    })

    await transport.sendMail({
        from: `Raincife <${process.env.EMAIL}>`,
        to:`${email}`,
        subject: 'Recuperação de senha',
        html: `<h1>Acesse o link abaixo para redefinir sua senha, o link é válido por 5 minutos.</h1><br><a href='${protocol}://${link}'>Redefinir senha</a>`,
        //Caso o servidor email não suporte em html
        text: `Acesse o link para redefinir sua senha, o link é válido por 5 minutos:\n ${protocol}://${link}`
    }).then((resposta) =>{
        console.log('Email enviado com sucesso!')
    }).catch((err) => console.log('Erro ao enviar email: ', err));
}
