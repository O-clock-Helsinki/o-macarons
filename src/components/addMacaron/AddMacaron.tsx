import { useState } from "react"

interface AddMAcaronProps {
  updateMacaron: (macaron: Omit<IMacaron, "id" | "isDelicious">) => void
}

export default function AddMacaron({ updateMacaron }: AddMAcaronProps) {
  //Je stocke la valeur qui sera modifiée par l'utilisateur dans un state
  //Ce qui me permet de controller le formulaire en temps réel
  const [sweetness, setSweetness] = useState<number>(5)
  //Je prépare une fonction pour manager le traitement du formulaire envoyé
  //Depuis React 19 : preventDefault Embarqué
  //Depuis React 19 : instanciation automatique d'un formData pour récupérer les infos envoyées par l'utilisateurs
  function handleAction(formData: FormData) {
    //Avant React 19
    //e.preventDefault()
    //const newForm = new FormData()

    //Je récupère les valeurs remplies du form
    const flavour = formData.get("flavour") as string
    const color = formData.get("colour") as string
    //Si les valeurs sont correctes
    if (flavour.trim() && color.trim() && sweetness) {
      return updateMacaron({
        flavour: flavour,
        color: color,
        sweetness: sweetness,
      })
    }
    return alert("please fill the form correctly mate")
  }

  //Principe d'immutabilité
  //types primitifs string / number / boolean
  //   const name = "Ben"
  //   const name2 = "Ben"
  //   console.log(name === name2)

  //Types non primitifs : tableaux / objets ...
  //pointent vers une reference / une adresse
  //   const students: string[] = ["Aurore", "Ludovic", "Steve"]
  //   const students2: string[] = ["Aurore", "Ludovic", "Steve"]
  //   console.log(students === students2)

  //   const students3: string[] = ["Aurore", "Ludovic", "Steve"]
  //   const students4: string[] = students3
  //Pour éviter d'écraser des tableaux : Le spread operator
  //   const students5: [] = [...students3, ...data, "Carte graphique", 67]
  //   console.log(students3 === students4)
  //   students3.push("Virgine")
  //   console.log(students4)
  //   console.log(students5)

  // Form non controlé :
  // 1- l'attribut name des input nous permettra à l'envoi du formulaire de récupérer la valeur tapée par l'utilisateur
  // Avant React 19 on utilisait l'attribut onSubmit, maintenant on peut utiliser le action
  // 2 - l'attribut Action permet de trigger une fonction à l'envoi du form
  return (
    <form action={handleAction}>
      <div>
        <label htmlFor="flavour">Flavour</label>
        <input type="text" name="flavour" id="flavour" />
      </div>
      <div>
        <label htmlFor="colour">Colour</label>
        <input type="color" name="colour" id="colour" />
      </div>
      <div>
        <label htmlFor="sweetness">Sweetness</label>
        <input
          min="1"
          max="5"
          type="range"
          value={sweetness}
          onChange={(e) => setSweetness(Number(e.target.value as string))}
          id="sweetness"
        />
        <span>current sweetness : {sweetness}</span>
        {sweetness >= 4 && (
          <span>l'abus de sucre est dangereux pour la santé</span>
        )}
      </div>
      <button type="submit">Add Macaron</button>
    </form>
  )
}
