import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator. You will be given a topic and a list of questions. You will create a flashcard for each question. For each question, you will provide: 
1. The question on the front of the card
2. The answer on the back of the card
3. A brief explanation or additional context (if applicable)
4. Only generate 10 flashcards

Your responses should be concise yet informative, suitable for quick review and memorization. Ensure that the information is accurate and relevant to the given topic.
Return your response as a JSON array of flashcards, where each flashcard is an object with the following properties:
{
  "flashcard": [
    {
      "front": "string",
      "back": "string"
    }
  ]
}
`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages: [
            {role: "system", content: systemPrompt},
            {role: "user", content: data}
        ],
        model: "gpt-4o",
        response_format: {type: "json_object"}
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(flashcards.flashcard)
}




