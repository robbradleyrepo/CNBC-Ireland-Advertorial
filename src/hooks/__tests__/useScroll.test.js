import { renderHook } from "@testing-library/react-hooks";
import useScroll from "../useScroll";

describe("Use Scroll Hook", () => {
  it("Mounts and returns defulat object", () => {
    const { result } = renderHook(() => useScroll());
    expect(result.current).toMatchObject({ x: 0, y: 0 });
  });
  it("does it add listener to window", () => {
    window.addEventListener = jest.fn();
    renderHook(() => useScroll());

    expect(window.addEventListener).toHaveBeenCalled();
    window.addEventListener.mockClear();
  });
});
