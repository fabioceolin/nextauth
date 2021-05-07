import { FormEvent, useContext, useState } from "react";
import Lottie from "react-lottie";

import animationData from "../assets/smartHome.json";

import { withSSRGuest } from "../utils/withSSRGuest";
import { AuthContext } from "../contexts/AuthContext";

import styles from "./home.module.scss";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contentForm}>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Entrar</button>
          </form>
        </div>
        <div className={styles.image}>
          <Lottie
            options={{ loop: true, animationData: animationData }}
            height={600}
            width={600}
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
