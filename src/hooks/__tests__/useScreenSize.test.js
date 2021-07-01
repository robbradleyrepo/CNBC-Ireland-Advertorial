import { renderHook } from "@testing-library/react-hooks";
import useScreenSize from "../useScreenSize";

describe("Use Screen Size Hook", () => {
  it("Mounts and returns defulat object", () => {
    const { result } = renderHook(() => useScreenSize());
    expect(result.current).toMatchObject({ width: 1024, height: 768 });
  });
  it("does it add listener to window", () => {
    window.addEventListener = jest.fn();
    renderHook(() => useScreenSize());
    expect(window.addEventListener).toHaveBeenCalled();
    window.addEventListener.mockClear();
  });
});
