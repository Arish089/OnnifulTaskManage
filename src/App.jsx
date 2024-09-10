import { useEffect, useState } from 'react'
import './App.css'

import { Box, Flex, Heading, Spacer, Button, FormControl, Input, Select, Text, useDisclosure } from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'
import TaskInput from './Components/TaskInput';
import Tasks from './Components/Tasks';
import axios from 'axios';


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
const [tasks,setTasks] = useState([])
const [del,setDel] = useState(false)
const [sortCriteria,setSortCriteria] = useState('')

const head =null;

const [filterTask,setFilterTask] = useState({
  priority:'',
  assignee:'',
})


// Sorting by 'priority'
const Sort=(criteria,data)=>{
  if(criteria === 'priority_asc'){
      data.sort((a, b) => parseInt(a.priority.substring(1))- parseInt(b.priority.substring(1)));
  }else if(criteria === 'priority_desc'){
    data.sort((a, b) => parseInt(b.priority.substring(1))- parseInt(a.priority.substring(1)));
}
return data;
}

// Filtering by 'priority' and 'assignee'
const Filter = (data) => {
  if (filterTask.priority !== '' && filterTask.assignee !== '') {
    return data.filter(unit => unit.assignee === filterTask.assignee && unit.priority === filterTask.priority );
  } else if (filterTask.priority !== '') {
    return data.filter(unit => unit.priority === filterTask.priority);
  } else if (filterTask.assignee !== '') {
    return data.filter(unit => unit.assignee === filterTask.assignee);
  }
  return data;
};



const FetchTask = async ()=>{
  try {
    let resp = await axios.get(`http://localhost:3000/tasks`)
    let data = await resp.data
    console.log(data);
    let fildata =Filter(data)
    console.log(fildata);
    let sortedData = Sort(sortCriteria,fildata)
    setTasks(sortedData) 
    return data
  } catch (error) {
    console.log(error);
  }
}

useEffect(()=>{
  FetchTask()
},[onClose,onOpen,del,sortCriteria,filterTask])


  return (
    <Box bg='#0A1828' h='auto' color='#BFA181'>
      <Flex w='80%' m='auto' alignItems='center' py={8}>
        <Heading color='#BFA181'>Task Board</Heading>
        <Spacer />
        <Box pt={2}><FaUserCircle size={40} color='silver' /></Box>
      </Flex>
      
      <FormControl py={8}>
        <Flex direction='column' w='80%' m='auto' gap={8} justifyContent='center' h='auto' p={6} pb={6} border='1px solid lightblue'>

          <Flex direction={{ base: 'column', lg: 'row' }} justifyContent='space-between' gap={{ base: 4 }} textAlign={{ base: 'center', md: 'inherit' }}>

            <Flex gap={4} direction={{ base: 'column', lg: 'row' }} alignItems='center'>
              <Text fontWeight='bold' w='250px' color='#178582'>Filter by:</Text>
              <Input placeholder='Assignee Name' value={filterTask.assignee} onChange={(e)=> setFilterTask({
                ...filterTask,
                assignee:e.target.value
              })} />
              <Select value={filterTask.priority} onChange={(e)=>setFilterTask({
                ...filterTask,
                priority:e.target.value
              })}>
                <option value="">Priority</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </Select>
              
              
            </Flex>
            <Spacer />

            <Box pt={1}>
              <Button bg='#178582' fontWeight={'800'} fontSize='large' color='#BFA181' onClick={onOpen}>
                Add New Task +
              </Button>
              <TaskInput onClose={onClose} isOpen={isOpen} FetchTask={()=>FetchTask()}/>
            </Box>

          </Flex>

          <Flex w='fit-content' alignItems='center'>
            <Text w='130px' color='#178582' fontWeight='bold'>Sort by:</Text>
            <Select value={sortCriteria} onChange={(e)=>setSortCriteria(e.target.value)}>
              <option value="">Priority</option>
              <option value="priority_asc">Low to high</option>
              <option value="priority_desc">High to low</option>
            </Select>
          </Flex>
          
            <Box display={{md:'block'}}>
            <Flex justifyContent='space-around' flexWrap='wrap' h='auto' gap={4}>
              <Tasks del={del} setDel={setDel} FetchTask={()=>FetchTask()} head="Pending" tasks={tasks.filter(task => task.status === "Pending")}/>
              <Tasks del={del} setDel={setDel} FetchTask={()=>FetchTask()} head="In Progress" tasks={tasks.filter(task => task.status === "In Progress")} />
              <Tasks del={del} setDel={setDel} FetchTask={()=>FetchTask()} head="Completed" tasks={tasks.filter(task => task.status === "Completed")} />
              <Tasks del={del} setDel={setDel} FetchTask={()=>FetchTask()} head="Deployed" tasks={tasks.filter(task => task.status === "Deployed")} />
              <Tasks del={del} setDel={setDel} FetchTask={()=>FetchTask()} head="Deferred" tasks={tasks.filter(task => task.status === "Deferred")} />
            </Flex>
            </Box>
  

        </Flex>
      </FormControl>
    </Box>
  )
}

export default App
