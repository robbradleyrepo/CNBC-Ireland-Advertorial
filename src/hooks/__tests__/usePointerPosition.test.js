import { renderHook } from "@testing-library/react-hooks";
import usePointerPosition from "../usePointerPosition";

describe("Use Pointer Position Hook", () => {
  it("Mounts and returns defulat object", () => {
    const { result } = renderHook(() => usePointerPosition());
    expect(result.current).toMatchObject({ x: 0, y: 0 });
  });
  it("does it add listener to window", () => {
    window.addEventListener = jest.fn();
    renderHook(() => usePointerPosition(1000, 75));
    expect(window.addEventListener).toHaveBeenCalled();
    window.addEventListener.mockClear();
  });
});
