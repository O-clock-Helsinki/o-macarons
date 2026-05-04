import { useParams } from "react-router"

interface MacaronDetailProps {
  macaronList: IMacaron[]
}

export default function MacaronDetail({ macaronList }: MacaronDetailProps) {
  //useParams : Permet de récupérer les tronçons d'url, qui sont des placeholders (:flavour ici)
  const { flavour } = useParams()

  const macaron: IMacaron | undefined = macaronList.find(
    (macaron) => macaron.flavour === flavour,
  )

  return (
    <section>
      {macaron ? (
        <div style={{ backgroundColor: macaron.color, padding: "2rem" }}>
          <h1>Macaron : {macaron.flavour}</h1>
          <h2>Category : {macaron.category}</h2>
        </div>
      ) : (
        <p>Aucun macaron trouvé pour cette saveur : {flavour}</p>
      )}
    </section>
  )
}
