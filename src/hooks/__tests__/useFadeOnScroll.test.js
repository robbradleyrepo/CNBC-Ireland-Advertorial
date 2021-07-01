import { renderHook } from "@testing-library/react-hooks";
import useFadeOnScroll from "../useFadeOnScroll";

describe("Use Fade In On Scroll Hook", () => {
  it("Mounts and returns defulat object", () => {
    const { result } = renderHook(() => useFadeOnScroll(1000, 75));
    expect(result.current).toMatchObject({
      opacity: 0,
      ref: { current: undefined }
    });
  });

  it("does it add listener to window", () => {
    window.addEventListener = jest.fn();
    renderHook(() => useFadeOnScroll(1000, 75));
    expect(window.addEventListener).toHaveBeenCalled();
    window.addEventListener.mockClear();
  });
});
