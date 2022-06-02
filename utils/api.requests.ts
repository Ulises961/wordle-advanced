import { toString } from "./game.lib";
import { Letter, FullDefinition, PartialDefinition } from "./types";

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
  
    const definition: PartialDefinition[] = await fetch(
      definition_endpoint,
      options
    )
      .then((res) => res.json())
      .then((parsedRes): PartialDefinition[] => parsedRes.definitions);
  
    console.log('definition', definition);
  
    let res = await fetch(synonym_endpoint, options);
    let parsedRes = await res.json();
    const synonym = (await parsedRes.synonym[0])
      ? parsedRes.synonym[0]
      : undefined;
  
    console.log('synonym', synonym);
  
    res = await fetch(similarTo_endpoint, options);
    parsedRes = await res.json();
    const similarTo = (await parsedRes.similarTo[0])
      ? parsedRes.similarTo[0]
      : undefined;
  
    console.log('similarTo', similarTo);
  
    let extraInfo =
      synonym ||
      similarTo ||
      definition[1]?.definition ||
      "Sorry we couldn't get any more help!";
  
  
    return {
      definition: definition[0].definition,
      partOfSpeech: definition[0].partOfSpeech,
      extraInfo: extraInfo,
    };
  };
  