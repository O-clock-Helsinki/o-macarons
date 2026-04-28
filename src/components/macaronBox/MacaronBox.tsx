import "./macaronBox.scss"

interface MacaronBoxProps {
  children: React.ReactNode
}

export default function MacaronBox({ children }: MacaronBoxProps) {
  return <section className="macaronBox">{children}</section>
}
