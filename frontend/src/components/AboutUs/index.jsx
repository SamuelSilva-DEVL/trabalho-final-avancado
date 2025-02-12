import { CardBasic } from "@components"
import Tenis from "@assets/tenis_azul.jpg"
import styles from "./styles.module.css"

export function AboutUs() {
  return (
    <section className={styles["content-aboutus"]}>
      <div className={styles["content-image"]}>
        <img
          src={Tenis}
          alt="Imagem de um tênis azul com branco"
          height={350}
        />
      </div>

      <CardBasic
        title="Capacita Brasil"
        subtitle="Formação Desenvolvedor Full Stack"
        description="O Capacita Brasil é mais que um curso, é uma oportunidade de transformação. A formação em Desenvolvimento Full Stack proporciona o conhecimento necessário para construir aplicações completas, do front-end ao back-end. Até agora, exploramos as bases fundamentais com HTML, CSS, JavaScript e React, consolidando pilares essenciais para uma carreira sólida na tecnologia. Cada aprendizado é um passo rumo a um futuro promissor no mercado de trabalho."
        titleButton="Saiba mais"
      />
    </section>
  )
}
