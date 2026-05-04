import AddMacaron from "../../components/addMacaron/AddMacaron"

interface AddMacaronProps {
  updateMacaron: (macaron: Omit<IMacaron, "id" | "isDelicious">) => void
}
export default function AddMacaronPage({ updateMacaron }: AddMacaronProps) {
  return <AddMacaron updateMacaron={updateMacaron} />
}
