import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityList() {
  
  const [target, setTarget] = useState('');
  const { activityStore } = useStore();
  const { activitiesByDate, deleteActivity, loading} = activityStore;

  function handleActivityDelete(evt, id){
    setTarget(evt.target.name);
    deleteActivity(id);
  }
  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((act) => (
          <Item key={act.id}>
            <Item.Content>
              <Item.Header as="a">{act.title}</Item.Header>
              <Item.Meta>{act.date}</Item.Meta>
              <Item.Description>
                <div>{act.description}</div>
                <div>
                  {act.city}, {act.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="view"
                  color="blue"
                  onClick={() => activityStore.selectActivity(act.id)}
                />
                <Button
                  name={act.id}
                  floated="right"
                  content="delete"
                  color="red"
                  loading={loading && target === act.id}
                  onClick={(e) => handleActivityDelete(e, act.id)}
                />
                <Label basic content={act.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
})
