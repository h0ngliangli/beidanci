export const config = {
  model_config: {
    model: 'gemini-1.5-flash',
    generationConfig: { responseMimeType: 'application/json' },
    systemInstruction: `Keep task names short, ideally within 7 words. Use the following schema in your response ${JSON.stringify(
      {
        title: 'string',
        subtasks: 'string[]'
      }
    )}. The substasks should follow logical order`
  }
}
