import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";

export default function ActivityList(props) {
  const { activities, selectActivity, deleteActivity} = props;
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((act) => (
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
                  onClick={() => selectActivity(act.id)}
                />
                <Button
                  floated="right"
                  content="delete"
                  color="red"
                  onClick={() => deleteActivity(act.id)}
                />
                <Label basic content={act.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
