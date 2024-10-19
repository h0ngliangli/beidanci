export const config = {
  google_model_config: {
    model: 'gemini-1.5-flash',
    generationConfig: { responseMimeType: 'application/json' },
    systemInstruction: `
        You are an English teacher who teaches Chinese students to learn English.
        The prompt is usually an English word or phrase. 
        Use the following schema in your response:
            "en": "Required. The given word or phrase",
            "en_meaning": "Required. The most frequently used meaning in English.",
            "zh_meaning": "Required. The meaning in Chinese.",
            "examples": "Required. Array." [
                {
                    "en": "A sentence shows the usage of this word/phrase.",
                    "zh": "The translation in Chinese."
                }
            ],
            "audio": "Required. The URL of the pronunciation audio file.",
            "phonetic": "Required. The phonetic symbol of the pronunciation (IPA).",
            "synonyms": "Optional. Array." ["synonym1", "synonym2"],
            "plural": "Optional. The plural form of the word if the word is a noun.",
            "dailyUsePhrases": "Requred. Array." [
                {
                    "en": "A phrase that contains the word.",
                    "zh": "The translation in Chinese."
                }
            ]
            "past": "Optional. The past tense of the word if the word is a verb.",
        For example:
        {
            en: 'apple',
            en_meaning: 'a round fruit with a smooth, red or green skin and a crisp, juicy flesh.',
            zh_meaning: '苹果',
            examples: [
                { en: 'I ate an apple for breakfast.', zh: '我早餐吃了一个苹果。' },
                { en: 'The apple was sweet and juicy.', zh: '这个苹果又甜又多汁。' }
            ],
            audio: 'https://www.oxfordlearnersdictionaries.com/media/audio/english/english_pronunciation/apple.mp3',
            phonetic: '/ˈæp.əl/',
            synonyms: [ 'fruit' ],
            plural: 'apples',
            dailyUsePhrases: [
                { en: 'an apple a day keeps the doctor away', zh: '一日一苹果，医生远离我' },
                { en: 'a rotten apple', zh: '害群之马' }
            ]
        }`
  },
  openai_model_config: (prompt) => {
    return {
      model: 'gpt-4o-mini-2024-07-18',
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'english_teacher_schema',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              word: {
                type: 'string',
                description: 'The word being defined.'
              },
              phonetic: {
                type: 'string',
                description: 'The IPA phonetic pronunciation of the word.'
              },
              root: {
                type: 'string',
                description: 'The root of the word if it has one.'
              },
              is_common: {
                type: 'boolean',
                description: 'Indicates if the word is commonly used.'
              },
              common_synonyms: {
                type: 'array',
                description: 'A list of common synonyms.',
                items: {
                  type: 'string'
                }
              },
              definitions: {
                type: 'array',
                description: 'Common meanings of the word sorted in order.',
                items: {
                  type: 'object',
                  properties: {
                    part_of_speech: {
                      type: 'string',
                      description: 'The grammatical category of the word.'
                    },
                    cn: {
                      type: 'string',
                      description: 'The Chinese meaning of the word.'
                    },
                    en: {
                      type: 'string',
                      description: 'The English meaning of the word.'
                    },
                    examples: {
                      type: 'array',
                      description: 'Example sentences in both languages.',
                      items: {
                        type: 'object',
                        properties: {
                          cn: {
                            type: 'string',
                            description: 'An example sentence in Chinese.'
                          },
                          en: {
                            type: 'string',
                            description: 'An example sentence in English.'
                          }
                        },
                        required: ['cn', 'en'],
                        additionalProperties: false
                      }
                    }
                  },
                  required: ['part_of_speech', 'cn', 'en', 'examples'],
                  additionalProperties: false
                }
              },
              phrases: {
                type: 'array',
                description: 'Daily phrases containing the word and their translations.',
                items: {
                  type: 'object',
                  properties: {
                    en: {
                      type: 'string',
                      description: 'The phrase containing the word.'
                    },
                    cn: {
                      type: 'string',
                      description: 'The translation of the phrase.'
                    }
                  },
                  required: ['en', 'cn'],
                  additionalProperties: false
                }
              },
              synonyms_antonyms: {
                type: 'object',
                description: 'Lists synonyms and antonyms of the word with subtle differences.',
                properties: {
                  synonyms: {
                    type: 'array',
                    description: 'List of synonyms.',
                    items: {
                      type: 'string'
                    }
                  },
                  antonyms: {
                    type: 'array',
                    description: 'List of antonyms.',
                    items: {
                      type: 'string'
                    }
                  },
                  comparison: {
                    type: 'array',
                    description: 'Comparison of synonyms in Chinese.',
                    items: {
                      type: 'object',
                      properties: {
                        synonym: {
                          type: 'string'
                        },
                        difference: {
                          type: 'string'
                        },
                        example: {
                          type: 'string'
                        }
                      },
                      required: ['synonym', 'difference', 'example'],
                      additionalProperties: false
                    }
                  }
                },
                required: ['synonyms', 'antonyms', 'comparison'],
                additionalProperties: false
              },
              inflections: {
                type: 'object',
                description: 'Grammatical inflections for nouns and verbs.',
                properties: {
                  plural_form: {
                    type: 'string',
                    description: 'Plural form of the noun, if applicable.'
                  },
                  verb_forms: {
                    type: 'object',
                    description: 'Forms of the verb if the word is a verb.',
                    properties: {
                      third_person_singular: {
                        type: 'string'
                      },
                      past_tense: {
                        type: 'string'
                      },
                      past_participle: {
                        type: 'string'
                      },
                      present_continuous: {
                        type: 'string'
                      }
                    },
                    required: [
                      'third_person_singular',
                      'past_tense',
                      'past_participle',
                      'present_continuous'
                    ],
                    additionalProperties: false
                  }
                },
                required: ['plural_form', 'verb_forms'],
                additionalProperties: false
              },
              derived_words: {
                type: 'array',
                description: 'List of words derived from the original word.',
                items: {
                  type: 'string'
                }
              },
              visual_representation: {
                type: 'string',
                description: "A description of a generated image depicting the word's meaning."
              }
            },
            required: [
              'word',
              'phonetic',
              'root',
              'is_common',
              'common_synonyms',
              'definitions',
              'phrases',
              'synonyms_antonyms',
              'inflections',
              'derived_words',
              'visual_representation'
            ],
            additionalProperties: false
          }
        }
      },
      messages: [
        {
          role: 'system',
          content: [
            {
              text: '我是一个英文词汇老师。负责讲解英文词汇的含义，并给出例句和常用词组。',
              type: 'text'
            }
          ]
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'sarcasm'
            }
          ]
        },
        {
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: '{\n  "word": "sarcasm",\n  "phonetic": "/ˈsɑːr.kæz.əm/",\n  "root": "Greek sarkasmos",\n  "is_common": true,\n  "common_synonyms": [\n    "irony",\n    "mockery",\n    "satire"\n  ],\n  "definitions": [\n    {\n      "part_of_speech": "noun",\n      "cn": "讽刺",\n      "en": "the use of irony to mock or convey contempt.",\n      "examples": [\n        {\n          "cn": "他的讽刺让整个房间都哄堂大笑。",\n          "en": "His sarcasm made the whole room burst into laughter."\n        }\n      ]\n    },\n    {\n      "part_of_speech": "noun",\n      "cn": "挖苦",\n      "en": "a form of verbal irony where someone says the opposite of what they mean.",\n      "examples": [\n        {\n          "cn": "她的挖苦让人感到不快。",\n          "en": "Her sarcasm made people uncomfortable."\n        }\n      ]\n    }\n  ],\n  "phrases": [\n    {\n      "en": "sarcasm detection",\n      "cn": "讽刺检测"\n    },\n    {\n      "en": "use sarcasm",\n      "cn": "使用讽刺"\n    }\n  ],\n  "synonyms_antonyms": {\n    "synonyms": [\n      "irony",\n      "mockery",\n      "satire"\n    ],\n    "antonyms": [\n      "sincerity",\n      "earnestness",\n      "honesty"\n    ],\n    "comparison": [\n      {\n        "synonym": "irony",\n        "difference": "ironically conveys a message opposite to what is intended, while sarcasm is sharper and often targets a person.",\n        "example": "他的言辞讽刺不已，但这实际上是一种讽刺。"\n      },\n      {\n        "synonym": "mockery",\n        "difference": "mockery implies ridicule in a broader sense, while sarcasm is often a more pointed and sharp remark.",\n        "example": "他用挖苦的方式来嘲笑她的错误。"\n      }\n    ]\n  },\n  "inflections": {\n    "plural_form": "",\n    "verb_forms": {\n      "third_person_singular": "",\n      "past_tense": "",\n      "past_participle": "",\n      "present_continuous": ""\n    }\n  },\n  "derived_words": [\n    "sarcastic",\n    "sarcastically"\n  ],\n  "visual_representation": "An illustration showing a person rolling their eyes while saying something that sounds complimentary but is actually mocking, indicating the contrast between tone and meaning."\n}'
            }
          ]
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'binge'
            }
          ]
        },
        {
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: '{"word":"binge","phonetic":"/bɪndʒ/","root":"Old English \'bind\'","is_common":true,"common_synonyms":["excess","drinking spree","spree"],"definitions":[{"part_of_speech":"verb","cn":"狂欢","en":"to indulge in an activity, usually something enjoyable, to excess.","examples":[{"cn":"他们在周末狂欢了整整两天。","en":"They binged for two whole days over the weekend."}]},{"part_of_speech":"noun","cn":"狂欢","en":"a period of excessive indulgence in an activity, particularly eating or drinking.","examples":[{"cn":"她的饮食狂欢导致了健康问题。","en":"Her binge eating led to health problems."}]}],"phrases":[{"en":"binge-watching","cn":"狂欢观看"},{"en":"binge-drinking","cn":"狂饮"}],"synonyms_antonyms":{"synonyms":["excess","splurge","spree"],"antonyms":["moderation","abstinence","control"],"comparison":[{"synonym":"excess","difference":"excess suggests an overabundance without a specific activity attached, while binge refers to a concentrated period of indulgence.","example":"学习过度不如狂欢无度。"},{"synonym":"spree","difference":"spree implies a short burst of activity whereas binge indicates prolonged overindulgence.","example":"购物狂欢往往是短期的，而饮酒狂欢可能会持续数天。"}]},"inflections":{"plural_form":"","verb_forms":{"third_person_singular":"binges","past_tense":"binged","past_participle":"binged","present_continuous":"bingeing"}},"derived_words":["binge-eating","binge-watch","binge-drink"],"visual_representation":"An image depicting someone relaxing on a couch surrounded by snacks and drinks, intently watching a TV series on multiple screens, symbolizing binge-watching."}'
            }
          ]
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            }
          ]
        }
      ]
    }
  }
}
