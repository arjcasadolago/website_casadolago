const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { name, email, classType } = JSON.parse(event.body);

    // Email to your team
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'arjcasadolago@gmail.com',
        subject: 'Nova Inscrição para Aula',
        html: `<p><strong>${name}</strong> (${email}) demonstrou interesse numa aula de <em>${classType}</em>.</p>`,
    });

    // Confirmation email to user (your custom message)
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Obrigado pelo teu interesse nas aulas!',
        html: `
      <p>Olá ${name},</p>
      <p>Obrigado por mostrares interesse em começar aulas connosco! Estamos entusiasmados por saber de ti.</p>
      <p>Neste momento, a melhor forma de nos contactares é através do nosso Instagram: <strong>@arj_casa_do_lago</strong>. Podes enviar-nos uma mensagem diretamente lá para conversarmos mais sobre as aulas.</p>
      <p>Caso não tenhas Instagram, podes sempre contactar-nos através do número <strong>+351 913 901 120</strong>.</p>
      <p>Aguardamos com expectativa para falar contigo em breve!</p>
      <p>Melhores cumprimentos,<br/>
      <strong>Alex Ryu Jitsu Casa do Lago</strong></p>
    `,
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Emails sent successfully' }),
    };
};
