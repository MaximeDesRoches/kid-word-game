import { useEffect, useState } from "react";

let voicesList: SpeechSynthesisVoice[] | (() => SpeechSynthesisVoice[]) = [];

export default function useVoice(language = "fr-CA") {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(voicesList);

  useEffect(() => {
    if (voices.length === 0) {
      setVoices(speechSynthesis.getVoices());
      speechSynthesis.onvoiceschanged = () => {
        voicesList = speechSynthesis.getVoices();
        setVoices(speechSynthesis.getVoices());
      };
    }
  }, [voices.length]);

  const correctLanguageVoices = voices.filter(
    (voice) => voice.lang === language
  );

  const amelie = correctLanguageVoices?.find((voice) =>
    voice.name.includes("Amélie")
  );

  return {
    say: (sentence: string) => {
      console.log(sentence, correctLanguageVoices.length);
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = language;
      if (amelie || correctLanguageVoices[0]) {
        utterance.voice = amelie || correctLanguageVoices[0];
      }
      utterance.rate = 0.9;
      console.log("speak");
      speechSynthesis.speak(utterance);
    },
  };
}
