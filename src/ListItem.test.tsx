/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import { ListItem } from "./ListItem";
import userEvent from "@testing-library/user-event";

test("ListItem schould have another style when done", () => {
  const { container } = render(
    <ListItem
      label="cook lunch"
      checked={true}
      onChange={() => {}}
      onDelete={() => {}}
      id="1"
    />
  );

  expect(container.firstChild?.firstChild?.firstChild).toHaveClass(
    "checked-item"
  );
});

test("ListItem schould not have another style when not done", () => {
  const { container } = render(
    <ListItem
      label="cook lunch"
      checked={false}
      onChange={() => {}}
      onDelete={() => {}}
      id="1"
    />
  );

  expect(container.firstChild?.firstChild?.firstChild).not.toHaveClass(
    "checked-item"
  );
});

test("ListItem call onDelete when button clicked", async () => {
  const onDelete = jest.fn();
  render(
    <ListItem
      label="cook lunch"
      checked={false}
      onChange={() => {}}
      onDelete={onDelete}
      id="1"
    />
  );

  const buttonDelete = screen.getByRole("button");

  const user = userEvent.setup();

  await user.click(buttonDelete);

  expect(onDelete).toHaveBeenCalled();
});

test("ListItem call onChange when input clicked", async () => {
  const onChange = jest.fn();
  render(
    <ListItem
      label="cook lunch"
      checked={false}
      onChange={onChange}
      onDelete={() => {}}
      id="1"
    />
  );

  const input = screen.getByRole("checkbox");

  const user = userEvent.setup();

  await user.click(input);

  expect(onChange).toHaveBeenCalledWith(true);
});

// describe("ListItem", () => {
//   let user: ReturnType<typeof userEvent.setup>;
//   const onChange = jest.fn();
//   let checked: boolean;
//   const input = screen.getByRole("checkbox");
//   beforeEach(() => {
//     user = userEvent.setup();

//   });
//   it.each([[false, "unchecked", true]])(
//     "call onChange  with ${result} when was ${was}",async
//     (checked: boolean, was: string, result: boolean) => {
//       render(
//       <ListItem
//         label="cook lunch"
//         checked={checked}
//         onChange={onChange}
//         onDelete={() => {}}
//         id="1"
//       />
//     );
//       await user.click(input);
//       expect(onChange).toHaveBeenCalledWith(result);
//     }
//   );
// });

test.each`
  checked  | was            | result
  ${false} | ${"unchecked"} | ${true}
  ${true}  | ${"checked"}   | ${false}
`(
  "call onChange with $result when was $was",
  async ({ checked, was, result }) => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <ListItem
        label="cook lunch"
        checked={checked}
        onChange={onChange}
        onDelete={() => {}}
        id="1"
      />
    );

    const input = screen.getByRole("checkbox");

    await user.click(input);
    expect(onChange).toHaveBeenCalledWith(result);
  }
);
