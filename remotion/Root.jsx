import { Composition } from "remotion";
import { DashboardPreview } from "./DashboardPreview";
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from "./constants";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="DashboardPreview"
        component={DashboardPreview}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
    </>
  );
};
