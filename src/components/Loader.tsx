import { FaSpinner } from "react-icons/fa"
import styles from "./Loader.module.css"

function Loader() {
  return <>
    <FaSpinner className={styles.loader} />
  </>
};

export default Loader
