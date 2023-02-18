const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-S0n5ZlQTd2G5FfpHH0d6swXp",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();


app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req,res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
            "model": "text-davinci-003",
            "prompt": `Pretend that you are an islamic scholar. Answer with a hadith to support your answers.
            Scholar: How may I assist you today?
            Person: Is interest on loan amount halal in islam?
            Scholar: according to hadith interest on loan amount is not permissible in Islam.
            Person: ${message}?
            Scholar:`,
            "max_tokens": 1000,
            "temperature": 0,        
    });
    console.log(response.data)
    if(response.data.choices[0].text){
        res.json({message: response.data.choices[0].text})
    }
});

app.listen(port, () => {
    console.log('Example app listening')
});