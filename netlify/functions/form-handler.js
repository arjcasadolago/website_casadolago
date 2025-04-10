try {
    const { name, email, classType } = JSON.parse(event.body);
    console.log("Form Data Received:", name, email, classType);

    // Send to team
    const teamRes = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'arjcasadolago@gmail.com',
        subject: 'Nova Inscrição para Aula',
        html: `<p><strong>${name}</strong> (${email}) demonstrou interesse numa aula de <em>${classType}</em>.</p>`,
    });

    console.log("Team email sent:", teamRes);

    // Send to user
    const userRes = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'manuelcortinhasc@gmail.com',
        subject: 'Obrigado pelo teu interesse nas aulas!',
        html: `<p>Olá ${name}, obrigado pelo teu interesse...</p>`,
        text: `Olá ${name}, obrigado pelo teu interesse!`,
    });

    console.log("User email sent:", userRes);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Both emails sent successfully' }),
    };
} catch (error) {
    console.error("Something went wrong:", error);
    return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
    };
}
