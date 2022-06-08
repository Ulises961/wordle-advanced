import { toString } from './game.lib';
import { Letter, FullDefinition, PartialDefinition } from './types';

export const retrieveDefinition = async (
  answer: Letter[]
): Promise<FullDefinition> => {
  const word = toString(answer);
  const definition_endpoint = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;
  const synonym_endpoint = `https://wordsapiv1.p.rapidapi.com/words/${word}/synonym`;
  const similarTo_endpoint = `https://wordsapiv1.p.rapidapi.com/words/${word}/similarTo`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
      'X-RapidAPI-Key': '745aca47d5msh4c5315e5cc88834p151353jsn9afe9a658e08',
    },
  };
  const noInfoMsg = "Sorry we couldn't get any more help!";
  let definitions: PartialDefinition[];
  try {
    let res = await fetch(definition_endpoint, options);
    let parsedRes = await res.json();

    definitions =
      parsedRes.definitions.length === 0
        ? [{ definitions: noInfoMsg, partOfSpeech: noInfoMsg }]
        : parsedRes.definitions;

    // console.log('definitions', definitions);

    res = await fetch(synonym_endpoint, options);
    parsedRes = await res.json();
    const synonym: string | undefined = (await parsedRes.synonym[0])
      ? parsedRes.synonym[0]
      : undefined;

    // console.log('synonym', synonym);

    res = await fetch(similarTo_endpoint, options);
    parsedRes = await res.json();
    const similarTo: string | undefined = (await parsedRes.similarTo[0])
      ? parsedRes.similarTo[0]
      : undefined;

    // console.log('similarTo', similarTo);

    let extraInfo: string =
      synonym || similarTo || definitions[1]?.definition || noInfoMsg;
    return {
      definition: definitions[0]?.definition,
      partOfSpeech: definitions[0]?.partOfSpeech,
      extraInfo: extraInfo,
    };
  } catch (error) {
    console.error('Api.requests', error);

  } 
   
  
};
