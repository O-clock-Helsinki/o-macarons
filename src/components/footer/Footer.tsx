// useState est une fonction speciale importée de React, c'est un hook c'est à dire qu'elle n'a le droit d'etre utilisée que dans des composants (fonction qui return du JSX) et elle ne doit etre executée que à la racine du composant (pas dans des boucles, des conditions, des sous fonctions)
import { useState } from "react"
import "./footer.scss"
import { Link } from "react-router"

interface FooterProps {
  macaron: IMacaron | undefined
}

export default function Footer({ macaron }: FooterProps) {
  // on peut aussi definird es variables réactives, des variables de state, on utilise useState
  // je veux créer 2 variables à partir des 2 lignes de mon tableau, j'utilise la syntaxe du destructuring  directement
  const [count, setCount] = useState(60)

  //Une fonction composante ne peut avoir qu'UN SEUL PARENT
  //Le react fragment : Crée un parent unique mais SEULEMENT  dans le scope du code
  //Le react fragment est une pseudo balise qui disprait une fois le dom généré
  return (
    <>
      {macaron && (
        <aside>
          <h3>Selected macaron :</h3>
          <article>
            <h4 style={{ backgroundColor: macaron.colour, padding: "2rem" }}>
              macaron {macaron.flavour}
            </h4>
          </article>
        </aside>
      )}
      <footer className="footer">
        <p className="result">
          {/* dans le JSX on peut mettre des expressions JS si on les entoure d'accolades (un peu comme dans les template string) */}
          resultat <span>{count}</span>
        </p>
        <button
          // on ecoute le click et on execute le handler defini ici dans le JSX quand un click survient
          onClick={() => {
            console.log("click")
            // on veut incrementer le compteur, il faut utiliser le setter renvoyé par useState
            // on donne en paramètre au setter la nouvelle valeur de count
            // ATTENTION on ne doit jamais modifier le state directement
            // count = count + 1 --> INTERDIT !!!
            setCount(count + 1)
          }}
          type="button"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => {
            setCount(count - 1)
          }}
        >
          -
        </button>
        <button
          type="button"
          onClick={() => {
            // reset le compteur
            setCount(0)
          }}
        >
          reset
        </button>

        <nav>
          <ul>
            <li>
              {/* equivalent <a href=""></a> */}
              {/* les Link ne sont utilisés QUE POUR le MAILLAGE INTERNE */}
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/contact">contact</Link>
            </li>
            <li>
              <Link to="/add-macaron">Ajouter un nouveau macaron</Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  )
}
