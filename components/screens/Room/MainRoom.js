import React, { useState } from "react";
import RoomHost from "./RoomHost";
import RoomUser from "./RoomUser";

function MainRoom({ route, navigation }) {
  const [isHost, setIsHost] = useState(true);
  const data = {
    info: route.params,
    navigation: navigation,
  };

  return <>{isHost ? <RoomHost data={data} /> : <RoomUser data={data} />}</>;
}

export default MainRoom;
