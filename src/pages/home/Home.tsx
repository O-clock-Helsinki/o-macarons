import MacaronCard from "../../components/macaron/MacaronCard"
import MacaronBox from "../../components/macaronBox/MacaronBox"

interface HomeProps {
  macaronList: IMacaron[]
  setSelectedMacaron: (macaron: IMacaron) => void
  errorMessage: string
}

export default function Home({
  macaronList,
  setSelectedMacaron,
  errorMessage,
}: HomeProps) {
  return (
    <>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
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
      )}
      <MacaronBox>
        <article>
          <h2>bienvenue dans ma boite à macarons vide</h2>
        </article>
      </MacaronBox>
    </>
  )
}
