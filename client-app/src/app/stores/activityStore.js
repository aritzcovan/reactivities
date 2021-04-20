// import { makeObservable, observable, action }  from 'mobx';
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";


export default class ActivityStore {
  activities = [];
  activityRegistry = new Map();
  selectedActivity = null;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    // makeObservable(this, {
    //     title: observable,
    //     setTitle: action
    // })
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => 
      Date.parse(a.date  - Date.parse(b.date)))
  }

  get groupedActivities() {
    
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date] ? [...activities[date], activity] : [activity];
        return activities;
      }, {})
    )
  }

  loadActivities = async () => {
    //this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      
        activities.forEach((activity) => {
         this.setActivity(activity);
        });
      
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id) => {
    
    let activity = this.getActivity(id);
    if(activity){
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        this.selectedActivity = activity;
        this.setLoadingInitial(false);
        return activity;
      }catch(error) {
        console.log(error)
        this.setLoadingInitial(false);
      }
    }
  }
  setActivity(activity) {
    activity.date = activity.date.split('T')[0];
    this.activityRegistry.set(activity.id, activity);
  }

  getActivity(id){
    return this.activityRegistry.get(id);
  }
  setLoadingInitial = (state) => {
      this.loadingInitial = state;
  }

  createActivity = async (activity) => {
    this.loading = true;
    try{
      await agent.Activities.create(activity);
      runInAction(() => {
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
        this.selectActivity = activity;
        this.editMode = false;
        this.loading = false;
      })
    } catch(error){
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }

  }
  updateActivity = async (activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        // this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.loading = false;
        this.editMode = false;
      })
    }catch(error){
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }

  deleteActivity = async(id) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        // this.activities = [...this.activities.filter(a => a.id !== id)];
        this.activityRegistry.delete(id);
        this.loading = false;
      })

    }catch(error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }
}
