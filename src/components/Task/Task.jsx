import { StyleTask } from "./styles";

export function Task(props) {

    //console.log(props);

    return (        
        <StyleTask>
            <p>{props.tarefa}</p>
            <button onClick={()=> props.onRemove(props.id)}>X</button>
        </StyleTask>
    )
}

//Definindo um valor default para a propriedade caso não seja recebido
// Task.defaultProps = {
//     tarefa : 'Sem título'
// }