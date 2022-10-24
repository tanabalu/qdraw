import React, { MouseEvent, Touch, TouchEvent } from "react";
import BRUSH from './brush';

interface Props {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

interface State {}

export default class Drawer extends React.PureComponent<Props, State> {
  element: HTMLCanvasElement;
  canvas: CanvasRenderingContext2D;
  isDrag: boolean;
  isReDrawing: boolean;
  timeId: NodeJS.Timeout | null;
  animateArr: (number | number[])[];
  currentBrush: Record<string, string | number>;
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.element = props.canvas;
    this.element.width = props.width;
    this.element.height = props.height;
    this.canvas = this.element.getContext("2d") as CanvasRenderingContext2D;
    this.isDrag = false;
    this.isReDrawing = false;
    this.timeId = null;
    this.animateArr = [];
    this.currentBrush = BRUSH[0];
  }

  init() {
    // 设置画笔
    this.setBrush();
  }

  beginDraw() {
    this.isDrag = true;
    this.canvas.beginPath();
  }

  draw(e: Touch | MouseEvent) {
    if (!this.isDrag || this.isReDrawing) {
      return;
    }
    const x = e.pageX;
    const y = e.pageY;
    // const x = e.pageX - element.offsetLeft;
    // const y = e.pageY - element.offsetTop;
    this.canvas.lineTo(x, y);
    this.canvas.stroke();
    this.animateArr.push([x, y]);
  }

  endDraw() {
    this.isDrag = false;
      this.animateArr.push(-1);
  }

  setBrush() {
    let { canvas, currentBrush } = this;
    Object.assign(canvas, currentBrush);
  }

  download() {
    const { element } = this;
    const src = element.toDataURL("image/png");
    const $a = document.createElement("a");
    $a.setAttribute("href", src);
    $a.setAttribute("download", "小画板（hbuecx.com）.png");

    const evObj = document.createEvent("MouseEvents");
    evObj.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      true,
      false,
      0,
      null
    );
    $a.dispatchEvent(evObj);
  }

  replay() {
    const { canvas } = this;
    this.clear();

    this.isReDrawing = true;
    canvas.beginPath();
    const step = (animate: (number | number[])[], i: number) => {
      if (i >= animate.length - 1) {
        clearTimeout(this.timeId as NodeJS.Timeout);
        this.isReDrawing = false;
        return;
      }
      const position = animate[i];
      if (typeof position === 'number') {
        canvas.beginPath();
      } else {
        canvas.lineTo(position[0], position[1]);
        canvas.stroke();
      }
      i++;
      this.timeId = setTimeout(() => {
        step(animate, i);
      }, 10);
    };

    step(this.animateArr, 0);
  }

  clear() {
    if (this.isReDrawing) {
      return;
    }
    const { canvas } = this;
    const { width, height } = this.element;
    canvas.clearRect(0, 0, width, height);
  }

  // guide() {
  //   if (localStorage.getItem("guide_init")) {
  //     return;
  //   }
  //   this.animateArr = initAniArr;
  //   this.replay();
  //   localStorage.setItem("guide_init", true);
  // }
}
