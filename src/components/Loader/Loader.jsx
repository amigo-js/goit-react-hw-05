import BeatLoader from "react-spinners/BeatLoader";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader}>
      <BeatLoader color="#36d7b7" />
    </div>
  );
}
