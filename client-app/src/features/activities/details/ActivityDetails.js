import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailSidebar from "./ActivityDetailSidebar";

export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore
    const { id } = useParams();

    useEffect(() => {
      if(id) loadActivity(id);

    }, [id, loadActivity])

    if(loadingInitial || !activity) return <LoadingComponents />;

  return (
   <Grid>
     <Grid.Column width={10}>
       <ActivityDetailHeader activity={activity} />
       <ActivityDetailInfo activity={activity} />
       <ActivityDetailChat />
     </Grid.Column>
     <Grid.Column width={6}>
       <ActivityDetailSidebar />
     </Grid.Column>
   </Grid>
  );
})
