import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { toHaveAttribute } from "@testing-library/jest-dom";
import TodoForm from "./TodoForm";

describe("<TodoForm/>", () => {
  const setup = (props = {}) => {
    const utils = render(<TodoForm {...props} />);
    const { getByText, getByPlaceholderText } = utils;

    const input = getByPlaceholderText("할 일을 입력하세요");
    const button = getByText("등록");
    return {
      ...utils,
      input,
      button
    };
  };

  it("has input and a button", () => {
    // const { getByText, getByPlaceholderText } = render(<TodoForm />);
    const { input, button } = setup();
    // getByPlaceholderText("할 일을 입력하세요");
    // getByText("등록");
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it("changes input", () => {
    // const { getByPlaceholderText } = render(<TodoForm />);
    const { input } = setup();
    // const input = getByPlaceholderText("할 일을 입력하세요");
    fireEvent.change(input, {
      target: {
        value: "TDD 배우기"
      }
    });
    expect(input).toHaveAttribute("value", "TDD 배우기");
  });
  it("calls onInsert and clears input", () => {
    const onInsert = jest.fn();
    // const { getByText, getByPlaceholderText } = render(
    //   <TodoForm onInsert={onInsert} />
    // );
    const { input, button } = setup({ onInsert });

    // const input = getByPlaceholderText("할 일을 입력하세요");
    // const button = getByText("등록");
    fireEvent.change(input, {
      target: {
        value: "TDD 배우기"
      }
    });
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith("TDD 배우기");
    expect(input).toHaveAttribute("value", "");
  });
});
