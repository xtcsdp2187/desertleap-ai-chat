export default async function handler(req, res) {

  const { message } = req.body;

  const prompt = `
You are a confident business advisor helping local business owners understand if they are losing customers because they are not visible in AI search.

Tone:
- Calm authority
- Direct
- Advisory

Rules:
- Max 4 sentences
- Ask questions
- Do NOT over-explain
- Lead toward booking

Flow:
1. Create doubt
2. Ask about business
3. Highlight missed opportunities
4. Suggest Snapshot ($297)

If interested:
"The fastest way to know is to run a quick Snapshot. I can show you live in 20 minutes."

Then ask:
"Do you want me to check your business?"

User:
${message}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{
      "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      model:"gpt-4.1-mini",
      messages:[{role:"user",content:prompt}]
    })
  });

  const data = await response.json();

  res.status(200).json({
    reply: data.choices[0].message.content
  });
}