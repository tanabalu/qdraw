import React, { useEffect, useRef, MouseEvent, TouchEvent } from "react";
import Drawer from "@/components/Drawer";

import styles from "./index.module.less";

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawerRef = useRef<Drawer>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { availWidth, availHeight } = window.screen;
    drawerRef.current = new Drawer({
      canvas,
      width: availWidth,
      height: availHeight,
    });
    drawerRef.current.init();
  }, []);

  const handleClear = () => {
    drawerRef.current?.clear();
  };

  const handleReplay = () => {
    drawerRef.current?.replay();
  };

  const handleDownload = () => {
    drawerRef.current?.download();
  };

  const onMouseDown = () => {
    drawerRef.current?.beginDraw();
  };

  const onMouseMove = (event: MouseEvent) => {
    drawerRef.current?.draw(event);
  };

  const onMouseUp = () => {
    drawerRef.current?.endDraw();
  };

  const onMouseOut = () => {
    drawerRef.current?.endDraw();
  };

  const onTouchStart = () => {
    drawerRef.current?.beginDraw();
  };

  const onTouchMove = (event: TouchEvent) => {
    drawerRef.current?.draw(event.targetTouches[0]);
  };

  const onTouchEnd = () => {
    drawerRef.current?.endDraw();
  };

  return (
    <>
      <div className={styles.header}>
        <h3 className={styles.title}>小 画 板</h3>
        <div>
          <span className={styles.note}>请按住鼠标拖动绘图</span>
          <button className={styles.button} onClick={handleClear}>
            清 空
          </button>
          <button className={styles.button} onClick={handleReplay}>
            重 绘
          </button>
          <button className={styles.button} onClick={handleDownload}>
            保存为图片
          </button>
        </div>
      </div>
      <div className={styles.drawer}>
        <canvas
          ref={canvasRef}
          id="canvas"
          className={styles.canvas}
          width={500}
          height={500}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseOut={onMouseOut}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          暂不支持 canvas
        </canvas>
      </div>
    </>
  );
};
