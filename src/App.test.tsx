/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Tododo-list", () => {
  let user: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    user = userEvent.setup();
    render(<App />);
  });

  test("schould add list item", async () => {
    const buttonAddItem = screen.getByRole("button", {
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
    const checkbox = screen.getByRole("checkbox", { name: /feed cats/i });

    await user.click(checkbox);

    expect(checkbox).toBeChecked();

    const lastItem = screen.getByTestId("listTestId").lastChild;

    expect(lastItem).toHaveTextContent(/feed cats/i);
  });
});
