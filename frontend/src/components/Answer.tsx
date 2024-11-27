import { PropsAnswer } from '../interfaces'

function Answer(props: PropsAnswer) {
  const style = props.color ? { color: props.color } : {}
  return (
    <button onClick={props.onPress} disabled={props.disabled}>
      <span style={style}>{props.text}</span>
    </button>
  )
}

export default Answer
