/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "./app/store";

describe("Tododo-list", () => {
  let user: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    user = userEvent.setup();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("schould add list item", async () => {
    const buttonAddItem = await screen.findByRole("button", {
      name: /add new item/i,
    });

    await user.click(buttonAddItem);

    const addItemInput = screen.getByRole("textbox");

    await user.type(addItemInput, "make laundry");
    expect(addItemInput).toHaveValue("make laundry");

    const buttonSubmit = screen.getByRole("button", {
      name: /add item/i,
    });

    await user.click(buttonSubmit);

    const item = screen.queryByText("make laundry");

    expect(item).toBeInTheDocument();
  });

  test("schould mark as done", async () => {
    const checkbox = await screen.findByRole("checkbox", {
      name: /feed cats/i,
    });

    await user.click(checkbox);

    await waitFor(async () => {
      //now we schould find the checkbox in the list of checked items below
      const checkbox = await screen.findByRole("checkbox", {
        name: /feed cats/i,
      });
      expect(checkbox).toBeChecked();
    });

    const lastItem = screen.getByTestId("listTestId").lastChild;

    expect(lastItem).toHaveTextContent(/feed cats/i);
  });
});
