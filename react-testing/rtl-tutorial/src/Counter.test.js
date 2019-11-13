import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { toHaveTextContent } from "@testing-library/jest-dom";
import Counter from "./Counter";

describe("<Counter/>", () => {
  it("matches snapshot", () => {
    const utils = render(<Counter />);

    expect(utils.container).toMatchSnapshot();
  });

  it("has a number and two buttons", () => {
    const utils = render(<Counter />);
    utils.getByText("0");
    utils.getByText("+1");
    utils.getByText("-1");
  });

  it("increase", () => {
    const utils = render(<Counter />);

    const number = utils.getByText("0");
    const plusButton = utils.getByText("+1");
    //클릭 이벤트 두번 발생시키기
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(number).toHaveTextContent("2");
    expect(number.textContent).toBe("2");
  });

  it("decrease", () => {
    const utils = render(<Counter />);
    const number = utils.getByText("0");
    const minusButton = utils.getByText("-1");

    fireEvent.click(minusButton);
    fireEvent.click(minusButton);
    expect(number).toHaveTextContent("-2");
  });
});
