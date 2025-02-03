import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useVoice from "../../hooks/useVoice";

export default function TextToSpeechButton({
  word,
  language,
}: {
  word: string;
  language: string;
}) {
  const { say } = useVoice(language);
  return (
    <div className="card block listen" onClick={() => say(word)}>
      <FontAwesomeIcon icon={faBullhorn} /> Écouter
    </div>
  );
}
