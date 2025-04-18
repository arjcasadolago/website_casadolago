const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    try {
        const { name, email, classType } = JSON.parse(event.body);

        console.log("User email submitted:", email);

        // Send email to your team with reply template
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'arjcasadolago@gmail.com',
            subject: 'Nova Inscrição para Aula',
            html: `
        <p><strong>${name}</strong> (${email}) demonstrou interesse numa aula de <em>${classType}</em>.</p>
        <hr>
        <p><strong>Mensagem para copiar e enviar ao utilizador:</strong></p>
        <blockquote>
          <p>Olá ${name},</p>
          <p>Obrigado por mostrares interesse em começar aulas connosco! Estamos entusiasmados por saber de ti.</p>
          <p>Neste momento, a melhor forma de nos contactares é através do nosso Instagram: <strong>@arj_casa_do_lago</strong>. Podes enviar-nos uma mensagem diretamente lá para conversarmos mais sobre as aulas.</p>
          <p>Caso não tenhas Instagram, podes sempre contactar-nos através do número <strong>+351 913 901 120</strong>.</p>
          <p>Aguardamos com expectativa para falar contigo em breve!</p>
          <p>Melhores cumprimentos,<br/>
          <strong>Alex Ryu Jitsu Casa do Lago</strong></p>
        </blockquote>
      `,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent to team successfully' }),
        };
    } catch (error) {
        console.error("Email sending failed:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email.', error: error.message }),
        };
    }
};
