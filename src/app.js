import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: 'us5',
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

run();
