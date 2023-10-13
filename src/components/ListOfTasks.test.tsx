import ListOfTasks from "./ListOfTasks";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store.tsx";

describe("Accordion", () => {
  it("should render the TextField with label Search Task component", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <ListOfTasks selectedValue={"c"} />
      </Provider>
    );

    const taskElement = getByLabelText("Search Task By Description");
    expect(taskElement).toBeTruthy();
  });

  it("should render the ListOfTasks component with CardTask components", () => {
    const { queryAllByTestId } = render(
      <Provider store={store}>
        <ListOfTasks selectedValue={"c"} />
      </Provider>
    );

    const cardTaskElements = queryAllByTestId("card-task");

    expect(cardTaskElements);
  });
});
