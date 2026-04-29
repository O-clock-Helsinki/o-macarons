import "./macaronCard.scss"

interface MacaronCardProps {
  macaron: IMacaron
  onClick: () => void
}

//Function component = parameters
// Je peux récuperer des Props via les paramètres d'entrées de ma fonction component, ici le parfun du macaron
export default function MacaronCard({ macaron, onClick }: MacaronCardProps) {
  return (
    <button type="button" onClick={onClick} className="macaron">
      <div
        className="macaron__coque"
        // changement de la couleur avec du CSS-in-JS
        style={{ backgroundColor: macaron.colour }}
      />
      <div className="macaron__filling">macaron {macaron.flavour}</div>
      <div
        className="macaron__coque reversed"
        style={{ backgroundColor: macaron.colour }}
      />
      <p>{macaron.isDelicious ? "délicious" : "well... not so good"}</p>
      {macaron.sweetness && <p>Sweetness : {macaron.sweetness}</p>}
    </button>
  )
}
