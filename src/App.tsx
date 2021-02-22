import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DragPreviewImage, useDrag, useDragLayer, useDrop } from "react-dnd";
import styled from "styled-components";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Redirect, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Draggable = () => {
  const [, set] = useState();

  const history = useHistory();
  const [{ isDragging }, ref] = useDrag({
    item: {
      type: "type"
    },
    collect: m => ({
      isDragging: m.isDragging()
    }),
    begin: () => {
      console.log("DRAG BEGIN");
      setTimeout(() => history.push("/drop-zone"), 0);
    },
    end: () => {
      console.log("DRAG END");
      setTimeout(() => history.push("/draggable"), 0);
    }
  });

  return <div ref={ref}>I AM DRAGGABLE. DRAG ME.</div>;
};

const DropZone = () => {
  const [counter, setCounter] = useState(0);

  const [, dropRef] = useDrop({
    accept: "type",
    drop: (item, monitor) => {
      setCounter(x => x + 1);
    }
  });

  return (
    <div ref={dropRef}>I AM DROP ZONE. PLEASE DROP THE DRAGGABLE OVER ME.</div>
  );
};

function App() {
  return (
    <div>
      <Switch>
        <Route path="/draggable">
          <Draggable />
        </Route>
        <Route path="/drop-zone">
          <DropZone />
        </Route>
        <Redirect to="/draggable" />
      </Switch>
    </div>
  );
}

export default App;
