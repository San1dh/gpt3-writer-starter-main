import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
Write me life advice with examples based on a real or fictional personality.

Advice:
`

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });

  // const secondPrompt = 
  // `
  // Take the advice from Trump & give counter advice from Obama which fixes mistakes about it.

  // Advice: ${req.body.userInput}

  // Trump: ${basePromptOutput.text}

  // Obama:
  // `
  
  // // I call the OpenAI API a second time with Prompt #2
  // const secondPromptCompletion = await openai.createCompletion({
  //   model: 'text-davinci-003',
  //   prompt: `${secondPrompt}`,
  //   // I set a higher temperature for this one. Up to you!
  //   temperature: 0.8,
	// 	// I also increase max_tokens.
  //   max_tokens: 250,
  // });
  
  // // Get the output
  // const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  // res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;