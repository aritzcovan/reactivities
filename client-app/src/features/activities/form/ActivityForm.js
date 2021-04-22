import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Button, FormMyTextInput, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ActivityForm() {
  const history = useHistory();
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;
  let { id } = useParams();

  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("the activity title is required"),
    description: Yup.string().required("the activity description is required"),
    category: Yup.string().required(),
    date: Yup.date().required('date is required').nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) => {
        setActivity(activity);
      });
  }, [id, loadActivity]);

  function handleFormSubmit(activity){
      if(activity.id.length === 0) {
          let newActivity = {...activity, id: uuid()};
          createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`) )
      } else {
          updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
      }
  }
  // function handleInputChange(event){
  //     const { name , value } = event.target;
  //     setActivity({...activity, [name]: value});
  // }
  if (loadingInitial)
    return <LoadingComponents content="loading activity..." />;
  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik
        enableReinitialize
        initialValues={activity}
        validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" autoComplete="false">
            <MyTextInput name="title" placeholder="title" />
            <MyTextArea rows="3" placeholder="Description" name="description" />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM, d, yyyy h:mm aa"
            />
            <Header content='Location Details' sub color='teal' />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              as={Link}
              to="/activities"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
