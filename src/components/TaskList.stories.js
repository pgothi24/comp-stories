import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Provider } from "react-redux";
import TaskList from "./TaskList";
import { task, actions } from "./Task.stories";
import { withKnobs, object } from "@storybook/addon-knobs/react";
// A super-simple mock of a redux store
const store = {
  getState: () => {
    return {
      tasks: defaultTasks
    };
  },
  subscribe: () => 0,
  dispatch: action("dispatch")
};

export const defaultTasks = [
  { ...task, id: "1", title: "Task 1" },
  { ...task, id: "2", title: "Task 2" },
  { ...task, id: "3", title: "Task 3" },
  { ...task, id: "4", title: "Task 4" },
  { ...task, id: "5", title: "Task 5" },
  { ...task, id: "6", title: "Task 6" }
];

export const withPinnedTasks = [
  ...defaultTasks.slice(0, 5),
  { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" }
];

storiesOf("TaskList", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .addDecorator(story => <div style={{ padding: "3rem" }}>{story()}</div>)
  .add("default", () => (
    <TaskList tasks={object("task_list", { ...defaultTasks })} {...actions} />
  ))
  .add("withPinnedTasks", () => (
    <TaskList
      tasks={object("task_list_pinned", { ...withPinnedTasks })}
      {...actions}
    />
  ))
  .add("loading", () => (
    <TaskList loading={object("loading", true)} tasks={[]} {...actions} />
  ))
  .add("empty", () => <TaskList tasks={[]} {...actions} />);
