/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render } from "@testing-library/react";
import { ListItem } from "./ListItem";

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
