import MacaronCard from "./components/macaron/MacaronCard"
import Footer from "./components/footer/Footer"
import "./app.scss"
import data from "./data/macarons"
import MacaronBox from "./components/macaronBox/MacaronBox"
import { useState } from "react"

// COMPOSANT : un composant est une fonction qui return du JSX
// on met une majuscule au debut du nom de la fonction composant
function App() {
  // ici on peut definir des variables (bidons: qui ne sont pas réactives)
  // on a un tableau de string et on veut fabriquer un tableau de div pour notre JSX on va utiliser MAP
  const macaronList: IMacaron[] = data

  //Je souhaite pouvoir selectionner un macaron et qu'il s'affiche dans le footer
  //J'ai BESOIN de déclarer le state dans app CAR j'ai besoin de
  // selectedMacaron dans mon footer
  // De setSelectedMacaron dans mes MacaronCard afin de modifier le macaron selectionné
  const [selectedMacaron, setSelectedMacaron] = useState<undefined | IMacaron>(
    data[0] || undefined,
  )

  return (
    <div className="app">
      <header className="header">
        <h1 className="header-title">O'Macarons</h1>
      </header>
      <main className="main">
        <MacaronBox>
          {macaronList.length > 0 ? (
            // avec map on fabrique un tableau d'element div JSX
            macaronList.map((macaron: IMacaron) => {
              // on doit return la ligne du tableau généré par map: un element JSX div
              // on est obligé d'ajouter une prop "key" aux elements quand ils sont dan sun tableau pour que React puisse les identifier (attention on ne met pas l'index du tableau en key)
              return (
                <MacaronCard
                  key={macaron.id}
                  macaron={macaron}
                  onClick={() => setSelectedMacaron(macaron)}
                />
              )
            })
          ) : (
            <p>Pas de macarons dans cette boite ! </p>
          )}
        </MacaronBox>
        <MacaronBox>
          <article>
            <h2>bienvenue dans ma boite à macarons vide</h2>
          </article>
        </MacaronBox>
      </main>
      <Footer macaron={selectedMacaron} />
    </div>
  )
}

// on pense à exporter le composant pour qu'il soit utilisable ailleurs
export default App
