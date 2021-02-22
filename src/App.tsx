import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DragPreviewImage, useDrag, useDragLayer, useDrop } from "react-dnd";

const Draggable = props => {
  const [, ref] = useDrag({
    item: {
      type: "type"
    },
    begin: () => {
      console.log("DRAG BEGIN");
      props.setPath("drop-zone");
    },
    end: () => {
      console.log("DRAG END");
      props.setPath("draggable");
    }
  });

  return <div ref={ref}>I AM DRAGGABLE. DRAG ME.</div>;
};

const DropZone = () => {
  const [, dropRef] = useDrop({
    accept: "type",
    drop: () => console.log(`Received drop.`)
  });

  return (
    <div ref={dropRef}>I AM DROP ZONE. PLEASE DROP THE DRAGGABLE OVER ME.</div>
  );
};

function App() {
  const [path, setPath] = useState<"draggable" | "drop-zone">("draggable");
  return (
    <div>
      {path === "draggable" ? <Draggable setPath={setPath} /> : <DropZone />}
    </div>
  );
}

/* This has the same problem.
 * But it can be fixed by replacing
 * props.setPath("drop-zone");
 * with
 * setTimeout(() => props.setPath("drop-zone"), 0) */
const App2 = () => {
  const [path, setPath] = useState<"draggable" | "drop-zone">("draggable");
  return (
    <div>
      {path === "draggable" ? <Draggable setPath={setPath} /> : null}
      <DropZone />
    </div>
  );
};

export default App;
