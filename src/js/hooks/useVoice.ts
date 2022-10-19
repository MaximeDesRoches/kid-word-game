import { useEffect, useState } from "react";

let voicesList = [];

export default function useVoice(language = "en-US") {
	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(voicesList);

	useEffect(() => {
		if (voices.length === 0) {
			speechSynthesis.getVoices();
			speechSynthesis.onvoiceschanged = () => {
				voicesList = speechSynthesis.getVoices();
				setVoices(speechSynthesis.getVoices());
			};
		}
	}, []);

	return voices.find((voice) => voice.lang === language);
}