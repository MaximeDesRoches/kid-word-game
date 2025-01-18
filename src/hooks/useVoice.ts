import { useEffect, useState } from "react";

let voicesList: SpeechSynthesisVoice[] | (() => SpeechSynthesisVoice[]) = [];

export default function useVoice(language = "en-US") {
	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(voicesList);

	useEffect(() => {
		if (voices.length === 0) {
			setVoices(speechSynthesis.getVoices());
			speechSynthesis.onvoiceschanged = () => {
				voicesList = speechSynthesis.getVoices();
				setVoices(speechSynthesis.getVoices());
			};
		}
	}, []);

	const correctLanguageVoices = voices.filter((voice) => voice.lang === language);

	const amelie = correctLanguageVoices?.find((voice) => voice.name.includes("Amélie"));

	return amelie || correctLanguageVoices?.[0];
}