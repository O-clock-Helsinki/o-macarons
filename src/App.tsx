import Footer from "./components/footer/Footer"
import "./app.scss"
import { useEffect, useState } from "react"
import Loader from "./components/loader/Loader"
import { NavLink, Route, Routes } from "react-router"
import Contact from "./pages/contact/Contact"
import NotFound from "./pages/notFound/NotFound"
import Home from "./pages/home/Home"
import AddMacaronPage from "./pages/addMacaron/AddMacaronPage"
import MacaronDetail from "./pages/macaronDetail/MacaronDetail"

// COMPOSANT : un composant est une fonction qui return du JSX
// on met une majuscule au debut du nom de la fonction composant
function App() {
  // ici on peut definir des variables (bidons: qui ne sont pas réactives)
  // on a un tableau de string et on veut fabriquer un tableau de div pour notre JSX on va utiliser MAP
  // Une fois qu'on utilise un useState : on ne modifie la valeur QU'AVEC le setter associé
  const [macaronList, setMacaronList] = useState<IMacaron[]>([])

  //Je prépare un message d'erreur pour avertir mon user
  const [errorMessage, setErrorMessage] = useState("")

  //Je prépare un loader pour mon app
  const [isLoading, setIsLoading] = useState(false)

  //Je souhaite pouvoir selectionner un macaron et qu'il s'affiche dans le footer
  //J'ai BESOIN de déclarer le state dans app CAR j'ai besoin de
  // selectedMacaron dans mon footer
  // De setSelectedMacaron dans mes MacaronCard afin de modifier le macaron selectionné
  const [selectedMacaron, setSelectedMacaron] = useState<undefined | IMacaron>(
    macaronList[0] || undefined,
  )
  //Je crée une fonction pour ajouter un macaron à ma liste
  // Omit est un utility type de Typescript permettant d'oublier des clef pour un objet
  // Le partial vous permet de récupérer un objet incomplet sans definir les clefs manquantes
  // ex : Partial<IMacaron>
  function updateMacaron(macaron: Omit<IMacaron, "id" | "isDelicious">) {
    const newMacaron = {
      ...macaron,
      id: macaronList.length + 1,
      isDelicious: true,
    }
    //je crée un nouveau tableau avec le spread operator
    const macaronListToUpdate = [...macaronList, newMacaron]
    //si on essaye de modifier le state sans passer par le setter
    //Shallow comparaison -> pas de modification
    //macaronList.push(newMacaron)
    setMacaronList(macaronListToUpdate)
  }

  useEffect(() => {
    //Je prépare une fonction async afin de fetch les datas
    async function fetchData() {
      //Je déclanche mon loader
      setIsLoading(true)
      //Url de mon API backend
      const url = "https://oclock-api.vercel.app/api/macarons"
      const error = "Une erreur est survenue, veuillez reessayer plus tard"
      try {
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setMacaronList(data)
        } else {
          setErrorMessage(error)
        }
      } catch (e) {
        setErrorMessage(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  console.log(macaronList)

  return (
    <div className="app">
      <header className="header">
        <h1 id="top-page" className="header-title">
          O'Macarons
        </h1>
        <nav>
          <ul>
            <li>
              {/* equivalent <a href=""></a> */}
              {/* les Link ne sont utilisés QUE POUR le MAILLAGE INTERNE */}
              <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/contact">contact</NavLink>
            </li>
            <li>
              <NavLink to="/add-macaron">Ajouter un nouveau macaron</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <main className="main">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    macaronList={macaronList}
                    setSelectedMacaron={setSelectedMacaron}
                    errorMessage={errorMessage}
                  />
                }
              />
              <Route
                path="/add-macaron"
                element={<AddMacaronPage updateMacaron={updateMacaron} />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/macarons/:flavour"
                element={<MacaronDetail macaronList={macaronList} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer macaron={selectedMacaron} />
        </>
      )}
    </div>
  )
}

// on pense à exporter le composant pour qu'il soit utilisable ailleurs
export default App
