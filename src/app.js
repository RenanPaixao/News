import mailchimp from '@mailchimp/mailchimp_marketing';
import express from 'express';
import md5 from 'md5';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const listID = process.env.LIST_ID;

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: 'us5',
});

app.put('/add', async (req, res) => {
  try {
    await mailchimp.lists.setListMember(
      listID,
      md5(req.body.email.toLowerCase()),
      {
        email_address: req.body.email,
        status_if_new: 'subscribed',
        merge_fields: {},
      }
    );
    res.status(200).send('Adicionado com sucesso!');
  } catch (e) {
    res
      .status(405)
      .send({ error: 'Ocorreu um erro ao adicionar. Tente novamente!' });
  }
});

export default app;
