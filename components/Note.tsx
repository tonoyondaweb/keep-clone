interface props {
    id: string,
    title: string,
    text: string,
}

export default function Note({id, title, text}: props) {
  return (
    <div>
        <h1>{title}</h1>
        <p>{text}</p>
    </div>
  )
}