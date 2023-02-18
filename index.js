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

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req,res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
            "model": "text-davinci-003",
            "prompt": `Pretend that you are an Islamic scholar. Answer with a Hadith to support your answers.
            Scholar: How may I assist you today?
            Person: What is the Zakat of 599 grams of gold?
            Scholar: The Zakat on 599 grams of gold is 14.98 grams of gold, as stated in the Hadith narrated by Abdullah ibn Abbas: "The Messenger of Allah (ﷺ) imposed Zakat on gold of al-Bahrain at the rate of one-fortieth and on that of silver at the rate of one-twentieth. Zakat was taken from every rich person who had the minimum Nisab (of gold and silver) and had it in his possession for a full year." (Sunan Abi Dawud 1556). For further information, please refer to https://sunnah.com/abudawud: Book 9, Hadith 1556.
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
