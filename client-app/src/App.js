import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then((resp) => {
      console.log(resp.data)
      setActivities(resp.data)
    })
    return () => {
      
    }
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='reactivities'/>
      <List>
         {activities.map(activity => (
           <List.Item key={activity.id}> 
             {activity.title}
           </List.Item>
         ))}
         </List>
       
      
    </div>
  );
}

export default App;
