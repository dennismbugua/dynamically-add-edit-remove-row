import * as React from "react";
import styles from "./Switch.module.css";

const Switch = ({ handleChange, label, name, value }) => (
  <div className={styles.container}>
    <div className={styles.label}>{label}</div>
    <label className={styles.switch}>
      <input
        className={styles.input}
        name={name}
        type="checkbox"
        checked={value}
        onChange={handleChange}
      />
      <span className={`${styles.slider} ${value && styles.checked}`} />
    </label>
  </div>
);

export default Switch;
