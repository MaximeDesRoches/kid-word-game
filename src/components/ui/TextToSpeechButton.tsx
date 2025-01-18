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
    <span className="icon">
      <FontAwesomeIcon onClick={() => say(word)} icon={faBullhorn} />
    </span>
  );
}
