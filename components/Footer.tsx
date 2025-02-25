import { SITE } from "../config";
import styles from "../styles/Layout.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Maintained by the OpenNext community</span>
      <div>
        <a target="_blank" href={SITE.github} rel="noopener noreferrer">
          GitHub
        </a>
        <a target="_blank" href={SITE.discord} rel="noopener noreferrer">
          Discord
        </a>
      </div>
    </footer>
  );
}
