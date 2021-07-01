import { renderHook } from "@testing-library/react-hooks";
import useCNBCOffset from "../useCNBCOffset";

describe("Use Pointer Position Hook", () => {
  it("Mounts and returns defulat object", () => {
    const { result } = renderHook(() => useCNBCOffset());
    expect(result.current).toMatchObject({ bottom: 0, top: 70 });
  });
});
