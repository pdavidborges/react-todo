import { useEffect, useState } from "react";
import { Task } from "../Task/Task";
import { ContainerList } from "./styles";

export function List(){
    //console.log('Lista Renderizada');
    

    /*const listagem = [
        {titulo : 'Tarefa 1', id: 1}, 
        {titulo : 'Tarefa 2', id: 2},         
    ];*/

    //estado, função atualizadora, valor inicial

    let valorStorage = [];
    if(localStorage.getItem('taskListStorage')){
        valorStorage = JSON.parse(localStorage.getItem('taskListStorage'));
    }

    //const [taskList, setTaskList] = useState(localStorage.getItem('taskListStorage') ? JSON.parse(localStorage.getItem('taskListStorage') : []);
    const [taskList, setTaskList] = useState(valorStorage);
    const [newTask, setNewTask] = useState('');

    function addTask(e){
        e.preventDefault(); //previnindo o comportamento padrão de submit           
        //listagem.push({titulo: 'Nova tarefa', id: 3});     
        //...spread (faz uma cópia da lista) 
        //Atualizando a lista                

        let idTask = new Date().getTime();

        setTaskList([...taskList, {titulo: newTask, id:idTask}]); 
        setNewTask('');      
    }

    function removeTask(id){
        /*
        let novaLista = taskList.filter((item) => {                        
            if(item.id !== id){
                //console.log('mantém');
                return true;
            }
            else{
                //console.log('remove');
                return false;
            }            
        })

        //Atualizando o estado com a novaLista
        setTaskList(novaLista);     
        */

        setTaskList(
            taskList.filter(item => (item.id !== id))
        );

    }

    //useEffect - É executado quando o componente é renderizado 
    //e quando sua depedência sofre uma alteração
    useEffect(()=>{     
        //console.log('renderizou');
        localStorage.setItem('taskListStorage',JSON.stringify(taskList));
    },[taskList]);
   

    return(
        <ContainerList>     
            <form onSubmit={addTask}>
                <input 
                    type="text" 
                    placeholder="Digite sua tarefa" 
                    value={newTask} 
                    onChange={(e)=> setNewTask(e.target.value)}                    
                />

                <button type="submit" disabled={newTask == ''}>Criar</button>
            </form>
            {/* <Task tarefa={listagem[0].tarefa} />
                <Task />            
            */}

            {
                taskList.map((item) => (
                    <Task tarefa={item.titulo} id={item.id} key={item.id} onRemove={removeTask} />
                ))
            }

        </ContainerList>
    )

}